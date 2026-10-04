"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Clock3,
  ArrowUpRight,
  Menu,
  UserRound,
  Heart,
} from "lucide-react";

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
   NAVBAR
========================================================= */

function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#E7E2D9] bg-white/95 backdrop-blur-xl">
      <div className="mx-auto flex h-[78px] max-w-[1500px] items-center justify-between px-5 sm:px-8 lg:px-10">

        {/* LOGO */}

        <Link
          href="/"
          className="font-serif text-[31px] font-bold tracking-[-0.05em] text-[#171614]"
        >
          Vistara
        </Link>

        {/* DESKTOP NAV */}

        <nav className="hidden items-center gap-9 md:flex">
          <Link
            href="/stays"
            className="text-[15px] font-medium text-[#514D47] transition hover:text-[#171614]"
          >
            Stays
          </Link>

          <Link
            href="/trips"
            className="text-[15px] font-medium text-[#514D47] transition hover:text-[#171614]"
          >
            Trips
          </Link>

          <Link
            href="/experiences"
            className="text-[15px] font-semibold text-[#171614]"
          >
            Experiences
          </Link>

          <Link
            href="/explore"
            className="text-[15px] font-medium text-[#514D47] transition hover:text-[#171614]"
          >
            Explore
          </Link>
        </nav>

        {/* RIGHT */}

        <div className="flex items-center gap-3">

          <button
            type="button"
            aria-label="Search"
            className="hidden h-10 w-10 items-center justify-center rounded-full transition hover:bg-[#F5F1E9] sm:flex"
          >
            <Search size={19} strokeWidth={1.8} />
          </button>

          <Link
            href="/login"
            className="hidden text-sm font-semibold text-[#292724] sm:block"
          >
            Sign in
          </Link>

          <button
            type="button"
            aria-label="Account"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DED8CE] bg-white transition hover:bg-[#F8F5EF]"
          >
            <UserRound size={18} strokeWidth={1.8} />
          </button>

          <button
            type="button"
            aria-label="Menu"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#DED8CE] bg-white md:hidden"
          >
            <Menu size={18} />
          </button>

        </div>
      </div>
    </header>
  );
}

/* =========================================================
   EXPERIENCE CARD
========================================================= */

