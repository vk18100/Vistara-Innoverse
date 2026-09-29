import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user!.id,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({
      success: true,
      notifications,
    });
  } catch (error) {
    console.error("GET_NOTIFICATIONS_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch notifications",
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  try {
    const { user, response } = await requireAuth(req);

    if (response) {
      return response;
    }

    const body = await req.json();

    if (body.id !== undefined && body.id !== null) {
      const notificationId = Number(body.id);

      if (!Number.isInteger(notificationId)) {
        return NextResponse.json(
          {
            success: false,
            message: "Invalid notification id",
          },
          { status: 400 }
        );
      }

      const notification =
        await prisma.notification.updateMany({
          where: {
            id: notificationId,
            userId: user!.id,
          },
          data: {
            isRead: true,
          },
        });

      return NextResponse.json({
        success: true,
        message: "Notification marked as read",
        notification,
      });
    }

    await prisma.notification.updateMany({
      where: {
        userId: user!.id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    return NextResponse.json({
      success: true,
      message: "All notifications marked as read",
    });
  } catch (error) {
    console.error("READ_NOTIFICATION_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update notifications",
      },
      { status: 500 }
    );
  }
}