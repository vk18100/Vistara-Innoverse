import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    // ==========================================
    // GET USER'S REAL TRIPS FROM BOOKINGS
    // ==========================================

    const bookings = await prisma.booking.findMany({
      where: {
        guestId: user!.id,

        // Cancelled bookings should not appear
        status: {
          not: "CANCELLED",
        },
      },

      // Nearest trip first
      orderBy: {
        checkIn: "asc",
      },

      include: {
        property: {
          include: {
            images: {
              orderBy: {
                isPrimary: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });

    const now = new Date();

    // ==========================================
    // FORMAT TRIPS
    // ==========================================

    const trips = bookings.map((booking) => {
      const isCompleted = booking.checkOut < now;

      return {
        id: String(booking.id),

        title: booking.property.title,

        destination: `${booking.property.city}, ${booking.property.country}`,

        startDate: booking.checkIn,

        endDate: booking.checkOut,

        nights: booking.nights,

        status: isCompleted
          ? "completed"
          : "upcoming",

        image:
          booking.property.images[0]?.url ??
          "/images/property-placeholder.jpg",

        stay: {
          name: booking.property.title,

          pricePerNight: Number(
            booking.property.pricePerNight
          ),
        },
      };
    });

    // ==========================================
    // SEPARATE UPCOMING / COMPLETED
    // ==========================================

    const upcomingTrips = trips.filter(
      (trip) => trip.status === "upcoming"
    );

    const completedTrips = trips.filter(
      (trip) => trip.status === "completed"
    );

    // ==========================================
    // FIRST UPCOMING TRIP
    // ==========================================

    const upcomingTrip =
      upcomingTrips.length > 0
        ? upcomingTrips[0]
        : null;

    // ==========================================
    // RESPONSE
    // ==========================================

    return NextResponse.json({
      success: true,

      data: {
        // Main trip shown on /trips
        upcomingTrip,

        // All user's trips
        trips,

        // Upcoming trips
        upcomingTrips,

        // Completed trips
        completedTrips,
      },
    });
  } catch (error) {
    console.error("TRIPS_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load trips.",
      },
      {
        status: 500,
      }
    );
  }
}