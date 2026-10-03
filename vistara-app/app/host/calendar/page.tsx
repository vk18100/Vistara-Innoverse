"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  Ban,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Home,
  Plus,
  User,
} from "lucide-react";

import Navbar from "@/components/navbar";

type Booking = {
  id: string;
  guest: string;
  property: string;
  checkIn: string;
  checkOut: string;
  status: "Confirmed" | "Pending";
};

const bookings: Booking[] = [
  {
    id: "BK-1024",
    guest: "Aarav Sharma",
    property: "The Heritage Villa",
    checkIn: "2026-10-03",
    checkOut: "2026-10-05",
    status: "Confirmed",
  },
  {
    id: "BK-1025",
    guest: "Riya Mehta",
    property: "The Heritage Villa",
    checkIn: "2026-10-09",
    checkOut: "2026-10-12",
    status: "Pending",
  },
  {
    id: "BK-1026",
    guest: "Kabir Singh",
    property: "Riverside Stay",
    checkIn: "2026-10-17",
    checkOut: "2026-10-20",
    status: "Confirmed",
  },
];

const blockedDates = [
  "2026-10-06",
  "2026-10-07",
  "2026-10-22",
];

function formatDate(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function formatLongDate(date: Date) {
  return date.toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function isBetween(
  date: string,
  start: string,
  end: string
) {
  return date >= start && date < end;
}

export default function HostCalendarPage() {
  const [currentDate, setCurrentDate] = useState(
    new Date(2026, 9, 1)
  );

  const [selectedDate, setSelectedDate] = useState(
    new Date(2026, 9, 3)
  );

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const monthName = currentDate.toLocaleDateString(
    "en-IN",
    {
      month: "long",
      year: "numeric",
    }
  );

  const calendarDays = useMemo(() => {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);

    const startDay = firstDay.getDay();
    const totalDays = lastDay.getDate();

    const days: (Date | null)[] = [];

    for (let i = 0; i < startDay; i++) {
      days.push(null);
    }

    for (let day = 1; day <= totalDays; day++) {
      days.push(new Date(year, month, day));
    }

    while (days.length % 7 !== 0) {
      days.push(null);
    }

    return days;
  }, [year, month]);

  const selectedDateString = formatDate(selectedDate);

  const selectedBookings = bookings.filter((booking) =>
    isBetween(
      selectedDateString,
      booking.checkIn,
      booking.checkOut
    )
  );

  function changeMonth(direction: number) {
    setCurrentDate(
      new Date(year, month + direction, 1)
    );
  }

  function goToday() {
    const today = new Date();

    setCurrentDate(
      new Date(
        today.getFullYear(),
        today.getMonth(),
        1
      )
    );

    setSelectedDate(today);
  }

  return (
    <main className="min-h-screen bg-[#FAF9F7] text-[#171717]">
      <Navbar />

      {/* ================= HEADER ================= */}

      <section className="border-b border-[#E7E3DC] bg-white">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <div className="flex items-center gap-2 text-[#737373]">
                <CalendarDays size={17} />

                <span className="text-xs font-semibold uppercase tracking-[0.18em]">
                  Host Calendar
                </span>
              </div>

              <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
                Manage your availability
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-[#737373]">
                See your bookings, manage availability and
                keep track of upcoming stays.
              </p>
            </div>

            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#333333]"
            >
              <Plus size={17} />
              Block dates
            </button>
          </div>
        </div>
      </section>

      {/* ================= MAIN ================= */}

      <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_330px]">

          {/* ================= CALENDAR ================= */}

          <div className="overflow-hidden rounded-[24px] border border-[#E5E1DA] bg-white shadow-[0_10px_35px_rgba(23,23,23,0.04)]">

            {/* CALENDAR HEADER */}

            <div className="flex flex-col gap-4 border-b border-[#EAE7E1] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-lg font-semibold">
                  {monthName}
                </h2>

                <p className="mt-1 text-xs text-[#8A8A8A]">
                  Manage your property availability
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={goToday}
                  className="rounded-lg border border-[#DDD8D0] px-3 py-2 text-xs font-semibold transition hover:bg-[#F6F4F0]"
                >
                  Today
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(-1)}
                  aria-label="Previous month"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD8D0] transition hover:bg-[#F6F4F0]"
                >
                  <ChevronLeft size={17} />
                </button>

                <button
                  type="button"
                  onClick={() => changeMonth(1)}
                  aria-label="Next month"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-[#DDD8D0] transition hover:bg-[#F6F4F0]"
                >
                  <ChevronRight size={17} />
                </button>
              </div>
            </div>

            {/* LEGEND */}

            <div className="flex flex-wrap gap-x-5 gap-y-2 border-b border-[#EAE7E1] px-5 py-4 text-xs text-[#737373]">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#171717]" />
                Booked
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#D6C3A5]" />
                Pending
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-[#E5E1DA]" />
                Blocked
              </div>

              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full border border-[#999999]" />
                Available
              </div>
            </div>

            {/* WEEK DAYS */}

            <div className="grid grid-cols-7 border-b border-[#EAE7E1]">
              {[
                "Sun",
                "Mon",
                "Tue",
                "Wed",
                "Thu",
                "Fri",
                "Sat",
              ].map((day) => (
                <div
                  key={day}
                  className="px-1 py-3 text-center text-[10px] font-semibold uppercase tracking-wider text-[#8A8A8A] sm:text-[11px]"
                >
                  {day}
                </div>
              ))}
            </div>

            {/* CALENDAR GRID */}

            <div className="grid grid-cols-7">
              {calendarDays.map((date, index) => {
                if (!date) {
                  return (
                    <div
                      key={`empty-${index}`}
                      className="min-h-[95px] border-b border-r border-[#EEEAE4] bg-[#FBFAF8] sm:min-h-[115px]"
                    />
                  );
                }

                const dateString = formatDate(date);

                const booking = bookings.find((item) =>
                  isBetween(
                    dateString,
                    item.checkIn,
                    item.checkOut
                  )
                );

                const blocked =
                  blockedDates.includes(dateString);

                const selected =
                  selectedDateString === dateString;

                return (
                  <button
                    key={dateString}
                    type="button"
                    onClick={() => setSelectedDate(date)}
                    className={`relative min-h-[95px] border-b border-r border-[#EEEAE4] p-1.5 text-left transition sm:min-h-[115px] sm:p-2 ${
                      selected
                        ? "bg-[#F3F0EA]"
                        : "bg-white hover:bg-[#FAF8F4]"
                    }`}
                  >
                    {/* DATE */}

                    <div
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                        selected
                          ? "bg-[#171717] text-white"
                          : "text-[#404040]"
                      }`}
                    >
                      {date.getDate()}
                    </div>

                    {/* STATUS */}

                    <div className="mt-2 space-y-1">
                      {booking && (
                        <div
                          className={`truncate rounded-md px-1.5 py-1 text-[9px] font-semibold sm:px-2 sm:text-[10px] ${
                            booking.status === "Confirmed"
                              ? "bg-[#171717] text-white"
                              : "bg-[#E9DCC6] text-[#4A3B27]"
                          }`}
                        >
                          {booking.guest}
                        </div>
                      )}

                      {blocked && (
                        <div className="flex items-center gap-1 truncate rounded-md bg-[#ECE9E4] px-1.5 py-1 text-[9px] font-medium text-[#777777] sm:px-2 sm:text-[10px]">
                          <Ban size={9} />
                          <span>Blocked</span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ================= SELECTED DATE ================= */}

          <aside className="h-fit rounded-[24px] border border-[#E5E1DA] bg-white p-5 shadow-[0_10px_35px_rgba(23,23,23,0.04)] lg:sticky lg:top-24">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#8A8A8A]">
              Selected date
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              {formatLongDate(selectedDate)}
            </h2>

            <div className="my-5 h-px bg-[#EAE7E1]" />

            {/* BOOKINGS */}

            {selectedBookings.length > 0 ? (
              <div className="space-y-4">
                <p className="text-sm font-semibold">
                  {selectedBookings.length} booking
                  {selectedBookings.length > 1
                    ? "s"
                    : ""}
                </p>

                {selectedBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="rounded-2xl border border-[#E7E3DC] bg-[#FCFBF9] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {booking.guest}
                        </p>

                        <p className="mt-1 text-xs text-[#777777]">
                          {booking.id}
                        </p>
                      </div>

                      <span
                        className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-semibold ${
                          booking.status === "Confirmed"
                            ? "bg-[#171717] text-white"
                            : "bg-[#E9DCC6] text-[#4A3B27]"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>

                    <div className="mt-4 space-y-2 text-xs text-[#666666]">
                      <div className="flex items-center gap-2">
                        <Home size={14} />
                        <span className="truncate">
                          {booking.property}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock3 size={14} />
                        <span>
                          {booking.checkIn} →{" "}
                          {booking.checkOut}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <User size={14} />
                        Guest booking
                      </div>
                    </div>

                    {/* DIRECT BOOKING PAGE */}

                    <Link
                      href={`/host/bookings?bookingId=${encodeURIComponent(
                        booking.id
                      )}`}
                      className="mt-4 flex w-full items-center justify-center rounded-xl border border-[#171717] px-3 py-2.5 text-xs font-semibold transition hover:bg-[#171717] hover:text-white"
                    >
                      View booking
                    </Link>
                  </div>
                ))}
              </div>
            ) : blockedDates.includes(
                selectedDateString
              ) ? (
              /* BLOCKED */

              <div className="rounded-2xl bg-[#F0ECE6] p-5">
                <Ban
                  size={20}
                  className="text-[#666666]"
                />

                <h3 className="mt-3 font-semibold">
                  Date is blocked
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#777777]">
                  This date is currently unavailable
                  for guests.
                </p>

                <button
                  type="button"
                  className="mt-4 w-full rounded-xl bg-[#171717] px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-[#333333]"
                >
                  Make available
                </button>
              </div>
            ) : (
              /* AVAILABLE */

              <div className="rounded-2xl border border-dashed border-[#D8D3CB] p-5 text-center">
                <CalendarDays
                  size={24}
                  className="mx-auto text-[#777777]"
                />

                <h3 className="mt-3 font-semibold">
                  Available
                </h3>

                <p className="mt-1 text-xs leading-5 text-[#888888]">
                  No booking is scheduled for this
                  date.
                </p>

                <button
                  type="button"
                  className="mt-4 w-full rounded-xl border border-[#171717] px-3 py-2.5 text-xs font-semibold transition hover:bg-[#171717] hover:text-white"
                >
                  Block this date
                </button>
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}