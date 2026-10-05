import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

/*
|--------------------------------------------------------------------------
| POST /api/drivers/[id]/book
| Create a real driver booking
|--------------------------------------------------------------------------
*/

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  try {
    // --------------------------------------------------
    // Authentication
    // --------------------------------------------------

    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    // --------------------------------------------------
    // Driver ID
    // --------------------------------------------------

    const { id: idParam } = await params;

    const driverId = Number(idParam);

    if (!Number.isInteger(driverId) || driverId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid driver id.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Request body
    // --------------------------------------------------

    const body = await req.json();

    const {
      bookingType,
      pickup,
      destination,
      date,
      time,
      passengers,
      notes,
      price,
    } = body;

    // --------------------------------------------------
    // Validation
    // --------------------------------------------------

    if (!pickup?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Pickup location is required.",
        },
        { status: 400 }
      );
    }

    if (!destination?.trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Destination is required.",
        },
        { status: 400 }
      );
    }

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Date is required.",
        },
        { status: 400 }
      );
    }

    if (!time) {
      return NextResponse.json(
        {
          success: false,
          message: "Time is required.",
        },
        { status: 400 }
      );
    }

    const passengerCount = Number(passengers ?? 1);

    if (
      !Number.isInteger(passengerCount) ||
      passengerCount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid passenger count.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Find driver
    // --------------------------------------------------

    const driver = await prisma.driverProfile.findUnique({
      where: {
        id: driverId,
      },

      select: {
        id: true,
        userId: true,
        status: true,
        isVerified: true,
        pricePerRide: true,
      },
    });

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------------------------
    // Driver availability
    // --------------------------------------------------

    if (
      driver.status !== "AVAILABLE" ||
      !driver.isVerified
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "This driver is currently unavailable.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Prevent self booking
    // --------------------------------------------------

    if (driver.userId === user!.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot book yourself as a driver.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Booking price
    // --------------------------------------------------

    const bookingPrice =
      price !== undefined && price !== null
        ? Number(price)
        : Number(driver.pricePerRide ?? 0);

    if (
      !Number.isFinite(bookingPrice) ||
      bookingPrice < 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking price.",
        },
        { status: 400 }
      );
    }

    // --------------------------------------------------
    // Create booking
    // --------------------------------------------------

    const booking = await prisma.driverBooking.create({
      data: {
        guestId: user!.id,

        driverId: driver.id,

        bookingType:
          bookingType?.trim() || "LOCAL",

        pickup: pickup.trim(),

        destination: destination.trim(),

        date,

        time,

        passengers: passengerCount,

        notes:
          typeof notes === "string"
            ? notes.trim()
            : null,

        price: bookingPrice,

        status: "PENDING",
      },
    });

    // --------------------------------------------------
    // Response
    // --------------------------------------------------

    return NextResponse.json(
      {
        success: true,

        message:
          "Driver booking request created successfully.",

        data: {
          booking,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "DRIVER_BOOKING_POST_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create driver booking.",
      },
      { status: 500 }
    );
  }
}