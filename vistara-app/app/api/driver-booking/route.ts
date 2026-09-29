import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth(req);
  if (response) return response;
  try {
    const rides = await prisma.ride.findMany({ where: { userId: user!.id }, orderBy: { requestedAt: "desc" }, include: { driver: { include: { user: { select: { id: true, name: true, phone: true } } } }, vehicle: true } });
    return NextResponse.json({ success: true, data: { bookings: rides, rides, count: rides.length } });
  } catch (error) {
    console.error("DRIVER_BOOKINGS_GET_ERROR", error);
    return NextResponse.json({ success: false, message: "Unable to load driver bookings." }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { user, response } = await requireAuth(req);
  if (response) return response;
  try {
    const body = await req.json();
    const transportType = body.transportType;
    if (!transportType || !body.pickupAddress || !body.destination) return NextResponse.json({ success: false, message: "transportType, pickupAddress and destination are required." }, { status: 400 });
    const ride = await prisma.ride.create({ data: {
      userId: user!.id, transportType, pickupAddress: body.pickupAddress, destination: body.destination,
      pickupLatitude: body.pickupLatitude == null ? null : Number(body.pickupLatitude), pickupLongitude: body.pickupLongitude == null ? null : Number(body.pickupLongitude),
      destinationLatitude: body.destinationLatitude == null ? null : Number(body.destinationLatitude), destinationLongitude: body.destinationLongitude == null ? null : Number(body.destinationLongitude),
      estimatedFare: body.estimatedFare == null ? null : Number(body.estimatedFare), distanceKm: body.distanceKm == null ? null : Number(body.distanceKm),
      driverId: body.driverId == null ? null : Number(body.driverId), vehicleId: body.vehicleId == null ? null : Number(body.vehicleId),
    }, include: { driver: { include: { user: { select: { id: true, name: true, phone: true } } } }, vehicle: true } });
    return NextResponse.json({ success: true, message: "Driver booking created.", data: ride }, { status: 201 });
  } catch (error) {
    console.error("DRIVER_BOOKING_POST_ERROR", error);
    return NextResponse.json({ success: false, message: "Unable to create driver booking." }, { status: 500 });
  }
}
