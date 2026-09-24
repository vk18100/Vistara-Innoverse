import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

const allowedStatus = [
  "PENDING",
  "CONFIRMED",
  "CANCELLED",
  "COMPLETED",
] as const;

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const { id } = await params;
    const bookingId = Number(id);

    if (Number.isNaN(bookingId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking id",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        property: {
          include: {
            images: true,
            host: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
        guest: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
          },
        },
        review: true,
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    const isGuest = booking.guestId === user!.id;
    const isHost = booking.property.hostId === user!.id;
    const isAdmin = user!.role === "ADMIN";

    if (!isGuest && !isHost && !isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      booking,
    });
  } catch (error) {
    console.error("GET_BOOKING_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch booking",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const { id } = await params;
    const bookingId = Number(id);

    if (Number.isNaN(bookingId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking id",
        },
        { status: 400 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingId,
      },
      include: {
        property: {
          select: {
            id: true,
            hostId: true,
          },
        },
      },
    });

    if (!booking) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking not found",
        },
        { status: 404 }
      );
    }

    const isGuest = booking.guestId === user!.id;
    const isHost = booking.property.hostId === user!.id;
    const isAdmin = user!.role === "ADMIN";

    if (!isGuest && !isHost && !isAdmin) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const status = body.status;

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking status",
        },
        { status: 400 }
      );
    }

    // Guest can only cancel their own booking.
    if (isGuest && !isHost && !isAdmin) {
      if (status !== "CANCELLED") {
        return NextResponse.json(
          {
            success: false,
            message:
              "Guest can only cancel a booking",
          },
          { status: 403 }
        );
      }

      if (
        booking.status === "COMPLETED" ||
        booking.status === "CANCELLED"
      ) {
        return NextResponse.json(
          {
            success: false,
            message: "Booking cannot be cancelled",
          },
          { status: 400 }
        );
      }
    }

    // Host/Admin can manage booking status.
    if (isHost || isAdmin) {
      if (
        booking.status === "CANCELLED" &&
        status !== "CANCELLED"
      ) {
        return NextResponse.json(
          {
            success: false,
            message:
              "Cancelled booking cannot be changed",
          },
          { status: 400 }
        );
      }
    }

    const updatedBooking =
      await prisma.booking.update({
        where: {
          id: bookingId,
        },
        data: {
          status,
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

    return NextResponse.json({
      success: true,
      message: "Booking updated successfully",
      booking: updatedBooking,
    });
  } catch (error) {
    console.error("UPDATE_BOOKING_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update booking",
      },
      { status: 500 }
    );
  }
}