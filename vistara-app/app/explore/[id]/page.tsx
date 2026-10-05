"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CalendarDays,
  Clock3,
  Heart,
  MapPin,
  MessageCircle,
  Share2,
  Star,
  Users,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "../../footer/page";

import { experiences } from "@/data/explore";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

const reviews = [
  {
    id: 1,
    name: "Aarav Mehta",
    image: "/images/profile.jpg",
    rating: 5,
    date: "September 2026",
    text: "A really beautiful way to discover the local side of the destination. The experience felt personal and well organised.",
  },
  {
    id: 2,
    name: "Ananya Sharma",
    image: "/images/profile.jpg",
    rating: 5,
    date: "August 2026",
    text: "Loved the stories and the smaller places we got to discover. Much better than doing the usual tourist route.",
  },
  {
    id: 3,
    name: "Rohan Verma",
    image: "/images/profile.jpg",
    rating: 4,
    date: "July 2026",
    text: "Very nice experience. The host was friendly and the whole experience was comfortable.",
  },
];

const host = {
  id: "host-01",
  name: "Rahul Kumar",
  image: "/images/profile.jpg",
  location: "Patna, Bihar",
  rating: "4.9",
  experiences: 18,
  joined: "2024",
};

export default function ExploreDetailPage({
  params,
}: PageProps) {
  const { id } = use(params);

  const experience = experiences.find(
    (item) => item.id === Number(id)
  );

  const [liked, setLiked] = useState(false);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [reviewRating, setReviewRating] = useState(5);
  const [shareMessage, setShareMessage] = useState("");

  if (!experience) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[65vh] flex-col items-center justify-center px-5 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500">
            EXPLORE
          </p>

          <h1 className="mt-3 text-3xl font-semibold">
            Experience not found
          </h1>

          <Link
            href="/explore"
            className="mt-6 rounded-full bg-black px-6 py-3 text-sm font-semibold text-white"
          >
            Back to Explore
          </Link>
        </main>

        <Footer />
      </>
    );
  }

  /* ---------------- SHARE ---------------- */

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: experience.title,
          text: experience.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(
          window.location.href
        );

        setShareMessage("Link copied");
        setTimeout(() => setShareMessage(""), 2000);
      }
    } catch {
      // user cancelled share
    }
  };

  /* ---------------- REVIEW ---------------- */

  const submitReview = () => {
    if (!reviewText.trim()) return;

    setReviewText("");
    setShowReviewForm(false);
  };

  const displayedReviews = showAllReviews
    ? reviews
    : reviews.slice(0, 2);

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* =========================================
          PAGE CONTAINER
      ========================================= */}

      <div className="mx-auto max-w-[1280px] px-5 pb-16 pt-5 sm:px-8 lg:px-10">

        {/* =====================================
            TOP BAR
        ===================================== */}

        <div className="mb-5 flex items-center justify-between">

          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 transition hover:text-black"
          >
            <ArrowLeft size={17} />
            Back to experiences
          </Link>

          <button
            type="button"
            onClick={() => setLiked(!liked)}
            className="flex items-center gap-2 rounded-full border border-neutral-200 px-4 py-2.5 text-sm font-semibold transition hover:border-black"
          >
            <Heart
              size={17}
              className={liked ? "fill-black" : ""}
            />

            Wishlist
          </button>

        </div>

        {/* =====================================
            MAIN DETAIL
        ===================================== */}

        <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_390px]">

          {/* =================================
              LEFT COLUMN
          ================================= */}

          <div className="min-w-0">

            {/* IMAGE */}

            <div className="relative aspect-[4/3] overflow-hidden rounded-[22px] bg-neutral-100 sm:aspect-[16/10]">

              <img
                src={experience.image}
                alt={experience.title}
                className="h-full w-full object-cover"
              />

              {/* CATEGORY */}

              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.08em] shadow-sm">
                  {experience.category}
                </span>
              </div>

              {/* IMAGE ACTIONS */}

              <div className="absolute right-4 top-4 flex gap-2">

                <button
                  type="button"
                  onClick={() => setLiked(!liked)}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                  aria-label="Wishlist"
                >
                  <Heart
                    size={19}
                    className={
                      liked ? "fill-black" : ""
                    }
                  />
                </button>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
                  aria-label="Share"
                >
                  <Share2 size={18} />
                </button>

              </div>

            </div>

            {/* TITLE */}

            <div className="relative mt-7">

              <div className="pr-14">

                <h1 className="text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                  {experience.title}
                </h1>

                <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-neutral-500">

                  <span className="flex items-center gap-1.5">
                    <MapPin size={15} />
                    {experience.location}
                  </span>

                  <span className="flex items-center gap-1.5 text-black">
                    <Star
                      size={15}
                      className="fill-black"
                    />
                    <strong>
                      {experience.rating}
                    </strong>
                  </span>

                  <span>
                    {reviews.length + 120} reviews
                  </span>

                </div>

              </div>

              {/* TITLE WISHLIST */}

              <button
                type="button"
                onClick={() => setLiked(!liked)}
                className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-neutral-200 transition hover:border-black"
                aria-label="Wishlist"
              >
                <Heart
                  size={19}
                  className={liked ? "fill-black" : ""}
                />
              </button>

            </div>

            {/* DESCRIPTION */}

            <div className="mt-8 border-t border-neutral-200 pt-8">

              <h2 className="text-xl font-semibold">
                About this experience
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base">
                {experience.description}
              </p>

              <p className="mt-3 max-w-3xl text-sm leading-7 text-neutral-600 sm:text-base">
                Discover the destination through local stories,
                places and experiences that go beyond the usual
                tourist route.
              </p>

            </div>

            {/* WHAT TO EXPECT */}

            <div className="mt-8 border-t border-neutral-200 pt-8">

              <h2 className="text-xl font-semibold">
                What to expect
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-neutral-200 p-4">

                  <Clock3
                    size={19}
                    className="mb-3"
                  />

                  <p className="text-sm font-semibold">
                    Duration
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {experience.duration}
                  </p>

                </div>

                <div className="rounded-xl border border-neutral-200 p-4">

                  <MapPin
                    size={19}
                    className="mb-3"
                  />

                  <p className="text-sm font-semibold">
                    Location
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    {experience.location}
                  </p>

                </div>

                <div className="rounded-xl border border-neutral-200 p-4">

                  <Users
                    size={19}
                    className="mb-3"
                  />

                  <p className="text-sm font-semibold">
                    Group
                  </p>

                  <p className="mt-1 text-xs text-neutral-500">
                    Small group experience
                  </p>

                </div>

              </div>

            </div>

            {/* =================================
                HOST
            ================================= */}

            <div className="mt-10 border-t border-neutral-200 pt-8">

              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
                YOUR LOCAL HOST
              </p>

              <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-center gap-4">

                  <img
                    src={host.image}
                    alt={host.name}
                    className="h-14 w-14 rounded-full object-cover"
                  />

                  <div>

                    <h3 className="text-lg font-semibold">
                      {host.name}
                    </h3>

                    <p className="mt-1 text-sm text-neutral-500">
                      Host in {host.location}
                    </p>

                    <div className="mt-2 flex flex-wrap gap-3 text-xs text-neutral-500">

                      <span className="flex items-center gap-1">
                        <Star
                          size={12}
                          className="fill-black"
                        />
                        {host.rating}
                      </span>

                      <span>
                        {host.experiences} experiences
                      </span>

                      <span>
                        Joined {host.joined}
                      </span>

                    </div>

                  </div>

                </div>

                <Link
                  href={`/host/${host.id}`}
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition hover:bg-black hover:text-white"
                >
                  View Host
                  <ArrowUpRight size={15} />
                </Link>

              </div>

            </div>

            {/* =================================
                REVIEWS
            ================================= */}

            <div className="mt-10 border-t border-neutral-200 pt-8">

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>

                  <div className="flex items-center gap-2">

                    <Star
                      size={19}
                      className="fill-black"
                    />

                    <span className="text-xl font-semibold">
                      {experience.rating}
                    </span>

                  </div>

                  <p className="mt-1 text-sm text-neutral-500">
                    Reviews from travellers
                  </p>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    setShowReviewForm(!showReviewForm)
                  }
                  className="inline-flex w-fit items-center gap-2 rounded-full border border-black px-5 py-2.5 text-sm font-semibold transition hover:bg-black hover:text-white"
                >
                  <MessageCircle size={16} />
                  Write a review
                </button>

              </div>

              {/* REVIEW FORM */}

              {showReviewForm && (
                <div className="mt-6 rounded-2xl border border-neutral-200 p-5">

                  <h3 className="font-semibold">
                    Share your experience
                  </h3>

                  <div className="mt-4 flex gap-1">

                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() =>
                          setReviewRating(star)
                        }
                      >
                        <Star
                          size={20}
                          className={
                            star <= reviewRating
                              ? "fill-black"
                              : "text-neutral-300"
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
                    placeholder="Tell other travellers about your experience..."
                    className="mt-4 w-full resize-none rounded-xl border border-neutral-200 p-4 text-sm outline-none focus:border-black"
                  />

                  <div className="mt-4 flex gap-3">

                    <button
                      type="button"
                      onClick={submitReview}
                      className="rounded-full bg-black px-5 py-2.5 text-sm font-semibold text-white"
                    >
                      Submit review
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        setShowReviewForm(false)
                      }
                      className="rounded-full border border-neutral-200 px-5 py-2.5 text-sm"
                    >
                      Cancel
                    </button>

                  </div>

                </div>
              )}

              {/* REVIEWS */}

              <div className="mt-6 divide-y divide-neutral-200">

                {displayedReviews.map((review) => (
                  <div
                    key={review.id}
                    className="py-6 first:pt-0"
                  >

                    <div className="flex justify-between gap-4">

                      <div className="flex items-center gap-3">

                        <img
                          src={review.image}
                          alt={review.name}
                          className="h-10 w-10 rounded-full object-cover"
                        />

                        <div>

                          <p className="text-sm font-semibold">
                            {review.name}
                          </p>

                          <p className="mt-0.5 text-xs text-neutral-400">
                            {review.date}
                          </p>

                        </div>

                      </div>

                      <div className="flex gap-0.5">
                        {Array.from({
                          length: 5,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            size={12}
                            className={
                              index < review.rating
                                ? "fill-black"
                                : "text-neutral-300"
                            }
                          />
                        ))}
                      </div>

                    </div>

                    <p className="mt-3 text-sm leading-6 text-neutral-600">
                      {review.text}
                    </p>

                  </div>
                ))}

              </div>

              {!showAllReviews && (
                <button
                  type="button"
                  onClick={() =>
                    setShowAllReviews(true)
                  }
                  className="mt-2 rounded-full border border-neutral-300 px-5 py-2.5 text-sm font-medium transition hover:border-black"
                >
                  Show all reviews
                </button>
              )}

            </div>

          </div>

          {/* =================================
              RIGHT BOOKING CARD
          ================================= */}

          <aside className="lg:sticky lg:top-24">

            <div className="rounded-[22px] border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

              {/* PRICE */}

              <div className="flex items-center justify-between">

                <div>
                  <span className="text-2xl font-bold">
                    {experience.price}
                  </span>

                  <span className="ml-1 text-sm text-neutral-500">
                    / person
                  </span>
                </div>

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={15}
                    className="fill-black"
                  />
                  {experience.rating}
                </div>

              </div>

              {/* DATE */}

              <div className="mt-6 rounded-2xl border border-neutral-200 p-4">

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  DATE
                </p>

                <div className="mt-3 flex items-center gap-3">

                  <CalendarDays
                    size={18}
                    className="text-neutral-600"
                  />

                  <input
                    type="date"
                    className="w-full bg-transparent text-sm outline-none"
                  />

                </div>

              </div>

              {/* GUESTS */}

              <div className="mt-3 rounded-2xl border border-neutral-200 p-4">

                <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-neutral-400">
                  GUESTS
                </p>

                <div className="mt-3 flex items-center justify-between">

                  <div className="flex items-center gap-3">

                    <Users size={19} />

                    <span className="text-sm">
                      1 guest
                    </span>

                  </div>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-lg"
                    >
                      −
                    </button>

                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-neutral-200 text-lg"
                    >
                      +
                    </button>

                  </div>

                </div>

                <p className="mt-3 text-xs text-neutral-400">
                  Up to 6 guests
                </p>

              </div>

              {/* BOOK */}

              <Link
                href={`/booking/${experience.id}`}
                className="mt-5 flex h-12 items-center justify-center rounded-xl bg-black text-sm font-semibold text-white transition hover:bg-neutral-800"
              >
                Book Now
                <ArrowUpRight
                  size={17}
                  className="ml-1"
                />
              </Link>

              <p className="mt-3 text-center text-xs text-neutral-400">
                You won't be charged until you confirm your booking.
              </p>

              {/* PRICE BREAKDOWN */}

              <div className="mt-6 border-t border-neutral-200 pt-5">

                <div className="flex justify-between text-sm text-neutral-600">
                  <span>
                    {experience.price} × 1 guest
                  </span>

                  <span>
                    {experience.price}
                  </span>
                </div>

                <div className="mt-3 flex justify-between text-sm text-neutral-600">
                  <span>Service fee</span>
                  <span>₹15</span>
                </div>

                <div className="mt-4 flex justify-between border-t border-neutral-200 pt-4 font-semibold">
                  <span>Total</span>
                  <span>Calculated at booking</span>
                </div>

              </div>

            </div>

            {/* SHARE */}

            <button
              type="button"
              onClick={handleShare}
              className="mt-4 flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-neutral-200 text-sm font-semibold transition hover:border-black"
            >
              <Share2 size={17} />
              Share this experience
            </button>

          </aside>

        </div>

      </div>

      <Footer />
    </main>
  );
}