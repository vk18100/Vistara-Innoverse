"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Globe2,
  MapPin,
  Minus,
  Plus,
  Star,
  Users,
} from "lucide-react";

type Guide = {
  id: string;
  name: string;
  location: string;
  bio: string;
  about: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  pricePerHour: number;
  currency: string;
  image: string;
  verified: boolean;
  availableDays: string[];
};

const DURATIONS = [1, 2, 4, 6, 8];

export default function GuideBookPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const guideId = params?.id;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");
  const [bookingError, setBookingError] = useState("");

  const [date, setDate] = useState("");
  const [duration, setDuration] = useState(2);
  const [guests, setGuests] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    if (!guideId) return;

    async function loadGuide() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/guides/${guideId}`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        console.log("GUIDE BOOK API:", result);

        if (!response.ok) {
          throw new Error(
            result?.message || "Unable to load guide."
          );
        }

        setGuide(result.data ?? null);
      } catch (err) {
        console.error("GUIDE BOOK LOAD ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load guide."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [guideId]);

  const totalAmount = useMemo(() => {
    if (!guide) return 0;

    return Number(guide.pricePerHour || 0) * duration;
  }, [guide, duration]);

  function formatCurrency(value: number) {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  }

  function increaseGuests() {
    setGuests((current) => Math.min(current + 1, 10));
  }

  function decreaseGuests() {
    setGuests((current) => Math.max(current - 1, 1));
  }

  async function handleBooking() {
    if (!guide) return;

    setBookingError("");

    if (!date) {
      setBookingError("Please select a date.");
      return;
    }

    try {
      setBooking(true);

      /*
       * Booking API contract:
       * POST /api/guides/[id]/book
       *
       * body:
       * {
       *   guideId,
       *   date,
       *   durationHours,
       *   guests,
       *   notes
       * }
       */

      const response = await fetch(
        `/api/guides/${guide.id}/book`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            guideId: guide.id,
            date,
            durationHours: duration,
            guests,
            notes: notes.trim() || null,
          }),
        }
      );

      const result = await response.json();

      console.log("GUIDE BOOKING RESPONSE:", result);

      if (!response.ok || !result.success) {
        throw new Error(
          result?.message || "Unable to create booking."
        );
      }

      /*
       * If backend returns a booking id,
       * move to confirmation/payment page.
       */
      const bookingId =
        result.booking?.id ||
        result.data?.id ||
        result.data?.booking?.id;

      if (bookingId) {
        router.push(`/booking/${bookingId}`);
        return;
      }

      router.push("/booking");
    } catch (err) {
      console.error("GUIDE BOOKING ERROR:", err);

      setBookingError(
        err instanceof Error
          ? err.message
          : "Unable to create booking."
      );
    } finally {
      setBooking(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="h-5 w-32 animate-pulse rounded bg-[#F5F7FF]" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.15fr_0.85fr]">
            <div className="h-[520px] animate-pulse rounded-[30px] bg-[#F5F7FF]" />

            <div className="h-[620px] animate-pulse rounded-[30px] bg-[#F5F7FF]" />
          </div>
        </section>
      </main>
    );
  }

  if (error || !guide) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <section className="mx-auto max-w-3xl px-6 py-24 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
            GUIDE BOOKING
          </p>

          <h1 className="mt-4 font-serif text-4xl font-semibold">
            Guide not found
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            This guide may no longer be available.
          </p>

          <Link
            href="/guides"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            <ArrowLeft size={16} />
            Back to Guides
          </Link>
        </section>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <Link
            href={`/guides/${guide.id}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#03045E]"
          >
            <ArrowLeft size={16} />
            Back to {guide.name}
          </Link>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1fr_460px]">
          {/* LEFT */}
          <div>
            <div className="overflow-hidden rounded-[30px] bg-white shadow-[0_12px_45px_rgba(3,4,94,0.05)]">
              <div className="relative h-[360px] md:h-[460px]">
                <img
                  src={guide.image}
                  alt={guide.name}
                  className="h-full w-full object-cover"
                />

                {guide.verified && (
                  <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white/95 px-4 py-2.5 text-xs font-bold text-[#03045E] shadow-lg">
                    <CheckCircle2
                      size={15}
                      className="text-[#0D21A1]"
                    />
                    Verified Local Guide
                  </div>
                )}
              </div>

              <div className="p-7 md:p-9">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                    LOCAL EXPERT
                  </span>

                  <span className="h-1 w-1 rounded-full bg-gray-300" />

                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star
                      size={15}
                      className="fill-[#0D21A1] text-[#0D21A1]"
                    />
                    {guide.rating}

                    <span className="font-normal text-gray-400">
                      ({guide.reviews} reviews)
                    </span>
                  </div>
                </div>

                <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                  Book {guide.name}
                </h1>

                <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                  <MapPin size={17} />
                  {guide.location}
                </p>

                <p className="mt-6 max-w-2xl text-sm leading-7 text-gray-500">
                  {guide.about || guide.bio}
                </p>

                {/* GUIDE DETAILS */}
                <div className="mt-8 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#03045E]/10 bg-[#FAFAF8] p-5">
                    <div className="flex items-center gap-2">
                      <Clock3
                        size={18}
                        className="text-[#0D21A1]"
                      />

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Experience
                      </p>
                    </div>

                    <p className="mt-3 text-sm font-semibold">
                      {guide.experience}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#03045E]/10 bg-[#FAFAF8] p-5">
                    <div className="flex items-center gap-2">
                      <Globe2
                        size={18}
                        className="text-[#0D21A1]"
                      />

                      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">
                        Languages
                      </p>
                    </div>

                    <p className="mt-3 text-sm font-semibold">
                      {guide.languages.join(" · ")}
                    </p>
                  </div>
                </div>

                {/* SPECIALTIES */}
                <div className="mt-8 border-t border-[#03045E]/10 pt-7">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                    AREAS OF EXPERTISE
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.specialties.map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-[#F5F7FF] px-4 py-2 text-xs font-medium text-[#03045E]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT BOOKING FORM */}
          <aside>
            <div className="sticky top-8 rounded-[30px] border border-[#03045E]/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,4,94,0.08)] md:p-7">
              {/* PRICE */}
              <div className="border-b border-[#03045E]/10 pb-6">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-400">
                  Guide booking
                </p>

                <div className="mt-3 flex items-end justify-between">
                  <div>
                    <span className="text-3xl font-semibold">
                      {formatCurrency(guide.pricePerHour)}
                    </span>

                    <span className="ml-1 text-sm text-gray-400">
                      / hour
                    </span>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold">
                    <Star
                      size={15}
                      className="fill-[#0D21A1] text-[#0D21A1]"
                    />
                    {guide.rating}
                  </div>
                </div>
              </div>

              {/* DATE */}
              <div className="pt-6">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarDays
                    size={17}
                    className="text-[#0D21A1]"
                  />
                  Select date
                </label>

                <input
                  type="date"
                  value={date}
                  min={new Date()
                    .toISOString()
                    .split("T")[0]}
                  onChange={(event) =>
                    setDate(event.target.value)
                  }
                  className="mt-3 w-full rounded-xl border border-[#03045E]/10 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
                />
              </div>

              {/* DURATION */}
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-semibold">
                    <Clock3
                      size={17}
                      className="text-[#0D21A1]"
                    />
                    Duration
                  </label>

                  <span className="text-xs text-gray-400">
                    {duration}{" "}
                    {duration === 1 ? "hour" : "hours"}
                  </span>
                </div>

                <div className="mt-3 grid grid-cols-5 gap-2">
                  {DURATIONS.map((hours) => (
                    <button
                      key={hours}
                      type="button"
                      onClick={() => setDuration(hours)}
                      className={`rounded-xl border px-2 py-3 text-xs font-semibold transition ${
                        duration === hours
                          ? "border-[#03045E] bg-[#03045E] text-white"
                          : "border-[#03045E]/10 bg-white text-[#03045E] hover:border-[#0D21A1]"
                      }`}
                    >
                      {hours}h
                    </button>
                  ))}
                </div>
              </div>

              {/* GUESTS */}
              <div className="mt-6">
                <label className="flex items-center gap-2 text-sm font-semibold">
                  <Users
                    size={17}
                    className="text-[#0D21A1]"
                  />
                  Guests
                </label>

                <div className="mt-3 flex items-center justify-between rounded-xl border border-[#03045E]/10 px-4 py-3">
                  <div>
                    <p className="text-sm font-semibold">
                      {guests}{" "}
                      {guests === 1 ? "guest" : "guests"}
                    </p>

                    <p className="mt-0.5 text-xs text-gray-400">
                      People joining the guide
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={decreaseGuests}
                      disabled={guests <= 1}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#03045E]/10 transition hover:bg-[#F5F7FF] disabled:opacity-40"
                    >
                      <Minus size={14} />
                    </button>

                    <span className="w-5 text-center text-sm font-semibold">
                      {guests}
                    </span>

                    <button
                      type="button"
                      onClick={increaseGuests}
                      disabled={guests >= 10}
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#03045E]/10 transition hover:bg-[#F5F7FF] disabled:opacity-40"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                </div>
              </div>

              {/* NOTES */}
              <div className="mt-6">
                <label className="text-sm font-semibold">
                  Notes{" "}
                  <span className="font-normal text-gray-400">
                    (optional)
                  </span>
                </label>

                <textarea
                  value={notes}
                  onChange={(event) =>
                    setNotes(event.target.value)
                  }
                  rows={4}
                  placeholder="Tell your guide anything they should know..."
                  className="mt-3 w-full resize-none rounded-xl border border-[#03045E]/10 px-4 py-3 text-sm outline-none placeholder:text-gray-400 focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
                />
              </div>

              {/* ERROR */}
              {bookingError && (
                <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-4 text-xs leading-5 text-red-700">
                  {bookingError}
                </div>
              )}

              {/* SUMMARY */}
              <div className="mt-6 border-t border-[#03045E]/10 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-500">
                    {formatCurrency(guide.pricePerHour)} ×{" "}
                    {duration} hours
                  </span>

                  <span className="font-medium">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-semibold">
                    Total
                  </span>

                  <span className="text-xl font-semibold">
                    {formatCurrency(totalAmount)}
                  </span>
                </div>
              </div>

              {/* BOOK */}
              <button
                type="button"
                onClick={handleBooking}
                disabled={booking}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {booking ? (
                  "Creating booking..."
                ) : (
                  <>
                    Continue to Booking
                    <ArrowRight size={17} />
                  </>
                )}
              </button>

              <p className="mt-3 text-center text-xs leading-5 text-gray-400">
                Your booking details will be confirmed before
                payment.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}