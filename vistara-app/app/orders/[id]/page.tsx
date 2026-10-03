"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Users,
  ShieldCheck,
  CreditCard,
  ChevronRight,
  Minus,
  Plus,
} from "lucide-react";

export default function OrderPage() {
  const [guests, setGuests] = useState(2);

  const pricePerNight = 5000;
  const nights = 3;

  const stayTotal = pricePerNight * nights;
  const serviceFee = 1200;
  const taxes = 900;
  const total = stayTotal + serviceFee + taxes;

  return (
    <main className="min-h-screen bg-[#FAF8F4] text-[#241F1C]">
      {/* NAVBAR */}
      <header className="border-b border-[#E7E0D8] bg-white">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-10">
          <Link
            href="/"
            className="font-serif text-3xl font-semibold tracking-tight text-[#211C19]"
          >
            Vistara
          </Link>

          <div className="text-sm font-medium text-[#6B625B]">
            Secure booking
          </div>
        </div>
      </header>

      {/* HEADER */}
      <section className="border-b border-[#E7E0D8] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/stays"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#6B625B] transition hover:text-[#241F1C]"
          >
            <ArrowLeft size={17} />
            Back to stays
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B98242]">
              VISTARA BOOKING
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#241F1C] md:text-5xl">
              Complete your stay
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#746B63]">
              Review your reservation details before confirming your
              booking.
            </p>
          </div>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* PROPERTY CARD */}
            <div className="overflow-hidden rounded-[28px] border border-[#E4DDD5] bg-white">
              <div className="relative h-[320px] overflow-hidden">
                <img
                  src="/images/hawamahal.jpg"
                  alt="Hawa Mahal stay"
                  className="h-full w-full object-cover"
                />

                <div className="absolute bottom-5 left-5 rounded-full bg-white/95 px-4 py-2 text-xs font-bold tracking-wide text-[#241F1C]">
                  VISTARA STAY
                </div>
              </div>

              <div className="p-7">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-serif text-3xl font-semibold text-[#241F1C]">
                      Peaceful Heritage Stay
                    </h2>

                    <div className="mt-2 flex items-center gap-2 text-sm text-[#746B63]">
                      <MapPin size={16} />
                      Jaipur, Rajasthan, India
                    </div>
                  </div>

                  <div className="rounded-full bg-[#F4EFE8] px-4 py-2 text-sm font-semibold text-[#8A5A2B]">
                    ★ 4.8
                  </div>
                </div>
              </div>
            </div>

            {/* DATES */}
            <div className="rounded-[28px] border border-[#E4DDD5] bg-white p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4EFE8]">
                  <CalendarDays
                    size={20}
                    className="text-[#9A6335]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A97948]">
                    Your dates
                  </p>

                  <h2 className="mt-1 text-lg font-semibold text-[#241F1C]">
                    18 Oct – 21 Oct 2026
                  </h2>
                </div>
              </div>

              <div className="mt-6 grid gap-4 border-t border-[#ECE6DF] pt-6 sm:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9B9189]">
                    Check-in
                  </p>

                  <p className="mt-1 font-semibold text-[#241F1C]">
                    18 October 2026
                  </p>

                  <p className="mt-1 text-sm text-[#746B63]">
                    After 2:00 PM
                  </p>
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#9B9189]">
                    Check-out
                  </p>

                  <p className="mt-1 font-semibold text-[#241F1C]">
                    21 October 2026
                  </p>

                  <p className="mt-1 text-sm text-[#746B63]">
                    Before 11:00 AM
                  </p>
                </div>
              </div>
            </div>

            {/* GUESTS */}
            <div className="rounded-[28px] border border-[#E4DDD5] bg-white p-7">
              <div className="flex items-center justify-between gap-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4EFE8]">
                    <Users
                      size={20}
                      className="text-[#9A6335]"
                    />
                  </div>

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A97948]">
                      Guests
                    </p>

                    <h2 className="mt-1 text-lg font-semibold text-[#241F1C]">
                      Who is coming?
                    </h2>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-full border border-[#DED6CE] px-2 py-2">
                  <button
                    type="button"
                    onClick={() =>
                      setGuests((value) => Math.max(1, value - 1))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#F4EFE8]"
                  >
                    <Minus size={15} />
                  </button>

                  <span className="min-w-7 text-center text-sm font-semibold">
                    {guests}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setGuests((value) => Math.min(10, value + 1))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-[#F4EFE8]"
                  >
                    <Plus size={15} />
                  </button>
                </div>
              </div>

              <p className="mt-5 text-sm text-[#746B63]">
                {guests} {guests === 1 ? "guest" : "guests"} will be
                staying at this property.
              </p>
            </div>

            {/* GUEST INFORMATION */}
            <div className="rounded-[28px] border border-[#E4DDD5] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A97948]">
                Guest information
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Your details
              </h2>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="text-sm font-medium text-[#4D4540]">
                    First name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="mt-2 w-full rounded-xl border border-[#DED6CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5A2B]"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-[#4D4540]">
                    Last name
                  </label>

                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="mt-2 w-full rounded-xl border border-[#DED6CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5A2B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[#4D4540]">
                    Email
                  </label>

                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="mt-2 w-full rounded-xl border border-[#DED6CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5A2B]"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="text-sm font-medium text-[#4D4540]">
                    Phone number
                  </label>

                  <input
                    type="tel"
                    placeholder="+91"
                    className="mt-2 w-full rounded-xl border border-[#DED6CE] bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8A5A2B]"
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT */}
            <div className="rounded-[28px] border border-[#E4DDD5] bg-white p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F4EFE8]">
                  <CreditCard
                    size={20}
                    className="text-[#9A6335]"
                  />
                </div>

                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A97948]">
                    Payment
                  </p>

                  <h2 className="mt-1 text-lg font-semibold">
                    Payment method
                  </h2>
                </div>
              </div>

              <button
                type="button"
                className="mt-6 flex w-full items-center justify-between rounded-2xl border border-[#DED6CE] p-5 text-left transition hover:border-[#9A6335]"
              >
                <div>
                  <p className="text-sm font-semibold">
                    Pay securely online
                  </p>

                  <p className="mt-1 text-xs text-[#746B63]">
                    UPI, cards and other payment methods
                  </p>
                </div>

                <ChevronRight size={18} />
              </button>
            </div>

            {/* TRUST */}
            <div className="rounded-[28px] border border-[#E4DDD5] bg-[#F7F2EB] p-6">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white">
                  <ShieldCheck
                    size={21}
                    className="text-[#8A5A2B]"
                  />
                </div>

                <div>
                  <h3 className="font-semibold text-[#241F1C]">
                    Your booking is protected
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#746B63]">
                    Your booking information and payment details are
                    handled securely through Vistara.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — ORDER SUMMARY */}
          <aside className="lg:sticky lg:top-6 lg:h-fit">
            <div className="overflow-hidden rounded-[28px] border border-[#DED6CE] bg-white shadow-[0_15px_50px_rgba(50,35,20,0.06)]">
              <div className="border-b border-[#ECE6DF] p-7">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A97948]">
                  Reservation summary
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Your stay
                </h2>
              </div>

              <div className="p-7">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-semibold">
                      Peaceful Heritage Stay
                    </p>

                    <p className="mt-1 text-sm text-[#746B63]">
                      Jaipur, Rajasthan
                    </p>
                  </div>

                  <p className="text-sm font-semibold">
                    ★ 4.8
                  </p>
                </div>

                <div className="mt-6 space-y-4 border-y border-[#ECE6DF] py-6">
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#746B63]">
                      ₹{pricePerNight.toLocaleString("en-IN")} ×{" "}
                      {nights} nights
                    </span>

                    <span className="font-medium">
                      ₹{stayTotal.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#746B63]">
                      Vistara service fee
                    </span>

                    <span className="font-medium">
                      ₹{serviceFee.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-[#746B63]">
                      Taxes
                    </span>

                    <span className="font-medium">
                      ₹{taxes.toLocaleString("en-IN")}
                    </span>
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#9B9189]">
                      Total
                    </p>

                    <p className="mt-1 font-serif text-3xl font-semibold">
                      ₹{total.toLocaleString("en-IN")}
                    </p>
                  </div>

                  <span className="text-xs text-[#746B63]">
                    INR
                  </span>
                </div>

                {/* CONFIRM */}
                <button
                  type="button"
                  className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#241F1C] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#3A312B]"
                >
                  Confirm & pay
                  <ChevronRight size={18} />
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-[#8B8179]">
                  By confirming, you agree to Vistara's booking
                  terms and cancellation policy.
                </p>
              </div>
            </div>

            {/* HELP */}
            <div className="mt-5 rounded-[28px] border border-[#E4DDD5] bg-white p-6">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#A97948]">
                NEED HELP?
              </p>

              <h3 className="mt-2 font-serif text-xl font-semibold">
                Have a question?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#746B63]">
                Our support team can help with your reservation,
                payment or stay.
              </p>

              <Link
                href="/support"
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#8A5A2B] hover:underline"
              >
                Contact support
                <ChevronRight size={16} />
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}