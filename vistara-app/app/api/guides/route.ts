import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

/**
 * GET /api/guides
 *
 * Get all active guides.
 *
 * Optional:
 * /api/guides?city=Patna
 */
export async function GET(req: NextRequest) {
  try {
    const city = req.nextUrl.searchParams.get("city");

    const guides = await prisma.guideProfile.findMany({
      where: {
        isActive: true,

        ...(city
          ? {
              city: {
                equals: city,
                mode: "insensitive",
              },
            }
          : {}),
      },

      orderBy: [
        {
          rating: "desc",
        },
        {
          reviewCount: "desc",
        },
      ],

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

      data: {
        guides,
        count: guides.length,
      },
    });
  } catch (error) {
    console.error("GUIDE_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guides.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * POST /api/guides
 *
 * Create / update guide profile.
 *
 * Allowed:
 * GUIDE
 * ADMIN
 */
export async function POST(req: NextRequest) {
  const { user, response } = await requireRole(req, [
    "GUIDE",
    "ADMIN",
  ]);

  if (response) {
    return response;
  }

  try {
    const body = await req.json();

    if (!body.city) {
      return NextResponse.json(
        {
          success: false,
          message: "City is required.",
        },
        {
          status: 400,
        }
      );
    }

    const experienceYears =
      body.experienceYears == null
        ? null
        : Number(body.experienceYears);

    const hourlyRate =
      body.hourlyRate == null
        ? null
        : Number(body.hourlyRate);

    const halfDayRate =
      body.halfDayRate == null
        ? null
        : Number(body.halfDayRate);

    const fullDayRate =
      body.fullDayRate == null
        ? null
        : Number(body.fullDayRate);

    const guide = await prisma.guideProfile.upsert({
      where: {
        userId: user!.id,
      },

      update: {
        city: body.city,

        bio: body.bio ?? null,

        languages: body.languages ?? null,

        specialties: body.specialties ?? null,

        experienceYears,

        hourlyRate,

        halfDayRate,

        fullDayRate,
      },

      create: {
        userId: user!.id,

        city: body.city,

        bio: body.bio ?? null,

        languages: body.languages ?? null,

        specialties: body.specialties ?? null,

        experienceYears,

        hourlyRate,

        halfDayRate,

        fullDayRate,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Guide profile saved.",
        data: guide,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("GUIDE_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save guide profile.",
      },
      {
        status: 500,
      }
    );
  }
}