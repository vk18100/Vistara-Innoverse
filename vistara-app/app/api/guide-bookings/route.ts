import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

/* =========================
   GET /api/guide-bookings
   Current user's guide bookings
========================= */

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const bookings = await prisma.guideBooking.findMany({
      where: {
        guestId: user.id,
      },
      orderBy: {
        startTime: "desc",
      },
      include: {
        guide: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const formatted = bookings.map((booking) => ({
      id: booking.id,
      guideName: booking.guide.user.name,
      city: booking.guide.city,
      startTime: booking.startTime,
      endTime: booking.endTime,
      guests: booking.guests,
      amount: Number(booking.amount),
      status: booking.status,
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("GUIDE_BOOKINGS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guide bookings.",
      },
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/guide-bookings
   body: { guideId, startTime, endTime, guests, amount }
========================= */

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();

    const guideId = Number(body?.guideId);
    const startTime = body?.startTime;
    const endTime = body?.endTime;
    const guests = Number(body?.guests) || 1;
    const amount = Number(body?.amount);

    if (
      !Number.isInteger(guideId) ||
      !startTime ||
      !endTime ||
      !Number.isFinite(amount)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing or invalid booking details.",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.guideBooking.create({
      data: {
        guestId: user.id,
        guideId,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        guests,
        amount,
      },
    });

    return NextResponse.json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("GUIDE_BOOKINGS_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create guide booking.",
      },
      { status: 500 }
    );
  }
}