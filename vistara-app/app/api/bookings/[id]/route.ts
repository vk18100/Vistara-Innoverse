import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function decimalToNumber(value: unknown) {
  if (value === null || value === undefined) {
    return 0;
  }

  const number = Number(value);

  return Number.isFinite(number) ? number : 0;
}

function serializeBooking(booking: any) {
  if (!booking) return booking;

  return {
    ...booking,

    totalAmount: decimalToNumber(booking.totalAmount),

    property: booking.property
      ? {
          ...booking.property,
          pricePerNight: decimalToNumber(
            booking.property.pricePerNight
          ),
          cleaningFee: decimalToNumber(
            booking.property.cleaningFee
          ),
          serviceFee: decimalToNumber(
            booking.property.serviceFee
          ),
          taxPercentage: decimalToNumber(
            booking.property.taxPercentage
          ),
        }
      : booking.property,
  };
}

function serializeRide(ride: any) {
  if (!ride) return ride;

  return {
    ...ride,

    estimatedFare:
      ride.estimatedFare !== null &&
      ride.estimatedFare !== undefined
        ? decimalToNumber(ride.estimatedFare)
        : null,

    finalFare:
      ride.finalFare !== null &&
      ride.finalFare !== undefined
        ? decimalToNumber(ride.finalFare)
        : null,
  };
}

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    // =========================================================
    // AUTH
    // =========================================================

    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // =========================================================
    // BOOKING / RIDE ID
    // =========================================================

    const { id } = await params;

    const rawId = String(id || "").trim();

    if (!rawId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking ID is required",
        },
        { status: 400 }
      );
    }

    /*
     * Normal database Booking IDs are numeric.
     *
     * Driver rides also use numeric IDs.
     *
     * We therefore first try the normal numeric ID lookup.
     */

    const numericId = Number(rawId);

    if (
      !Number.isInteger(numericId) ||
      numericId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking id",
        },
        { status: 400 }
      );
    }

    // =========================================================
    // 1. TRY NORMAL STAY BOOKING
    // =========================================================

    const booking = await prisma.booking.findFirst({
      where: {
        id: numericId,
        guestId: user.id,
      },

      include: {
        property: {
          include: {
            images: {
              orderBy: {
                isPrimary: "desc",
              },
            },
          },
        },
      },
    });

    // =========================================================
    // STAY BOOKING FOUND
    // =========================================================

    if (booking) {
      const serialized = serializeBooking(booking);

      return NextResponse.json({
        success: true,

        booking: {
          ...serialized,

          id: booking.id,
          bookingId: String(booking.id),

          bookingType: "STAY",
          type: "STAY",

          title:
            booking.property?.title ||
            "Vistara Stay",

          name:
            booking.property?.title ||
            "Vistara Stay",

          city:
            booking.property?.city ||
            booking.property?.address ||
            "India",

          location:
            booking.property?.city ||
            booking.property?.address ||
            "India",

          image:
            booking.property?.images?.find(
              (image: any) => image.isPrimary
            )?.url ||
            booking.property?.images?.[0]?.url ||
            "",

          checkIn: booking.checkIn,
          checkOut: booking.checkOut,

          guests: booking.guests,

          nights: booking.nights,

          price: decimalToNumber(
            booking.totalAmount
          ),

          amount: decimalToNumber(
            booking.totalAmount
          ),

          subtotal: decimalToNumber(
            booking.totalAmount
          ),

          totalAmount: decimalToNumber(
            booking.totalAmount
          ),

          status: booking.status,

          paymentStatus:
            booking.paymentStatus,

          property: serialized.property,
        },
      });
    }

    // =========================================================
    // 2. TRY DRIVER RIDE
    // =========================================================

    /*
     * Driver bookings are stored in Ride,
     * not in Booking.
     *
     * We intentionally do NOT try to create a fake
     * Booking record for a ride.
     */

    const ride = await prisma.ride.findFirst({
      where: {
        id: numericId,
        userId: user.id,
      },

      include: {
        driver: {
          include: {
            user: true,
          },
        },

        vehicle: true,
      },
    });

    // =========================================================
    // DRIVER RIDE FOUND
    // =========================================================

    if (ride) {
      const serialized = serializeRide(ride);

      const driverName =
        ride.driver?.user?.name ||
        ride.driver?.user?.email ||
        "Vistara Driver";

      const vehicleName =
        ride.vehicle?.type ||
        "Vehicle";

      const fare =
        serialized.finalFare ??
        serialized.estimatedFare ??
        0;

      return NextResponse.json({
        success: true,

        booking: {
          ...serialized,

          id: ride.id,
          bookingId: String(ride.id),

          /*
           * Important:
           * The frontend already understands DRIVER.
           */
          bookingType: "DRIVER",
          type: "DRIVER",

          title: driverName,
          name: driverName,

          city: "India",
          location: "India",

          image: "",

          /*
           * Ride model fields
           */
          pickup: ride.pickupAddress,
          destination: ride.destination,

          status: ride.status,

          price: fare,
          amount: fare,
          subtotal: fare,
          totalAmount: fare,

          paymentStatus: "NOT_REQUIRED",

          /*
           * Driver information
           */
          driverId: ride.driverId,

          metadata: {
            itemId: ride.driverId,
            driverId: ride.driverId,

            pickup: ride.pickupAddress,
            destination: ride.destination,

            transportType:
              ride.transportType,

            vehicleId:
              ride.vehicleId,

            vehicleType:
              vehicleName,

            requestedAt:
              ride.requestedAt,
          },
        },
      });
    }

    // =========================================================
    // NOTHING FOUND
    // =========================================================

    return NextResponse.json(
      {
        success: false,
        message: "Booking not found",
      },
      { status: 404 }
    );
  } catch (error) {
    console.error(
      "GET_BOOKING_BY_ID_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking",
      },
      { status: 500 }
    );
  }
}