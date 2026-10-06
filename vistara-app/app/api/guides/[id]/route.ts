import { NextResponse } from "next/server";
import { guides } from "@/data/guides";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: Request,
  { params }: Params
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Guide id is required.",
        },
        { status: 400 }
      );
    }

    const guide = guides.find(
      (item) => String(item.id) === String(id)
    );

    if (!guide) {
      return NextResponse.json(
        {
          success: false,
          message: "Guide not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: guide,
    });
  } catch (error) {
    console.error("GUIDE_DETAIL_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load this guide.",
      },
      { status: 500 }
    );
  }
}