"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Search,
  MapPin,
  Star,
  ArrowRight,
  CheckCircle2,
  Heart,
  Globe2,
  Users,
} from "lucide-react";

type Guide = {
  id: string | number;
  name: string;
  location: string;
  bio: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  pricePerHour: number;
  verified: boolean;
  image: string;
};

const guides: Guide[] = [
  {
    id: "rajiv",
    name: "Rajiv Kumar",
    location: "Patna, Bihar",
    bio: "Local guide helping travellers discover Patna's heritage, food and hidden local spots.",
    languages: ["Hindi", "English"],
    specialties: ["Heritage", "Food", "Local Life"],
    rating: 4.9,
    reviews: 124,
    experience: "8 years",
    pricePerHour: 699,
    verified: true,
    image: "/images/profile.jpg",
  },
  {
    id: "amit",
    name: "Amit Singh",
    location: "Patna, Bihar",
    bio: "Explore historical places, riverside locations and authentic local experiences with Amit.",
    languages: ["Hindi", "English"],
    specialties: ["History", "Culture", "Photography"],
    rating: 4.8,
    reviews: 96,
    experience: "6 years",
    pricePerHour: 599,
    verified: true,
    image: "/images/profile.jpg",
  },
  {
    id: "neha",
    name: "Neha Sharma",
    location: "Patna, Bihar",
    bio: "Discover Patna through local food, markets, culture and stories known mostly by locals.",
    languages: ["Hindi", "English"],
    specialties: ["Food", "Shopping", "Culture"],
    rating: 4.9,
    reviews: 87,
    experience: "5 years",
    pricePerHour: 649,
    verified: true,
    image: "/images/profile.jpg",
  },
  {
    id: "vikas",
    name: "Vikas Kumar",
    location: "Rajgir, Bihar",
    bio: "A local expert for Rajgir, Nalanda and nearby historical and natural destinations.",
    languages: ["Hindi", "English"],
    specialties: ["Nature", "History", "Adventure"],
    rating: 4.7,
    reviews: 71,
    experience: "7 years",
    pricePerHour: 599,
    verified: true,
    image: "/images/profile.jpg",
  },
  {
    id: "priya",
    name: "Priya Kumari",
    location: "Gaya, Bihar",
    bio: "Experience Gaya and Bodh Gaya through local culture, temples, food and peaceful places.",
    languages: ["Hindi", "English"],
    specialties: ["Culture", "Spiritual", "Food"],
    rating: 4.8,
    reviews: 63,
    experience: "4 years",
    pricePerHour: 549,
    verified: true,
    image: "/images/profile.jpg",
  },
  {
    id: "sanjay",
    name: "Sanjay Verma",
    location: "Nalanda, Bihar",
    bio: "Local history enthusiast helping travellers understand the stories behind Nalanda.",
    languages: ["Hindi", "English"],
    specialties: ["History", "Heritage", "Education"],
    rating: 4.8,
    reviews: 58,
    experience: "9 years",
    pricePerHour: 699,
    verified: true,
    image: "/images/profile.jpg",
  },
];

const categories = [
  "All",
  "Heritage",
  "Food",
  "Culture",
  "Nature",
  "Adventure",
];

