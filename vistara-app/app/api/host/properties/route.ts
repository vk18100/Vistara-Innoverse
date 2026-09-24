import { NextResponse } from "next/server";

export async function GET() {
  try {
    const properties = [
      {
        id: "property_001",
        name: "The Blue Haven",
        location: "Goa, India",
        type: "Villa",
        image: null,
        status: "ACTIVE",
        price: 4500,
        rating: 4.8,
        reviews: 24,
        guests: 4,
        bedrooms: 2,
        bathrooms: 2,
        bookings: 12,
        earnings: 54000,
        createdAt: "2026-08-10",
      },

      {
        id: "property_002",
        name: "Mountain Nest",
        location: "Manali, India",
        type: "Cabin",
        image: null,
        status: "ACTIVE",
        price: 6000,
        rating: 4.7,
        reviews: 18,
        guests: 5,
        bedrooms: 3,
        bathrooms: 2,
        bookings: 8,
        earnings: 42000,
        createdAt: "2026-08-18",
      },

      {
        id: "property_003",
        name: "Riverside Retreat",
        location: "Rishikesh, India",
        type: "Cottage",
        image: null,
        status: "PENDING",
        price: 3500,
        rating: 0,
        reviews: 0,
        guests: 3,
        bedrooms: 1,
        bathrooms: 1,
        bookings: 0,
        earnings: 0,
        createdAt: "2026-09-20",
      },
    ];

    const stats = {
      total: properties.length,

      active: properties.filter(
        (property) => property.status === "ACTIVE"
      ).length,

      pending: properties.filter(
        (property) => property.status === "PENDING"
      ).length,

      inactive: properties.filter(
        (property) => property.status === "INACTIVE"
      ).length,

      rejected: properties.filter(
        (property) => property.status === "REJECTED"
      ).length,
    };

    return NextResponse.json({
      success: true,

      data: {
        properties,
        stats,
      },
    });
  } catch (error) {
    console.error("Host properties API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load your properties.",
      },
      {
        status: 500,
      }
    );
  }
}