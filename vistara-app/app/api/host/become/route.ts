import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required.",
        },
        { status: 401 }
      );
    }

    const currentUser = await prisma.user.findUnique({
      where: {
        id: user.id,
      },
      select: {
        id: true,
        name: true,
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
        { status: 404 }
      );
    }

    if (currentUser.role === "HOST") {
      return NextResponse.json({
        success: true,
        message: "You are already a host.",
        data: currentUser,
      });
    }

    if (currentUser.role !== "GUEST") {
      return NextResponse.json(
        {
          success: false,
          message: "This account cannot become a host.",
        },
        { status: 403 }
      );
    }

    const host = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        role: "HOST",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "You are now a Vistara host.",
      data: host,
    });
  } catch (error) {
    console.error("BECOME_HOST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to become a host.",
      },
      { status: 500 }
    );
  }
}