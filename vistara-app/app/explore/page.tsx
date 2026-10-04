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
  Compass,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "../footer/page";

type Experience = {
  id: number;
  title: string;
  location: string;
  category: string;
  duration: string;
  price: string;
  rating: string;
  image: string;
  description: string;
};

const experiences: Experience[] = [
  {
    id: 1,
    title: "Golghar Heritage Walk",
    location: "Patna, Bihar",
    category: "Heritage",
    duration: "2 hours",
    price: "From ₹699",
    rating: "4.9",
    image: "/images/golghar.jpg",
    description:
      "Discover Patna through its iconic heritage and local stories.",
  },

  {
    id: 2,
    title: "Jaipur Palace Discovery",
    location: "Jaipur, Rajasthan",
    category: "Heritage",
    duration: "3 hours",
    price: "From ₹999",
    rating: "4.8",
    image: "/images/hawamahal.jpg",
    description:
      "Walk through Jaipur's royal streets, architecture and culture.",
  },

  {
    id: 3,
    title: "Qutub Heritage Trail",
    location: "Delhi, India",
    category: "Heritage",
    duration: "2 hours",
    price: "From ₹799",
    rating: "4.8",
    image: "/images/kutub.jpg.jpg",
    description:
      "Explore historic architecture and stories from old Delhi.",
  },

  {
    id: 4,
    title: "Local Café & Coffee Trail",
    location: "Bengaluru, Karnataka",
    category: "Food",
    duration: "3 hours",
    price: "From ₹899",
    rating: "4.7",
    image: "/images/coffeebin.jpg",
    description:
      "Taste local coffee and discover neighbourhood cafés.",
  },

  {
    id: 5,
    title: "Countryside Farm Experience",
    location: "Bihar, India",
    category: "Local Life",
    duration: "3 hours",
    price: "From ₹799",
    rating: "4.8",
    image: "/images/farm.jpg",
    description:
      "Spend time with local communities and experience rural life.",
  },

  {
    id: 6,
    title: "Hidden Heritage House",
    location: "Rajasthan, India",
    category: "Heritage",
    duration: "2 hours",
    price: "From ₹699",
    rating: "4.7",
    image: "/images/blackhouse.jpg",
    description:
      "Step inside a lesser-known architectural gem.",
  },

  {
    id: 7,
    title: "Coastal Escape",
    location: "Goa, India",
    category: "Nature",
    duration: "3 hours",
    price: "From ₹899",
    rating: "4.8",
    image: "/images/beachhouse.jpg.jpg",
    description:
      "Slow down with coastal views and local experiences.",
  },

  {
    id: 8,
    title: "City Lights Discovery",
    location: "Dubai",
    category: "Adventure",
    duration: "4 hours",
    price: "From ₹1,499",
    rating: "4.8",
    image: "/images/dubai.jpg",
    description:
      "Experience the city after sunset through local highlights.",
  },

  {
    id: 9,
    title: "Ancient Temple Trail",
    location: "India",
    category: "Heritage",
    duration: "3 hours",
    price: "From ₹799",
    rating: "4.9",
    image: "/images/krantaktemple.jpg",
    description:
      "Discover architecture, rituals and stories around an ancient temple.",
  },

  {
    id: 10,
    title: "Local Home Experience",
    location: "Patna, Bihar",
    category: "Local Life",
    duration: "2 hours",
    price: "From ₹599",
    rating: "4.8",
    image: "/images/house.jpg",
    description:
      "Meet locals and experience the city from a different perspective.",
  },

  {
    id: 11,
    title: "Grand City Discovery",
    location: "India",
    category: "Adventure",
    duration: "4 hours",
    price: "From ₹1,099",
    rating: "4.7",
    image: "/images/big.jpg",
    description:
      "See the city through places most travellers miss.",
  },

  {
    id: 12,
    title: "Hidden Gem Escape",
    location: "Patna, Bihar",
    category: "Nature",
    duration: "3 hours",
    price: "From ₹699",
    rating: "4.9",
    image: "/images/download.jpg",
    description:
      "Find a quiet corner and experience the destination differently.",
  },
];

