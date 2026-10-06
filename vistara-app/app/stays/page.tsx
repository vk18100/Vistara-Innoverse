"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  X,
  ChevronDown,
} from "lucide-react";

import { stays } from "@/data/stay";
import Navbar from "@/components/navbar";
import Footer from "../footer/page";
export default function StaysPage() {
  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState("");
  const [search, setSearch] = useState("");

  const [showFilters, setShowFilters] = useState(false);
  const [maxPrice, setMaxPrice] = useState(6000);
  const [minRating, setMinRating] = useState(0);

  const filteredStays = useMemo(() => {
    const query = search.trim().toLowerCase();
    const locationQuery = where.trim().toLowerCase();

    return stays.filter((stay) => {
      const matchesSearch =
        !query ||
        stay.title.toLowerCase().includes(query) ||
        stay.location.toLowerCase().includes(query) ||
        stay.city.toLowerCase().includes(query);

      const matchesLocation =
        !locationQuery ||
        stay.title.toLowerCase().includes(locationQuery) ||
        stay.location.toLowerCase().includes(locationQuery) ||
        stay.city.toLowerCase().includes(locationQuery);

      const matchesGuests =
        !guests || stay.guests >= Number(guests);

      const matchesPrice = stay.price <= maxPrice;
      const matchesRating = stay.rating >= minRating;

      return (
        matchesSearch &&
        matchesLocation &&
        matchesGuests &&
        matchesPrice &&
        matchesRating
      );
    });
  }, [search, where, guests, maxPrice, minRating]);

  function handleSearch() {
    setSearch(where);
  }

  function clearSearch() {
    setWhere("");
    setSearch("");
    setCheckIn("");
    setCheckOut("");
    setGuests("");
  }

  return (
    <main className="min-h-screen bg-white text-[#111827]">

      <Navbar />

      {/* ================= HEADER ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-5 pt-8 sm:px-6 lg:px-8">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
          Explore stays
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
          Find a stay worth discovering
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-[#64748B]">
          Discover verified homes, villas and unique stays around Patna.
        </p>
      </section>

      {/* ================= SEARCH ================= */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_8px_30px_rgba(3,4,94,0.06)]">

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto_auto]">

            {/* WHERE */}
            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">
              <MapPin size={17} className="shrink-0 text-[#111827]" />

              <div className="min-w-0 flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Where
                </label>

                <input
                  value={where}
                  onChange={(e) => setWhere(e.target.value)}
                  placeholder="Search Patna or stay"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* CHECK IN */}
            <DateInput
              label="Check in"
              value={checkIn}
              onChange={setCheckIn}
            />

            {/* CHECK OUT */}
            <DateInput
              label="Check out"
              value={checkOut}
              onChange={setCheckOut}
            />

            {/* GUESTS */}
            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">
              <Users size={17} className="shrink-0 text-[#111827]" />

              <div className="flex-1">
                <label className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
                  Guests
                </label>

                <input
                  type="number"
                  min="1"
                  value={guests}
                  onChange={(e) => setGuests(e.target.value)}
                  placeholder="Guests"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium outline-none placeholder:text-[#94A3B8]"
                />
              </div>
            </div>

            {/* SEARCH BUTTON — BLACK */}
            <button
              onClick={handleSearch}
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
            >
              <Search size={16} />
              Search
            </button>

            {/* FILTER */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center justify-center gap-2 rounded-xl border px-5 py-3 text-sm font-semibold transition ${
                showFilters
                  ? "border-black bg-[#F5F5F5] text-black"
                  : "border-[#E2E8F0] text-[#334155] hover:border-black"
              }`}
            >
              <SlidersHorizontal size={16} />
              Filter
            </button>
          </div>

          {/* ================= FILTER PANEL ================= */}
          {showFilters && (
            <div className="mt-2 border-t border-[#E2E8F0] px-3 pb-3 pt-5">
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

                <div>
                  <label className="text-xs font-semibold text-[#334155]">
                    Maximum price
                  </label>

                  <div className="mt-3 flex items-center gap-3">
                    <input
                      type="range"
                      min="1000"
                      max="6000"
                      step="100"
                      value={maxPrice}
                      onChange={(e) =>
                        setMaxPrice(Number(e.target.value))
                      }
                      className="w-full accent-black"
                    />

                    <span className="whitespace-nowrap text-sm font-semibold text-black">
                      ₹{maxPrice}
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#334155]">
                    Minimum rating
                  </label>

                  <select
                    value={minRating}
                    onChange={(e) =>
                      setMinRating(Number(e.target.value))
                    }
                    className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
                  >
                    <option value="0">Any rating</option>
                    <option value="4">4.0+</option>
                    <option value="4.5">4.5+</option>
                    <option value="4.8">4.8+</option>
                  </select>
                </div>

                <div className="flex items-end">
                  <button
                    onClick={clearSearch}
                    className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-black hover:text-black"
                  >
                    <X size={15} />
                    Clear search
                  </button>
                </div>

              </div>
            </div>
          )}
        </div>
      </section>

      {/* ================= RESULTS ================= */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">

        <div className="mb-5 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-[#111827]">
              Stays in Patna
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              {filteredStays.length} stays available
            </p>
          </div>

          {(where || search || guests) && (
            <button
              onClick={clearSearch}
              className="text-xs font-semibold text-black hover:underline"
            >
              Clear
            </button>
          )}
        </div>

        {/* ================= GRID ================= */}
        {filteredStays.length > 0 ? (
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredStays.map((stay) => (
              <Link
                key={stay.id}
                href={`/stays/${stay.id}`}
                className="group block"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F1F5F9]">

                  <img
                    src={stay.image}
                    alt={stay.title}
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                  />

                  {stay.verified && (
                    <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#111827] shadow-sm backdrop-blur">
                      <ShieldCheck size={12} />
                      Verified
                    </div>
                  )}

                  <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111827] shadow-sm backdrop-blur">
                    <Star size={12} fill="currentColor" />
                    {stay.rating.toFixed(1)}
                  </div>
                </div>

                <div className="pt-3">

                  <div className="flex items-start justify-between gap-3">
                    <h3 className="line-clamp-1 text-sm font-semibold text-[#111827]">
                      {stay.title}
                    </h3>

                    <span className="shrink-0 text-sm font-bold text-[#111827]">
                      ₹{stay.price.toLocaleString("en-IN")}
                    </span>
                  </div>

                  <p className="mt-1 text-xs text-[#64748B]">
                    {stay.location}
                  </p>

                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Up to {stay.guests} guests
                  </p>

                  <p className="mt-2 text-[11px] font-medium text-[#64748B]">
                    per night
                  </p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-[#CBD5E1] px-6 py-16 text-center">

            <MapPin
              size={28}
              className="mx-auto text-[#94A3B8]"
            />

            <h3 className="mt-4 text-base font-semibold text-[#111827]">
              No stays found
            </h3>

            <p className="mt-1 text-sm text-[#64748B]">
              Try changing your search or filters.
            </p>

            <button
              onClick={clearSearch}
              className="mt-5 rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#222]"
            >
              Clear filters
            </button>
          </div>
        )}
      </section>

      {/* ================= FOOTER — CREAM ================= */}
      <Footer />  
    </main>
  );
}

/* =========================================================
   MODERN DATE INPUT
========================================================= */

function DateInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">
      <CalendarDays
        size={17}
        className="shrink-0 text-[#111827]"
      />

      <div className="min-w-0 flex-1">
        <label className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]">
          {label}
        </label>

        <div className="relative mt-1 h-5">
          {/* Custom empty state */}
          {!value && (
            <span className="pointer-events-none absolute left-0 top-0 z-0 text-sm font-medium text-[#94A3B8]">
              Select date
            </span>
          )}

          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={`
              relative z-10
              h-5
              w-full
              cursor-pointer
              appearance-none
              bg-transparent
              text-sm
              font-medium
              outline-none
              [color-scheme:light]
              ${!value ? "text-transparent" : "text-[#111827]"}
            `}
          />
        </div>
      </div>
    </div>
  );
}
    