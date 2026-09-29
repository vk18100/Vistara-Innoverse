import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireRole(
      req,
      ["HOST"]
    );

    if (response) {
      return response;
    }

    if (!user?.id) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      );
    }

    const properties =
      await prisma.property.findMany({
        where: {
          hostId: user.id,
        },

        orderBy: {
          createdAt: "desc",
        },

        include: {
          images: true,

          reviews: {
            select: {
              id: true,
              rating: true,
              comment: true,
              createdAt: true,

              user: {
                select: {
                  id: true,
                  name: true,
                },
              },
            },

            orderBy: {
              createdAt: "desc",
            },
          },

          bookings: {
            select: {
              id: true,
              checkIn: true,
              checkOut: true,
              guests: true,
              nights: true,
              totalAmount: true,
              status: true,
              paymentStatus: true,

              guest: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },

            orderBy: {
              createdAt: "desc",
            },
          },
        },
      });

    return NextResponse.json({
      success: true,

      data: {
        properties,
      },
    });
  } catch (error) {
    console.error(
      "HOST_DATA_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to fetch host data",
      },
      {
        status: 500,
      }
    );
  }
}