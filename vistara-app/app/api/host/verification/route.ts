import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

/* =========================
   GET /api/host/verification
   Current host's property verification records
========================= */

export async function GET(req: NextRequest) {
  try {
    const { user, response } = await requireRole(req, ["HOST"]);

    if (response) {
      return response;
    }

    const verifications = await prisma.propertyVerification.findMany({
      where: {
        userId: user.id,
      },
      orderBy: {
        createdAt: "desc",
      },
      include: {
        property: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    const formatted = verifications.map((v) => ({
      id: v.id,
      propertyId: v.propertyId,
      propertyTitle: v.property.title,
      identityStatus: v.identityStatus,
      ownershipStatus: v.ownershipStatus,
      certificateStatus: v.certificateStatus,
      score: v.score,
      submittedAt: v.submittedAt,
      verifiedAt: v.verifiedAt,
    }));

    return NextResponse.json({
      success: true,
      data: formatted,
    });
  } catch (error) {
    console.error("HOST_VERIFICATION_GET_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Unable to load verification status.",
      },
      { status: 500 }
    );
  }
}