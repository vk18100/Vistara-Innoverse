import { NextResponse } from "next/server";

export async function GET() {
  try {
    /*
     * Temporary host booking data.
     * Later this will come from Prisma/PostgreSQL.
     */

    const bookings = [
      {
        id: "booking_001",
        guest: {
          id: "guest_001",
          name: "Aarav Sharma",
          image: null,
        },

        property: {
          id: "property_001",
          name: "The Blue Haven",
          location: "Goa, India",
        },

        checkIn: "2026-10-05",
        checkOut: "2026-10-08",

        guests: {
          adults: 2,
          children: 0,
          infants: 0,
        },

        amount: 18500,

        status: "CONFIRMED",

        payment: {
          status: "PAID",
          method: "ONLINE",
        },

        createdAt: "2026-09-20",
      },

      {
        id: "booking_002",
        guest: {
          id: "guest_002",
          name: "Riya Verma",
          image: null,
        },

        property: {
          id: "property_002",
          name: "Mountain Nest",
          location: "Manali, India",
        },

        checkIn: "2026-10-12",
        checkOut: "2026-10-15",

        guests: {
          adults: 3,
          children: 1,
          infants: 0,
        },

        amount: 24000,

        status: "PENDING",

        payment: {
          status: "PENDING",
          method: "ONLINE",
        },

        createdAt: "2026-09-22",
      },
    ];

    const stats = {
      total: bookings.length,

      confirmed: bookings.filter(
        (booking) => booking.status === "CONFIRMED"
      ).length,

      pending: bookings.filter(
        (booking) => booking.status === "PENDING"
      ).length,

      cancelled: bookings.filter(
        (booking) => booking.status === "CANCELLED"
      ).length,

      completed: bookings.filter(
        (booking) => booking.status === "COMPLETED"
      ).length,

      upcoming: bookings.filter(
        (booking) =>
          booking.status === "CONFIRMED" ||
          booking.status === "PENDING"
      ).length,
    };

    return NextResponse.json({
      success: true,

      data: {
        bookings,
        stats,
      },
    });
  } catch (error) {
    console.error("Host bookings API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load host bookings.",
      },
      {
        status: 500,
      }
    );
  }
}