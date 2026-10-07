"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import {
  ArrowLeft,
  Bath,
  BedDouble,
  Check,
  Clock,
  Coffee,
  Heart,
  Home,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Star,
  Tv,
  Users,
  Utensils,
  Waves,
  Wifi,
  Wind,
  X,
  Car,
} from "lucide-react";

import type { ElementType, ReactNode } from "react";

import { stays } from "@/data/stay";

import CompactCalendar from "@/components/CompactCalendar";
import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

/* =========================================================
   TYPES
========================================================= */

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

type BookingDraft = {
  stayId: string;
  stayTitle: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  total: number;
};

/* =========================================================
   REVIEWS
========================================================= */

const initialReviews: Review[] = [
  {
    id: "1",
    name: "Ananya Sharma",
    rating: 5,
    comment:
      "Beautiful stay, very clean and comfortable. The location was also convenient.",
    date: "Recently",
  },
  {
    id: "2",
    name: "Rahul Verma",
    rating: 4.8,
    comment:
      "Great experience and a very comfortable place to stay. Would visit again.",
    date: "Recently",
  },
  {
    id: "3",
    name: "Priya Singh",
    rating: 4.7,
    comment:
      "The property looked exactly like the pictures. Had a really pleasant stay.",
    date: "Recently",
  },
];

/* =========================================================
   AMENITIES
========================================================= */

const amenities = [
  {
    name: "Wi-Fi",
    icon: Wifi,
  },
  {
    name: "Air conditioning",
    icon: Wind,
  },
  {
    name: "Private bathroom",
    icon: Bath,
  },
  {
    name: "Free parking",
    icon: Car,
  },
  {
    name: "TV",
    icon: Tv,
  },
  {
    name: "Breakfast",
    icon: Coffee,
  },
  {
    name: "Kitchen",
    icon: Utensils,
  },
  {
    name: "Swimming pool",
    icon: Waves,
  },
];

/* =========================================================
   PAGE
========================================================= */

export default function StayIdPage() {
  const params = useParams();

  const id = String(params?.id ?? "").trim();

  /*
   * IMPORTANT
   *
   * Stay IDs are STRING SLUGS.
   *
   * Example:
   *
   * /stays/heritage-villa
   *
   * So DO NOT use Number(id).
   */

  const stay = stays.find(
    (item) => String(item.id) === id
  );

  if (!stay) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
              <Home size={22} />
            </div>

            <h1 className="mt-5 text-2xl font-black">
              Stay not found
            </h1>

            <p className="mt-2 text-sm text-black/50">
              This stay does not exist.
            </p>

            <p className="mt-1 text-xs text-black/35">
              Requested stay: {id || "unknown"}
            </p>

            <Link
              href="/stays"
              className="mt-6 inline-flex items-center rounded-xl bg-black px-5 py-3 text-sm font-bold text-white transition hover:bg-neutral-800"
            >
              <ArrowLeft
                size={16}
                className="mr-2"
              />
              Back to stays
            </Link>

          </div>
        </div>

        <Footer />
      </main>
    );
  }

  return (
    <StayDetails stay={stay} />
  );
}

/* =========================================================
   STAY DETAILS
========================================================= */

