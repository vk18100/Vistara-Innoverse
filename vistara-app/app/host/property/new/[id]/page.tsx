"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Edit3,
  ExternalLink,
  House,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type Property = {
  id: string;
  name: string;
  type: string;
  description: string;
  location: string;
  city: string;
  state: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  cleaningFee: number;
  rating: number;
  reviews: number;
  verified: boolean;
  status: "Published" | "Draft" | "Pending";
  images: string[];
  amenities: string[];
};

const demoProperty: Property = {
  id: "vistara-001",
  name: "The Heritage Villa",
  type: "Villa",
  description:
    "A peaceful private villa designed for comfortable family stays and memorable travel experiences. Enjoy spacious rooms, a relaxing atmosphere and convenient access to the city.",
  location: "Boring Road",
  city: "Patna",
  state: "Bihar",
  country: "India",
  guests: 6,
  bedrooms: 3,
  beds: 4,
  bathrooms: 3,
  price: 4500,
  cleaningFee: 500,
  rating: 4.8,
  reviews: 24,
  verified: true,
  status: "Published",
  images: [
    "/images/house.jpg",
    "/images/beachhouse.jpg",
    "/images/big.jpg",
    "/images/dubai.jpg",
  ],
  amenities: [
    "Wi-Fi",
    "Air conditioning",
    "Kitchen",
    "Parking",
    "TV",
    "Hot water",
    "Workspace",
    "Garden",
  ],
};

