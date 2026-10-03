"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  CheckCircle2,
  Clock3,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

export default function GuideBookingPage() {
  const params = useParams();
  const id = String(params.id);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [booked, setBooked] = useState(false);

  const guideName =
    id === "rajiv"
      ? "Rajiv Kumar"
      : id === "amit"
      ? "Amit Singh"
      : id === "neha"
      ? "Neha Sharma"
      : id === "vikas"
      ? "Vikas Kumar"
      : "Rajiv Kumar";

  const price = 699;
  const serviceFee = 99;
  const subtotal = price * guests;
  const total = subtotal + serviceFee;

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">

      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-[#E5DED6] bg-[#FAF8F3]/95 backdrop-blur">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-10">

          <Link
            href={`/guides/${id}`}
            className="flex items-center gap-2 text-sm font-semibold text-[#2C2420] transition hover:text-[#B76545]"
          >
            <ArrowLeft size={18} />
            Back to guide
          </Link>

          <Link
            href="/"
            className="font-serif text-2xl font-bold tracking-[0.16em] text-[#2C2420]"
          >
            VISTARA
          </Link>

          <div className="flex items-center gap-2 text-xs font-semibold text-[#68705A]">
            <ShieldCheck size={16} />
            Secure
          </div>
        </div>
      </header>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-5 py-10 lg:px-10 lg:py-14">

        {/* TITLE */}
        <div className="mb-10 max-w-3xl">

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B76545]">
            BOOK YOUR EXPERIENCE
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold leading-tight text-[#2C2420] sm:text-5xl">
            Plan your time with{" "}
            <span className="text-[#B76545]">
              {guideName.split(" ")[0]}.
            </span>
          </h1>

          <p className="mt-4 text-base leading-7 text-[#756D67]">
            Choose when you want to explore, how many people are joining,
            and we'll take care of the rest.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_420px]">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* HOST CARD */}
            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_10px_35px_rgba(44,36,32,0.04)] sm:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B76545]">
                YOUR HOST
              </p>

              <div className="mt-5 flex items-center gap-4">

                {/* RAJIV PROFILE IMAGE */}
                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-full border-4 border-[#E8DED0] bg-[#E8DED0]">
                  <img
                    src="/images/profile.jpg"
                    alt={`${guideName} profile`}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">

                    <h2 className="font-serif text-2xl font-semibold text-[#2C2420]">
                      {guideName}
                    </h2>

                    <CheckCircle2
                      size={17}
                      className="text-[#68705A]"
                    />
                  </div>

                  <p className="mt-1 text-sm text-[#756D67]">
                    Local host · Patna, Bihar
                  </p>
                </div>
              </div>
            </div>

            {/* DATE & TIME */}
            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_10px_35px_rgba(44,36,32,0.04)] sm:p-8">

              <h2 className="font-serif text-2xl font-semibold text-[#2C2420]">
                When are you going?
              </h2>

              <p className="mt-2 text-sm text-[#756D67]">
                Select a date and preferred starting time.
              </p>

              {/* DATE */}
              <div className="mt-7">
                <label className="mb-2 block text-sm font-bold text-[#2C2420]">
                  Date
                </label>

                <div className="relative">

                  <CalendarDays
                    size={18}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#B76545]"
                  />

                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-14 w-full rounded-2xl border border-[#D8CEC4] bg-[#FAF8F3] pl-12 pr-4 text-sm text-[#2C2420] outline-none transition focus:border-[#B76545] focus:ring-4 focus:ring-[#B76545]/10"
                  />

                </div>
              </div>

              {/* TIME */}
              <div className="mt-7">

                <label className="mb-3 block text-sm font-bold text-[#2C2420]">
                  Start time
                </label>

                <div className="grid grid-cols-3 gap-3">

                  {["09:00", "10:00", "14:00"].map((item) => {
                    const active = time === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTime(item)}
                        className={`rounded-2xl border px-3 py-3.5 text-sm font-semibold transition ${
                          active
                            ? "border-[#B76545] bg-[#B76545] text-white shadow-md"
                            : "border-[#E5DED6] bg-white text-[#2C2420] hover:border-[#B76545] hover:bg-[#FAF8F3]"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  })}

                </div>
              </div>
            </div>

            {/* GUESTS */}
            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_10px_35px_rgba(44,36,32,0.04)] sm:p-8">

              <h2 className="font-serif text-2xl font-semibold">
                Who's coming?
              </h2>

              <div className="mt-6 flex items-center justify-between">

                <div className="flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E7DE] text-[#B76545]">
                    <Users size={20} />
                  </div>

                  <div>
                    <p className="font-bold">
                      Guests
                    </p>

                    <p className="text-sm text-[#756D67]">
                      Up to 6 people
                    </p>
                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(Math.max(1, guests - 1))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CEC4] bg-white transition hover:bg-[#FAF8F3]"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-6 text-center font-bold">
                    {guests}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(Math.min(6, guests + 1))
                    }
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-[#D8CEC4] bg-white transition hover:bg-[#FAF8F3]"
                  >
                    <Plus size={16} />
                  </button>

                </div>
              </div>
            </div>

            {/* INCLUDED */}
            <div className="rounded-[28px] bg-[#E8DED0] p-6 sm:p-8">

              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#68705A]">
                INCLUDED
              </p>

              <h2 className="mt-3 font-serif text-2xl">
                Everything you need for the experience.
              </h2>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">

                {[
                  "Local host",
                  "3 hour experience",
                  "Local food stops",
                  "Hidden destination spots",
                  "Local recommendations",
                  "Flexible conversation",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-white/55 px-4 py-3 text-sm"
                  >
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[#68705A]">
                      <Check size={13} strokeWidth={3} />
                    </span>

                    <span>{item}</span>
                  </div>
                ))}

              </div>
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <aside>

            <div className="sticky top-28 rounded-[30px] border border-[#E5DED6] bg-white p-6 shadow-[0_20px_60px_rgba(44,36,32,0.10)]">

              {/* EXPERIENCE HEADER */}
              <div className="flex items-center gap-4 border-b border-[#E5DED6] pb-6">

                <div className="h-16 w-16 shrink-0 overflow-hidden rounded-2xl bg-[#E8DED0]">
                  <img
                    src="/images/profile.jpg"
                    alt={guideName}
                    className="h-full w-full object-cover"
                    loading="eager"
                  />
                </div>

                <div className="min-w-0">

                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B76545]">
                    EXPERIENCE
                  </p>

                  <h2 className="mt-1 font-serif text-xl font-semibold text-[#2C2420]">
                    Patna with {guideName.split(" ")[0]}
                  </h2>

                  <div className="mt-1 flex items-center gap-1 text-sm text-[#756D67]">

                    <Star
                      size={14}
                      fill="currentColor"
                      className="text-[#B8945A]"
                    />

                    <span className="font-semibold text-[#2C2420]">
                      4.9
                    </span>

                    <span>
                      · 124 reviews
                    </span>

                  </div>
                </div>
              </div>

              {/* SELECTED DETAILS */}
              <div className="mt-6 space-y-3">

                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8F3] px-4 py-3">

                  <div className="flex items-center gap-3">

                    <CalendarDays
                      size={17}
                      className="text-[#B76545]"
                    />

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-[#756D67]">
                        Date
                      </p>

                      <p className="mt-0.5 text-sm font-semibold">
                        {date || "Select date"}
                      </p>
                    </div>

                  </div>

                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8F3] px-4 py-3">

                  <div className="flex items-center gap-3">

                    <Clock3
                      size={17}
                      className="text-[#B76545]"
                    />

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-[#756D67]">
                        Starting time
                      </p>

                      <p className="mt-0.5 text-sm font-semibold">
                        {time}
                      </p>
                    </div>

                  </div>

                </div>

                <div className="flex items-center justify-between rounded-2xl bg-[#FAF8F3] px-4 py-3">

                  <div className="flex items-center gap-3">

                    <Users
                      size={17}
                      className="text-[#B76545]"
                    />

                    <div>
                      <p className="text-[10px] uppercase tracking-wide text-[#756D67]">
                        Guests
                      </p>

                      <p className="mt-0.5 text-sm font-semibold">
                        {guests} {guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>

                  </div>

                </div>

              </div>

              {/* PRICE */}
              <div className="mt-6 space-y-4 text-sm">

                <div className="flex justify-between">

                  <span className="text-[#756D67]">
                    ₹699 × {guests} guests
                  </span>

                  <span className="font-semibold">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-[#756D67]">
                    Service fee
                  </span>

                  <span className="font-semibold">
                    ₹{serviceFee}
                  </span>

                </div>

                <div className="border-t border-[#E5DED6] pt-5">

                  <div className="flex items-end justify-between">

                    <span className="font-bold text-[#2C2420]">
                      Total
                    </span>

                    <span className="text-2xl font-bold text-[#B76545]">
                      ₹{total.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

              {/* BOOK BUTTON */}
              <button
                type="button"
                onClick={() => {
                  if (!date) {
                    alert("Please select a date first.");
                    return;
                  }

                  setBooked(true);
                }}
                className="mt-7 flex w-full items-center justify-center gap-2 rounded-2xl bg-[#B76545] px-5 py-4 text-sm font-bold text-white shadow-[0_10px_25px_rgba(183,101,69,0.22)] transition hover:bg-[#965039] hover:shadow-[0_12px_30px_rgba(183,101,69,0.28)]"
              >
                {booked ? (
                  <>
                    <CheckCircle2 size={18} />
                    Booking requested
                  </>
                ) : (
                  <>
                    Request to book
                    <ArrowRight size={18} />
                  </>
                )}
              </button>

              {/* SECURITY */}
              <div className="mt-5 flex items-start gap-3 border-t border-[#E5DED6] pt-5">

                <ShieldCheck
                  size={18}
                  className="mt-0.5 shrink-0 text-[#68705A]"
                />

                <p className="text-xs leading-5 text-[#756D67]">
                  Your booking request is only confirmed after the host
                  accepts it.
                </p>

              </div>

              <div className="mt-5 flex items-center justify-center gap-2 text-xs text-[#756D67]">
                <CheckCircle2 size={14} className="text-[#68705A]" />
                Free cancellation before confirmation
              </div>

            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}