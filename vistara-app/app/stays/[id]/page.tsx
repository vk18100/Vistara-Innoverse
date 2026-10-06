"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Bath,
  BedDouble,
  CalendarDays,
  Car,
  Check,
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
  Wifi,
  Wind,
  Waves,
  Coffee,
  Clock,
} from "lucide-react";

import { stays } from "@/data/stay";
import CompactCalendar from "@/components/CompactCalendar";
import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
type Review = {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
};

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

const amenities = [
  { name: "Wi-Fi", icon: Wifi },
  { name: "Air conditioning", icon: Wind },
  { name: "Private bathroom", icon: Bath },
  { name: "Free parking", icon: Car },
  { name: "TV", icon: Tv },
  { name: "Breakfast", icon: Coffee },
  { name: "Kitchen", icon: Utensils },
  { name: "Swimming pool", icon: Waves },
];

export default function StayIdPage() {
  const params = useParams();
  const id = params?.id as string;

  const stay = stays.find((item) => item.id === id);

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const [wishlisted, setWishlisted] = useState(false);

  const [reviews, setReviews] =
    useState<Review[]>(initialReviews);

  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);

  useEffect(() => {
    if (!stay) return;

    const savedWishlist = localStorage.getItem(
      `vistara-wishlist-${stay.id}`
    );

    setWishlisted(savedWishlist === "true");

    const savedReviews = localStorage.getItem(
      `vistara-reviews-${stay.id}`
    );

    if (savedReviews) {
      try {
        setReviews(JSON.parse(savedReviews));
      } catch {
        setReviews(initialReviews);
      }
    }
  }, [stay]);

  if (!stay) {
    return (
      <main className="min-h-screen bg-white text-[#111]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-5">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">
              Stay not found
            </h1>

            <p className="mt-2 text-sm text-[#777]">
              This stay does not exist.
            </p>

            <Link
              href="/stays"
              className="mt-6 inline-flex rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white"
            >
              Back to stays
            </Link>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  const stayId = stay.id;

  const nightlyPrice = stay.price;
  const serviceFee = Math.round(nightlyPrice * 0.05);
  const total = nightlyPrice + serviceFee;

  function toggleWishlist() {
    const next = !wishlisted;

    setWishlisted(next);

    localStorage.setItem(
      `vistara-wishlist-${stayId}`,
      String(next)
    );
  }

  function submitReview() {
    if (!reviewText.trim()) return;

    const newReview: Review = {
      id: `review-${Date.now()}`,
      name: "You",
      rating: reviewRating,
      comment: reviewText.trim(),
      date: "Just now",
    };

    const updated = [newReview, ...reviews];

    setReviews(updated);
    setReviewText("");
    setReviewRating(5);

    localStorage.setItem(
      `vistara-reviews-${stayId}`,
      JSON.stringify(updated)
    );
  }

  const mapQuery = encodeURIComponent(
    `${stay.location}, ${stay.city}, ${stay.country}`
  );

  return (
    <main className="min-h-screen bg-white text-[#111]">

      {/* =====================================================
          NAVBAR
      ===================================================== */}
      <Navbar />

      {/* =====================================================
          PAGE
      ===================================================== */}
      <div className="mx-auto max-w-7xl px-4 pb-20 pt-5 sm:px-6 lg:px-8">

        {/* BACK + WISHLIST */}
        <div className="mb-5 flex items-center justify-between">

          <Link
            href="/stays"
            className="flex items-center gap-2 text-sm font-medium text-[#666] transition hover:text-black"
          >
            <ArrowLeft size={16} />
            Back to stays
          </Link>

          <button
            onClick={toggleWishlist}
            className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition ${
              wishlisted
                ? "border-black bg-black text-white"
                : "border-[#DDD7CE] bg-white text-[#333] hover:border-black"
            }`}
          >
            <Heart
              size={16}
              fill={wishlisted ? "currentColor" : "none"}
            />

            {wishlisted ? "Saved" : "Wishlist"}
          </button>
        </div>

        {/* =====================================================
            MAIN IMAGE + BOOKING
        ===================================================== */}
        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_380px]">

          {/* LEFT CONTENT */}
          <div>

            {/* SINGLE IMAGE */}
            <div className="relative overflow-hidden rounded-3xl bg-[#F2EEE7]">

              <img
                src={stay.image}
                alt={stay.title}
                className="h-[320px] w-full object-cover sm:h-[430px] lg:h-[500px]"
              />

              <div className="absolute left-5 top-5 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] shadow-sm">
                <ShieldCheck size={13} />
                Verified stay
              </div>
            </div>

            {/* TITLE */}
            <div className="border-b border-[#E7E1D8] py-7">

              <div className="flex items-start justify-between gap-5">

                <div>
                  <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                    {stay.title}
                  </h1>

                  <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-[#666]">

                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} />
                      {stay.location}
                    </span>

                    <span className="flex items-center gap-1.5 font-semibold text-black">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      {stay.rating.toFixed(1)}
                    </span>

                    <span>
                      {reviews.length} reviews
                    </span>
                  </div>
                </div>

                <button
                  onClick={toggleWishlist}
                  className="hidden rounded-full border border-[#DDD7CE] p-3 transition hover:bg-[#F6F1E8] sm:flex"
                >
                  <Heart
                    size={18}
                    fill={
                      wishlisted ? "currentColor" : "none"
                    }
                  />
                </button>
              </div>
            </div>

            {/* =================================================
                ABOUT
            ================================================= */}
            <section className="border-b border-[#E7E1D8] py-8">

              <SectionLabel>
                About this stay
              </SectionLabel>

              <h2 className="mt-2 text-xl font-semibold">
                A comfortable place to call your own
              </h2>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-[#5F5A53]">
                {stay.title} is a thoughtfully selected Vistara
                stay in {stay.location}. Enjoy a comfortable space,
                convenient location and everything you need for a
                relaxed stay in {stay.city}.
              </p>
            </section>

            {/* =================================================
                PROPERTY INFO
            ================================================= */}
            <section className="border-b border-[#E7E1D8] py-8">

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
                  value={`Up to ${stay.guests}`}
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

            {/* =================================================
                AMENITIES
            ================================================= */}
            <section className="border-b border-[#E7E1D8] py-8">

              <SectionLabel>
                Amenities
              </SectionLabel>

              <h2 className="mt-2 text-xl font-semibold">
                What this place offers
              </h2>

              <div className="mt-5 grid gap-3 sm:grid-cols-2">

                {amenities.map((amenity) => {
                  const Icon = amenity.icon;

                  return (
                    <div
                      key={amenity.name}
                      className="flex items-center gap-3 rounded-xl border border-[#E7E1D8] px-4 py-3.5 transition hover:bg-[#FAF8F4]"
                    >
                      <Icon
                        size={18}
                        strokeWidth={1.7}
                      />

                      <span className="text-sm font-medium text-[#444]">
                        {amenity.name}
                      </span>

                      <Check
                        size={14}
                        className="ml-auto text-[#777]"
                      />
                    </div>
                  );
                })}

              </div>
            </section>

            {/* =================================================
                STAY DETAILS
            ================================================= */}
            <section className="border-b border-[#E7E1D8] py-8">

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
                  value={`${stay.guests} guests`}
                />

                <DetailCard
                  icon={Home}
                  label="Property type"
                  value="Private stay"
                />

              </div>
            </section>

            {/* =================================================
                HOST
            ================================================= */}
            <section className="border-b border-[#E7E1D8] py-8">

              <SectionLabel>
                Your host
              </SectionLabel>

              <div className="mt-5 flex flex-col gap-5 rounded-2xl border border-[#E7E1D8] p-5 sm:flex-row sm:items-center">

                <img
                  src="/profile.jpg"
                  alt="Host profile"
                  className="h-16 w-16 shrink-0 rounded-full object-cover"
                />

                <div className="flex-1">

                  <h3 className="font-semibold">
                    Vistara Host
                  </h3>

                  <p className="mt-1 text-sm text-[#777]">
                    Hosting on Vistara
                  </p>

                  <div className="mt-2 flex items-center gap-3 text-xs text-[#666]">
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

                {/* HOST.TSX ROUTE */}
                <Link
                  href={`/host/${stayId}`}
                  className="rounded-xl border border-black px-4 py-2.5 text-center text-sm font-semibold transition hover:bg-black hover:text-white"
                >
                  View profile
                </Link>

              </div>
            </section>

            {/* =================================================
                MAP
            ================================================= */}
            <section className="border-b border-[#E7E1D8] py-8">

              <SectionLabel>
                Location
              </SectionLabel>

              <h2 className="mt-2 text-xl font-semibold">
                Where you&apos;ll be
              </h2>

              <p className="mt-2 text-sm text-[#666]">
                {stay.location}, {stay.city}
              </p>

              <div className="mt-5 overflow-hidden rounded-2xl border border-[#E2DCD2]">

                <iframe
                  title={`${stay.title} location map`}
                  src={`https://www.google.com/maps?q=${mapQuery}&output=embed`}
                  className="h-[300px] w-full border-0 sm:h-[360px]"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />

              </div>

            </section>

            {/* =================================================
                REVIEWS
            ================================================= */}
            <section className="py-8">

              <div className="flex items-end justify-between gap-4">

                <div>
                  <SectionLabel>
                    Guest reviews
                  </SectionLabel>

                  <h2 className="mt-2 text-xl font-semibold">
                    What guests say
                  </h2>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={15}
                    fill="currentColor"
                  />
                  {stay.rating.toFixed(1)}
                </div>

              </div>

              {/* REVIEW LIST */}
              <div className="mt-5 space-y-3">

                {reviews.map((review) => (
                  <article
                    key={review.id}
                    className="rounded-2xl border border-[#E7E1D8] p-5"
                  >

                    <div className="flex items-start justify-between gap-4">

                      <div>
                        <h3 className="text-sm font-semibold">
                          {review.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#999]">
                          {review.date}
                        </p>
                      </div>

                      <span className="flex items-center gap-1 text-xs font-semibold">
                        <Star
                          size={12}
                          fill="currentColor"
                        />
                        {review.rating.toFixed(1)}
                      </span>

                    </div>

                    <p className="mt-3 text-sm leading-6 text-[#555]">
                      {review.comment}
                    </p>

                  </article>
                ))}

              </div>

              {/* WRITE REVIEW */}
              <div className="mt-5 rounded-2xl bg-[#F6F1E8] p-5">

                <div className="flex items-center gap-2">
                  <MessageCircle size={17} />

                  <h3 className="text-sm font-semibold">
                    Leave a review
                  </h3>
                </div>

                <div className="mt-4 flex gap-1">
                  {[1, 2, 3, 4, 5].map((number) => (
                    <button
                      key={number}
                      type="button"
                      onClick={() =>
                        setReviewRating(number)
                      }
                      className="p-1"
                    >
                      <Star
                        size={18}
                        fill={
                          number <= reviewRating
                            ? "currentColor"
                            : "none"
                        }
                      />
                    </button>
                  ))}
                </div>

                <textarea
                  value={reviewText}
                  onChange={(e) =>
                    setReviewText(e.target.value)
                  }
                  rows={4}
                  placeholder="Share your experience..."
                  className="mt-3 w-full resize-none rounded-xl border border-[#DDD5CA] bg-white px-4 py-3 text-sm outline-none focus:border-black"
                />

                <button
                  onClick={submitReview}
                  disabled={!reviewText.trim()}
                  className="mt-3 rounded-xl bg-black px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#222] disabled:cursor-not-allowed disabled:opacity-40"
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

            <div className="rounded-3xl border border-[#DDD7CE] bg-white p-5 shadow-[0_12px_35px_rgba(0,0,0,0.06)] sm:p-6">

              {/* PRICE */}
              <div className="flex items-center justify-between border-b border-[#E7E1D8] pb-5">

                <div>
                  <span className="text-2xl font-semibold">
                    ₹{nightlyPrice.toLocaleString("en-IN")}
                  </span>

                  <span className="ml-1 text-sm text-[#777]">
                    / night
                  </span>
                </div>

                <span className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={14}
                    fill="currentColor"
                  />
                  {stay.rating.toFixed(1)}
                </span>

              </div>

              {/* CHECK IN / OUT */}
<div className="relative mt-5 grid grid-cols-2 overflow-visible rounded-2xl border border-[#DCD5CB]">
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
              <div className="mt-3 rounded-2xl border border-[#DCD5CB] p-4">

                <p className="text-[9px] font-bold uppercase tracking-[0.12em] text-[#888]">
                  Guests
                </p>

                <div className="mt-2 flex items-center justify-between">

                  <div className="flex items-center gap-2">
                    <Users size={17} />

                    <span className="text-sm font-medium">
                      {guests}{" "}
                      {guests === 1 ? "guest" : "guests"}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">

                    <button
                      onClick={() =>
                        setGuests(
                          Math.max(1, guests - 1)
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6D0C7] text-lg"
                    >
                      −
                    </button>

                    <button
                      onClick={() =>
                        setGuests(
                          Math.min(
                            stay.guests,
                            guests + 1
                          )
                        )
                      }
                      className="flex h-8 w-8 items-center justify-center rounded-full border border-[#D6D0C7] text-lg"
                    >
                      +
                    </button>

                  </div>

                </div>

                <p className="mt-2 text-[11px] text-[#888]">
                  Up to {stay.guests} guests
                </p>

              </div>

              {/* RESERVE */}
             <button
  type="button"
  onClick={() => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    const query = new URLSearchParams({
      propertyId: String(stayId),
      checkIn,
      checkOut,
      guests: String(guests),
    });

    window.location.href = `/bookings?${query.toString()}`;
  }}
  className="mt-5 flex w-full items-center justify-center rounded-xl bg-black px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#222]"
>
  Reserve this stay
</button>
              <p className="mt-3 text-center text-[11px] text-[#888]">
                You won&apos;t be charged until you confirm
                your booking.
              </p>

              {/* PRICE BREAKDOWN */}
              <div className="mt-5 space-y-3 border-t border-[#E7E1D8] pt-5 text-sm">

                <div className="flex justify-between">
                  <span className="text-[#666]">
                    ₹{nightlyPrice.toLocaleString("en-IN")} ×
                    1 night
                  </span>

                  <span>
                    ₹{nightlyPrice.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-[#666]">
                    Service fee
                  </span>

                  <span>
                    ₹{serviceFee.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex justify-between border-t border-[#E7E1D8] pt-4 font-semibold">
                  <span>Total</span>

                  <span>
                    ₹{total.toLocaleString("en-IN")}
                  </span>
                </div>

              </div>
            </div>

            {/* SHARE */}
            <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-[#DDD7CE] px-4 py-3 text-sm font-semibold transition hover:bg-[#F6F1E8]">
              <Share2 size={15} />
              Share this stay
            </button>

          </aside>
        </div>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}
      <Footer />

    </main>
  );
}

/* =========================================================
   NAVBAR
========================================================= */


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
    <div className="border-r border-[#DCD5CB] p-3 last:border-r-0">
      <label className="block text-[9px] font-bold uppercase tracking-[0.12em] text-[#888]">
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
   SMALL COMPONENTS
========================================================= */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8A8175]">
      {children}
    </p>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E7E1D8] p-4">
      <Icon size={18} />

      <p className="mt-3 text-[10px] text-[#888]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

function DetailCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-[#E7E1D8] p-4">

      <Icon size={18} />

      <div>
        <p className="text-xs text-[#888]">
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
   FOOTER
========================================================= */

  