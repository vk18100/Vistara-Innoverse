import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/guard";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

/* =========================================================
   HELPERS
========================================================= */

function getPropertyId(value: string) {
  const id = Number(value);

  if (!Number.isInteger(id) || id <= 0) {
    return null;
  }

  return id;
}

function serializeProperty(property: any) {
  return {
    ...property,

    pricePerNight:
      property.pricePerNight !== null &&
      property.pricePerNight !== undefined
        ? Number(property.pricePerNight)
        : 0,

    rating:
      property.rating !== null &&
      property.rating !== undefined
        ? Number(property.rating)
        : 0,

    reviewCount:
      property.reviewCount !== null &&
      property.reviewCount !== undefined
        ? Number(property.reviewCount)
        : 0,

    guests:
      property.guests !== null &&
      property.guests !== undefined
        ? Number(property.guests)
        : 0,

    bedrooms:
      property.bedrooms !== null &&
      property.bedrooms !== undefined
        ? Number(property.bedrooms)
        : 0,

    bathrooms:
      property.bathrooms !== null &&
      property.bathrooms !== undefined
        ? Number(property.bathrooms)
        : 0,

    images: Array.isArray(property.images)
      ? property.images.map((image: any) => ({
          id: image.id,
          url: image.url,
          isPrimary: Boolean(image.isPrimary),
        }))
      : [],

    amenities: Array.isArray(property.amenities)
      ? property.amenities.map((item: any) => ({
          id: item.id,
          amenityId: item.amenityId,
          name:
            item.amenity?.name ??
            "Amenity",
        }))
      : [],

    reviews: Array.isArray(property.reviews)
      ? property.reviews.map((review: any) => ({
          id: review.id,
          rating:
            review.rating !== null &&
            review.rating !== undefined
              ? Number(review.rating)
              : 0,
          comment: review.comment ?? "",
          createdAt: review.createdAt,

          user: review.user
            ? {
                id: review.user.id,
                name:
                  review.user.name ??
                  "Guest",

                profile:
                  review.user.profile
                    ? {
                        avatar:
                          review.user.profile
                            .avatar ?? null,
                      }
                    : null,
              }
            : null,
        }))
      : [],

    host: property.host
      ? {
          id: property.host.id,
          name:
            property.host.name ??
            "Vistara Host",

          createdAt: property.host.createdAt,

          profile:
            property.host.profile
              ? {
                  avatar:
                    property.host.profile.avatar ??
                    null,

                  bio:
                    property.host.profile.bio ??
                    "",

                  city:
                    property.host.profile.city ??
                    "",

                  country:
                    property.host.profile.country ??
                    "",
                }
              : null,
        }
      : null,
  };
}

/* =========================================================
   GET PROPERTY
   GET /api/properties/[id]

   Public — Stay detail page
========================================================= */

