import { NextResponse } from "next/server";

export async function GET() {
  try {
    const verification = {
      status: "PENDING",

      host: {
        id: "host-001",
        name: "Sristi Gupta",
        email: "sristi@example.com",
      },

      identity: {
        status: "VERIFIED",
        documentType: "AADHAAR",
        documentNumber: "XXXX-XXXX-1234",
        verifiedAt: "2026-09-20T10:00:00.000Z",
      },

      phone: {
        status: "VERIFIED",
        number: "+91XXXXXXXXXX",
        verifiedAt: "2026-09-20T10:05:00.000Z",
      },

      email: {
        status: "VERIFIED",
        address: "sristi@example.com",
        verifiedAt: "2026-09-20T10:06:00.000Z",
      },

      propertyVerification: {
        status: "PENDING",

        property: {
          id: "property-001",
          name: "The Blue Villa",
          location: "Patna, Bihar",
        },

        documents: [
          {
            id: "document-001",
            type: "PROPERTY_OWNERSHIP",
            name: "Property ownership document",
            status: "PENDING",
          },
          {
            id: "document-002",
            type: "ADDRESS_PROOF",
            name: "Property address proof",
            status: "PENDING",
          },
        ],
      },

      documents: [
        {
          id: "document-003",
          type: "IDENTITY_PROOF",
          name: "Identity proof",
          status: "VERIFIED",
        },
      ],

      submittedAt: "2026-09-20T09:30:00.000Z",

      reviewedAt: null,

      rejectionReason: null,
    };

    const stats = {
      identityVerified:
        verification.identity.status === "VERIFIED",

      phoneVerified:
        verification.phone.status === "VERIFIED",

      emailVerified:
        verification.email.status === "VERIFIED",

      propertyVerified:
        verification.propertyVerification.status ===
        "VERIFIED",

      documentsVerified:
        verification.documents.filter(
          (document) =>
            document.status === "VERIFIED"
        ).length,

      documentsPending:
        verification.documents.filter(
          (document) =>
            document.status === "PENDING"
        ).length,
    };

    return NextResponse.json({
      success: true,

      data: {
        verification,
        stats,
      },
    });
  } catch (error) {
    console.error(
      "Host verification API error:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Unable to load host verification.",
      },
      {
        status: 500,
      }
    );
  }
}