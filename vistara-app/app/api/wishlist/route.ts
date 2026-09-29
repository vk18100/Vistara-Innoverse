import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const items = await prisma.wishlist.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        property: {
          include: {
            images: {
              orderBy: {
                isPrimary: "desc",
              },
              take: 1,
            },
          },
        },
      },
    });

    const places = items.map((item) => ({
      wishlistId: item.id,
      propertyId: item.property.id,
      type: item.property.type,
      title: item.property.title,
      location: `${item.property.city}, ${item.property.country}`,
      price: `₹${Number(
        item.property.pricePerNight
      ).toLocaleString("en-IN")} / night`,
      rating: item.property.rating.toFixed(1),
      image:
        item.property.images[0]?.url ??
        "/images/property-placeholder.jpg",
      savedAt: item.createdAt,
    }));

    return NextResponse.json({
      success: true,
      data: places,
    });
  } catch (error) {
    console.error("WISHLIST_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load wishlist.",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();
    const propertyId = Number(body?.propertyId);

    if (!Number.isInteger(propertyId) || propertyId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
        },
        { status: 400 }
      );
    }

    const item = await prisma.wishlist.upsert({
      where: {
        userId_propertyId: {
          userId: user.id,
          propertyId,
        },
      },
      update: {},
      create: {
        userId: user.id,
        propertyId,
      },
    });

    return NextResponse.json({
      success: true,
      data: item,
    });
  } catch (error) {
    console.error("WISHLIST_POST_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to save to wishlist.",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();
    const propertyId = Number(body?.propertyId);

    if (!Number.isInteger(propertyId) || propertyId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
        },
        { status: 400 }
      );
    }

    await prisma.wishlist.deleteMany({
      where: {
        userId: user.id,
        propertyId,
      },
    });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("WISHLIST_DELETE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to remove from wishlist.",
      },
      { status: 500 }
    );
  }
}