import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

type Params = {
  params: Promise<{
    propertyId: string;
  }>;
};

export async function DELETE(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const { propertyId } = await params;
    const id = Number(propertyId);

    if (Number.isNaN(id)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    const wishlist = await prisma.wishlist.findUnique({
      where: {
        userId_propertyId: {
          userId: user!.id,
          propertyId: id,
        },
      },
    });

    if (!wishlist) {
      return NextResponse.json(
        {
          success: false,
          message: "Property is not in wishlist",
        },
        { status: 404 }
      );
    }

    await prisma.wishlist.delete({
      where: {
        userId_propertyId: {
          userId: user!.id,
          propertyId: id,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Removed from wishlist",
    });
  } catch (error) {
    console.error("REMOVE_WISHLIST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to remove from wishlist",
      },
      { status: 500 }
    );
  }
}