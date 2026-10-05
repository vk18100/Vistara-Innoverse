import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

/*
|--------------------------------------------------------------------------
| GET /api/drivers/[id]
| Public — single driver
|--------------------------------------------------------------------------
*/

export async function GET(
  _req: NextRequest,
  { params }: Context
) {
  try {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (!Number.isInteger(id) || id <= 0) {
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
        id,
      },

      select: {
        id: true,
        rating: true,
        totalTrips: true,
        isVerified: true,
        status: true,
        pricePerRide: true,
        experienceYears: true,
        languages: true,
        services: true,

        user: {
          select: {
            id: true,
            name: true,

            profile: {
              select: {
                avatar: true,
              },
            },
          },
        },

        vehicles: {
          select: {
            id: true,
            model: true,
            type: true,
            seats: true,
            capacity: true,
          },
        },
      },
    });

    if (!driver || !driver.isVerified) {
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

        name: driver.user?.name ?? "Driver",

        avatar: driver.user?.profile?.avatar ?? null,

        rating: Number(driver.rating ?? 0),

        totalTrips: driver.totalTrips ?? 0,

        isVerified: driver.isVerified,

        status: driver.status,

        pricePerRide:
          driver.pricePerRide !== null &&
          driver.pricePerRide !== undefined
            ? Number(driver.pricePerRide)
            : 0,

        experienceYears:
          driver.experienceYears ?? 0,

        languages: Array.isArray(driver.languages)
          ? driver.languages
          : [],

        services: Array.isArray(driver.services)
          ? driver.services
          : [],

        vehicles: driver.vehicles.map((vehicle) => ({
          id: vehicle.id,
          model: vehicle.model,
          type: vehicle.type,
          seats: vehicle.seats ?? vehicle.capacity ?? null,
        })),
      },
    });
  } catch (error) {
    console.error("DRIVER_DETAIL_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load driver.",
      },
      { status: 500 }
    );
  }
}