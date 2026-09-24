"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";

type BookingStatus =
  | "Confirmed"
  | "Pending"
  | "Completed"
  | "Cancelled";

type Booking = {
  id: string;
  guest: string;
  guestInitials: string;
  property: string;
  location: string;
  dates: string;
  nights: number;
  guests: number;
  amount: number;
  status: BookingStatus;
  bookedOn: string;
  image: string;
  phone: string;
  email: string;
  message?: string;
};

const bookings: Booking[] = [
  {
    id: "BK-1001",
    guest: "Aarav Sharma",
    guestInitials: "AS",
    property: "The Heritage Courtyard",
    location: "Patna, Bihar",
    dates: "18 Oct – 21 Oct",
    nights: 3,
    guests: 4,
    amount: 13500,
    status: "Confirmed",
    bookedOn: "12 Sep 2026",
    image: "/images/pag1 (1).jpg",
    phone: "+91 98765 43210",
    email: "aarav@example.com",
    message: "Looking forward to staying at your property.",
  },
  {
    id: "BK-1002",
    guest: "Riya Mehta",
    guestInitials: "RM",
    property: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    dates: "24 Oct – 27 Oct",
    nights: 3,
    guests: 2,
    amount: 11400,
    status: "Confirmed",
    bookedOn: "15 Sep 2026",
    image: "/images/pag1 (2).jpg",
    phone: "+91 91234 56789",
    email: "riya@example.com",
    message: "Could you please share the check-in instructions?",
  },
  {
    id: "BK-1003",
    guest: "Kabir Singh",
    guestInitials: "KS",
    property: "The Quiet House",
    location: "Bodh Gaya, Bihar",
    dates: "02 Nov – 05 Nov",
    nights: 3,
    guests: 5,
    amount: 9600,
    status: "Pending",
    bookedOn: "20 Sep 2026",
    image: "/images/pag1 (3).jpg",
    phone: "+91 99887 66554",
    email: "kabir@example.com",
    message: "We are travelling with family and would love to stay here.",
  },
  {
    id: "BK-1004",
    guest: "Ananya Verma",
    guestInitials: "AV",
    property: "The Heritage Courtyard",
    location: "Patna, Bihar",
    dates: "08 Sep – 10 Sep",
    nights: 2,
    guests: 3,
    amount: 9000,
    status: "Completed",
    bookedOn: "18 Aug 2026",
    image: "/images/pag1 (1).jpg",
    phone: "+91 98711 22334",
    email: "ananya@example.com",
  },
  {
    id: "BK-1005",
    guest: "Dev Raj",
    guestInitials: "DR",
    property: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    dates: "01 Sep – 03 Sep",
    nights: 2,
    guests: 2,
    amount: 7600,
    status: "Cancelled",
    bookedOn: "12 Aug 2026",
    image: "/images/pag1 (2).jpg",
    phone: "+91 90000 11223",
    email: "dev@example.com",
  },
];

const filters = [
  "All",
  "Pending",
  "Confirmed",
  "Completed",
  "Cancelled",
] as const;

