import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
        userId: true,
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

    return NextResponse.json({
      success: true,

      data: drivers.map((driver) => ({
        // THIS IS THE IMPORTANT ID
        // This must be DriverProfile.id
        id: driver.id,

        // Keep userId separately
        userId: driver.userId,

        name:
          driver.user?.name ??
          "Local Driver",

        avatar:
          driver.user?.profile?.avatar ??
          null,

        rating:
          Number(driver.rating ?? 0),

        totalTrips:
          Number(driver.totalTrips ?? 0),

        isVerified:
          Boolean(driver.isVerified),

        status:
          driver.status,

        price: 0,

        pricePerRide: 0,

        experienceYears: 0,

        languages: [],

        services: [],

        vehicles:
          driver.vehicles.map(
            (vehicle) => ({
              id: String(vehicle.id),

              model:
                vehicle.model ??
                vehicle.make ??
                "Local Vehicle",

              type:
                String(vehicle.type),

              seats:
                Number(
                  vehicle.capacity ?? 1
                ),

              capacity:
                Number(
                  vehicle.capacity ?? 1
                ),
            })
          ),
      })),
    });
  } catch (error) {
    console.error(
      "DRIVERS_GET_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        data: [],
        message:
          error instanceof Error
            ? error.message
            : "Unable to load drivers.",
      },
      {
        status: 500,
      }
    );
  }
}