const categories = [
  "All",
  "Heritage",
  "Nature",
  "Food",
  "Local Life",
  "Adventure",
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] =
    useState("All");

  const [search, setSearch] = useState("");

  const [liked, setLiked] = useState<number[]>([]);

  const filteredExperiences = useMemo(() => {
    const value = search.trim().toLowerCase();

    return experiences.filter((experience) => {
      const categoryMatch =
        activeCategory === "All" ||
        experience.category === activeCategory;

      const searchMatch =
        value === "" ||
        experience.title
          .toLowerCase()
          .includes(value) ||
        experience.location
          .toLowerCase()
          .includes(value) ||
        experience.category
          .toLowerCase()
          .includes(value);

      return categoryMatch && searchMatch;
    });
  }, [activeCategory, search]);

  function toggleLike(id: number) {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F5F0] text-[#1D1B18]">

      <Navbar />

      {/* ==================================================
          HERO
      ================================================== */}

      <section className="relative overflow-hidden bg-[#F7F5F0]">

        <div className="mx-auto max-w-[1500px] px-5 pb-16 pt-16 sm:px-8 lg:px-12 lg:pb-20 lg:pt-20">

          <div className="grid items-end gap-10 lg:grid-cols-[1.3fr_0.7fr]">

            <div>

              <div className="mb-6 flex items-center gap-3">

                <span className="h-px w-10 bg-[#B28A45]" />

                <p className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#8A6935]">
                  VISTARA DISCOVERY
                </p>

              </div>

              <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[0.98] tracking-[-0.03em] text-[#1D1B18] sm:text-6xl lg:text-8xl">

                Go beyond
                <br />

                <span className="text-[#766B5D]">
                  the usual.
                </span>

              </h1>

              <p className="mt-7 max-w-2xl text-base leading-8 text-[#706A61] sm:text-lg">
                Discover hidden places, local stories, food trails
                and experiences that make a destination feel like
                your own.
              </p>

            </div>

            {/* HERO SIDE */}

            <div className="hidden lg:block">

              <div className="rounded-[28px] border border-[#DDD7CC] bg-white p-6">

                <div className="mb-5 flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#F1E9DA]">
                    <Compass
                      size={20}
                      className="text-[#8A6935]"
                    />
                  </div>

                  <div>
                    <p className="text-sm font-semibold">
                      Discover differently
                    </p>

                    <p className="mt-1 text-xs text-[#817A70]">
                      Places beyond the obvious
                    </p>
                  </div>

                </div>

                <p className="text-sm leading-6 text-[#706A61]">
                  From heritage streets to hidden cafés,
                  find experiences shaped by the people
                  and places around you.
                </p>

              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==================================================
          SEARCH + CATEGORIES
      ================================================== */}

      <section className="sticky top-0 z-30 border-y border-[#DED9D0] bg-[#F7F5F0]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1500px] flex-col gap-4 px-5 py-4 sm:px-8 lg:px-12 lg:flex-row lg:items-center">

          {/* SEARCH */}

          <div className="flex min-h-[54px] flex-1 items-center rounded-full border border-[#D8D2C7] bg-white px-5 transition focus-within:border-[#9C8154] focus-within:shadow-[0_8px_25px_rgba(50,40,25,0.08)]">

            <Search
              size={18}
              className="mr-3 shrink-0 text-[#817A70]"
            />

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Where do you want to explore?"
              className="w-full bg-transparent text-sm text-[#1D1B18] outline-none placeholder:text-[#A29B91]"
            />

          </div>

          {/* CATEGORIES */}

          <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[700px]">

            {categories.map((category) => {

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
                    whitespace-nowrap
                    rounded-full
                    px-5
                    py-3
                    text-sm
                    font-semibold
                    transition-all
                    duration-200
                    ${
                      active
                        ? "bg-[#1D1B18] text-white shadow-md"
                        : "border border-[#D8D2C7] bg-white text-[#625D55] hover:border-[#B9A98D] hover:text-[#1D1B18]"
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

      {/* ==================================================
          DISCOVERY GRID
      ================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 py-14 sm:px-8 lg:px-12 lg:py-20">

        <div className="mb-9 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">

          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#8A6935]">
              {filteredExperiences.length} PLACES TO DISCOVER
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.02em] text-[#1D1B18] sm:text-5xl">
              Find your kind of place.
            </h2>

          </div>

          <p className="max-w-md text-sm leading-6 text-[#777067]">
            Explore experiences by destination, interest
            and the stories you want to discover.
          </p>

        </div>

        {/* EMPTY */}

        {filteredExperiences.length === 0 ? (

          <div className="rounded-[28px] border border-[#DED9D0] bg-white px-6 py-24 text-center">

            <Search
              size={28}
              className="mx-auto text-[#8A6935]"
            />

            <h3 className="mt-5 font-serif text-2xl font-semibold">
              Nothing found yet
            </h3>

            <p className="mt-2 text-sm text-[#777067]">
              Try another destination or explore a
              different category.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setActiveCategory("All");
              }}
              className="mt-6 rounded-full bg-[#1D1B18] px-6 py-3 text-sm font-semibold text-white"
            >
              Explore everything
            </button>

          </div>

        ) : (

          <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredExperiences.map((experience) => {

              const isLiked =
                liked.includes(experience.id);

              return (
                <article
                  key={experience.id}
                  className="group"
                >

                  {/* IMAGE */}

                  <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#E8E2D8]">

                    <img
                      src={experience.image}
                      alt={experience.title}
                      className="h-full w-full object-cover transition duration-700 ease-out group-hover:scale-105"
                    />

                    {/* IMAGE OVERLAY */}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/5 opacity-70" />

                    {/* CATEGORY */}

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#39342D] shadow-sm">
                      {experience.category}
                    </span>

                    {/* WISHLIST */}

                    <button
                      type="button"
                      aria-label="Save experience"
                      onClick={() =>
                        toggleLike(experience.id)
                      }
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#27231F] shadow-sm transition hover:scale-110"
                    >
                      <Heart
                        size={18}
                        className={
                          isLiked
                            ? "fill-[#27231F]"
                            : ""
                        }
                      />
                    </button>

                    {/* OPEN */}

                    <Link
                      href={`/explore/${experience.id}`}
                      className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white text-[#27231F] opacity-0 shadow transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
                      aria-label={`Explore ${experience.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </Link>

                  </div>

                  {/* CONTENT */}

                  <Link
                    href={`/explore/${experience.id}`}
                    className="block pt-4"
                  >

                    <div className="flex items-start justify-between gap-3">

                      <div>

                        <div className="flex items-center gap-1.5 text-xs text-[#817A70]">

                          <MapPin size={13} />

                          {experience.location}

                        </div>

                        <h3 className="mt-2 text-[18px] font-semibold leading-6 text-[#1D1B18] transition group-hover:underline group-hover:underline-offset-4">
                          {experience.title}
                        </h3>

                      </div>

                      <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#403A33]">

                        <Star
                          size={14}
                          className="fill-[#B28A45] text-[#B28A45]"
                        />

                        {experience.rating}

                      </span>

                    </div>

                    <p className="mt-2 flex items-center gap-2 text-sm text-[#817A70]">

                      <Clock3 size={14} />

                      {experience.duration}

                    </p>

                    <p className="mt-3 text-sm">

                      <span className="font-semibold text-[#1D1B18]">
                        {experience.price}
                      </span>

                      <span className="ml-1 text-[#817A70]">
                        per guest
                      </span>

                    </p>

                  </Link>

                </article>
              );
            })}

          </div>
        )}

      </section>

      {/* ==================================================
          LOCAL DISCOVERY CTA
      ================================================== */}

      <section className="mx-auto max-w-[1500px] px-5 pb-20 sm:px-8 lg:px-12">

        <div className="overflow-hidden rounded-[30px] bg-[#24211D] px-7 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:px-16">

          <div>

            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#C5A46A]">
              YOUR NEXT DISCOVERY
            </p>

            <h2 className="mt-4 max-w-2xl font-serif text-4xl leading-tight sm:text-5xl">
              Don't just visit a place.
              <br />
              <span className="text-[#C8BBA6]">
                Experience it.
              </span>
            </h2>

          </div>

          <Link
            href="/stays"
            className="mt-8 inline-flex shrink-0 items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-[#24211D] transition hover:bg-[#EEE9DF] lg:mt-0"
          >
            Find a stay
            <ArrowUpRight size={17} />
          </Link>

        </div>

      </section>

      <Footer />

    </main>
  );
}