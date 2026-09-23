"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";
import Footer from "../footer/page";

const experiences = [
  {
    title: "Banaras Ghat Walk",
    location: "Varanasi, Uttar Pradesh",
    category: "Culture",
    duration: "2 hours",
    price: "From ₹699",
    rating: "4.9",
  },
  {
    title: "Sunrise at Ganga Ghat",
    location: "Varanasi, Uttar Pradesh",
    category: "Nature",
    duration: "2 hours",
    price: "From ₹599",
    rating: "4.8",
  },
  {
    title: "Jaipur Heritage Tour",
    location: "Jaipur, Rajasthan",
    category: "Culture",
    duration: "4 hours",
    price: "From ₹999",
    rating: "4.8",
  },
  {
    title: "Kerala Backwater Experience",
    location: "Alappuzha, Kerala",
    category: "Nature",
    duration: "3 hours",
    price: "From ₹1,299",
    rating: "4.9",
  },
  {
    title: "Goa Sunset Experience",
    location: "Goa",
    category: "Nature",
    duration: "2 hours",
    price: "From ₹899",
    rating: "4.7",
  },
  {
    title: "Local Seafood Experience",
    location: "Goa",
    category: "Food",
    duration: "2 hours",
    price: "From ₹1,199",
    rating: "4.8",
  },
  {
    title: "Himalayan Village Walk",
    location: "Himachal Pradesh",
    category: "Nature",
    duration: "4 hours",
    price: "From ₹1,299",
    rating: "4.9",
  },
  {
    title: "Mountain Café Trail",
    location: "Manali, Himachal Pradesh",
    category: "Food",
    duration: "3 hours",
    price: "From ₹899",
    rating: "4.7",
  },
  {
    title: "Old Delhi Food Walk",
    location: "Delhi",
    category: "Food",
    duration: "3 hours",
    price: "From ₹799",
    rating: "4.8",
  },
  {
    title: "Udaipur Lake Experience",
    location: "Udaipur, Rajasthan",
    category: "Nature",
    duration: "2 hours",
    price: "From ₹999",
    rating: "4.9",
  },
  {
    title: "Rishikesh Riverside Adventure",
    location: "Rishikesh, Uttarakhand",
    category: "Adventure",
    duration: "4 hours",
    price: "From ₹1,499",
    rating: "4.8",
  },
  {
    title: "Kolkata Heritage Walk",
    location: "Kolkata, West Bengal",
    category: "Culture",
    duration: "3 hours",
    price: "From ₹699",
    rating: "4.7",
  },
  {
    title: "Mumbai Street Food Trail",
    location: "Mumbai, Maharashtra",
    category: "Food",
    duration: "3 hours",
    price: "From ₹899",
    rating: "4.8",
  },
  {
    title: "Meghalaya Waterfall Trek",
    location: "Meghalaya",
    category: "Adventure",
    duration: "5 hours",
    price: "From ₹1,599",
    rating: "4.9",
  },
  {
    title: "Agra Heritage Experience",
    location: "Agra, Uttar Pradesh",
    category: "Culture",
    duration: "4 hours",
    price: "From ₹999",
    rating: "4.8",
  },
  {
    title: "Pondicherry Café Trail",
    location: "Puducherry",
    category: "Food",
    duration: "3 hours",
    price: "From ₹799",
    rating: "4.7",
  },
  {
    title: "Ladakh Mountain Adventure",
    location: "Ladakh",
    category: "Adventure",
    duration: "6 hours",
    price: "From ₹1,899",
    rating: "4.9",
  },
  {
    title: "Kashmir Valley Experience",
    location: "Kashmir",
    category: "Nature",
    duration: "4 hours",
    price: "From ₹1,499",
    rating: "4.9",
  },
  {
    title: "Pushkar Cultural Walk",
    location: "Pushkar, Rajasthan",
    category: "Culture",
    duration: "3 hours",
    price: "From ₹699",
    rating: "4.8",
  },
  {
    title: "Coorg Coffee Estate Tour",
    location: "Coorg, Karnataka",
    category: "Nature",
    duration: "3 hours",
    price: "From ₹999",
    rating: "4.8",
  },
];

const categories = [
  "All",
  "Culture",
  "Nature",
  "Food",
  "Adventure",
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [location, setLocation] = useState("");

  const filteredExperiences = useMemo(() => {
    return experiences.filter((experience) => {
      const categoryMatch =
        activeCategory === "All" ||
        experience.category === activeCategory;

      const locationMatch =
        location.trim() === "" ||
        experience.location
          .toLowerCase()
          .includes(location.toLowerCase());

      return categoryMatch && locationMatch;
    });
  }, [activeCategory, location]);

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#E8EBF5] bg-gradient-to-b from-[#F5F7FF] to-white">
        <div className="mx-auto max-w-7xl px-6 pb-12 pt-14 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
            VISTARA EXPERIENCES
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#03045E] md:text-6xl">
            Experiences worth remembering.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
            Discover local experiences, hidden places, food trails,
            cultural walks and adventures curated for curious travellers.
          </p>
        </div>
      </section>

      {/* FILTER BAR */}
      <section className="sticky top-0 z-30 border-b border-[#E5E7EB] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-4 lg:flex-row lg:items-center lg:px-10">
          
          <div className="flex flex-1 items-center rounded-2xl border border-[#DDE2F0] bg-white px-4 shadow-sm">
            <span className="mr-3 text-lg">⌕</span>

            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Search destination or experience"
              className="w-full bg-transparent py-3 text-sm text-[#03045E] outline-none placeholder:text-[#94A3B8]"
            />
          </div>

          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "bg-[#03045E] text-white"
                    : "border border-[#DDE2F0] bg-white text-[#475569] hover:border-[#0D21A1] hover:text-[#03045E]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCES */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#0D21A1]">
            {filteredExperiences.length} EXPERIENCES
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
            Find something special
          </h2>
        </div>

        {filteredExperiences.length === 0 ? (
          <div className="rounded-3xl border border-[#E2E8F0] bg-[#F8FAFF] px-6 py-20 text-center">
            <h3 className="text-xl font-semibold text-[#03045E]">
              No experiences found
            </h3>

            <p className="mt-2 text-sm text-[#64748B]">
              Try another destination or category.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredExperiences.map((experience, index) => {
              const imageNumber = (index % 20) + 1;

              return (
                <article
                  key={`${experience.title}-${index}`}
                  className="group cursor-pointer"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-[#EEF2FF]">
                    <img
                      src={`/images/pag1 (${imageNumber}).jpg`}
                      alt={experience.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />

                    <button
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-xl text-[#03045E] shadow-md transition hover:scale-105"
                      aria-label="Save experience"
                    >
                      ♡
                    </button>

                   
                  </div>

                  {/* CONTENT */}
                  <div className="pt-4">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-[#475569]">
                          {experience.location}
                        </p>

                        <h3 className="mt-1 text-[17px] font-semibold text-[#03045E]">
                          {experience.title}
                        </h3>
                      </div>

                      <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#03045E]">
                        ★ {experience.rating}
                      </span>
                    </div>

                    <p className="mt-2 text-sm text-[#64748B]">
                      {experience.category} · {experience.duration}
                    </p>

                    <p className="mt-3 text-sm">
                      <span className="font-bold text-[#03045E]">
                        {experience.price}
                      </span>{" "}
                      <span className="text-[#64748B]">per guest</span>
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}