function StayDetails({
  stay,
}: {
  stay: (typeof stays)[number];
}) {
  const router = useRouter();

  /* =======================================================
     BOOKING
  ======================================================= */

  const [checkIn, setCheckIn] =
    useState("");

  const [checkOut, setCheckOut] =
    useState("");

  const [guests, setGuests] =
    useState(1);

  const [bookingPopup, setBookingPopup] =
    useState(false);

  /* =======================================================
     WISHLIST
  ======================================================= */

  const [wishlisted, setWishlisted] =
    useState(false);

  /* =======================================================
     REVIEWS
  ======================================================= */

  const [reviews, setReviews] =
    useState<Review[]>(initialReviews);

  const [reviewText, setReviewText] =
    useState("");

  const [reviewRating, setReviewRating] =
    useState(5);

  /* =======================================================
     LOCAL STORAGE
  ======================================================= */

  useEffect(() => {
    try {
      const savedWishlist =
        localStorage.getItem(
          `vistara-wishlist-${stay.id}`
        );

      setWishlisted(
        savedWishlist === "true"
      );

      const savedReviews =
        localStorage.getItem(
          `vistara-reviews-${stay.id}`
        );

      if (savedReviews) {
        const parsed =
          JSON.parse(savedReviews);

        if (Array.isArray(parsed)) {
          setReviews(parsed);
        }
      }
    } catch {
      setWishlisted(false);
      setReviews(initialReviews);
    }
  }, [stay.id]);

  /* =======================================================
     PRICE
  ======================================================= */

  const nightlyPrice =
    Number(stay.price) || 0;

  const serviceFee =
    Math.round(nightlyPrice * 0.05);

  const numberOfNights = useMemo(() => {
    if (!checkIn || !checkOut) {
      return 1;
    }

    const start = new Date(
      `${checkIn}T00:00:00`
    );

    const end = new Date(
      `${checkOut}T00:00:00`
    );

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      return 1;
    }

    const difference =
      end.getTime() -
      start.getTime();

    const nights = Math.ceil(
      difference /
        (1000 * 60 * 60 * 24)
    );

    return nights > 0 ? nights : 1;
  }, [checkIn, checkOut]);

  const accommodationTotal =
    nightlyPrice * numberOfNights;

  const total =
    accommodationTotal + serviceFee;

  const maximumGuests =
    Number(stay.guests) || 1;

  /* =======================================================
     WISHLIST
  ======================================================= */

  function toggleWishlist() {
    const next = !wishlisted;

    setWishlisted(next);

    try {
      localStorage.setItem(
        `vistara-wishlist-${stay.id}`,
        String(next)
      );
    } catch {
      // ignore
    }
  }

  /* =======================================================
     REVIEW
  ======================================================= */

  function submitReview() {
    if (!reviewText.trim()) {
      return;
    }

    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: "You",
      rating: reviewRating,
      comment: reviewText.trim(),
      date: "Just now",
    };

    const updated = [
      newReview,
      ...reviews,
    ];

    setReviews(updated);
    setReviewText("");
    setReviewRating(5);

    try {
      localStorage.setItem(
        `vistara-reviews-${stay.id}`,
        JSON.stringify(updated)
      );
    } catch {
      // ignore
    }
  }

  /* =======================================================
     SHARE
  ======================================================= */

  async function shareStay() {
    const url = window.location.href;

    try {
      if (
        typeof navigator !== "undefined" &&
        navigator.share
      ) {
        await navigator.share({
          title: stay.title,
          text: `Check out ${stay.title} on Vistara.`,
          url,
        });

        return;
      }

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      }
    } catch {
      // user cancelled share
    }
  }

  /* =======================================================
     OPEN BOOKING POPUP
  ======================================================= */

  function openBookingPopup() {
    if (!checkIn || !checkOut) {
      alert(
        "Please select check-in and check-out dates."
      );
      return;
    }

    if (checkOut <= checkIn) {
      alert(
        "Check-out must be after check-in."
      );
      return;
    }

    if (
      guests < 1 ||
      guests > maximumGuests
    ) {
      alert(
        `Guests must be between 1 and ${maximumGuests}.`
      );
      return;
    }

    setBookingPopup(true);
  }

  /* =======================================================
     CONTINUE TO BOOKING PAGE
  ======================================================= */

  function continueToBooking() {
    /*
     * We intentionally DO NOT call /api/bookings here.
     *
     * This page only prepares the booking.
     *
     * The actual booking page will create the booking.
     */

    const query =
      new URLSearchParams({
        stayId: String(stay.id),
        stayTitle: stay.title,
        checkIn,
        checkOut,
        guests: String(guests),
      });

    setBookingPopup(false);

    router.push(
      `/bookings?${query.toString()}`
    );
  }

  /* =======================================================
     MAP
  ======================================================= */

  const mapQuery = encodeURIComponent(
    `${stay.location}, ${stay.city}, ${stay.country}`
  );

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-6 lg:px-8">

        {/* =================================================
            TOP BAR
        ================================================= */}

        <div className="mb-5 flex items-center justify-between">

          <Link
            href="/stays"
            className="flex items-center gap-2 text-sm font-semibold text-black/55 transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to stays
          </Link>

          <button
            type="button"
            onClick={toggleWishlist}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              wishlisted
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white text-black hover:border-black"
            }`}
          >
            <Heart
              size={16}
              fill={
                wishlisted
                  ? "currentColor"
                  : "none"
              }
            />

            {wishlisted
              ? "Saved"
              : "Wishlist"}
          </button>

        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div>

            {/* HERO */}

            <div className="relative overflow-hidden rounded-3xl bg-neutral-100">

              <img
                src={stay.image}
                alt={stay.title}
                className="h-80 w-full object-cover sm:h-[430px] lg:h-[500px]"
              />

              {stay.verified && (
                <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-black shadow-sm">
                  <ShieldCheck size={13} />
                  Verified stay
                </div>
              )}

            </div>

            {/* TITLE */}

            <div className="border-b border-black/10 py-7">

              <div className="flex items-start justify-between gap-5">

                <div>

                  <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                    {stay.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-black/55">

                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {stay.location}
                    </span>

                    <span className="flex items-center gap-1.5 font-bold text-black">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      {Number(
                        stay.rating || 0
                      ).toFixed(1)}
                    </span>

                    <span>
                      {reviews.length} reviews
                    </span>

                  </div>

                </div>

                <button
                  type="button"
                  onClick={toggleWishlist}
                  className={`hidden rounded-full border p-3 transition sm:flex ${
                    wishlisted
                      ? "border-black bg-black text-white"
                      : "border-black/10 hover:bg-black hover:text-white"
                  }`}
                >
                  <Heart
                    size={18}
                    fill={
                      wishlisted
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>

              </div>

            </div>

            {/* ABOUT */}

            <section className="border-b border-black/10 py-8">

              <SectionLabel>
                About this stay
              </SectionLabel>

              <h2 className="mt-2 text-xl font-black">
                A comfortable place to call your own
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-black/55">
                {stay.title} is a thoughtfully
                selected Vistara stay in{" "}
                {stay.location}. Enjoy a
                comfortable space, convenient
                location and everything you need
                for a relaxed stay in{" "}
                {stay.city}.
              </p>

            </section>

            {/* PROPERTY DETAILS */}

            <section className="border-b border-black/10 py-8">

              <SectionLabel>
                Property details
              </SectionLabel>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">

                <InfoCard
                  icon={Home}
                  label="Property"
                  value="Entire stay"
                />

                <InfoCard
                  icon={Users}
                  label="Guests"
                  value={`Up to ${maximumGuests}`}
                />

                <InfoCard
                  icon={BedDouble}
                  label="Bedrooms"
                  value="2 bedrooms"
                />

                <InfoCard
                  icon={Bath}
                  label="Bathrooms"
                  value="2 bathrooms"
                />

              </div>

            </section>

            {/* AMENITIES */}

            <section className="border-b border-black/10 py-8">

              <SectionLabel>
                Amenities
              </SectionLabel>

              <h2 className="mt-2 text-xl font-black">
                What this place offers
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {amenities.map(
                  (amenity) => {
                    const Icon =
                      amenity.icon;

                    return (
                      <div
                        key={amenity.name}
                        className="flex items-center gap-3 rounded-xl border border-black/10 px-4 py-3.5 transition hover:bg-neutral-50"
                      >
                        <Icon
                          size={18}
                          strokeWidth={1.7}
                        />

                        <span className="text-sm font-semibold text-black/70">
                          {amenity.name}
                        </span>

                        <Check
                          size={14}
                          className="ml-auto text-black/50"
                        />
                      </div>
                    );
                  }
                )}

              </div>

            </section>

            {/* STAY DETAILS */}

            <section className="border-b border-black/10 py-8">

              <SectionLabel>
                Stay details
              </SectionLabel>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                <DetailCard
                  icon={Clock}
                  label="Check-in"
                  value="After 2:00 PM"
                />

                <DetailCard
                  icon={Clock}
                  label="Check-out"
                  value="Before 11:00 AM"
                />

                <DetailCard
                  icon={Users}
                  label="Maximum guests"
                  value={`${maximumGuests} guests`}
                />

                <DetailCard
                  icon={Home}
                  label="Property type"
                  value="Private stay"
                />

              </div>

            </section>

            {/* HOST */}

            <section className="border-b border-black/10 py-8">

              <SectionLabel>
                Your host
              </SectionLabel>

              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-black/10 p-5 sm:flex-row sm:items-center">

                <img
                  src="/profile.jpg"
                  alt="Host profile"
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-black">
                    Vistara Host
                  </h3>

                  <p className="mt-1 text-sm text-black/50">
                    Hosting on Vistara
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-xs text-black/55">

                    <span className="flex items-center gap-1">
                      <Star
                        size={13}
                        fill="currentColor"
                      />
                      4.9 rating
                    </span>

                    <span>•</span>

                    <span>
                      Experienced host
                    </span>

                  </div>

                </div>

                <Link
                  href={`/host/${stay.id}`}
                  className="rounded-xl border border-black px-4 py-2.5 text-center text-sm font-bold transition hover:bg-black hover:text-white"
                >
                  View profile
                </Link>

              </div>

            </section>

            {/* LOCATION */}

            <section className="border-b border-black/10 py-8">

              <SectionLabel>
                Location
              </SectionLabel>

              <h2 className="mt-2 text-xl font-black">
                Where you'll be
              </h2>

              <p className="mt-2 text-sm text-black/55">
                {stay.location},{" "}
                {stay.city}
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-black/10">

                <iframe
                  title={`${stay.title} location map`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-[300px] w-full border-0 sm:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>

            </section>

            {/* REVIEWS */}

            <section className="py-8">

              <div className="flex items-end justify-between gap-4">

                <div>

                  <SectionLabel>
                    Guest reviews
                  </SectionLabel>

                  <h2 className="mt-2 text-xl font-black">
                    What guests say
                  </h2>

                </div>

                <div className="flex items-center gap-1 text-sm font-bold">
                  <Star
                    size={15}
                    fill="currentColor"
                  />
                  {Number(
                    stay.rating || 0
                  ).toFixed(1)}
                </div>

              </div>

              <div className="mt-5 space-y-3">

                {reviews.map(
                  (review) => (
                    <article
                      key={review.id}
                      className="rounded-2xl border border-black/10 p-5"
                    >

                      <div className="flex items-start justify-between gap-4">

                        <div>

                          <h3 className="text-sm font-bold">
                            {review.name}
                          </h3>

                          <p className="mt-1 text-xs text-black/35">
                            {review.date}
                          </p>

                        </div>

                        <span className="flex items-center gap-1 text-xs font-bold">
                          <Star
                            size={12}
                            fill="currentColor"
                          />
                          {review.rating.toFixed(1)}
                        </span>

                      </div>

                      <p className="mt-3 text-sm leading-6 text-black/60">
                        {review.comment}
                      </p>

                    </article>
                  )
                )}

              </div>

              {/* REVIEW FORM */}

              <div className="mt-5 rounded-2xl bg-neutral-100 p-5">

                <div className="flex items-center gap-2">

                  <MessageCircle size={17} />

                  <h3 className="text-sm font-bold">
                    Leave a review
                  </h3>

                </div>

                <div className="mt-4 flex gap-1">

                  {[1, 2, 3, 4, 5].map(
                    (number) => (
                      <button
                        key={number}
                        type="button"
                        onClick={() =>
                          setReviewRating(
                            number
                          )
                        }
                        className="p-1"
                      >
                        <Star
                          size={18}
                          fill={
                            number <=
                            reviewRating
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    )
                  )}

                </div>

                <textarea
                  value={reviewText}
                  onChange={(event) =>
                    setReviewText(
                      event.target.value
                    )
                  }
                  rows={4}
                  placeholder="Share your experience..."
                  className="mt-3 w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <button
                  type="button"
                  onClick={submitReview}
                  disabled={!reviewText.trim()}
                  className="mt-3 rounded-xl bg-black px-5 py-2.5 text-sm font-bold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Submit review
                </button>

              </div>

            </section>

          </div>

          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="rounded-3xl border border-black/10 bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-6">

              {/* PRICE */}

              <div className="flex items-center justify-between border-b border-black/10 pb-5">

                <div>

                  <span className="text-2xl font-black">
                    ₹
                    {nightlyPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                  <span className="ml-1 text-sm text-black/45">
                    / night
                  </span>

                </div>

                <span className="flex items-center gap-1 text-sm font-bold">
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  {Number(
                    stay.rating || 0
                  ).toFixed(1)}
                </span>

              </div>

              {/* DATES */}

              <div className="relative mt-5 grid grid-cols-2 overflow-visible rounded-2xl border border-black/10">

                <DateField
                  label="Check in"
                  value={checkIn}
                  onChange={setCheckIn}
                />

                <DateField
                  label="Check out"
                  value={checkOut}
                  onChange={setCheckOut}
                  min={checkIn || undefined}
                />

              </div>

              {/* GUESTS */}

              <div className="mt-3 rounded-2xl border border-black/10 p-4">

                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-black/45">
                  Guests
                </p>

                <div className="mt-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">

                    <Users size={17} />

                    <span className="text-sm font-semibold">
                      {guests}{" "}
                      {guests === 1
                        ? "guest"
                        : "guests"}
                    </span>

                  </div>

                  <div className="flex items-center gap-2">

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
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg transition hover:bg-black hover:text-white"
                    >
                      −
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setGuests(
                          Math.min(
                            maximumGuests,
                            guests + 1
                          )
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-black/15 text-lg transition hover:bg-black hover:text-white"
                    >
                      +
                    </button>

                  </div>

                </div>

                <p className="mt-2 text-[11px] text-black/40">
                  Up to {maximumGuests} guests
                </p>

              </div>

              {/* RESERVE */}

              <button
                type="button"
                onClick={openBookingPopup}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                Reserve this stay
              </button>

              <p className="mt-3 text-center text-[11px] text-black/40">
                You will review your booking before confirming.
              </p>

              {/* PRICE */}

              <div className="mt-5 space-y-3 border-t border-black/10 pt-5 text-sm">

                <div className="flex justify-between">

                  <span className="text-black/50">
                    ₹
                    {nightlyPrice.toLocaleString(
                      "en-IN"
                    )}{" "}
                    × {numberOfNights}{" "}
                    {numberOfNights === 1
                      ? "night"
                      : "nights"}
                  </span>

                  <span>
                    ₹
                    {accommodationTotal.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="flex justify-between">

                  <span className="text-black/50">
                    Service fee
                  </span>

                  <span>
                    ₹
                    {serviceFee.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <div className="flex justify-between border-t border-black/10 pt-4 font-bold">

                  <span>Total</span>

                  <span>
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

            </div>

            {/* SHARE */}

            <button
              type="button"
              onClick={shareStay}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-3 text-sm font-bold transition hover:bg-black hover:text-white"
            >
              <Share2 size={15} />
              Share this stay
            </button>

          </aside>

        </div>

      </div>

      <Footer />

      {/* =====================================================
          BOOKING POPUP
      ===================================================== */}

      {bookingPopup && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="max-h-[92vh] w-full max-w-[500px] overflow-y-auto rounded-[28px] bg-white shadow-2xl">

            {/* HEADER */}

            <div className="relative bg-black px-6 py-7 text-white">

              <button
                type="button"
                onClick={() =>
                  setBookingPopup(false)
                }
                className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 transition hover:bg-white/20"
              >
                <X size={18} />
              </button>

              <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-white/45">
                VISTARA STAY
              </p>

              <h2 className="mt-2 text-2xl font-black">
                Review your booking
              </h2>

              <p className="mt-2 text-xs text-white/50">
                Check your stay details before continuing.
              </p>

            </div>

            {/* BODY */}

            <div className="p-6">

              {/* STAY */}

              <div className="rounded-2xl border border-black/10 p-4">

                <div className="flex gap-4">

                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="h-20 w-20 shrink-0 rounded-xl object-cover"
                  />

                  <div className="min-w-0">

                    <p className="text-[8px] font-bold uppercase tracking-[0.16em] text-black/35">
                      Stay
                    </p>

                    <h3 className="mt-1 text-sm font-black">
                      {stay.title}
                    </h3>

                    <p className="mt-1 text-xs text-black/45">
                      {stay.location},{" "}
                      {stay.city}
                    </p>

                  </div>

                </div>

              </div>

              {/* BOOKING DETAILS */}

              <div className="mt-3 grid grid-cols-2 gap-2">

                <ModalInfo
                  label="Check-in"
                  value={checkIn}
                />

                <ModalInfo
                  label="Check-out"
                  value={checkOut}
                />

                <ModalInfo
                  label="Guests"
                  value={`${guests} ${
                    guests === 1
                      ? "Guest"
                      : "Guests"
                  }`}
                />

                <ModalInfo
                  label="Nights"
                  value={`${numberOfNights} ${
                    numberOfNights === 1
                      ? "Night"
                      : "Nights"
                  }`}
                />

              </div>

              {/* TOTAL */}

              <div className="mt-3 rounded-2xl bg-black p-4 text-white">

                <div className="flex items-center justify-between">

                  <span className="text-xs text-white/50">
                    Total
                  </span>

                  <span className="text-lg font-black">
                    ₹
                    {total.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

                <p className="mt-2 text-[9px] text-white/35">
                  No payment required at this MVP stage.
                </p>

              </div>

              {/* CONTINUE */}

              <button
                type="button"
                onClick={continueToBooking}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white transition hover:bg-neutral-800"
              >
                Continue to booking
              </button>

              <button
                type="button"
                onClick={() =>
                  setBookingPopup(false)
                }
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-black/10 bg-white px-5 py-3.5 text-sm font-bold transition hover:border-black"
              >
                Go back
              </button>

            </div>

          </div>

        </div>
      )}

    </main>
  );
}

/* =========================================================
   DATE FIELD
========================================================= */

function DateField({
  label,
  value,
  onChange,
  min,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  min?: string;
}) {
  return (
    <div className="border-r border-black/10 p-3 last:border-r-0">

      <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-black/45">
        {label}
      </label>

      <div className="mt-1">

        <CompactCalendar
          value={value}
          onChange={onChange}
          minDate={min}
        />

      </div>

    </div>
  );
}

/* =========================================================
   SECTION LABEL
========================================================= */

function SectionLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/40">
      {children}
    </p>
  );
}

/* =========================================================
   INFO CARD
========================================================= */

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/10 p-4">

      <Icon
        size={18}
        strokeWidth={1.7}
      />

      <p className="mt-3 text-[10px] text-black/40">
        {label}
      </p>

      <p className="mt-1 text-sm font-bold">
        {value}
      </p>

    </div>
  );
}

/* =========================================================
   DETAIL CARD
========================================================= */

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/10 p-4">

      <Icon
        size={18}
        strokeWidth={1.7}
      />

      <div>

        <p className="text-xs text-black/40">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================================================
   MODAL INFO
========================================================= */

function ModalInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-neutral-100 p-3">

      <p className="text-[8px] font-bold uppercase tracking-[0.12em] text-black/35">
        {label}
      </p>

      <p className="mt-1 text-xs font-black">
        {value || "—"}
      </p>

    </div>
  );
}