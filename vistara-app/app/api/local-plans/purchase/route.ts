import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

/* =====================================================
   GET /api/local-plans/purchases
   Logged-in user's purchased local plans
===================================================== */

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) return response;

    const purchases = await prisma.localPlanPurchase.findMany({
      where: {
        userId: user!.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        plan: {
          include: {
            places: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      data: purchases,
    });
  } catch (error) {
    console.error("LOCAL_PLAN_PURCHASES_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load purchased plans.",
      },
      { status: 500 }
    );
  }
}

/* =====================================================
   POST /api/local-plans/purchases
   Create a local plan purchase
===================================================== */

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) return response;

    const body = await req.json();

    const planId = Number(body?.planId);

    if (!Number.isInteger(planId) || planId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid plan id.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       Find published plan
    --------------------------------------------- */

    const plan = await prisma.localPlan.findFirst({
      where: {
        id: planId,
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
          message: "Local plan not found or unavailable.",
        },
        { status: 404 }
      );
    }

    /* ---------------------------------------------
       Check duplicate purchase
    --------------------------------------------- */

    const existingPurchase =
      await prisma.localPlanPurchase.findUnique({
        where: {
          userId_planId: {
            userId: user!.id,
            planId: plan.id,
          },
        },
        include: {
          plan: true,
        },
      });

    if (existingPurchase) {
      return NextResponse.json(
        {
          success: false,
          message: "You have already purchased this plan.",
          purchase: existingPurchase,
        },
        { status: 409 }
      );
    }

    /* ---------------------------------------------
       Create purchase
    --------------------------------------------- */

    const purchase = await prisma.localPlanPurchase.create({
      data: {
        userId: user!.id,
        planId: plan.id,
        amount: plan.price,
        status: "PENDING",
      },
      include: {
        plan: {
          include: {
            places: true,
          },
        },
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Local plan purchase created.",
        purchase,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error(
      "LOCAL_PLAN_PURCHASE_POST_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to create local plan purchase.",
      },
      { status: 500 }
    );
  }
}