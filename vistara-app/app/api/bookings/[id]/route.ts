import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    // -----------------------------------------
    // AUTH
    // -----------------------------------------

    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized",
        },
        { status: 401 }
      );
    }

    // -----------------------------------------
    // GET BOOKING ID
    // -----------------------------------------

    const { id } = await params;

    const bookingId = Number(id);

    if (
      !id ||
      !Number.isInteger(bookingId) ||
      bookingId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking id",
        },
        { status: 400 }
      );
    }

    // -----------------------------------------
    // FIND USER'S BOOKING
    // -----------------------------------------

    const booking = await prisma.booking.findFirst({
      where: {
        id: bookingId,
        guestId: user.id,
      },

      include: {
        property: {
          include: {
            images: {
              orderBy: {
                isPrimary: "desc",
              },
            },
          },
        },
      },
    });

    // -----------------------------------------
    // NOT FOUND
    // -----------------------------------------

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    // -----------------------------------------
    // SUCCESS
    // -----------------------------------------

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error(
      "GET_BOOKING_BY_ID_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking",
      },
      { status: 500 }
    );
  }
}