import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================
   GET /api/guides/[id]
   Public — single guide
========================= */

export async function GET(
  req: NextRequest,
  { params }: Params
) {
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
            id: true,
            name: true,
            email: true,
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
        id: String(guide.id),

        name:
          guide.user.name?.trim() ||
          "Vistara Local Guide",

        location: guide.city,

        city: guide.city,

        image:
          guide.user.profile?.avatar ||
          "/images/profile.jpg",

        bio: guide.bio || "",

        description: guide.bio || "",

        languages: guide.languages || [],

        specialties: guide.specialties || [],

        experience: guide.experienceYears || 0,

        experienceYears:
          guide.experienceYears || 0,

        price: guide.hourlyRate
          ? Number(guide.hourlyRate)
          : 0,

        hourlyRate: guide.hourlyRate
          ? Number(guide.hourlyRate)
          : null,

        halfDayRate: guide.halfDayRate
          ? Number(guide.halfDayRate)
          : null,

        fullDayRate: guide.fullDayRate
          ? Number(guide.fullDayRate)
          : null,

        rating: Number(guide.rating || 0),

        reviews: guide.reviewCount || 0,

        reviewCount: guide.reviewCount || 0,

        verified: true,

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