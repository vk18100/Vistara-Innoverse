"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";

const categories = [
  { label: "All stays", value: "" },
  { label: "Villas", value: "VILLA" },
  { label: "Hotels", value: "HOTEL" },
  { label: "Vacation homes", value: "HOUSE" },
  { label: "Resorts", value: "RESORT" },
  { label: "Unique stays", value: "HOMESTAY" },
];

export default function StaysSearchBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [city, setCity] = useState(searchParams.get("city") ?? "");
  const [isPending, startTransition] = useTransition();

  const activeType = searchParams.get("type") ?? "";

  function applySearch(nextCity: string, nextType: string) {
    const params = new URLSearchParams();

    const cleanCity = nextCity.trim();

    if (cleanCity) {
      params.set("city", cleanCity);
    }

    if (nextType) {
      params.set("type", nextType);
    }

    const query = params.toString();

    startTransition(() => {
      router.push(query ? `/stays?${query}` : "/stays");
    });
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    applySearch(city, activeType);
  }

  function clearSearch() {
    setCity("");

    startTransition(() => {
      router.push("/stays");
    });
  }

  return (
    <div className="w-full">
      {/* SEARCH */}
      <form
        onSubmit={handleSubmit}
        className="
          flex w-full flex-col gap-2
          rounded-[28px]
          border border-[#E8E0D5]
          bg-white
          p-2
          shadow-[0_18px_50px_rgba(67,56,45,0.10)]
          sm:flex-row
          sm:items-center
        "
      >
        {/* WHERE */}
        <div className="min-w-0 flex-1 rounded-[22px] px-5 py-3 transition hover:bg-[#FAF7F2]">
          <label
            htmlFor="stay-city"
            className="block text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A7B4F]"
          >
            Where
          </label>

          <input
            id="stay-city"
            type="text"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            placeholder="Search a destination"
            className="
              mt-1 w-full
              bg-transparent
              text-sm
              font-semibold
              text-[#292524]
              outline-none
              placeholder:text-[#A8A29E]
            "
          />
        </div>

        {/* DIVIDER */}
        <div className="hidden h-10 w-px bg-[#E8E0D5] sm:block" />

        {/* SEARCH BUTTON */}
        <button
          type="submit"
          disabled={isPending}
          className="
            rounded-[20px]
            bg-[#292524]
            px-7
            py-4
            text-sm
            font-semibold
            text-white
            transition
            hover:bg-[#B96342]
            disabled:cursor-wait
            disabled:opacity-70
          "
        >
          {isPending ? "Searching..." : "Search"}
        </button>

        {/* CLEAR */}
        {(city || activeType) && (
          <button
            type="button"
            onClick={clearSearch}
            className="
              px-4
              py-2
              text-xs
              font-semibold
              text-[#78716C]
              transition
              hover:text-[#292524]
            "
          >
            Clear
          </button>
        )}
      </form>

      {/* CATEGORIES */}
      <div className="mt-5">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {categories.map((category) => {
            const active = activeType === category.value;

            return (
              <button
                key={category.value || "all"}
                type="button"
                onClick={() => applySearch(city, category.value)}
                className={`
                  shrink-0
                  rounded-full
                  px-5
                  py-2.5
                  text-sm
                  font-medium
                  transition
                  ${
                    active
                      ? "bg-[#292524] text-white shadow-sm"
                      : "border border-[#E8E0D5] bg-white text-[#57534E] hover:border-[#B96342] hover:text-[#B96342]"
                  }
                `}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}