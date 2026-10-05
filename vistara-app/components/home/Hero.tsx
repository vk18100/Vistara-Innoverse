"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  MapPin,
  Minus,
  Plus,
  Search,
  Users,
  X,
} from "lucide-react";

/* =========================================================
   TYPES
========================================================= */

type Panel = "where" | "when" | "guests" | null;

type Guests = {
  adults: number;
  children: number;
  infants: number;
  pets: boolean;
};

type DateMode = "calendar" | "flexible";

type FlexibleOption = {
  value: string;
  label: string;
  hourly?: boolean;
};

/* =========================================================
   CONSTANTS
========================================================= */

const WEEK_DAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const FLEXIBLE_OPTIONS: FlexibleOption[] = [
  {
    value: "3h",
    label: "3 hours",
    hourly: true,
  },
  {
    value: "6h",
    label: "6 hours",
    hourly: true,
  },
  {
    value: "9h",
    label: "9 hours",
    hourly: true,
  },
  {
    value: "1n",
    label: "1 night",
  },
  {
    value: "2-3n",
    label: "2–3 nights",
  },
  {
    value: "4-5n",
    label: "4–5 nights",
  },
  {
    value: "1w",
    label: "1 week",
  },
  {
    value: "2w",
    label: "2 weeks",
  },
  {
    value: "1m",
    label: "1 month",
  },
];

/* =========================================================
   HELPERS
========================================================= */

function startOfDay(date: Date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  const days: Array<number | null> = [];

  for (let i = 0; i < firstDay; i++) {
    days.push(null);
  }

  for (let day = 1; day <= totalDays; day++) {
    days.push(day);
  }

  return days;
}

function isSameDate(
  first: Date | null,
  second: Date | null
) {
  if (!first || !second) return false;

  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

function formatDate(date: Date | null) {
  if (!date) return "";

  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
  });
}

