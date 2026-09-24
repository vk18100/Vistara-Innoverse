import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

type Params = {
  params: Promise<{
    id: string;
    imageId: string;
  }>;
};

export async function PATCH(
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

    const { id, imageId } = await params;

    const propertyId = Number(id);
    const imageIdNumber = Number(imageId);

    if (
      Number.isNaN(propertyId) ||
      Number.isNaN(imageIdNumber)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property or image id",
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

    const image = await prisma.propertyImage.findFirst({
      where: {
        id: imageIdNumber,
        propertyId,
      },
    });

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found",
        },
        { status: 404 }
      );
    }

    const body = await req.json();

    if (body.isPrimary !== true) {
      return NextResponse.json(
        {
          success: false,
          message: "isPrimary must be true",
        },
        { status: 400 }
      );
    }

    await prisma.propertyImage.updateMany({
      where: {
        propertyId,
      },
      data: {
        isPrimary: false,
      },
    });

    const updatedImage =
      await prisma.propertyImage.update({
        where: {
          id: imageIdNumber,
        },
        data: {
          isPrimary: true,
        },
      });

    return NextResponse.json({
      success: true,
      message: "Primary image updated",
      image: updatedImage,
    });
  } catch (error) {
    console.error("UPDATE_PROPERTY_IMAGE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update property image",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const { id, imageId } = await params;

    const propertyId = Number(id);
    const imageIdNumber = Number(imageId);

    if (
      Number.isNaN(propertyId) ||
      Number.isNaN(imageIdNumber)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property or image id",
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

    const image = await prisma.propertyImage.findFirst({
      where: {
        id: imageIdNumber,
        propertyId,
      },
    });

    if (!image) {
      return NextResponse.json(
        {
          success: false,
          message: "Image not found",
        },
        { status: 404 }
      );
    }

    await prisma.propertyImage.delete({
      where: {
        id: imageIdNumber,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_PROPERTY_IMAGE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete property image",
      },
      { status: 500 }
    );
  }
}