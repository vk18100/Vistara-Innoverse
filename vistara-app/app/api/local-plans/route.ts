import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const plans = await prisma.localPlan.findMany({
      where: {
        status: "PUBLISHED",
      },
      orderBy: [
        {
          isFeatured: "desc",
        },
        {
          createdAt: "desc",
        },
      ],
      select: {
        id: true,
        title: true,
        slug: true,
        description: true,
        city: true,
        area: true,
        price: true,
        durationHours: true,
        coverImage: true,
        isFeatured: true,
        places: {
          select: {
            id: true,
          },
        },
      },
    });

    const data = plans.map((plan) => ({
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
      placesCount: plan.places.length,
    }));

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        headers: {
          "Cache-Control":
            "public, s-maxage=60, stale-while-revalidate=300",
        },
      }
    );
  } catch (error) {
    console.error("LOCAL_PLANS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load local plans.",
      },
      { status: 500 }
    );
  }
}