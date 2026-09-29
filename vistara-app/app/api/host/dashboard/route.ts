import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireRole(req, ["HOST"]);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Host user not found.",
        },
        { status: 401 }
      );
    }

    // --------------------------------
    // HOST
    // --------------------------------

    const host = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!host) {
      return NextResponse.json(
        {
          success: false,
          message: "Host account not found.",
        },
        { status: 404 }
      );
    }

    // --------------------------------
    // PROPERTIES
    // --------------------------------

    const properties = await prisma.property.findMany({
      where: {
        hostId: user.id,
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        images: {
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });

    // --------------------------------
    // BOOKINGS
    // --------------------------------

    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId: user.id,
        },
      },

      orderBy: {
        createdAt: "desc",
      },

      include: {
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },

        property: {
          select: {
            id: true,
            title: true,
            city: true,
          },
        },
      },
    });

    // --------------------------------
    // STATS
    // --------------------------------

    const activeProperties = properties.filter(
      (property) => property.status === "VERIFIED"
    ).length;

    const upcomingBookings = bookings.filter(
      (booking) =>
        booking.status === "PENDING" ||
        booking.status === "CONFIRMED"
    ).length;

    const earnings = bookings
      .filter(
        (booking) =>
          booking.status === "CONFIRMED" ||
          booking.status === "COMPLETED"
      )
      .reduce(
        (total, booking) =>
          total + Number(booking.totalAmount),
        0
      );

    // --------------------------------
    // PROPERTY DATA
    // --------------------------------

    const formattedProperties = properties.map(
      (property) => ({
        id: property.id,

        name: property.title,

        location: [
          property.city,
          property.state,
          property.country,
        ]
          .filter(Boolean)
          .join(", "),

        type: property.type,

        status:
          property.status === "VERIFIED"
            ? "ACTIVE"
            : property.status,

        image:
          property.images.length > 0
            ? property.images[0].url
            : null,

        pricePerNight: Number(property.pricePerNight),

        rating: property.rating,

        reviewCount: property.reviewCount,
      })
    );

    // --------------------------------
    // BOOKING DATA
    // --------------------------------

    const formattedBookings = bookings.map(
      (booking) => ({
        id: booking.id,

        guest:
          booking.guest?.name ||
          booking.guest?.email ||
          "Guest",

        guestEmail:
          booking.guest?.email || "",

        property:
          booking.property?.title ||
          "Property",

        location:
          booking.property?.city || "",

        checkIn: booking.checkIn,

        checkOut: booking.checkOut,

        guests: booking.guests,

        nights: booking.nights,

        amount: Number(booking.totalAmount),

        status: booking.status,

        paymentStatus:
          booking.paymentStatus,

        createdAt:
          booking.createdAt,
      })
    );

    // --------------------------------
    // FINAL RESPONSE
    // --------------------------------

    return NextResponse.json(
      {
        success: true,

        message:
          "Host dashboard loaded successfully.",

        data: {
          host: {
            id: host.id,

            name:
              host.name ||
              "Host",

            email:
              host.email,

            role:
              host.role,
          },

          stats: {
            properties:
              properties.length,

            activeProperties,

            bookings:
              bookings.length,

            upcomingBookings,

            earnings,
          },

          properties:
            formattedProperties,

          bookings:
            formattedBookings,

          verification: {
            status: "VERIFIED",
          },
        },
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(
      "HOST_DASHBOARD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,

        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch host dashboard data.",
      },
      {
        status: 500,
      }
    );
  }
}