import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

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
      include: {
        images: {
          orderBy: {
            isPrimary: "desc",
          },
        },

        amenities: {
          include: {
            amenity: true,
          },
        },

        host: {
          select: {
            id: true,
            name: true,
            createdAt: true,
            profile: {
              select: {
                avatar: true,
                bio: true,
                city: true,
                country: true,
              },
            },
          },
        },

        reviews: {
          orderBy: {
            createdAt: "desc",
          },
          include: {
            user: {
              select: {
                id: true,
                name: true,
                profile: {
                  select: {
                    avatar: true,
                  },
                },
              },
            },
          },
        },
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

    if (property.status !== "VERIFIED") {
      return NextResponse.json(
        {
          success: false,
          message: "Property is not available",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      property,
    });
  } catch (error) {
    console.error("GET_PROPERTY_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch property",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(
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

    const { user, response } = await requireRole(req, [
      "HOST",
      "ADMIN",
    ]);

    if (response) {
      return response;
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

    // Host can only edit their own property
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

    const updatedProperty = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        ...(body.title !== undefined && {
          title: body.title,
        }),

        ...(body.description !== undefined && {
          description: body.description,
        }),

        ...(body.type !== undefined && {
          type: body.type,
        }),

        ...(body.address !== undefined && {
          address: body.address,
        }),

        ...(body.city !== undefined && {
          city: body.city,
        }),

        ...(body.country !== undefined && {
          country: body.country,
        }),

        ...(body.guests !== undefined && {
          guests: Number(body.guests),
        }),

        ...(body.bedrooms !== undefined && {
          bedrooms: Number(body.bedrooms),
        }),

        ...(body.bathrooms !== undefined && {
          bathrooms: Number(body.bathrooms),
        }),

        ...(body.pricePerNight !== undefined && {
          pricePerNight: Number(body.pricePerNight),
        }),

        ...(user!.role === "ADMIN" &&
          body.status !== undefined && {
            status: body.status,
          }),
      },
    });

    return NextResponse.json({
      success: true,
      message: "Property updated successfully",
      property: updatedProperty,
    });
  } catch (error) {
    console.error("UPDATE_PROPERTY_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update property",
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

    const { user, response } = await requireRole(req, [
      "HOST",
      "ADMIN",
    ]);

    if (response) {
      return response;
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
          message: "You cannot delete this property",
        },
        { status: 403 }
      );
    }

    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Property deleted successfully",
    });
  } catch (error) {
    console.error("DELETE_PROPERTY_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to delete property",
      },
      { status: 500 }
    );
  }
}