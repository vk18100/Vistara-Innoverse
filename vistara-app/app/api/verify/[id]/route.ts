import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      select: {
        id: true,
        hostId: true,
        status: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found",
        },
        { status: 404 }
      );
    }

    if (
      user!.role === "HOST" &&
      property.hostId !== user!.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot access this verification",
        },
        { status: 403 }
      );
    }

    if (
      user!.role !== "HOST" &&
      user!.role !== "ADMIN"
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied",
        },
        { status: 403 }
      );
    }

    const verification =
      await prisma.propertyVerification.findUnique({
        where: {
          propertyId,
        },
      });

    return NextResponse.json({
      success: true,
      verification,
    });
  } catch (error) {
    console.error("GET_VERIFICATION_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch verification",
      },
      { status: 500 }
    );
  }
}

export async function POST(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (user!.role !== "HOST") {
      return NextResponse.json(
        {
          success: false,
          message: "Only hosts can submit verification",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found",
        },
        { status: 404 }
      );
    }

    if (property.hostId !== user!.id) {
      return NextResponse.json(
        {
          success: false,
          message: "You cannot verify this property",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const {
      identityDocument,
      ownershipDocument,
      certificateDocument,
      notes,
    } = body;

    if (
      !identityDocument ||
      !ownershipDocument ||
      !certificateDocument
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Identity, ownership and certificate documents are required",
        },
        { status: 400 }
      );
    }

    const verification =
      await prisma.propertyVerification.upsert({
        where: {
          propertyId,
        },
        update: {
          identityDocument,
          ownershipDocument,
          certificateDocument,
          notes: notes || null,
          identityStatus: "PENDING",
          ownershipStatus: "PENDING",
          certificateStatus: "PENDING",
          submittedAt: new Date(),
          verifiedAt: null,
        },
        create: {
          propertyId,
          userId: user!.id,
          identityDocument,
          ownershipDocument,
          certificateDocument,
          notes: notes || null,
          identityStatus: "PENDING",
          ownershipStatus: "PENDING",
          certificateStatus: "PENDING",
          submittedAt: new Date(),
        },
      });

    await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status: "PENDING_VERIFICATION",
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Verification submitted successfully",
        verification,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("SUBMIT_VERIFICATION_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to submit verification",
      },
      { status: 500 }
    );
  }
}