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
| GET /api/guides/[id]/book
| Load guide for booking
|--------------------------------------------------------------------------
*/

export async function GET(
  _req: NextRequest,
  { params }: Context
) {
  try {
    const { id: idParam } = await params;
    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
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
            startTime: {
              gte: new Date(),
            },
          },
          orderBy: {
            startTime: "asc",
          },
        },
      },
    });

    if (!guide || !guide.isActive) {
      return NextResponse.json(
        {
          success: false,
          message: "Guide not found or unavailable.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        guide: {
          id: guide.id,
          name: guide.user.name,
          city: guide.city,
          bio: guide.bio,
          languages: guide.languages,
          specialties: guide.specialties,
          experienceYears: guide.experienceYears,
          hourlyRate: guide.hourlyRate
            ? Number(guide.hourlyRate)
            : 0,
          halfDayRate: guide.halfDayRate
            ? Number(guide.halfDayRate)
            : null,
          fullDayRate: guide.fullDayRate
            ? Number(guide.fullDayRate)
            : null,
          rating: Number(guide.rating || 0),
          reviewCount: guide.reviewCount || 0,
          image:
            guide.user.profile?.avatar ||
            "/images/profile.jpg",
          availability: guide.availability,
        },
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
| POST /api/guides/[id]/book
| Create guide booking
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
    const { id: idParam } = await params;
    const guideId = Number(idParam);

    if (!Number.isInteger(guideId) || guideId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid guide id.",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const {
      date,
      startTime,
      duration,
      guests = 1,
    } = body;

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
      durationHours <= 0 ||
      durationHours > 12
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Duration must be between 1 and 12 hours.",
        },
        { status: 400 }
      );
    }

    const guestCount = Number(guests);

    if (
      !Number.isInteger(guestCount) ||
      guestCount < 1 ||
      guestCount > 20
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Guests must be between 1 and 20.",
        },
        { status: 400 }
      );
    }

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

    if (guide.userId === user!.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot book yourself as a guide.",
        },
        { status: 400 }
      );
    }

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

    if (startDateTime <= new Date()) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking time must be in the future.",
        },
        { status: 400 }
      );
    }

    const endDateTime = new Date(
      startDateTime.getTime() +
        durationHours * 60 * 60 * 1000
    );

    /*
    |--------------------------------------------------------------------------
    | Check overlapping guide bookings
    |--------------------------------------------------------------------------
    */

    const existingBooking =
      await prisma.guideBooking.findFirst({
        where: {
          guideId: guide.id,

          status: {
            in: ["PENDING", "CONFIRMED"],
          },

          startTime: {
            lt: endDateTime,
          },

          endTime: {
            gt: startDateTime,
          },
        },
      });

    if (existingBooking) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Guide is already booked for this time.",
        },
        { status: 409 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Calculate price
    |--------------------------------------------------------------------------
    */

    const hourlyRate = Number(
      guide.hourlyRate ?? 0
    );

    const amount = hourlyRate * durationHours;

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

    return NextResponse.json(
      {
        success: true,
        message:
          "Guide booking created successfully.",
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
        message: "Unable to create guide booking.",
      },
      { status: 500 }
    );
  }
}