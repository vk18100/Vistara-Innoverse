import Link from "next/link";
import { headers } from "next/headers";
import { redirect, notFound } from "next/navigation";
import { NextRequest } from "next/server";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/guard";

const fallbackImages = [
  "/images/pag1 (7).jpg",
  "/images/pag1 (8).jpg",
  "/images/pag1 (9).jpg",
  "/images/pag1 (10).jpg",
  "/images/pag1 (11).jpg",
];

function formatMoney(value: number) {
  return value.toLocaleString("en-IN", {
    maximumFractionDigits: 0,
  });
}

function formatPropertyType(type: string) {
  return type
    .toLowerCase()
    .replace(/_/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function getToday() {
  const date = new Date();
  return date.toISOString().split("T")[0];
}

function addDays(dateString: string, days: number) {
  const date = new Date(`${dateString}T00:00:00`);
  date.setDate(date.getDate() + days);
  return date.toISOString().split("T")[0];
}

/* =========================================================
   BOOKING SERVER ACTION
========================================================= */

async function createBooking(formData: FormData) {
  "use server";

  const propertyId = Number(formData.get("propertyId"));
  const checkInValue = String(formData.get("checkIn") || "");
  const checkOutValue = String(formData.get("checkOut") || "");
  const guests = Number(formData.get("guests"));

  if (!Number.isInteger(propertyId) || propertyId <= 0) {
    redirect("/stays?error=invalid-property");
  }

  if (!checkInValue || !checkOutValue) {
    redirect(`/stays/${propertyId}?error=dates-required`);
  }

  if (!Number.isInteger(guests) || guests < 1) {
    redirect(`/stays/${propertyId}?error=invalid-guests`);
  }

  const checkIn = new Date(`${checkInValue}T00:00:00`);
  const checkOut = new Date(`${checkOutValue}T00:00:00`);

  if (
    Number.isNaN(checkIn.getTime()) ||
    Number.isNaN(checkOut.getTime())
  ) {
    redirect(`/stays/${propertyId}?error=invalid-dates`);
  }

  if (checkOut <= checkIn) {
    redirect(`/stays/${propertyId}?error=checkout-before-checkin`);
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (checkIn < today) {
    redirect(`/stays/${propertyId}?error=past-date`);
  }

  const nights = Math.ceil(
    (checkOut.getTime() - checkIn.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (nights < 1) {
    redirect(`/stays/${propertyId}?error=invalid-stay`);
  }

  /* -----------------------------------------
     AUTHENTICATION
  ----------------------------------------- */

  const requestHeaders = await headers();

  const authRequest = new NextRequest("http://localhost", {
    headers: requestHeaders,
  });

  const { user, response } = await requireAuth(authRequest);

  if (response || !user) {
    redirect(
      `/login?callbackUrl=${encodeURIComponent(
        `/stays/${propertyId}`
      )}`
    );
  }

  /* -----------------------------------------
     PROPERTY
  ----------------------------------------- */

  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      status: "VERIFIED",
    },
    select: {
      id: true,
      guests: true,
      pricePerNight: true,
      cleaningFee: true,
      serviceFee: true,
      taxPercentage: true,
    },
  });

  if (!property) {
    redirect("/stays?error=property-not-found");
  }

  if (guests > property.guests) {
    redirect(`/stays/${propertyId}?error=too-many-guests`);
  }

  /* -----------------------------------------
     CHECK EXISTING BOOKINGS
  ----------------------------------------- */

  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      propertyId,
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
      checkIn: {
        lt: checkOut,
      },
      checkOut: {
        gt: checkIn,
      },
    },
    select: {
      id: true,
    },
  });

  if (conflictingBooking) {
    redirect(`/stays/${propertyId}?error=dates-unavailable`);
  }

  /* -----------------------------------------
     CALCULATE PRICE
  ----------------------------------------- */

  const pricePerNight = Number(property.pricePerNight);

  const baseAmount = pricePerNight * nights;

  const cleaningFee = Number(property.cleaningFee ?? 0);

  const serviceFee =
    property.serviceFee !== null
      ? Number(property.serviceFee)
      : Math.round(baseAmount * 0.05);

  const taxPercentage = Number(property.taxPercentage ?? 0);

  const taxAmount =
    ((baseAmount + cleaningFee + serviceFee) * taxPercentage) / 100;

  const totalAmount =
    baseAmount +
    cleaningFee +
    serviceFee +
    taxAmount;

  /* -----------------------------------------
     CREATE BOOKING
  ----------------------------------------- */

  try {
    const booking = await prisma.booking.create({
      data: {
        guestId: user.id,
        propertyId,
        checkIn,
        checkOut,
        guests,
        nights,

        baseAmount,
        cleaningFee,
        serviceFee,
        taxAmount,
        totalAmount,

        durationType: "OVERNIGHT",

        // Payment is not completed yet.
        // Booking remains pending until payment flow is connected.
        status: "PENDING",
        paymentStatus: "PENDING",
      },
      select: {
        id: true,
      },
    });

    redirect(
      `/stays/${propertyId}?booking=${booking.id}`
    );
  } catch (error) {
    console.error("STAY_BOOKING_CREATE_ERROR:", error);

    redirect(
      `/stays/${propertyId}?error=booking-failed`
    );
  }
}

