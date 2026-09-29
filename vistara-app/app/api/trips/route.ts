import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    // --------------------------------
    // USER'S BOOKINGS (real trips)
    // --------------------------------

    const bookings = await prisma.booking.findMany({
      where: {
        guestId: user.id,
        status: {
          not: "CANCELLED",
        },
      },
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

    const formattedTrips = bookings.map((booking) => {
      const isCompleted = booking.checkOut < now;

      return {
        id: String(booking.id),
        title: booking.property.title,
        destination: `${booking.property.city}, ${booking.property.country}`,
        startDate: booking.checkIn,
        endDate: booking.checkOut,
        nights: booking.nights,
        status: isCompleted ? "completed" : "upcoming",
        image:
          booking.property.images[0]?.url ??
          "/images/property-placeholder.jpg",

        stay: {
          name: booking.property.title,
          pricePerNight: Number(booking.property.pricePerNight),
        },
      };
    });

    const upcomingTrips = formattedTrips.filter(
      (trip) => trip.status === "upcoming"
    );

    const completedTrips = formattedTrips.filter(
      (trip) => trip.status === "completed"
    );

    const upcomingTrip = upcomingTrips[0] ?? null;

    // --------------------------------
    // INSPIRATION (real top-rated verified properties)
    // --------------------------------

    const inspirationProperties = await prisma.property.findMany({
      where: {
        status: "VERIFIED",
      },
      orderBy: {
        rating: "desc",
      },
      take: 3,
      include: {
        images: {
          orderBy: {
            isPrimary: "desc",
          },
          take: 1,
        },
      },
    });

    const inspiration = inspirationProperties.map((property) => ({
      id: String(property.id),
      title: property.title,
      image:
        property.images[0]?.url ??
        "/images/property-placeholder.jpg",
    }));

    return NextResponse.json({
      success: true,

      data: {
        upcomingTrip,
        trips: formattedTrips,
        completedTrips,
        // No "recently viewed" tracking exists yet in the schema,
        // so this stays empty (the page already has a real empty state).
        recentPlaces: [],
        // Wishlist isn't wired to this endpoint yet — separate feature.
        savedPlaces: [],
        inspiration,
      },
    });
  } catch (error) {
    console.error("TRIPS_API_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load trips.",
      },
      { status: 500 }
    );
  }
}