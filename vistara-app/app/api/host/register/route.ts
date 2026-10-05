import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const {
      firstName,
      lastName,
      email,
      phone,
      password,
      confirmPassword,
    } = body;

    // 1. Required fields
    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      !confirmPassword
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Please fill all required fields.",
        },
        { status: 400 }
      );
    }

    // 2. Clean data
    const cleanFirstName = String(firstName).trim();
    const cleanLastName = String(lastName).trim();
    const cleanEmail = String(email).trim().toLowerCase();
    const cleanPhone = String(phone).trim();

    // 3. Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // 4. Password validation
    if (String(password).length < 8) {
      return NextResponse.json(
        {
          success: false,
          message: "Password must be at least 8 characters.",
        },
        { status: 400 }
      );
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        {
          success: false,
          message: "Passwords do not match.",
        },
        { status: 400 }
      );
    }

    // 5. Phone validation
    const phoneDigits = cleanPhone.replace(/\D/g, "");

    if (phoneDigits.length < 10) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid phone number.",
        },
        { status: 400 }
      );
    }

    // 6. Check existing account
    const existingUser = await prisma.user.findUnique({
      where: {
        email: cleanEmail,
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

    // 7. Hash password
    const hashedPassword = await bcrypt.hash(
      String(password),
      12
    );

    // 8. Create HOST
    const user = await prisma.user.create({
      data: {
        name: `${cleanFirstName} ${cleanLastName}`,
        email: cleanEmail,
        password: hashedPassword,
        role: "HOST",
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    console.log("HOST REGISTERED:", {
      id: user.id,
      email: user.email,
      role: user.role,
    });

    // 9. Success
    return NextResponse.json(
      {
        success: true,
        message: "Host account created successfully.",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("HOST_REGISTER_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to create host account.",
      },
      { status: 500 }
    );
  }
}