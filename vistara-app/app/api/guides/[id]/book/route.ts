import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

/*
|--------------------------------------------------------------------------
| GET
| Load guide for booking page
|--------------------------------------------------------------------------
*/

export async function GET(
  _req: NextRequest,
  { params }: Context
) {
  try {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (!Number.isInteger(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid guide id.",
        },
        { status: 400 }
      );
    }

    const guide = await prisma.guideProfile.findUnique({
      where: {
        id,
      },

      include: {
        user: {
          select: {
            id: true,
            name: true,

            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },

        availability: {
          where: {
            isActive: true,
          },
        },
      },
    });

    if (!guide || !guide.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Guide not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        guide,
      },
    });
  } catch (error) {
    console.error("GUIDE_BOOK_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guide.",
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST
| Create Guide Booking
|--------------------------------------------------------------------------
*/

export async function POST(
  req: NextRequest,
  { params }: Context
) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    /*
    |--------------------------------------------------------------------------
    | Guide ID
    |--------------------------------------------------------------------------
    */

    const { id: idParam } = await params;

    const guideId = Number(idParam);

    if (!Number.isInteger(guideId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid guide id.",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Request body
    |--------------------------------------------------------------------------
    */

    const body = await req.json();

    const {
      date,
      startTime,
      duration,
      guests,
    } = body;

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    if (!date) {
      return NextResponse.json(
        {
          success: false,
          message: "Date is required.",
        },
        { status: 400 }
      );
    }

    if (!startTime) {
      return NextResponse.json(
        {
          success: false,
          message: "Start time is required.",
        },
        { status: 400 }
      );
    }

    const durationHours = Number(duration);

    if (
      !Number.isFinite(durationHours) ||
      durationHours <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid duration is required.",
        },
        { status: 400 }
      );
    }

    const guestCount = Number(guests ?? 1);

    if (
      !Number.isInteger(guestCount) ||
      guestCount <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Valid guest count is required.",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Find guide
    |--------------------------------------------------------------------------
    */

    const guide = await prisma.guideProfile.findUnique({
      where: {
        id: guideId,
      },

      select: {
        id: true,
        userId: true,
        city: true,
        isActive: true,
        hourlyRate: true,
      },
    });

    if (!guide || !guide.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Guide is not available.",
        },
        { status: 404 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Prevent self booking
    |--------------------------------------------------------------------------
    */

    if (guide.userId === user!.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot book yourself as a guide.",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Create start DateTime
    |--------------------------------------------------------------------------
    |
    | Frontend sends:
    | date      = "2026-09-28"
    | startTime = "10:00"
    |
    */

    const startDateTime = new Date(
      `${date}T${startTime}:00`
    );

    if (Number.isNaN(startDateTime.getTime())) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid date or start time.",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Calculate end DateTime
    |--------------------------------------------------------------------------
    */

    const endDateTime = new Date(
      startDateTime.getTime() +
        durationHours * 60 * 60 * 1000
    );

    /*
    |--------------------------------------------------------------------------
    | Calculate amount
    |--------------------------------------------------------------------------
    */

    const hourlyRate = Number(
      guide.hourlyRate ?? 0
    );

    const amount =
      hourlyRate * durationHours;

    /*
    |--------------------------------------------------------------------------
    | Create booking
    |--------------------------------------------------------------------------
    */

    const booking =
      await prisma.guideBooking.create({
        data: {
          guestId: user!.id,

          guideId: guide.id,

          startTime: startDateTime,

          endTime: endDateTime,

          guests: guestCount,

          amount,

          status: "PENDING",
        },
      });

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    return NextResponse.json(
      {
        success: true,

        message:
          "Guide booking request created successfully.",

        data: {
          booking,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "GUIDE_BOOK_POST_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to create guide booking.",
      },
      { status: 500 }
    );
  }
}