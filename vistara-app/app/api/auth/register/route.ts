import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { createToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    // --------------------------------
    // Parse request
    // --------------------------------

    const body = await req.json();

    const name =
      typeof body?.name === "string"
        ? body.name.trim()
        : "";

    const email =
      typeof body?.email === "string"
        ? body.email.trim().toLowerCase()
        : "";

    const password =
      typeof body?.password === "string"
        ? body.password
        : "";

    // --------------------------------
    // Validation
    // --------------------------------

    if (!name || !email || !password) {
      return NextResponse.json(
        {
          success: false,
          message: "Name, email and password are required.",
        },
        { status: 400 }
      );
    }

    if (name.length > 100) {
      return NextResponse.json(
        {
          success: false,
          message: "Name must be 100 characters or less.",
        },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 6 characters.",
        },
        { status: 400 }
      );
    }

    // --------------------------------
    // Check existing user
    // --------------------------------

    const existingUser = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "An account with this email already exists.",
        },
        { status: 409 }
      );
    }

    // --------------------------------
    // Hash password
    // --------------------------------

    const hashedPassword = await bcrypt.hash(password, 10);

    // --------------------------------
    // Create user
    // --------------------------------

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "GUEST",
      },

      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    // --------------------------------
    // Create authentication token
    // --------------------------------

    const token = createToken({
      userId: user.id,
      email: user.email,
      role: user.role as
        | "GUEST"
        | "HOST"
        | "GUIDE"
        | "ADMIN",
    });

    // --------------------------------
    // Create response + cookie
    // --------------------------------

    const response = NextResponse.json(
      {
        success: true,
        message: "Account created successfully.",
        user,
      },
      { status: 201 }
    );

    response.cookies.set({
      name: "vistara_token",
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("REGISTER_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create your account. Please try again.",
      },
      { status: 500 }
    );
  }
}