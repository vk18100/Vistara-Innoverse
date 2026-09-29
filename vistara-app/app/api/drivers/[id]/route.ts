import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(
  _req: NextRequest,
  { params }: Params
) {
  try {
    const { id: idParam } = await params;

    const id = Number(idParam);

    if (!Number.isInteger(id)) {
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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            phone: true,
            profile: true,
          },
        },
        vehicles: true,
        availability: {
          where: {
            isActive: true,
          },
        },
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
      data: driver,
    });
  } catch (error) {
    console.error("DRIVER_DETAIL_ERROR", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load driver.",
      },
      { status: 500 }
    );
  }
}