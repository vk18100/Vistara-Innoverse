import { NextResponse } from "next/server";

export async function GET() {
  try {
    const dashboard = {
      host: {
        id: "host-1",
        name: "Host",
      },

      stats: {
        properties: 0,
        activeProperties: 0,
        bookings: 0,
        upcomingBookings: 0,
        earnings: 0,
      },

      properties: [],

      bookings: [],

      verification: {
        status: "PENDING" as const,
      },
    };

    return NextResponse.json(dashboard);
  } catch (error) {
    console.error("Host dashboard API error:", error);

    return NextResponse.json(
      {
        message: "Unable to load host dashboard.",
      },
      { status: 500 }
    );
  }
}