function formatDateForQuery(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

/* =========================================================
   HERO
========================================================= */

export default function Hero() {
  const router = useRouter();
  const heroRef = useRef<HTMLDivElement>(null);

  const today = startOfDay(new Date());

  /* -------------------------------------------------------
     OPEN PANEL
  ------------------------------------------------------- */

  const [panel, setPanel] = useState<Panel>(null);

  /* -------------------------------------------------------
     WHERE
  ------------------------------------------------------- */

  const [where, setWhere] = useState("");

  /* -------------------------------------------------------
     DATES
  ------------------------------------------------------- */

  const [checkIn, setCheckIn] =
    useState<Date | null>(null);

  const [checkOut, setCheckOut] =
    useState<Date | null>(null);

  const [dateMode, setDateMode] =
    useState<DateMode>("calendar");

  const [flexibleOption, setFlexibleOption] =
    useState("1n");

  const [calendarMonth, setCalendarMonth] =
    useState(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

  /* -------------------------------------------------------
     GUESTS
  ------------------------------------------------------- */

  const [guests, setGuests] = useState<Guests>({
    adults: 2,
    children: 0,
    infants: 0,
    pets: false,
  });

  /* =======================================================
     CLOSE DROPDOWNS ON OUTSIDE CLICK
  ======================================================= */

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        heroRef.current &&
        !heroRef.current.contains(
          event.target as Node
        )
      ) {
        setPanel(null);
      }
    }

    document.addEventListener(
      "mousedown",
      handleOutsideClick
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleOutsideClick
      );
    };
  }, []);

  /* =======================================================
     ESCAPE CLOSE
  ======================================================= */

  useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPanel(null);
      }
    }

    document.addEventListener(
      "keydown",
      handleEscape
    );

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape
      );
    };
  }, []);

  /* =======================================================
     GUEST COUNT
  ======================================================= */

  const totalGuests =
    guests.adults + guests.children;

  function updateGuest(
    type: "adults" | "children" | "infants",
    amount: number
  ) {
    setGuests((current) => {
      const currentValue = current[type];

      const minimum =
        type === "adults" ? 1 : 0;

      return {
        ...current,
        [type]: Math.max(
          minimum,
          currentValue + amount
        ),
      };
    });
  }

  /* =======================================================
     DATE SELECTION
  ======================================================= */

  function handleDateSelect(
    day: number,
    month: number,
    year: number
  ) {
    const selectedDate = startOfDay(
      new Date(year, month, day)
    );

    if (selectedDate < today) {
      return;
    }

    /*
      No check-in OR both dates already selected
      => start a new selection
    */
    if (!checkIn || checkOut) {
      setCheckIn(selectedDate);
      setCheckOut(null);
      return;
    }

    /*
      Selecting before check-in
      => make it new check-in
    */
    if (selectedDate < checkIn) {
      setCheckIn(selectedDate);
      setCheckOut(null);
      return;
    }

    /*
      Normal check-out
    */
    setCheckOut(selectedDate);
  }

  /* =======================================================
     MONTH NAVIGATION
  ======================================================= */

  function previousMonth() {
    setCalendarMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() - 1,
          1
        )
    );
  }

  function nextMonth() {
    setCalendarMonth(
      (current) =>
        new Date(
          current.getFullYear(),
          current.getMonth() + 1,
          1
        )
    );
  }

  /* =======================================================
     CLEAR DATES
  ======================================================= */

  function clearDates() {
    setCheckIn(null);
    setCheckOut(null);
    setFlexibleOption("1n");
  }

  /* =======================================================
     DATE DISPLAY
  ======================================================= */

  const selectedFlexible =
    FLEXIBLE_OPTIONS.find(
      (option) =>
        option.value === flexibleOption
    );

  const dateText =
    dateMode === "flexible"
      ? selectedFlexible?.label || "Flexible"
      : checkIn && checkOut
        ? `${formatDate(checkIn)} – ${formatDate(
            checkOut
          )}`
        : checkIn
          ? formatDate(checkIn)
          : "Add dates";

  /* =======================================================
     SEARCH
  ======================================================= */

  function handleSearch() {
    const params = new URLSearchParams();

    if (where.trim()) {
      params.set(
        "where",
        where.trim()
      );
    }

    if (dateMode === "calendar") {
      if (checkIn) {
        params.set(
          "checkIn",
          formatDateForQuery(checkIn)
        );
      }

      if (checkOut) {
        params.set(
          "checkOut",
          formatDateForQuery(checkOut)
        );
      }
    }

    if (dateMode === "flexible") {
      params.set(
        "flexible",
        flexibleOption
      );
    }

    params.set(
      "adults",
      String(guests.adults)
    );

    params.set(
      "children",
      String(guests.children)
    );

    params.set(
      "infants",
      String(guests.infants)
    );

    if (guests.pets) {
      params.set("pets", "true");
    }

    setPanel(null);

    router.push(
      `/stays?${params.toString()}`
    );
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <section
      ref={heroRef}
      className="relative z-20 w-full"
    >
      {/* =================================================
          HERO IMAGE
      ================================================= */}

      <div className="relative h-[330px] w-full overflow-visible">
        <img
          src="/images/london.jpg"
          alt="Beautiful Vistara stay"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* IMAGE OVERLAY */}
        <div className="absolute inset-0 bg-black/20" />

        {/* =================================================
            HERO TITLE
        ================================================= */}

        <div className="absolute inset-x-0 top-[65px] z-10 flex justify-center px-6">
          <h1 className="font-serif text-3xl font-medium tracking-tight text-white md:text-[42px]">
            Entire place, just for you
          </h1>
        </div>

        {/* =================================================
            SEARCH BAR
        ================================================= */}

        <div className="absolute bottom-[28px] left-1/2 z-50 w-[calc(100%-32px)] -translate-x-1/2">
          <div className="w-full rounded-[28px] bg-white p-2 shadow-[0_12px_45px_rgba(0,0,0,0.22)]">

            <div className="grid min-h-[68px] w-full grid-cols-1 md:grid-cols-[1.5fr_1fr_0.7fr_125px]">

              {/* =========================================
                  WHERE
              ========================================= */}

              <button
                type="button"
                onClick={() =>
                  setPanel(
                    panel === "where"
                      ? null
                      : "where"
                  )
                }
                className="flex items-center gap-4 rounded-[21px] px-6 text-left text-[#111827] transition hover:bg-[#f6f5f2]"
              >
                <MapPin
                  size={20}
                  strokeWidth={1.8}
                />

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111827]">
                    Where
                  </p>

                  <p className="mt-1 truncate text-[14px] text-[#111827]">
                    {where ||
                      "City, neighbourhood or point of interest"}
                  </p>
                </div>
              </button>

              {/* =========================================
                  WHEN
              ========================================= */}

              <button
                type="button"
                onClick={() =>
                  setPanel(
                    panel === "when"
                      ? null
                      : "when"
                  )
                }
                className="flex items-center gap-4 border-black/10 px-6 text-left text-[#111827] transition hover:bg-[#f6f5f2] md:border-l"
              >
                <CalendarDays
                  size={20}
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111827]">
                    When
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[14px] text-[#111827]">
                    {dateText}
                  </p>
                </div>
              </button>

              {/* =========================================
                  GUESTS
              ========================================= */}

              <button
                type="button"
                onClick={() =>
                  setPanel(
                    panel === "guests"
                      ? null
                      : "guests"
                  )
                }
                className="flex items-center gap-4 border-black/10 px-6 text-left text-[#111827] transition hover:bg-[#f6f5f2] md:border-l"
              >
                <Users
                  size={20}
                  strokeWidth={1.8}
                />

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#111827]">
                    Guests
                  </p>

                  <p className="mt-1 whitespace-nowrap text-[14px] text-[#111827]">
                    {totalGuests}{" "}
                    {totalGuests === 1
                      ? "guest"
                      : "guests"}
                  </p>
                </div>
              </button>

              {/* =========================================
                  SEARCH
              ========================================= */}

              <button
                type="button"
                onClick={handleSearch}
                className="m-1 flex items-center justify-center gap-2 rounded-[21px] bg-black px-5 text-sm font-semibold text-white transition hover:bg-[#222] active:scale-[0.98]"
              >
                <Search size={17} />
                Search
              </button>
            </div>
          </div>
        </div>

        {/* =================================================
            WHERE DROPDOWN
        ================================================= */}

        {panel === "where" && (
          <div className="absolute left-4 right-4 top-[calc(100%-90px)] z-[100] rounded-[26px] bg-white p-6 shadow-[0_20px_70px_rgba(0,0,0,0.2)] md:left-8 md:right-auto md:w-[480px]">

            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">
                  Where are you going?
                </h3>

                <p className="mt-1 text-sm text-[#64748B]">
                  Search by city, neighbourhood or
                  point of interest.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setPanel(null)}
                className="rounded-full p-2 text-[#111827] transition hover:bg-black/5"
              >
                <X size={18} />
              </button>
            </div>

            {/* INPUT */}

            <div className="mt-5 flex items-center gap-3 rounded-2xl border border-black/15 px-4 py-4">
              <MapPin
                size={19}
                className="shrink-0"
              />

              <input
                autoFocus
                value={where}
                onChange={(event) =>
                  setWhere(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    handleSearch();
                  }
                }}
                placeholder="Patna, Kankarbagh..."
                className="w-full bg-transparent text-sm text-[#111827] outline-none placeholder:text-[#64748B]"
              />
            </div>

            {/* POPULAR */}

            <p className="mb-2 mt-5 text-[10px] font-bold uppercase tracking-[0.18em] text-[#64748B]">
              Popular destinations
            </p>

            {[
              "Patna",
              "Kankarbagh",
              "Boring Road",
              "Rajendra Nagar",
            ].map((place) => (
              <button
                key={place}
                type="button"
                onClick={() => {
                  setWhere(place);
                  setPanel(null);
                }}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm text-[#111827] transition hover:bg-[#f6f5f2]"
              >
                <MapPin size={16} />
                {place}
              </button>
            ))}
          </div>
        )}

        {/* =================================================
            WHEN DROPDOWN
        ================================================= */}

        {panel === "when" && (
          <div className="absolute left-1/2 top-[calc(100%-90px)] z-[100] w-[calc(100%-24px)] max-w-[900px] -translate-x-1/2 overflow-hidden rounded-[28px] bg-white text-[#111827] shadow-[0_24px_80px_rgba(0,0,0,0.22)]">

            {/* TABS */}

            <div className="grid grid-cols-2 border-b border-black/10">
              <button
                type="button"
                onClick={() =>
                  setDateMode("calendar")
                }
                className={`py-4 text-sm font-semibold ${
                  dateMode === "calendar"
                    ? "border-b-2 border-black"
                    : "text-black/45"
                }`}
              >
                Calendar
              </button>

              <button
                type="button"
                onClick={() =>
                  setDateMode("flexible")
                }
                className={`py-4 text-sm font-semibold ${
                  dateMode === "flexible"
                    ? "border-b-2 border-black"
                    : "text-black/45"
                }`}
              >
                Flexible dates
              </button>
            </div>

            {/* ===========================================
                CALENDAR MODE
            =========================================== */}

            {dateMode === "calendar" && (
              <>
                <div className="grid gap-8 p-6 md:grid-cols-2 md:p-7">

                  <Calendar
                    year={
                      calendarMonth.getFullYear()
                    }
                    month={
                      calendarMonth.getMonth()
                    }
                    today={today}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onSelect={handleDateSelect}
                    onPrevious={
                      previousMonth
                    }
                  />

                  <Calendar
                    year={
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() + 1,
                        1
                      ).getFullYear()
                    }
                    month={
                      new Date(
                        calendarMonth.getFullYear(),
                        calendarMonth.getMonth() + 1,
                        1
                      ).getMonth()
                    }
                    today={today}
                    checkIn={checkIn}
                    checkOut={checkOut}
                    onSelect={handleDateSelect}
                    onNext={nextMonth}
                  />
                </div>

                {/* FOOTER */}

                <div className="flex items-center justify-between border-t border-black/10 px-6 py-4 md:px-7">
                  <button
                    type="button"
                    onClick={clearDates}
                    className="text-sm font-semibold text-[#111827] underline underline-offset-4"
                  >
                    Clear
                  </button>

                  <button
                    type="button"
                    onClick={() =>
                      setPanel(null)
                    }
                    className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
                  >
                    Done
                  </button>
                </div>
              </>
            )}

            {/* ===========================================
                FLEXIBLE MODE
            =========================================== */}

            {dateMode === "flexible" && (
              <div className="p-6 md:p-8">

                <div className="text-center">
                  <h3 className="font-serif text-2xl md:text-3xl">
                    How long do you want to stay?
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    Choose what works for your journey.
                  </p>
                </div>

                {/* OPTIONS */}

                <div className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                  {FLEXIBLE_OPTIONS.map(
                    (option) => {
                      const active =
                        flexibleOption ===
                        option.value;

                      return (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() =>
                            setFlexibleOption(
                              option.value
                            )
                          }
                          className={`rounded-2xl border px-3 py-4 text-sm font-medium transition ${
                            active
                              ? "border-black bg-black text-white"
                              : "border-black/20 text-[#111827] hover:border-black"
                          }`}
                        >
                          {option.hourly && (
                            <Clock3
                              size={17}
                              className="mx-auto mb-2"
                            />
                          )}

                          {option.label}
                        </button>
                      );
                    }
                  )}
                </div>

                {/* HOTEL ONLY INFO */}

                <div className="mt-6 rounded-2xl bg-[#f6f5f2] p-4 text-xs leading-5 text-[#64748B]">
                  <span className="font-semibold text-[#111827]">
                    Hourly stays are hotel-only.
                  </span>{" "}
                  Choose 3 hours, 6 hours or 9 hours.
                  Other accommodation types are available
                  for overnight stays.
                </div>

                {/* DONE */}

                <div className="mt-6 flex justify-end">
                  <button
                    type="button"
                    onClick={() =>
                      setPanel(null)
                    }
                    className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
                  >
                    Done
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* =================================================
            GUESTS DROPDOWN
        ================================================= */}

        {panel === "guests" && (
          <div className="absolute right-4 top-[calc(100%-90px)] z-[100] w-[390px] max-w-[calc(100%-24px)] rounded-[26px] bg-white p-6 text-[#111827] shadow-[0_20px_70px_rgba(0,0,0,0.22)] md:right-8">

            {/* ADULTS */}

            <GuestRow
              title="Adults"
              subtitle="Ages 18 and older"
              value={guests.adults}
              onMinus={() =>
                updateGuest(
                  "adults",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "adults",
                  1
                )
              }
              disableMinus={
                guests.adults <= 1
              }
            />

            {/* CHILDREN */}

            <GuestRow
              title="Children"
              subtitle="Ages 2 to 17"
              value={guests.children}
              onMinus={() =>
                updateGuest(
                  "children",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "children",
                  1
                )
              }
              disableMinus={
                guests.children <= 0
              }
            />

            {/* INFANTS */}

            <GuestRow
              title="Infants"
              subtitle="Ages 0 to 1"
              value={guests.infants}
              onMinus={() =>
                updateGuest(
                  "infants",
                  -1
                )
              }
              onPlus={() =>
                updateGuest(
                  "infants",
                  1
                )
              }
              disableMinus={
                guests.infants <= 0
              }
            />

            {/* PETS */}

            <label className="mt-4 flex cursor-pointer gap-3 border-t border-black/10 pt-5">
              <input
                type="checkbox"
                checked={guests.pets}
                onChange={(event) =>
                  setGuests((current) => ({
                    ...current,
                    pets: event.target.checked,
                  }))
                }
                className="mt-1 h-5 w-5 accent-black"
              />

              <span>
                <span className="block text-sm font-medium">
                  I am travelling with pets
                </span>

                <span className="mt-1 block text-xs leading-5 text-[#64748B]">
                  Only properties that allow pets
                  will be shown.
                </span>
              </span>
            </label>

            {/* DONE */}

            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() =>
                  setPanel(null)
                }
                className="rounded-full bg-black px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

/* =========================================================
   CALENDAR COMPONENT
========================================================= */

function Calendar({
  year,
  month,
  today,
  checkIn,
  checkOut,
  onSelect,
  onPrevious,
  onNext,
}: {
  year: number;
  month: number;
  today: Date;
  checkIn: Date | null;
  checkOut: Date | null;
  onSelect: (
    day: number,
    month: number,
    year: number
  ) => void;
  onPrevious?: () => void;
  onNext?: () => void;
}) {
  const days = getDaysInMonth(
    year,
    month
  );

  return (
    <div className="min-w-0">

      {/* HEADER */}

      <div className="mb-5 flex items-center justify-between">
        {onPrevious ? (
          <button
            type="button"
            onClick={onPrevious}
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <ChevronLeft size={19} />
          </button>
        ) : (
          <div className="h-9 w-9" />
        )}

        <h3 className="text-lg font-semibold">
          {MONTHS[month]} {year}
        </h3>

        {onNext ? (
          <button
            type="button"
            onClick={onNext}
            className="rounded-full p-2 transition hover:bg-black/5"
          >
            <ChevronRight size={19} />
          </button>
        ) : (
          <div className="h-9 w-9" />
        )}
      </div>

      {/* WEEK DAYS */}

      <div className="grid grid-cols-7">
        {WEEK_DAYS.map((day) => (
          <div
            key={day}
            className="pb-3 text-center text-xs font-semibold text-black/40"
          >
            {day}
          </div>
        ))}
      </div>

      {/* DAYS */}

      <div className="grid grid-cols-7">
        {days.map((day, index) => {
          if (day === null) {
            return (
              <div
                key={`empty-${index}`}
                className="h-11"
              />
            );
          }

          const currentDate = startOfDay(
            new Date(year, month, day)
          );

          const disabled =
            currentDate < today;

          const isStart = isSameDate(
            currentDate,
            checkIn
          );

          const isEnd = isSameDate(
            currentDate,
            checkOut
          );

          const isBetween =
            checkIn &&
            checkOut &&
            currentDate > checkIn &&
            currentDate < checkOut;

          return (
            <button
              key={day}
              type="button"
              disabled={disabled}
              onClick={() =>
                onSelect(
                  day,
                  month,
                  year
                )
              }
              className={`relative h-11 text-sm transition ${
                disabled
                  ? "cursor-not-allowed text-black/15"
                  : "text-[#111827] hover:bg-black/5"
              } ${
                isBetween
                  ? "bg-[#eeeae5]"
                  : ""
              }`}
            >
              <span
                className={`mx-auto flex h-9 w-9 items-center justify-center rounded-full ${
                  isStart || isEnd
                    ? "bg-black font-semibold text-white"
                    : ""
                }`}
              >
                {day}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* =========================================================
   GUEST ROW
========================================================= */

function GuestRow({
  title,
  subtitle,
  value,
  onMinus,
  onPlus,
  disableMinus,
}: {
  title: string;
  subtitle: string;
  value: number;
  onMinus: () => void;
  onPlus: () => void;
  disableMinus: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-black/10 py-4">

      {/* TEXT */}

      <div>
        <p className="text-sm font-medium">
          {title}
        </p>

        <p className="mt-1 text-xs text-[#64748B]">
          {subtitle}
        </p>
      </div>

      {/* CONTROLS */}

      <div className="flex items-center gap-4">
        <button
          type="button"
          disabled={disableMinus}
          onClick={onMinus}
          className={`flex h-9 w-9 items-center justify-center rounded-full border transition ${
            disableMinus
              ? "cursor-not-allowed border-black/10 text-black/20"
              : "border-black/30 hover:border-black"
          }`}
        >
          <Minus size={15} />
        </button>

        <span className="w-4 text-center text-sm">
          {value}
        </span>

        <button
          type="button"
          onClick={onPlus}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-black/30 transition hover:border-black"
        >
          <Plus size={15} />
        </button>
      </div>
    </div>
  );
}