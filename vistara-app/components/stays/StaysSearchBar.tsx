"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const categories = [
  { label: "All", value: "" },
  { label: "Villas", value: "VILLA" },
  { label: "Hotels", value: "HOTEL" },
  { label: "Vacation Homes", value: "HOUSE" },
  { label: "Resorts", value: "RESORT" },
  { label: "Unique Stays", value: "HOMESTAY" },
];

export default function StaysSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const activeType = searchParams.get("type") ?? "";

  function applySearch(nextCity: string, nextType: string) {
    const params = new URLSearchParams();

    if (nextCity.trim()) {
      params.set("city", nextCity.trim());
    }

    if (nextType) {
      params.set("type", nextType);
    }

    const query = params.toString();
    router.push(`/stays${query ? `?${query}` : ""}`);
  }

  return (
    <>
      <div className="flex flex-col overflow-hidden rounded-[24px] border border-[#DCE3F0] bg-white shadow-[0_10px_35px_rgba(3,4,94,0.08)] lg:flex-row lg:items-center">

        {/* WHERE */}
        <div className="flex-1 px-5 py-4">
          <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
            Where
          </label>

          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                applySearch(city, activeType);
              }
            }}
            placeholder="Search destinations"
            className="mt-1 w-full bg-transparent text-sm font-medium text-[#03045E] outline-none placeholder:text-[#94A3B8]"
          />
        </div>

        <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

        {/* SEARCH */}
        <button
          type="button"
          onClick={() => applySearch(city, activeType)}
          className="m-2 rounded-2xl bg-[#03045E] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
        >
          Search
        </button>
      </div>

      {/* FILTERS */}
      <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
        {categories.map((category) => {
          const active = activeType === category.value;

          return (
            <button
              key={category.label}
              type="button"
              onClick={() => applySearch(city, category.value)}
              className={
                active
                  ? "whitespace-nowrap rounded-full bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white"
                  : "whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]"
              }
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </>
  );
}