import { NextResponse } from "next/server";

const wishlist = [
  {
    id: "wish_001",
    type: "Stay",
    title: "The River House",
    location: "Varanasi, Uttar Pradesh",
    price: "₹8,500 night",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "wish_002",
    type: "Villa",
    title: "Aravali Hills Retreat",
    location: "Udaipur, Rajasthan",
    price: "₹12,800 night",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "wish_003",
    type: "Experience",
    title: "Old City Morning Walk",
    location: "Jaipur, Rajasthan",
    price: "₹1,800 person",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "wish_004",
    type: "Restaurant",
    title: "The Courtyard Table",
    location: "Goa, India",
    price: "From ₹1,500",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "wish_005",
    type: "Stay",
    title: "A Quiet Himalayan Home",
    location: "Manali, Himachal Pradesh",
    price: "₹6,900 night",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: "wish_006",
    type: "Experience",
    title: "Ganges Sunrise Boat Ride",
    location: "Varanasi, Uttar Pradesh",
    price: "₹1,200 person",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80",
  },
];


// GET /api/wishlist
export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: {
        wishlist,
        count: wishlist.length,
      },
    });
  } catch (error) {
    console.error("Wishlist GET error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load wishlist.",
      },
      { status: 500 }
    );
  }
}


// POST /api/wishlist
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { item } = body;

    if (!item) {
      return NextResponse.json(
        {
          success: false,
          message: "Wishlist item is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        message: "Item added to wishlist.",
        data: {
          item,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Wishlist POST error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to add item to wishlist.",
      },
      { status: 500 }
    );
  }
}


// DELETE /api/wishlist
export async function DELETE(request: Request) {
  try {
    const body = await request.json();

    const { id } = body;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Wishlist item id is required.",
        },
        { status: 400 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Item removed from wishlist.",
      data: {
        id,
      },
    });
  } catch (error) {
    console.error("Wishlist DELETE error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to remove item.",
      },
      { status: 500 }
    );
  }
}