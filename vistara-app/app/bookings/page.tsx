"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  CreditCard,
  MapPin,
  ReceiptText,
  XCircle,
} from "lucide-react";

import Navbar from "@/components/navbar";

type BookingStatus =
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Pending";

type BookingType = "Stay" | "Experience";

type Booking = {
  id: number;
  displayId: string;
  type: BookingType;
  title: string;
  location: string;
  description: string;
  dates: string;
  guests: string;
  amount: string;
  status: BookingStatus;
  image: string;
};

const bookings: Booking[] = [
  {
    id: 1,
    displayId: "VS-2026-1048",
    type: "Stay",
    title: "A heritage stay near Hawa Mahal",
    location: "Jaipur, Rajasthan",
    description:
      "Experience the charm of Jaipur with a comfortable stay close to the iconic Hawa Mahal and the city's historic streets.",
    dates: "18 Oct – 21 Oct 2026",
    guests: "2 Guests",
    amount: "₹18,500",
    status: "Confirmed",
    image: "/images/hawamahal.jpg",
  },
];

const filters = [
  "All bookings",
  "Stays",
  "Experiences",
  "Completed",
  "Cancelled",
] as const;

type Filter = (typeof filters)[number];

export default function BookingsPage() {
  const [activeFilter, setActiveFilter] =
    useState<Filter>("All bookings");

  const filteredBookings = useMemo(() => {
    switch (activeFilter) {
      case "Stays":
        return bookings.filter(
          (booking) => booking.type === "Stay"
        );

      case "Experiences":
        return bookings.filter(
          (booking) => booking.type === "Experience"
        );

      case "Completed":
        return bookings.filter(
          (booking) => booking.status === "Completed"
        );

      case "Cancelled":
        return bookings.filter(
          (booking) => booking.status === "Cancelled"
        );

      default:
        return bookings;
    }
  }, [activeFilter]);

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#E7DFD7] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-11 sm:px-7 lg:px-10 lg:py-14">

          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            ← Settings
          </Link>

          <div className="mt-10 flex flex-col justify-between gap-7 sm:flex-row sm:items-end">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B76545]">
                Your journey
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Bookings
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#756D67]">
                Manage your stays, experiences and reservations
                from one place.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-[#E1D9D1] bg-[#FAF8F3] px-4 py-2.5">
              <CalendarDays
                size={15}
                className="text-[#B8945A]"
              />

              <span className="text-sm font-semibold text-[#4A403A]">
                {bookings.length}{" "}
                {bookings.length === 1
                  ? "booking"
                  : "bookings"}
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-7 lg:px-10 lg:py-12">

        {/* FILTERS */}

        <div className="mb-8 flex flex-wrap gap-2.5">
          {filters.map((filter) => {
            const active = activeFilter === filter;

            return (
              <button
                key={filter}
                type="button"
                onClick={() => setActiveFilter(filter)}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-[#3A302A] text-white shadow-sm"
                    : "border border-[#DED5CD] bg-white text-[#756D67] hover:border-[#B76545] hover:text-[#B76545]"
                }`}
              >
                {filter}
              </button>
            );
          })}
        </div>

        {/* ===================================================
            BOOKING LIST
        =================================================== */}

        {filteredBookings.length > 0 ? (
          <div className="space-y-5">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        ) : (
          <EmptyBookings />
        )}

        {/* ===================================================
            LOWER CARDS
        =================================================== */}

        <div className="mt-10 grid gap-5 md:grid-cols-2">

          {/* PAYMENT */}

          <Link
            href="/payments"
            className="group rounded-[26px] border border-[#E5DED6] bg-white p-7 transition hover:-translate-y-0.5 hover:border-[#D2C1B5] hover:shadow-[0_15px_45px_rgba(44,36,32,0.06)]"
          >
            <div className="flex items-start justify-between gap-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EFEA] text-[#B8945A]">
                <CreditCard size={19} />
              </div>

              <ArrowRight
                size={17}
                className="text-[#A59C95] transition group-hover:translate-x-1 group-hover:text-[#B76545]"
              />

            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
              Payments
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Payment history
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D67]">
              Review payments and transaction details for your
              Vistara bookings.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B76545]">
              View payment history
              <ArrowRight size={14} />
            </div>
          </Link>

          {/* SUPPORT */}

          <Link
            href="/support"
            className="group rounded-[26px] border border-[#E1D4CA] bg-[#F3EFEA] p-7 transition hover:-translate-y-0.5 hover:border-[#CDB9A9] hover:shadow-[0_15px_45px_rgba(44,36,32,0.06)]"
          >
            <div className="flex items-start justify-between gap-5">

              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#B76545] shadow-sm">
                <ReceiptText size={19} />
              </div>

              <ArrowRight
                size={17}
                className="text-[#A59C95] transition group-hover:translate-x-1 group-hover:text-[#B76545]"
              />

            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76545]">
              Need help?
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Something about a booking?
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D67]">
              Get help with your reservation, payment or booking
              details.
            </p>

            <div className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#B76545]">
              Get support
              <ArrowRight size={14} />
            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}

/* ============================================================
   BOOKING CARD
============================================================ */

function BookingCard({
  booking,
}: {
  booking: Booking;
}) {
  const statusStyles: Record<BookingStatus, string> = {
    Confirmed:
      "bg-[#68705A]/10 text-[#68705A]",

    Completed:
      "bg-[#B8945A]/10 text-[#8D6E38]",

    Cancelled:
      "bg-[#B76545]/10 text-[#A04E32]",

    Pending:
      "bg-[#F1ECE6] text-[#756D67]",
  };

  const StatusIcon =
    booking.status === "Confirmed" ||
    booking.status === "Completed"
      ? CheckCircle2
      : booking.status === "Cancelled"
        ? XCircle
        : Clock3;

  return (
    <article className="group overflow-hidden rounded-[28px] border border-[#E5DED6] bg-white transition duration-300 hover:border-[#D2C1B5] hover:shadow-[0_18px_55px_rgba(44,36,32,0.07)]">

      <div className="flex flex-col lg:flex-row">

        {/* IMAGE */}

        <Link
          href={`/bookings/${booking.id}`}
          className="relative h-64 shrink-0 overflow-hidden lg:h-auto lg:w-[320px]"
        >
          <img
            src={booking.image}
            alt="Hawa Mahal, Jaipur"
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
          />

          <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3.5 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#4A403A] shadow-sm backdrop-blur">
            {booking.type}
          </div>
        </Link>

        {/* DETAILS */}

        <div className="flex min-w-0 flex-1 flex-col p-6 sm:p-7">

          <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

            <div className="min-w-0">

              <div className="flex flex-wrap items-center gap-2">

                <span
                  className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${statusStyles[booking.status]}`}
                >
                  <StatusIcon size={11} />
                  {booking.status}
                </span>

              </div>

              <Link href={`/bookings/${booking.id}`}>
                <h2 className="mt-3 font-serif text-2xl font-semibold tracking-[-0.02em] text-[#2C2420] transition hover:text-[#B76545]">
                  {booking.title}
                </h2>
              </Link>

              <div className="mt-2 flex items-center gap-1.5 text-sm text-[#756D67]">
                <MapPin
                  size={14}
                  className="shrink-0"
                />

                <span>{booking.location}</span>
              </div>

              {/* HAWA MAHAL DESCRIPTION */}

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756D67]">
                {booking.description}
              </p>

            </div>
          </div>

          {/* META */}

          <div className="mt-7 grid gap-5 border-y border-[#EAE4DE] py-5 sm:grid-cols-3">

            <InfoItem
              label="Dates"
              value={booking.dates}
              icon={<CalendarDays size={15} />}
            />

            <InfoItem
              label="Guests"
              value={booking.guests}
              icon={<Clock3 size={15} />}
            />

            <InfoItem
              label="Total"
              value={booking.amount}
              icon={<CreditCard size={15} />}
            />

          </div>

          {/* FOOTER */}

          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A59C95]">
                Booking ID
              </p>

              <p className="mt-1 text-xs font-medium text-[#756D67]">
                {booking.displayId}
              </p>
            </div>

            <div className="flex flex-col gap-2.5 sm:flex-row">

              <Link
                href={`/bookings/${booking.id}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D9D0C8] px-5 py-2.5 text-sm font-semibold text-[#4A403A] transition hover:border-[#B76545] hover:text-[#B76545]"
              >
                View details
              </Link>

              {booking.status === "Confirmed" && (
                <Link
                  href={`/bookings/${booking.id}`}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B76545] px-5 py-2.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#965039]"
                >
                  Manage booking
                  <ArrowRight size={14} />
                </Link>
              )}

            </div>
          </div>

        </div>
      </div>
    </article>
  );
}

/* ============================================================
   INFO ITEM
============================================================ */

function InfoItem({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div>
      <div className="flex items-center gap-2 text-[#A59C95]">
        {icon}

        <span className="text-[10px] font-bold uppercase tracking-[0.15em]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold text-[#3A302A]">
        {value}
      </p>
    </div>
  );
}

/* ============================================================
   EMPTY STATE
============================================================ */

function EmptyBookings() {
  return (
    <div className="rounded-[28px] border border-[#E5DED6] bg-white px-6 py-16 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F3EFEA] text-[#B76545]">
        <CalendarDays size={27} />
      </div>

      <h2 className="mt-6 font-serif text-2xl font-semibold">
        No bookings here
      </h2>

      <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#756D67]">
        There are no bookings matching this filter yet.
        Explore Vistara and start planning your next journey.
      </p>

      <Link
        href="/stays"
        className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
      >
        Explore stays
        <ArrowRight size={15} />
      </Link>

    </div>
  );
}