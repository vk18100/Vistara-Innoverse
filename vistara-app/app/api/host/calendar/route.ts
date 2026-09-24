import { NextResponse } from "next/server";

export async function GET() {
  try {
    const events = [
      {
        id: "calendar-001",
        type: "BOOKING",

        bookingId: "booking-001",

        property: {
          id: "property-001",
          name: "The Blue Villa",
          location: "Patna, Bihar",
        },

        guest: {
          id: "guest-001",
          name: "Aarav Sharma",
        },

        checkIn: "2026-10-05",
        checkOut: "2026-10-08",

        guests: {
          adults: 2,
          children: 0,
        },

        amount: 15000,

        status: "CONFIRMED",
      },

      {
        id: "calendar-002",
        type: "BOOKING",

        bookingId: "booking-002",

        property: {
          id: "property-002",
          name: "River View Retreat",
          location: "Ranchi, Jharkhand",
        },

        guest: {
          id: "guest-002",
          name: "Priya Singh",
        },

        checkIn: "2026-10-12",
        checkOut: "2026-10-15",

        guests: {
          adults: 3,
          children: 1,
        },

        amount: 21000,

        status: "PENDING",
      },

      {
        id: "calendar-003",
        type: "BOOKING",

        bookingId: "booking-003",

        property: {
          id: "property-003",
          name: "Forest Escape",
          location: "Darjeeling, West Bengal",
        },

        guest: {
          id: "guest-003",
          name: "Rahul Verma",
        },

        checkIn: "2026-09-28",
        checkOut: "2026-10-01",

        guests: {
          adults: 2,
          children: 1,
        },

        amount: 18000,

        status: "CONFIRMED",
      },

      {
        id: "calendar-004",
        type: "BLOCKED",

        bookingId: null,

        property: {
          id: "property-001",
          name: "The Blue Villa",
          location: "Patna, Bihar",
        },

        guest: null,

        checkIn: "2026-10-20",
        checkOut: "2026-10-22",

        guests: {
          adults: 0,
          children: 0,
        },

        amount: 0,

        status: "BLOCKED",
      },
    ];

    const stats = {
      totalBookings: events.filter(
        (event) => event.type === "BOOKING"
      ).length,

      confirmedBookings: events.filter(
        (event) =>
          event.type === "BOOKING" &&
          event.status === "CONFIRMED"
      ).length,

      pendingBookings: events.filter(
        (event) =>
          event.type === "BOOKING" &&
          event.status === "PENDING"
      ).length,

      blockedDates: events.filter(
        (event) => event.type === "BLOCKED"
      ).length,
    };

    return NextResponse.json({
      success: true,

      data: {
        events,
        stats,
      },
    });
  } catch (error) {
    console.error(
      "Host calendar API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load host calendar.",
      },
      {
        status: 500,
      }
    );
  }
}