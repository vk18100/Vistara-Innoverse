"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

import Navbar from "@/components/navbar";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Minus,
  Plus,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

const guideData: Record<
  string,
  {
    name: string;
    location: string;
    image: string;
    rating: number;
    reviews: number;
    price: number;
  }
> = {
  rajiv: {
    name: "Rajiv Kumar",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.9,
    reviews: 124,
    price: 699,
  },

  amit: {
    name: "Amit Singh",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.8,
    reviews: 96,
    price: 599,
  },

  neha: {
    name: "Neha Sharma",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.9,
    reviews: 87,
    price: 649,
  },
};

export default function GuideBookPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const guide = guideData[id] || {
    name: "Rajiv Kumar",
    location: "Patna, Bihar",
    image: "/images/profile.jpg",
    rating: 4.9,
    reviews: 124,
    price: 699,
  };

  /* ================= STATES ================= */

  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);

  /* ================= CALENDAR ================= */

  const [calendarOpen, setCalendarOpen] = useState(false);

  const today = new Date();

  const [calendarMonth, setCalendarMonth] = useState(
    new Date(today.getFullYear(), today.getMonth(), 1)
  );

  const selectedDate = date
    ? new Date(`${date}T00:00:00`)
    : null;

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const daysInMonth = new Date(
    year,
    month + 1,
    0
  ).getDate();

  const firstDay = new Date(
    year,
    month,
    1
  ).getDay();

  const calendarDays: (number | null)[] = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const isPastDate = (day: number) => {
    const current = new Date(
      year,
      month,
      day
    );

    const todayStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    return current < todayStart;
  };

  const isSelectedDate = (day: number) => {
    if (!selectedDate) return false;

    return (
      selectedDate.getFullYear() === year &&
      selectedDate.getMonth() === month &&
      selectedDate.getDate() === day
    );
  };

  const selectDate = (day: number) => {
    if (isPastDate(day)) return;

    const selected = new Date(
      year,
      month,
      day
    );

    const formatted = [
      selected.getFullYear(),
      String(selected.getMonth() + 1).padStart(2, "0"),
      String(selected.getDate()).padStart(2, "0"),
    ].join("-");

    setDate(formatted);
    setCalendarOpen(false);
  };

  const formatSelectedDate = () => {
    if (!selectedDate) {
      return "Select date";
    }

    return selectedDate.toLocaleDateString(
      "en-IN",
      {
        day: "numeric",
        month: "short",
        year: "numeric",
      }
    );
  };

  const monthLabel =
    calendarMonth.toLocaleDateString(
      "en-IN",
      {
        month: "long",
        year: "numeric",
      }
    );

  /* ================= PRICE ================= */

  const serviceFee = 99;
  const subtotal = guide.price * guests;
  const total = subtotal + serviceFee;

  /* ================= CONTINUE ================= */

  const handleContinue = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    setLoading(true);

    router.push(
      `/guides/${id}/book/confirmation?date=${date}&time=${time}&guests=${guests}`
    );
  };

  return (
    <main className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}

      <Navbar />

      {/* ================= PAGE ================= */}

      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">

        {/* ================= HEADER ================= */}

        <div className="mb-8 max-w-2xl">

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/45">
            BOOK LOCAL GUIDE
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
            Plan your experience
          </h1>

          <p className="mt-2 text-sm leading-6 text-black/50">
            Choose your date, time and group size.
            Your local guide will take care of the rest.
          </p>

        </div>

        {/* ================= MAIN ================= */}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* ================= LEFT ================= */}

          <div className="space-y-5">

            {/* ================= GUIDE ================= */}

            <div className="rounded-2xl border border-black/10 bg-white p-5">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
                YOUR GUIDE
              </p>

              <div className="mt-4 flex items-center gap-4">

                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-14 w-14 rounded-full object-cover"
                />

                <div className="min-w-0">

                  <div className="flex items-center gap-2">

                    <h2 className="text-base font-semibold">
                      {guide.name}
                    </h2>

                    <ShieldCheck size={14} />

                  </div>

                  <p className="mt-1 text-xs text-black/50">
                    {guide.location}
                  </p>

                  <div className="mt-1 flex items-center gap-1 text-xs">

                    <Star
                      size={12}
                      fill="currentColor"
                    />

                    <span className="font-medium">
                      {guide.rating}
                    </span>

                    <span className="text-black/40">
                      · {guide.reviews} reviews
                    </span>

                  </div>

                </div>

              </div>

            </div>

            {/* ================= DATE ================= */}

            <div className="rounded-2xl border border-black/10 p-5">

              <div className="flex items-start gap-3">

                <CalendarDays size={18} />

                <div>

                  <h2 className="text-base font-semibold">
                    When are you going?
                  </h2>

                  <p className="mt-1 text-xs text-black/45">
                    Select your preferred date.
                  </p>

                </div>

              </div>

              <button
                type="button"
                onClick={() =>
                  setCalendarOpen((prev) => !prev)
                }
                className="mt-5 flex h-11 w-full items-center justify-between rounded-xl border border-black/15 bg-white px-3 text-left text-sm outline-none transition hover:border-black"
              >

                <div className="flex items-center gap-3">

                  <CalendarDays size={16} />

                  <span
                    className={
                      date
                        ? "text-black"
                        : "text-black/40"
                    }
                  >
                    {formatSelectedDate()}
                  </span>

                </div>

                <ChevronRight
                  size={16}
                  className={`transition-transform ${
                    calendarOpen
                      ? "rotate-90"
                      : ""
                  }`}
                />

              </button>

              {/* ================= CALENDAR ================= */}

              {calendarOpen && (
                <div className="relative">

                  <div className="absolute left-0 right-0 top-2 z-50 rounded-2xl border border-black/10 bg-white p-4 shadow-xl">

                    {/* CALENDAR HEADER */}

                    <div className="flex items-center justify-between">

                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              year,
                              month - 1,
                              1
                            )
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black hover:text-white"
                      >
                        <ChevronLeft size={15} />
                      </button>

                      <p className="text-sm font-semibold">
                        {monthLabel}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          setCalendarMonth(
                            new Date(
                              year,
                              month + 1,
                              1
                            )
                          )
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-full transition hover:bg-black hover:text-white"
                      >
                        <ChevronRight size={15} />
                      </button>

                    </div>

                    {/* WEEK DAYS */}

                    <div className="mt-4 grid grid-cols-7 text-center">

                      {[
                        "S",
                        "M",
                        "T",
                        "W",
                        "T",
                        "F",
                        "S",
                      ].map(
                        (day, index) => (
                          <span
                            key={`${day}-${index}`}
                            className="text-[10px] font-medium text-black/35"
                          >
                            {day}
                          </span>
                        )
                      )}

                    </div>

                    {/* DAYS */}

                    <div className="mt-2 grid grid-cols-7 gap-1">

                      {calendarDays.map(
                        (day, index) => {

                          if (day === null) {
                            return (
                              <div
                                key={`empty-${index}`}
                                className="h-9"
                              />
                            );
                          }

                          const disabled =
                            isPastDate(day);

                          const selected =
                            isSelectedDate(day);

                          return (
                            <button
                              key={day}
                              type="button"
                              disabled={disabled}
                              onClick={() =>
                                selectDate(day)
                              }
                              className={`
                                flex h-9 w-9 items-center justify-center
                                rounded-full text-xs transition
                                ${
                                  selected
                                    ? "bg-black text-white"
                                    : disabled
                                    ? "cursor-not-allowed text-black/20"
                                    : "text-black hover:bg-black hover:text-white"
                                }
                              `}
                            >
                              {day}
                            </button>
                          );
                        }
                      )}

                    </div>

                    {/* TODAY */}

                    <button
                      type="button"
                      onClick={() => {
                        const current =
                          new Date();

                        const formatted = [
                          current.getFullYear(),
                          String(
                            current.getMonth() + 1
                          ).padStart(2, "0"),
                          String(
                            current.getDate()
                          ).padStart(2, "0"),
                        ].join("-");

                        setDate(formatted);

                        setCalendarMonth(
                          new Date(
                            current.getFullYear(),
                            current.getMonth(),
                            1
                          )
                        );

                        setCalendarOpen(false);
                      }}
                      className="mt-3 w-full border-t border-black/10 pt-3 text-xs font-medium hover:underline"
                    >
                      Today
                    </button>

                  </div>

                </div>
              )}

            </div>

            {/* ================= TIME ================= */}

            <div className="rounded-2xl border border-black/10 p-5">

              <div className="flex items-center gap-3">

                <Clock3 size={18} />

                <div>

                  <h2 className="text-base font-semibold">
                    Starting time
                  </h2>

                  <p className="mt-1 text-xs text-black/45">
                    Choose when your experience starts.
                  </p>

                </div>

              </div>

              <div className="mt-5 grid grid-cols-3 gap-2">

                {[
                  "09:00",
                  "10:00",
                  "14:00",
                ].map((item) => {

                  const active =
                    time === item;

                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() =>
                        setTime(item)
                      }
                      className={`
                        rounded-xl border px-3 py-2.5 text-xs font-medium transition
                        ${
                          active
                            ? "border-black bg-black text-white"
                            : "border-black/10 hover:border-black"
                        }
                      `}
                    >
                      {item}
                    </button>
                  );
                })}

              </div>

            </div>

            {/* ================= GUESTS ================= */}

            <div className="rounded-2xl border border-black/10 p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <Users size={18} />

                  <div>

                    <h2 className="text-base font-semibold">
                      Guests
                    </h2>

                    <p className="mt-1 text-xs text-black/45">
                      Up to 6 people
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3">

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(
                        Math.max(
                          1,
                          guests - 1
                        )
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="w-5 text-center text-sm font-semibold">
                    {guests}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setGuests(
                        Math.min(
                          6,
                          guests + 1
                        )
                      )
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                  >
                    <Plus size={13} />
                  </button>

                </div>

              </div>

            </div>

            {/* ================= INCLUDED ================= */}

            <div className="rounded-2xl bg-black p-5 text-white">

              <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-white/45">
                INCLUDED
              </p>

              <h2 className="mt-2 text-lg font-semibold">
                Your local experience
              </h2>

              <div className="mt-4 grid gap-2 sm:grid-cols-2">

                {[
                  "Local guide",
                  "3 hour experience",
                  "Local recommendations",
                  "Hidden places",
                  "Food & culture tips",
                  "Flexible conversation",
                ].map((item) => (

                  <div
                    key={item}
                    className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs"
                  >
                    <Check size={13} />
                    {item}
                  </div>

                ))}

              </div>

            </div>

          </div>

          {/* ================= RIGHT SUMMARY ================= */}

          <aside>

            <div className="sticky top-20 rounded-2xl border border-black/10 bg-white p-5">

              {/* GUIDE SUMMARY */}

              <div className="flex gap-3 border-b border-black/10 pb-5">

                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-14 w-14 rounded-xl object-cover"
                />

                <div>

                  <p className="text-[9px] uppercase tracking-[0.18em] text-black/40">
                    EXPERIENCE
                  </p>

                  <h2 className="mt-1 text-sm font-semibold">
                    Patna with{" "}
                    {guide.name.split(" ")[0]}
                  </h2>

                  <div className="mt-1 flex items-center gap-1 text-xs">

                    <Star
                      size={11}
                      fill="currentColor"
                    />

                    {guide.rating}

                  </div>

                </div>

              </div>

              {/* ================= SELECTED DATE ================= */}

              <div className="mt-5 rounded-xl bg-black/[0.025] p-3">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <CalendarDays size={15} />

                    <span className="text-xs font-medium">
                      Date
                    </span>

                  </div>

                  <span className="text-xs">
                    {formatSelectedDate()}
                  </span>

                </div>

              </div>

              {/* ================= PRICE ================= */}

              <div className="mt-5 space-y-3 text-xs">

                <div className="flex justify-between">

                  <span className="text-black/50">
                    ₹{guide.price} ×{" "}
                    {guests}
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-black/50">
                    Service fee
                  </span>

                  <span>
                    ₹{serviceFee}
                  </span>

                </div>

                <div className="border-t border-black/10 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-semibold">
                      ₹
                      {total.toLocaleString(
                        "en-IN"
                      )}
                    </span>

                  </div>

                </div>

              </div>

              {/* ================= CONTINUE ================= */}

              <button
                type="button"
                onClick={handleContinue}
                disabled={loading}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-black/80 disabled:opacity-50"
              >

                {loading
                  ? "Processing..."
                  : "Continue to confirmation"}

                <ArrowRight size={15} />

              </button>

              <div className="mt-4 flex items-start gap-2 border-t border-black/10 pt-4">

                <ShieldCheck
                  size={15}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-[10px] leading-4 text-black/45">
                  Your booking will only be confirmed after
                  the required confirmation step.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

      <footer className="mt-10 border-t border-black/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-7 text-xs text-black/45 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <div>

            <p className="font-semibold text-black">
              Vistara
            </p>

            <p className="mt-1">
              Discover places. Meet locals. Travel differently.
            </p>

          </div>

          <div className="flex gap-5">

            <Link
              href="/explore"
              className="hover:text-black"
            >
              Explore
            </Link>

            <Link
              href="/trips"
              className="hover:text-black"
            >
              Trips
            </Link>

            <Link
              href="/wishlist"
              className="hover:text-black"
            >
              Wishlist
            </Link>

            <Link
              href="/guides"
              className="hover:text-black"
            >
              Guides
            </Link>

          </div>

        </div>

      </footer>

    </main>
  );
}