"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Minus,
  Plus,
} from "lucide-react";

export default function Hero() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);

  function handleSearch() {
    const params = new URLSearchParams();

    if (destination.trim()) {
      params.set("query", destination.trim());
    }

    if (checkIn) {
      params.set("checkIn", checkIn);
    }

    params.set("guests", String(guests));

    router.push(`/search?${params.toString()}`);
  }

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-[1500px] px-4 pb-20 pt-6 sm:px-6 lg:px-10 lg:pb-28">

        {/* HERO */}
        <div className="relative min-h-[650px] overflow-hidden rounded-[30px]">

          {/* IMAGE */}
          <img
            src="/images/download.jpg"
            alt="Vistara destination"
            className="absolute inset-0 h-full w-full object-cover"
          />

          {/* OVERLAY */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/30 to-black/5" />

          {/* CONTENT */}
          <div className="relative z-10 flex min-h-[650px] flex-col justify-center px-6 pb-36 sm:px-12 lg:px-16">

            <p className="mb-5 text-xs font-bold uppercase tracking-[0.3em] text-white/90">
              DISCOVER • STAY • EXPERIENCE
            </p>

            <h1 className="max-w-3xl font-serif text-5xl font-semibold leading-[1.02] tracking-tight text-white sm:text-6xl lg:text-7xl">
              Find a place
              <br />
              worth{" "}
              <span className="text-white/80">
                remembering.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-7 text-white/85 sm:text-lg">
              Discover stays, hidden destinations and experiences shaped
              around the way you want to travel.
            </p>
          </div>

          {/* =====================================
              SEARCH BOX
          ===================================== */}

          <div className="absolute bottom-7 left-1/2 z-20 w-[calc(100%-28px)] max-w-6xl -translate-x-1/2 rounded-[26px] bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.20)]">

            <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto]">

              {/* =================================
                  DESTINATION
              ================================= */}

              <div className="flex items-center gap-3 px-4 py-4 sm:px-5">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <MapPin
                    size={18}
                    className="text-[#292724]"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <label
                    htmlFor="destination"
                    className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#292724]"
                  >
                    Where
                  </label>

                  <input
                    id="destination"
                    type="text"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    placeholder="Search destination"
                    className="mt-1 w-full bg-transparent text-sm font-medium text-[#171614] outline-none placeholder:text-[#9A968E]"
                  />

                </div>
              </div>

              {/* =================================
                  CHECK IN
              ================================= */}

              <div className="flex items-center gap-3 border-t border-[#E7E4DE] px-4 py-4 sm:px-5 md:border-l md:border-t-0">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <CalendarDays
                    size={18}
                    className="text-[#292724]"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <label
                    htmlFor="checkin"
                    className="block text-[10px] font-bold uppercase tracking-[0.15em] text-[#292724]"
                  >
                    Check In
                  </label>

                  <input
                    id="checkin"
                    type="date"
                    value={checkIn}
                    onChange={(e) => setCheckIn(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    className="mt-1 w-full cursor-pointer bg-transparent text-sm font-medium text-[#171614] outline-none"
                  />

                </div>
              </div>

              {/* =================================
                  GUESTS
              ================================= */}

              <div className="flex items-center gap-3 border-t border-[#E7E4DE] px-4 py-4 sm:px-5 md:border-l md:border-t-0">

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <Users
                    size={18}
                    className="text-[#292724]"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#292724]">
                    Guests
                  </p>

                  <div className="mt-1 flex items-center gap-3">

                    <button
                      type="button"
                      onClick={() =>
                        setGuests((value) => Math.max(1, value - 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9D5CE] text-[#292724] transition hover:bg-[#F3F1EC]"
                      aria-label="Decrease guests"
                    >
                      <Minus size={13} />
                    </button>

                    <span className="min-w-[60px] text-center text-sm font-medium text-[#171614]">
                      {guests} {guests === 1 ? "Guest" : "Guests"}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setGuests((value) => Math.min(20, value + 1))
                      }
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D9D5CE] text-[#292724] transition hover:bg-[#F3F1EC]"
                      aria-label="Increase guests"
                    >
                      <Plus size={13} />
                    </button>

                  </div>
                </div>
              </div>

              {/* =================================
                  SEARCH BUTTON
              ================================= */}

              <button
                type="button"
                onClick={handleSearch}
                className="m-1 flex items-center justify-center gap-2 rounded-[20px] bg-[#171614] px-8 py-4 text-sm font-semibold text-white transition-all duration-200 hover:bg-[#292724] hover:shadow-lg active:scale-[0.98]"
              >
                <Search size={18} />
                Search
              </button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}