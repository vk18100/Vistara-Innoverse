import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

/* =====================================================
   GET /api/wishlist
   Logged-in user's wishlist
===================================================== */

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User authentication required.",
        },
        { status: 401 }
      );
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

    const places = items
      .filter((item) => item.property)
      .map((item) => {
        const property = item.property;

        const price = Number(property.pricePerNight);

        const rating =
          property.rating !== null &&
          property.rating !== undefined
            ? Number(property.rating).toFixed(1)
            : "0.0";

        const location = [
          property.city,
          property.country,
        ]
          .filter(Boolean)
          .join(", ");

        return {
          wishlistId: item.id,
          propertyId: property.id,
          type: property.type,
          title: property.title,

          location: location || "Location unavailable",

          price: Number.isFinite(price)
            ? `₹${price.toLocaleString("en-IN")} night`
            : "Price unavailable",

          rating,

          image:
            property.images?.[0]?.url ??
            "/images/property-placeholder.jpg",

          savedAt: item.createdAt,
        };
      });

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

/* =====================================================
   POST /api/wishlist
   body: { propertyId: number }

   Save property to wishlist
===================================================== */

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User authentication required.",
        },
        { status: 401 }
      );
    }

    /* -----------------------------
       Parse request safely
    ----------------------------- */

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

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

    const propertyId = Number(
      (body as Record<string, unknown>).propertyId
    );

    if (
      !Number.isInteger(propertyId) ||
      propertyId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
        },
        { status: 400 }
      );
    }

    /* -----------------------------
       Make sure property exists
    ----------------------------- */

    const property = await prisma.property.findUnique({
      where: {
        id: propertyId,
      },
      select: {
        id: true,
      },
    });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found.",
        },
        { status: 404 }
      );
    }

    /* -----------------------------
       Check existing wishlist item
    ----------------------------- */

    const existingItem =
      await prisma.wishlist.findFirst({
        where: {
          userId: user.id,
          propertyId,
        },
      });

    if (existingItem) {
      return NextResponse.json({
        success: true,
        message: "Property already saved.",
        data: existingItem,
      });
    }

    /* -----------------------------
       Create wishlist item
    ----------------------------- */

    const item = await prisma.wishlist.create({
      data: {
        userId: user.id,
        propertyId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Property saved to wishlist.",
        data: item,
      },
      { status: 201 }
    );
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

/* =====================================================
   DELETE /api/wishlist
   body: { propertyId: number }

   Remove property from wishlist
===================================================== */

export async function DELETE(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "User authentication required.",
        },
        { status: 401 }
      );
    }

    /* -----------------------------
       Parse request safely
    ----------------------------- */

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

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

    const propertyId = Number(
      (body as Record<string, unknown>).propertyId
    );

    if (
      !Number.isInteger(propertyId) ||
      propertyId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
        },
        { status: 400 }
      );
    }

    /* -----------------------------
       Remove wishlist item
    ----------------------------- */

    const deleted =
      await prisma.wishlist.deleteMany({
        where: {
          userId: user.id,
          propertyId,
        },
      });

    return NextResponse.json({
      success: true,
      message:
        deleted.count > 0
          ? "Property removed from wishlist."
          : "Property was not in wishlist.",
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