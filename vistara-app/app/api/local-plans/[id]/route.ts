import { NextResponse } from "next/server";

const localPlans = [
  {
    id: "plan_001",
    title: "Varanasi Heritage Walk",
    location: "Varanasi, Uttar Pradesh",
    date: "2026-10-12",
    duration: "4 hours",
    guests: 2,
    status: "upcoming",
    price: 1499,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=85",
    description:
      "Explore the old city, hidden lanes and historic ghats with a local expert.",
    activities: [
      "Old city walk",
      "Ghat exploration",
      "Local food experience",
    ],
    guide: {
      name: "Arjun Sharma",
      language: ["Hindi", "English"],
    },
  },

  {
    id: "plan_002",
    title: "Jaipur Old City Experience",
    location: "Jaipur, Rajasthan",
    date: "2026-11-22",
    duration: "5 hours",
    guests: 2,
    status: "upcoming",
    price: 2199,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=85",
    description:
      "Discover Jaipur's heritage streets, local food and traditional markets.",
    activities: [
      "Heritage walk",
      "Local market visit",
      "Traditional food tasting",
    ],
    guide: {
      name: "Meera Singh",
      language: ["Hindi", "English"],
    },
  },

  {
    id: "plan_003",
    title: "Manali Mountain Day",
    location: "Manali, Himachal Pradesh",
    date: "2026-08-10",
    duration: "6 hours",
    guests: 3,
    status: "completed",
    price: 2799,
    currency: "INR",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=85",
    description:
      "A relaxed mountain experience covering scenic viewpoints and local spots.",
    activities: [
      "Mountain viewpoints",
      "Local village visit",
      "Scenic drive",
    ],
    guide: {
      name: "Rohan Thakur",
      language: ["Hindi", "English"],
    },
  },
];

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

// GET /api/local-plans/[id]
export async function GET(
  _request: Request,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const plan = localPlans.find((item) => item.id === id);

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Local plan not found.",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json({
      success: true,
      data: plan,
    });
  } catch (error) {
    console.error("Local Plan GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load local plan.",
      },
      {
        status: 500,
      }
    );
  }
};