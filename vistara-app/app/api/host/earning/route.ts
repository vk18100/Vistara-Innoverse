import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

/* =========================
   GET /api/host/earning
   Current host's earnings summary
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
        status: {
          in: ["CONFIRMED", "COMPLETED"],
        },
      },
      include: {
        property: {
          select: {
            title: true,
          },
        },
      },
      orderBy: {
        checkIn: "desc",
      },
    });

    const totalEarnings = bookings.reduce(
      (sum, booking) => sum + Number(booking.totalAmount),
      0
    );

    const now = new Date();
    const thisMonthEarnings = bookings
      .filter(
        (b) =>
          b.checkIn.getMonth() === now.getMonth() &&
          b.checkIn.getFullYear() === now.getFullYear()
      )
      .reduce((sum, b) => sum + Number(b.totalAmount), 0);

    const transactions = bookings.slice(0, 20).map((booking) => ({
      id: booking.id,
      propertyTitle: booking.property.title,
      amount: Number(booking.totalAmount),
      status: booking.status,
      date: booking.checkIn,
    }));

    return NextResponse.json({
      success: true,
      data: {
        totalEarnings,
        thisMonthEarnings,
        totalBookings: bookings.length,
        transactions,
      },
    });
  } catch (error) {
    console.error("HOST_EARNING_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load earnings.",
      },
      { status: 500 }
    );
  }
}