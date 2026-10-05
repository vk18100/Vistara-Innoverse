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

  const [date, setDate] = useState("");
  const [time, setTime] = useState("10:00");
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);

  const serviceFee = 99;
  const subtotal = guide.price * guests;
  const total = subtotal + serviceFee;

  const handleContinue = () => {
    if (!date) {
      alert("Please select a date.");
      return;
    }

    setLoading(true);

    /*
      Later connect this to:
      POST /api/guides/bookings

      Then redirect to confirmation page.
    */

    router.push(
      `/guides/${id}/book/confirmation?date=${date}&time=${time}&guests=${guests}`
    );
  };

  return (
    <main className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}

      

        <Navbar/>

      {/* ================= PAGE ================= */}

      <section className="mx-auto max-w-6xl px-5 py-8 lg:px-8">

        {/* HEADER */}

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

        {/* MAIN */}

        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}

          <div className="space-y-5">

            {/* GUIDE */}

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

            {/* DATE */}

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

              <input
                type="date"
                value={date}
                min={new Date().toISOString().split("T")[0]}
                onChange={(e) => setDate(e.target.value)}
                className="mt-5 h-11 w-full rounded-xl border border-black/15 bg-white px-3 text-sm outline-none transition focus:border-black"
              />

            </div>

            {/* TIME */}

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

                {["09:00", "10:00", "14:00"].map(
                  (item) => {
                    const active = time === item;

                    return (
                      <button
                        key={item}
                        type="button"
                        onClick={() => setTime(item)}
                        className={`rounded-xl border px-3 py-2.5 text-xs font-medium transition ${
                          active
                            ? "border-black bg-black text-white"
                            : "border-black/10 hover:border-black"
                        }`}
                      >
                        {item}
                      </button>
                    );
                  }
                )}

              </div>

            </div>

            {/* GUESTS */}

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
                      setGuests(Math.max(1, guests - 1))
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
                      setGuests(Math.min(6, guests + 1))
                    }
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                  >
                    <Plus size={13} />
                  </button>

                </div>

              </div>

            </div>

            {/* INCLUDED */}

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

          {/* RIGHT SUMMARY */}

          <aside>

            <div className="sticky top-20 rounded-2xl border border-black/10 bg-white p-5">

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

              {/* SELECTED */}

              <div className="mt-5 space-y-2">

                <div className="flex items-center gap-3 rounded-xl bg-black/[0.035] p-3">

                  <CalendarDays size={15} />

                  <div>

                    <p className="text-[9px] uppercase text-black/40">
                      Date
                    </p>

                    <p className="mt-0.5 text-xs font-semibold">
                      {date || "Select date"}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-black/[0.035] p-3">

                  <Clock3 size={15} />

                  <div>

                    <p className="text-[9px] uppercase text-black/40">
                      Time
                    </p>

                    <p className="mt-0.5 text-xs font-semibold">
                      {time}
                    </p>

                  </div>

                </div>

                <div className="flex items-center gap-3 rounded-xl bg-black/[0.035] p-3">

                  <Users size={15} />

                  <div>

                    <p className="text-[9px] uppercase text-black/40">
                      Guests
                    </p>

                    <p className="mt-0.5 text-xs font-semibold">
                      {guests}{" "}
                      {guests === 1 ? "guest" : "guests"}
                    </p>

                  </div>

                </div>

              </div>

              {/* PRICE */}

              <div className="mt-5 space-y-3 text-xs">

                <div className="flex justify-between">
                  <span className="text-black/50">
                    ₹{guide.price} × {guests}
                  </span>

                  <span>
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-black/50">
                    Service fee
                  </span>

                  <span>₹{serviceFee}</span>
                </div>

                <div className="border-t border-black/10 pt-4">

                  <div className="flex items-center justify-between">

                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-semibold">
                      ₹{total.toLocaleString("en-IN")}
                    </span>

                  </div>

                </div>

              </div>

              {/* CONTINUE */}

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