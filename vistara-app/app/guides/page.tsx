"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  ShieldCheck,
  Heart,
  Languages,
} from "lucide-react";
import Footer from "../footer/page";
import Navbar from "@/components/navbar";
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
  coverageKm: number;
  verified: boolean;
  image: string;
};

const categories = [
  "All",
  "Heritage",
  "Food",
  "Culture",
  "Nature",
  "Adventure",
  "Local Life",
];

export default function GuidesPage() {
  const [guides, setGuides] = useState<Guide[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [liked, setLiked] = useState<string[]>([]);

  useEffect(() => {
    const loadGuides = async () => {
      try {
        const response = await fetch("/api/guides", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result?.message || "Unable to load guides"
          );
        }

        setGuides(result.data || []);
      } catch (error) {
        console.error("GUIDES_PAGE_ERROR:", error);
      } finally {
        setLoading(false);
      }
    };

    loadGuides();
  }, []);

  const filteredGuides = useMemo(() => {
    const query = search.trim().toLowerCase();

    return guides.filter((guide) => {
      const matchesSearch =
        !query ||
        guide.name.toLowerCase().includes(query) ||
        guide.location.toLowerCase().includes(query) ||
        guide.bio.toLowerCase().includes(query) ||
        guide.specialties.some((item) =>
          item.toLowerCase().includes(query)
        );

      const matchesCategory =
        category === "All" ||
        guide.specialties.some(
          (item) =>
            item.toLowerCase() === category.toLowerCase()
        );

      return matchesSearch && matchesCategory;
    });
  }, [guides, search, category]);

  const toggleLike = (id: string) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-white text-black">

      {/* ================= NAVBAR ================= */}
<Navbar/>
      {/* ================= HERO ================= */}

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">

          <div className="max-w-3xl">

            <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.28em]">
              VISTARA LOCAL GUIDES
            </p>

            <h1 className="font-serif text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              Meet the people
              <br />
              who know the place.
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-black/60 sm:text-[15px]">
              Explore destinations with locals who know the
              streets, food, culture, stories and hidden places
              beyond the usual tourist path.
            </p>

          </div>
        </div>
      </section>

      {/* ================= SEARCH ================= */}

      <section className="border-b border-black/10">

        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-5 py-4 sm:px-8 lg:flex-row lg:items-center lg:px-10">

          <div className="relative w-full lg:max-w-xl">

            <Search
              size={16}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-black/45"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search guides, destinations or experiences"
              className="h-10 w-full rounded-full border border-black/15 bg-white pl-10 pr-4 text-xs outline-none transition placeholder:text-black/40 focus:border-black"
            />

          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">

            {categories.map((item) => {
              const active = category === item;

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs font-medium transition ${
                    active
                      ? "border-black bg-black text-white"
                      : "border-black/15 bg-white hover:border-black"
                  }`}
                >
                  {item}
                </button>
              );
            })}

          </div>

        </div>
      </section>

      {/* ================= GUIDES ================= */}

      <section className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">

        <div className="mb-6 flex items-end justify-between">

          <div>

            <p className="text-[10px] font-bold uppercase tracking-[0.25em]">
              {filteredGuides.length} LOCAL GUIDES
            </p>

            <h2 className="mt-1.5 font-serif text-3xl font-semibold tracking-tight">
              Find your local expert
            </h2>

          </div>

          <p className="hidden text-xs text-black/45 sm:block">
            Local coverage up to 30 km
          </p>

        </div>

        {/* LOADING */}

        {loading && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-[450px] animate-pulse rounded-2xl border border-black/10 bg-black/[0.03]"
              />
            ))}

          </div>
        )}

        {/* EMPTY */}

        {!loading && filteredGuides.length === 0 && (
          <div className="rounded-2xl border border-black/10 py-20 text-center">

            <h3 className="font-serif text-2xl font-semibold">
              No guides found
            </h3>

            <p className="mt-2 text-sm text-black/50">
              Try another destination or category.
            </p>

          </div>
        )}

        {/* CARDS */}

        {!loading && filteredGuides.length > 0 && (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {filteredGuides.map((guide) => {

              const isLiked = liked.includes(guide.id);

              return (
                <article
                  key={guide.id}
                  className="group overflow-hidden rounded-2xl border border-black/10 bg-white transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)]"
                >

                  {/* IMAGE */}

                  <div className="relative h-52 overflow-hidden bg-black/5">

                    <Image
                      src={guide.image}
                      alt={guide.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-105"
                    />

                    {/* VERIFIED */}

                    {guide.verified && (
                      <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-[10px] font-semibold shadow-sm">

                        <ShieldCheck size={13} />

                        Verified

                      </div>
                    )}

                    {/* HEART */}

                    <button
                      type="button"
                      onClick={() => toggleLike(guide.id)}
                      aria-label="Save guide"
                      className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white transition hover:scale-105"
                    >
                      <Heart
                        size={16}
                        fill={isLiked ? "currentColor" : "none"}
                      />
                    </button>

                    {/* RATING */}

                    <div className="absolute bottom-3 right-3 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-xs font-semibold shadow-sm">

                      <Star
                        size={12}
                        fill="currentColor"
                      />

                      {guide.rating}

                    </div>

                  </div>

                  {/* CARD CONTENT */}

                  <div className="p-5">

                    <h3 className="font-serif text-[22px] font-semibold tracking-tight">
                      {guide.name}
                    </h3>

                    <div className="mt-1.5 flex items-center gap-1.5 text-xs text-black/55">

                      <MapPin size={13} />

                      {guide.location}

                    </div>

                    <p className="mt-3 line-clamp-2 text-[13px] leading-5 text-black/60">
                      {guide.bio}
                    </p>

                    {/* TAGS */}

                    <div className="mt-3 flex flex-wrap gap-1.5">

                      {guide.specialties.map((specialty) => (
                        <span
                          key={specialty}
                          className="rounded-full border border-black/10 px-2.5 py-1 text-[10px] font-medium"
                        >
                          {specialty}
                        </span>
                      ))}

                    </div>

                    {/* LANGUAGES */}

                    <div className="mt-3 flex items-center gap-2 text-xs text-black/50">

                      <Languages size={13} />

                      {guide.languages.join(" · ")}

                    </div>

                    <div className="my-4 border-t border-black/10" />

                    {/* PRICE */}

                    <div className="flex items-end justify-between gap-3">

                      <div>

                        <p className="text-[9px] uppercase tracking-wider text-black/40">
                          From
                        </p>

                        <p className="mt-0.5 text-lg font-semibold">

                          ₹{guide.pricePerHour.toLocaleString("en-IN")}

                          <span className="ml-1 text-[11px] font-normal text-black/45">
                            / hour
                          </span>

                        </p>

                      </div>

                      <Link
                        href={`/guides/${guide.id}`}
                        className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-black/80"
                      >
                        View Guide
                        <ArrowRight size={14} />
                      </Link>

                    </div>

                    {/* DETAILS */}

                    <div className="mt-3 flex items-center justify-between text-[10px] text-black/45">

                      <span>
                        {guide.reviews} traveller reviews
                      </span>

                      <span>
                        {guide.experience} experience
                      </span>

                    </div>

                    {/* COVERAGE */}

                    <div className="mt-3 rounded-xl bg-black/[0.035] px-3 py-2 text-[11px] text-black/65">

                      <span className="font-semibold text-black">
                        {guide.coverageKm} km
                      </span>{" "}
                      local coverage

                    </div>

                  </div>
                </article>
              );
            })}

          </div>
        )}
      </section>

      {/* ================= CTA ================= */}

      <section className="mx-auto max-w-7xl px-5 pb-12 sm:px-8 lg:px-10">

        <div className="rounded-2xl bg-black px-7 py-9 text-white sm:px-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

            <div className="max-w-2xl">

              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/45">
                TRAVEL DIFFERENTLY
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
                See the destination through local eyes.
              </h2>

              <p className="mt-2.5 text-sm leading-6 text-white/55">
                Buy a local guide and explore nearby food,
                culture, heritage and hidden places with someone
                who knows the area.
              </p>

            </div>

            <Link
              href="/explore"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition hover:bg-white/90"
            >
              Explore destinations
              <ArrowRight size={15} />
            </Link>

          </div>

        </div>

      </section>

      {/* ================= FOOTER ================= */}

     <Footer/>

    </main>
  );
}