"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Clock3,
  ArrowUpRight,
  Heart,
} from "lucide-react";

import Navbar from "@/components/navbar";

/* =========================================================
   TYPES
========================================================= */

type Activity = {
  id: number;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: number;
  image: string;
  description: string;
};

/* =========================================================
   ACTIVITIES
========================================================= */

const activities: Activity[] = [
  {
    id: 1,
    title: "Local Food Walk",
    location: "Kankarbagh, Patna",
    category: "Food",
    duration: "2–3 hours",
    price: 499,
    image: "/images/Cultural Crown.jpg",
    description:
      "Taste authentic local flavours, discover hidden food spots and experience the food culture of the destination.",
  },
  {
    id: 2,
    title: "Heritage Walk",
    location: "Patna, Bihar",
    category: "Culture",
    duration: "2 hours",
    price: 399,
    image: "/images/download (4).jpg",
    description:
      "Walk through historic streets, iconic landmarks and cultural places while discovering the stories behind them.",
  },
  {
    id: 3,
    title: "Sunset Riverside Experience",
    location: "Ganga Ghat, Patna",
    category: "Nature",
    duration: "2 hours",
    price: 299,
    image: "/images/download (2).jpg",
    description:
      "Slow down and enjoy beautiful landscapes, peaceful surroundings and memorable moments close to nature.",
  },
  {
    id: 4,
    title: "Local Market Explorer",
    location: "Patna",
    category: "Shopping",
    duration: "2–3 hours",
    price: 349,
    image: "/images/download (5).jpg",
    description:
      "Explore vibrant local markets, discover unique finds and experience the everyday life of the destination.",
  },
  {
    id: 5,
    title: "Cafe Hopping",
    location: "Patna",
    category: "Cafe",
    duration: "3 hours",
    price: 599,
    image: "/images/Tour through coastal Mallorca.jpg",
    description:
      "Visit charming local cafés, enjoy signature treats and discover the local coffee and food culture.",
  },
  {
    id: 6,
    title: "Photography Trail",
    location: "Patna",
    category: "Experience",
    duration: "2 hours",
    price: 449,
    image: "/images/download (3).jpg",
    description:
      "Capture beautiful locations, local life and hidden visual gems while exploring the destination.",
  },
  {
    id: 7,
    title: "Adventure & Rafting",
    location: "Slovenia",
    category: "Adventure",
    duration: "3–4 hours",
    price: 1299,
    image:
      "/images/Whitewater rafting in Slovenia, on the emerald Soca River.jpg",
    description:
      "Take on rushing turquoise waters and experience an unforgettable outdoor adventure surrounded by nature.",
  },
  {
    id: 8,
    title: "Mountain Escape",
    location: "Swiss Alps",
    category: "Nature",
    duration: "5 hours",
    price: 1799,
    image: "/images/download (2).jpg",
    description:
      "Explore breathtaking alpine landscapes, peaceful valleys and scenic mountain trails.",
  },
  {
    id: 9,
    title: "Desert Balloon Experience",
    location: "Dubai, UAE",
    category: "Adventure",
    duration: "3 hours",
    price: 2499,
    image: "/images/download (1).jpg",
    description:
      "Rise above the desert at sunrise and experience sweeping views across the golden dunes.",
  },
  {
    id: 10,
    title: "Northern Lights",
    location: "Iceland",
    category: "Nature",
    duration: "4 hours",
    price: 2999,
    image: "/images/download (11).jpg",
    description:
      "Chase the northern lights and witness one of nature's most spectacular nighttime experiences.",
  },
  {
    id: 11,
    title: "Venice Canal Ride",
    location: "Venice, Italy",
    category: "Culture",
    duration: "2 hours",
    price: 1599,
    image: "/images/download (4).jpg",
    description:
      "Glide through Venice's historic canals and discover the city's architecture from the water.",
  },
  {
    id: 12,
    title: "Mountain Paragliding",
    location: "Interlaken, Switzerland",
    category: "Adventure",
    duration: "2 hours",
    price: 3999,
    image: "/images/download (6).jpg",
    description:
      "Fly above alpine valleys and turquoise lakes for an unforgettable high-altitude adventure.",
  },
];

/* =========================================================
   CATEGORIES
========================================================= */

const categories = [
  "All",
  "Food",
  "Culture",
  "Nature",
  "Shopping",
  "Cafe",
  "Experience",
  "Adventure",
];

