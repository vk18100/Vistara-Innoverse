import { NextResponse } from "next/server";

const guides = [
  {
    id: "guide_001",
    name: "Arjun Sharma",
    location: "Varanasi, Uttar Pradesh",
    bio: "A Varanasi local who loves sharing hidden lanes, stories, food and the quieter side of the city.",
    languages: ["Hindi", "English"],
    specialties: [
      "Heritage",
      "Local Food",
      "Hidden Gems",
    ],
    rating: 4.9,
    reviews: 128,
    experience: "7 years",
    pricePerHour: 899,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=900&q=85",
    verified: true,
  },

  {
    id: "guide_002",
    name: "Meera Singh",
    location: "Jaipur, Rajasthan",
    bio: "Heritage enthusiast helping travelers discover Jaipur's architecture, markets, crafts and traditional culture.",
    languages: ["Hindi", "English", "French"],
    specialties: [
      "Heritage",
      "Architecture",
      "Shopping",
    ],
    rating: 4.8,
    reviews: 94,
    experience: "5 years",
    pricePerHour: 999,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=900&q=85",
    verified: true,
  },

  {
    id: "guide_003",
    name: "Rohan Thakur",
    location: "Manali, Himachal Pradesh",
    bio: "Mountain local focused on scenic trails, village experiences and authentic Himalayan journeys.",
    languages: ["Hindi", "English"],
    specialties: [
      "Mountains",
      "Nature",
      "Adventure",
    ],
    rating: 4.9,
    reviews: 116,
    experience: "8 years",
    pricePerHour: 1199,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=900&q=85",
    verified: true,
  },

  {
    id: "guide_004",
    name: "Ananya Rao",
    location: "Goa, India",
    bio: "Goa local helping travelers discover peaceful beaches, Portuguese heritage and local food.",
    languages: ["English", "Hindi"],
    specialties: [
      "Beaches",
      "Food",
      "Culture",
    ],
    rating: 4.7,
    reviews: 81,
    experience: "4 years",
    pricePerHour: 799,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    verified: true,
  },

  {
    id: "guide_005",
    name: "Kabir Verma",
    location: "Udaipur, Rajasthan",
    bio: "A storyteller and local guide who enjoys showing visitors Udaipur beyond its famous landmarks.",
    languages: ["Hindi", "English"],
    specialties: [
      "Lakes",
      "History",
      "Photography",
    ],
    rating: 4.8,
    reviews: 73,
    experience: "6 years",
    pricePerHour: 899,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=85",
    verified: true,
  },

  {
    id: "guide_006",
    name: "Priya Das",
    location: "Kolkata, West Bengal",
    bio: "Culture and food enthusiast introducing travelers to Kolkata's neighbourhoods, stories and local cuisine.",
    languages: ["Bengali", "Hindi", "English"],
    specialties: [
      "Food",
      "Culture",
      "City Walks",
    ],
    rating: 4.9,
    reviews: 102,
    experience: "6 years",
    pricePerHour: 849,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&q=85",
    verified: true,
  },
];


// GET /api/guides
export async function GET() {
  try {
    return NextResponse.json({
      success: true,

      data: {
        guides,
        count: guides.length,
      },
    });
  } catch (error) {
    console.error("Guides API error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guides.",
      },
      {
        status: 500,
      }
    );
  }
}


// POST /api/guides
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      location,
      bio,
      languages,
      specialties,
      pricePerHour,
      image,
    } = body;

    if (
      !name ||
      !location ||
      !bio ||
      !languages ||
      !specialties ||
      !pricePerHour
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Name, location, bio, languages, specialties and price are required.",
        },
        {
          status: 400,
        }
      );
    }

    const newGuide = {
      id: `guide_${Date.now()}`,
      name,
      location,
      bio,
      languages,
      specialties,
      rating: 0,
      reviews: 0,
      experience: "New guide",
      pricePerHour,
      currency: "INR",
      image: image ?? "",
      verified: false,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Guide created successfully.",
        data: newGuide,
      },
      {
        status: 201,
      }
    );
  } catch (error) {
    console.error("Guides POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create guide.",
      },
      {
        status: 500,
      }
    );
  }
}