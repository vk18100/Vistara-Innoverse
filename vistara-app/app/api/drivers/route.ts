import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/* =========================
   GET /api/drivers
   Public — list available drivers
========================= */

export async function GET() {
  try {
    const drivers = await prisma.driverProfile.findMany({
      where: {
        status: "AVAILABLE",
        isVerified: true,
      },
      orderBy: {
        rating: "desc",
      },
      include: {
        user: {
          select: {
            name: true,
          },
        },
        vehicles: true,
      },
    });

    const formatted = drivers.map((driver) => ({
      id: driver.id,
      name: driver.user.name,
      rating: driver.rating,
      totalTrips: driver.totalTrips,
      isVerified: driver.isVerified,
      vehicles: driver.vehicles.map((v) => ({
        id: v.id,
        model: v.model,
        type: v.type,
      })),
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("DRIVERS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load drivers.",
      },
      { status: 500 }
    );
  }
}