export default function HostBookingPage() {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]>("All");

  const [search, setSearch] = useState("");

  const [selectedBooking, setSelectedBooking] =
    useState<Booking | null>(null);

  const [chatBooking, setChatBooking] =
    useState<Booking | null>(null);

  const [sortBy, setSortBy] = useState("recent");

  const filteredBookings = useMemo(() => {
    let result = [...bookings];

    if (activeFilter !== "All") {
      result = result.filter(
        (booking) => booking.status === activeFilter
      );
    }

    if (search.trim()) {
      const query = search.toLowerCase();

      result = result.filter(
        (booking) =>
          booking.guest.toLowerCase().includes(query) ||
          booking.property.toLowerCase().includes(query) ||
          booking.id.toLowerCase().includes(query)
      );
    }

    if (sortBy === "amount-high") {
      result.sort((a, b) => b.amount - a.amount);
    }

    if (sortBy === "amount-low") {
      result.sort((a, b) => a.amount - b.amount);
    }

    return result;
  }, [activeFilter, search, sortBy]);

  const totalEarnings = bookings
    .filter((booking) => booking.status !== "Cancelled")
    .reduce((sum, booking) => sum + booking.amount, 0);

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
                HOST BOOKINGS
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Manage bookings
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                Keep track of upcoming stays, guest requests,
                payments and your hosting activity.
              </p>
            </div>

            <div className="rounded-2xl bg-[#EEF2FF] px-5 py-4">
              <p className="text-xs font-medium text-[#64748B]">
                Total booking value
              </p>

              <p className="mt-1 text-2xl font-semibold text-[#03045E]">
                ₹{totalEarnings.toLocaleString("en-IN")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* STATS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <BookingStat
            label="Total bookings"
            value="12"
            detail="All reservations"
          />

          <BookingStat
            label="Upcoming"
            value="3"
            detail="Next 30 days"
          />

          <BookingStat
            label="Pending"
            value="1"
            detail="Needs your action"
          />

          <BookingStat
            label="This month"
            value="₹84,500"
            detail="Hosting earnings"
          />
        </div>

        {/* MAIN */}
        <div className="mt-8 grid gap-7 xl:grid-cols-[1fr_340px]">

          {/* BOOKINGS */}
          <div className="min-w-0">

            {/* FILTER BAR */}
            <div className="rounded-[26px] border border-[#03045E]/10 bg-white p-5 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

                {/* SEARCH */}
                <div className="relative w-full lg:max-w-sm">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#94A3B8]">
                    ⌕
                  </span>

                  <input
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search guest, property or booking..."
                    className="w-full rounded-xl border border-[#03045E]/10 bg-[#FAFAF8] py-3 pl-10 pr-4 text-sm outline-none transition focus:border-[#03045E]"
                  />
                </div>

                {/* SORT */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-xl border border-[#03045E]/10 bg-white px-4 py-3 text-sm text-[#64748B] outline-none focus:border-[#03045E]"
                >
                  <option value="recent">
                    Recently updated
                  </option>

                  <option value="amount-high">
                    Highest amount
                  </option>

                  <option value="amount-low">
                    Lowest amount
                  </option>
                </select>
              </div>

              {/* FILTERS */}
              <div className="mt-5 flex gap-2 overflow-x-auto pb-1">
                {filters.map((filter) => {
                  const count =
                    filter === "All"
                      ? bookings.length
                      : bookings.filter(
                          (booking) => booking.status === filter
                        ).length;

                  return (
                    <button
                      key={filter}
                      onClick={() => setActiveFilter(filter)}
                      className={`whitespace-nowrap rounded-full px-4 py-2 text-xs font-semibold transition ${
                        activeFilter === filter
                          ? "bg-[#03045E] text-white"
                          : "border border-[#03045E]/10 bg-white text-[#64748B] hover:border-[#03045E] hover:text-[#03045E]"
                      }`}
                    >
                      {filter} · {count}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* BOOKING LIST */}
            <div className="mt-6 space-y-4">

              {filteredBookings.length === 0 ? (
                <div className="rounded-[28px] border border-[#03045E]/10 bg-white px-6 py-16 text-center">
                  <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-xl">
                    ⌕
                  </div>

                  <h3 className="mt-5 font-serif text-xl font-semibold">
                    No bookings found
                  </h3>

                  <p className="mt-2 text-sm text-[#64748B]">
                    Try changing your search or booking filter.
                  </p>
                </div>
              ) : (
                filteredBookings.map((booking) => (
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onView={() => setSelectedBooking(booking)}
                    onMessage={() => setChatBooking(booking)}
                  />
                ))
              )}

            </div>
          </div>

          {/* CHAT SIDEBAR */}
          <aside className="hidden xl:block">
            <div className="sticky top-24 overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

              <div className="border-b border-[#03045E]/10 p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  HOST MESSAGES
                </p>

                <div className="mt-2 flex items-center justify-between">
                  <h2 className="font-serif text-2xl font-semibold">
                    Guest chat
                  </h2>

                  <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-bold text-[#03045E]">
                    3 new
                  </span>
                </div>
              </div>

              <div className="divide-y divide-[#03045E]/10">
                {bookings
                  .filter(
                    (booking) =>
                      booking.status === "Confirmed" ||
                      booking.status === "Pending"
                  )
                  .slice(0, 4)
                  .map((booking) => (
                    <button
                      key={booking.id}
                      onClick={() => setChatBooking(booking)}
                      className="group w-full p-5 text-left transition hover:bg-[#FAFAF8]"
                    >
                      <div className="flex gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] text-sm font-bold text-[#03045E]">
                          {booking.guestInitials}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="truncate text-sm font-semibold">
                              {booking.guest}
                            </p>

                            <span className="h-2 w-2 rounded-full bg-[#0D21A1]" />
                          </div>

                          <p className="mt-1 truncate text-xs text-[#64748B]">
                            {booking.message ||
                              "New booking message"}
                          </p>

                          <p className="mt-2 text-[10px] text-[#94A3B8]">
                            {booking.property}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
              </div>

              <div className="p-5">
                <button
                  onClick={() =>
                    setChatBooking(bookings[0])
                  }
                  className="w-full rounded-xl border border-[#03045E]/10 px-4 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
                >
                  Open messages
                </button>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* BOOKING DETAILS DRAWER */}
      {selectedBooking && (
        <BookingDetails
          booking={selectedBooking}
          onClose={() => setSelectedBooking(null)}
          onMessage={() => {
            setSelectedBooking(null);
            setChatBooking(selectedBooking);
          }}
        />
      )}

      {/* CHAT DRAWER */}
      {chatBooking && (
        <ChatDrawer
          booking={chatBooking}
          onClose={() => setChatBooking(null)}
        />
      )}
    </main>
  );
}

/* -------------------------------- */
/* STAT */
/* -------------------------------- */

function BookingStat({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#03045E]/10 bg-white p-5 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
      <p className="text-sm text-[#64748B]">
        {label}
      </p>

      <p className="mt-2 font-serif text-3xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-xs text-[#94A3B8]">
        {detail}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* BOOKING CARD */
/* -------------------------------- */

function BookingCard({
  booking,
  onView,
  onMessage,
}: {
  booking: Booking;
  onView: () => void;
  onMessage: () => void;
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.04)] transition hover:shadow-[0_18px_50px_rgba(3,4,94,0.08)]">

      <div className="p-5 sm:p-6">

        <div className="flex flex-col gap-5">

          {/* TOP */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

            <div className="flex gap-4">

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#EEF2FF] font-semibold text-[#03045E]">
                {booking.guestInitials}
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">
                    {booking.guest}
                  </h3>

                  <StatusBadge status={booking.status} />
                </div>

                <p className="mt-1 text-xs text-[#94A3B8]">
                  Booking #{booking.id}
                </p>
              </div>
            </div>

            <div className="text-left sm:text-right">
              <p className="text-xs text-[#94A3B8]">
                Booking value
              </p>

              <p className="mt-1 text-xl font-semibold">
                ₹{booking.amount.toLocaleString("en-IN")}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="grid gap-4 rounded-2xl bg-[#FAFAF8] p-4 sm:grid-cols-3">

            <BookingInfo
              label="Property"
              value={booking.property}
            />

            <BookingInfo
              label="Stay"
              value={booking.dates}
            />

            <BookingInfo
              label="Guests"
              value={`${booking.guests} guests · ${booking.nights} nights`}
            />

          </div>

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 border-t border-[#03045E]/10 pt-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-[#94A3B8]">
              Booked on {booking.bookedOn}
            </p>

            <div className="flex flex-wrap gap-2">

              {booking.status === "Pending" && (
                <>
                  <button className="rounded-xl bg-[#03045E] px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0D21A1]">
                    Accept
                  </button>

                  <button className="rounded-xl border border-red-200 px-4 py-2.5 text-xs font-semibold text-red-600 transition hover:bg-red-50">
                    Decline
                  </button>
                </>
              )}

              <button
                onClick={onMessage}
                className="rounded-xl border border-[#03045E]/10 px-4 py-2.5 text-xs font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                Message
              </button>

              <button
                onClick={onView}
                className="rounded-xl bg-[#EEF2FF] px-4 py-2.5 text-xs font-semibold text-[#03045E] transition hover:bg-[#E0E7FF]"
              >
                View details
              </button>

            </div>
          </div>

        </div>
      </div>
    </article>
  );
}

/* -------------------------------- */
/* BOOKING INFO */
/* -------------------------------- */

function BookingInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#03045E]">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* STATUS */
/* -------------------------------- */

function StatusBadge({
  status,
}: {
  status: BookingStatus;
}) {
  const styles = {
    Confirmed:
      "bg-[#ECFDF5] text-emerald-700",
    Pending:
      "bg-[#FFF7E6] text-[#9A6700]",
    Completed:
      "bg-[#EEF2FF] text-[#0D21A1]",
    Cancelled:
      "bg-[#FEF2F2] text-red-600",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* -------------------------------- */
/* DETAILS DRAWER */
/* -------------------------------- */

function BookingDetails({
  booking,
  onClose,
  onMessage,
}: {
  booking: Booking;
  onClose: () => void;
  onMessage: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex justify-end">

      <button
        aria-label="Close"
        onClick={onClose}
        className="absolute inset-0 bg-[#03045E]/30 backdrop-blur-sm"
      />

      <aside className="relative z-10 h-full w-full max-w-lg overflow-y-auto bg-white shadow-2xl">

        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#03045E]/10 bg-white px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              BOOKING DETAILS
            </p>

            <h2 className="mt-1 font-serif text-2xl font-semibold">
              #{booking.id}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#FAFAF8] text-lg text-[#64748B]"
          >
            ×
          </button>
        </div>

        <div className="p-6">

          <div className="overflow-hidden rounded-2xl">
            <img
              src={booking.image}
              alt={booking.property}
              className="h-56 w-full object-cover"
            />
          </div>

          <div className="mt-6">
            <StatusBadge status={booking.status} />

            <h3 className="mt-3 font-serif text-2xl font-semibold">
              {booking.property}
            </h3>

            <p className="mt-1 text-sm text-[#64748B]">
              {booking.location}
            </p>
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3">

            <DetailBox
              label="Guest"
              value={booking.guest}
            />

            <DetailBox
              label="Guests"
              value={`${booking.guests} people`}
            />

            <DetailBox
              label="Stay"
              value={booking.dates}
            />

            <DetailBox
              label="Nights"
              value={`${booking.nights} nights`}
            />

            <DetailBox
              label="Amount"
              value={`₹${booking.amount.toLocaleString("en-IN")}`}
            />

            <DetailBox
              label="Booked on"
              value={booking.bookedOn}
            />

          </div>

          {/* GUEST */}
          <div className="mt-6 rounded-2xl border border-[#03045E]/10 p-5">

            <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C6A15B]">
              GUEST
            </p>

            <div className="mt-4 flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] font-semibold">
                {booking.guestInitials}
              </div>

              <div>
                <p className="text-sm font-semibold">
                  {booking.guest}
                </p>

                <p className="text-xs text-[#64748B]">
                  {booking.email}
                </p>
              </div>

            </div>

            <p className="mt-3 text-xs text-[#64748B]">
              {booking.phone}
            </p>

          </div>

          {/* GUEST MESSAGE */}
          {booking.message && (
            <div className="mt-4 rounded-2xl bg-[#FAFAF8] p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#C6A15B]">
                GUEST MESSAGE
              </p>

              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                “{booking.message}”
              </p>
            </div>
          )}

          {/* ACTIONS */}
          <div className="mt-6 flex gap-3">

            <button
              onClick={onMessage}
              className="flex-1 rounded-xl border border-[#03045E]/10 px-4 py-3 text-sm font-semibold text-[#03045E] hover:bg-[#F7F3EA]"
            >
              Message guest
            </button>

            {booking.status === "Pending" && (
              <button className="flex-1 rounded-xl bg-[#03045E] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]">
                Accept booking
              </button>
            )}

          </div>

        </div>
      </aside>
    </div>
  );
}

/* -------------------------------- */
/* DETAIL BOX */
/* -------------------------------- */

function DetailBox({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#FAFAF8] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* CHAT DRAWER */
/* -------------------------------- */

function ChatDrawer({
  booking,
  onClose,
}: {
  booking: Booking;
  onClose: () => void;
}) {
  const [message, setMessage] = useState("");

  return (
    <div className="fixed inset-0 z-[60] flex justify-end">

      <button
        aria-label="Close chat"
        onClick={onClose}
        className="absolute inset-0 bg-[#03045E]/30 backdrop-blur-sm"
      />

      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

        {/* CHAT HEADER */}
        <div className="border-b border-[#03045E]/10 p-5">

          <div className="flex items-center justify-between">

            <div className="flex items-center gap-3">

              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#EEF2FF] font-semibold">
                {booking.guestInitials}
              </div>

              <div>
                <p className="font-semibold">
                  {booking.guest}
                </p>

                <p className="text-xs text-[#64748B]">
                  {booking.property}
                </p>
              </div>

            </div>

            <button
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-full bg-[#FAFAF8]"
            >
              ×
            </button>

          </div>
        </div>

        {/* CHAT BODY */}
        <div className="flex-1 space-y-4 overflow-y-auto bg-[#FAFAF8] p-5">

          <div className="flex justify-center">
            <span className="rounded-full bg-white px-3 py-1 text-[10px] text-[#94A3B8]">
              Today
            </span>
          </div>

          <div className="flex justify-start">
            <div className="max-w-[80%] rounded-2xl rounded-bl-sm bg-white p-4 shadow-sm">
              <p className="text-sm leading-6 text-[#64748B]">
                {booking.message ||
                  "Hello! I have a question about my stay."}
              </p>

              <p className="mt-2 text-[10px] text-[#94A3B8]">
                10:42 AM
              </p>
            </div>
          </div>

          <div className="flex justify-end">
            <div className="max-w-[80%] rounded-2xl rounded-br-sm bg-[#03045E] p-4 text-white">
              <p className="text-sm leading-6">
                Hello! Thank you for reaching out.
                I’ll be happy to help.
              </p>

              <p className="mt-2 text-[10px] text-white/50">
                10:45 AM
              </p>
            </div>
          </div>

        </div>

        {/* CHAT INPUT */}
        <div className="border-t border-[#03045E]/10 bg-white p-4">

          <div className="flex gap-2">

            <input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write a message..."
              className="min-w-0 flex-1 rounded-xl border border-[#03045E]/10 bg-[#FAFAF8] px-4 py-3 text-sm outline-none focus:border-[#03045E]"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setMessage("");
                }
              }}
            />

            <button
              onClick={() => setMessage("")}
              className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Send
            </button>

          </div>

          <p className="mt-2 text-[10px] text-[#94A3B8]">
            Keep communication respectful and related to the
            booking.
          </p>

        </div>

      </aside>
    </div>
  );
}