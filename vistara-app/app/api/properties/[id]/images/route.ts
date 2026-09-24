import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function POST(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireRole(req, [
      "HOST",
      "ADMIN",
    ]);

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
          message: "You cannot edit this property",
        },
        { status: 403 }
      );
    }

    const body = await req.json();

    const { url, isPrimary } = body;

    if (!url) {
      return NextResponse.json(
        {
          success: false,
          message: "Image URL is required",
        },
        { status: 400 }
      );
    }

    if (isPrimary) {
      await prisma.propertyImage.updateMany({
        where: {
          propertyId,
        },
        data: {
          isPrimary: false,
        },
      });
    }

    const image = await prisma.propertyImage.create({
      data: {
        propertyId,
        url: url.trim(),
        isPrimary: Boolean(isPrimary),
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Image added successfully",
        image,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("ADD_PROPERTY_IMAGE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to add property image",
      },
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: Params
) {
  try {
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

    const images = await prisma.propertyImage.findMany({
      where: {
        propertyId,
      },
      orderBy: [
        {
          isPrimary: "desc",
        },
        {
          createdAt: "asc",
        },
      ],
    });

    return NextResponse.json({
      success: true,
      images,
    });
  } catch (error) {
    console.error("GET_PROPERTY_IMAGES_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch property images",
      },
      { status: 500 }
    );
  }
}