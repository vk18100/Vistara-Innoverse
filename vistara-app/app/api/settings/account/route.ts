import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    const account = await prisma.user.findUnique({
      where: {
        id: user!.id,
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,

        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            bio: true,
            city: true,
            country: true,
            avatar: true,
          },
        },
      },
    });

    if (!account) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not found.",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: account,
    });
  } catch (error) {
    console.error("ACCOUNT_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load account.",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const { user, response } = await requireAuth(req);

  if (response) {
    return response;
  }

  try {
    const body = await req.json();

    const {
      email,
      phone,
      firstName,
      lastName,
      city,
      country,
      bio,
    } = body;

    /*
    |--------------------------------------------------------------------------
    | Validation
    |--------------------------------------------------------------------------
    */

    if (email !== undefined && !String(email).trim()) {
      return NextResponse.json(
        {
          success: false,
          message: "Email cannot be empty.",
        },
        { status: 400 }
      );
    }

    /*
    |--------------------------------------------------------------------------
    | Check email uniqueness
    |--------------------------------------------------------------------------
    */

    if (email !== undefined) {
      const normalizedEmail = String(email)
        .trim()
        .toLowerCase();

      const existingUser = await prisma.user.findFirst({
        where: {
          email: normalizedEmail,
          NOT: {
            id: user!.id,
          },
        },
        select: {
          id: true,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          {
            success: false,
            message: "This email is already in use.",
          },
          { status: 409 }
        );
      }
    }

    /*
    |--------------------------------------------------------------------------
    | Prepare name
    |--------------------------------------------------------------------------
    */

    const cleanFirstName =
      firstName !== undefined
        ? String(firstName).trim()
        : undefined;

    const cleanLastName =
      lastName !== undefined
        ? String(lastName).trim()
        : undefined;

    /*
    | If first/last name is supplied,
    | keep User.name synchronized.
    */

    let userName: string | undefined;

    if (
      cleanFirstName !== undefined ||
      cleanLastName !== undefined
    ) {
      const currentProfile =
        await prisma.profile.findUnique({
          where: {
            userId: user!.id,
          },
          select: {
            firstName: true,
            lastName: true,
          },
        });

      const finalFirstName =
        cleanFirstName ??
        currentProfile?.firstName ??
        "";

      const finalLastName =
        cleanLastName ??
        currentProfile?.lastName ??
        "";

      userName =
        `${finalFirstName} ${finalLastName}`.trim();
    }

    /*
    |--------------------------------------------------------------------------
    | Update account + profile
    |--------------------------------------------------------------------------
    */

    const updatedUser = await prisma.user.update({
      where: {
        id: user!.id,
      },

      data: {
        ...(email !== undefined
          ? {
              email: String(email)
                .trim()
                .toLowerCase(),
            }
          : {}),

        ...(phone !== undefined
          ? {
              phone:
                String(phone).trim() || null,
            }
          : {}),

        ...(userName !== undefined
          ? {
              name: userName,
            }
          : {}),

        profile: {
          upsert: {
            create: {
              firstName:
                cleanFirstName || null,

              lastName:
                cleanLastName || null,

              city:
                city !== undefined
                  ? String(city).trim() || null
                  : null,

              country:
                country !== undefined
                  ? String(country).trim() || null
                  : null,

              bio:
                bio !== undefined
                  ? String(bio).trim() || null
                  : null,
            },

            update: {
              ...(cleanFirstName !== undefined
                ? {
                    firstName:
                      cleanFirstName || null,
                  }
                : {}),

              ...(cleanLastName !== undefined
                ? {
                    lastName:
                      cleanLastName || null,
                  }
                : {}),

              ...(city !== undefined
                ? {
                    city:
                      String(city).trim() || null,
                  }
                : {}),

              ...(country !== undefined
                ? {
                    country:
                      String(country).trim() || null,
                  }
                : {}),

              ...(bio !== undefined
                ? {
                    bio:
                      String(bio).trim() || null,
                  }
                : {}),
            },
          },
        },
      },

      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        role: true,

        profile: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            bio: true,
            city: true,
            country: true,
            avatar: true,
          },
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: "Account updated successfully.",
      data: updatedUser,
    });
  } catch (error) {
    console.error("ACCOUNT_PATCH_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to update account.",
      },
      { status: 500 }
    );
  }
}