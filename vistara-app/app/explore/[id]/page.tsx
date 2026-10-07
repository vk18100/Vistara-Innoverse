"use client";

import {
  use,
  useEffect,
  useMemo,
  useState,
  type ElementType,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  ArrowLeft,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Check,
  Clock,
  Compass,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Star,
  Users,
  Camera,
  Utensils,
  X,
} from "lucide-react";

import Navbar from "@/components/navbar";
import { experiences } from "@/data/explore";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

type ExploreItem = (typeof experiences)[number];

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const MAX_GUESTS = 10;

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Priya",
    rating: 5,
    comment:
      "A wonderful local experience. It showed us places we would never have found ourselves.",
    date: "Recently",
  },
  {
    id: "2",
    name: "Rahul",
    rating: 5,
    comment:
      "Really well organised and a great way to understand the local culture.",
    date: "Recently",
  },
];

export default function ExploreIdPage({ params }: Props) {
  const { id } = use(params);

  const explore = experiences.find(
    (item) => String(item.id) === String(id),
  );

  if (!explore) {
    return <ExploreNotFound />;
  }

  return <ExploreDetails explore={explore} />;
}

/* =========================================================
   NOT FOUND
========================================================= */

function ExploreNotFound() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="flex min-h-[70vh] items-center justify-center px-6">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
            VISTARA EXPLORE
          </p>

          <h1 className="mt-3 text-2xl font-semibold">
            Explore not found
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            This Explore option does not exist.
          </p>

          <Link
            href="/explore"
            className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-gray-800"
          >
            Back to Explore
          </Link>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   EXPLORE DETAILS
========================================================= */

