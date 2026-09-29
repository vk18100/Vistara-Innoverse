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
        name: true,
        email: true,
        role: true,
        phone: true,
        createdAt: true,

        profile: {
          select: {
            avatar: true,
          },
        },
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
        account: currentUser,

        sections: {
          profile: "/settings/profile",
          preferences: "/settings/preferences",
          privacy: "/settings/privacy",
          security: "/settings/security",
          help: "/settings/help",
        },
      },
    });
  } catch (error) {
    console.error("SETTINGS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load settings.",
      },
      {
        status: 500,
      }
    );
  }
}