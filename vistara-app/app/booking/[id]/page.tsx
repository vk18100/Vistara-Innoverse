"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";

const booking = {
  id: "VS-2026-1048",
  status: "Confirmed",
  title: "A peaceful stay by the Ganges",
  location: "Varanasi, Uttar Pradesh",
  image:
    "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1400&q=80",

  checkIn: "18 Oct 2026",
  checkOut: "21 Oct 2026",
  guests: "2 Guests",
  nights: "3 nights",

  host: "Vistara Verified Host",
  hostLocation: "Varanasi, India",

  room: "Private room",
  bookingDate: "24 Sep 2026",

  stayPrice: "₹15,600",
  serviceFee: "₹1,900",
  taxes: "₹1,000",
  total: "₹18,500",

  paymentMethod: "UPI",
  paymentStatus: "Paid",
};

export default function BookingDetailsPage() {
  const params = useParams();

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/bookings"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to bookings
          </Link>

          <div className="mt-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                BOOKING DETAILS
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                {booking.title}
              </h1>

              <p className="mt-2 text-sm text-[#64748B]">
                {booking.location}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <span className="rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-bold text-emerald-700">
                {booking.status}
              </span>

              <span className="text-xs text-[#94A3B8]">
                #{params.id || booking.id}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr]">

          {/* LEFT */}
          <div className="space-y-7">

            {/* PROPERTY */}
            <div className="overflow-hidden rounded-[30px] border border-[#03045E]/10 bg-white shadow-[0_15px_50px_rgba(3,4,94,0.06)]">
              <div className="relative h-[340px] overflow-hidden md:h-[420px]">
                <img
                  src={booking.image}
                  alt={booking.title}
                  className="h-full w-full object-cover"
                />

                <div className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-[#03045E]/70 to-transparent" />

                <div className="absolute bottom-6 left-6">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                    YOUR STAY
                  </p>

                  <p className="mt-2 text-xl font-semibold text-white">
                    {booking.title}
                  </p>

                  <p className="mt-1 text-sm text-white/75">
                    {booking.location}
                  </p>
                </div>
              </div>

              <div className="grid divide-y divide-[#E5E7EB] sm:grid-cols-3 sm:divide-x sm:divide-y-0">
                <Info
                  label="CHECK-IN"
                  value={booking.checkIn}
                />

                <Info
                  label="CHECK-OUT"
                  value={booking.checkOut}
                />

                <Info
                  label="GUESTS"
                  value={booking.guests}
                />
              </div>
            </div>

            {/* TRIP INFORMATION */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)] md:p-9">
              <SectionTitle
                eyebrow="YOUR STAY"
                title="Trip information"
              />

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <Detail
                  label="Accommodation"
                  value={booking.room}
                />

                <Detail
                  label="Duration"
                  value={booking.nights}
                />

                <Detail
                  label="Location"
                  value={booking.location}
                />

                <Detail
                  label="Booking date"
                  value={booking.bookingDate}
                />
              </div>
            </div>

            {/* HOST */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)] md:p-9">
              <SectionTitle
                eyebrow="YOUR HOST"
                title="Host information"
              />

              <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#03045E] font-serif text-xl font-semibold text-white">
                    V
                  </div>

                  <div>
                    <p className="font-semibold text-[#03045E]">
                      {booking.host}
                    </p>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {booking.hostLocation}
                    </p>
                  </div>
                </div>

                <button className="w-fit rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
                  Contact host
                </button>
              </div>
            </div>

            {/* STATUS TIMELINE */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.05)] md:p-9">
              <SectionTitle
                eyebrow="BOOKING JOURNEY"
                title="Booking status"
              />

              <div className="mt-8 space-y-7">
                <TimelineItem
                  title="Booking confirmed"
                  description="Your reservation has been confirmed."
                  date="24 Sep 2026"
                  active
                />

                <TimelineItem
                  title="Payment received"
                  description="Your payment has been successfully processed."
                  date="24 Sep 2026"
                  active
                />

                <TimelineItem
                  title="Check-in"
                  description="Your stay begins."
                  date="18 Oct 2026"
                  active={false}
                />

                <TimelineItem
                  title="Check-out"
                  description="Your stay ends."
                  date="21 Oct 2026"
                  active={false}
                />
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* PAYMENT SUMMARY */}
            <div className="sticky top-6 rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_18px_55px_rgba(3,4,94,0.08)]">
              <SectionTitle
                eyebrow="PAYMENT"
                title="Price details"
              />

              <div className="mt-7 space-y-4 text-sm">
                <PriceRow
                  label="Stay"
                  value={booking.stayPrice}
                />

                <PriceRow
                  label="Service fee"
                  value={booking.serviceFee}
                />

                <PriceRow
                  label="Taxes"
                  value={booking.taxes}
                />
              </div>

              <div className="my-6 h-px bg-[#03045E]/10" />

              <div className="flex items-center justify-between">
                <span className="font-semibold">
                  Total paid
                </span>

                <span className="text-xl font-semibold">
                  {booking.total}
                </span>
              </div>

              <div className="mt-5 rounded-2xl bg-[#F7F3EA] p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-[#C6A15B]">
                  PAYMENT METHOD
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    {booking.paymentMethod}
                  </span>

                  <span className="text-xs font-bold text-emerald-700">
                    {booking.paymentStatus}
                  </span>
                </div>
              </div>

              <button className="mt-5 w-full rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
                Download receipt
              </button>
            </div>

            {/* BOOKING ACTIONS */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-[#FAFAF8] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                MANAGE
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Booking actions
              </h2>

              <div className="mt-6 space-y-3">
                <button className="w-full rounded-xl bg-[#03045E] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                  Modify booking
                </button>

                <button className="w-full rounded-xl border border-[#DDE2E8] bg-white px-5 py-3.5 text-sm font-semibold text-[#64748B] transition hover:border-[#03045E] hover:text-[#03045E]">
                  Contact host
                </button>

                <button className="w-full rounded-xl border border-red-200 bg-white px-5 py-3.5 text-sm font-semibold text-red-500 transition hover:bg-red-50">
                  Cancel booking
                </button>
              </div>
            </div>

            {/* SUPPORT */}
            <div className="rounded-[30px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] to-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                NEED HELP?
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                We're here for your trip.
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Get help with your booking, payment or stay.
              </p>

              <Link
                href="/support"
                className="mt-5 inline-flex text-sm font-semibold text-[#0D21A1] hover:underline"
              >
                Visit support →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SectionTitle({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-serif text-2xl font-semibold text-[#03045E]">
        {title}
      </h2>
    </div>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="p-5">
      <p className="text-xs font-bold tracking-wider text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#03045E]">
        {value}
      </p>
    </div>
  );
}

function Detail({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl bg-[#FAFAF8] p-5">
      <p className="text-xs text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-2 text-sm font-semibold text-[#03045E]">
        {value}
      </p>
    </div>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[#64748B]">{label}</span>

      <span className="font-medium text-[#03045E]">
        {value}
      </span>
    </div>
  );
}

function TimelineItem({
  title,
  description,
  date,
  active,
}: {
  title: string;
  description: string;
  date: string;
  active: boolean;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex flex-col items-center">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
            active
              ? "bg-[#03045E] text-white"
              : "border border-[#CBD5E1] bg-white text-[#94A3B8]"
          }`}
        >
          {active ? "✓" : "•"}
        </div>

        <div className="mt-2 h-full w-px bg-[#E5E7EB]" />
      </div>

      <div className="pb-6">
        <div className="flex flex-wrap items-center gap-3">
          <h3 className="text-sm font-semibold text-[#03045E]">
            {title}
          </h3>

          <span className="text-xs text-[#94A3B8]">
            {date}
          </span>
        </div>

        <p className="mt-1 text-xs leading-5 text-[#64748B]">
          {description}
        </p>
      </div>
    </div>
  );
}