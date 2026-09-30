import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

/* =========================
   GET /api/host/booking
   Incoming bookings for the host's properties
========================= */

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireRole(req, ["HOST"]);

    if (response) {
      return response;
    }

    const bookings = await prisma.booking.findMany({
      where: {
        property: {
          hostId: user.id,
        },
      },
      orderBy: {
        checkIn: "desc",
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    const formatted = bookings.map((booking) => ({
      id: booking.id,
      guestName: booking.guest.name,
      guestEmail: booking.guest.email,
      propertyId: booking.property.id,
      propertyTitle: booking.property.title,
      checkIn: booking.checkIn,
      checkOut: booking.checkOut,
      guests: booking.guests,
      amount: Number(booking.totalAmount),
      status: booking.status,
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("HOST_BOOKING_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load bookings.",
      },
      { status: 500 }
    );
  }
}