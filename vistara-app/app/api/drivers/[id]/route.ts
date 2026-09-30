import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================
   GET /api/drivers/[id]
   Public — single driver profile
========================= */

export async function GET(req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;
    const driverId = Number(id);

    if (!Number.isInteger(driverId) || driverId <= 0) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid driver id.",
        },
        { status: 400 }
      );
    }

    const driver = await prisma.driverProfile.findUnique({
      where: {
        id: driverId,
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

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message: "Driver not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: {
        id: driver.id,
        name: driver.user.name,
        rating: driver.rating,
        totalTrips: driver.totalTrips,
        isVerified: driver.isVerified,
        status: driver.status,
        vehicles: driver.vehicles.map((v) => ({
          id: v.id,
          make: v.make,
          model: v.model,
          type: v.type,
          capacity: v.capacity,
        })),
      },
    });
  } catch (error) {
    console.error("DRIVER_DETAIL_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load this driver.",
      },
      { status: 500 }
    );
  }
}