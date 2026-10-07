"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

// =========================================================
// TYPES
// =========================================================

type BookingType =
  | "STAY"
  | "DRIVER"
  | "EXPERIENCE"
  | "GUIDE"
  | "LOCAL_PLAN"
  | "EXPLORE";

type Booking = {
  id?: string | number;
  bookingId?: string | number;

  bookingType?: BookingType | string;
  type?: string;

  title?: string;
  name?: string;

  image?: string;

  city?: string;
  location?: string;

  date?: string;
  bookingDate?: string;
  checkIn?: string;
  checkOut?: string;
  startTime?: string;
  endTime?: string;
  time?: string;

  guests?: number;
  passengers?: number;
  nights?: number;

  price?: number | string;
  amount?: number | string;
  subtotal?: number | string;
  totalAmount?: number | string;

  pricePerNight?: number | string;
  serviceFee?: number | string;
  cleaningFee?: number | string;
  taxAmount?: number | string;

  status?: string;
  paymentStatus?: string;

  pickup?: string;
  destination?: string;

  driverId?: string | number;

  createdAt?: string;
  requestedAt?: string;

  property?: {
    id?: string | number;
    title?: string;
    name?: string;
    city?: string;
    address?: string;

    images?: {
      url?: string;
      imageUrl?: string;
      src?: string;
      isPrimary?: boolean;
    }[];
  };

  driver?: {
    id?: string | number;

    user?: {
      id?: string | number;
      name?: string;
    };
  };

  vehicle?: {
    id?: string | number;
    type?: string;
    capacity?: number;
    make?: string;
    model?: string;
  };

  metadata?: Record<string, any>;
};

// =========================================================
// HELPERS
// =========================================================

