import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // --------------------------------
    // Parse request
    // --------------------------------

    const body = await req.json();

    const token =
      typeof body?.token === "string"
        ? body.token.trim()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    // --------------------------------
    // Validation
    // --------------------------------

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Reset token and password are required.",
        },
        { status: 400 }
      );
    }

    if (password.length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Find valid reset token
    // --------------------------------

    const user = await prisma.user.findFirst({
      where: {
        resetToken: token,
        resetTokenExpiry: {
          gt: new Date(),
        },
      },

      select: {
        id: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "This reset link is invalid or has expired.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Hash new password
    // --------------------------------

    const hashedPassword = await bcrypt.hash(
      password,
      12
    );

    // --------------------------------
    // Update password
    // Invalidate reset token
    // --------------------------------

    await prisma.user.update({
      where: {
        id: user.id,
      },

      data: {
        password: hashedPassword,
        resetToken: null,
        resetTokenExpiry: null,
      },
    });

    // --------------------------------
    // Success
    // --------------------------------

    return NextResponse.json(
      {
        success: true,
        message: "Password reset successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("RESET_PASSWORD_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to reset password. Please try again.",
      },
      { status: 500 }
    );
  }
}