export async function GET(
  _req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const propertyId = getPropertyId(id);

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
          property: null,
          data: null,
        },
        { status: 400 }
      );
    }

    const property =
      await prisma.property.findUnique({
        where: {
          id: propertyId,
        },

        include: {
          images: {
            orderBy: {
              isPrimary: "desc",
            },
          },

          amenities: {
            include: {
              amenity: true,
            },
          },

          host: {
            select: {
              id: true,
              name: true,
              createdAt: true,

              profile: {
                select: {
                  avatar: true,
                  bio: true,
                  city: true,
                  country: true,
                },
              },
            },
          },

          reviews: {
            orderBy: {
              createdAt: "desc",
            },

            include: {
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
            },
          },
        },
      });

    /* ---------------------------------------------
       PROPERTY DOES NOT EXIST
    --------------------------------------------- */

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found.",
          property: null,
          data: null,
        },
        { status: 404 }
      );
    }

    /* ---------------------------------------------
       ONLY VERIFIED STAYS ARE PUBLIC
    --------------------------------------------- */

    if (property.status !== "VERIFIED") {
      return NextResponse.json(
        {
          success: false,
          message: "Property is not available.",
          property: null,
          data: null,
        },
        { status: 404 }
      );
    }

    const formattedProperty =
      serializeProperty(property);

    /*
     * IMPORTANT:
     *
     * Return the property in BOTH:
     *
     * result.property
     *
     * and
     *
     * result.data
     *
     * so the Stay page works regardless of which
     * response shape it expects.
     */

    return NextResponse.json(
      {
        success: true,

        property: formattedProperty,

        data: formattedProperty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "GET_PROPERTY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch property.",
        property: null,
        data: null,
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   PATCH PROPERTY
   PATCH /api/properties/[id]

   HOST → own property
   ADMIN → any property
========================================================= */

export async function PATCH(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const propertyId = getPropertyId(id);

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       AUTHORIZATION
    --------------------------------------------- */

    const { user, response } =
      await requireRole(req, [
        "HOST",
        "ADMIN",
      ]);

    if (response) {
      return response;
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    /* ---------------------------------------------
       FIND PROPERTY
    --------------------------------------------- */

    const property =
      await prisma.property.findUnique({
        where: {
          id: propertyId,
        },
      });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found.",
        },
        { status: 404 }
      );
    }

    /* ---------------------------------------------
       HOST OWNERSHIP
    --------------------------------------------- */

    if (
      user.role === "HOST" &&
      property.hostId !== user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot edit this property.",
        },
        { status: 403 }
      );
    }

    /* ---------------------------------------------
       BODY
    --------------------------------------------- */

    const body = await req.json();

    /* ---------------------------------------------
       VALIDATE NUMBERS
    --------------------------------------------- */

    if (
      body.guests !== undefined &&
      (!Number.isFinite(
        Number(body.guests)
      ) ||
        Number(body.guests) < 1)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid guest capacity.",
        },
        { status: 400 }
      );
    }

    if (
      body.bedrooms !== undefined &&
      (!Number.isFinite(
        Number(body.bedrooms)
      ) ||
        Number(body.bedrooms) < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid bedroom count.",
        },
        { status: 400 }
      );
    }

    if (
      body.bathrooms !== undefined &&
      (!Number.isFinite(
        Number(body.bathrooms)
      ) ||
        Number(body.bathrooms) < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid bathroom count.",
        },
        { status: 400 }
      );
    }

    if (
      body.pricePerNight !== undefined &&
      (!Number.isFinite(
        Number(body.pricePerNight)
      ) ||
        Number(body.pricePerNight) < 0)
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Invalid price per night.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       UPDATE
    --------------------------------------------- */

    const updatedProperty =
      await prisma.property.update({
        where: {
          id: propertyId,
        },

        data: {
          ...(body.title !== undefined && {
            title: String(body.title),
          }),

          ...(body.description !==
            undefined && {
            description:
              String(body.description),
          }),

          ...(body.type !== undefined && {
            type: body.type,
          }),

          ...(body.address !== undefined && {
            address: String(body.address),
          }),

          ...(body.city !== undefined && {
            city: String(body.city),
          }),

          ...(body.country !== undefined && {
            country: String(body.country),
          }),

          ...(body.guests !== undefined && {
            guests: Number(body.guests),
          }),

          ...(body.bedrooms !== undefined && {
            bedrooms: Number(body.bedrooms),
          }),

          ...(body.bathrooms !==
            undefined && {
            bathrooms: Number(
              body.bathrooms
            ),
          }),

          ...(body.pricePerNight !==
            undefined && {
            pricePerNight: Number(
              body.pricePerNight
            ),
          }),

          /*
           * Only ADMIN can change verification
           * status.
           */

          ...(user.role === "ADMIN" &&
            body.status !== undefined && {
              status: body.status,
            }),
        },
      });

    const formattedProperty =
      serializeProperty(
        updatedProperty
      );

    return NextResponse.json(
      {
        success: true,

        message:
          "Property updated successfully.",

        property: formattedProperty,

        data: formattedProperty,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "UPDATE_PROPERTY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message: "Failed to update property.",
      },
      { status: 500 }
    );
  }
}

/* =========================================================
   DELETE PROPERTY
   DELETE /api/properties/[id]

   HOST → own property
   ADMIN → any property
========================================================= */

export async function DELETE(
  req: NextRequest,
  { params }: RouteContext
) {
  try {
    const { id } = await params;

    const propertyId = getPropertyId(id);

    if (!propertyId) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid property id.",
        },
        { status: 400 }
      );
    }

    /* ---------------------------------------------
       AUTHORIZATION
    --------------------------------------------- */

    const { user, response } =
      await requireRole(req, [
        "HOST",
        "ADMIN",
      ]);

    if (response) {
      return response;
    }

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          message: "Unauthorized.",
        },
        { status: 401 }
      );
    }

    /* ---------------------------------------------
       FIND PROPERTY
    --------------------------------------------- */

    const property =
      await prisma.property.findUnique({
        where: {
          id: propertyId,
        },
      });

    if (!property) {
      return NextResponse.json(
        {
          success: false,
          message: "Property not found.",
        },
        { status: 404 }
      );
    }

    /* ---------------------------------------------
       HOST OWNERSHIP
    --------------------------------------------- */

    if (
      user.role === "HOST" &&
      property.hostId !== user.id
    ) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You cannot delete this property.",
        },
        { status: 403 }
      );
    }

    /* ---------------------------------------------
       DELETE
    --------------------------------------------- */

    await prisma.property.delete({
      where: {
        id: propertyId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Property deleted successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error(
      "DELETE_PROPERTY_ERROR:",
      error
    );

    return NextResponse.json(
      {
        success: false,
        message:
          "Failed to delete property.",
      },
      { status: 500 }
    );
  }
}