function ExperienceCard({
  activity,
}: {
  activity: Activity;
}) {
  const [liked, setLiked] = useState(false);

  return (
    <article className="group">

      {/* IMAGE */}

      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#EDE8DE]">

        <img
          src={activity.image}
          alt={activity.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          onError={(event) => {
            event.currentTarget.src =
              "/images/download (2).jpg";
          }}
        />

        {/* OVERLAY */}

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-black/5 to-transparent opacity-80" />

        {/* CATEGORY */}

        <div className="absolute left-4 top-4">
          <span className="rounded-full bg-white/95 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#514D47] shadow-sm backdrop-blur">
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
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setLiked((value) => !value);
          }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 shadow-sm backdrop-blur transition hover:scale-105"
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            className={
              liked
                ? "fill-[#9B7445] text-[#9B7445]"
                : "text-[#292724]"
            }
          />
        </button>

        {/* VIEW EXPERIENCE */}

        <Link
          href={`/experiences/${activity.id}`}
          onClick={(event) => event.stopPropagation()}
          className="
            absolute
            bottom-4
            left-4
            right-4
            flex
            items-center
            justify-between
            rounded-full
            bg-white/95
            px-5
            py-3
            text-sm
            font-semibold
            text-[#171614]
            shadow-lg
            backdrop-blur
            transition-all
            duration-300
            translate-y-3
            opacity-0
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <span>View Experience</span>

          <ArrowUpRight size={17} />
        </Link>
      </div>

      {/* CONTENT */}

      <div className="pt-4">

        {/* TITLE */}

        <div className="flex items-start justify-between gap-4">

          <h2 className="line-clamp-1 text-[17px] font-semibold leading-6 tracking-[-0.01em] text-[#171614]">
            {activity.title}
          </h2>

          <span className="flex shrink-0 items-center gap-1 text-[13px] font-medium text-[#514D47]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B08A57]" />
            Experience
          </span>

        </div>

        {/* LOCATION */}

        <div className="mt-1.5 flex items-center gap-1.5 text-sm text-[#77726A]">
          <MapPin size={14} strokeWidth={1.7} />
          <span>{activity.location}</span>
        </div>

        {/* DESCRIPTION */}

        <p className="mt-2 line-clamp-2 text-sm leading-5 text-[#77726A]">
          {activity.description}
        </p>

        {/* BOTTOM */}

        <div className="mt-3 flex items-center justify-between">

          <div className="flex items-center gap-1.5 text-sm text-[#77726A]">
            <Clock3 size={14} strokeWidth={1.7} />
            {activity.duration}
          </div>

          <div>
            <span className="text-[16px] font-semibold text-[#171614]">
              ₹{activity.price.toLocaleString("en-IN")}
            </span>

            <span className="ml-1 text-xs text-[#77726A]">
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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredActivities = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return activities.filter((activity) => {

      const categoryMatch =
        selectedCategory === "All" ||
        activity.category === selectedCategory;

      const searchMatch =
        !normalizedSearch ||
        activity.title.toLowerCase().includes(normalizedSearch) ||
        activity.location.toLowerCase().includes(normalizedSearch) ||
        activity.category.toLowerCase().includes(normalizedSearch);

      return categoryMatch && searchMatch;
    });
  }, [selectedCategory, search]);

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <Navbar />

      {/* =================================================
          HERO
      ================================================= */}

      <section className="bg-white">

        <div className="mx-auto max-w-[1500px] px-5 pb-10 pt-12 sm:px-8 lg:px-10 lg:pb-14 lg:pt-16">

          <div className="max-w-3xl">

            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#9B7445]">
              EXPERIENCE THE DESTINATION
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-[1.02] tracking-[-0.04em] text-[#171614] sm:text-6xl lg:text-7xl">
              Make your journey
              <br />
              <span className="text-[#8C8274]">
                more memorable.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base leading-7 text-[#77726A] sm:text-lg">
              Discover local experiences, hidden places and unforgettable
              moments created around the destinations you love.
            </p>

          </div>

          {/* SEARCH */}

          <div className="mt-10 flex max-w-2xl items-center rounded-full border border-[#DED8CE] bg-white p-1.5 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">

            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#F5F1E9]">
              <Search size={18} className="text-[#514D47]" />
            </div>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search experiences or destinations"
              className="h-12 flex-1 bg-transparent px-3 text-sm text-[#171614] outline-none placeholder:text-[#9A958C]"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="mr-2 rounded-full px-3 py-2 text-xs font-semibold text-[#77726A] hover:bg-[#F5F1E9]"
              >
                Clear
              </button>
            )}

          </div>

        </div>
      </section>

      {/* =================================================
          CATEGORY NAVIGATION
      ================================================= */}

      <section className="sticky top-[78px] z-30 border-b border-[#E7E2D9] bg-[#FAF9F6]/95 backdrop-blur-xl">

        <div className="mx-auto max-w-[1500px] overflow-x-auto px-5 sm:px-8 lg:px-10">

          <div className="flex min-w-max items-center gap-2 py-4">

            {categories.map((category) => {
              const active = selectedCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`
                    rounded-full
                    px-5
                    py-2.5
                    text-sm
                    font-medium
                    transition-all
                    ${
                      active
                        ? "bg-[#171614] text-white shadow-sm"
                        : "bg-white text-[#625D55] hover:bg-[#F0ECE4]"
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

      {/* =================================================
          EXPERIENCE RESULTS
      ================================================= */}

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10 lg:py-14">

        {/* HEADER */}

        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9B7445]">
              CURATED FOR YOU
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.025em] text-[#171614] sm:text-4xl">
              Experiences worth remembering
            </h2>

          </div>

          <p className="text-sm text-[#77726A]">
            {filteredActivities.length}{" "}
            {filteredActivities.length === 1
              ? "experience"
              : "experiences"}
          </p>

        </div>

        {/* =================================================
            GRID
        ================================================= */}

        {filteredActivities.length > 0 ? (

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredActivities.map((activity) => (
              <ExperienceCard
                key={activity.id}
                activity={activity}
              />
            ))}

          </div>

        ) : (

          /* EMPTY STATE */

          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-[#E4DED4] bg-white px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F5F1E9]">
              <Search size={24} className="text-[#8C8274]" />
            </div>

            <h3 className="mt-6 font-serif text-3xl font-semibold text-[#171614]">
              No experiences found
            </h3>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#77726A]">
              Try searching for another destination or choose a different
              category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setSelectedCategory("All");
              }}
              className="mt-6 rounded-full bg-[#171614] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#292724]"
            >
              Show all experiences
            </button>

          </div>
        )}

      </section>

      {/* =================================================
          FOOTER
      ================================================= */}

      <footer className="border-t border-[#E7E2D9] bg-white">

        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-8 sm:px-8 md:flex-row md:items-center md:justify-between lg:px-10">

          <p className="font-serif text-xl font-semibold text-[#171614]">
            Vistara
          </p>

          <p className="text-sm text-[#77726A]">
            Discover places. Create memories.
          </p>

        </div>

      </footer>

    </main>
  );
}