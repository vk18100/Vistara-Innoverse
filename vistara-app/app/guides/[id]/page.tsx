"use client";

import Navbar from "@/components/navbar";
import CompactCalendar from "@/components/CompactCalendar";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  Clock3,
  Globe2,
  MapPin,
  Minus,
  Plus,
  Share2,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

import { useEffect, useState } from "react";

type Guide = {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  bio: string;
  description?: string;
  languages: string[];
  specialties: string[];
  price: number;
  experience: number;
  reviews: number;
  verified?: boolean;
};

export default function GuideDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [showCalendar, setShowCalendar] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const [guests, setGuests] = useState(1);
  const [booking, setBooking] = useState(false);

  /* --------------------------------
     LOAD GUIDE
  -------------------------------- */

  useEffect(() => {
    if (!id) return;

    const loadGuide = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/guides/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result?.success) {
          throw new Error(
            result?.message || "Unable to load guide."
          );
        }

        setGuide(result.data || result.guide);
      } catch (err) {
        console.error("GUIDE_DETAILS_ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load guide."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, [id]);

  /* --------------------------------
     DATE
  -------------------------------- */

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  /* --------------------------------
     BOOK
  -------------------------------- */

  const handleBook = () => {
    if (!guide) return;

    setBooking(true);

    const dateParam = selectedDate
      ? selectedDate.toISOString().split("T")[0]
      : "";

    const query = new URLSearchParams();

    if (dateParam) {
      query.set("date", dateParam);
    }

    query.set("guests", String(guests));

    router.push(
      `/guides/${guide.id}/book?${query.toString()}`
    );
  };

  /* --------------------------------
     LOADING
  -------------------------------- */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="mx-auto max-w-6xl px-5 py-10">
          <div className="h-4 w-24 animate-pulse rounded bg-neutral-100" />

          <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_360px]">
            <div className="space-y-5">
              <div className="h-[280px] animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-8 w-64 animate-pulse rounded bg-neutral-100" />
              <div className="h-5 w-80 animate-pulse rounded bg-neutral-100" />
            </div>

            <div className="h-[430px] animate-pulse rounded-2xl bg-neutral-100" />
          </div>
        </div>
      </main>
    );
  }

  /* --------------------------------
     ERROR
  -------------------------------- */

  if (error || !guide) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="flex min-h-[70vh] flex-col items-center justify-center px-5 text-center">
          <MapPin size={28} />

          <h1 className="mt-4 text-2xl font-semibold">
            Guide not found
          </h1>

          <p className="mt-2 text-sm text-neutral-500">
            This guide may no longer be available.
          </p>

          <Link
            href="/guides"
            className="mt-6 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
          >
            Back to guides
          </Link>
        </div>
      </main>
    );
  }

  const total = guide.price * guests;

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* PAGE */}
      <div className="mx-auto max-w-6xl px-5 py-6 lg:px-8 lg:py-8">

        {/* BACK */}
        <Link
          href="/guides"
          className="mb-5 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          Back to guides
        </Link>

        {/* MAIN */}
        <div className="grid gap-7 lg:grid-cols-[1fr_350px]">

          {/* =========================================
              LEFT — COMPACT EXPERIENCE
          ========================================= */}

          <section>

            {/* IMAGE */}
            <div className="relative overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={guide.image || "/images/profile.jpg"}
                alt={guide.name}
                className="h-[250px] w-full object-cover sm:h-[300px]"
                onError={(e) => {
                  e.currentTarget.src = "/images/profile.jpg";
                }}
              />

              {guide.verified && (
                <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold shadow-sm">
                  <ShieldCheck size={13} />
                  Verified
                </div>
              )}
            </div>

            {/* TITLE */}
            <div className="mt-5">

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {guide.name}
                  </h1>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-neutral-500">
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {guide.location}
                    </span>

                    <span className="flex items-center gap-1.5 text-black">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      {guide.rating.toFixed(1)}
                    </span>

                    <span>
                      {guide.reviews} reviews
                    </span>
                  </div>
                </div>

                {/* WISHLIST */}
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-neutral-200 hover:bg-neutral-50"
                >
                  ♡
                </button>
              </div>

              {/* =================================
                  SMALL GUIDE PROFILE
              ================================= */}

              <div className="mt-5 flex items-center gap-3 border-y border-neutral-200 py-4">

                <img
                  src={guide.image || "/images/profile.jpg"}
                  alt={guide.name}
                  className="h-11 w-11 rounded-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src =
                      "/images/profile.jpg";
                  }}
                />

                <div className="min-w-0">
                  <p className="text-sm font-semibold">
                    {guide.name}
                  </p>

                  <p className="text-xs text-neutral-500">
                    Local guide · {guide.experience} years
                    experience
                  </p>
                </div>

                {guide.verified && (
                  <div className="ml-auto flex items-center gap-1 text-xs text-neutral-500">
                    <ShieldCheck size={14} />
                    Verified
                  </div>
                )}
              </div>

              {/* DESCRIPTION */}
              <div className="mt-5">
                <p className="text-sm leading-6 text-neutral-600">
                  {guide.description || guide.bio}
                </p>
              </div>

              {/* QUICK INFO */}
              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">

                <div className="rounded-xl border border-neutral-200 p-3.5">
                  <Clock3 size={16} />

                  <p className="mt-2 text-[11px] text-neutral-500">
                    Experience
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {guide.experience} years
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-200 p-3.5">
                  <Users size={16} />

                  <p className="mt-2 text-[11px] text-neutral-500">
                    Reviews
                  </p>

                  <p className="mt-1 text-sm font-semibold">
                    {guide.reviews}
                  </p>
                </div>

                <div className="rounded-xl border border-neutral-200 p-3.5">
                  <Globe2 size={16} />

                  <p className="mt-2 text-[11px] text-neutral-500">
                    Languages
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold">
                    {guide.languages?.slice(0, 2).join(", ") ||
                      "Local"}
                  </p>
                </div>
              </div>

              {/* LANGUAGES */}
              {guide.languages?.length > 0 && (
                <div className="mt-6">
                  <h2 className="text-sm font-semibold">
                    Languages
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {guide.languages.map((language) => (
                      <span
                        key={language}
                        className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs"
                      >
                        {language}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* SPECIALTIES */}
              {guide.specialties?.length > 0 && (
                <div className="mt-5">
                  <h2 className="text-sm font-semibold">
                    Knows the place for
                  </h2>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {guide.specialties.map((item) => (
                      <span
                        key={item}
                        className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* =========================================
              RIGHT — COMPACT BOOKING CARD
          ========================================= */}

          <aside className="lg:sticky lg:top-24 lg:h-fit">

            <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">

              {/* PRICE */}
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-semibold">
₹{Number(guide.price ?? 0).toLocaleString("en-IN")}                  </span>

                  <span className="ml-1 text-sm text-neutral-500">
                    / hour
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star size={14} fill="currentColor" />
                  {guide.rating.toFixed(1)}
                </div>
              </div>

              {/* DATE */}
              <div className="relative mt-5">

                <button
                  type="button"
                  onClick={() =>
                    setShowCalendar((prev) => !prev)
                  }
                  className="flex w-full items-center gap-3 rounded-xl border border-neutral-200 p-3.5 text-left hover:border-black"
                >
                  <CalendarDays size={18} />

                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                      Date
                    </p>

                    <p className="mt-1 text-sm">
                      {selectedDate
                        ? formatDate(selectedDate)
                        : "Select date"}
                    </p>
                  </div>
                </button>

                {showCalendar && (
                  <div className="absolute left-0 right-0 z-30 mt-2">
                    <CompactCalendar
                      value={selectedDate}
                      onChange={(date) => {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* GUESTS */}
              <div className="mt-3 rounded-xl border border-neutral-200 p-3.5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-3">
                    <Users size={18} />

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wider text-neutral-400">
                        Guests
                      </p>

                      <p className="mt-1 text-sm">
                        {guests}{" "}
                        {guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() =>
                        setGuests((prev) =>
                          Math.max(1, prev - 1)
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 disabled:opacity-30"
                    >
                      <Minus size={14} />
                    </button>

                    <button
                      type="button"
                      disabled={guests >= 8}
                      onClick={() =>
                        setGuests((prev) =>
                          Math.min(8, prev + 1)
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-neutral-200 disabled:opacity-30"
                    >
                      <Plus size={14} />
                    </button>

                  </div>
                </div>

                <p className="mt-3 text-xs text-neutral-400">
                  Up to 8 guests
                </p>
              </div>

              {/* BOOK BUTTON */}
              <button
                type="button"
                onClick={handleBook}
                disabled={booking}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-50"
              >
                {booking ? "Opening..." : "Book now"}

                <ArrowRight size={15} />
              </button>

              <p className="mt-3 text-center text-[11px] text-neutral-400">
                You won't be charged until you confirm.
              </p>

              {/* PRICE */}
              <div className="mt-5 border-t border-neutral-200 pt-4">

                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">
                  ₹{Number(guide.price ?? 0).toLocaleString("en-IN")} ×{" "}
                    {guests}{" "}
                    {guests === 1 ? "guest" : "guests"}
                  </span>

                  <span>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-neutral-500">
                    Service fee
                  </span>

                  <span>₹25</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-semibold">
                  <span>Total</span>

                  <span>
                    ₹{(total + 25).toLocaleString("en-IN")}
                  </span>
                </div>
              </div>
            </div>

            {/* SHARE */}
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-3 text-sm font-medium hover:bg-neutral-50"
            >
              <Share2 size={15} />
              Share this experience
            </button>

          </aside>
        </div>

        {/* =========================================
            BOTTOM EXPLORE
        ========================================= */}

        <section className="mt-10 border-t border-neutral-200 pt-8">

          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-neutral-400">
                Explore locally
              </p>

              <h2 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
                Discover the destination with local knowledge.
              </h2>
            </div>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              Explore places
              <ArrowRight size={15} />
            </Link>

          </div>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500">
            Discover local food, neighbourhoods, heritage,
            hidden spots and experiences with someone who knows
            the destination.
          </p>
        </section>
      </div>

      {/* =========================================
          FOOTER
      ========================================= */}

      <footer className="mt-10 border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-7 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">

          <span>
            © {new Date().getFullYear()} Vistara
          </span>

          <div className="flex gap-5">
            <Link
              href="/guides"
              className="hover:text-black"
            >
              Guides
            </Link>

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
          </div>

        </div>
      </footer>
    </main>
  );
}