import { NextResponse } from "next/server";

const drivers = [
  {
    id: "driver_001",
    name: "Rajesh Kumar",
    city: "Varanasi",
    state: "Uttar Pradesh",
    experience: 8,
    rating: 4.9,
    reviews: 126,
    languages: ["Hindi", "English"],

    vehicle: {
      type: "SUV",
      name: "Toyota Innova Crysta",
      seats: 6,
      ac: true,
    },

    services: [
      "route",
      "whole_trip",
      "religious",
      "per_hour",
    ],

    pricing: {
      perHour: 450,
      perDay: 2800,
      perTrip: 8500,
      religiousTrip: 3200,
    },

    availability: "available",

    routes: [
      "Varanasi",
      "Ayodhya",
      "Prayagraj",
      "Mathura",
      "Vrindavan",
    ],

    specialties: [
      "Temple Tours",
      "Pilgrimage Trips",
      "Intercity Travel",
    ],

    verified: true,

    image:
      "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "driver_002",
    name: "Amit Sharma",
    city: "Delhi",
    state: "Delhi",
    experience: 6,
    rating: 4.8,
    reviews: 94,
    languages: ["Hindi", "English", "Punjabi"],

    vehicle: {
      type: "Sedan",
      name: "Honda City",
      seats: 4,
      ac: true,
    },

    services: [
      "route",
      "whole_trip",
      "per_hour",
    ],

    pricing: {
      perHour: 400,
      perDay: 2500,
      perTrip: 7500,
      religiousTrip: 3000,
    },

    availability: "available",

    routes: [
      "Delhi",
      "Agra",
      "Jaipur",
      "Rishikesh",
      "Haridwar",
    ],

    specialties: [
      "City Travel",
      "Intercity Travel",
      "Airport Transfers",
    ],

    verified: true,

    image:
      "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80",
  },
];

export async function GET(
  _request: Request,
  context: {
    params: Promise<{ id: string }>;
  }
) {
  try {
    const { id } = await context.params;

    const driver = drivers.find(
      (item) => item.id === id
    );

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: driver,
    });
  } catch (error) {
    console.error("Driver API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load driver.",
      },
      { status: 500 }
    );
  }
}