import { NextResponse } from "next/server";

import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");

    const token = cookieHeader
      ?.split("; ")
      .find((cookie) => cookie.startsWith("vistara_token="))
      ?.split("=")[1];

    // No authentication cookie
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: "Not authenticated",
        },
        { status: 401 }
      );
    }

    // Verify JWT
    const payload = verifyToken(token);

    if (!payload) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid or expired session",
        },
        { status: 401 }
      );
    }

    // Find user from JWT userId
    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
        createdAt: true,
        profile: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("ME_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Invalid or expired session",
      },
      { status: 401 }
    );
  }
}