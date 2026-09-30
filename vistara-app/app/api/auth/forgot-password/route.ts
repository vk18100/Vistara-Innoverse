import { NextResponse } from "next/server";
import crypto from "crypto";

import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/mailer";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const email =
      typeof body.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          message: "Email address is required.",
        },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    /*
     * Don't reveal whether an account exists.
     */
    if (!user) {
      return NextResponse.json({
        success: true,
        message:
          "If an account exists with this email, we've sent password reset instructions.",
      });
    }

    // Generate secure reset token
    const resetToken = crypto
      .randomBytes(32)
      .toString("hex");

    // Token expires in 30 minutes
    const resetTokenExpiry = new Date(
      Date.now() + 30 * 60 * 1000
    );

    // Save token
    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        resetToken,
        resetTokenExpiry,
      },
    });

    const baseUrl =
      process.env.NEXT_PUBLIC_APP_URL ||
      "http://localhost:3000";

    const resetUrl =
      `${baseUrl}/reset-password?token=${resetToken}`;

    // Send email
    await sendPasswordResetEmail(
      email,
      resetUrl
    );

    console.log(
      "PASSWORD RESET EMAIL SENT:",
      email
    );

    return NextResponse.json({
      success: true,
      message:
        "If an account exists with this email, we've sent password reset instructions.",
    });
  } catch (error) {
    console.error(
      "FORGOT_PASSWORD_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to process your request. Please try again.",
      },
      { status: 500 }
    );
  }
}