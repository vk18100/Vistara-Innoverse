import { NextResponse } from "next/server";

const bookings: any[] = [];

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      driverId,
      bookingType,
      pickup,
      destination,
      date,
      time,
      passengers,
      notes,
      price,
    } = body;

    if (!driverId || !bookingType || !pickup || !date || !time) {
      return NextResponse.json(
        {
          success: false,
          message: "Required booking details are missing.",
        },
        { status: 400 }
      );
    }

    const booking = {
      id: `driver_booking_${Date.now()}`,
      driverId,
      bookingType,
      pickup,
      destination: destination || null,
      date,
      time,
      passengers: passengers || 1,
      notes: notes || "",
      price: price || 0,
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Driver booking created successfully.",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Driver booking API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create driver booking.",
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({
    success: true,
    count: bookings.length,
    data: bookings,
  });
}