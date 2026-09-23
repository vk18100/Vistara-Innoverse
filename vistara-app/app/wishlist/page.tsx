"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const savedPlaces = [
  {
    id: 1,
    type: "Stay",
    title: "The River House",
    location: "Varanasi, Uttar Pradesh",
    price: "₹8,500 night",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 2,
    type: "Villa",
    title: "Aravali Hills Retreat",
    location: "Udaipur, Rajasthan",
    price: "₹12,800 night",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 3,
    type: "Experience",
    title: "Old City Morning Walk",
    location: "Jaipur, Rajasthan",
    price: "₹1,800 person",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 4,
    type: "Restaurant",
    title: "The Courtyard Table",
    location: "Goa, India",
    price: "From ₹1,500",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1515003197210-e0cd71810b5f?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 5,
    type: "Stay",
    title: "A Quiet Himalayan Home",
    location: "Manali, Himachal Pradesh",
    price: "₹6,900 night",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1000&q=80",
  },
  {
    id: 6,
    type: "Experience",
    title: "Ganges Sunrise Boat Ride",
    location: "Varanasi, Uttar Pradesh",
    price: "₹1,200 person",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1000&q=80",
  },
];

const categories = [
  "All",
  "Stays",
  "Villas",
  "Hotels",
  "Restaurants",
  "Experiences",
];

export default function WishlistPage() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Settings
          </Link>

          <div className="mt-9 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              SAVED FOR LATER
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-5xl">
              Wishlist
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#64748B]">
              Keep the places, stays and experiences you love close.
              Come back whenever you are ready to plan.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">

        {/* FILTER */}
        <div className="mb-9 flex flex-wrap gap-3">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`rounded-full px-5 py-2.5 text-sm font-medium transition ${
                index === 0
                  ? "bg-[#03045E] text-white"
                  : "border border-[#DDE2E8] bg-white text-[#64748B] hover:border-[#03045E] hover:text-[#03045E]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* COUNT */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl font-semibold">
              Your saved places
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              {savedPlaces.length} places saved
            </p>
          </div>

          <button className="hidden text-sm font-semibold text-[#0D21A1] sm:block">
            Sort by recently saved
          </button>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {savedPlaces.map((place) => (
            <article
              key={place.id}
              className="group overflow-hidden rounded-[26px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(3,4,94,0.1)]"
            >
              {/* IMAGE */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={place.image}
                  alt={place.title}
                  className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                {/* TYPE */}
                <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E] backdrop-blur">
                  {place.type}
                </span>

                {/* HEART */}
                <button
                  aria-label={`Remove ${place.title} from wishlist`}
                  className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-lg text-[#03045E] shadow-sm backdrop-blur transition hover:scale-105"
                >
                  ♥
                </button>
              </div>

              {/* DETAILS */}
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-[#03045E]">
                      {place.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#64748B]">
                      {place.location}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-sm font-semibold text-[#03045E]">
                    <span className="text-[#C6A15B]">★</span>
                    {place.rating}
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#03045E]/10 pt-4">
                  <p className="text-sm font-semibold text-[#03045E]">
                    {place.price}
                  </p>

                  <Link
                    href={`/explore/${place.id}`}
                    className="text-sm font-semibold text-[#0D21A1] hover:underline"
                  >
                    View →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* PLAN CTA */}
        <div className="mt-16 overflow-hidden rounded-[32px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] via-white to-[#EEF2FF] p-8 md:p-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
              KEEP DISCOVERING
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#03045E] md:text-4xl">
              Found something worth saving?
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              Explore more stays, beautiful places and memorable
              experiences to add to your wishlist.
            </p>

            <Link
              href="/explore"
              className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Explore Vistara
            </Link>
          </div>
        </div>

      </section>
    </main>
  );
}