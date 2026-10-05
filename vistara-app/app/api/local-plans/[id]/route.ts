import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/*
|--------------------------------------------------------------------------
| GET /api/local-plans/[id]
| Public — single published local plan
| Supports both:
| /api/local-plans/12
| /api/local-plans/patna-food-walk
|--------------------------------------------------------------------------
*/

export async function GET(
  _req: Request,
  { params }: Params
) {
  try {
    const { id: rawId } = await params;

    const id = rawId?.trim();

    if (!id) {
      return NextResponse.json(
        {
          success: false,
          message: "Local plan identifier is required.",
        },
        { status: 400 }
      );
    }

    const numericId = Number(id);

    const isNumericId =
      Number.isInteger(numericId) && numericId > 0;

    const plan = await prisma.localPlan.findFirst({
      where: {
        status: "PUBLISHED",

        OR: [
          {
            slug: id,
          },

          ...(isNumericId
            ? [
                {
                  id: numericId,
                },
              ]
            : []),
        ],
      },

      include: {
        places: {
          orderBy: {
            id: "asc",
          },
        },
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
    console.error(
      "LOCAL_PLAN_DETAIL_GET_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load local plan.",
      },
      { status: 500 }
    );
  }
}