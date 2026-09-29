import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function PATCH(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    const body = await req.json();

    const {
      currentPassword,
      newPassword,
      confirmPassword,
    } = body;

    // -----------------------------
    // Validation
    // -----------------------------

    if (!currentPassword || !newPassword || !confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "All password fields are required.",
        },
        { status: 400 }
      );
    }

    if (newPassword.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "New password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    if (newPassword !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "New passwords do not match.",
        },
        { status: 400 }
      );
    }

    if (currentPassword === newPassword) {
      return NextResponse.json(
        {
          success: false,
          message:
            "New password must be different from your current password.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Get current user
    // -----------------------------

    const dbUser = await prisma.user.findUnique({
      where: {
        id: user!.id,
      },
      select: {
        id: true,
        password: true,
      },
    });

    if (!dbUser) {
      return NextResponse.json(
        {
          success: false,
          message: "User not found.",
        },
        { status: 404 }
      );
    }

    // -----------------------------
    // Check current password
    // -----------------------------

    if (!dbUser.password) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Password login is not available for this account.",
        },
        { status: 400 }
      );
    }

    const passwordMatches = await bcrypt.compare(
      currentPassword,
      dbUser.password
    );

    if (!passwordMatches) {
      return NextResponse.json(
        {
          success: false,
          message: "Current password is incorrect.",
        },
        { status: 400 }
      );
    }

    // -----------------------------
    // Hash new password
    // -----------------------------

    const hashedPassword = await bcrypt.hash(
      newPassword,
      12
    );

    // -----------------------------
    // Update password
    // -----------------------------

    await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        password: hashedPassword,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Password changed successfully.",
    });
  } catch (error) {
    console.error(
      "CHANGE_PASSWORD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to change password.",
      },
      { status: 500 }
    );
  }
}