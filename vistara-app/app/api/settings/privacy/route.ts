import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    const currentUser = await prisma.user.findUnique({
      where: {
        id: user!.id,
      },

      select: {
        id: true,
        email: true,
        role: true,
      },
    });

    if (!currentUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,

      data: {
        privacy: {
          profileVisibility: "PUBLIC",
          showEmail: false,
          showPhone: false,
          personalizedRecommendations: true,
        },
      },
    });
  } catch (error) {
    console.error("PRIVACY_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load privacy settings.",
      },
      {
        status: 500,
      }
    );
  }
}