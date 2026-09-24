import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

export async function GET(req: Request) {
  try {
    const { user, response } = await requireRole(req, ["HOST"]);

    if (response) {
      return response;
    }

    const properties = await prisma.property.findMany({
      where: {
        hostId: user!.id,
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
      properties,
    });
  } catch (error) {
    console.error("HOST_DATA_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch host data",
      },
      { status: 500 }
    );
  }
}