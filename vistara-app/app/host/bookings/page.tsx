"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import {
  CalendarDays,
  ChevronRight,
  Clock3,
  Filter,
  Home,
  MapPin,
  Search,
  Users,
} from "lucide-react";

type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

type Booking = {
  id: string;
  guest: string;
  property: string;
  location: string;
  image: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  nights: number;
  amount: number;
  status: BookingStatus;
};

const bookings: Booking[] = [
  {
    id: "VST-2026-10482",
    guest: "Aarav Sharma",
    property: "The Heritage Villa",
    location: "Patna, Bihar",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=900&q=85",
    checkIn: "12 Oct 2026",
    checkOut: "15 Oct 2026",
    guests: 4,
    nights: 3,
    amount: 9900,
    status: "Confirmed",
  },
  {
    id: "VST-2026-10391",
    guest: "Meera Kapoor",
    property: "Riverside Retreat",
    location: "Rishikesh, Uttarakhand",
    image:
      "https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=900&q=85",
    checkIn: "20 Oct 2026",
    checkOut: "23 Oct 2026",
    guests: 2,
    nights: 3,
    amount: 12600,
    status: "Pending",
  },
  {
    id: "VST-2026-10274",
    guest: "Rohan Verma",
    property: "Desert Pearl House",
    location: "Dubai, UAE",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=85",
    checkIn: "04 Sep 2026",
    checkOut: "08 Sep 2026",
    guests: 5,
    nights: 4,
    amount: 18400,
    status: "Completed",
  },
  {
    id: "VST-2026-10186",
    guest: "Ananya Singh",
    property: "Palm View Beach House",
    location: "Goa, India",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=900&q=85",
    checkIn: "18 Aug 2026",
    checkOut: "21 Aug 2026",
    guests: 3,
    nights: 3,
    amount: 14800,
    status: "Completed",
  },
  {
    id: "VST-2026-10063",
    guest: "Kabir Malhotra",
    property: "Mountain Glass Cabin",
    location: "Manali, Himachal Pradesh",
    image:
      "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=900&q=85",
    checkIn: "02 Aug 2026",
    checkOut: "05 Aug 2026",
    guests: 2,
    nights: 3,
    amount: 11200,
    status: "Cancelled",
  },
];

const tabs = [
  "All",
  "Confirmed",
  "Pending",
  "Completed",
  "Cancelled",
] as const;

