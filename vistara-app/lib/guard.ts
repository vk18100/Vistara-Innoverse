import { NextResponse } from "next/server";
import { UserRole } from "@prisma/client";

import { verifyToken } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function getUser(req: Request) {
  try {
    const cookieHeader = req.headers.get("cookie");

    const token = cookieHeader
      ?.split("; ")
      .find((cookie) => cookie.startsWith("vistara_token="))
      ?.split("=")[1];

    if (!token) {
      return null;
    }

    const payload = verifyToken(token);

    if (!payload) {
      return null;
    }

    const { userId } = payload;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
      },
    });

    return user;
  } catch {
    return null;
  }
}

export async function requireAuth(req: Request) {
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
  req: Request,
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
          message: "You do not have permission to access this resource",
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