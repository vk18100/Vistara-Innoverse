import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

export async function GET(req: Request) {
  try {
    const { user, response } = await requireRole(req, ["ADMIN"]);

    if (response) {
      return response;
    }

    const properties = await prisma.property.findMany({
      orderBy: {
        createdAt: "desc",
      },
      include: {
        images: true,
        host: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        verification: true,
      },
    });

    return NextResponse.json({
      success: true,
      properties,
    });
  } catch (error) {
    console.error("ADMIN_PROPERTIES_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch admin data",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { user, response } = await requireRole(req, ["ADMIN"]);

    if (response) {
      return response;
    }

    const body = await req.json();

    const propertyId = Number(body.propertyId);
    const status = body.status;

    const allowedStatus = [
      "DRAFT",
      "PENDING_VERIFICATION",
      "VERIFIED",
      "REJECTED",
      "INACTIVE",
    ];

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    if (!allowedStatus.includes(status)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property status",
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

    const updatedProperty = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status,
      },
    });

    return NextResponse.json({
      success: true,
      message: `Property ${status.toLowerCase()}`,
      property: updatedProperty,
    });
  } catch (error) {
    console.error("ADMIN_UPDATE_PROPERTY_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update property",
      },
      { status: 500 }
    );
  }
}