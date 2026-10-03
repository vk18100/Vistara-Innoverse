import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";

export const revalidate = 60;

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

const imagesPerProperty = 5;

type Property = {
  id: string;
  title: string;
  city: string;
  country: string;
  pricePerNight: unknown;
  rating: unknown;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  description: string | null;
};

function getPropertyImage(index: number) {
  const imageIndex =
    (index * imagesPerProperty) % localImages.length;

  return localImages[imageIndex] || localImages[0];
}

export default async function StaysPage() {
  let properties: Property[] = [];
  let databaseError = false;

  try {
    const data = await prisma.property.findMany({
      where: {
        status: "VERIFIED",
      },
      orderBy: {
        createdAt: "desc",
      },
      select: {
        id: true,
        title: true,
        city: true,
        country: true,
        pricePerNight: true,
        rating: true,
        guests: true,
        bedrooms: true,
        bathrooms: true,
        description: true,
      },
    });

    properties = data as Property[];
  } catch (error) {
    databaseError = true;

    console.error("Failed to load stays:", error);
  }

  return (
    <main className="min-h-screen bg-[#FCFBF8] text-[#292524]">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="relative overflow-hidden bg-[#F4EFE5]">
        {/* Decorative shapes */}
        <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full bg-[#D9A441]/10 blur-3xl" />

        <div className="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-[#8B6F3D]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-5 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
          <div className="max-w-3xl">
            <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8B6F3D]">
              VISTARA STAYS
            </p>

            <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-[#292524] sm:text-5xl lg:text-6xl">
              Stay somewhere
              <span className="block text-[#8B6F3D]">
                worth remembering.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#756D63] sm:text-base">
              Discover verified homes, villas, apartments and unique
              stays selected for meaningful journeys.
            </p>
          </div>

          {/* SEARCH / DISCOVERY BAR */}
          <div className="mt-9 max-w-5xl rounded-[24px] border border-[#292524]/10 bg-white p-2 shadow-[0_18px_60px_rgba(41,37,36,0.10)] sm:p-3">
            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_auto]">
              <div className="rounded-2xl bg-[#F8F5EF] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A49B90]">
                  WHERE
                </p>

                <p className="mt-1 text-sm font-semibold text-[#292524]">
                  Explore a destination
                </p>
              </div>

              <div className="rounded-2xl bg-[#F8F5EF] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A49B90]">
                  WHEN
                </p>

                <p className="mt-1 text-sm font-semibold text-[#292524]">
                  Add dates
                </p>
              </div>

              <div className="rounded-2xl bg-[#F8F5EF] px-5 py-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A49B90]">
                  GUESTS
                </p>

                <p className="mt-1 text-sm font-semibold text-[#292524]">
                  Add guests
                </p>
              </div>

              <Link
                href="#stays"
                className="flex items-center justify-center rounded-2xl bg-[#292524] px-7 py-4 text-sm font-semibold text-white transition hover:bg-[#8B6F3D]"
              >
                Explore
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}
      <section
        id="stays"
        className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-16 lg:px-10"
      >
        {/* SECTION HEADER */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#B28A45]">
              VERIFIED COLLECTION
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#292524] sm:text-4xl">
              Places to stay
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D63]">
              Explore stays that have completed Vistara&apos;s
              verification process.
            </p>
          </div>

          {!databaseError && properties.length > 0 && (
            <div className="w-fit rounded-full bg-[#F4EFE5] px-4 py-2 text-xs font-semibold text-[#8B6F3D]">
              {properties.length}{" "}
              {properties.length === 1 ? "stay" : "stays"}
            </div>
          )}
        </div>

        {/* =====================================================
            DATABASE ERROR
        ===================================================== */}
        {databaseError ? (
          <div className="mt-8 rounded-[28px] border border-[#E7E2D8] bg-white px-6 py-16 text-center shadow-[0_12px_40px_rgba(41,37,36,0.04)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFE5] font-serif text-xl font-bold text-[#8B6F3D]">
              !
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#292524]">
              We&apos;re refreshing the stays
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756D63]">
              The stay collection could not be loaded right now.
              Please try again in a moment.
            </p>

            <Link
              href="/stays"
              className="mt-6 inline-flex rounded-xl bg-[#292524] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B6F3D]"
            >
              Try again
            </Link>
          </div>
        ) : properties.length === 0 ? (
          /* =====================================================
              EMPTY STATE
          ===================================================== */
          <div className="mt-8 rounded-[28px] border border-[#E7E2D8] bg-white px-6 py-16 text-center shadow-[0_12px_40px_rgba(41,37,36,0.04)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EFE5] text-xl text-[#8B6F3D]">
              ✦
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#292524]">
              New stays are coming
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#756D63]">
              We are currently preparing verified stays for the Vistara
              collection.
            </p>

            <Link
              href="/"
              className="mt-6 inline-flex rounded-xl bg-[#292524] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#8B6F3D]"
            >
              Back to Vistara
            </Link>
          </div>
        ) : (
          /* =====================================================
              PROPERTY GRID
          ===================================================== */
          <div className="mt-8 grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {properties.map((property, index) => {
              const image = getPropertyImage(index);

              const rating = Number(property.rating ?? 0);
              const price = Number(property.pricePerNight ?? 0);

              return (
                <Link
                  key={property.id}
                  href={`/stays/${property.id}`}
                  className="group block"
                >
                  <article>
                    {/* IMAGE */}
                    <div className="relative aspect-[4/3] overflow-hidden rounded-[26px] bg-[#EEEAE2]">
                      <Image
                        src={image}
                        alt={property.title}
                        fill
                        sizes="
                          (max-width: 640px) 100vw,
                          (max-width: 1024px) 50vw,
                          (max-width: 1280px) 33vw,
                          25vw
                        "
                        className="object-cover transition duration-700 ease-out group-hover:scale-[1.045]"
                      />

                      {/* IMAGE OVERLAY */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent opacity-70" />

                      {/* VERIFIED */}
                      <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#292524] shadow-sm backdrop-blur">
                        <span className="text-[#8B6F3D]">✓</span>
                        Verified
                      </div>

                      {/* RATING */}
                      <div className="absolute right-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#292524] shadow-sm backdrop-blur">
                        ★ {rating.toFixed(1)}
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="pt-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                          <h3 className="truncate text-[15px] font-semibold text-[#292524] transition group-hover:text-[#8B6F3D]">
                            {property.title}
                          </h3>

                          <p className="mt-1 text-sm text-[#756D63]">
                            {property.city}, {property.country}
                          </p>
                        </div>
                      </div>

                      {/* AMENITIES */}
                      <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#8A8278]">
                        <span>{property.guests} guests</span>

                        <span className="text-[#C8C0B5]">·</span>

                        <span>{property.bedrooms} bedrooms</span>

                        <span className="text-[#C8C0B5]">·</span>

                        <span>{property.bathrooms} baths</span>
                      </div>

                      {/* PRICE */}
                      <div className="mt-3 flex items-baseline gap-1">
                        <span className="text-sm font-bold text-[#292524]">
                          ₹{price.toLocaleString("en-IN")}
                        </span>

                        <span className="text-xs text-[#8A8278]">
                          night
                        </span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* =====================================================
          BOTTOM CTA
      ===================================================== */}
      {!databaseError && properties.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-14 sm:px-6 lg:px-10">
          <div className="relative overflow-hidden rounded-[30px] bg-[#292524] px-7 py-10 sm:px-10 sm:py-12">
            <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#D9A441]/15 blur-3xl" />

            <div className="relative max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D9A441]">
                YOUR NEXT JOURNEY
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-white sm:text-4xl">
                The best stays are the ones you remember.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/65">
                Find a place that feels right for your next Vistara
                journey.
              </p>

              <Link
                href="/trips"
                className="mt-6 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#292524] transition hover:bg-[#F4EFE5]"
              >
                View your trips
              </Link>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </main>
  );
}