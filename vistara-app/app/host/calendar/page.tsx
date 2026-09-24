"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";

type DayStatus = "available" | "booked" | "blocked";

type CalendarDay = {
  date: number;
  status: DayStatus;
  guest?: string;
  property?: string;
  amount?: string;
};

const properties = [
  "All Properties",
  "The Heritage Courtyard",
  "Ganga Riverside Retreat",
  "The Quiet House",
];

const initialDays: Record<number, CalendarDay> = {
  2: {
    date: 2,
    status: "booked",
    guest: "Aarav Sharma",
    property: "The Heritage Courtyard",
    amount: "₹13,500",
  },
  3: {
    date: 3,
    status: "booked",
    guest: "Aarav Sharma",
    property: "The Heritage Courtyard",
    amount: "₹13,500",
  },
  4: {
    date: 4,
    status: "booked",
    guest: "Aarav Sharma",
    property: "The Heritage Courtyard",
    amount: "₹13,500",
  },
  8: {
    date: 8,
    status: "blocked",
  },
  9: {
    date: 9,
    status: "blocked",
  },
  14: {
    date: 14,
    status: "booked",
    guest: "Riya Mehta",
    property: "Ganga Riverside Retreat",
    amount: "₹11,400",
  },
  15: {
    date: 15,
    status: "booked",
    guest: "Riya Mehta",
    property: "Ganga Riverside Retreat",
    amount: "₹11,400",
  },
  16: {
    date: 16,
    status: "booked",
    guest: "Riya Mehta",
    property: "Ganga Riverside Retreat",
    amount: "₹11,400",
  },
  22: {
    date: 22,
    status: "blocked",
  },
  23: {
    date: 23,
    status: "blocked",
  },
};

