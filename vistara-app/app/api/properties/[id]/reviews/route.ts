import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      select: {
        id: true,
        rating: true,
        reviewCount: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found",
        },
        { status: 404 }
      );
    }

    const reviews = await prisma.review.findMany({
      where: {
        propertyId,
      },
      orderBy: {
        createdAt: "desc",
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
      },
    });

    return NextResponse.json({
      success: true,
      rating: property.rating,
      reviewCount: property.reviewCount,
      reviews,
    });
  } catch (error) {
    console.error("GET_REVIEWS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch reviews",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const {
      bookingId,
      rating,
      comment,
    } = body;

    if (!bookingId || rating === undefined) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking id and rating are required",
        },
        { status: 400 }
      );
    }

    const bookingIdNumber = Number(bookingId);
    const ratingNumber = Number(rating);

    if (Number.isNaN(bookingIdNumber)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid booking id",
        },
        { status: 400 }
      );
    }

    if (
      Number.isNaN(ratingNumber) ||
      ratingNumber < 1 ||
      ratingNumber > 5 ||
      !Number.isInteger(ratingNumber)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Rating must be an integer between 1 and 5",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found",
        },
        { status: 404 }
      );
    }

    const booking = await prisma.booking.findUnique({
      where: {
        id: bookingIdNumber,
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

    if (booking.guestId !== user!.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You can only review your own booking",
        },
        { status: 403 }
      );
    }

    if (booking.propertyId !== propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "Booking does not belong to this property",
        },
        { status: 400 }
      );
    }

    if (booking.status !== "COMPLETED") {
      return NextResponse.json(
        {
          success: false,
          message: "You can review only after completing the stay",
        },
        { status: 400 }
      );
    }

    const existingReview = await prisma.review.findUnique({
      where: {
        bookingId: bookingIdNumber,
      },
    });

    if (existingReview) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already reviewed this booking",
        },
        { status: 409 }
      );
    }

    const review = await prisma.review.create({
      data: {
        userId: user!.id,
        propertyId,
        bookingId: bookingIdNumber,
        rating: ratingNumber,
        comment:
          typeof comment === "string"
            ? comment.trim() || null
            : null,
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
      },
    });

    const stats = await prisma.review.aggregate({
      where: {
        propertyId,
      },
      _avg: {
        rating: true,
      },
      _count: {
        id: true,
      },
    });

    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        rating: stats._avg.rating ?? 0,
        reviewCount: stats._count.id,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Review added successfully",
        review,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_REVIEW_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create review",
      },
      { status: 500 }
    );
  }
}