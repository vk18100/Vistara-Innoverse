import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

type Params = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(
  req: Request,
  { params }: Params
) {
  try {
    const { user, response } = await requireRole(req, ["ADMIN"]);

    if (response) {
      return response;
    }

    const { id } = await params;
    const propertyId = Number(id);

    if (Number.isNaN(propertyId)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id",
        },
        { status: 400 }
      );
    }

    const body = await req.json();

    const {
      identityStatus,
      ownershipStatus,
      certificateStatus,
      notes,
    } = body;

    const allowed = [
      "PENDING",
      "VERIFIED",
      "REJECTED",
    ];

    if (
      (identityStatus && !allowed.includes(identityStatus)) ||
      (ownershipStatus && !allowed.includes(ownershipStatus)) ||
      (certificateStatus &&
        !allowed.includes(certificateStatus))
    ) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid verification status",
        },
        { status: 400 }
      );
    }

    const verification =
      await prisma.propertyVerification.findUnique({
        where: {
          propertyId,
        },
      });

    if (!verification) {
      return NextResponse.json(
        {
          success: false,
          message: "Verification not found",
        },
        { status: 404 }
      );
    }

    const finalIdentity =
      identityStatus ?? verification.identityStatus;

    const finalOwnership =
      ownershipStatus ?? verification.ownershipStatus;

    const finalCertificate =
      certificateStatus ??
      verification.certificateStatus;

    const allVerified =
      finalIdentity === "VERIFIED" &&
      finalOwnership === "VERIFIED" &&
      finalCertificate === "VERIFIED";

    const anyRejected =
      finalIdentity === "REJECTED" ||
      finalOwnership === "REJECTED" ||
      finalCertificate === "REJECTED";

    const propertyStatus = allVerified
      ? "VERIFIED"
      : anyRejected
        ? "REJECTED"
        : "PENDING_VERIFICATION";

    const updatedVerification =
      await prisma.propertyVerification.update({
        where: {
          propertyId,
        },
        data: {
          identityStatus: finalIdentity,
          ownershipStatus: finalOwnership,
          certificateStatus: finalCertificate,
          notes:
            notes !== undefined
              ? notes
              : verification.notes,
          verifiedAt: allVerified
            ? new Date()
            : null,
        },
      });

    const property = await prisma.property.update({
      where: {
        id: propertyId,
      },
      data: {
        status: propertyStatus,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Verification updated successfully",
      verification: updatedVerification,
      property,
    });
  } catch (error) {
    console.error("ADMIN_VERIFY_ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update verification",
      },
      { status: 500 }
    );
  }
}