"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

export default function Hero() {
  const router = useRouter();

  const [destination, setDestination] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [guests, setGuests] = useState(2);

  const [calendarOpen, setCalendarOpen] = useState(false);
  const [calendarMonth, setCalendarMonth] = useState(new Date());

  const calendarRef = useRef<HTMLDivElement>(null);

  /* =========================================
     CLOSE CALENDAR WHEN CLICKING OUTSIDE
  ========================================= */

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        calendarRef.current &&
        !calendarRef.current.contains(event.target as Node)
      ) {
        setCalendarOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* =========================================
     DATE HELPERS
  ========================================= */

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  function formatDateForInput(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function formatSelectedDate(dateString: string) {
    if (!dateString) return "Select date";

    const date = new Date(`${dateString}T00:00:00`);

    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  /* =========================================
     CALENDAR
  ========================================= */

  const year = calendarMonth.getFullYear();
  const month = calendarMonth.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendarDays = [];

  for (let i = 0; i < firstDay; i++) {
    calendarDays.push(null);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  function isPastDate(day: number) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0);

    return date < today;
  }

  function isSelectedDate(day: number) {
    if (!checkIn) return false;

    return checkIn === formatDateForInput(new Date(year, month, day));
  }

  function selectDate(day: number) {
    if (isPastDate(day)) return;

    const selected = new Date(year, month, day);

    setCheckIn(formatDateForInput(selected));
    setCalendarOpen(false);
  }

  function previousMonth() {
    const previous = new Date(year, month - 1, 1);

    // Don't allow navigation before current month
    const currentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    );

    if (previous >= currentMonth) {
      setCalendarMonth(previous);
    }
  }

  function nextMonth() {
    setCalendarMonth(new Date(year, month + 1, 1));
  }

  /* =========================================
     SEARCH
  ========================================= */

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

        {/* =========================================
            HERO
        ========================================= */}

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

          {/* =========================================
              SEARCH BOX
          ========================================= */}

          <div className="absolute bottom-7 left-1/2 z-30 w-[calc(100%-28px)] max-w-6xl -translate-x-1/2 rounded-[26px] bg-white p-2 shadow-[0_20px_60px_rgba(0,0,0,0.20)]">

            <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto]">

              {/* =====================================
                  WHERE
              ===================================== */}

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

              {/* =====================================
                  CHECK IN
              ===================================== */}

              <div
                ref={calendarRef}
                className="relative flex items-center gap-3 border-t border-[#E7E4DE] px-4 py-4 sm:px-5 md:border-l md:border-t-0"
              >

                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <CalendarDays
                    size={18}
                    className="text-[#292724]"
                  />
                </div>

                <div className="min-w-0 flex-1">

                  <button
                    type="button"
                    onClick={() => setCalendarOpen((value) => !value)}
                    className="w-full text-left"
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#292724]">
                      Check In
                    </p>

                    <p
                      className={`mt-1 text-sm font-medium ${
                        checkIn
                          ? "text-[#171614]"
                          : "text-[#9A968E]"
                      }`}
                    >
                      {formatSelectedDate(checkIn)}
                    </p>
                  </button>

                </div>

                {/* =================================
                    CUSTOM CALENDAR
                ================================= */}

                {calendarOpen && (
                  <div className="absolute left-0 top-[calc(100%+12px)] z-50 w-[320px] rounded-[24px] border border-[#E7E4DE] bg-white p-5 shadow-[0_20px_60px_rgba(0,0,0,0.18)]">

                    {/* CALENDAR HEADER */}

                    <div className="flex items-center justify-between">

                      <button
                        type="button"
                        onClick={previousMonth}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E4DE] transition hover:bg-[#F5F3EE]"
                        aria-label="Previous month"
                      >
                        <ChevronLeft size={16} />
                      </button>

                      <div className="text-sm font-semibold text-[#171614]">
                        {calendarMonth.toLocaleDateString("en-IN", {
                          month: "long",
                          year: "numeric",
                        })}
                      </div>

                      <button
                        type="button"
                        onClick={nextMonth}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E4DE] transition hover:bg-[#F5F3EE]"
                        aria-label="Next month"
                      >
                        <ChevronRight size={16} />
                      </button>

                    </div>

                    {/* WEEK DAYS */}

                    <div className="mt-5 grid grid-cols-7 text-center">

                      {["S", "M", "T", "W", "T", "F", "S"].map(
                        (day, index) => (
                          <div
                            key={`${day}-${index}`}
                            className="text-[10px] font-bold uppercase text-[#9A968E]"
                          >
                            {day}
                          </div>
                        )
                      )}

                    </div>

                    {/* DAYS */}

                    <div className="mt-3 grid grid-cols-7 gap-y-2 text-center">

                      {calendarDays.map((day, index) => {

                        if (day === null) {
                          return (
                            <div
                              key={`empty-${index}`}
                              className="h-9"
                            />
                          );
                        }

                        const disabled = isPastDate(day);
                        const selected = isSelectedDate(day);

                        return (
                          <button
                            key={day}
                            type="button"
                            disabled={disabled}
                            onClick={() => selectDate(day)}
                            className={`
                              mx-auto
                              flex
                              h-9
                              w-9
                              items-center
                              justify-center
                              rounded-full
                              text-sm
                              transition
                              ${
                                selected
                                  ? "bg-[#03045E] font-semibold text-white"
                                  : disabled
                                  ? "cursor-not-allowed text-[#D6D1C9]"
                                  : "text-[#292724] hover:bg-[#EEF4FF] hover:text-[#03045E]"
                              }
                            `}
                          >
                            {day}
                          </button>
                        );
                      })}

                    </div>

                    {/* CLEAR */}

                    {checkIn && (
                      <div className="mt-4 border-t border-[#E7E4DE] pt-4">

                        <button
                          type="button"
                          onClick={() => {
                            setCheckIn("");
                            setCalendarOpen(false);
                          }}
                          className="flex items-center gap-2 text-xs font-semibold text-[#77726A] transition hover:text-[#03045E]"
                        >
                          <X size={14} />
                          Clear date
                        </button>

                      </div>
                    )}

                  </div>
                )}

              </div>

              {/* =====================================
                  GUESTS
              ===================================== */}

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

              {/* =====================================
                  SEARCH
              ===================================== */}

              <button
                type="button"
                onClick={handleSearch}
      className="
  flex
  items-center
  justify-center
  gap-2
  rounded-full
  bg-[#222222]
  px-5
  py-3
  text-sm
  font-semibold
  text-white
  transition
  hover:bg-[#000000]
  active:scale-[0.98]
"        >
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