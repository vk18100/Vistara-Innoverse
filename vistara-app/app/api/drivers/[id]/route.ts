import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Context = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _request: NextRequest,
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
          where: {
            status: "ACTIVE",
          },

          select: {
            id: true,
            model: true,
            make: true,
            type: true,
            capacity: true,
          },
        },
      },
    });

    if (!driver) {
      return NextResponse.json(
        {
          success: false,
          message: `Driver ${id} not found.`,
        },
        { status: 404 }
      );
    }

    const vehicle = driver.vehicles[0] ?? null;

    const data = {
      id: driver.id,

      name:
        driver.user?.name ??
        "Local Driver",

      image:
        driver.user?.profile?.avatar ??
        null,

      rating: Number(driver.rating ?? 0),

      totalTrips: Number(
        driver.totalTrips ?? 0
      ),

      experienceYears: 0,

      price: 0,

      pricePerRide: 0,

      seats: Number(
        vehicle?.capacity ?? 4
      ),

      verified: Boolean(
        driver.isVerified
      ),

      isVerified: Boolean(
        driver.isVerified
      ),

      status: driver.status,

      languages: [],

      services: [],

      vehicle:
        vehicle?.model ??
        vehicle?.make ??
        "Local Vehicle",

      vehicleType:
        vehicle?.type ??
        "Comfort",

      vehicles: driver.vehicles.map(
        (item) => ({
          id: String(item.id),

          model:
            item.model ??
            item.make ??
            "Local Vehicle",

          type: String(item.type),

          seats: Number(
            item.capacity ?? 1
          ),

          capacity: Number(
            item.capacity ?? 1
          ),
        })
      ),
    };

    return NextResponse.json(
      {
        success: true,
        data,
      },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (error) {
    console.error(
      "DRIVER_DETAIL_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Unable to load driver.",
      },
      { status: 500 }
    );
  }
}