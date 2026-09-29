import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _req: NextRequest,
  { params }: Params
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
        {
          status: 400,
        }
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
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: guide,
    });
  } catch (error) {
    console.error("GUIDE_DETAIL_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guide.",
      },
      {
        status: 500,
      }
    );
  }
}