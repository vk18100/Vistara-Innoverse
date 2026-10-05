"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  Heart,
  ArrowUpRight,
  MapPin,
  Clock3,
  Star,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "../footer/page";

import {
  experiences,
  categories,
  type Experience,
} from "@/data/explore";

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);

  /* -----------------------------------------
     FILTER
  ----------------------------------------- */

  const filteredExperiences = useMemo(() => {
    const value = search.trim().toLowerCase();

    return experiences.filter((experience: Experience) => {
      const categoryMatch =
        activeCategory === "All" ||
        experience.category === activeCategory;

      const searchMatch =
        value === "" ||
        experience.title.toLowerCase().includes(value) ||
        experience.location.toLowerCase().includes(value) ||
        experience.city.toLowerCase().includes(value) ||
        experience.state.toLowerCase().includes(value) ||
        experience.category.toLowerCase().includes(value) ||
        experience.tags.some((tag) =>
          tag.toLowerCase().includes(value)
        );

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  /* -----------------------------------------
     LIKE
  ----------------------------------------- */

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* =====================================
          INTRO
      ===================================== */}

      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-[1400px] px-5 pb-9 pt-10 sm:px-8 lg:px-10 lg:pb-11 lg:pt-12">

          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-neutral-500">
            VISTARA EXPLORE
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <h1 className="text-4xl font-semibold tracking-[-0.035em] text-black sm:text-5xl">
                Explore what’s around you.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 sm:text-base">
                Discover local places, food, culture, nature and
                experiences worth finding around your destination.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =====================================
          SEARCH + CATEGORIES
      ===================================== */}

      <section className="border-b border-neutral-200 bg-white">
        <div className="mx-auto max-w-[1400px] px-5 py-4 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* SEARCH */}

            <div className="flex h-12 w-full items-center rounded-full border border-neutral-300 bg-white px-4 transition focus-within:border-black lg:max-w-[420px]">

              <Search
                size={17}
                strokeWidth={1.8}
                className="mr-3 shrink-0 text-neutral-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search places, food, culture..."
                className="w-full bg-transparent text-sm text-black outline-none placeholder:text-neutral-400"
              />
            </div>

            {/* CATEGORIES */}

           <div className="flex flex-1 gap-2 overflow-x-auto pb-1 lg:justify-end">
  {["All", ...categories].map((category) => {
                const active =
                  activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() =>
                      setActiveCategory(category)
                    }
                    className={`
                      shrink-0 rounded-full border px-4 py-2.5
                      text-sm font-medium transition-all
                      ${
                        active
                          ? "border-black bg-black text-white"
                          : "border-neutral-200 bg-white text-neutral-600 hover:border-neutral-400 hover:text-black"
                      }
                    `}
                  >
                    {category}
                  </button>
                );
              })}

            </div>
          </div>
        </div>
      </section>

      {/* =====================================
          EXPLORE GRID
      ===================================== */}

      <section className="mx-auto max-w-[1400px] px-5 py-10 sm:px-8 lg:px-10 lg:py-12">

        {/* HEADER */}

        <div className="mb-7 flex items-end justify-between gap-4">

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-neutral-500">
              {filteredExperiences.length} PLACES
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-[-0.025em] text-black sm:text-3xl">
              Discover something new.
            </h2>
          </div>

        </div>

        {/* =================================
            EMPTY
        ================================= */}

        {filteredExperiences.length === 0 ? (
          <div className="rounded-2xl border border-neutral-200 px-6 py-20 text-center">

            <Search
              size={25}
              className="mx-auto text-neutral-400"
            />

            <h3 className="mt-4 text-xl font-semibold">
              Nothing found
            </h3>

            <p className="mt-2 text-sm text-neutral-500">
              Try another search or category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-5 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white"
            >
              Clear filters
            </button>
          </div>
        ) : (

          /* =================================
             GRID
          ================================= */

          <div className="grid grid-cols-1 gap-x-5 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredExperiences.map((experience) => {

              const isLiked =
                liked.includes(experience.id);

              return (
                <article
                  key={experience.id}
                  className="group min-w-0"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-neutral-100">

                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.035]"
                    />

                    {/* CATEGORY */}

                    <div className="absolute left-3 top-3">
                      <span className="rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-black">
                        {experience.category}
                      </span>
                    </div>

                    {/* LIKE */}

                    <button
                      type="button"
                      onClick={() =>
                        toggleLike(experience.id)
                      }
                      aria-label="Save"
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-black transition hover:scale-105"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.8}
                        className={
                          isLiked
                            ? "fill-black"
                            : ""
                        }
                      />
                    </button>

                    {/* ARROW */}

                    <Link
                      href={`/explore/${experience.id}`}
                      aria-label={`View ${experience.title}`}
                      className="absolute bottom-3 right-3 flex h-9 w-9 translate-y-2 items-center justify-center rounded-full bg-white text-black opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                    >
                      <ArrowUpRight
                        size={17}
                      />
                    </Link>

                  </div>

                  {/* CONTENT */}

                  <Link
                    href={`/explore/${experience.id}`}
                    className="block pt-3"
                  >

                    {/* LOCATION + RATING */}

                    <div className="flex items-center justify-between gap-3">

                      <div className="flex min-w-0 items-center gap-1.5 text-xs text-neutral-500">

                        <MapPin
                          size={13}
                          className="shrink-0"
                        />

                        <span className="truncate">
                          {experience.location}
                        </span>

                      </div>

                      <div className="flex shrink-0 items-center gap-1 text-xs font-medium text-black">

                        <Star
                          size={13}
                          className="fill-black"
                        />

                        {experience.rating}

                      </div>

                    </div>

                    {/* TITLE */}

                    <h3 className="mt-1.5 line-clamp-1 text-[17px] font-semibold leading-6 text-black">
                      {experience.title}
                    </h3>

                    {/* DESCRIPTION */}

                    <p className="mt-1.5 line-clamp-2 text-sm leading-5 text-neutral-500">
                      {experience.description}
                    </p>

                    {/* META */}

                    <div className="mt-3 flex items-center justify-between">

                      <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                        <Clock3 size={13} />
                        {experience.duration}
                      </span>

                      <span className="text-sm font-semibold text-black">
                        {experience.priceLabel}
                      </span>

                    </div>

                  </Link>

                </article>
              );
            })}

          </div>
        )}
      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <Footer />

    </main>
  );
}