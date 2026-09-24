import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: Request) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const profile = await prisma.profile.findUnique({
      where: {
        userId: user!.id,
      },
    });

    return NextResponse.json({
      success: true,
      user: {
        id: user!.id,
        name: user!.name,
        email: user!.email,
        role: user!.role,
      },
      profile,
    });
  } catch (error) {
    console.error("GET_PROFILE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch profile",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: Request) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();

    const {
      name,
      phone,
      firstName,
      lastName,
      bio,
      city,
      country,
      avatar,
    } = body;

    const updatedUser = await prisma.user.update({
      where: {
        id: user!.id,
      },
      data: {
        ...(name !== undefined && {
          name: name.trim(),
        }),

        ...(phone !== undefined && {
          phone: phone.trim(),
        }),
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,
      },
    });

    const profile = await prisma.profile.upsert({
      where: {
        userId: user!.id,
      },
      update: {
        ...(firstName !== undefined && {
          firstName: firstName.trim(),
        }),

        ...(lastName !== undefined && {
          lastName: lastName.trim(),
        }),

        ...(bio !== undefined && {
          bio: bio.trim(),
        }),

        ...(city !== undefined && {
          city: city.trim(),
        }),

        ...(country !== undefined && {
          country: country.trim(),
        }),

        ...(avatar !== undefined && {
          avatar: avatar.trim(),
        }),
      },
      create: {
        userId: user!.id,
        firstName: firstName?.trim() || null,
        lastName: lastName?.trim() || null,
        bio: bio?.trim() || null,
        city: city?.trim() || null,
        country: country?.trim() || null,
        avatar: avatar?.trim() || null,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
      profile,
    });
  } catch (error) {
    console.error("UPDATE_PROFILE_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update profile",
      },
      { status: 500 }
    );
  }
}