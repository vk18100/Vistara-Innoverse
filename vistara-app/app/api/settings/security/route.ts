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
        password: true,
        role: true,
        createdAt: true,
        updatedAt: true,
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
        account: {
          id: currentUser.id,
          email: currentUser.email,
          role: currentUser.role,
        },

        security: {
          passwordEnabled: Boolean(currentUser.password),

          twoFactorAuthentication: {
            enabled: false,
            available: false,
          },

          lastUpdated: currentUser.updatedAt,
        },
      },
    });
  } catch (error) {
    console.error("SECURITY_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load security settings.",
      },
      {
        status: 500,
      }
    );
  }
}