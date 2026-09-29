import Link from "next/link";
import { notFound } from "next/navigation";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";

/*
|--------------------------------------------------------------------------
| ACTUAL VISTARA LOCAL IMAGES
|--------------------------------------------------------------------------
*/

const localImages = [
  "/images/pag1 (7).jpg",
  "/images/pag1 (8).jpg",
  "/images/pag1 (9).jpg",
  "/images/pag1 (10).jpg",
  "/images/pag1 (11).jpg",
  "/images/pag1 (12).jpg",
  "/images/pag1 (13).jpg",
  "/images/pag1 (14).jpg",
  "/images/pag1 (15).jpg",
  "/images/pag1 (16).jpg",
  "/images/pag1 (17).jpg",
  "/images/pag1 (18).jpg",
  "/images/pag1 (19).jpg",
  "/images/pag1 (20).jpg",
  "/images/pag1 (21).jpg",
  "/images/pag1 (22).jpg",
  "/images/pag1 (23).jpg",
];

type StayPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StayPage({
  params,
}: StayPageProps) {

  const { id } = await params;

  const propertyId = Number(id);

  if (!Number.isInteger(propertyId)) {
    notFound();
  }

  /*
  |--------------------------------------------------------------------------
  | GET CURRENT PROPERTY
  |--------------------------------------------------------------------------
  */

  const property = await prisma.property.findUnique({
    where: {
      id: propertyId,
    },

    include: {
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });

  if (!property || property.status !== "VERIFIED") {
    notFound();
  }

  /*
  |--------------------------------------------------------------------------
  | GET ALL VERIFIED PROPERTIES
  |--------------------------------------------------------------------------
  |
  | This makes the local image assignment consistent with /stays.
  |
  */

  const allProperties = await prisma.property.findMany({
    where: {
      status: "VERIFIED",
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | FIND PROPERTY POSITION
  |--------------------------------------------------------------------------
  */

  const propertyIndex = allProperties.findIndex(
    (item) => item.id === property.id
  );

  /*
  |--------------------------------------------------------------------------
  | BUILD IMAGE GALLERY
  |--------------------------------------------------------------------------
  |
  | Every property gets a group of images.
  |
  | Property 1:
  | pag1 (7) -> pag1 (11)
  |
  | Property 2:
  | pag1 (12) -> pag1 (16)
  |
  | Property 3:
  | pag1 (17) -> pag1 (21)
  |
  | Remaining:
  | pag1 (22), pag1 (23)
  |
  */

  const imagesPerProperty = 5;

  const galleryStart =
    propertyIndex >= 0
      ? propertyIndex * imagesPerProperty
      : 0;

  let galleryImages = localImages.slice(
    galleryStart,
    galleryStart + imagesPerProperty
  );

  /*
  |--------------------------------------------------------------------------
  | SAFETY
  |--------------------------------------------------------------------------
  |
  | If there are more properties than image groups,
  | use images cyclically.
  |
  */

  if (galleryImages.length === 0) {
    galleryImages = [
      localImages[
        propertyIndex % localImages.length
      ],
    ];
  }

  /*
  |--------------------------------------------------------------------------
  | CURRENT MAIN IMAGE
  |--------------------------------------------------------------------------
  */

  const mainImage = galleryImages[0];

  return (
    <main className="min-h-screen bg-white text-[#03045E]">

      <Navbar />

      {/* =========================================================
          BACK
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 pt-8 lg:px-10">

        <Link
          href="/stays"
          className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
        >
          ← Back to stays
        </Link>

      </section>

      {/* =========================================================
          PROPERTY HEADER
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">

          <div>

            <div className="flex flex-wrap items-center gap-3">

              <span className="rounded-full bg-[#03045E] px-3 py-1.5 text-xs font-semibold text-white">
                Verified
              </span>

              <span className="text-sm text-[#64748B]">
                {property.city}, {property.country}
              </span>

            </div>

            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
              {property.title}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-[#64748B]">

              <span>
                ★{" "}
                {Number(property.rating ?? 0).toFixed(1)}
              </span>

              <span>•</span>

              <span>
                {galleryImages.length} photos
              </span>

            </div>

          </div>

        </div>

      </section>

      {/* =========================================================
          IMAGE GALLERY
      ========================================================= */}

      <section className="mx-auto max-w-7xl px-6 lg:px-10">

        <div className="grid grid-cols-1 gap-3 overflow-hidden rounded-[28px] md:h-[520px] md:grid-cols-2">

          {/* =====================================================
              MAIN IMAGE
          ===================================================== */}

          <div className="h-[360px] overflow-hidden bg-[#EEF2F7] md:h-[520px]">

            <img
              src={mainImage}
              alt={property.title}
              className="h-full w-full object-cover transition duration-500 hover:scale-[1.02]"
            />

          </div>

          {/* =====================================================
              OTHER IMAGES
          ===================================================== */}

          <div className="grid hidden grid-cols-2 gap-3 md:grid">

            {galleryImages
              .slice(1, 5)
              .map((image, index) => (

                <div
                  key={`${image}-${index}`}
                  className="h-[254px] overflow-hidden bg-[#EEF2F7]"
                >

                  <img
                    src={image}
                    alt={`${property.title} ${index + 2}`}
                    className="h-full w-full object-cover transition duration-500 hover:scale-[1.04]"
                  />

                </div>

              ))}

          </div>

        </div>

        {/* =======================================================
            MOBILE IMAGE STRIP
        ======================================================= */}

        <div className="mt-3 grid grid-cols-2 gap-3 md:hidden">

          {galleryImages
            .slice(1)
            .map((image, index) => (

              <div
                key={`${image}-mobile-${index}`}
                className="h-40 overflow-hidden rounded-2xl bg-[#EEF2F7]"
              >

                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="h-full w-full object-cover"
                />

              </div>

            ))}

        </div>

      </section>

      {/* =========================================================
          MAIN CONTENT
      ========================================================= */}

      <section className="mx-auto grid max-w-7xl gap-12 px-6 py-12 lg:grid-cols-[1fr_380px] lg:px-10">

        {/* =======================================================
            LEFT CONTENT
        ======================================================= */}

        <div>

          {/* ABOUT */}

          <div className="border-b border-[#E2E8F0] pb-8">

            <h2 className="font-serif text-3xl font-semibold">
              About this stay
            </h2>

            <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#64748B]">

              {property.description ||
                "A comfortable stay designed to help you experience the destination in a meaningful way."}

            </p>

            <div className="mt-7 flex flex-wrap gap-3 text-sm text-[#475569]">

              <span className="rounded-full bg-[#F1F4FA] px-4 py-2">
                {property.guests} guests
              </span>

              <span className="rounded-full bg-[#F1F4FA] px-4 py-2">
                {property.bedrooms} bedrooms
              </span>

              <span className="rounded-full bg-[#F1F4FA] px-4 py-2">
                {property.bathrooms} bathrooms
              </span>

            </div>

          </div>

          {/* =====================================================
              AMENITIES
          ===================================================== */}

          <div className="border-b border-[#E2E8F0] py-8">

            <h2 className="font-serif text-3xl font-semibold">
              What this place offers
            </h2>

            {property.amenities.length > 0 ? (

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                {property.amenities.map((item) => (

                  <div
                    key={`${item.propertyId}-${item.amenityId}`}
                    className="rounded-2xl border border-[#E2E8F0] px-4 py-4 text-sm text-[#475569]"
                  >
                    {item.amenity.name}
                  </div>

                ))}

              </div>

            ) : (

              <p className="mt-5 text-sm text-[#64748B]">
                No amenities listed.
              </p>

            )}

          </div>

          {/* =====================================================
              LOCATION
          ===================================================== */}

          <div className="py-8">

            <h2 className="font-serif text-3xl font-semibold">
              Location
            </h2>

            <p className="mt-4 text-sm text-[#64748B]">
              {property.city}, {property.country}
            </p>

            <div className="mt-5 h-48 rounded-[24px] bg-[#EEF4FF]">

              <div className="flex h-full items-center justify-center">

                <span className="text-sm font-medium text-[#0D21A1]">
                  {property.city}
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* =======================================================
            BOOKING CARD
        ======================================================= */}

        <aside className="lg:sticky lg:top-6 lg:h-fit">

          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-6 shadow-[0_15px_50px_rgba(3,4,94,0.08)]">

            <div className="flex items-end justify-between gap-4">

              <div>

                <span className="text-2xl font-bold text-[#03045E]">

                  ₹
                  {Number(
                    property.pricePerNight
                  ).toLocaleString("en-IN")}

                </span>

                <span className="ml-1 text-sm text-[#64748B]">
                  / night
                </span>

              </div>

              <div className="text-sm font-semibold text-[#03045E]">

                ★{" "}
                {Number(
                  property.rating ?? 0
                ).toFixed(1)}

              </div>

            </div>

            {/* DATE/GUEST BOX */}

            <div className="mt-6 overflow-hidden rounded-2xl border border-[#E2E8F0]">

              <div className="grid grid-cols-2">

                {/* CHECK IN */}

                <div className="border-r border-[#E2E8F0] p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                    Check-in
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Add date
                  </p>

                </div>

                {/* CHECK OUT */}

                <div className="p-4">

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                    Check-out
                  </p>

                  <p className="mt-2 text-sm font-medium">
                    Add date
                  </p>

                </div>

              </div>

              {/* GUESTS */}

              <div className="border-t border-[#E2E8F0] p-4">

                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#64748B]">
                  Guests
                </p>

                <p className="mt-2 text-sm font-medium">
                  Add guests
                </p>

              </div>

            </div>

            {/* RESERVE */}

            <Link
              href={`/booking/${property.id}`}
              className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#03045E] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Reserve
            </Link>

            <p className="mt-4 text-center text-xs text-[#94A3B8]">
              You will not be charged yet
            </p>

          </div>

        </aside>

      </section>

      <Footer />

    </main>
  );
}