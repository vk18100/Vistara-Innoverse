import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const city = searchParams.get("city");
    const type = searchParams.get("type");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const guests = searchParams.get("guests");

    const properties = await prisma.property.findMany({
      where: {
        status: "VERIFIED",

        ...(city && {
          city: {
            contains: city,
            mode: "insensitive",
          },
        }),

        ...(type && {
          type: type as any,
        }),

        ...(minPrice && {
          pricePerNight: {
            gte: Number(minPrice),
          },
        }),

        ...(maxPrice && {
          pricePerNight: {
            lte: Number(maxPrice),
          },
        }),

        ...(guests && {
          guests: {
            gte: Number(guests),
          },
        }),
      },

      orderBy: {
        createdAt: "desc",
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
            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      count: properties.length,
      properties,
    });
  } catch (error) {
    console.error("GET_PROPERTIES_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch properties",
      },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireRole(req, [
      "HOST",
    ]);

    if (response) {
      return response;
    }

    const body = await req.json();

    const {
      title,
      description,
      type,
      address,
      city,
      country,
      guests,
      bedrooms,
      bathrooms,
      pricePerNight,
    } = body;

    if (
      !title ||
      !description ||
      !type ||
      !address ||
      !city ||
      !country ||
      guests === undefined ||
      bedrooms === undefined ||
      bathrooms === undefined ||
      pricePerNight === undefined
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "All property fields are required",
        },
        { status: 400 }
      );
    }

    const guestsNumber = Number(guests);
    const bedroomsNumber = Number(bedrooms);
    const bathroomsNumber = Number(bathrooms);
    const priceNumber = Number(pricePerNight);

    if (
      !Number.isInteger(guestsNumber) ||
      guestsNumber < 1 ||
      !Number.isInteger(bedroomsNumber) ||
      bedroomsNumber < 0 ||
      !Number.isInteger(bathroomsNumber) ||
      bathroomsNumber < 0 ||
      !Number.isFinite(priceNumber) ||
      priceNumber <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property values",
        },
        { status: 400 }
      );
    }

    const property = await prisma.property.create({
      data: {
        hostId: user!.id,
        title: title.trim(),
        description: description.trim(),
        type,
        address: address.trim(),
        city: city.trim(),
        country: country.trim(),
        guests: guestsNumber,
        bedrooms: bedroomsNumber,
        bathrooms: bathroomsNumber,
        pricePerNight: priceNumber,
        status: "DRAFT",
      },

      include: {
        images: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Property created successfully",
        property,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("CREATE_PROPERTY_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create property",
      },
      { status: 500 }
    );
  }
}