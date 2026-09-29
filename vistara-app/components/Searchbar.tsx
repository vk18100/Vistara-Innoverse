"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState("");

  const handleSearch = () => {
    const params = new URLSearchParams();

    if (searchQuery.trim()) {
      params.set("query", searchQuery.trim());
    }

    if (checkIn) {
      params.set("checkIn", checkIn);
    }

    if (guests) {
      params.set("guests", guests);
    }

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative flex w-full max-w-4xl gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-lg">
        
        {/* Destination */}
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Where are you going?"
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#03045E]"
        />

        {/* Check-in */}
        <input
          type="date"
          value={checkIn}
          onChange={(e) => setCheckIn(e.target.value)}
          className="rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#03045E]"
        />

        {/* Guests */}
        <input
          type="number"
          min="1"
          value={guests}
          onChange={(e) => setGuests(e.target.value)}
          placeholder="Guests"
          className="w-32 rounded-lg border border-gray-300 px-4 py-3 outline-none focus:border-[#03045E]"
        />

        {/* Search */}
        <button
          type="button"
          onClick={handleSearch}
          className="rounded-lg bg-[#03045E] px-6 py-3 font-semibold text-white transition hover:bg-[#0D21A1]"
        >
          Search
        </button>
      </div>
    </div>
  );
}