export default function PropertyDetailPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = params.id as string;

  const [property, setProperty] =
    useState<Property | null>(null);

  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);

  useEffect(() => {
    let mounted = true;

    async function loadProperty() {
      try {
        setLoading(true);

        /*
         * Production API:
         *
         * const response = await fetch(
         *   `/api/host/properties/${propertyId}`,
         *   {
         *     cache: "no-store",
         *   }
         * );
         *
         * if (!response.ok) {
         *   if (response.status === 404) {
         *     setProperty(null);
         *     return;
         *   }
         *
         *   throw new Error(
         *     "Failed to load property"
         *   );
         * }
         *
         * const data = await response.json();
         * setProperty(data.property);
         */

        await new Promise((resolve) =>
          setTimeout(resolve, 450),
        );

        if (!mounted) return;

        setProperty({
          ...demoProperty,
          id: propertyId,
        });
      } catch {
        if (mounted) {
          setProperty(null);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProperty();

    return () => {
      mounted = false;
    };
  }, [propertyId]);

  function previousImage() {
    if (!property) return;

    setActiveImage((current) =>
      current === 0
        ? property.images.length - 1
        : current - 1,
    );
  }

  function nextImage() {
    if (!property) return;

    setActiveImage((current) =>
      current === property.images.length - 1
        ? 0
        : current + 1,
    );
  }

  if (loading) {
    return <PropertySkeleton />;
  }

  if (!property) {
    return <PropertyNotFound />;
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/8 bg-[#FAF8F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href="/host/properties"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">
              Back to properties
            </span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href={`/host/property/${propertyId}/edit`}
              className="inline-flex items-center gap-2 rounded-xl border border-black/8 bg-white px-4 py-2.5 text-sm font-bold transition hover:bg-[#F5F2EB]"
            >
              <Edit3 size={15} />
              <span className="hidden sm:inline">
                Edit property
              </span>
              <span className="sm:hidden">Edit</span>
            </Link>

            <Link
              href={`/host/calendar?propertyId=${propertyId}`}
              className="hidden items-center gap-2 rounded-xl bg-[#D9A441] px-4 py-2.5 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D] sm:inline-flex"
            >
              <CalendarDays size={15} />
              Calendar
            </Link>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:py-10">
        {/* BREADCRUMB */}
        <div className="mb-6 flex items-center gap-2 text-xs text-[#78716C]">
          <Link
            href="/host"
            className="hover:text-[#18181B]"
          >
            Host
          </Link>

          <ChevronRight size={13} />

          <Link
            href="/host/properties"
            className="hover:text-[#18181B]"
          >
            Properties
          </Link>

          <ChevronRight size={13} />

          <span className="font-semibold text-[#44403C]">
            {property.name}
          </span>
        </div>

        {/* TITLE */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-[#F3F8EE] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#4E693E]">
                {property.status}
              </span>

              {property.verified && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E8] px-3 py-1 text-[10px] font-bold uppercase tracking-[0.12em] text-[#8C6719]">
                  <ShieldCheck size={12} />
                  Verified
                </span>
              )}
            </div>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
              {property.name}
            </h1>

            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[#78716C]">
              <span className="inline-flex items-center gap-1.5">
                <MapPin size={15} />
                {property.location}, {property.city}
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-[#A8A29E] sm:block" />

              <span className="inline-flex items-center gap-1.5">
                <Star
                  size={15}
                  fill="currentColor"
                />
                {property.rating} · {property.reviews} reviews
              </span>
            </div>
          </div>

          <div className="flex items-end gap-1">
            <span className="font-serif text-2xl font-semibold">
              ₹{property.price.toLocaleString("en-IN")}
            </span>

            <span className="pb-1 text-sm text-[#78716C]">
              / night
            </span>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <section className="mt-8 overflow-hidden rounded-[28px] border border-black/8 bg-white">
          <div className="grid min-h-[360px] md:grid-cols-[1.55fr_1fr]">
            {/* MAIN IMAGE */}
            <div className="relative min-h-[320px] overflow-hidden bg-[#ECE9E1] md:min-h-[480px]">
              <img
                src={property.images[activeImage]}
                alt={`${property.name} image ${activeImage + 1}`}
                className="h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-5 pt-20">
                <span className="rounded-full bg-black/35 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur">
                  {activeImage + 1} /{" "}
                  {property.images.length}
                </span>
              </div>

              {property.images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={previousImage}
                    aria-label="Previous image"
                    className="absolute left-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
                  >
                    <ChevronLeft size={19} />
                  </button>

                  <button
                    type="button"
                    onClick={nextImage}
                    aria-label="Next image"
                    className="absolute right-4 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
                  >
                    <ChevronRight size={19} />
                  </button>
                </>
              )}
            </div>

            {/* THUMBNAILS */}
            <div className="grid grid-cols-2 gap-2 bg-[#F2EFE7] p-2">
              {property.images.slice(0, 4).map(
                (image, index) => (
                  <button
                    key={`${image}-${index}`}
                    type="button"
                    onClick={() =>
                      setActiveImage(index)
                    }
                    className={`relative overflow-hidden rounded-2xl ${
                      activeImage === index
                        ? "ring-2 ring-[#D9A441] ring-offset-2"
                        : ""
                    }`}
                  >
                    <img
                      src={image}
                      alt={`${property.name} thumbnail ${
                        index + 1
                      }`}
                      className="h-full min-h-[130px] w-full object-cover transition duration-300 hover:scale-105"
                    />
                  </button>
                ),
              )}
            </div>
          </div>
        </section>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_340px]">
          {/* LEFT */}
          <div className="space-y-7">
            {/* OVERVIEW */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                    Overview
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    Property details
                  </h2>
                </div>

                <div className="hidden h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E] sm:flex">
                  <House size={19} />
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoBox
                  icon={<Users size={17} />}
                  label="Guests"
                  value={`${property.guests}`}
                />

                <InfoBox
                  icon={<BedDouble size={17} />}
                  label="Bedrooms"
                  value={`${property.bedrooms}`}
                />

                <InfoBox
                  icon={<BedDouble size={17} />}
                  label="Beds"
                  value={`${property.beds}`}
                />

                <InfoBox
                  icon={<House size={17} />}
                  label="Bathrooms"
                  value={`${property.bathrooms}`}
                />
              </div>

              <div className="mt-7 border-t border-black/7 pt-7">
                <h3 className="text-sm font-bold">
                  About this property
                </h3>

                <p className="mt-3 max-w-3xl text-sm leading-7 text-[#68625D]">
                  {property.description}
                </p>
              </div>
            </section>

            {/* LOCATION */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                Location
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Where your property is
              </h2>

              <div className="mt-6 flex items-start gap-4 rounded-2xl bg-[#FAF8F3] p-5">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
                  <MapPin size={19} />
                </div>

                <div>
                  <p className="font-semibold">
                    {property.location}
                  </p>

                  <p className="mt-1 text-sm text-[#78716C]">
                    {property.city}, {property.state},{" "}
                    {property.country}
                  </p>
                </div>
              </div>
            </section>

            {/* AMENITIES */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                Amenities
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                What this property offers
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {property.amenities.map((amenity) => (
                  <div
                    key={amenity}
                    className="flex items-center gap-3 rounded-xl border border-black/7 px-4 py-3"
                  >
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#F3F8EE] text-[#4E693E]">
                      <Check size={14} />
                    </span>

                    <span className="text-sm font-medium">
                      {amenity}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDEBAR */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            {/* PRICE CARD */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 shadow-[0_12px_40px_rgba(24,24,27,0.05)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A711E]">
                Current pricing
              </p>

              <div className="mt-3 flex items-end gap-1">
                <span className="font-serif text-3xl font-semibold">
                  ₹
                  {property.price.toLocaleString(
                    "en-IN",
                  )}
                </span>

                <span className="pb-1 text-sm text-[#78716C]">
                  / night
                </span>
              </div>

              <div className="my-5 border-t border-black/7" />

              <div className="space-y-3 text-sm">
                <PriceRow
                  label="Nightly rate"
                  value={`₹${property.price.toLocaleString(
                    "en-IN",
                  )}`}
                />

                <PriceRow
                  label="Cleaning fee"
                  value={`₹${property.cleaningFee.toLocaleString(
                    "en-IN",
                  )}`}
                />
              </div>

              <Link
                href={`/host/calendar?propertyId=${propertyId}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-4 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D]"
              >
                <CalendarDays size={16} />
                Manage calendar
              </Link>
            </section>

            {/* VERIFICATION */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6">
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F3F8EE] text-[#4E693E]">
                  <ShieldCheck size={19} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Verified property
                  </p>

                  <p className="mt-1 text-xs leading-5 text-[#78716C]">
                    Your property has completed the current
                    verification requirements.
                  </p>
                </div>
              </div>

              <Link
                href="/host/verification"
                className="mt-5 flex items-center justify-between border-t border-black/7 pt-4 text-xs font-bold text-[#57534E]"
              >
                View verification
                <ChevronRight size={15} />
              </Link>
            </section>

            {/* ACTIONS */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A8A29E]">
                Manage
              </p>

              <div className="mt-3 divide-y divide-black/7">
                <ActionLink
                  href={`/host/property/${propertyId}/edit`}
                  icon={<Edit3 size={16} />}
                  label="Edit property"
                />

                <ActionLink
                  href={`/host/bookings?propertyId=${propertyId}`}
                  icon={<CalendarDays size={16} />}
                  label="View bookings"
                />

                <ActionLink
                  href={`/host/calendar?propertyId=${propertyId}`}
                  icon={<CalendarDays size={16} />}
                  label="Open calendar"
                />

                <ActionLink
                  href="/host/properties"
                  icon={<House size={16} />}
                  label="All properties"
                />
              </div>
            </section>

            {/* PREVIEW */}
            <Link
              href={`/property/${propertyId}`}
              className="group flex items-center justify-between rounded-[22px] border border-black/8 bg-[#18181B] px-5 py-4 text-white transition hover:bg-[#292524]"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#D9A441]">
                  Guest view
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Preview listing
                </p>
              </div>

              <ExternalLink
                size={17}
                className="transition group-hover:translate-x-0.5"
              />
            </Link>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* INFO BOX                                                                    */
/* -------------------------------------------------------------------------- */

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#FAF8F3] p-4">
      <div className="text-[#9A711E]">
        {icon}
      </div>

      <p className="mt-3 text-lg font-bold">{value}</p>

      <p className="mt-0.5 text-xs text-[#78716C]">
        {label}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* PRICE ROW                                                                   */
/* -------------------------------------------------------------------------- */

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-[#78716C]">{label}</span>

      <span className="font-semibold">{value}</span>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* ACTION LINK                                                                 */
/* -------------------------------------------------------------------------- */

function ActionLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-3.5 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
    >
      <span className="flex items-center gap-3">
        <span className="text-[#9A711E]">
          {icon}
        </span>

        {label}
      </span>

      <ChevronRight size={15} />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* NOT FOUND                                                                   */
/* -------------------------------------------------------------------------- */

function PropertyNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3] px-5">
      <div className="w-full max-w-md rounded-[28px] border border-black/8 bg-white p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF8E8] text-[#9A711E]">
          <House size={23} />
        </div>

        <h1 className="mt-5 font-serif text-2xl font-semibold">
          Property not found
        </h1>

        <p className="mt-2 text-sm leading-6 text-[#78716C]">
          This property may have been removed or you may
          not have permission to view it.
        </p>

        <Link
          href="/host/properties"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#18181B] px-5 py-3 text-sm font-bold text-white"
        >
          <ArrowLeft size={15} />
          Back to properties
        </Link>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING SKELETON                                                            */
/* -------------------------------------------------------------------------- */

function PropertySkeleton() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-[#E7E3D9]" />
          <div className="h-10 w-32 animate-pulse rounded-xl bg-[#E7E3D9]" />
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
        <div className="h-4 w-40 animate-pulse rounded bg-[#E7E3D9]" />

        <div className="mt-5 h-12 w-80 animate-pulse rounded bg-[#E7E3D9]" />

        <div className="mt-8 h-[480px] animate-pulse rounded-[28px] bg-white" />

        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_340px]">
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-[26px] bg-white" />
            <div className="h-52 animate-pulse rounded-[26px] bg-white" />
            <div className="h-64 animate-pulse rounded-[26px] bg-white" />
          </div>

          <div className="h-[520px] animate-pulse rounded-[26px] bg-white" />
        </div>
      </div>
    </main>
  );
}