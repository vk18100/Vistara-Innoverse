import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth(req);
  if (response) return response;
  try {
    const bookings = await prisma.guideBooking.findMany({
      where: user!.role === "GUIDE" ? { guide: { userId: user!.id } } : { guestId: user!.id },
      orderBy: { startTime: "desc" },
      include: { guest: { select: { id: true, name: true, email: true } }, guide: { include: { user: { select: { id: true, name: true } } } } },
    });
    return NextResponse.json({ success: true, data: { bookings, count: bookings.length } });
  } catch (error) {
    console.error("GUIDE_BOOKINGS_GET_ERROR", error);
    return NextResponse.json({ success: false, message: "Unable to load guide bookings." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth(req);
  if (response) return response;
  try {
    const body = await req.json();
    const guideId = Number(body.guideId);
    const startTime = new Date(body.startTime);
    const endTime = new Date(body.endTime);
    const guests = Number(body.guests ?? 1);
    const amount = Number(body.amount);
    if (!Number.isInteger(guideId) || Number.isNaN(startTime.getTime()) || Number.isNaN(endTime.getTime()) || endTime <= startTime || guests < 1 || !Number.isFinite(amount)) {
      return NextResponse.json({ success: false, message: "Valid guideId, startTime, endTime, guests and amount are required." }, { status: 400 });
    }
    const guide = await prisma.guideProfile.findUnique({ where: { id: guideId, isActive: true } });
    if (!guide) return NextResponse.json({ success: false, message: "Guide not found." }, { status: 404 });
    const conflict = await prisma.guideBooking.findFirst({ where: { guideId, status: { not: "CANCELLED" }, startTime: { lt: endTime }, endTime: { gt: startTime } } });
    if (conflict) return NextResponse.json({ success: false, message: "Guide is not available for this time." }, { status: 409 });
    const booking = await prisma.guideBooking.create({ data: { guestId: user!.id, guideId, startTime, endTime, guests, amount }, include: { guide: { include: { user: { select: { id: true, name: true } } } } } });
    return NextResponse.json({ success: true, message: "Guide booking created.", data: booking }, { status: 201 });
  } catch (error) {
    console.error("GUIDE_BOOKING_POST_ERROR", error);
    return NextResponse.json({ success: false, message: "Unable to create guide booking." }, { status: 500 });
  }
}
