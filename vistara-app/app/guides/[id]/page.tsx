"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Globe2,
  Languages,
  MapPin,
  Star,
  UserRound,
} from "lucide-react";

type Guide = {
  id: string;

  userId?: string;

  name: string;

  location: string;

  city?: string;

  bio: string;

  about: string;

  languages: string[];

  specialties: string[];

  rating: number;

  reviews: number;

  reviewCount?: number;

  experience: string;

  experienceYears?: number | null;

  pricePerHour: number;

  hourlyRate?: number | null;

  currency: string;

  image: string;

  verified: boolean;

  availableDays: string[];
};

export default function GuideDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [guide, setGuide] = useState<Guide | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGuide() {
      try {
        setLoading(true);
        setError("");

        /*
         * IMPORTANT:
         * [id] comes from:
         *
         * /guides/[id]
         *
         * Example:
         * /guides/clxxx123
         */

        const { id } = await params;

        if (!id) {
          throw new Error("Guide ID is missing.");
        }

        console.log("GUIDE ID:", id);

        const response = await fetch(`/api/guides/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        console.log("GUIDE DETAILS API:", result);

        if (!response.ok) {
          throw new Error(
            result?.message || "Guide not found."
          );
        }

        /*
         * API may return:
         *
         * {
         *   success: true,
         *   data: {...}
         * }
         *
         * or:
         *
         * {
         *   success: true,
         *   data: {
         *      guide: {...}
         *   }
         * }
         */

        const rawGuide =
          result?.data?.guide ??
          result?.data ??
          result?.guide ??
          null;

        if (!rawGuide) {
          throw new Error("Guide data not found.");
        }

        /*
         * The backend GuideProfile contains:
         *
         * city
         * bio
         * languages
         * specialties
         * rating
         * reviewCount
         * experienceYears
         * hourlyRate
         *
         * User contains:
         *
         * name
         * profile.avatar
         */

        const normalizedGuide: Guide = {
          id: rawGuide.id ?? id,

          userId: rawGuide.userId,

          name:
            rawGuide.user?.name ??
            rawGuide.name ??
            "Local Guide",

          location:
            rawGuide.city ??
            rawGuide.location ??
            "Unknown location",

          city:
            rawGuide.city ??
            rawGuide.location ??
            "",

          bio:
            rawGuide.bio ??
            "A local expert ready to help you discover the destination.",

          about:
            rawGuide.about ??
            rawGuide.bio ??
            "A local expert ready to help you discover the destination.",

          languages: Array.isArray(rawGuide.languages)
            ? rawGuide.languages
            : [],

          specialties: Array.isArray(rawGuide.specialties)
            ? rawGuide.specialties
            : [],

          rating:
            typeof rawGuide.rating === "number"
              ? rawGuide.rating
              : 0,

          reviews:
            typeof rawGuide.reviewCount === "number"
              ? rawGuide.reviewCount
              : typeof rawGuide.reviews === "number"
              ? rawGuide.reviews
              : 0,

          reviewCount:
            typeof rawGuide.reviewCount === "number"
              ? rawGuide.reviewCount
              : 0,

          experience:
            rawGuide.experienceYears != null
              ? `${rawGuide.experienceYears} ${
                  rawGuide.experienceYears === 1
                    ? "year"
                    : "years"
                } of experience`
              : "Local experience",

          experienceYears:
            rawGuide.experienceYears ?? null,

          pricePerHour:
            typeof rawGuide.hourlyRate === "number"
              ? rawGuide.hourlyRate
              : typeof rawGuide.pricePerHour === "number"
              ? rawGuide.pricePerHour
              : 0,

          hourlyRate:
            typeof rawGuide.hourlyRate === "number"
              ? rawGuide.hourlyRate
              : null,

          currency: "INR",

          image:
            rawGuide.user?.profile?.avatar ??
            rawGuide.image ??
            "/images/guide-placeholder.jpg",

          /*
           * If your database has no verified field yet,
           * don't assume the guide is verified.
           */
          verified:
            rawGuide.verified === true ||
            rawGuide.isVerified === true,

          /*
           * Current API does not show availableDays.
           * Therefore safely use an empty array.
           */
          availableDays: Array.isArray(
            rawGuide.availableDays
          )
            ? rawGuide.availableDays
            : [],
        };

        setGuide(normalizedGuide);
      } catch (error) {
        console.error(
          "GUIDE_DETAILS_ERROR:",
          error
        );

        setGuide(null);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load this guide."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGuide();
  }, [params]);

  /*
   * LOADING
   */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
          <div className="h-5 w-32 animate-pulse rounded bg-[#F5F7FF]" />

          <div className="mt-8 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
            <div className="h-[520px] animate-pulse rounded-[32px] bg-[#F5F7FF]" />

            <div className="h-[520px] animate-pulse rounded-[28px] bg-[#F5F7FF]" />
          </div>
        </div>
      </main>
    );
  }

  /*
   * ERROR / NOT FOUND
   */

  if (error || !guide) {
    return (
      <main className="min-h-screen bg-white text-[#03045E]">
        <Navbar />

        <div className="mx-auto max-w-3xl px-6 py-24 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F7FF]">
            <Globe2 className="h-7 w-7 text-[#0D21A1]" />
          </div>

          <h1 className="mt-6 font-serif text-4xl font-semibold">
            Guide not found
          </h1>

          <p className="mt-3 text-sm leading-6 text-gray-500">
            {error ||
              "This guide may no longer be available."}
          </p>

          <Link
            href="/guides"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            <ArrowLeft size={16} />
            Back to Guides
          </Link>
        </div>
      </main>
    );
  }

  /*
   * MAIN PAGE
   */

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* BACK */}
      <section className="border-b border-[#03045E]/10">
        <div className="mx-auto max-w-7xl px-6 py-7 lg:px-10">
          <Link
            href="/guides"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-[#03045E]"
          >
            <ArrowLeft size={16} />

            All Guides
          </Link>
        </div>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-14">
        <div className="grid gap-10 lg:grid-cols-[1.25fr_0.75fr]">

          {/* LEFT */}
          <div>

            {/* IMAGE */}
            <div className="relative h-[420px] overflow-hidden rounded-[32px] bg-[#F5F7FF] md:h-[560px]">
              <img
                src={guide.image}
                alt={guide.name}
                className="h-full w-full object-cover"
                onError={(event) => {
                  event.currentTarget.src =
                    "/images/guide-placeholder.jpg";
                }}
              />

              {guide.verified && (
                <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full bg-white px-4 py-2.5 text-xs font-bold text-[#03045E] shadow-lg">
                  <CheckCircle2
                    size={15}
                    className="text-[#0D21A1]"
                  />

                  Verified Local Guide
                </div>
              )}
            </div>

            {/* INTRO */}
            <div className="mt-9">
              <div className="flex flex-wrap items-center gap-3">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
                  LOCAL EXPERT
                </p>

                <span className="h-1 w-1 rounded-full bg-gray-300" />

                <div className="flex items-center gap-1 text-sm font-semibold">
                  <Star
                    size={15}
                    className="fill-[#0D21A1] text-[#0D21A1]"
                  />

                  {guide.rating.toFixed(1)}

                  <span className="font-normal text-gray-400">
                    ({guide.reviews}{" "}
                    {guide.reviews === 1
                      ? "review"
                      : "reviews"})
                  </span>
                </div>
              </div>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                {guide.name}
              </h1>

              <p className="mt-4 flex items-center gap-2 text-sm text-gray-500">
                <MapPin size={17} />

                {guide.location}
              </p>
            </div>

            {/* ABOUT */}
            <div className="mt-10 border-t border-[#03045E]/10 pt-8">
              <h2 className="font-serif text-2xl font-semibold">
                About {guide.name.split(" ")[0]}
              </h2>

              <p className="mt-4 max-w-3xl text-sm leading-7 text-gray-500">
                {guide.about}
              </p>
            </div>

            {/* SPECIALTIES */}
            {guide.specialties.length > 0 && (
              <div className="mt-9 border-t border-[#03045E]/10 pt-8">
                <h2 className="font-serif text-2xl font-semibold">
                  Areas of expertise
                </h2>

                <div className="mt-5 flex flex-wrap gap-3">
                  {guide.specialties.map(
                    (specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-[#F5F7FF] px-4 py-2.5 text-sm font-medium text-[#03045E]"
                      >
                        {specialty}
                      </span>
                    )
                  )}
                </div>
              </div>
            )}

            {/* INFO */}
            <div className="mt-9 grid gap-4 border-t border-[#03045E]/10 pt-8 sm:grid-cols-2">

              {/* EXPERIENCE */}
              <div className="rounded-2xl border border-[#03045E]/10 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#0D21A1]">
                  <UserRound size={19} />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wide text-gray-400">
                  Experience
                </p>

                <p className="mt-1 font-semibold">
                  {guide.experience}
                </p>
              </div>

              {/* LANGUAGES */}
              <div className="rounded-2xl border border-[#03045E]/10 p-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#0D21A1]">
                  <Languages size={19} />
                </div>

                <p className="mt-4 text-xs uppercase tracking-wide text-gray-400">
                  Languages
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {guide.languages.length > 0
                    ? guide.languages.join(" · ")
                    : "Not specified"}
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT BOOKING CARD */}
          <aside>
            <div className="sticky top-8 rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,4,94,0.08)] md:p-7">

              {/* PRICE */}
              <div className="border-b border-[#03045E]/10 pb-6">
                <p className="text-xs uppercase tracking-[0.18em] text-gray-400">
                  Local guide
                </p>

                <div className="mt-2 flex items-end justify-between gap-4">
                  <div>
                    <span className="text-3xl font-semibold">
                      ₹
                      {guide.pricePerHour.toLocaleString(
                        "en-IN"
                      )}
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

                    {guide.rating.toFixed(1)}
                  </div>
                </div>
              </div>

              {/* LOCATION */}
              <div className="space-y-5 py-6">

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#0D21A1]">
                    <MapPin size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Based in
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {guide.location}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F5F7FF] text-[#0D21A1]">
                    <Globe2 size={18} />
                  </div>

                  <div>
                    <p className="text-xs uppercase tracking-wide text-gray-400">
                      Speaks
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {guide.languages.length > 0
                        ? guide.languages.join(" · ")
                        : "Not specified"}
                    </p>
                  </div>
                </div>

              </div>

              {/* AVAILABILITY */}
              <div className="border-t border-[#03045E]/10 pt-6">
                <div className="flex items-center gap-2">
                  <CalendarDays
                    size={17}
                    className="text-[#0D21A1]"
                  />

                  <p className="text-sm font-semibold">
                    Available days
                  </p>
                </div>

                {guide.availableDays.length > 0 ? (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.availableDays.map(
                      (day) => (
                        <span
                          key={day}
                          className="rounded-full border border-[#03045E]/10 px-3 py-1.5 text-xs text-gray-600"
                        >
                          {day}
                        </span>
                      )
                    )}
                  </div>
                ) : (
                  <p className="mt-4 text-xs text-gray-400">
                    Availability will be confirmed during
                    booking.
                  </p>
                )}
              </div>

              {/* CTA */}
           <Link
  href={`/guides/${guide.id}/book`}
  className="mt-7 flex w-full items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
>
  Book This Guide
  <ArrowRight size={17} />
</Link>
              <p className="mt-3 text-center text-xs text-gray-400">
                You can choose your date and duration next.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}