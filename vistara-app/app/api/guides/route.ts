import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* =========================
   GET /api/guide
   Public — list bookable local guides
   optional query: ?city=Patna
========================= */

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const city = searchParams.get("city");

    const guides = await prisma.guideProfile.findMany({
      where: {
        isActive: true,
        isVerified: true,
        ...(city ? { city } : {}),
      },
      orderBy: {
        rating: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
      },
    });

    const formatted = guides.map((guide) => ({
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
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("GUIDE_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guides.",
      },
      { status: 500 }
    );
  }
}