/* =========================================================
   PAGE
========================================================= */

type PageProps = {
  params: Promise<{
    id: string;
  }>;

  searchParams?: Promise<{
    error?: string;
    booking?: string;
  }>;
};

export default async function StayDetailsPage({
  params,
  searchParams,
}: PageProps) {
  const { id } = await params;
  const propertyId = Number(id);

  if (!Number.isInteger(propertyId) || propertyId <= 0) {
    notFound();
  }

  const query = searchParams ? await searchParams : {};

  const property = await prisma.property.findFirst({
    where: {
      id: propertyId,
      status: "VERIFIED",
    },
    include: {
      images: {
        orderBy: {
          sortOrder: "asc",
        },
        take: 8,
      },

      amenities: {
        include: {
          amenity: true,
        },
      },

      reviews: {
        orderBy: {
          createdAt: "desc",
        },
        take: 6,
        select: {
          id: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              name: true,
            },
          },
        },
      },

      host: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });

  if (!property) {
    notFound();
  }

  const pricePerNight = Number(property.pricePerNight);

  const images =
    property.images.length > 0
      ? property.images.map((image) => image.url)
      : fallbackImages;

  const rating = Number(property.rating ?? 0);

  const errorMessages: Record<string, string> = {
    "dates-required":
      "Please select your check-in and check-out dates.",

    "invalid-dates":
      "Please select valid dates.",

    "checkout-before-checkin":
      "Check-out must be after check-in.",

    "past-date":
      "Check-in cannot be in the past.",

    "invalid-guests":
      "Please select a valid number of guests.",

    "too-many-guests":
      `This stay allows up to ${property.guests} guests.`,

    "dates-unavailable":
      "These dates are no longer available. Please choose different dates.",

    "booking-failed":
      "We couldn't create your booking. Please try again.",

    "property-not-found":
      "This stay is no longer available.",

    "invalid-property":
      "Invalid stay selected.",

    "invalid-stay":
      "Please select a valid stay duration.",
  };

  return (
    <main className="min-h-screen bg-white text-[#292524]">
      <Navbar />

      {/* =====================================================
          SUCCESS
      ===================================================== */}

      {query.booking && (
        <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-10">
          <div className="rounded-2xl border border-green-200 bg-green-50 px-5 py-4">
            <p className="text-sm font-semibold text-green-800">
              Booking request created successfully.
            </p>

            <p className="mt-1 text-xs text-green-700">
              Booking ID: #{query.booking}. Complete payment to confirm
              your reservation.
            </p>
          </div>
        </section>
      )}

      {/* =====================================================
          ERROR
      ===================================================== */}

      {query.error && errorMessages[query.error] && (
        <section className="mx-auto max-w-7xl px-5 pt-6 lg:px-10">
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4">
            <p className="text-sm font-semibold text-red-800">
              {errorMessages[query.error]}
            </p>
          </div>
        </section>
      )}

      {/* =====================================================
          BACK
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pt-8 lg:px-10">
        <Link
          href="/stays"
          className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 transition hover:text-[#03045E]"
        >
          ← Back to stays
        </Link>
      </section>

      {/* =====================================================
          PROPERTY HEADER
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-8 lg:px-10">
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-[#F4EFE5] px-3 py-1.5 text-xs font-semibold text-[#8B6F3D]">
              ✓ Verified stay
            </span>

            <span className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600">
              {formatPropertyType(property.type)}
            </span>
          </div>

          <h1 className="font-serif text-4xl font-semibold tracking-tight text-[#292524] sm:text-5xl">
            {property.title}
          </h1>

          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span>
              {property.city}, {property.state || property.country}
            </span>

            <span>·</span>

            <span className="font-semibold text-[#292524]">
              ★ {rating.toFixed(1)}
            </span>

            <span>
              {property.reviewCount} reviews
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================
          IMAGE GALLERY
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 lg:px-10">
        <div className="grid h-[520px] grid-cols-1 gap-3 overflow-hidden rounded-[28px] md:grid-cols-2">
          <div className="relative h-full min-h-[300px] overflow-hidden">
            <img
              src={images[0]}
              alt={property.title}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            {images.slice(1, 5).map((image, index) => (
              <div
                key={`${image}-${index}`}
                className="relative overflow-hidden"
              >
                <img
                  src={image}
                  alt={`${property.title} ${index + 2}`}
                  className="h-full w-full object-cover transition duration-500 hover:scale-105"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-12 lg:grid-cols-[1fr_390px] lg:px-10">
        {/* LEFT */}
        <div>
          {/* HOST / BASIC INFO */}

          <div className="border-b border-slate-200 pb-8">
            <div className="flex flex-col gap-2">
              <h2 className="font-serif text-2xl font-semibold">
                {formatPropertyType(property.type)} hosted by{" "}
                {property.host.name}
              </h2>

              <p className="text-sm text-slate-600">
                {property.guests} guests · {property.bedrooms} bedrooms ·{" "}
                {property.bathrooms} bathrooms
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}

          <div className="border-b border-slate-200 py-8">
            <h2 className="font-serif text-2xl font-semibold">
              About this stay
            </h2>

            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
              {property.description}
            </p>
          </div>

          {/* AMENITIES */}

          {property.amenities.length > 0 && (
            <div className="border-b border-slate-200 py-8">
              <h2 className="font-serif text-2xl font-semibold">
                What this place offers
              </h2>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {property.amenities.map((item) => (
                  <div
                    key={`${item.propertyId}-${item.amenityId}`}
                    className="rounded-2xl border border-slate-200 px-4 py-4"
                  >
                    <p className="text-sm font-semibold">
                      {item.amenity.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* LOCATION */}

          <div className="border-b border-slate-200 py-8">
            <h2 className="font-serif text-2xl font-semibold">
              Location
            </h2>

            <p className="mt-4 text-sm leading-6 text-slate-600">
              {property.city}, {property.state || property.country}
            </p>

            <p className="mt-2 text-xs text-slate-500">
              Exact address is provided according to the Vistara booking
              and privacy flow.
            </p>
          </div>

          {/* REVIEWS */}

          <div className="py-8">
            <h2 className="font-serif text-2xl font-semibold">
              Reviews
            </h2>

            {property.reviews.length === 0 ? (
              <p className="mt-4 text-sm text-slate-500">
                No reviews yet.
              </p>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {property.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl border border-slate-200 p-5"
                  >
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-semibold">
                        {review.user.name}
                      </p>

                      <span className="text-sm font-semibold">
                        ★ {review.rating}
                      </span>
                    </div>

                    {review.comment && (
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {review.comment}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* =====================================================
            BOOKING CARD
        ===================================================== */}

        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(0,0,0,0.08)]">
            <div className="flex items-end justify-between">
              <div>
                <span className="text-2xl font-bold text-[#03045E]">
                  ₹{formatMoney(pricePerNight)}
                </span>

                <span className="ml-1 text-sm text-slate-500">
                  / night
                </span>
              </div>

              <span className="text-sm font-semibold text-[#292524]">
                ★ {rating.toFixed(1)}
              </span>
            </div>

            <form
              action={createBooking}
              className="mt-6 space-y-4"
            >
              <input
                type="hidden"
                name="propertyId"
                value={property.id}
              />

              {/* DATES */}

              <div className="grid grid-cols-2 overflow-hidden rounded-2xl border border-slate-300">
                <div className="border-r border-slate-300 p-4">
                  <label
                    htmlFor="checkIn"
                    className="block text-[10px] font-bold uppercase tracking-[0.15em]"
                  >
                    Check-in
                  </label>

                  <input
                    id="checkIn"
                    name="checkIn"
                    type="date"
                    min={getToday()}
                    defaultValue={getToday()}
                    className="mt-2 w-full bg-transparent text-sm font-medium outline-none"
                    required
                  />
                </div>

                <div className="p-4">
                  <label
                    htmlFor="checkOut"
                    className="block text-[10px] font-bold uppercase tracking-[0.15em]"
                  >
                    Check-out
                  </label>

                  <input
                    id="checkOut"
                    name="checkOut"
                    type="date"
                    min={addDays(getToday(), 1)}
                    defaultValue={addDays(getToday(), 1)}
                    className="mt-2 w-full bg-transparent text-sm font-medium outline-none"
                    required
                  />
                </div>
              </div>

              {/* GUESTS */}

              <div className="rounded-2xl border border-slate-300 p-4">
                <label
                  htmlFor="guests"
                  className="block text-[10px] font-bold uppercase tracking-[0.15em]"
                >
                  Guests
                </label>

                <select
                  id="guests"
                  name="guests"
                  defaultValue="2"
                  className="mt-2 w-full bg-transparent text-sm font-medium outline-none"
                >
                  {Array.from(
                    { length: property.guests },
                    (_, index) => index + 1
                  ).map((count) => (
                    <option key={count} value={count}>
                      {count} {count === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              {/* PRICE NOTE */}

              <div className="rounded-2xl bg-[#F8F5EF] p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">
                    Starting price
                  </span>

                  <span className="font-semibold">
                    ₹{formatMoney(pricePerNight)} / night
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-slate-500">
                  Final amount is calculated from your selected dates
                  and applicable fees.
                </p>
              </div>

              {/* BOOK */}

              <button
                type="submit"
                className="w-full rounded-2xl bg-[#171614] px-6 py-4 text-sm font-bold text-white transition hover:bg-[#292724] active:scale-[0.99]"
              >
                Book this stay
              </button>

              <p className="text-center text-xs leading-5 text-slate-500">
                You will be asked to complete payment after creating
                the booking.
              </p>
            </form>
          </div>
        </aside>
      </section>

      <Footer />
    </main>
  );
}