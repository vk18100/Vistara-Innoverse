import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

/*
|--------------------------------------------------------------------------
| GET /api/drivers
| Public — available and verified drivers
|--------------------------------------------------------------------------
*/

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

      select: {
        id: true,
        rating: true,
        totalTrips: true,
        isVerified: true,
        pricePerRide: true,
        experienceYears: true,
        languages: true,
        services: true,

        user: {
          select: {
            name: true,
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

    const formattedDrivers = drivers.map((driver) => ({
      id: String(driver.id),

      name: driver.user?.name ?? "Local Driver",

      rating: Number(driver.rating ?? 0),

      totalTrips: Number(driver.totalTrips ?? 0),

      isVerified: Boolean(driver.isVerified),

      price:
        driver.pricePerRide !== null &&
        driver.pricePerRide !== undefined
          ? Number(driver.pricePerRide)
          : 0,

      experienceYears:
        driver.experienceYears !== null &&
        driver.experienceYears !== undefined
          ? Number(driver.experienceYears)
          : 0,

      languages: Array.isArray(driver.languages)
        ? driver.languages
        : [],

      services: Array.isArray(driver.services)
        ? driver.services
        : [],

      vehicles: driver.vehicles.map((vehicle) => ({
        id: String(vehicle.id),
        model: vehicle.model,
        type: vehicle.type,
        seats:
          vehicle.seats ??
          vehicle.capacity ??
          null,
      })),
    }));

    return NextResponse.json(
      {
        success: true,
        data: formattedDrivers,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("DRIVERS_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        data: [],
        message: "Unable to load drivers.",
      },
      { status: 500 }
    );
  }
}