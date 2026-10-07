import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

/*
|--------------------------------------------------------------------------
| GET /api/local-plans/purchases
|
| Logged-in user's Local Plan purchases
|--------------------------------------------------------------------------
*/

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const purchases =
      await prisma.localPlanPurchase.findMany({
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
    console.error(
      "LOCAL_PLAN_PURCHASES_GET_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load purchased local plans.",
      },
      { status: 500 }
    );
  }
}

/*
|--------------------------------------------------------------------------
| POST /api/local-plans/purchases
|
| MVP Local Plan purchase
|
| No Razorpay
| No checkout
| No external payment
|
| Purchase is immediately confirmed.
|--------------------------------------------------------------------------
*/

export async function POST(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    /* ======================================================
       READ BODY
    ====================================================== */

    let body: unknown;

    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request body.",
        },
        { status: 400 }
      );
    }

    if (
      typeof body !== "object" ||
      body === null ||
      Array.isArray(body)
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid request data.",
        },
        { status: 400 }
      );
    }

    const data = body as {
      planId?: unknown;
      date?: unknown;
    };

    /* ======================================================
       PLAN ID
    ====================================================== */

    const planId = Number(data.planId);

    if (
      !Number.isInteger(planId) ||
      planId <= 0
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid local plan.",
        },
        { status: 400 }
      );
    }

    /* ======================================================
       DATE
    ====================================================== */

    if (!data.date) {
      return NextResponse.json(
        {
          success: false,
          message: "Please select an experience date.",
        },
        { status: 400 }
      );
    }

    const selectedDate = new Date(
      String(data.date)
    );

    if (
      Number.isNaN(
        selectedDate.getTime()
      )
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid experience date.",
        },
        { status: 400 }
      );
    }

    /* ======================================================
       FIND PUBLISHED PLAN
    ====================================================== */

    const plan =
      await prisma.localPlan.findFirst({
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
          message:
            "Local plan not found or unavailable.",
        },
        { status: 404 }
      );
    }

    /* ======================================================
       CHECK EXISTING PURCHASE
    ====================================================== */

    const existingPurchase =
      await prisma.localPlanPurchase.findUnique({
        where: {
          userId_planId: {
            userId: user!.id,
            planId: plan.id,
          },
        },

        include: {
          plan: {
            include: {
              places: true,
            },
          },
        },
      });

    /*
     * Already purchased
     */

    if (existingPurchase) {
      return NextResponse.json({
        success: true,

        alreadyPurchased: true,

        message:
          "You already have access to this local plan.",

        data: {
          purchase: existingPurchase,
        },
      });
    }

    /* ======================================================
       CREATE CONFIRMED PURCHASE
       
       No payment.
       No checkout.
       No Razorpay.
    ====================================================== */

    const purchase =
      await prisma.localPlanPurchase.create({
        data: {
          userId: user!.id,

          planId: plan.id,

          amount: plan.price,

          status: "PAID",
        },

        include: {
          plan: {
            include: {
              places: true,
            },
          },
        },
      });

    /* ======================================================
       RESPONSE
    ====================================================== */

    return NextResponse.json(
      {
        success: true,

        message:
          "Local plan purchased successfully.",

        data: {
          purchase,

          plan: {
            id: plan.id,
            title: plan.title,
            slug: plan.slug,
            city: plan.city,
            area: plan.area,
            price: plan.price,
            durationHours:
              plan.durationHours,
            places: plan.places,
          },

          experienceDate:
            selectedDate.toISOString(),

          status: "CONFIRMED",

          unlockStatus: "UNLOCKED",

          paymentStatus:
            "NOT_REQUIRED",
        },
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
        message:
          "Unable to confirm local plan purchase.",
      },
      { status: 500 }
    );
  }
}