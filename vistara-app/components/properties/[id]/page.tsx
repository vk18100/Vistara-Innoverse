import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { prisma } from "@/lib/prisma";

export const revalidate = 60;

const propertyImages = [
  "/images/pag1 (7).jpg",
  "/images/pag1 (8).jpg",
  "/images/pag1 (9).jpg",
  "/images/pag1 (10).jpg",
  "/images/pag1 (11).jpg",
];

function getImages(id: number) {
  const idString = String(id);

  const seed =
    idString.split("").reduce((total, char) => {
      return total + char.charCodeAt(0);
    }, 0) % propertyImages.length;

  return [
    ...propertyImages.slice(seed),
    ...propertyImages.slice(0, seed),
  ].slice(0, 5);
}

function formatPrice(value: unknown) {
  return Number(value ?? 0).toLocaleString("en-IN");
}

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function PropertyPage({
  params,
}: PageProps) {
  const { id } = await params;

  // Next.js route params are strings.
  // Prisma Property.id is a number.
  const propertyId = Number(id);

  if (!Number.isInteger(propertyId)) {
    notFound();
  }

  let property = null;

  try {
    property = await prisma.property.findUnique({
      where: {
        id: propertyId,
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
        status: true,
      },
    });
  } catch (error) {
    console.error("PROPERTY DETAIL ERROR:", error);

    return (
      <main className="min-h-screen bg-[#F7F3EA] px-5 py-20">
        <div className="mx-auto max-w-xl rounded-[32px] border border-[#E8E0D3] bg-white p-10 text-center shadow-[0_20px_70px_rgba(60,45,30,0.08)]">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F4EBDD] text-xl text-[#8B6F3D]">
            !
          </div>

          <h1 className="mt-5 font-serif text-3xl font-semibold text-[#292524]">
            Stay temporarily unavailable
          </h1>

          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#78716C]">
            We couldn't connect to the stay service right now. Please try
            again in a moment.
          </p>

          <Link
            href="/stays"
            className="mt-7 inline-flex rounded-full bg-[#292524] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#44403C]"
          >
            Back to stays
          </Link>
        </div>
      </main>
    );
  }

  if (!property || property.status !== "VERIFIED") {
    notFound();
  }

  const images = getImages(property.id);
  const price = formatPrice(property.pricePerNight);
  const rating = Number(property.rating ?? 0).toFixed(1);

  return (
    <main className="min-h-screen bg-[#FDFBF7] text-[#292524]">
      {/* TOP NAV */}
      <header className="sticky top-0 z-40 border-b border-[#E8E0D3]/80 bg-[#FDFBF7]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          <Link
            href="/stays"
            className="text-sm font-semibold text-[#57534E] transition hover:text-[#292524]"
          >
            ← Back to stays
          </Link>

          <Link
            href="/"
            className="font-serif text-2xl font-semibold tracking-tight text-[#292524]"
          >
            Vistara
          </Link>

          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E8E0D3] bg-white text-lg transition hover:bg-[#F4EBDD]"
            aria-label="Share property"
          >
            ↗
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-6 sm:px-8 lg:px-10 lg:pb-16">
        {/* TITLE */}
        <section className="mb-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="mb-3 flex flex-wrap items-center gap-2">
                <span className="rounded-full bg-[#EFE7D8] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#765D32]">
                  Vistara Verified
                </span>

                <span className="text-sm text-[#78716C]">
                  {property.city}, {property.country}
                </span>
              </div>

              <h1 className="max-w-4xl font-serif text-3xl font-semibold leading-tight tracking-tight text-[#292524] sm:text-4xl lg:text-5xl">
                {property.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#78716C]">
                <span className="font-semibold text-[#292524]">
                  ★ {rating}
                </span>

                <span>·</span>

                <span>{property.guests} guests</span>

                <span>·</span>

                <span>{property.bedrooms} bedrooms</span>

                <span>·</span>

                <span>{property.bathrooms} bathrooms</span>
              </div>
            </div>
          </div>
        </section>

        {/* GALLERY */}
        <section className="grid gap-2 overflow-hidden rounded-[28px] sm:grid-cols-2 lg:grid-cols-4 lg:grid-rows-2">
          {/* Main */}
          <div className="relative min-h-[300px] sm:col-span-2 sm:min-h-[400px] lg:col-span-2 lg:row-span-2">
            <Image
              src={images[0]}
              alt={property.title}
              fill
              priority
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 66vw, 50vw"
              className="object-cover transition duration-700 hover:scale-[1.02]"
            />
          </div>

          {/* Image 2 */}
          <div className="relative hidden min-h-[190px] sm:block">
            <Image
              src={images[1]}
              alt={`${property.title} view`}
              fill
              sizes="25vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Image 3 */}
          <div className="relative hidden min-h-[190px] sm:block">
            <Image
              src={images[2]}
              alt={`${property.title} interior`}
              fill
              sizes="25vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Image 4 */}
          <div className="relative hidden min-h-[190px] sm:block">
            <Image
              src={images[3]}
              alt={`${property.title} room`}
              fill
              sizes="25vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />
          </div>

          {/* Image 5 */}
          <div className="relative hidden min-h-[190px] sm:block">
            <Image
              src={images[4]}
              alt={`${property.title} stay`}
              fill
              sizes="25vw"
              className="object-cover transition duration-700 hover:scale-[1.03]"
            />

            <div className="absolute bottom-4 right-4 rounded-full bg-white/95 px-4 py-2 text-xs font-semibold text-[#292524] shadow-lg">
              View all photos
            </div>
          </div>
        </section>

        {/* CONTENT */}
        <section className="mt-10 grid gap-12 lg:grid-cols-[minmax(0,1fr)_380px]">
          {/* LEFT */}
          <div className="min-w-0">
            {/* INTRO */}
            <div className="border-b border-[#E8E0D3] pb-9">
              <div className="flex items-start justify-between gap-6">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B6F3D]">
                    About this stay
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold text-[#292524] sm:text-3xl">
                    A place made for slowing down
                  </h2>
                </div>

                <div className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F4EBDD] text-lg sm:flex">
                  ✦
                </div>
              </div>

              <p className="mt-5 max-w-3xl text-[15px] leading-7 text-[#57534E]">
                {property.description ||
                  "A thoughtfully selected Vistara stay designed for comfortable stays, meaningful journeys and memorable moments."}
              </p>
            </div>

            {/* DETAILS */}
            <div className="border-b border-[#E8E0D3] py-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B6F3D]">
                Stay details
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <DetailCard
                  icon="⌂"
                  label="Guests"
                  value={`${property.guests}`}
                />

                <DetailCard
                  icon="▦"
                  label="Bedrooms"
                  value={`${property.bedrooms}`}
                />

                <DetailCard
                  icon="◫"
                  label="Bathrooms"
                  value={`${property.bathrooms}`}
                />

                <DetailCard
                  icon="★"
                  label="Rating"
                  value={rating}
                />
              </div>
            </div>

            {/* TRUST */}
            <div className="border-b border-[#E8E0D3] py-9">
              <div className="rounded-[26px] bg-[#F4EBDD] p-6 sm:p-7">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white text-xl shadow-sm">
                    ✓
                  </div>

                  <div>
                    <h3 className="font-serif text-xl font-semibold text-[#292524]">
                      Verified by Vistara
                    </h3>

                    <p className="mt-1 text-sm leading-6 text-[#6B6258]">
                      This property has completed Vistara's verification
                      process and is currently approved for discovery.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="py-9">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#8B6F3D]">
                Location
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#292524]">
                {property.city}, {property.country}
              </h2>

              <div className="mt-5 flex min-h-[190px] items-center justify-center rounded-[26px] border border-[#E8E0D3] bg-[#F4F0E8]">
                <div className="text-center">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-white text-xl shadow-sm">
                    ⌖
                  </div>

                  <p className="mt-3 text-sm font-semibold text-[#44403C]">
                    {property.city}
                  </p>

                  <p className="mt-1 text-xs text-[#78716C]">
                    {property.country}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* BOOKING CARD */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-[28px] border border-[#E8E0D3] bg-white p-6 shadow-[0_20px_60px_rgba(60,45,30,0.10)]">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <span className="text-2xl font-bold text-[#292524]">
                    ₹{price}
                  </span>

                  <span className="ml-1 text-sm text-[#78716C]">
                    / night
                  </span>
                </div>

                <div className="rounded-full bg-[#F4EBDD] px-3 py-1.5 text-sm font-semibold text-[#765D32]">
                  ★ {rating}
                </div>
              </div>

              {/* Booking fields */}
              <div className="mt-6 overflow-hidden rounded-2xl border border-[#E8E0D3]">
                <div className="grid grid-cols-2">
                  <div className="border-r border-[#E8E0D3] p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B8177]">
                      Check in
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#44403C]">
                      Add date
                    </p>
                  </div>

                  <div className="p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B8177]">
                      Check out
                    </p>

                    <p className="mt-2 text-sm font-semibold text-[#44403C]">
                      Add date
                    </p>
                  </div>
                </div>

                <div className="border-t border-[#E8E0D3] p-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#8B8177]">
                    Guests
                  </p>

                  <p className="mt-2 text-sm font-semibold text-[#44403C]">
                    {property.guests} guests maximum
                  </p>
                </div>
              </div>

              <Link
                href={`/booking?propertyId=${property.id}`}
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-[#292524] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#44403C]"
              >
                Reserve this stay
              </Link>

              <p className="mt-3 text-center text-xs text-[#8B8177]">
                You won't be charged yet
              </p>

              <div className="mt-6 border-t border-[#EEE9E1] pt-5">
                <div className="flex justify-between text-sm text-[#6B6258]">
                  <span>₹{price} × 1 night</span>
                  <span>₹{price}</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-[#EEE9E1] pt-4 font-semibold text-[#292524]">
                  <span>Total</span>
                  <span>₹{price}</span>
                </div>
              </div>
            </div>
          </aside>
        </section>
      </div>

      {/* MOBILE BOOKING BAR */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-[#E8E0D3] bg-[#FDFBF7]/95 px-5 py-3 backdrop-blur-xl lg:hidden">
        <div className="mx-auto flex max-w-xl items-center justify-between gap-4">
          <div className="min-w-0">
            <p className="truncate text-xs text-[#78716C]">From</p>

            <p className="text-base font-bold text-[#292524]">
              ₹{price}

              <span className="ml-1 text-xs font-normal text-[#78716C]">
                / night
              </span>
            </p>
          </div>

          <Link
            href={`/booking?propertyId=${property.id}`}
            className="shrink-0 rounded-full bg-[#292524] px-6 py-3 text-sm font-semibold text-white shadow-lg transition active:scale-[0.98]"
          >
            Reserve
          </Link>
        </div>
      </div>
    </main>
  );
}

function DetailCard({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[20px] border border-[#E8E0D3] bg-white p-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F4EBDD] text-sm text-[#765D32]">
        {icon}
      </div>

      <p className="mt-4 text-xs text-[#8B8177]">{label}</p>

      <p className="mt-1 text-sm font-semibold text-[#44403C]">
        {value}
      </p>
    </div>
  );
}