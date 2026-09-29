import { NextRequest, NextResponse } from "next/server";

import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    return NextResponse.json({
      success: true,

      data: {
        preferences: {
          language: "en",
          currency: "INR",
          timezone: "Asia/Kolkata",

          notifications: {
            email: true,
            booking: true,
            promotional: false,
            recommendations: true,
          },

          travel: {
            preferredAccommodation: "ANY",
            preferredTravelStyle: "ANY",
          },
        },
      },
    });
  } catch (error) {
    console.error("PREFERENCES_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load preferences.",
      },
      {
        status: 500,
      }
    );
  }
}