const monthNames = [
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

const weekDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

export default function HostCalendarPage() {
  const today = new Date();

  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [currentYear, setCurrentYear] = useState(today.getFullYear());

  const [selectedProperty, setSelectedProperty] =
    useState("All Properties");

  const [days, setDays] =
    useState<Record<number, CalendarDay>>(initialDays);

  const [selectedDay, setSelectedDay] =
    useState<CalendarDay | null>(null);

  const firstDay = useMemo(() => {
    const date = new Date(currentYear, currentMonth, 1);

    // JS Sunday = 0
    // Convert so Monday = 0
    return (date.getDay() + 6) % 7;
  }, [currentMonth, currentYear]);

  const daysInMonth = useMemo(() => {
    return new Date(
      currentYear,
      currentMonth + 1,
      0
    ).getDate();
  }, [currentMonth, currentYear]);

  const calendarCells = [];

  for (let i = 0; i < firstDay; i++) {
    calendarCells.push(null);
  }

  for (let date = 1; date <= daysInMonth; date++) {
    calendarCells.push(
      days[date] || {
        date,
        status: "available",
      }
    );
  }

  const bookedCount = Object.values(days).filter(
    (day) => day.status === "booked"
  ).length;

  const blockedCount = Object.values(days).filter(
    (day) => day.status === "blocked"
  ).length;

  const availableCount =
    daysInMonth - bookedCount - blockedCount;

  function previousMonth() {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear((year) => year - 1);
    } else {
      setCurrentMonth((month) => month - 1);
    }

    setSelectedDay(null);
  }

  function nextMonth() {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear((year) => year + 1);
    } else {
      setCurrentMonth((month) => month + 1);
    }

    setSelectedDay(null);
  }

  function goToToday() {
    setCurrentMonth(today.getMonth());
    setCurrentYear(today.getFullYear());
    setSelectedDay(null);
  }

  function handleDayClick(day: CalendarDay) {
    setSelectedDay(day);
  }

  function toggleAvailability() {
    if (!selectedDay || selectedDay.status === "booked") {
      return;
    }

    const newStatus =
      selectedDay.status === "blocked"
        ? "available"
        : "blocked";

    const updatedDay = {
      ...selectedDay,
      status: newStatus as DayStatus,
    };

    setDays((previous) => ({
      ...previous,
      [selectedDay.date]: updatedDay,
    }));

    setSelectedDay(updatedDay);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/host"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Host dashboard
          </Link>

          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                AVAILABILITY
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Your calendar
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Manage availability, view reservations and block
                dates when your properties are unavailable.
              </p>
            </div>

            <select
              value={selectedProperty}
              onChange={(event) =>
                setSelectedProperty(event.target.value)
              }
              className="w-full rounded-xl border border-[#03045E]/10 bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition focus:border-[#03045E] md:w-64"
            >
              {properties.map((property) => (
                <option key={property} value={property}>
                  {property}
                </option>
              ))}
            </select>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* SUMMARY */}
        <div className="grid gap-4 sm:grid-cols-3">
          <SummaryCard
            label="Available"
            value={availableCount}
            description="Open for bookings"
            dot="bg-emerald-500"
          />

          <SummaryCard
            label="Booked"
            value={bookedCount}
            description="Reserved nights"
            dot="bg-[#03045E]"
          />

          <SummaryCard
            label="Blocked"
            value={blockedCount}
            description="Unavailable dates"
            dot="bg-[#C6A15B]"
          />
        </div>

        {/* MAIN GRID */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_330px]">
          {/* CALENDAR */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-5 shadow-[0_12px_40px_rgba(3,4,94,0.04)] md:p-7">
            {/* CALENDAR HEADER */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  MONTH VIEW
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={goToToday}
                  className="rounded-xl border border-[#03045E]/10 px-4 py-2.5 text-xs font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
                >
                  Today
                </button>

                <button
                  onClick={previousMonth}
                  aria-label="Previous month"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#03045E]/10 text-lg transition hover:bg-[#F7F3EA]"
                >
                  ←
                </button>

                <button
                  onClick={nextMonth}
                  aria-label="Next month"
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#03045E]/10 text-lg transition hover:bg-[#F7F3EA]"
                >
                  →
                </button>
              </div>
            </div>

            {/* LEGEND */}
            <div className="mt-6 flex flex-wrap gap-5 border-b border-[#03045E]/10 pb-5">
              <Legend
                dot="bg-emerald-500"
                label="Available"
              />

              <Legend
                dot="bg-[#03045E]"
                label="Booked"
              />

              <Legend
                dot="bg-[#C6A15B]"
                label="Blocked"
              />
            </div>

            {/* WEEK DAYS */}
            <div className="mt-6 grid grid-cols-7">
              {weekDays.map((day) => (
                <div
                  key={day}
                  className="pb-3 text-center text-[11px] font-bold uppercase tracking-wider text-[#94A3B8]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDAR GRID */}
            <div className="grid grid-cols-7 overflow-hidden rounded-2xl border-l border-t border-[#03045E]/10">
              {calendarCells.map((day, index) => {
                if (!day) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[100px] border-b border-r border-[#03045E]/10 bg-[#FAFAF8]/50"
                    />
                  );
                }

                const isToday =
                  day.date === today.getDate() &&
                  currentMonth === today.getMonth() &&
                  currentYear === today.getFullYear();

                const isSelected =
                  selectedDay?.date === day.date;

                return (
                  <button
                    key={day.date}
                    onClick={() => handleDayClick(day)}
                    className={`relative min-h-[100px] border-b border-r border-[#03045E]/10 p-3 text-left transition hover:bg-[#F8F9FF] ${
                      isSelected
                        ? "bg-[#EEF2FF] ring-2 ring-inset ring-[#03045E]"
                        : "bg-white"
                    }`}
                  >
                    {/* DATE */}
                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        isToday
                          ? "bg-[#03045E] text-white"
                          : "text-[#03045E]"
                      }`}
                    >
                      {day.date}
                    </div>

                    {/* STATUS */}
                    <div className="mt-3">
                      {day.status === "booked" && (
                        <div className="rounded-lg bg-[#EEF2FF] px-2 py-1.5">
                          <p className="truncate text-[10px] font-bold text-[#03045E]">
                            Booked
                          </p>

                          {day.guest && (
                            <p className="mt-0.5 truncate text-[9px] text-[#64748B]">
                              {day.guest}
                            </p>
                          )}
                        </div>
                      )}

                      {day.status === "blocked" && (
                        <div className="rounded-lg bg-[#FFF7E6] px-2 py-1.5">
                          <p className="text-[10px] font-bold text-[#9A6700]">
                            Blocked
                          </p>
                        </div>
                      )}

                      {day.status === "available" && (
                        <div className="rounded-lg bg-[#ECFDF5] px-2 py-1.5">
                          <p className="text-[10px] font-semibold text-emerald-700">
                            Available
                          </p>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* SIDE PANEL */}
          <aside className="space-y-6">
            {/* SELECTED DATE */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                SELECTED DATE
              </p>

              {selectedDay ? (
                <>
                  <h2 className="mt-3 font-serif text-2xl font-semibold">
                    {monthNames[currentMonth]}{" "}
                    {selectedDay.date}, {currentYear}
                  </h2>

                  <StatusBadge status={selectedDay.status} />

                  {selectedDay.status === "booked" && (
                    <div className="mt-5 space-y-4">
                      <InfoRow
                        label="Guest"
                        value={selectedDay.guest || "Guest"}
                      />

                      <InfoRow
                        label="Property"
                        value={
                          selectedDay.property || "Your property"
                        }
                      />

                      <InfoRow
                        label="Booking amount"
                        value={
                          selectedDay.amount || "₹0"
                        }
                      />
                    </div>
                  )}

                  {selectedDay.status !== "booked" && (
                    <button
                      onClick={toggleAvailability}
                      className={`mt-6 w-full rounded-xl px-5 py-3 text-sm font-semibold transition ${
                        selectedDay.status === "blocked"
                          ? "bg-[#03045E] text-white hover:bg-[#0D21A1]"
                          : "border border-[#03045E]/15 text-[#03045E] hover:bg-[#F7F3EA]"
                      }`}
                    >
                      {selectedDay.status === "blocked"
                        ? "Make available"
                        : "Block this date"}
                    </button>
                  )}
                </>
              ) : (
                <div className="mt-5 rounded-2xl bg-[#FAFAF8] p-5">
                  <p className="text-sm leading-6 text-[#64748B]">
                    Select a date from the calendar to view its
                    availability and booking details.
                  </p>
                </div>
              )}
            </div>

            {/* HOST NOTE */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.14)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                HOST TIP
              </p>

              <h2 className="mt-3 font-serif text-xl font-semibold">
                Keep your availability updated.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                Block dates whenever your property is unavailable
                to prevent unwanted reservations.
              </p>

              <Link
                href="/host/properties"
                className="mt-5 inline-flex text-sm font-semibold text-white underline underline-offset-4"
              >
                Manage properties →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ---------------- SUMMARY CARD ---------------- */

function SummaryCard({
  label,
  value,
  description,
  dot,
}: {
  label: string;
  value: number;
  description: string;
  dot: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
      <div className="flex items-center gap-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />

        <p className="text-sm font-medium text-[#64748B]">
          {label}
        </p>
      </div>

      <p className="mt-3 font-serif text-3xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#94A3B8]">
        {description}
      </p>
    </div>
  );
}

/* ---------------- LEGEND ---------------- */

function Legend({
  dot,
  label,
}: {
  dot: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span className={`h-2.5 w-2.5 rounded-full ${dot}`} />

      <span className="text-xs font-medium text-[#64748B]">
        {label}
      </span>
    </div>
  );
}

/* ---------------- STATUS ---------------- */

function StatusBadge({
  status,
}: {
  status: DayStatus;
}) {
  const styles = {
    available:
      "bg-[#ECFDF5] text-emerald-700",
    booked:
      "bg-[#EEF2FF] text-[#03045E]",
    blocked:
      "bg-[#FFF7E6] text-[#9A6700]",
  };

  const labels = {
    available: "Available",
    booked: "Booked",
    blocked: "Blocked",
  };

  return (
    <span
      className={`mt-4 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}

/* ---------------- INFO ROW ---------------- */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="border-b border-[#03045E]/10 pb-3 last:border-0">
      <p className="text-xs text-[#94A3B8]">{label}</p>

      <p className="mt-1 text-sm font-semibold text-[#03045E]">
        {value}
      </p>
    </div>
  );
}