export default function GuidesPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [liked, setLiked] = useState<string | number | null>(null);

  const filteredGuides = useMemo(() => {
    const query = search.toLowerCase().trim();

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
  }, [search, category]);

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">

        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:px-10 lg:py-28">

          <div className="max-w-4xl">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-[#B76545]">
              VISTARA LOCAL GUIDES
            </p>

            <h1 className="font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#2C2420] sm:text-6xl lg:text-7xl">
              Meet the people
              <br />
              who know the place.
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#756D67] sm:text-lg">
              Discover destinations through people who actually live
              there. Find local guides for food, culture, heritage,
              nature and experiences beyond the usual tourist path.
            </p>

          </div>

        </div>
      </section>


      {/* =====================================================
          SEARCH + FILTER
      ===================================================== */}

      <section className="sticky top-0 z-30 border-b border-[#E5DED6] bg-[#FAF8F3]/95 backdrop-blur">

        <div className="mx-auto max-w-7xl px-5 py-4 sm:px-8 lg:px-10">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#756D67]"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search guides, destinations or experiences"
                className="h-12 w-full rounded-2xl border border-[#D8CEC4] bg-white pl-11 pr-4 text-sm text-[#2C2420] outline-none transition placeholder:text-[#A49A93] focus:border-[#B76545] focus:ring-4 focus:ring-[#B76545]/10"
              />

            </div>


            {/* CATEGORIES */}

            <div className="flex gap-2 overflow-x-auto pb-1 lg:max-w-[620px]">

              {categories.map((item) => (

                <button
                  key={item}
                  type="button"
                  onClick={() => setCategory(item)}
                  className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                    category === item
                      ? "bg-[#B76545] text-white shadow-sm"
                      : "border border-[#D8CEC4] bg-white text-[#756D67] hover:border-[#B76545] hover:text-[#B76545]"
                  }`}
                >
                  {item}
                </button>

              ))}

            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          GUIDES
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-10 lg:py-20">

        {/* SECTION HEADER */}

        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B76545]">
              {filteredGuides.length} LOCAL GUIDES
            </p>

            <h2 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#2C2420] sm:text-5xl">
              Find your local expert
            </h2>

            <p className="mt-3 text-[#756D67]">
              Choose someone who knows the destination beyond the map.
            </p>

          </div>

          <div className="flex items-center gap-2 text-sm text-[#756D67]">

            <Users size={17} />

            <span>
              {filteredGuides.length} guides available
            </span>

          </div>

        </div>


        {/* EMPTY STATE */}

        {filteredGuides.length === 0 && (

          <div className="rounded-[28px] border border-[#E5DED6] bg-white px-6 py-20 text-center">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F3E7DE]">
              <Search className="text-[#B76545]" />
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold text-[#2C2420]">
              No guides found
            </h3>

            <p className="mt-2 text-sm text-[#756D67]">
              Try another destination, guide name or experience.
            </p>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setCategory("All");
              }}
              className="mt-6 rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#965039]"
            >
              Clear search
            </button>

          </div>

        )}


        {/* GUIDE CARDS */}

        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">

          {filteredGuides.map((guide) => (

            <article
              key={guide.id}
              className="group overflow-hidden rounded-[28px] border border-[#E5DED6] bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D8CEC4] hover:shadow-[0_20px_50px_rgba(44,36,32,0.10)]"
            >

              {/* IMAGE */}

              <div className="relative h-72 overflow-hidden bg-[#E8DED0]">

                <img
                  src={guide.image}
                  alt={`${guide.name} profile`}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />

                {/* OVERLAY */}

                <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/35 to-transparent" />


                {/* VERIFIED */}

                {guide.verified && (

                  <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#2C2420] shadow-sm">

                    <CheckCircle2
                      size={14}
                      className="text-[#68705A]"
                    />

                    Verified

                  </div>

                )}


                {/* WISHLIST */}

                <button
                  type="button"
                  aria-label={`Save ${guide.name}`}
                  onClick={() =>
                    setLiked(
                      liked === guide.id
                        ? null
                        : guide.id
                    )
                  }
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#2C2420] shadow-sm transition hover:scale-105"
                >

                  <Heart
                    size={19}
                    className={
                      liked === guide.id
                        ? "fill-[#B76545] text-[#B76545]"
                        : ""
                    }
                  />

                </button>


                {/* RATING */}

                <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-[#2C2420] shadow-sm">

                  <Star
                    size={13}
                    className="fill-[#B8945A] text-[#B8945A]"
                  />

                  {guide.rating.toFixed(1)}

                </div>

              </div>


              {/* CONTENT */}

              <div className="p-6">

                {/* NAME */}

                <div className="flex items-start justify-between gap-3">

                  <div>

                    <h3 className="font-serif text-2xl font-semibold text-[#2C2420]">
                      {guide.name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-[#756D67]">

                      <MapPin size={15} />

                      {guide.location}

                    </div>

                  </div>

                </div>


                {/* BIO */}

                <p className="mt-5 line-clamp-2 text-sm leading-6 text-[#756D67]">
                  {guide.bio}
                </p>


                {/* SPECIALTIES */}

                <div className="mt-5 flex flex-wrap gap-2">

                  {guide.specialties
                    .slice(0, 3)
                    .map((specialty) => (

                      <span
                        key={specialty}
                        className="rounded-full bg-[#F3E7DE] px-3 py-1.5 text-xs font-semibold text-[#6B493B]"
                      >
                        {specialty}
                      </span>

                    ))}

                </div>


                {/* LANGUAGES */}

                <div className="mt-5 flex items-center gap-2 text-sm text-[#756D67]">

                  <Globe2 size={15} />

                  <span>
                    {guide.languages.join(" · ")}
                  </span>

                </div>


                {/* DIVIDER */}

                <div className="my-5 h-px bg-[#E5DED6]" />


                {/* BOTTOM */}

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-xs text-[#A49A93]">
                      From
                    </p>

                    <p className="mt-1 text-lg font-bold text-[#2C2420]">

                      ₹{guide.pricePerHour.toLocaleString("en-IN")}

                      <span className="ml-1 text-xs font-normal text-[#756D67]">
                        / hour
                      </span>

                    </p>

                  </div>


                  <Link
                    href={`/guides/${guide.id}`}
                    className="flex items-center gap-2 rounded-xl bg-[#B76545] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#965039]"
                  >

                    View Guide

                    <ArrowRight size={16} />

                  </Link>

                </div>


                {/* REVIEWS */}

                <p className="mt-4 text-xs text-[#A49A93]">
                  {guide.reviews} traveller reviews · {guide.experience} experience
                </p>

              </div>

            </article>

          ))}

        </div>

      </section>


      {/* =====================================================
          CTA
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 pb-20 sm:px-8 lg:px-10">

        <div className="overflow-hidden rounded-[2rem] bg-[#E8DED0]">

          <div className="grid items-center gap-10 px-7 py-12 sm:px-12 lg:grid-cols-[1fr_auto] lg:px-16 lg:py-16">

            <div>

              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#68705A]">
                TRAVEL DIFFERENTLY
              </p>

              <h2 className="mt-4 max-w-2xl font-serif text-4xl font-semibold leading-tight text-[#2C2420] sm:text-5xl">
                See a destination through local eyes.
              </h2>

              <p className="mt-5 max-w-2xl text-base leading-7 text-[#756D67]">
                From hidden streets to local food and stories that
                never make it onto a tourist map, find experiences
                shaped by people who know the place.
              </p>

            </div>


            <Link
              href="/explore"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#B76545] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#965039]"
            >
              Explore destinations
              <ArrowRight size={18} />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
}