"use client";

import { use, useEffect, useMemo, useState, type ElementType, type ReactNode } from "react";
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
import Footer from "@/app/footer/page";
import { experiences } from "@/data/experience";

type ExperiencePageProps = {
  params: Promise<{ id: string }>;
};

type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

const defaultReviews: Review[] = [
  {
    id: "1",
    name: "Priya",
    rating: 5,
    comment:
      "A wonderful local experience. The host was friendly and showed us places we would never have found ourselves.",
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

export default function ExperienceDetailsPage({
  params,
}: ExperiencePageProps) {
  const { id } = use(params);

  const foundExperience = experiences.find(
    (item) => String(item.id) === String(id),
  );

  if (!foundExperience) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-gray-400">
              VISTARA EXPERIENCE
            </p>

            <h1 className="mt-3 text-2xl font-semibold">
              Experience not found
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              This experience does not exist.
            </p>

            <Link
              href="/experiences"
              className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white hover:bg-gray-800"
            >
              Back to Experiences
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  return <ExperienceDetails experience={foundExperience} />;
}

function ExperienceDetails({
  experience,
}: {
  experience: (typeof experiences)[number];
}) {
  const [date, setDate] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

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

  const maxGuests =
    Number(
      (
        experience as unknown as {
          guests?: number;
        }
      ).guests,
    ) || 10;

  /* =====================================================
     LOCAL UI STATE
  ===================================================== */

  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem(
        `experience-wishlist-${experience.id}`,
      );

      setWishlisted(savedWishlist === "true");

      const savedReviews = localStorage.getItem(
        `experience-reviews-${experience.id}`,
      );

      if (savedReviews) {
        const parsed = JSON.parse(savedReviews);

        if (Array.isArray(parsed)) {
          setReviews(parsed);
        }
      }
    } catch (error) {
      console.error(
        "EXPERIENCE_STORAGE_ERROR:",
        error,
      );
    }
  }, [experience.id]);

  /* =====================================================
     WISHLIST
  ===================================================== */

  const toggleWishlist = () => {
    const nextValue = !wishlisted;

    setWishlisted(nextValue);

    localStorage.setItem(
      `experience-wishlist-${experience.id}`,
      String(nextValue),
    );
  };

  /* =====================================================
     REVIEWS
  ===================================================== */

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
      `experience-reviews-${experience.id}`,
      JSON.stringify(updatedReviews),
    );

    setReviewText("");
    setReviewRating(5);
  };

  /* =====================================================
     CALENDAR
  ===================================================== */

  const today = useMemo(() => {
    const now = new Date();
    now.setHours(0, 0, 0, 0);
    return now;
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

  /* =====================================================
     PRICE
  ===================================================== */

  const subtotal =
    experience.price * guests;

  const serviceFee = Math.round(
    subtotal * 0.05,
  );

  const total = subtotal + serviceFee;

  /* =====================================================
     CENTRAL BOOKING URL
  ===================================================== */

  const bookingUrl = useMemo(() => {
    const query = new URLSearchParams();

    query.set("bookingType", "EXPERIENCE");
    query.set(
      "experienceId",
      String(experience.id),
    );
    query.set(
      "experienceName",
      experience.title,
    );
    query.set(
      "price",
      String(experience.price),
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
    experience.id,
    experience.title,
    experience.price,
    guests,
    subtotal,
    serviceFee,
    total,
    date,
  ]);

  /* =====================================================
     BOOK BUTTON
  ===================================================== */

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
      guests > maxGuests
    ) {
      setBookingError(
        `Maximum ${maxGuests} guests allowed.`,
      );
      return;
    }

    setBookingPopupOpen(true);
  };

  /* =====================================================
     CONTINUE TO CENTRAL BOOKING
  ===================================================== */

  const continueToBooking = async () => {
    if (!date) {
      setBookingError("Please select a date.");
      return;
    }

    setBookingError("");
    setBookingLoading(true);

    try {
      await new Promise((resolve) =>
        setTimeout(resolve, 250),
      );

      window.location.href = bookingUrl;
    } catch (error) {
      console.error(
        "EXPERIENCE_BOOKING_ERROR:",
        error,
      );

      setBookingError(
        "Unable to continue to booking.",
      );

      setBookingLoading(false);
    }
  };

  /* =====================================================
     SHARE
  ===================================================== */

  const shareExperience = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: experience.title,
          text: `Discover ${experience.title} with Vistara.`,
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

        {/* TOP */}

        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/experiences"
            className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to Experiences
          </Link>

          <button
            type="button"
            onClick={toggleWishlist}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
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

        {/* MAIN GRID */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">

          {/* LEFT */}

          <div>

            {/* HERO */}

            <div className="relative overflow-hidden rounded-[28px] bg-gray-100">
              <img
                src={experience.image}
                alt={experience.title}
                className="h-80 w-full object-cover sm:h-[430px] lg:h-[500px]"
              />

              <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest shadow-sm">
                <ShieldCheck size={14} />
                Verified Experience
              </div>
            </div>

            {/* TITLE */}

            <section className="border-b border-gray-200 py-7">
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                {experience.title}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-gray-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={15} />
                  {experience.location},{" "}
                  {experience.city}
                </span>

                <span className="flex items-center gap-1.5 font-semibold text-black">
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  {experience.rating}
                </span>

                <span>
                  {reviews.length} reviews
                </span>
              </div>
            </section>

            {/* ABOUT */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                About this experience
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                Discover the destination like a local
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-gray-600">
                {experience.description}
              </p>
            </section>

            {/* DETAILS */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Experience details
              </SmallLabel>

              <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                <InfoCard
                  icon={Compass}
                  label="Category"
                  value={experience.category}
                />

                <InfoCard
                  icon={Clock}
                  label="Duration"
                  value={experience.duration}
                />

                <InfoCard
                  icon={Users}
                  label="Guests"
                  value={`Up to ${maxGuests}`}
                />

                <InfoCard
                  icon={ShieldCheck}
                  label="Status"
                  value="Verified"
                />
              </div>
            </section>

            {/* HIGHLIGHTS */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Highlights
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                What you&apos;ll experience
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {experience.highlights.map(
                  (highlight) => (
                    <div
                      key={highlight}
                      className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-4"
                    >
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-100">
                        <Check size={16} />
                      </div>

                      <span className="text-sm font-medium text-gray-700">
                        {highlight}
                      </span>
                    </div>
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
                  label="Local experience"
                  value="Curated activity"
                />

                <DetailCard
                  icon={ShieldCheck}
                  label="Verified host"
                  value="Vistara verified"
                />

                <DetailCard
                  icon={Users}
                  label="Group size"
                  value={`Up to ${maxGuests} guests`}
                />

                <DetailCard
                  icon={Camera}
                  label="Guidance"
                  value="Local host guidance"
                />
              </div>
            </section>

            {/* HOST */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Hosted by
              </SmallLabel>

              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-gray-200 p-5 sm:flex-row sm:items-center">
                <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-lg font-bold text-white">
                  {experience.hostName
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="flex-1">
                  <h3 className="font-semibold">
                    {experience.hostName}
                  </h3>

                  <p className="mt-1 text-sm text-gray-500">
                    Experience host on Vistara
                  </p>

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-gray-500">
                    <span className="flex items-center gap-1">
                      <Star
                        size={13}
                        fill="currentColor"
                      />
                      {experience.rating} rating
                    </span>

                    <span>•</span>

                    <span className="flex items-center gap-1">
                      <ShieldCheck size={13} />
                      Verified host
                    </span>
                  </div>
                </div>

                <Link
                  href={`/host/${experience.hostId}`}
                  className="rounded-xl border border-black px-5 py-2.5 text-center text-sm font-semibold hover:bg-black hover:text-white"
                >
                  View Profile ↗
                </Link>
              </div>
            </section>

            {/* LOCATION */}

            <section className="border-b border-gray-200 py-8">
              <SmallLabel>
                Location
              </SmallLabel>

              <h2 className="mt-2 text-xl font-semibold">
                Where the experience happens
              </h2>

              <p className="mt-2 text-sm text-gray-600">
                {experience.location},{" "}
                {experience.city}
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-gray-200">
                <div className="flex h-70 flex-col items-center justify-center bg-gray-50">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-black text-white">
                    <MapPin size={22} />
                  </div>

                  <p className="mt-4 text-sm font-semibold">
                    {experience.city}
                  </p>

                  <p className="mt-1 px-5 text-center text-xs text-gray-500">
                    Exact meeting location will be
                    shared after booking.
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
                  {experience.rating}
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
                              review.rating
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
                  placeholder="Write about your experience..."
                  className="mt-3 min-h-25 w-full resize-none rounded-xl border border-gray-200 bg-white p-3 text-sm outline-none focus:border-black"
                />

                <button
                  type="button"
                  onClick={submitReview}
                  className="mt-3 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                >
                  Submit Review
                </button>
              </div>
            </section>
          </div>

          {/* RIGHT BOOKING CARD */}

          <aside className="lg:sticky lg:top-24">
            <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">

              {/* PRICE */}

              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xl font-bold">
                    ₹
                    {experience.price.toLocaleString(
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
                  {experience.rating}
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

                  {calendarOpen && (
                    <div className="absolute left-0 top-full z-50 mt-3 w-full min-w-75 rounded-2xl border border-gray-200 bg-white p-4 shadow-xl">

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
                                className={`flex h-9 w-9 items-center justify-center rounded-full text-xs ${
                                  isPast
                                    ? "cursor-not-allowed text-gray-300"
                                    : "text-black hover:bg-gray-100"
                                } ${
                                  isSelected
                                    ? "bg-black text-white hover:bg-black"
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
                          className="mt-4 w-full border-t border-gray-200 pt-3 text-left text-xs font-semibold hover:underline"
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
                        guests >= maxGuests
                      }
                      onClick={() =>
                        setGuests(
                          Math.min(
                            maxGuests,
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
                  Up to {maxGuests} guests
                </p>
              </div>

              {/* ERROR */}

              {bookingError && (
                <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold">
                  {bookingError}
                </div>
              )}

              {/* BOOK */}

              <button
                type="button"
                disabled={bookingLoading}
                onClick={openBookingPopup}
                className="mt-5 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white hover:bg-gray-800 disabled:opacity-50"
              >
                Book Now ↗
              </button>

              <p className="mt-3 text-center text-[11px] text-gray-400">
                No payment required for this MVP.
              </p>

              {/* PRICE */}

              <div className="mt-5 space-y-3 border-t border-gray-200 pt-5 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">
                    ₹
                    {experience.price.toLocaleString(
                      "en-IN",
                    )}{" "}
                    × {guests}
                  </span>

                  <span>
                    ₹
                    {subtotal.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-500">
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
                  <div className="flex justify-between font-bold">
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
              onClick={shareExperience}
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white px-5 py-3.5 text-sm font-semibold hover:border-black"
            >
              <Share2 size={16} />
              Share this Experience
            </button>
          </aside>
        </div>
      </div>

      <Footer />

      {/* =====================================================
          BOOKING POPUP
      ===================================================== */}

      {bookingPopupOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm">

          <div className="relative max-h-[90vh] w-full max-w-md overflow-y-auto rounded-[28px] bg-white shadow-2xl">

            {/* CLOSE */}

            <button
              type="button"
              onClick={() => {
                if (!bookingLoading) {
                  setBookingPopupOpen(false);
                  setBookingError("");
                }
              }}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white"
              aria-label="Close"
            >
              <X size={17} />
            </button>

            {/* HEADER */}

            <div className="bg-black px-6 pb-7 pt-9 text-center text-white">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white text-black">
                <Check size={27} />
              </div>

              <p className="mt-5 text-[9px] font-bold uppercase tracking-[0.3em] text-gray-400">
                VISTARA EXPERIENCE
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Confirm your experience
              </h2>

              <p className="mt-2 text-xs text-gray-400">
                Review your selection before continuing.
              </p>
            </div>

            {/* BODY */}

            <div className="p-6">

              {/* EXPERIENCE */}

              <div className="rounded-2xl border border-gray-200 bg-white p-4">
                <div className="flex gap-4">
                  <img
                    src={experience.image}
                    alt={experience.title}
                    className="h-20 w-20 rounded-xl object-cover"
                  />

                  <div className="min-w-0">
                    <p className="text-[9px] font-bold uppercase tracking-widest text-gray-400">
                      Experience
                    </p>

                    <h3 className="mt-1 truncate text-sm font-bold">
                      {experience.title}
                    </h3>

                    <p className="mt-1 flex items-center gap-1 text-xs text-gray-500">
                      <MapPin size={12} />
                      {experience.city}
                    </p>
                  </div>
                </div>
              </div>

              {/* DATE / GUESTS */}

              <div className="mt-3 grid grid-cols-2 gap-3">
                <ModalInfo
                  label="Date"
                  value={
                    selectedDate
                      ? selectedDate.toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          },
                        )
                      : "Not selected"
                  }
                />

                <ModalInfo
                  label="Guests"
                  value={`${guests} ${
                    guests === 1
                      ? "Guest"
                      : "Guests"
                  }`}
                />
              </div>

              {/* TOTAL */}

              <div className="mt-3 rounded-2xl bg-black p-4 text-white">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">
                    Total
                  </span>

                  <span className="text-xl font-bold">
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <p className="mt-2 text-[9px] text-gray-500">
                  No payment required for this MVP.
                </p>
              </div>

              {/* ERROR */}

              {bookingError && (
                <div className="mt-3 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2.5 text-xs font-semibold">
                  {bookingError}
                </div>
              )}

              {/* CONTINUE */}

              <button
                type="button"
                onClick={continueToBooking}
                disabled={bookingLoading}
                className="mt-4 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-bold text-white hover:bg-gray-800 disabled:opacity-50"
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
                className="mt-2 flex w-full items-center justify-center rounded-xl border border-gray-200 px-5 py-3.5 text-sm font-semibold hover:border-black disabled:opacity-50"
              >
                Continue Exploring
              </button>
            </div>
          </div>
        </div>
      )}
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
    <div className="rounded-xl border border-gray-200 bg-white p-4">
      <Icon size={18} strokeWidth={1.7} />

      <p className="mt-3 text-[9px] uppercase tracking-widest text-gray-400">
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
    <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100">
        <Icon size={18} strokeWidth={1.7} />
      </div>

      <div>
        <p className="text-[9px] uppercase tracking-widest text-gray-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold">
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
    <div className="rounded-xl bg-gray-50 p-3">
      <p className="text-[8px] font-bold uppercase tracking-widest text-gray-400">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold">
        {value}
      </p>
    </div>
  );
}