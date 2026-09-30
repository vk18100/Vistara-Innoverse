import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  req: NextRequest,
  { params }: Params
) {
  try {
    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Local plan identifier is required.",
        },
        { status: 400 }
      );
    }

    const plan = await prisma.localPlan.findFirst({
      where: {
        OR: [
          {
            slug: id,
          },
          ...(Number.isInteger(Number(id))
            ? [{ id: Number(id) }]
            : []),
        ],
        status: "PUBLISHED",
      },
      include: {
        places: true,
      },
    });

    if (!plan) {
      return NextResponse.json(
        {
          success: false,
          message: "Local plan not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: plan.id,
        title: plan.title,
        slug: plan.slug,
        description: plan.description,
        city: plan.city,
        area: plan.area,
        price: Number(plan.price),
        durationHours: plan.durationHours,
        coverImage: plan.coverImage,
        isFeatured: plan.isFeatured,
        places: plan.places,
      },
    });
  } catch (error) {
    console.error("LOCAL_PLAN_DETAIL_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load local plan.",
      },
      { status: 500 }
    );
  }
}