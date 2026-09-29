import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

/**
 * GET /api/settings/profile
 * Load current user's profile
 */
export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    const profile = await prisma.user.findUnique({
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

    if (!profile) {
      return NextResponse.json(
        {
          success: false,
          message: "Profile not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        profile,
      },
    });
  } catch (error) {
    console.error("PROFILE_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load profile.",
      },
      {
        status: 500,
      }
    );
  }
}

/**
 * PATCH /api/settings/profile
 * Update current user's profile
 */
export async function PATCH(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    const body = await req.json();

    const name =
      body.name !== undefined
        ? String(body.name).trim()
        : undefined;

    const phone =
      body.phone !== undefined
        ? String(body.phone).trim()
        : undefined;

    if (name !== undefined && !name) {
      return NextResponse.json(
        {
          success: false,
          message: "Name cannot be empty.",
        },
        {
          status: 400,
        }
      );
    }

    const updatedUser = await prisma.user.update({
      where: {
        id: user!.id,
      },

      data: {
        ...(name !== undefined ? { name } : {}),
        ...(phone !== undefined ? { phone } : {}),
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        phone: true,

        profile: {
          select: {
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully.",
      data: {
        profile: updatedUser,
      },
    });
  } catch (error) {
    console.error("PROFILE_UPDATE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update profile.",
      },
      {
        status: 500,
      }
    );
  }
}