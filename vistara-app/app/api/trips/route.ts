import { NextResponse } from "next/server";

const trips = [
  {
    id: "trip_001",
    title: "Varanasi Escape",
    destination: "Varanasi, Uttar Pradesh",
    startDate: "2026-10-12",
    endDate: "2026-10-15",
    nights: 3,
    status: "upcoming",
    image: "/images/pag1 (8).jpg",

    stay: {
      name: "The Heritage Courtyard",
      pricePerNight: 4500,
    },

    experience: {
      name: "Ganga Sunrise & Ghat Walk",
      duration: "2 hours",
    },
  },
  {
    id: "trip_002",
    title: "Mountain Escape",
    destination: "Manali, Himachal Pradesh",
    startDate: "2026-08-10",
    endDate: "2026-08-13",
    nights: 3,
    status: "completed",
    image: "/images/pag1 (2).jpg",

    stay: {
      name: "Mountain View Villa",
      pricePerNight: 5200,
    },

    experience: {
      name: "Solang Valley Experience",
      duration: "4 hours",
    },
  },
];

const recentPlaces = [
  {
    id: "place_001",
    title: "Banaras Ghat Walk",
    location: "Varanasi, Uttar Pradesh",
    image: "/images/pag1 (1).jpg",
  },
  {
    id: "place_002",
    title: "Mountain Escape",
    location: "Manali, Himachal Pradesh",
    image: "/images/pag1 (2).jpg",
  },
  {
    id: "place_003",
    title: "Riverside Retreat",
    location: "Patna, Bihar",
    image: "/images/pag1 (3).jpg",
  },
  {
    id: "place_004",
    title: "Goa Sunset Experience",
    location: "Goa",
    image: "/images/pag1 (4).jpg",
  },
];

const inspiration = [
  {
    id: "inspiration_001",
    title: "Hidden mountain stays",
    image: "/images/pag1 (5).jpg",
  },
  {
    id: "inspiration_002",
    title: "Peaceful riverside escapes",
    image: "/images/pag1 (6).jpg",
  },
  {
    id: "inspiration_003",
    title: "Weekend experiences",
    image: "/images/pag1 (7).jpg",
  },
];

export async function GET() {
  try {
    const upcomingTrip =
      trips.find((trip) => trip.status === "upcoming") ?? null;

    const completedTrips = trips.filter(
      (trip) => trip.status === "completed"
    );

    return NextResponse.json({
      success: true,

      data: {
        upcomingTrip,
        trips,
        completedTrips,
        recentPlaces,
        savedPlaces: [],
        inspiration,
      },
    });
  } catch (error) {
    console.error("Trips API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load trips.",
      },
      {
        status: 500,
      }
    );
  }
}