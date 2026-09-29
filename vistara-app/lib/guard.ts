import { NextRequest, NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUser(req: NextRequest) {
  try {
    const token = req.cookies.get("vistara_token")?.value;

    console.log("AUTH TOKEN EXISTS:", Boolean(token));

    if (!token) {
      console.log("AUTH ERROR: vistara_token cookie missing");
      return null;
    }

    const payload = verifyToken(token);

    if (!payload) {
      console.log("AUTH ERROR: token verification failed");
      return null;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: payload.userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    if (!user) {
      console.log(
        "AUTH ERROR: user not found:",
        payload.userId
      );

      return null;
    }

    console.log(
      "AUTH SUCCESS:",
      user.email,
      user.role
    );

    return user;
  } catch (error) {
    console.error("GET_USER_ERROR:", error);
    return null;
  }
}

export async function requireAuth(req: NextRequest) {
  const user = await getUser(req);

  if (!user) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          message: "Authentication required",
        },
        { status: 401 }
      ),
    };
  }

  return {
    user,
    response: null,
  };
}

export async function requireRole(
  req: NextRequest,
  roles: UserRole[]
) {
  const result = await requireAuth(req);

  if (!result.user) {
    return result;
  }

  if (!roles.includes(result.user.role)) {
    return {
      user: null,
      response: NextResponse.json(
        {
          success: false,
          message:
            "You do not have permission to access this resource",
        },
        { status: 403 }
      ),
    };
  }

  return {
    user: result.user,
    response: null,
  };
}