function ExploreDetails({
  explore,
}: {
  explore: ExploreItem;
}) {
  const [date, setDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [guests, setGuests] = useState(1);

  const [wishlisted, setWishlisted] = useState(false);

  const [reviews, setReviews] =
    useState<Review[]>(defaultReviews);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  const [bookingPopupOpen, setBookingPopupOpen] =
    useState(false);

  const [bookingLoading, setBookingLoading] =
    useState(false);

  const [bookingError, setBookingError] = useState("");

  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();

    return new Date(
      now.getFullYear(),
      now.getMonth(),
      1,
    );
  });

  /* =========================================================
     LOAD LOCAL DATA
  ========================================================= */

  useEffect(() => {
    const savedWishlist = localStorage.getItem(
      `explore-wishlist-${explore.id}`,
    );

    setWishlisted(savedWishlist === "true");

    const savedReviews = localStorage.getItem(
      `explore-reviews-${explore.id}`,
    );

    if (savedReviews) {
      try {
        const parsed = JSON.parse(savedReviews);

        if (Array.isArray(parsed)) {
          setReviews(parsed);
        }
      } catch {
        setReviews(defaultReviews);
      }
    }
  }, [explore.id]);

  /* =========================================================
     WISHLIST
  ========================================================= */

  const toggleWishlist = () => {
    const nextValue = !wishlisted;

    setWishlisted(nextValue);

    localStorage.setItem(
      `explore-wishlist-${explore.id}`,
      String(nextValue),
    );
  };

  /* =========================================================
     REVIEWS
  ========================================================= */

  const submitReview = () => {
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: Date.now().toString(),
      name: "You",
      rating: reviewRating,
      comment: reviewText.trim(),
      date: "Just now",
    };

    const updatedReviews = [
      newReview,
      ...reviews,
    ];

    setReviews(updatedReviews);

    localStorage.setItem(
      `explore-reviews-${explore.id}`,
      JSON.stringify(updatedReviews),
    );

    setReviewText("");
    setReviewRating(5);
  };

  /* =========================================================
     CALENDAR
  ========================================================= */

  const today = useMemo(() => {
    const value = new Date();

    value.setHours(0, 0, 0, 0);

    return value;
  }, []);

  const daysInMonth = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth() + 1,
    0,
  ).getDate();

  const firstDay = new Date(
    calendarMonth.getFullYear(),
    calendarMonth.getMonth(),
    1,
  ).getDay();

  const calendarDays = Array.from(
    {
      length: firstDay + daysInMonth,
    },
    (_, index) =>
      index < firstDay
        ? null
        : index - firstDay + 1,
  );

  const selectedDate = date
    ? new Date(`${date}T00:00:00`)
    : null;

  const selectDate = (day: number) => {
    const selected = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth(),
      day,
    );

    selected.setHours(0, 0, 0, 0);

    if (selected < today) return;

    const formatted = [
      selected.getFullYear(),
      String(selected.getMonth() + 1).padStart(2, "0"),
      String(selected.getDate()).padStart(2, "0"),
    ].join("-");

    setDate(formatted);
    setCalendarOpen(false);
    setBookingError("");
  };

  const previousMonth = () => {
    const previous = new Date(
      calendarMonth.getFullYear(),
      calendarMonth.getMonth() - 1,
      1,
    );

    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    if (previous >= currentMonth) {
      setCalendarMonth(previous);
    }
  };

  const nextMonth = () => {
    setCalendarMonth(
      new Date(
        calendarMonth.getFullYear(),
        calendarMonth.getMonth() + 1,
        1,
      ),
    );
  };

  const monthName =
    calendarMonth.toLocaleDateString("en-IN", {
      month: "long",
      year: "numeric",
    });

  /* =========================================================
     PRICE
  ========================================================= */

  const subtotal = explore.price * guests;

  const serviceFee = Math.round(
    subtotal * 0.05,
  );

  const total = subtotal + serviceFee;

  /* =========================================================
     BOOKING URL
  ========================================================= */

  const bookingUrl = useMemo(() => {
    const query = new URLSearchParams();

    query.set("bookingType", "EXPLORE");
    query.set(
      "exploreId",
      String(explore.id),
    );
    query.set(
      "exploreName",
      explore.title,
    );
    query.set(
      "price",
      String(explore.price),
    );
    query.set(
      "guests",
      String(guests),
    );
    query.set(
      "subtotal",
      String(subtotal),
    );
    query.set(
      "serviceFee",
      String(serviceFee),
    );
    query.set(
      "total",
      String(total),
    );

    if (date) {
      query.set("date", date);
    }

    return `/bookings?${query.toString()}`;
  }, [
    explore.id,
    explore.title,
    explore.price,
    guests,
    subtotal,
    serviceFee,
    total,
    date,
  ]);

  /* =========================================================
     OPEN BOOKING POPUP
  ========================================================= */

  const openBookingPopup = () => {
    setBookingError("");

    if (!date) {
      setBookingError(
        "Please select a date before continuing.",
      );
      return;
    }

    if (
      guests < 1 ||
      guests > MAX_GUESTS
    ) {
      setBookingError(
        `Guests must be between 1 and ${MAX_GUESTS}.`,
      );
      return;
    }

    setBookingPopupOpen(true);
  };

  /* =========================================================
     CONFIRM EXPLORE
  ========================================================= */

  const confirmExplore = async () => {
    setBookingError("");

    if (!date) {
      setBookingError(
        "Please select a date.",
      );
      return;
    }

    if (
      guests < 1 ||
      guests > MAX_GUESTS
    ) {
      setBookingError(
        `Guests must be between 1 and ${MAX_GUESTS}.`,
      );
      return;
    }

    /*
      IMPORTANT:
      Explore itself is the discovery layer.

      We do NOT create a fake Prisma Booking here.
      The selected Explore information is carried
      into the central booking flow.

      Local Plan remains the unlock layer.
    */

    setBookingLoading(true);

    try {
      /*
        Small delay only for a smooth confirmation state.
        No payment is performed.
      */
      await new Promise((resolve) =>
        setTimeout(resolve, 350),
      );

      window.location.href = bookingUrl;
    } catch (error) {
      console.error(
        "EXPLORE_BOOKING_ERROR:",
        error,
      );

      setBookingError(
        "Unable to continue. Please try again.",
      );

      setBookingLoading(false);
    }
  };

  /* =========================================================
     SHARE
  ========================================================= */

  const shareExplore = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: explore.title,
          text: `Discover ${explore.title} with Vistara.`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href,
        );
      }
    } catch {
      // User cancelled sharing.
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <div className="mx-auto max-w-7xl px-4 pb-20 pt-6 sm:px-6 lg:px-8">

        {/* =================================================
            TOP
        ================================================= */}

        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/explore"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Explore
          </Link>

          <button
            type="button"
            onClick={toggleWishlist}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              wishlisted
                ? "border-black bg-black text-white"
                : "border-gray-300 bg-white text-black hover:border-black"
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
            MAIN
        ================================================= */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div>

            {/* HERO */}

            <div className="relative overflow-hidden rounded-[28px] bg-gray-100">
              <img
                src={explore.image}
                alt={explore.title}
                className="h-80 w-full object-cover sm:h-[450px] lg:h-[510px]"
              />

              <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                <ShieldCheck size={14} />
                Vistara Explore
              </div>
            </div>

            {/* TITLE */}

            <section className="border-b border-gray-200 py-7">
              <div className="flex items-start justify-between gap-5">
                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {explore.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">

                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {explore.location}
                    </span>

                    <span className="flex items-center gap-1.5 font-semibold text-black">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      {explore.rating}
                    </span>

                    <span>
                      {explore.reviews} reviews
                    </span>

                  </div>
                </div>

                <button
                  type="button"
                  onClick={toggleWishlist}
                  className="hidden rounded-full border border-gray-300 p-3 transition hover:border-black sm:flex"
                >
                  <Heart
                    size={19}
                    fill={
                      wishlisted
                        ? "currentColor"
                        : "none"
                    }
                  />
                </button>
              </div>
            </section>

            {/* ABOUT */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                About this Explore
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                Discover this part of the city like a local
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
                {explore.description}
              </p>

              <div className="mt-5 rounded-2xl border border-gray-200 bg-gray-50 p-4">
                <div className="flex gap-3">
                  <Compass
                    size={20}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Explore preview
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-600">
                      {explore.preview}
                    </p>

                    <p className="mt-2 text-xs leading-5 text-gray-500">
                      Exact locations, maps and route
                      details become available after
                      the relevant Local Plan is unlocked.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* DETAILS */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Explore details
              </SmallLabel>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoCard
                  icon={Compass}
                  label="Category"
                  value={explore.category}
                />

                <InfoCard
                  icon={Clock}
                  label="Duration"
                  value={explore.duration}
                />

                <InfoCard
                  icon={MapPin}
                  label="Location"
                  value={explore.city}
                />

                <InfoCard
                  icon={ShieldCheck}
                  label="Status"
                  value="Vistara Explore"
                />
              </div>
            </section>

            {/* HIGHLIGHTS */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Explore highlights
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                What you&apos;ll discover
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {explore.tags.map((tag) => (
                  <div
                    key={tag}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4"
                  >
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                      <Check size={16} />
                    </div>

                    <span className="text-sm font-medium text-gray-700">
                      {tag}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* INTERESTS */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Explore interests
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                This Explore is ideal for
              </h2>

              <div className="mt-5 flex flex-wrap gap-2">
                {explore.interests.map(
                  (interest) => (
                    <span
                      key={interest}
                      className="rounded-full border border-gray-200 px-4 py-2 text-sm text-gray-700"
                    >
                      {interest}
                    </span>
                  ),
                )}
              </div>
            </section>

            {/* INCLUDED */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                What&apos;s included
              </SmallLabel>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <DetailCard
                  icon={Utensils}
                  label="Local discovery"
                  value="Curated local options"
                />

                <DetailCard
                  icon={ShieldCheck}
                  label="Vistara"
                  value="Curated discovery"
                />

                <DetailCard
                  icon={Users}
                  label="Group"
                  value="Flexible guest count"
                />

                <DetailCard
                  icon={Camera}
                  label="Explore"
                  value="Local discovery guidance"
                />
              </div>
            </section>

            {/* LOCATION */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Explore location
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                Explore around {explore.city}
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {explore.location}
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
                <div className="flex h-[280px] flex-col items-center justify-center bg-gray-50 sm:h-[340px]">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-white shadow-sm">
                    <MapPin size={23} />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    {explore.city}
                  </p>

                  <p className="mt-1 max-w-sm px-5 text-center text-xs leading-5 text-gray-500">
                    Approximate area preview only.
                    Exact locations and route details
                    become available after the relevant
                    Local Plan is unlocked.
                  </p>
                </div>
              </div>
            </section>

            {/* REVIEWS */}

            <section className="py-8">
              <div className="flex items-end justify-between">
                <div>
                  <SmallLabel>
                    Guest reviews
                  </SmallLabel>

                  <h2 className="mt-2 text-xl font-semibold">
                    What guests say
                  </h2>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={15}
                    fill="currentColor"
                  />
                  {explore.rating}
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="rounded-2xl bg-gray-50 p-5"
                  >
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map(
                        (star) => (
                          <Star
                            key={star}
                            size={13}
                            fill={
                              star <=
                              Math.round(
                                review.rating,
                              )
                                ? "currentColor"
                                : "none"
                            }
                          />
                        ),
                      )}
                    </div>

                    <p className="mt-4 text-sm leading-6 text-gray-700">
                      &quot;{review.comment}&quot;
                    </p>

                    <p className="mt-4 text-xs font-semibold">
                      {review.name} · Guest
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      {review.date}
                    </p>
                  </div>
                ))}
              </div>

              {/* WRITE REVIEW */}

              <div className="mt-5 rounded-2xl border border-gray-200 p-5">
                <div className="flex items-center gap-2">
                  <MessageCircle size={17} />

                  <h3 className="text-sm font-semibold">
                    Share your experience
                  </h3>
                </div>

                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map(
                    (star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewRating(star)
                        }
                        className="p-1"
                      >
                        <Star
                          size={17}
                          fill={
                            star <= reviewRating
                              ? "currentColor"
                              : "none"
                          }
                        />
                      </button>
                    ),
                  )}
                </div>

                <textarea
                  value={reviewText}
                  onChange={(event) =>
                    setReviewText(
                      event.target.value,
                    )
                  }
                  placeholder="Write about your Explore..."
                  className="mt-3 min-h-25 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-black"
                />

                <button
                  type="button"
                  onClick={submitReview}
                  className="mt-3 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-gray-800"
                >
                  Submit Review
                </button>
              </div>
            </section>
          </div>

          {/* =================================================
              BOOKING CARD
          ================================================= */}

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-gray-200 bg-white p-7 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">

              {/* PRICE */}

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">
                    ₹
                    {explore.price.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                  <span className="ml-1 text-sm text-gray-500">
                    / person
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  {explore.rating}
                </div>
              </div>

              {/* DATE */}

              <div className="mt-6 rounded-2xl border border-gray-200 p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Date
                </p>

                <div className="relative mt-2">
                  <button
                    type="button"
                    onClick={() =>
                      setCalendarOpen(
                        (open) => !open,
                      )
                    }
                    className="flex w-full items-center gap-2 text-left"
                  >
                    <CalendarDays size={17} />

                    <span
                      className={`flex-1 text-sm ${
                        date
                          ? "text-black"
                          : "text-gray-400"
                      }`}
                    >
                      {selectedDate
                        ? selectedDate.toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            },
                          )
                        : "Select date"}
                    </span>

                    {calendarOpen ? (
                      <ChevronLeft
                        size={15}
                        className="-rotate-90"
                      />
                    ) : (
                      <ChevronRight
                        size={15}
                        className="rotate-90"
                      />
                    )}
                  </button>

                  {/* CALENDAR */}

                  {calendarOpen && (
                    <div className="absolute left-0 top-full z-50 mt-3 w-full min-w-75 rounded-2xl border border-gray-200 bg-white p-4 shadow-[0_12px_35px_rgba(0,0,0,0.12)]">

                      <div className="mb-4 flex items-center justify-between">
                        <button
                          type="button"
                          onClick={previousMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <ChevronLeft size={16} />
                        </button>

                        <p className="text-sm font-semibold">
                          {monthName}
                        </p>

                        <button
                          type="button"
                          onClick={nextMonth}
                          className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-100"
                        >
                          <ChevronRight size={16} />
                        </button>
                      </div>

                      <div className="mb-2 grid grid-cols-7 text-center">
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
                            <div
                              key={`${day}-${index}`}
                              className="py-2 text-[10px] font-semibold text-gray-400"
                            >
                              {day}
                            </div>
                          ),
                        )}
                      </div>

                      <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map(
                          (day, index) => {
                            if (!day) {
                              return (
                                <div
                                  key={`empty-${index}`}
                                />
                              );
                            }

                            const currentDate =
                              new Date(
                                calendarMonth.getFullYear(),
                                calendarMonth.getMonth(),
                                day,
                              );

                            currentDate.setHours(
                              0,
                              0,
                              0,
                              0,
                            );

                            const isPast =
                              currentDate < today;

                            const isSelected =
                              selectedDate !== null &&
                              currentDate.getTime() ===
                                selectedDate.getTime();

                            const isToday =
                              currentDate.getTime() ===
                              today.getTime();

                            return (
                              <button
                                key={day}
                                type="button"
                                disabled={isPast}
                                onClick={() =>
                                  selectDate(day)
                                }
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs transition ${
                                  isPast
                                    ? "cursor-not-allowed text-gray-300"
                                    : "text-black hover:bg-black hover:text-white"
                                } ${
                                  isSelected
                                    ? "bg-black text-white"
                                    : ""
                                } ${
                                  isToday &&
                                  !isSelected
                                    ? "font-bold ring-1 ring-black"
                                    : ""
                                }`}
                              >
                                {day}
                              </button>
                            );
                          },
                        )}
                      </div>

                      {date && (
                        <button
                          type="button"
                          onClick={() => {
                            setDate("");
                            setCalendarOpen(false);
                          }}
                          className="mt-4 w-full border-t border-gray-200 pt-3 text-left text-xs font-medium hover:underline"
                        >
                          Clear date
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* GUESTS */}

              <div className="mt-3 rounded-2xl border border-gray-200 p-4">
                <p className="text-[9px] font-bold uppercase tracking-widest text-gray-500">
                  Guests
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users size={17} />

                    <span className="text-sm font-medium">
                      {guests}{" "}
                      {guests === 1
                        ? "guest"
                        : "guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={guests <= 1}
                      onClick={() =>
                        setGuests(
                          Math.max(
                            1,
                            guests - 1,
                          ),
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg disabled:opacity-40"
                    >
                      −
                    </button>

                    <button
                      type="button"
                      disabled={
                        guests >= MAX_GUESTS
                      }
                      onClick={() =>
                        setGuests(
                          Math.min(
                            MAX_GUESTS,
                            guests + 1,
                          ),
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg disabled:opacity-40"
                    >
                      +
                    </button>
                  </div>
                </div>

                <p className="mt-2 text-[11px] text-gray-500">
                  Up to {MAX_GUESTS} guests
                </p>
              </div>

              {/* ERROR */}

              {bookingError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {bookingError}
                </div>
              )}

              {/* BOOK NOW */}

              <button
                type="button"
                onClick={openBookingPopup}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800"
              >
                Book Now ↗
              </button>

              <p className="mt-3 text-center text-[11px] text-gray-500">
                No payment is required for this MVP.
              </p>

              {/* PRICE */}

              <div className="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    ₹
                    {explore.price.toLocaleString(
                      "en-IN",
                    )}{" "}
                    × {guests}{" "}
                    {guests === 1
                      ? "guest"
                      : "guests"}
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-600">
                    Service fee
                  </span>

                  <span>
                    ₹
                    {serviceFee.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>

                    <span>
                      ₹
                      {total.toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* SHARE */}

            <button
              type="button"
              onClick={shareExplore}
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold transition hover:bg-gray-50"
            >
              <Share2 size={16} />
              Share this Explore
            </button>
          </aside>
        </div>
      </div>

      {/* =====================================================
          BOOKING CONFIRMATION POPUP
      ===================================================== */}

      {bookingPopupOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[28px] bg-white shadow-2xl">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => {
                if (!bookingLoading) {
                  setBookingPopupOpen(false);
                  setBookingError("");
                }
              }}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black text-white transition hover:bg-gray-800"
            >
              <X size={17} />
            </button>

            {/* HEADER */}

            <div className="bg-black px-6 pb-7 pt-10 text-center text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                <Compass size={28} />
              </div>

              <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.3em] text-gray-400">
                VISTARA EXPLORE
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Ready to explore?
              </h2>

              <p className="mt-2 text-sm text-gray-400">
                Review your Explore selection before continuing.
              </p>
            </div>

            {/* CONTENT */}

            <div className="p-6">

              {/* EXPLORE */}

              <div className="flex gap-4 rounded-2xl border border-gray-200 p-4">
                <img
                  src={explore.image}
                  alt={explore.title}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
                    Explore
                  </p>

                  <h3 className="mt-1 truncate text-lg font-semibold">
                    {explore.title}
                  </h3>

                  <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                    <MapPin size={14} />
                    {explore.location}
                  </div>
                </div>
              </div>

              {/* DETAILS */}

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    Date
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {selectedDate
                      ? selectedDate.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "Not selected"}
                  </p>
                </div>

                <div className="rounded-xl bg-gray-50 p-4">
                  <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                    Guests
                  </p>

                  <p className="mt-2 text-sm font-semibold">
                    {guests}{" "}
                    {guests === 1
                      ? "Guest"
                      : "Guests"}
                  </p>
                </div>
              </div>

              {/* PRICE */}

              <div className="mt-4 rounded-2xl border border-gray-200 p-5">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">
                    Explore
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm">
                  <span className="text-gray-600">
                    Service fee
                  </span>

                  <span>
                    ₹
                    {serviceFee.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="mt-4 border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">
                      Total
                    </span>

                    <span className="text-xl font-bold">
                      ₹
                      {total.toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>
                </div>
              </div>

              {/* ARCHITECTURE NOTE */}

              <div className="mt-4 rounded-2xl bg-gray-50 p-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Explore preview
                    </p>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                      Exact locations, maps, directions
                      and route details are unlocked
                      through the relevant Local Plan.
                    </p>
                  </div>
                </div>
              </div>

              {/* ERROR */}

              {bookingError && (
                <div className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                  {bookingError}
                </div>
              )}

              {/* ACTION */}

              <button
                type="button"
                onClick={confirmExplore}
                disabled={bookingLoading}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {bookingLoading
                  ? "Opening booking..."
                  : "Continue to Booking"}
              </button>

              <button
                type="button"
                disabled={bookingLoading}
                onClick={() => {
                  setBookingPopupOpen(false);
                  setBookingError("");
                }}
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold transition hover:bg-gray-50 disabled:opacity-50"
              >
                Continue Exploring
              </button>

              <p className="mt-4 text-center text-[11px] text-gray-400">
                No payment is required for this MVP.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-gray-200">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-4 py-8 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="text-lg font-semibold">
              Vistara
            </p>

            <p className="mt-1 text-xs text-gray-500">
              Discover places. Create memories.
            </p>
          </div>

          <p className="text-xs text-gray-500">
            © {new Date().getFullYear()} Vistara
          </p>
        </div>
      </footer>
    </main>
  );
}

/* =========================================================
   SMALL LABEL
========================================================= */

function SmallLabel({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
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
    <div className="rounded-xl border border-gray-200 p-4">
      <Icon
        size={18}
        strokeWidth={1.7}
      />

      <p className="mt-3 text-[10px] uppercase tracking-widest text-gray-500">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
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
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4">
      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-100">
        <Icon
          size={18}
          strokeWidth={1.7}
        />
      </div>

      <div>
        <p className="text-[10px] uppercase tracking-widest text-gray-500">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}