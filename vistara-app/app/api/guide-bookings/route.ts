import { NextResponse } from "next/server";

type Booking = {
  id: string;
  guideId: string;
  tripType: "discovery" | "custom" | "full_day";
  date: string;
  time: string;
  guests: number;
  hours: number;
  pickup: string;
  destination: string;
  notes: string;
  total: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

const bookings: Booking[] = [];

export async function GET() {
  return NextResponse.json({
    success: true,
    data: bookings,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      guideId,
      tripType,
      date,
      time,
      guests,
      hours,
      pickup,
      destination,
      notes,
      total,
    } = body;

    if (
      !guideId ||
      !tripType ||
      !date ||
      !time ||
      !guests ||
      !hours ||
      !total
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please complete all required booking details.",
        },
        { status: 400 }
      );
    }

    const booking: Booking = {
      id: `guide_booking_${Date.now()}`,
      guideId,
      tripType,
      date,
      time,
      guests: Number(guests),
      hours: Number(hours),
      pickup: pickup ?? "",
      destination: destination ?? "",
      notes: notes ?? "",
      total: Number(total),
      status: "pending",
      createdAt: new Date().toISOString(),
    };

    bookings.push(booking);

    return NextResponse.json(
      {
        success: true,
        message: "Guide booking created successfully.",
        data: booking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Guide booking error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create guide booking.",
      },
      { status: 500 }
    );
  }
}