export default function HostBookingsPage() {
  const [activeTab, setActiveTab] =
    useState<(typeof tabs)[number]>("All");

  const [search, setSearch] = useState("");

  const filteredBookings = useMemo(() => {
    return bookings.filter((booking) => {
      const matchesTab =
        activeTab === "All" ||
        booking.status === activeTab;

      const query = search.toLowerCase().trim();

      const matchesSearch =
        !query ||
        booking.id.toLowerCase().includes(query) ||
        booking.guest.toLowerCase().includes(query) ||
        booking.property.toLowerCase().includes(query) ||
        booking.location.toLowerCase().includes(query);

      return matchesTab && matchesSearch;
    });
  }, [activeTab, search]);

  const confirmed = bookings.filter(
    (booking) => booking.status === "Confirmed",
  ).length;

  const pending = bookings.filter(
    (booking) => booking.status === "Pending",
  ).length;

  const completed = bookings.filter(
    (booking) => booking.status === "Completed",
  ).length;

  const totalRevenue = bookings
    .filter(
      (booking) =>
        booking.status === "Confirmed" ||
        booking.status === "Completed",
    )
    .reduce((sum, booking) => sum + booking.amount, 0);

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* HEADER */}
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <Link
              href="/host"
              className="flex items-center gap-3"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441] text-[#18181B]">
                <Home size={20} />
              </div>

              <div>
                <p className="font-serif text-xl font-semibold">
                  Vistara
                </p>

                <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                  Host
                </p>
              </div>
            </Link>

            <Link
              href="/host/properties"
              className="hidden rounded-xl border border-black/8 px-4 py-2.5 text-sm font-bold transition hover:bg-[#FAF8F3] sm:block"
            >
              Manage properties
            </Link>
          </div>
        </div>
      </header>

      {/* PAGE */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-11">
        {/* TITLE */}
        <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
              Host management
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
              Bookings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#78716C]">
              Keep track of upcoming stays, guests, payments and
              completed reservations from one place.
            </p>
          </div>

          <div className="rounded-2xl border border-[#D9A441]/20 bg-[#FFF8E8] px-5 py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A711E]">
              Total booking revenue
            </p>

            <p className="mt-1 font-serif text-2xl font-semibold">
              ₹{totalRevenue.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* STATS */}
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Total bookings"
            value={bookings.length.toString()}
            icon={<CalendarDays size={18} />}
          />

          <StatCard
            label="Confirmed"
            value={confirmed.toString()}
            icon={<CheckDot />}
          />

          <StatCard
            label="Pending"
            value={pending.toString()}
            icon={<Clock3 size={18} />}
          />

          <StatCard
            label="Completed"
            value={completed.toString()}
            icon={<Home size={18} />}
          />
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-8 rounded-[24px] border border-black/8 bg-white p-4 sm:p-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            {/* Search */}
            <div className="relative w-full lg:max-w-md">
              <Search
                size={17}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"
              />

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search guest, property or booking ID..."
                className="h-12 w-full rounded-xl border border-black/8 bg-[#FAF8F3] pl-11 pr-4 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
              />
            </div>

            <button
              type="button"
              className="flex h-12 items-center justify-center gap-2 rounded-xl border border-black/8 px-4 text-sm font-bold transition hover:bg-[#FAF8F3]"
            >
              <Filter size={16} />
              Filters
            </button>
          </div>

          {/* Tabs */}
          <div className="mt-5 flex gap-2 overflow-x-auto border-t border-black/7 pt-4">
            {tabs.map((tab) => {
              const active = activeTab === tab;

              return (
                <button
                  key={tab}
                  type="button"
                  onClick={() => setActiveTab(tab)}
                  className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-bold transition ${
                    active
                      ? "bg-[#18181B] text-white"
                      : "bg-[#F5F4EF] text-[#78716C] hover:bg-[#ECEAE3]"
                  }`}
                >
                  {tab}
                </button>
              );
            })}
          </div>
        </div>

        {/* RESULTS */}
        <div className="mt-6">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold">
              {filteredBookings.length}{" "}
              {filteredBookings.length === 1
                ? "booking"
                : "bookings"}
            </p>

            <p className="hidden text-xs text-[#A8A29E] sm:block">
              Most recent activity
            </p>
          </div>

          {filteredBookings.length === 0 ? (
            <EmptyState />
          ) : (
            <div className="space-y-4">
              {filteredBookings.map((booking) => (
                <BookingCard
                  key={booking.id}
                  booking={booking}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* BOOKING CARD                                                                */
/* -------------------------------------------------------------------------- */

function BookingCard({
  booking,
}: {
  booking: Booking;
}) {
  return (
    <article className="group overflow-hidden rounded-[26px] border border-black/8 bg-white transition hover:border-[#D9A441]/35 hover:shadow-[0_14px_40px_rgba(24,24,27,0.06)]">
      <div className="grid md:grid-cols-[220px_1fr_auto]">
        {/* IMAGE */}
        <div className="relative h-56 overflow-hidden md:h-full md:min-h-[235px]">
          <img
            src={booking.image}
            alt={booking.property}
            className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <div className="absolute left-4 top-4">
            <StatusBadge status={booking.status} />
          </div>
        </div>

        {/* DETAILS */}
        <div className="p-5 sm:p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <p className="font-mono text-[10px] font-bold tracking-wider text-[#9A711E]">
                {booking.id}
              </p>

              <h2 className="mt-1 font-serif text-2xl font-semibold">
                {booking.property}
              </h2>

              <p className="mt-1 flex items-center gap-1.5 text-xs text-[#78716C]">
                <MapPin size={13} />
                {booking.location}
              </p>
            </div>
          </div>

          {/* Guest */}
          <div className="mt-5 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#18181B] text-xs font-bold text-white">
              {booking.guest.charAt(0)}
            </div>

            <div>
              <p className="text-sm font-bold">
                {booking.guest}
              </p>

              <p className="text-xs text-[#A8A29E]">
                Guest
              </p>
            </div>
          </div>

          {/* Stay */}
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <MiniInfo
              icon={<CalendarDays size={14} />}
              label="Check-in"
              value={booking.checkIn}
            />

            <MiniInfo
              icon={<CalendarDays size={14} />}
              label="Check-out"
              value={booking.checkOut}
            />

            <MiniInfo
              icon={<Users size={14} />}
              label="Guests"
              value={`${booking.guests} guests`}
            />
          </div>
        </div>

        {/* PRICE + ACTION */}
        <div className="flex flex-row items-center justify-between gap-5 border-t border-black/7 bg-[#FAF8F3] p-5 md:w-[210px] md:flex-col md:items-stretch md:border-l md:border-t-0 sm:p-6">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#A8A29E]">
              Booking value
            </p>

            <p className="mt-1 font-serif text-2xl font-semibold">
              ₹{booking.amount.toLocaleString("en-IN")}
            </p>

            <p className="mt-1 text-xs text-[#78716C]">
              {booking.nights} nights
            </p>
          </div>

          <Link
            href={`/host/bookings/${booking.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-4 py-3 text-xs font-bold text-[#18181B] transition hover:bg-[#E7C46D]"
          >
            View booking
            <ChevronRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------------------------------------------------- */
/* STAT CARD                                                                   */
/* -------------------------------------------------------------------------- */

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="rounded-[22px] border border-black/8 bg-white p-5">
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
          {icon}
        </div>
      </div>

      <p className="mt-5 text-xs text-[#78716C]">
        {label}
      </p>

      <p className="mt-1 font-serif text-3xl font-semibold">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* MINI INFO                                                                   */
/* -------------------------------------------------------------------------- */

function MiniInfo({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#FAF8F3] p-3">
      <div className="flex items-center gap-1.5 text-[#9A711E]">
        {icon}

        <span className="text-[9px] font-bold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="mt-2 text-xs font-bold text-[#44403C]">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* STATUS                                                                      */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const styles: Record<BookingStatus, string> = {
    Confirmed:
      "bg-[#F3F8EE] text-[#4E693E]",
    Pending:
      "bg-[#FFF8E8] text-[#8A651B]",
    Completed:
      "bg-[#F2F1EE] text-[#57534E]",
    Cancelled:
      "bg-[#FFF1EF] text-[#9B4439]",
  };

  return (
    <span
      className={`inline-flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold ${styles[status]}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === "Confirmed"
            ? "bg-[#6D8B55]"
            : status === "Pending"
              ? "bg-[#C2912D]"
              : status === "Completed"
                ? "bg-[#78716C]"
                : "bg-[#B65C50]"
        }`}
      />

      {status}
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* CHECK ICON                                                                  */
/* -------------------------------------------------------------------------- */

function CheckDot() {
  return (
    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#F3F8EE] text-[#4E693E]">
      <span className="h-1.5 w-1.5 rounded-full bg-[#6D8B55]" />
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* EMPTY STATE                                                                 */
/* -------------------------------------------------------------------------- */

function EmptyState() {
  return (
    <div className="rounded-[26px] border border-dashed border-black/12 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
        <CalendarDays size={24} />
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold">
        No bookings found
      </h2>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#78716C]">
        Try changing your search or selecting a different
        booking status.
      </p>
    </div>
  );
}