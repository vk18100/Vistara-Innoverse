import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: Request) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const bookings = await prisma.booking.findMany({
      where: {
        guestId: user!.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        property: {
          include: {
            images: {
              where: {
                isPrimary: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      bookings,
    });
  } catch (error) {
    console.error("GET_BOOKINGS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch bookings",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();

    const {
      propertyId,
      checkIn,
      checkOut,
      guests,
    } = body;

    if (
      !propertyId ||
      !checkIn ||
      !checkOut ||
      guests === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Property, check-in, check-out and guests are required",
        },
        { status: 400 }
      );
    }

    const propertyIdNumber = Number(propertyId);
    const guestCount = Number(guests);

    if (Number.isNaN(propertyIdNumber)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    if (
      Number.isNaN(guestCount) ||
      guestCount < 1
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid guest count",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyIdNumber,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found",
        },
        { status: 404 }
      );
    }

    if (property.status !== "VERIFIED") {
      return NextResponse.json(
        {
          success: false,
          message:
            "Property is not available for booking",
        },
        { status: 400 }
      );
    }

    if (guestCount > property.guests) {
      return NextResponse.json(
        {
          success: false,
          message: `Maximum guests allowed: ${property.guests}`,
        },
        { status: 400 }
      );
    }

    const start = new Date(checkIn);
    const end = new Date(checkOut);

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking dates",
        },
        { status: 400 }
      );
    }

    if (end <= start) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Check-out must be after check-in",
        },
        { status: 400 }
      );
    }

    const now = new Date();

    if (start < now) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Check-in date cannot be in the past",
        },
        { status: 400 }
      );
    }

    const millisecondsPerDay =
      1000 * 60 * 60 * 24;

    const nights = Math.ceil(
      (end.getTime() - start.getTime()) /
        millisecondsPerDay
    );

    if (nights < 1) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking must be at least one night",
        },
        { status: 400 }
      );
    }

    const conflict = await prisma.booking.findFirst({
      where: {
        propertyId: property.id,
        status: {
          in: ["PENDING", "CONFIRMED"],
        },
        checkIn: {
          lt: end,
        },
        checkOut: {
          gt: start,
        },
      },
    });

    if (conflict) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Property is already booked for these dates",
        },
        { status: 409 }
      );
    }

    const totalAmount =
      Number(property.pricePerNight) * nights;

    const booking = await prisma.booking.create({
      data: {
        guestId: user!.id,
        propertyId: property.id,
        checkIn: start,
        checkOut: end,
        guests: guestCount,
        nights,
        totalAmount,
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      include: {
        property: {
          include: {
            images: {
              where: {
                isPrimary: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Booking created successfully",
        booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_BOOKING_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create booking",
      },
      { status: 500 }
    );
  }
}