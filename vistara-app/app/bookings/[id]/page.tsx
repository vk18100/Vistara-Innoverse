"use client";

import Link from "next/link";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  Clock3,
  CreditCard,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

// =========================================================
// TYPES
// =========================================================

type Booking = {
  id: string | number;
  bookingId?: string | number;

  bookingType?: string;
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

  baseAmount?: number | string;
  cleaningFee?: number | string;
  serviceFee?: number | string;
  taxAmount?: number | string;

  totalAmount?: number | string;

  status?: string;
  paymentStatus?: string;

  pickup?: string;
  destination?: string;

  requestedAt?: string;
  createdAt?: string;

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
    registration?: string;
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
  if (!value) return "Not specified";

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
  if (!value) return "Not specified";

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value;
  }

  return date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function getType(booking: Booking) {
  return String(
    booking.bookingType ||
      booking.type ||
      ""
  ).toUpperCase();
}

function getTitle(booking: Booking) {
  return (
    booking.title ||
    booking.name ||
    booking.property?.title ||
    booking.property?.name ||
    booking.metadata?.experienceName ||
    booking.metadata?.exploreName ||
    booking.metadata?.guideName ||
    booking.metadata?.planName ||
    booking.driver?.user?.name ||
    "Vistara Booking"
  );
}

function getLocation(booking: Booking) {
  return (
    booking.city ||
    booking.location ||
    booking.property?.city ||
    booking.property?.address ||
    booking.metadata?.city ||
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
    booking.metadata?.image ||
    ""
  );
}

function typeLabel(type: string) {
  switch (type) {
    case "STAY":
      return "STAY";

    case "EXPERIENCE":
      return "EXPERIENCE";

    case "EXPLORE":
      return "EXPLORE";

    case "GUIDE":
      return "LOCAL GUIDE";

    case "DRIVER":
      return "VISTARA RIDE";

    case "LOCAL_PLAN":
      return "LOCAL PLAN";

    default:
      return "VISTARA BOOKING";
  }
}

function getItemRoute(booking: Booking) {
  const type = getType(booking);

  const id =
    booking.property?.id ||
    booking.metadata?.experienceId ||
    booking.metadata?.exploreId ||
    booking.metadata?.guideId ||
    booking.metadata?.driverId ||
    booking.metadata?.planId ||
    booking.metadata?.itemId;

  if (!id) {
    return null;
  }

  switch (type) {
    case "STAY":
      return `/stays/${id}`;

    case "EXPERIENCE":
      return `/experiences/${id}`;

    case "EXPLORE":
      return `/explore/${id}`;

    case "GUIDE":
      return `/guides/${id}`;

    case "DRIVER":
      return `/drivers/${id}`;

    case "LOCAL_PLAN":
      return `/local-plans/${id}`;

    default:
      return null;
  }
}

// =========================================================
// PAGE
// =========================================================

