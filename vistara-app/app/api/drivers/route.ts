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

  {
    id: "driver_003",
    name: "Vikram Singh",
    city: "Haridwar",
    state: "Uttarakhand",
    experience: 11,
    rating: 4.9,
    reviews: 178,
    languages: ["Hindi", "English"],

    vehicle: {
      type: "SUV",
      name: "Mahindra XUV700",
      seats: 6,
      ac: true,
    },

    services: [
      "route",
      "whole_trip",
      "religious",
    ],

    pricing: {
      perHour: 500,
      perDay: 3000,
      perTrip: 9500,
      religiousTrip: 3500,
    },

    availability: "available",

    routes: [
      "Haridwar",
      "Rishikesh",
      "Badrinath",
      "Kedarnath",
      "Devprayag",
    ],

    specialties: [
      "Char Dham Yatra",
      "Pilgrimage Trips",
      "Mountain Routes",
    ],

    verified: true,

    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80",
  },

  {
    id: "driver_004",
    name: "Arjun Mehta",
    city: "Jaipur",
    state: "Rajasthan",
    experience: 7,
    rating: 4.7,
    reviews: 82,
    languages: ["Hindi", "English"],

    vehicle: {
      type: "SUV",
      name: "Toyota Innova",
      seats: 6,
      ac: true,
    },

    services: [
      "route",
      "whole_trip",
      "per_hour",
    ],

    pricing: {
      perHour: 450,
      perDay: 2700,
      perTrip: 8200,
      religiousTrip: 3200,
    },

    availability: "available",

    routes: [
      "Jaipur",
      "Jodhpur",
      "Udaipur",
      "Pushkar",
      "Ajmer",
    ],

    specialties: [
      "Rajasthan Tours",
      "Heritage Tours",
      "City Travel",
    ],

    verified: true,

    image:
      "https://images.unsplash.com/photo-1525609004556-c46c7dcf3b3c?auto=format&fit=crop&w=800&q=80",
  },
];


// GET /api/drivers
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);

    const city = searchParams.get("city");
    const service = searchParams.get("service");
    const vehicle = searchParams.get("vehicle");

    let result = drivers;

    if (city) {
      result = result.filter(
        (driver) =>
          driver.city.toLowerCase() === city.toLowerCase()
      );
    }

    if (service) {
      result = result.filter((driver) =>
        driver.services.includes(service)
      );
    }

    if (vehicle) {
      result = result.filter(
        (driver) =>
          driver.vehicle.type.toLowerCase() ===
          vehicle.toLowerCase()
      );
    }

    return NextResponse.json({
      success: true,
      count: result.length,
      data: result,
    });
  } catch (error) {
    console.error("Drivers API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load drivers.",
      },
      { status: 500 }
    );
  }
}