/* =========================================================
   EXPERIENCE CARD
========================================================= */

function ExperienceCard({
  activity,
}: {
  activity: Activity;
}) {
  const [liked, setLiked] = useState(false);

  /* LOAD SAVED WISHLIST */

  useEffect(() => {
    try {
      const saved = JSON.parse(
        localStorage.getItem("vistara-wishlist") || "[]"
      ) as number[];

      setLiked(saved.includes(activity.id));
    } catch {
      setLiked(false);
    }
  }, [activity.id]);

  /* TOGGLE WISHLIST */

  const toggleWishlist = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const saved = JSON.parse(
        localStorage.getItem("vistara-wishlist") || "[]"
      ) as number[];

      let updated: number[];

      if (saved.includes(activity.id)) {
        updated = saved.filter((id) => id !== activity.id);
        setLiked(false);
      } else {
        updated = [...saved, activity.id];
        setLiked(true);
      }

      localStorage.setItem(
        "vistara-wishlist",
        JSON.stringify(updated)
      );

      window.dispatchEvent(new Event("wishlistUpdated"));
    } catch {
      // Ignore localStorage errors.
    }
  };

  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(3,4,94,0.08)]">
      {/* IMAGE */}

      <div className="relative aspect-[4/3] overflow-hidden bg-[#EEF4FF]">
        <img
          src={activity.image}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          onError={(event) => {
            event.currentTarget.src = "/images/download (2).jpg";
          }}
        />

        {/* IMAGE OVERLAY */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-transparent" />

        {/* CATEGORY */}

        <div className="absolute left-3 top-3">
          <span className="rounded-full bg-white px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.1em] text-black shadow-sm">
            {activity.category}
          </span>
        </div>

        {/* WISHLIST */}

        <button
          type="button"
          aria-label={
            liked
              ? `Remove ${activity.title} from wishlist`
              : `Save ${activity.title} to wishlist`
          }
          onClick={toggleWishlist}
          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white shadow-sm transition hover:scale-105"
        >
          <Heart
            size={16}
            strokeWidth={1.8}
            className={
              liked
                ? "fill-black text-black"
                : "text-black"
            }
          />
        </button>

        {/* VIEW EXPERIENCE */}

        <Link
          href={`/experiences/${activity.id}`}
          onClick={(event) => event.stopPropagation()}
          className="
            absolute
            bottom-3
            left-3
            right-3
            flex
            items-center
            justify-between
            rounded-full
            bg-white
            px-4
            py-2
            text-[12px]
            font-semibold
            text-black
            shadow-lg
            opacity-0
            translate-y-2
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span>View Experience</span>
          <ArrowUpRight size={14} />
        </Link>
      </div>

      {/* CONTENT */}

      <div className="p-3.5">
        {/* TITLE */}

        <div className="flex items-start justify-between gap-2">
          <h2 className="line-clamp-1 text-[15px] font-semibold leading-5 tracking-[-0.01em] text-black">
            {activity.title}
          </h2>

          <span className="flex shrink-0 items-center gap-1 text-[10px] font-medium text-black">
            <span className="h-1.5 w-1.5 rounded-full bg-black" />
            Experience
          </span>
        </div>

        {/* LOCATION */}

        <div className="mt-1 flex items-center gap-1.5 text-[12px] text-black">
          <MapPin size={12} strokeWidth={1.7} />
          <span>{activity.location}</span>
        </div>

        {/* DESCRIPTION */}

        <p className="mt-1.5 line-clamp-2 text-[12px] leading-[18px] text-black">
          {activity.description}
        </p>

        {/* BOTTOM */}

        <div className="mt-2.5 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-[11px] text-black">
            <Clock3 size={12} strokeWidth={1.7} />
            <span>{activity.duration}</span>
          </div>

          <div>
            <span className="text-[14px] font-semibold text-black">
              ₹{activity.price.toLocaleString("en-IN")}
            </span>

            <span className="ml-1 text-[9px] text-black">
              / person
            </span>
          </div>
        </div>
      </div>
    </article>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function ExperiencesPage() {
  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  /* FILTER */

  const filteredActivities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return activities.filter((activity) => {
      const categoryMatch =
        selectedCategory === "All" ||
        activity.category === selectedCategory;

      const searchMatch =
        !normalizedSearch ||
        activity.title
          .toLowerCase()
          .includes(normalizedSearch) ||
        activity.location
          .toLowerCase()
          .includes(normalizedSearch) ||
        activity.category
          .toLowerCase()
          .includes(normalizedSearch);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  return (
    <main className="min-h-screen bg-[#F8FAFC] text-black">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <Navbar />

      {/* =====================================================
          COMPACT HERO
      ===================================================== */}

      <section className="bg-white">
        <div className="mx-auto max-w-[1500px] px-5 py-5 sm:px-8 lg:px-10">

          {/* SMALL HERO DIV */}

          <div className="rounded-[18px] border border-[#E2E8F0] bg-white px-5 py-5 shadow-[0_3px_18px_rgba(3,4,94,0.04)] sm:px-6 sm:py-6">

            {/* SMALL LABEL */}

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black">
              EXPERIENCE THE DESTINATION
            </p>

            {/* HEADING */}

            <h1 className="mt-2 font-serif text-3xl font-semibold leading-[1.08] tracking-[-0.03em] text-black sm:text-4xl lg:text-[42px]">
              Make your journey
              <br />
              more memorable.
            </h1>

            {/* DESCRIPTION */}

            <p className="mt-2 max-w-xl text-[12px] leading-5 text-black sm:text-[13px]">
              Discover local experiences, hidden places and
              unforgettable moments created around the
              destinations you love.
            </p>

            {/* SEARCH */}

            <div className="mt-4 flex max-w-xl items-center rounded-full border border-[#CBD5E1] bg-white p-1 shadow-[0_5px_20px_rgba(0,0,0,0.05)]">

              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EEF4FF]">
                <Search
                  size={15}
                  strokeWidth={1.8}
                  className="text-black"
                />
              </div>

              <input
                type="text"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search experiences or destinations"
                className="h-9 flex-1 bg-transparent px-3 text-[12px] text-black outline-none placeholder:text-black"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mr-1 rounded-full px-2.5 py-1.5 text-[10px] font-semibold text-black hover:bg-[#EEF4FF]"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CATEGORY NAVIGATION
      ===================================================== */}

      <section className="border-y border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-[1500px] overflow-x-auto px-5 sm:px-8 lg:px-10">
          <div className="flex min-w-max items-center gap-1.5 py-2.5">

            {categories.map((category) => {
              const active =
                selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() =>
                    setSelectedCategory(category)
                  }
                  className={`
                    rounded-full
                    px-3.5
                    py-1.5
                    text-[11px]
                    font-medium
                    transition-all
                    ${
                      active
                        ? "bg-black text-white"
                        : "bg-[#F8FAFC] text-black hover:bg-[#EEF4FF]"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          RESULTS
      ===================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10 lg:py-7">

        {/* RESULT HEADER */}

        <div className="mb-5 flex items-end justify-between rounded-[18px] border border-[#E2E8F0] bg-white px-5 py-4">

          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-black">
              CURATED FOR YOU
            </p>

            <h2 className="mt-1 font-serif text-xl font-semibold tracking-[-0.02em] text-black sm:text-2xl">
              Experiences worth remembering
            </h2>
          </div>

          <p className="text-[11px] text-black">
            {filteredActivities.length}{" "}
            {filteredActivities.length === 1
              ? "experience"
              : "experiences"}
          </p>
        </div>

        {/* GRID */}

        {filteredActivities.length > 0 ? (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredActivities.map((activity) => (
              <ExperienceCard
                key={activity.id}
                activity={activity}
              />
            ))}
          </div>
        ) : (
          /* EMPTY STATE */

          <div className="flex min-h-[320px] flex-col items-center justify-center rounded-[20px] border border-[#E2E8F0] bg-white px-6 text-center">

            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF4FF]">
              <Search size={19} className="text-black" />
            </div>

            <h3 className="mt-4 font-serif text-xl font-semibold text-black">
              No experiences found
            </h3>

            <p className="mt-2 max-w-md text-[12px] leading-5 text-black">
              Try searching for another destination or
              choose a different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-4 rounded-full bg-black px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-[#03045E]"
            >
              Show all experiences
            </button>
          </div>
        )}
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-2 px-5 py-6 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

          <div>
            <p className="font-serif text-base font-semibold text-black">
              Vistara
            </p>

            <p className="mt-0.5 text-[10px] text-black">
              Discover places. Create memories.
            </p>
          </div>

          <p className="text-[10px] text-black">
            © {new Date().getFullYear()} Vistara
          </p>
        </div>
      </footer>
    </main>
  );
}