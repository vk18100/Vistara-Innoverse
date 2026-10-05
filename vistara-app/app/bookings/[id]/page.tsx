"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CreditCard,
  MapPin,
  ShieldCheck,
  UserRound,
  Users,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type Booking = {
  id: number;

  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;

  totalAmount: number;

  status: string;
  paymentStatus: string;

  property?: {
    id: number;

    name?: string;
    title?: string;

    city?: string;
    location?: string;

    pricePerNight?: number;

    images?: {
      url?: string;
      imageUrl?: string;
      src?: string;
      isPrimary?: boolean;
    }[];

    host?: {
      name?: string;
      image?: string;
      avatar?: string;
    };
  };
};

export default function BookingConfirmationPage() {
  const params = useParams();

  const bookingId = String(params?.id ?? "");

  const [booking, setBooking] =
    useState<Booking | null>(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");


  /* =====================================================
     FETCH BOOKING
  ===================================================== */

  useEffect(() => {
    if (!bookingId) return;

    async function loadBooking() {
      try {
        setLoading(true);

        const response = await fetch(
          `/api/bookings/${bookingId}`,
          {
            credentials: "include",
            cache: "no-store",
          }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message ||
              "Failed to load booking"
          );
        }

        setBooking(result.booking);
      } catch (error) {
        console.error(
          "BOOKING_CONFIRMATION_ERROR:",
          error
        );

        setError(
          error instanceof Error
            ? error.message
            : "Failed to load booking."
        );
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [bookingId]);


  /* =====================================================
     LOADING
  ===================================================== */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">

        <Navbar />

        <section className="mx-auto max-w-5xl px-5 py-12">

          <div className="animate-pulse">

            <div className="mx-auto h-14 w-14 rounded-full bg-slate-100" />

            <div className="mx-auto mt-6 h-7 w-64 rounded bg-slate-100" />

            <div className="mx-auto mt-3 h-3 w-80 rounded bg-slate-100" />

            <div className="mt-10 h-80 rounded-2xl bg-slate-100" />

          </div>

        </section>

        <Footer />

      </main>
    );
  }


  /* =====================================================
     ERROR / NOT FOUND
  ===================================================== */

  if (!booking) {
    return (
      <main className="min-h-screen bg-white text-black">

        <Navbar />

        <section className="flex min-h-[65vh] items-center justify-center px-5">

          <div className="text-center">

            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-slate-400">
              BOOKING
            </p>

            <h1 className="mt-2 font-serif text-2xl font-semibold">
              Booking not found
            </h1>

            <p className="mt-2 text-xs text-slate-500">
              {error ||
                "This booking could not be found."}
            </p>

            <Link
              href="/profile"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-slate-800"
            >
              <ArrowLeft size={13} />
              Back to profile
            </Link>

          </div>

        </section>

        <Footer />

      </main>
    );
  }


  /* =====================================================
     DATA
  ===================================================== */

  const property =
    booking.property;

  const propertyName =
    property?.name ||
    property?.title ||
    "Vistara Stay";

  const location =
    property?.city ||
    property?.location ||
    "India";

  const image =
    property?.images?.find(
      (item) => item.isPrimary
    )?.url ||
    property?.images?.[0]?.url ||
    property?.images?.[0]?.imageUrl ||
    property?.images?.[0]?.src ||
    "/images/profile.jpg";

  const hostName =
    property?.host?.name ||
    "Vistara Host";

  const hostImage =
    property?.host?.image ||
    property?.host?.avatar ||
    "/images/profile.jpg";

  const total =
    Number(booking.totalAmount) || 0;

  const pricePerNight =
    Number(property?.pricePerNight) || 0;

  const checkIn =
    new Date(
      booking.checkIn
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );

  const checkOut =
    new Date(
      booking.checkOut
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );


  const confirmed =
    booking.status === "CONFIRMED" ||
    booking.paymentStatus === "PAID";


  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />


      {/* =================================================
          CONFIRMATION HEADER
      ================================================= */}

      <section className="border-b border-slate-200">

        <div className="mx-auto max-w-5xl px-5 py-10 text-center sm:px-6">

          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">

            <Check
              size={23}
              strokeWidth={2.5}
            />

          </div>

          <p className="mt-5 text-[9px] font-semibold uppercase tracking-[0.22em] text-slate-400">
            {confirmed
              ? "BOOKING CONFIRMED"
              : "BOOKING CREATED"}
          </p>

          <h1 className="mt-2 font-serif text-2xl font-semibold tracking-tight sm:text-3xl">
            Your journey is confirmed
          </h1>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-slate-500">
            Your Vistara booking has been
            successfully created.
          </p>

          {/* BOOKING ID */}

          <div className="mt-5 inline-flex items-center gap-3 rounded-full border border-slate-200 px-4 py-2">

            <span className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
              Booking ID
            </span>

            <span className="text-xs font-semibold">
              #{booking.id}
            </span>

          </div>

        </div>

      </section>


      {/* =================================================
          MAIN
      ================================================= */}

      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 lg:px-8">

        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.7fr]">


          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-5">


            {/* PROPERTY */}

            <div className="overflow-hidden rounded-2xl border border-slate-200">

              <div className="group aspect-[16/8] overflow-hidden bg-slate-100">

                <img
                  src={image}
                  alt={propertyName}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.03]"
                />

              </div>


              <div className="p-5 sm:p-6">

                <div className="flex items-start justify-between gap-4">

                  <div>

                    <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                      YOUR JOURNEY
                    </p>

                    <h2 className="mt-1.5 font-serif text-xl font-semibold">
                      {propertyName}
                    </h2>

                    <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">

                      <MapPin size={13} />

                      {location}

                    </div>

                  </div>


                  <span className="rounded-full bg-black px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-white">
                    Confirmed
                  </span>

                </div>

              </div>

            </div>


            {/* DATES */}

            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                TRIP DETAILS
              </p>

              <h2 className="mt-1.5 font-serif text-xl font-semibold">
                Your reservation
              </h2>


              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <Info
                  icon={<CalendarDays size={15} />}
                  label="Check-in"
                  value={checkIn}
                />

                <Info
                  icon={<CalendarDays size={15} />}
                  label="Check-out"
                  value={checkOut}
                />

                <Info
                  icon={<Users size={15} />}
                  label="Guests"
                  value={`${booking.guests} ${
                    booking.guests === 1
                      ? "Guest"
                      : "Guests"
                  }`}
                />

                <Info
                  icon={<CalendarDays size={15} />}
                  label="Duration"
                  value={`${booking.nights} ${
                    booking.nights === 1
                      ? "Night"
                      : "Nights"
                  }`}
                />

              </div>

            </div>


            {/* HOST */}

            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                YOUR HOST
              </p>


              <div className="mt-4 flex items-center gap-3">

                <img
                  src={hostImage}
                  alt={hostName}
                  className="h-11 w-11 rounded-full object-cover"
                />

                <div>

                  <p className="text-xs font-semibold">
                    {hostName}
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    Your Vistara host
                  </p>

                </div>

              </div>

            </div>


            {/* PAYMENT */}

            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white">

                  <CreditCard size={15} />

                </div>

                <div>

                  <p className="text-xs font-semibold">
                    Payment
                  </p>

                  <p className="mt-0.5 text-[10px] text-slate-500">
                    {booking.paymentStatus}
                  </p>

                </div>

              </div>

            </div>


            {/* PROTECTION */}

            <div className="rounded-2xl border border-slate-200 p-5">

              <div className="flex gap-3">

                <ShieldCheck
                  size={18}
                  className="shrink-0"
                />

                <div>

                  <p className="text-xs font-semibold">
                    Vistara protection
                  </p>

                  <p className="mt-1 text-[10px] leading-5 text-slate-500">
                    Your booking details are securely
                    connected to your Vistara account.
                  </p>

                </div>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <div className="rounded-2xl border border-slate-200 p-5 sm:p-6">

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                BOOKING SUMMARY
              </p>


              <div className="mt-5 space-y-3">

                <Summary
                  label="Booking ID"
                  value={`#${booking.id}`}
                />

                <Summary
                  label="Status"
                  value={booking.status}
                />

                <Summary
                  label="Payment"
                  value={booking.paymentStatus}
                />

              </div>


              <div className="mt-5 border-t border-slate-200 pt-4">

                <div className="flex items-end justify-between">

                  <span className="text-xs text-slate-500">
                    Total
                  </span>

                  <span className="text-xl font-semibold">
                    ₹{total.toLocaleString("en-IN")}
                  </span>

                </div>

              </div>


              {/* VIEW TRIP */}

              <Link
                href={`/trips/${booking.property?.id ?? ""}`}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-xs font-semibold text-white transition hover:bg-slate-800"
              >
                View trip

                <ArrowRight size={13} />

              </Link>


              <Link
                href="/profile"
                className="mt-2 flex w-full items-center justify-center rounded-lg border border-slate-200 px-4 py-3 text-xs font-semibold transition hover:border-black"
              >
                Go to profile
              </Link>

            </div>


            {/* BOOKING REFERENCE */}

            <div className="mt-4 rounded-xl border border-slate-200 p-4">

              <div className="flex items-center gap-3">

                <UserRound size={15} />

                <div>

                  <p className="text-[9px] uppercase tracking-[0.15em] text-slate-400">
                    BOOKING REFERENCE
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    #{booking.id}
                  </p>

                </div>

              </div>

            </div>

          </aside>

        </div>


        {/* BACK */}

        <div className="mt-8">

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-[11px] text-slate-500 transition hover:text-black"
          >
            <ArrowLeft size={13} />
            Back to explore
          </Link>

        </div>

      </section>


      <Footer />

    </main>
  );
}


/* ============================================================
   INFO
============================================================ */

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
    <div className="rounded-lg bg-slate-50 p-3">

      <div className="flex items-center gap-2 text-slate-400">

        {icon}

        <span className="text-[9px] font-semibold uppercase tracking-[0.14em]">
          {label}
        </span>

      </div>

      <p className="mt-2 text-xs font-semibold">
        {value}
      </p>

    </div>
  );
}


/* ============================================================
   SUMMARY
============================================================ */

function Summary({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4">

      <span className="text-[10px] text-slate-500">
        {label}
      </span>

      <span className="text-[10px] font-semibold">
        {value}
      </span>

    </div>
  );
}