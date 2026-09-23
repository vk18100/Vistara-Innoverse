import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const properties = await prisma.property.findMany({
      where: {
        status: "VERIFIED",
      },
      include: {
        images: true,
        amenities: {
          include: {
            amenity: true,
          },
        },
        host: {
          select: {
            id: true,
            name: true,
          },
        },
        verification: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    const formattedProperties = properties.map((property) => ({
      id: property.id,
      title: property.title,
      description: property.description,
      type: property.type,
      city: property.city,
      country: property.country,
      address: property.address,
      guests: property.guests,
      bedrooms: property.bedrooms,
      bathrooms: property.bathrooms,
      pricePerNight: Number(property.pricePerNight),
      rating: property.rating,
      reviewCount: property.reviewCount,

      images: property.images.map((image) => ({
        id: image.id,
        url: image.url,
        isPrimary: image.isPrimary,
      })),

      amenities: property.amenities.map(
        (item) => item.amenity.name
      ),

      host: property.host,

      verified: property.verification?.identityStatus === "VERIFIED",
    }));

    return NextResponse.json({
      success: true,
      count: formattedProperties.length,
      data: formattedProperties,
    });
  } catch (error) {
    console.error("GET /api/properties error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch properties",
      },
      { status: 500 }
    );
  }
}