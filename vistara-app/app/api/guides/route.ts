import { NextResponse } from "next/server";
import { guides } from "@/data/guides";

export async function GET() {
  try {
    return NextResponse.json({
      success: true,
      data: guides,
      count: guides.length,
    });
  } catch (error) {
    console.error("GET_GUIDES_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load guides.",
      },
      { status: 500 }
    );
  }
}