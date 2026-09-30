import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

/* =========================
   GET /api/driver-booking
   Current user's rides
========================= */

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const rides = await prisma.ride.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        requestedAt: "desc",
      },
      include: {
        driver: {
          include: {
            user: {
              select: {
                name: true,
              },
            },
          },
        },
        vehicle: true,
      },
    });

    const formatted = rides.map((ride) => ({
      id: ride.id,
      transportType: ride.transportType,
      status: ride.status,
      pickupAddress: ride.pickupAddress,
      destination: ride.destination,
      estimatedFare: ride.estimatedFare
        ? Number(ride.estimatedFare)
        : null,
      finalFare: ride.finalFare ? Number(ride.finalFare) : null,
      driverName: ride.driver?.user.name ?? null,
      vehicle: ride.vehicle
        ? `${ride.vehicle.make ?? ""} ${ride.vehicle.model ?? ""}`.trim()
        : null,
      requestedAt: ride.requestedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("DRIVER_BOOKING_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load rides.",
      },
      { status: 500 }
    );
  }
}

/* =========================
   POST /api/driver-booking
   body: { transportType, pickupAddress, destination, estimatedFare }
========================= */

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();

    const transportType = body?.transportType;
    const pickupAddress = body?.pickupAddress;
    const destination = body?.destination;
    const estimatedFare = body?.estimatedFare
      ? Number(body.estimatedFare)
      : null;

    if (!transportType || !pickupAddress || !destination) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing pickup, destination, or transport type.",
        },
        { status: 400 }
      );
    }

    const ride = await prisma.ride.create({
      data: {
        userId: user.id,
        transportType,
        pickupAddress,
        destination,
        estimatedFare,
        status: "REQUESTED",
      },
    });

    return NextResponse.json({
      success: true,
      data: ride,
    });
  } catch (error) {
    console.error("DRIVER_BOOKING_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to request a ride.",
      },
      { status: 500 }
    );
  }
}