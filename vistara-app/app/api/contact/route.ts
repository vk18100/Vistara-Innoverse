import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 254;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    // Parse request body safely
    let body: unknown;

    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    // Make sure body is a valid object
    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    // Extract fields safely
    const {
      name,
      email,
      subject,
      message,
    } = body as Record<string, unknown>;

    // Type validation
    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields must be valid text values.",
        },
        { status: 400 }
      );
    }

    // Trim input
    const cleanName = name.trim();
    const cleanEmail = email.trim().toLowerCase();
    const cleanSubject = subject.trim();
    const cleanMessage = message.trim();

    // Required field validation
    if (
      !cleanName ||
      !cleanEmail ||
      !cleanSubject ||
      !cleanMessage
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All fields are required.",
        },
        { status: 400 }
      );
    }

    // Length validation
    if (cleanName.length > MAX_NAME_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: `Name must be ${MAX_NAME_LENGTH} characters or less.`,
        },
        { status: 400 }
      );
    }

    if (cleanEmail.length > MAX_EMAIL_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    if (cleanSubject.length > MAX_SUBJECT_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: `Subject must be ${MAX_SUBJECT_LENGTH} characters or less.`,
        },
        { status: 400 }
      );
    }

    if (cleanMessage.length > MAX_MESSAGE_LENGTH) {
      return NextResponse.json(
        {
          success: false,
          message: `Message must be ${MAX_MESSAGE_LENGTH} characters or less.`,
        },
        { status: 400 }
      );
    }

    // Email validation
    if (!EMAIL_REGEX.test(cleanEmail)) {
      return NextResponse.json(
        {
          success: false,
          message: "Please enter a valid email address.",
        },
        { status: 400 }
      );
    }

    // Save contact message
    const contact = await prisma.contactMessage.create({
      data: {
        name: cleanName,
        email: cleanEmail,
        subject: cleanSubject,
        message: cleanMessage,
      },
    });

    // Success response
    return NextResponse.json(
      {
        success: true,
        message: "Your message has been sent successfully.",
        data: {
          id: contact.id,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    // Log detailed error only on the server
    console.error("CONTACT_API_ERROR:", error);

    // Do not expose internal/database error details to the client
    return NextResponse.json(
      {
        success: false,
        message: "Something went wrong. Please try again later.",
      },
      { status: 500 }
    );
  }
}