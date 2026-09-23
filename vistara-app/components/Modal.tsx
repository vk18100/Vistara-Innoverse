"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Search() {
  const router = useRouter();

  const [where, setWhere] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);

  const handleSearch = () => {
    if (!where.trim()) return;

    const params = new URLSearchParams();

    params.set("where", where);

    if (checkIn) {
      params.set("checkIn", checkIn);
    }

    if (checkOut) {
      params.set("checkOut", checkOut);
    }

    params.set("guests", guests.toString());

    router.push(`/search?${params.toString()}`);
  };

  return (
    <div className="w-full">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-3 rounded-[28px] border border-[#E5E7EB] bg-white p-3 shadow-[0_15px_50px_rgba(3,4,94,0.10)] md:flex-row md:items-center">

        {/* WHERE */}
        <div className="flex-1 rounded-2xl px-5 py-3 transition hover:bg-[#F8FAFF]">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#03045E]">
            Where
          </label>

          <input
            type="text"
            value={where}
            onChange={(e) => setWhere(e.target.value)}
            placeholder="Search destinations"
            className="mt-1 w-full bg-transparent text-sm text-[#03045E] outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] md:block" />

        {/* CHECK IN */}
        <div className="flex-1 rounded-2xl px-5 py-3 transition hover:bg-[#F8FAFF]">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#03045E]">
            Check in
          </label>

          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-[#03045E] outline-none"
          />
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] md:block" />

        {/* CHECK OUT */}
        <div className="flex-1 rounded-2xl px-5 py-3 transition hover:bg-[#F8FAFF]">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#03045E]">
            Check out
          </label>

          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 w-full bg-transparent text-sm text-[#03045E] outline-none"
          />
        </div>

        <div className="hidden h-10 w-px bg-[#E5E7EB] md:block" />

        {/* GUESTS */}
        <div className="w-full rounded-2xl px-5 py-3 md:w-32">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#03045E]">
            Guests
          </label>

          <input
            type="number"
            min={1}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full bg-transparent text-sm text-[#03045E] outline-none"
          />
        </div>

        {/* SEARCH */}
        <button
          onClick={handleSearch}
          className="rounded-2xl bg-[#03045E] px-7 py-4 font-semibold text-white transition hover:bg-[#0D21A1]"
        >
          Search
        </button>
      </div>
    </div>
  );
}