export default function BookingIdPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();

  const id = String(
    params?.id || ""
  ).trim();

  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  // =======================================================
  // QUERY PARAM BOOKING
  // =======================================================

  const queryBooking = useMemo<Booking | null>(() => {
    if (!id) {
      return null;
    }

    const bookingType =
      searchParams.get("bookingType") ||
      searchParams.get("type") ||
      "";

    const title =
      searchParams.get("title") ||
      searchParams.get("experienceName") ||
      searchParams.get("exploreName") ||
      searchParams.get("guideName") ||
      searchParams.get("driverName") ||
      searchParams.get("planName") ||
      "";

    const city =
      searchParams.get("city") ||
      searchParams.get("location") ||
      "India";

    const image =
      searchParams.get("image") || "";

    const date =
      searchParams.get("date") || "";

    const checkIn =
      searchParams.get("checkIn") || "";

    const checkOut =
      searchParams.get("checkOut") || "";

    const guests = Number(
      searchParams.get("guests") ||
        searchParams.get("passengers") ||
        1
    );

    const passengers = Number(
      searchParams.get("passengers") ||
        guests
    );

    const price = Number(
      searchParams.get("price") || 0
    );

    const subtotal = Number(
      searchParams.get("subtotal") ||
        price ||
        0
    );

    const serviceFee = Number(
      searchParams.get("serviceFee") ||
        0
    );

    const totalAmount = Number(
      searchParams.get("total") ||
        searchParams.get("totalAmount") ||
        subtotal +
          serviceFee
    );

    const time =
      searchParams.get("time") || "";

    const guideId =
      searchParams.get("guideId") || "";

    const experienceId =
      searchParams.get("experienceId") || "";

    const exploreId =
      searchParams.get("exploreId") || "";

    const driverId =
      searchParams.get("driverId") || "";

    const planId =
      searchParams.get("planId") || "";

    const itemId =
      searchParams.get("itemId") || "";

    if (
      !bookingType &&
      !title &&
      !date &&
      !price &&
      !guideId &&
      !experienceId &&
      !driverId
    ) {
      return null;
    }

    return {
      id,

      bookingId: id,

      bookingType:
        bookingType ||
        "STAY",

      title:
        title || undefined,

      image,

      city,

      date,

      checkIn,

      checkOut,

      time,

      guests,

      passengers,

      price,

      subtotal,

      serviceFee,

      totalAmount,

      status:
        searchParams.get("status") ||
        "CONFIRMED",

      paymentStatus:
        searchParams.get("paymentStatus") ||
        "NOT_REQUIRED",

      pickup:
        searchParams.get("pickup") ||
        "",

      destination:
        searchParams.get("destination") ||
        "",

      metadata: {
        itemId,
        experienceId,
        exploreId,
        guideId,
        driverId,
        planId,
        city,
        time,
      },
    };
  }, [id, searchParams]);

  // =======================================================
  // LOAD BOOKING
  // =======================================================

  useEffect(() => {
    if (!id) {
      setError(
        "Booking ID is missing."
      );

      setLoading(false);

      return;
    }

    async function loadBooking() {
      try {
        setLoading(true);
        setError("");

        // =================================================
        // 1. QUERY PARAMS FIRST
        // =================================================

        if (queryBooking) {
          setBooking(
            queryBooking
          );

          setLoading(false);

          return;
        }

        // =================================================
        // 2. GET ALL BOOKINGS
        //
        // Current API has:
        // GET /api/bookings
        //
        // So we fetch the list and find this ID.
        // =================================================

        const response =
          await fetch(
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
          result?.success &&
          Array.isArray(
            result.bookings
          )
        ) {
          const found =
            result.bookings.find(
              (item: Booking) => {
                const bookingId =
                  String(
                    item.bookingId ??
                      item.id ??
                      ""
                  );

                return (
                  bookingId === id
                );
              }
            );

          if (found) {
            setBooking({
              ...found,

              id:
                found.id ||
                found.bookingId ||
                id,

              bookingId:
                found.bookingId ||
                String(
                  found.id ||
                    id
                ),
            });

            return;
          }
        }

        // =================================================
        // 3. LOCAL STORAGE FALLBACK
        // =================================================

        const storageKeys = [
          "vistara-bookings",
          "vistara-local-plan-bookings",
          "vistara-driver-bookings",
          "vistara-experience-bookings",
          "vistara-guide-bookings",
        ];

        for (
          const key of storageKeys
        ) {
          try {
            const raw =
              localStorage.getItem(
                key
              );

            if (!raw) {
              continue;
            }

            const parsed =
              JSON.parse(raw);

            if (
              !Array.isArray(
                parsed
              )
            ) {
              continue;
            }

            const found =
              parsed.find(
                (item: any) =>
                  String(
                    item?.bookingId ??
                      item?.id ??
                      ""
                  ) === id
              );

            if (found) {
              setBooking({
                ...found,

                id:
                  found.id ||
                  found.bookingId ||
                  id,

                bookingId:
                  found.bookingId ||
                  String(
                    found.id ||
                      id
                  ),
              });

              return;
            }
          } catch {
            // Continue.
          }
        }

        throw new Error(
          "This booking could not be found."
        );
      } catch (err) {
        console.error(
          "BOOKING_DETAIL_ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load booking."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [id, queryBooking]);

  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[75vh] items-center justify-center px-5">
          <div className="text-center">
            <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-black/10 border-t-black" />

            <p className="mt-5 text-sm text-black/50">
              Loading booking...
            </p>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // =======================================================
  // NOT FOUND
  // =======================================================

  if (!booking) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-black text-xl font-bold">
              !
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
              BOOKING
            </p>

            <h1 className="mt-3 text-3xl font-black">
              Booking not found
            </h1>

            <p className="mt-3 text-sm leading-6 text-black/50">
              {error ||
                "This booking could not be found."}
            </p>

            <Link
              href="/bookings"
              className="mt-7 inline-flex rounded-xl bg-black px-6 py-3 text-sm font-bold text-white"
            >
              View my bookings
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  // =======================================================
  // VALUES
  // =======================================================

  const type =
    getType(booking);

  const title =
    getTitle(booking);

  const location =
    getLocation(booking);

  const image =
    getImage(booking);

  const guests = Number(
    booking.guests ??
      booking.passengers ??
      1
  );

  const subtotal = Number(
    booking.subtotal ??
      booking.baseAmount ??
      booking.price ??
      booking.amount ??
      0
  );

  const serviceFee =
    Number(
      booking.serviceFee || 0
    );

  const cleaningFee =
    Number(
      booking.cleaningFee || 0
    );

  const taxAmount =
    Number(
      booking.taxAmount || 0
    );

  const total =
    Number(
      booking.totalAmount ??
        subtotal +
          serviceFee +
          cleaningFee +
          taxAmount
    );

  const status =
    String(
      booking.status ||
        "CONFIRMED"
    ).toUpperCase();

  const paymentStatus =
    String(
      booking.paymentStatus ||
        "NOT_REQUIRED"
    ).toUpperCase();

  const nights =
    Number(
      booking.nights || 0
    );

  const isStay =
    type === "STAY";

  const isDriver =
    type === "DRIVER";

  const detailRoute =
    getItemRoute(
      booking
    );

  // =======================================================
  // RENDER
  // =======================================================

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* =================================================
          CONFIRMATION HEADER
      ================================================= */}

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-4xl px-5 py-10 text-center sm:px-6">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
            <Check
              size={25}
              strokeWidth={2.5}
            />
          </div>

          <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.25em] text-black/40">
            {status ===
            "CONFIRMED"
              ? "BOOKING CONFIRMED"
              : "BOOKING CREATED"}
          </p>

          <h1 className="mt-2 text-3xl font-black tracking-tight sm:text-4xl">
            Your booking is confirmed
          </h1>

          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-black/50">
            Your Vistara booking has
            been successfully
            recorded.
          </p>

          <div className="mx-auto mt-6 inline-flex items-center gap-3 rounded-full border border-black/10 px-4 py-2.5">
            <span className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/40">
              Booking ID
            </span>

            <span className="text-xs font-black">
              {booking.bookingId ||
                booking.id}
            </span>
          </div>
        </div>
      </section>

      {/* =================================================
          MAIN
      ================================================= */}

      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-[1fr_350px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">

            {/* ITEM */}

            <div className="overflow-hidden rounded-[24px] border border-black/10 bg-white">
              {image ? (
                <div className="aspect-[16/8] overflow-hidden bg-neutral-100">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex aspect-[16/6] items-center justify-center bg-neutral-100">
                  <span className="text-sm font-bold text-black/30">
                    VISTARA
                  </span>
                </div>
              )}

              <div className="p-6">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="text-[9px] font-bold uppercase tracking-[0.22em] text-black/40">
                      {typeLabel(type)}
                    </p>

                    <h2 className="mt-2 text-2xl font-black tracking-tight">
                      {title}
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-black/50">
                      <MapPin
                        size={15}
                      />

                      <span>
                        {location}
                      </span>
                    </div>
                  </div>

                  <span className="shrink-0 rounded-full bg-black px-3 py-1.5 text-[9px] font-bold uppercase tracking-wider text-white">
                    {status}
                  </span>
                </div>
              </div>
            </div>

            {/* DETAILS */}

            <div className="rounded-[24px] border border-black/10 p-6">
              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                BOOKING DETAILS
              </p>

              <h2 className="mt-2 text-xl font-black">
                Your reservation
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {isStay ? (
                  <>
                    <Info
                      icon={
                        <CalendarDays size={15} />
                      }
                      label="Check-in"
                      value={formatDate(
                        booking.checkIn
                      )}
                    />

                    <Info
                      icon={
                        <CalendarDays size={15} />
                      }
                      label="Check-out"
                      value={formatDate(
                        booking.checkOut
                      )}
                    />

                    <Info
                      icon={
                        <Users size={15} />
                      }
                      label="Guests"
                      value={`${guests} ${
                        guests === 1
                          ? "Guest"
                          : "Guests"
                      }`}
                    />

                    <Info
                      icon={
                        <CalendarDays size={15} />
                      }
                      label="Duration"
                      value={
                        nights > 0
                          ? `${nights} ${
                              nights === 1
                                ? "Night"
                                : "Nights"
                            }`
                          : "Stay"
                      }
                    />
                  </>
                ) : (
                  <>
                    <Info
                      icon={
                        <CalendarDays size={15} />
                      }
                      label="Date"
                      value={formatDate(
                        booking.date ||
                          booking.bookingDate ||
                          booking.startTime
                      )}
                    />

                    <Info
                      icon={
                        <Users size={15} />
                      }
                      label={
                        isDriver
                          ? "Passengers"
                          : "Guests"
                      }
                      value={`${guests} ${
                        guests === 1
                          ? "Guest"
                          : "Guests"
                      }`}
                    />

                    {(booking.time ||
                      booking.startTime) && (
                      <Info
                        icon={
                          <Clock3 size={15} />
                        }
                        label="Time"
                        value={
                          booking.time ||
                          formatTime(
                            booking.startTime
                          )
                        }
                      />
                    )}

                    <Info
                      icon={
                        <Check size={15} />
                      }
                      label="Type"
                      value={typeLabel(
                        type
                      )}
                    />
                  </>
                )}
              </div>

              {/* DRIVER ROUTE */}

              {isDriver &&
                (booking.pickup ||
                  booking.destination) && (
                  <div className="mt-4 grid gap-3">
                    <Info
                      icon={
                        <MapPin size={15} />
                      }
                      label="Pickup"
                      value={
                        booking.pickup ||
                        "Not specified"
                      }
                    />

                    <Info
                      icon={
                        <MapPin size={15} />
                      }
                      label="Destination"
                      value={
                        booking.destination ||
                        "Not specified"
                      }
                    />
                  </div>
                )}

              {/* GUIDE */}

              {type === "GUIDE" && (
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <Info
                    icon={
                      <Clock3 size={15} />
                    }
                    label="Start"
                    value={formatTime(
                      booking.startTime
                    )}
                  />

                  <Info
                    icon={
                      <Clock3 size={15} />
                    }
                    label="End"
                    value={formatTime(
                      booking.endTime
                    )}
                  />
                </div>
              )}
            </div>

            {/* PAYMENT */}

            <div className="rounded-[24px] border border-black/10 p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                  <CreditCard
                    size={16}
                  />
                </div>

                <div>
                  <p className="text-sm font-black">
                    Payment
                  </p>

                  <p className="mt-1 text-xs text-black/50">
                    {paymentStatus ===
                    "NOT_REQUIRED"
                      ? "No payment required for this MVP"
                      : paymentStatus}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-black/10 pt-5">
                <div className="flex justify-between text-sm">
                  <span className="text-black/50">
                    Subtotal
                  </span>

                  <span className="font-semibold">
                    {money(
                      subtotal
                    )}
                  </span>
                </div>

                {cleaningFee > 0 && (
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-black/50">
                      Cleaning fee
                    </span>

                    <span className="font-semibold">
                      {money(
                        cleaningFee
                      )}
                    </span>
                  </div>
                )}

                {serviceFee > 0 && (
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-black/50">
                      Service fee
                    </span>

                    <span className="font-semibold">
                      {money(
                        serviceFee
                      )}
                    </span>
                  </div>
                )}

                {taxAmount > 0 && (
                  <div className="mt-3 flex justify-between text-sm">
                    <span className="text-black/50">
                      Tax
                    </span>

                    <span className="font-semibold">
                      {money(
                        taxAmount
                      )}
                    </span>
                  </div>
                )}

                <div className="my-4 h-px bg-black/10" />

                <div className="flex items-center justify-between">
                  <span className="text-sm font-black">
                    Total
                  </span>

                  <span className="text-2xl font-black">
                    {money(total)}
                  </span>
                </div>
              </div>
            </div>

            {/* PROTECTION */}

            <div className="rounded-[24px] border border-black/10 p-6">
              <div className="flex gap-3">
                <ShieldCheck
                  size={20}
                  className="shrink-0"
                />

                <div>
                  <p className="text-sm font-black">
                    Vistara booking
                    protection
                  </p>

                  <p className="mt-1 text-xs leading-5 text-black/50">
                    Your booking details
                    are connected to your
                    Vistara account.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">
            <div className="rounded-[24px] border border-black/10 p-6">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                BOOKING SUMMARY
              </p>

              <div className="mt-5 space-y-4">
                <Summary
                  label="Booking ID"
                  value={String(
                    booking.bookingId ||
                      booking.id
                  )}
                />

                <Summary
                  label="Type"
                  value={typeLabel(
                    type
                  )}
                />

                <Summary
                  label="Status"
                  value={status}
                />

                <Summary
                  label="Payment"
                  value={
                    paymentStatus
                  }
                />
              </div>

              <div className="my-6 h-px bg-black/10" />

              <div className="flex items-end justify-between">
                <span className="text-sm text-black/50">
                  Total
                </span>

                <span className="text-2xl font-black">
                  {money(total)}
                </span>
              </div>

              {detailRoute && (
                <Link
                  href={
                    detailRoute
                  }
                  className="mt-6 flex w-full items-center justify-center rounded-xl bg-black px-4 py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800"
                >
                  View{" "}
                  {typeLabel(
                    type
                  ).toLowerCase()}
                </Link>
              )}

              <button
                type="button"
                onClick={() =>
                  router.push(
                    "/bookings"
                  )
                }
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-black/10 px-4 py-3 text-sm font-bold transition hover:border-black"
              >
                My bookings
              </button>
            </div>

            <div className="mt-3 rounded-[24px] border border-black/10 p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black/40">
                BOOKING REFERENCE
              </p>

              <p className="mt-2 text-base font-black">
                {booking.bookingId ||
                  booking.id}
              </p>

              <p className="mt-1 text-xs leading-5 text-black/45">
                Keep this ID for your
                Vistara reservation.
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-7">
          <Link
            href="/bookings"
            className="inline-flex items-center gap-2 text-xs font-semibold text-black/50 hover:text-black"
          >
            <ArrowLeft size={14} />
            Back to my bookings
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

// =========================================================
// INFO
// =========================================================

function Info({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-black/[0.035] p-4">
      <div className="flex items-center gap-2 text-black/45">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-[0.14em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-black">
        {value}
      </p>
    </div>
  );
}

// =========================================================
// SUMMARY
// =========================================================

function Summary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs text-black/50">
        {label}
      </span>

      <span className="max-w-[190px] truncate text-xs font-black">
        {value}
      </span>
    </div>
  );
}