"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";
import {
  ArrowRight,
  Globe2,
  Languages,
  MapPin,
  Star,
} from "lucide-react";

type Guide = {
  id: string;
  name: string;
  location: string;
  bio: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  pricePerHour: number;
  image: string;
  verified: boolean;
};

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadGuides() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/guides", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        console.log("GUIDES API:", result);

        if (!response.ok) {
          throw new Error(
            result?.message || "Unable to load guides"
          );
        }

        const apiGuides = Array.isArray(
          result?.data?.guides
        )
          ? result.data.guides
          : [];

        const formattedGuides: Guide[] =
          apiGuides.map((guide: any) => ({
            id: guide.id,

            name:
              guide.user?.name ||
              "Local Guide",

            location:
              guide.city ||
              "Unknown location",

            bio:
              guide.bio ||
              "Local Vistara guide ready to help you explore the destination.",

            languages: Array.isArray(
              guide.languages
            )
              ? guide.languages
              : [],

            specialties: Array.isArray(
              guide.specialties
            )
              ? guide.specialties
              : [],

            rating: Number(
              guide.rating ?? 0
            ),

            reviews: Number(
              guide.reviewCount ?? 0
            ),

            experience:
              guide.experienceYears != null
                ? `${guide.experienceYears} ${
                    Number(guide.experienceYears) === 1
                      ? "year"
                      : "years"
                  }`
                : "Experienced",

            pricePerHour: Number(
              guide.hourlyRate ?? 0
            ),

            image:
              guide.user?.profile?.avatar ||
              "/images/default-guide.jpg",

            /*
             * Your current API does not return
             * a verified field.
             * Therefore we keep it false until
             * the backend provides verification data.
             */
            verified: Boolean(
              guide.verified ?? false
            ),
          }));

        setGuides(formattedGuides);
      } catch (error) {
        console.error(
          "GUIDES_LOADING_ERROR:",
          error
        );

        setGuides([]);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load guides."
        );
      } finally {
        setLoading(false);
      }
    }

    loadGuides();
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* ================================================== */}
      {/* HERO */}
      {/* ================================================== */}

      <section className="bg-[#03045E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            LOCAL EXPERTS
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight md:text-6xl">
            Meet the people who know the place.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Discover Vistara guides who can help you
            experience a destination beyond the usual
            tourist path.
          </p>
        </div>
      </section>

      {/* ================================================== */}
      {/* CONTENT */}
      {/* ================================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10 lg:py-16">
        {/* HEADER */}

        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
            EXPLORE GUIDES
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">
            Local guides
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Choose a local expert for your next journey.
          </p>
        </div>

        {/* ================================================== */}
        {/* LOADING */}
        {/* ================================================== */}

        {loading && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[26px] border border-[#03045E]/10 bg-white"
              >
                <div className="h-72 animate-pulse bg-[#F5F7FF]" />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#F5F7FF]" />

                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#F5F7FF]" />

                  <div className="h-12 animate-pulse rounded bg-[#F5F7FF]" />

                  <div className="h-4 w-3/4 animate-pulse rounded bg-[#F5F7FF]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================================================== */}
        {/* ERROR */}
        {/* ================================================== */}

        {!loading && error && (
          <div className="rounded-[24px] border border-red-100 bg-red-50 p-6">
            <p className="text-sm font-semibold text-red-800">
              Could not load guides
            </p>

            <p className="mt-1 text-sm text-red-700">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-4 rounded-xl bg-white px-4 py-2 text-xs font-semibold text-red-700 shadow-sm transition hover:bg-red-100"
            >
              Try again
            </button>
          </div>
        )}

        {/* ================================================== */}
        {/* EMPTY */}
        {/* ================================================== */}

        {!loading &&
          !error &&
          guides.length === 0 && (
            <div className="rounded-[28px] border border-[#03045E]/10 bg-[#F5F7FF] px-6 py-16 text-center">
              <Globe2 className="mx-auto h-10 w-10 text-[#0D21A1]" />

              <h3 className="mt-4 font-serif text-2xl font-semibold">
                No guides available
              </h3>

              <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-gray-500">
                New local experts will appear here
                soon. Check back when more guides
                join Vistara.
              </p>
            </div>
          )}

        {/* ================================================== */}
        {/* GUIDES */}
        {/* ================================================== */}

        {!loading &&
          !error &&
          guides.length > 0 && (
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {guides.map((guide) => (
                <article
                  key={guide.id}
                  className="group overflow-hidden rounded-[26px] border border-[#03045E]/10 bg-white shadow-[0_12px_45px_rgba(3,4,94,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(3,4,94,0.1)]"
                >
                  {/* ================================================== */}
                  {/* IMAGE */}
                  {/* ================================================== */}

                  <div className="relative h-72 overflow-hidden bg-[#F5F7FF]">
                    <img
                      src={guide.image}
                      alt={guide.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/images/default-guide.jpg";
                      }}
                    />

                    {/* VERIFIED */}

                    {guide.verified && (
                      <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E] shadow-sm">
                        ✓ Verified
                      </span>
                    )}

                    {/* RATING */}

                    <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#03045E] shadow-sm">
                      <Star
                        size={13}
                        className="fill-[#0D21A1] text-[#0D21A1]"
                      />

                      {guide.rating > 0
                        ? guide.rating.toFixed(1)
                        : "New"}
                    </div>
                  </div>

                  {/* ================================================== */}
                  {/* DETAILS */}
                  {/* ================================================== */}

                  <div className="p-6">
                    {/* NAME + LOCATION */}

                    <div>
                      <h3 className="font-serif text-2xl font-semibold">
                        {guide.name}
                      </h3>

                      <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                        <MapPin size={15} />

                        {guide.location}
                      </p>
                    </div>

                    {/* BIO */}

                    <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                      {guide.bio}
                    </p>

                    {/* ================================================== */}
                    {/* EXPERIENCE */}
                    {/* ================================================== */}

                    <div className="mt-4 flex items-center justify-between text-xs text-gray-500">
                      <span>
                        Experience
                      </span>

                      <span className="font-semibold text-[#03045E]">
                        {guide.experience}
                      </span>
                    </div>

                    {/* ================================================== */}
                    {/* LANGUAGES */}
                    {/* ================================================== */}

                    {guide.languages.length > 0 && (
                      <div className="mt-5 flex items-start gap-2">
                        <Languages
                          size={16}
                          className="mt-0.5 shrink-0 text-[#0D21A1]"
                        />

                        <p className="text-xs font-medium leading-5 text-gray-500">
                          {guide.languages.join(" · ")}
                        </p>
                      </div>
                    )}

                    {/* ================================================== */}
                    {/* SPECIALTIES */}
                    {/* ================================================== */}

                    {guide.specialties.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {guide.specialties
                          .slice(0, 3)
                          .map((specialty) => (
                            <span
                              key={specialty}
                              className="rounded-full bg-[#F5F7FF] px-3 py-1.5 text-xs font-medium text-[#03045E]"
                            >
                              {specialty}
                            </span>
                          ))}
                      </div>
                    )}

                    {/* ================================================== */}
                    {/* FOOTER */}
                    {/* ================================================== */}

                    <div className="mt-6 flex items-center justify-between border-t border-[#03045E]/10 pt-5">
                      {/* PRICE */}

                      <div>
                        <p className="text-xs text-gray-400">
                          From
                        </p>

                        <p className="mt-0.5 font-semibold">
                          {guide.pricePerHour > 0
                            ? `₹${guide.pricePerHour.toLocaleString(
                                "en-IN"
                              )}`
                            : "Price on request"}

                          {guide.pricePerHour > 0 && (
                            <span className="text-xs font-normal text-gray-400">
                              {" "}
                              / hour
                            </span>
                          )}
                        </p>

                        {guide.reviews > 0 && (
                          <p className="mt-1 text-[11px] text-gray-400">
                            {guide.reviews}{" "}
                            {guide.reviews === 1
                              ? "review"
                              : "reviews"}
                          </p>
                        )}
                      </div>

                      {/* VIEW GUIDE */}

                      <Link
                        href={`/guides/${guide.id}`}
                        className="inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                      >
                        View Guide

                        <ArrowRight size={15} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

        {/* ================================================== */}
        {/* CTA */}
        {/* ================================================== */}

        <div className="mt-16 rounded-[30px] bg-[#F5F7FF] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
            TRAVEL DIFFERENTLY
          </p>

          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold md:text-4xl">
            See a destination through local eyes.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            From hidden streets to stories only locals
            know, choose a guide who can make your
            Vistara journey more personal.
          </p>

          <Link
            href="/explore"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            Explore Destinations

            <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </main>
  );
}