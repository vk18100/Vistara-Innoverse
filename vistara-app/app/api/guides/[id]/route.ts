import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================
   GET /api/guide/[id]
   Public — single guide profile with availability
========================= */

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const guideId = Number(id);

    if (!Number.isInteger(guideId) || guideId <= 0) {
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
        id: guideId,
      },
      include: {
        user: {
          select: {
            name: true,
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

    if (!guide) {
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
        id: guide.id,
        name: guide.user.name,
        city: guide.city,
        bio: guide.bio,
        languages: guide.languages,
        specialties: guide.specialties,
        experienceYears: guide.experienceYears,
        hourlyRate: guide.hourlyRate ? Number(guide.hourlyRate) : null,
        halfDayRate: guide.halfDayRate ? Number(guide.halfDayRate) : null,
        fullDayRate: guide.fullDayRate ? Number(guide.fullDayRate) : null,
        rating: guide.rating,
        reviewCount: guide.reviewCount,
        availability: guide.availability,
      },
    });
  } catch (error) {
    console.error("GUIDE_DETAIL_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load this guide.",
      },
      { status: 500 }
    );
  }
}