function money(value: unknown) {
  const amount = Number(value || 0);

  return `₹${amount.toLocaleString("en-IN")}`;
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value?: string) {
  if (!value) return "—";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getType(booking: Booking): BookingType {
  return String(
    booking.bookingType ||
      booking.type ||
      "STAY"
  ).toUpperCase() as BookingType;
}

function getBookingId(booking: Booking) {
  return String(
    booking.bookingId ??
      booking.id ??
      ""
  );
}

function getTitle(booking: Booking) {
  return (
    booking.title ||
    booking.name ||
    booking.property?.title ||
    booking.property?.name ||
    booking.driver?.user?.name ||
    "Vistara Booking"
  );
}

function getLocation(booking: Booking) {
  return (
    booking.location ||
    booking.city ||
    booking.property?.city ||
    booking.property?.address ||
    "India"
  );
}

function getImage(booking: Booking) {
  return (
    booking.image ||
    booking.property?.images?.find(
      (image) => image.isPrimary
    )?.url ||
    booking.property?.images?.[0]?.url ||
    booking.property?.images?.[0]?.imageUrl ||
    booking.property?.images?.[0]?.src ||
    ""
  );
}

function getStatus(booking: Booking) {
  return String(
    booking.status ||
      "CONFIRMED"
  ).toUpperCase();
}

function getTotal(booking: Booking) {
  return Number(
    booking.totalAmount ??
      booking.price ??
      booking.amount ??
      booking.subtotal ??
      0
  );
}

function getTypeLabel(type: BookingType) {
  switch (type) {
    case "STAY":
      return "VISTARA STAY";

    case "DRIVER":
      return "VISTARA RIDE";

    case "EXPERIENCE":
      return "EXPERIENCE";

    case "GUIDE":
      return "LOCAL GUIDE";

    case "LOCAL_PLAN":
      return "LOCAL PLAN";

    case "EXPLORE":
      return "EXPLORE";

    default:
      return "VISTARA BOOKING";
  }
}

function getDetailRoute(
  booking: Booking
) {
  const type = getType(booking);

  const id =
    booking.property?.id ||
    booking.metadata?.itemId ||
    booking.metadata?.experienceId ||
    booking.metadata?.exploreId ||
    booking.metadata?.guideId ||
    booking.metadata?.driverId ||
    booking.metadata?.planId ||
    booking.driverId;

  if (!id) {
    return null;
  }

  switch (type) {
    case "STAY":
      return `/stays/${id}`;

    case "DRIVER":
      return `/drivers/${id}`;

    case "EXPERIENCE":
      return `/experiences/${id}`;

    case "EXPLORE":
      return `/explore/${id}`;

    case "GUIDE":
      return `/guides/${id}`;

    case "LOCAL_PLAN":
      return `/local-plans/${id}`;

    default:
      return null;
  }
}

// =========================================================
// PAGE
// =========================================================

export default function BookingsPage() {
  const [bookings, setBookings] =
    useState<Booking[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =======================================================
  // LOAD BOOKINGS
  // =======================================================

  useEffect(() => {
    let cancelled = false;

    async function loadBookings() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          "/api/bookings",
          {
            method: "GET",
            credentials: "include",
            cache: "no-store",
          }
        );

        const text =
          await response.text();

        let result: any = {};

        try {
          result = text
            ? JSON.parse(text)
            : {};
        } catch {
          result = {};
        }

        if (
          response.ok &&
          result?.success
        ) {
          const apiBookings =
            Array.isArray(
              result.bookings
            )
              ? result.bookings
              : [];

          if (!cancelled) {
            setBookings(
              apiBookings
            );
          }

          return;
        }

        // -------------------------------------------------
        // LOCAL STORAGE FALLBACK
        // -------------------------------------------------

        const fallback =
          loadLocalStorageBookings();

        if (!cancelled) {
          setBookings(
            fallback
          );
        }

        if (
          !response.ok &&
          !fallback.length
        ) {
          setError(
            result?.message ||
              "Unable to load your bookings."
          );
        }
      } catch (err) {
        console.error(
          "BOOKINGS_LOAD_ERROR:",
          err
        );

        const fallback =
          loadLocalStorageBookings();

        if (!cancelled) {
          setBookings(
            fallback
          );

          if (!fallback.length) {
            setError(
              "Unable to load your bookings."
            );
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadBookings();

    return () => {
      cancelled = true;
    };
  }, []);

  // =======================================================
  // LOCAL STORAGE FALLBACK
  // =======================================================

  function loadLocalStorageBookings() {
    if (
      typeof window ===
      "undefined"
    ) {
      return [];
    }

    const keys = [
      "vistara-bookings",
      "vistara-local-plan-bookings",
      "vistara-driver-bookings",
      "vistara-experience-bookings",
      "vistara-guide-bookings",
    ];

    const all: Booking[] = [];

    for (const key of keys) {
      try {
        const saved =
          localStorage.getItem(
            key
          );

        if (!saved) {
          continue;
        }

        const parsed =
          JSON.parse(saved);

        if (
          Array.isArray(parsed)
        ) {
          all.push(
            ...parsed
          );
        }
      } catch {
        // Ignore invalid localStorage
      }
    }

    // Remove duplicates
    const unique =
      new Map<
        string,
        Booking
      >();

    for (const booking of all) {
      const id =
        getBookingId(
          booking
        );

      if (!id) {
        continue;
      }

      unique.set(
        id,
        booking
      );
    }

    return Array.from(
      unique.values()
    );
  }

  // =======================================================
  // COUNTS
  // =======================================================

  const counts = useMemo(() => {
    return {
      all: bookings.length,

      stays: bookings.filter(
        (booking) =>
          getType(booking) ===
          "STAY"
      ).length,

      rides: bookings.filter(
        (booking) =>
          getType(booking) ===
          "DRIVER"
      ).length,

      experiences: bookings.filter(
        (booking) =>
          getType(booking) ===
          "EXPERIENCE"
      ).length,

      guides: bookings.filter(
        (booking) =>
          getType(booking) ===
          "GUIDE"
      ).length,
    };
  }, [bookings]);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-8 lg:py-16">
          <div className="mb-10">
            <div className="h-2.5 w-20 animate-pulse rounded-full bg-black/10" />

            <div className="mt-4 h-10 w-56 animate-pulse rounded-lg bg-black/10" />

            <div className="mt-3 h-4 w-72 animate-pulse rounded bg-black/5" />
          </div>

          <div className="space-y-6">
            {[1, 2, 3].map(
              (item) => (
                <div
                  key={item}
                  className="overflow-hidden rounded-[28px] border border-black/10"
                >
                  <div className="h-64 animate-pulse bg-black/5" />

                  <div className="space-y-4 p-6">
                    <div className="h-5 w-48 animate-pulse rounded bg-black/10" />

                    <div className="h-4 w-32 animate-pulse rounded bg-black/5" />

                    <div className="h-16 animate-pulse rounded-2xl bg-black/5" />
                  </div>
                </div>
              )
            )}
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // =======================================================
  // EMPTY
  // =======================================================

  if (bookings.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-5 py-12 sm:px-6">
          <div className="w-full max-w-lg rounded-[28px] border border-black/10 bg-white p-8 text-center shadow-[0_20px_60px_rgba(0,0,0,0.06)] sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-black text-2xl font-light text-white">
              +
            </div>

            <p className="mt-7 text-[10px] font-black uppercase tracking-[0.35em] text-black/40">
              VISTARA
            </p>

            <h1 className="mt-3 text-3xl font-black tracking-tight">
              No bookings yet
            </h1>

            <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-black/50">
              {error ||
                "Your Vistara stays, rides, guides and experiences will appear here once you make a reservation."}
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/stays"
                className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-sm font-bold text-white transition hover:bg-black/80"
              >
                Explore stays
              </Link>

              <Link
                href="/drivers"
                className="inline-flex items-center justify-center rounded-full border border-black/15 px-7 py-3.5 text-sm font-bold transition hover:border-black"
              >
                Find a ride
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // =======================================================
  // BOOKING PAGE
  // =======================================================

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-8 lg:py-14">

        {/* HEADER */}

        <div className="mb-10">
          <p className="text-[10px] font-black uppercase tracking-[0.35em] text-black/40">
            VISTARA
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <h1 className="text-4xl font-black tracking-[-0.04em] sm:text-5xl">
                My Bookings
              </h1>

              <p className="mt-2 text-sm text-black/50">
                Your Vistara reservations
                and journeys.
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <CountPill
                label="All"
                count={counts.all}
              />

              <CountPill
                label="Stays"
                count={counts.stays}
              />

              <CountPill
                label="Rides"
                count={counts.rides}
              />

              <CountPill
                label="Guides"
                count={counts.guides}
              />
            </div>
          </div>
        </div>

        {/* ERROR */}

        {error && (
          <div className="mb-6 rounded-2xl border border-black/10 bg-black/[0.025] px-5 py-4 text-sm text-black/60">
            {error}
          </div>
        )}

        {/* BOOKING LIST */}

        <div className="space-y-7">
          {bookings.map(
            (
              booking,
              index
            ) => {
              const type =
                getType(
                  booking
                );

              const title =
                getTitle(
                  booking
                );

              const location =
                getLocation(
                  booking
                );

              const image =
                getImage(
                  booking
                );

              const status =
                getStatus(
                  booking
                );

              const bookingId =
                getBookingId(
                  booking
                ) ||
                `booking-${index}`;

              const total =
                getTotal(
                  booking
                );

              const detailRoute =
                getDetailRoute(
                  booking
                );

              const isStay =
                type === "STAY";

              const isDriver =
                type === "DRIVER";

              const isGuide =
                type === "GUIDE";

              const isExperience =
                type ===
                "EXPERIENCE";

              const guests =
                Number(
                  booking.guests ??
                    booking.passengers ??
                    1
                );

              const serviceFee =
                Number(
                  booking.serviceFee ||
                    0
                );

              const pricePerNight =
                Number(
                  booking.pricePerNight ||
                    0
                );

              const nights =
                Number(
                  booking.nights ||
                    0
                );

              return (
                <article
                  key={`${type}-${bookingId}`}
                  className="overflow-hidden rounded-[28px] border border-black/10 bg-white shadow-[0_15px_50px_rgba(0,0,0,0.06)] transition duration-300 hover:border-black/25 hover:shadow-[0_20px_60px_rgba(0,0,0,0.09)]"
                >
                  <div className="grid lg:grid-cols-[360px_1fr]">

                    {/* IMAGE */}

                    <div className="relative h-72 overflow-hidden bg-black/5 lg:h-full lg:min-h-[440px]">
                      {image ? (
                        <img
                          src={image}
                          alt={title}
                          className="h-full w-full object-cover transition duration-700 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full min-h-72 items-center justify-center bg-black/5 text-xs font-bold uppercase tracking-[0.25em] text-black/30">
                          VISTARA
                        </div>
                      )}

                      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent" />

                      {/* STATUS */}

                      <div className="absolute left-5 top-5 rounded-full bg-white px-4 py-2 shadow-lg">
                        <span className="flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.15em]">
                          <span className="h-2 w-2 rounded-full bg-black" />

                          {status}
                        </span>
                      </div>

                      {/* IMAGE TEXT */}

                      <div className="absolute bottom-5 left-5 right-5 text-white">
                        <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/70">
                          {getTypeLabel(
                            type
                          )}
                        </p>

                        <h2 className="mt-1 text-2xl font-black">
                          {title}
                        </h2>

                        <p className="mt-1 text-xs text-white/75">
                          {location}
                        </p>
                      </div>
                    </div>

                    {/* CONTENT */}

                    <div className="flex flex-col p-6 sm:p-8 lg:p-10">

                      {/* TOP */}

                      <div className="flex flex-col justify-between gap-5 border-b border-black/10 pb-6 sm:flex-row sm:items-start">
                        <div>
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/35">
                            Booking ID
                          </p>

                          <p className="mt-2 break-all text-sm font-black tracking-wide">
                            {bookingId}
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/35">
                            Total amount
                          </p>

                          <p className="mt-1 text-3xl font-black tracking-tight">
                            {money(total)}
                          </p>
                        </div>
                      </div>

                      {/* TITLE */}

                      <div className="mt-7">
                        <p className="text-[9px] font-black uppercase tracking-[0.2em] text-black/35">
                          {getTypeLabel(
                            type
                          )}
                        </p>

                        <h2 className="mt-2 text-3xl font-black tracking-tight">
                          {title}
                        </h2>

                        <p className="mt-2 text-sm text-black/50">
                          {location}
                        </p>
                      </div>

                      {/* =================================================
                          STAY
                      ================================================= */}

                      {isStay && (
                        <>
                          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <MiniInfo
                              label="Check in"
                              value={formatDate(
                                booking.checkIn
                              )}
                            />

                            <MiniInfo
                              label="Check out"
                              value={formatDate(
                                booking.checkOut
                              )}
                            />

                            <MiniInfo
                              label="Guests"
                              value={`${guests} ${
                                guests === 1
                                  ? "Guest"
                                  : "Guests"
                              }`}
                            />

                            <MiniInfo
                              label="Stay"
                              value={`${nights} ${
                                nights === 1
                                  ? "Night"
                                  : "Nights"
                              }`}
                            />

                            <MiniInfo
                              label="Price / night"
                              value={money(
                                pricePerNight
                              )}
                            />

                            <MiniInfo
                              label="Status"
                              value={
                                status
                              }
                            />
                          </div>

                          <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-black/55">
                                Stay
                              </span>

                              <span className="font-semibold">
                                {money(
                                  pricePerNight *
                                    nights
                                )}
                              </span>
                            </div>

                            <div className="mt-3 flex items-center justify-between text-sm">
                              <span className="text-black/55">
                                Service fee
                              </span>

                              <span className="font-semibold">
                                {money(
                                  serviceFee
                                )}
                              </span>
                            </div>

                            <div className="my-4 border-t border-black/10" />

                            <div className="flex items-center justify-between">
                              <span className="text-sm font-black">
                                Total
                              </span>

                              <span className="text-xl font-black">
                                {money(
                                  total
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* =================================================
                          DRIVER
                      ================================================= */}

                      {isDriver && (
                        <>
                          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <MiniInfo
                              label="Date"
                              value={formatDate(
                                booking.date ||
                                  booking.metadata
                                    ?.date
                              )}
                            />

                            <MiniInfo
                              label="Time"
                              value={
                                booking.time ||
                                formatTime(
                                  booking.requestedAt
                                )
                              }
                            />

                            <MiniInfo
                              label="Passengers"
                              value={`${guests} ${
                                guests === 1
                                  ? "Passenger"
                                  : "Passengers"
                              }`}
                            />

                            <MiniInfo
                              label="Ride"
                              value="Vistara Ride"
                            />

                            <MiniInfo
                              label="Status"
                              value={
                                status
                              }
                            />

                            <MiniInfo
                              label="Payment"
                              value={
                                booking.paymentStatus ||
                                "NOT_REQUIRED"
                              }
                            />
                          </div>

                          <div className="mt-7 grid gap-3 sm:grid-cols-2">
                            <RouteBox
                              label="Pickup"
                              value={
                                booking.pickup ||
                                booking.metadata
                                  ?.pickup ||
                                "Not specified"
                              }
                            />

                            <RouteBox
                              label="Destination"
                              value={
                                booking.destination ||
                                booking.metadata
                                  ?.destination ||
                                "Not specified"
                              }
                            />
                          </div>

                          <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-black/50">
                                Ride fare
                              </span>

                              <span className="text-xl font-black">
                                {money(
                                  total
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* =================================================
                          GUIDE
                      ================================================= */}

                      {isGuide && (
                        <>
                          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <MiniInfo
                              label="Date"
                              value={formatDate(
                                booking.startTime ||
                                  booking.date
                              )}
                            />

                            <MiniInfo
                              label="Start"
                              value={formatTime(
                                booking.startTime
                              )}
                            />

                            <MiniInfo
                              label="End"
                              value={formatTime(
                                booking.endTime
                              )}
                            />

                            <MiniInfo
                              label="Guests"
                              value={`${guests} ${
                                guests === 1
                                  ? "Guest"
                                  : "Guests"
                              }`}
                            />

                            <MiniInfo
                              label="Guide"
                              value="Local Guide"
                            />

                            <MiniInfo
                              label="Status"
                              value={
                                status
                              }
                            />
                          </div>

                          <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-black/50">
                                Guide booking
                              </span>

                              <span className="text-xl font-black">
                                {money(
                                  total
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* =================================================
                          EXPERIENCE
                      ================================================= */}

                      {isExperience && (
                        <>
                          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <MiniInfo
                              label="Date"
                              value={formatDate(
                                booking.bookingDate ||
                                  booking.date
                              )}
                            />

                            <MiniInfo
                              label="Guests"
                              value={`${guests} ${
                                guests === 1
                                  ? "Guest"
                                  : "Guests"
                              }`}
                            />

                            <MiniInfo
                              label="Experience"
                              value="Vistara Experience"
                            />

                            <MiniInfo
                              label="Status"
                              value={
                                status
                              }
                            />
                          </div>

                          <div className="mt-7 rounded-2xl border border-black/10 bg-black/[0.02] p-5">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-black/50">
                                Experience
                              </span>

                              <span className="text-xl font-black">
                                {money(
                                  total
                                )}
                              </span>
                            </div>
                          </div>
                        </>
                      )}

                      {/* =================================================
                          LOCAL PLAN / EXPLORE
                      ================================================= */}

                      {!isStay &&
                        !isDriver &&
                        !isGuide &&
                        !isExperience && (
                          <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
                            <MiniInfo
                              label="Date"
                              value={formatDate(
                                booking.date
                              )}
                            />

                            <MiniInfo
                              label="Guests"
                              value={`${guests} ${
                                guests === 1
                                  ? "Guest"
                                  : "Guests"
                              }`}
                            />

                            <MiniInfo
                              label="Status"
                              value={
                                status
                              }
                            />
                          </div>
                        )}

                      {/* =================================================
                          BOTTOM
                      ================================================= */}

                      <div className="mt-7 flex flex-col gap-4 border-t border-black/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-[10px] font-bold text-black/40">
                            {getTypeLabel(
                              type
                            )}
                            {" · "}
                            {status}
                          </p>

                          {booking.createdAt && (
                            <p className="mt-1 text-[10px] text-black/30">
                              Booked on{" "}
                              {formatDate(
                                booking.createdAt
                              )}
                            </p>
                          )}

                          {booking.requestedAt &&
                            isDriver && (
                              <p className="mt-1 text-[10px] text-black/30">
                                Requested{" "}
                                {formatDate(
                                  booking.requestedAt
                                )}
                              </p>
                            )}
                        </div>

                        {detailRoute ? (
                          <Link
                            href={
                              detailRoute
                            }
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition hover:bg-black/80"
                          >
                            View booking
                          </Link>
                        ) : (
                          <Link
                            href="/"
                            className="inline-flex min-h-12 items-center justify-center rounded-full bg-black px-7 py-3 text-sm font-bold text-white transition hover:bg-black/80"
                          >
                            Explore Vistara
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </article>
              );
            }
          )}
        </div>

        {/* EXPLORE MORE */}

        <div className="mt-10 flex flex-wrap justify-center gap-5">
          <Link
            href="/stays"
            className="text-xs font-bold text-black/40 underline decoration-black/20 underline-offset-4 transition hover:text-black"
          >
            Explore stays
          </Link>

          <Link
            href="/experiences"
            className="text-xs font-bold text-black/40 underline decoration-black/20 underline-offset-4 transition hover:text-black"
          >
            Explore experiences
          </Link>

          <Link
            href="/guides"
            className="text-xs font-bold text-black/40 underline decoration-black/20 underline-offset-4 transition hover:text-black"
          >
            Find a guide
          </Link>

          <Link
            href="/drivers"
            className="text-xs font-bold text-black/40 underline decoration-black/20 underline-offset-4 transition hover:text-black"
          >
            Find a ride
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// =========================================================
// COUNT PILL
// =========================================================

function CountPill({
  label,
  count,
}: {
  label: string;
  count: number;
}) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-4 py-2 text-xs font-bold">
      <span>
        {label}
      </span>

      <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1.5 text-[9px] text-white">
        {count}
      </span>
    </div>
  );
}

// =========================================================
// MINI INFO
// =========================================================

function MiniInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white px-4 py-4">
      <p className="text-[8px] font-black uppercase tracking-[0.15em] text-black/35">
        {label}
      </p>

      <p className="mt-2 truncate text-sm font-bold">
        {value}
      </p>
    </div>
  );
}

// =========================================================
// ROUTE BOX
// =========================================================

function RouteBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 bg-black/[0.02] p-4">
      <p className="text-[8px] font-black uppercase tracking-[0.15em] text-black/35">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold leading-5">
        {value}
      </p>
    </div>
  );
}