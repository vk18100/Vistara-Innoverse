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
        userId: user!.id,

        help: {
          faqs: [
            {
              id: "booking",
              question: "How do I make a booking?",
              answer:
                "Choose a property or service, select your date and guests, then continue to booking.",
            },
            {
              id: "payment",
              question: "How do I make a payment?",
              answer:
                "Select your preferred available payment method during checkout.",
            },
            {
              id: "cancellation",
              question: "How can I cancel a booking?",
              answer:
                "Open your booking details and check the available cancellation option.",
            },
            {
              id: "support",
              question: "How can I contact support?",
              answer:
                "Use the support section to contact the Vistara support team.",
            },
          ],

          support: {
            available: true,
            contact: "support@vistara.com",
          },
        },
      },
    });
  } catch (error) {
    console.error("HELP_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load help information.",
      },
      {
        status: 500,
      }
    );
  }
}