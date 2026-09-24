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
        const response = await fetch("/api/guides");

        if (!response.ok) {
          throw new Error("Unable to load guides");
        }

        const result = await response.json();

        setGuides(result.data?.guides ?? []);
      } catch (error) {
        console.error(error);
        setError("Unable to load guides.");
      } finally {
        setLoading(false);
      }
    }

    loadGuides();
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
      <section className="bg-[#03045E] text-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-white/60">
            LOCAL EXPERTS
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold tracking-tight md:text-6xl">
            Meet the people who know the place.
          </h1>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
            Discover Vistara guides who can help you experience a destination
            beyond the usual tourist path.
          </p>
        </div>
      </section>

      {/* CONTENT */}
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

        {/* LOADING */}
        {loading && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[26px] border border-[#03045E]/10"
              >
                <div className="h-72 animate-pulse bg-[#F5F7FF]" />

                <div className="space-y-4 p-6">
                  <div className="h-5 w-2/3 animate-pulse rounded bg-[#F5F7FF]" />
                  <div className="h-4 w-1/2 animate-pulse rounded bg-[#F5F7FF]" />
                  <div className="h-12 animate-pulse rounded bg-[#F5F7FF]" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR */}
        {!loading && error && (
          <div className="rounded-[24px] border border-red-100 bg-red-50 p-6 text-sm text-red-700">
            {error}
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && guides.length === 0 && (
          <div className="rounded-[28px] border border-[#03045E]/10 bg-[#F5F7FF] px-6 py-16 text-center">
            <Globe2 className="mx-auto h-10 w-10 text-[#0D21A1]" />

            <h3 className="mt-4 font-serif text-2xl font-semibold">
              No guides available
            </h3>

            <p className="mt-2 text-sm text-gray-500">
              New local experts will appear here soon.
            </p>
          </div>
        )}

        {/* GUIDES */}
        {!loading && !error && guides.length > 0 && (
          <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
            {guides.map((guide) => (
              <article
                key={guide.id}
                className="group overflow-hidden rounded-[26px] border border-[#03045E]/10 bg-white shadow-[0_12px_45px_rgba(3,4,94,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_55px_rgba(3,4,94,0.1)]"
              >
                {/* IMAGE */}
                <div className="relative h-72 overflow-hidden">
                  <img
                    src={guide.image}
                    alt={guide.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />

                  {guide.verified && (
                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E]">
                      ✓ Verified
                    </span>
                  )}

                  <div className="absolute bottom-4 right-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-xs font-semibold text-[#03045E]">
                    <Star
                      size={13}
                      className="fill-[#0D21A1] text-[#0D21A1]"
                    />
                    {guide.rating}
                  </div>
                </div>

                {/* DETAILS */}
                <div className="p-6">
                  <div>
                    <h3 className="font-serif text-2xl font-semibold">
                      {guide.name}
                    </h3>

                    <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={15} />
                      {guide.location}
                    </p>
                  </div>

                  <p className="mt-4 line-clamp-2 text-sm leading-6 text-gray-500">
                    {guide.bio}
                  </p>

                  {/* LANGUAGES */}
                  <div className="mt-5 flex items-center gap-2">
                    <Languages
                      size={16}
                      className="shrink-0 text-[#0D21A1]"
                    />

                    <p className="text-xs font-medium text-gray-500">
                      {guide.languages.join(" · ")}
                    </p>
                  </div>

                  {/* SPECIALTIES */}
                  <div className="mt-4 flex flex-wrap gap-2">
                    {guide.specialties.slice(0, 3).map((specialty) => (
                      <span
                        key={specialty}
                        className="rounded-full bg-[#F5F7FF] px-3 py-1.5 text-xs font-medium text-[#03045E]"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>

                  {/* FOOTER */}
                  <div className="mt-6 flex items-center justify-between border-t border-[#03045E]/10 pt-5">
                    <div>
                      <p className="text-xs text-gray-400">
                        From
                      </p>

                      <p className="mt-0.5 font-semibold">
                        ₹{guide.pricePerHour.toLocaleString("en-IN")}
                        <span className="text-xs font-normal text-gray-400">
                          {" "}
                          / hour
                        </span>
                      </p>
                    </div>

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

        {/* CTA */}
        <div className="mt-16 rounded-[30px] bg-[#F5F7FF] p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
            TRAVEL DIFFERENTLY
          </p>

          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold md:text-4xl">
            See a destination through local eyes.
          </h2>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            From hidden streets to stories only locals know, choose a guide
            who can make your Vistara journey more personal.
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