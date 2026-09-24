"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

type Booking = {
  id: string;
  driverId: string;
  bookingType: string;
  pickup: string;
  destination: string | null;
  date: string;
  time: string;
  passengers: number;
  notes: string;
  price: number;
  status: "pending" | "confirmed" | "completed" | "cancelled";
  createdAt: string;
};

const statusStyles = {
  pending: "bg-[#FFF7E6] text-[#9A6700]",
  confirmed: "bg-[#EEF0FF] text-[#03045E]",
  completed: "bg-[#ECFDF5] text-[#047857]",
  cancelled: "bg-[#FEF2F2] text-[#B91C1C]",
};

const bookingLabels: Record<string, string> = {
  route: "Route Driver",
  per_hour: "Per Hour",
  whole_trip: "Whole Trip",
  religious: "Religious Trip",
};

export default function DriverBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("all");

  useEffect(() => {
    async function loadBookings() {
      try {
        const response = await fetch("/api/driver-bookings");
        const result = await response.json();

        if (result.success) {
          setBookings(result.data || []);
        }
      } catch (error) {
        console.error("Bookings error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBookings();
  }, []);

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === activeTab
        );

  return (
    <main className="min-h-screen bg-[#FAFBFF] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/driver"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            <ArrowLeft size={17} />
            Drivers
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              YOUR JOURNEYS
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold">
              Driver Bookings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
              Manage your driver requests, upcoming journeys
              and completed trips in one place.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* TABS */}
        <div className="mb-8 flex gap-2 overflow-x-auto pb-1">
          {[
            ["all", "All"],
            ["pending", "Pending"],
            ["confirmed", "Confirmed"],
            ["completed", "Completed"],
            ["cancelled", "Cancelled"],
          ].map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => setActiveTab(value)}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                activeTab === value
                  ? "bg-[#03045E] text-white"
                  : "border border-[#03045E]/10 bg-white text-[#64748B] hover:border-[#03045E]/30 hover:text-[#03045E]"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-4 border-[#03045E]/15 border-t-[#03045E]" />

              <p className="mt-4 text-sm text-[#64748B]">
                Loading your bookings...
              </p>
            </div>
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredBookings.length === 0 && (
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF0FF] text-[#03045E]">
              <Car size={28} />
            </div>

            <h2 className="mt-6 font-serif text-2xl font-semibold">
              No driver bookings yet
            </h2>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[#64748B]">
              Find a local driver and book one for your route,
              hourly journey, whole trip or pilgrimage.
            </p>

            <Link
              href="/driver"
              className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white hover:bg-[#0D21A1]"
            >
              Find a Driver
            </Link>
          </div>
        )}

        {/* BOOKINGS */}
        {!loading && filteredBookings.length > 0 && (
          <div className="space-y-5">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

function BookingCard({
  booking,
}: {
  booking: Booking;
}) {
  return (
    <article className="rounded-[26px] border border-[#03045E]/10 bg-white p-5 shadow-[0_10px_40px_rgba(3,4,94,0.04)] md:p-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        {/* LEFT */}
        <div className="flex-1">
          {/* TOP */}
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-[#EEF0FF] px-3 py-1.5 text-xs font-semibold text-[#03045E]">
              {bookingLabels[booking.bookingType] ||
                "Driver Service"}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${
                statusStyles[booking.status]
              }`}
            >
              {booking.status}
            </span>
          </div>

          {/* ROUTE */}
          <div className="mt-5">
            <div className="flex items-start gap-3">
              <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F2FF]">
                <MapPin size={16} />
              </div>

              <div>
                <p className="text-xs text-[#94A3B8]">
                  PICKUP
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {booking.pickup}
                </p>
              </div>
            </div>

            {booking.destination && (
              <>
                <div className="ml-[15px] h-6 border-l border-dashed border-[#CBD5E1]" />

                <div className="flex items-start gap-3">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#F0F2FF]">
                    <MapPin size={16} />
                  </div>

                  <div>
                    <p className="text-xs text-[#94A3B8]">
                      DESTINATION
                    </p>

                    <p className="mt-1 text-sm font-semibold">
                      {booking.destination}
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* META */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 border-t border-[#03045E]/10 pt-5">
            <Meta
              icon={<CalendarDays size={16} />}
              value={booking.date}
            />

            <Meta
              icon={<Clock3 size={16} />}
              value={booking.time}
            />

            <Meta
              icon={<Users size={16} />}
              value={`${booking.passengers} passenger${
                booking.passengers > 1 ? "s" : ""
              }`}
            />
          </div>
        </div>

        {/* RIGHT */}
        <div className="border-t border-[#03045E]/10 pt-5 lg:min-w-[210px] lg:border-l lg:border-t-0 lg:pl-7 lg:pt-0">
          <p className="text-xs text-[#94A3B8]">
            ESTIMATED FARE
          </p>

          <p className="mt-1 text-2xl font-semibold">
            ₹{booking.price.toLocaleString("en-IN")}
          </p>

          <p className="mt-1 text-xs text-[#94A3B8]">
            Booking ID: {booking.id}
          </p>

          <Link
            href={`/driver-bookings/${booking.id}`}
            className="mt-5 flex w-full items-center justify-center rounded-xl border border-[#03045E]/15 px-4 py-3 text-sm font-semibold transition hover:border-[#03045E] hover:bg-[#F7F9FF]"
          >
            View Booking
          </Link>
        </div>
      </div>
    </article>
  );
}

function Meta({
  icon,
  value,
}: {
  icon: React.ReactNode;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 text-sm text-[#64748B]">
      <span className="text-[#0D21A1]">{icon}</span>
      {value}
    </div>
  );
}