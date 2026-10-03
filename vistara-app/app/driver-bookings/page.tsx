"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
  XCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";

type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled";

type Booking = {
  id: string;
  driverId: string;
  driverName: string;
  driverImage?: string;
  bookingType: string;
  pickup: string;
  destination?: string | null;
  date: string;
  time: string;
  passengers: number;
  price: number;
  status: BookingStatus;
};

const driverImage = "/images/driver-profile.jpg";

const statusConfig: Record<
  BookingStatus,
  {
    label: string;
    className: string;
    icon: React.ReactNode;
  }
> = {
  pending: {
    label: "Pending",
    className: "bg-amber-50 text-amber-700 border-amber-100",
    icon: <Clock3 size={13} />,
  },
  confirmed: {
    label: "Confirmed",
    className: "bg-emerald-50 text-emerald-700 border-emerald-100",
    icon: <CheckCircle2 size={13} />,
  },
  completed: {
    label: "Completed",
    className: "bg-stone-100 text-stone-600 border-stone-200",
    icon: <CheckCircle2 size={13} />,
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-red-50 text-red-600 border-red-100",
    icon: <XCircle size={13} />,
  },
};

const bookingLabels: Record<string, string> = {
  route: "Route Driver",
  per_hour: "Hourly",
  whole_trip: "Whole Trip",
  religious: "Religious Trip",
};

export default function DriverBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] =
    useState<"all" | BookingStatus>("all");

  useEffect(() => {
    loadBookings();
  }, []);

  async function loadBookings() {
    try {
      const response = await fetch("/api/driver-bookings");

      if (!response.ok) {
        throw new Error("Failed to load bookings");
      }

      const result = await response.json();

      if (result.success) {
        const formatted = (result.data || []).map(
          (booking: Booking) => ({
            ...booking,
            driverImage: booking.driverImage || driverImage,
          })
        );

        setBookings(formatted);
      } else {
        setBookings([]);
      }
    } catch (error) {
      console.error("Bookings error:", error);
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }

  const filteredBookings =
    activeTab === "all"
      ? bookings
      : bookings.filter(
          (booking) => booking.status === activeTab
        );

  const tabs: {
    value: "all" | BookingStatus;
    label: string;
  }[] = [
    { value: "all", label: "All" },
    { value: "pending", label: "Pending" },
    { value: "confirmed", label: "Confirmed" },
    { value: "completed", label: "Completed" },
    { value: "cancelled", label: "Cancelled" },
  ];

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#292524]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#E7E2D8] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-10 lg:py-14">
          <Link
            href="/drivers"
            className="inline-flex items-center gap-2 text-sm text-[#78716C] transition hover:text-[#292524]"
          >
            <ArrowRight
              size={16}
              className="rotate-180"
            />
            Drivers
          </Link>

          <div className="mt-7">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8B6F3D]">
              YOUR JOURNEYS
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
              Driver bookings
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#78716C]">
              Keep track of your upcoming rides, active requests
              and completed journeys.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 lg:px-10 lg:py-10">

        {/* FILTERS */}
        <div className="mb-7 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const active = activeTab === tab.value;

            return (
              <button
                key={tab.value}
                type="button"
                onClick={() => setActiveTab(tab.value)}
                className={`whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-[#292524] text-white"
                    : "border border-[#E7E2D8] bg-white text-[#78716C] hover:border-[#C6A15B] hover:text-[#292524]"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* LOADING */}
        {loading && (
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className="h-52 animate-pulse rounded-3xl bg-white ring-1 ring-[#E7E2D8]"
              />
            ))}
          </div>
        )}

        {/* EMPTY */}
        {!loading && filteredBookings.length === 0 && (
          <div className="rounded-3xl border border-[#E7E2D8] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F7F3EA] text-[#8B6F3D]">
              <Car size={24} />
            </div>

            <h2 className="mt-5 font-serif text-2xl font-semibold">
              No bookings here
            </h2>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78716C]">
              Choose a driver and plan your next journey with
              Vistara.
            </p>

            <Link
              href="/drivers"
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#292524] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#44403C]"
            >
              Find a driver
              <ArrowRight size={16} />
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
  const status = statusConfig[booking.status];

  return (
    <article className="overflow-hidden rounded-3xl border border-[#E7E2D8] bg-white transition hover:shadow-[0_14px_45px_rgba(41,37,36,0.08)]">

      <div className="p-5 sm:p-6">

        {/* TOP */}
        <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

          <div className="flex items-center gap-4">

            {/* SAME DRIVER IMAGE */}
            <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-2xl bg-[#F7F3EA]">
              <img
                src={booking.driverImage || driverImage}
                alt={booking.driverName || "Driver"}
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="font-semibold text-[#292524]">
                  {booking.driverName || "Vistara Driver"}
                </h2>

                <span
                  className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-semibold ${status.className}`}
                >
                  {status.icon}
                  {status.label}
                </span>
              </div>

              <p className="mt-1 text-xs text-[#A8A29E]">
                {bookingLabels[booking.bookingType] ||
                  "Driver Service"}
              </p>
            </div>
          </div>

          {/* PRICE */}
          <div className="sm:text-right">
            <p className="text-[11px] uppercase tracking-wider text-[#A8A29E]">
              Estimated fare
            </p>

            <p className="mt-1 text-xl font-semibold text-[#292524]">
              ₹{booking.price.toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        {/* ROUTE */}
        <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-4">

          <div className="flex gap-3">
            <div className="flex flex-col items-center pt-1">
              <span className="h-2.5 w-2.5 rounded-full border-2 border-[#8B6F3D] bg-white" />

              {booking.destination && (
                <span className="my-1 h-7 border-l border-dashed border-[#D6D3D1]" />
              )}

              {booking.destination && (
                <span className="h-2.5 w-2.5 rounded-full bg-[#292524]" />
              )}
            </div>

            <div className="min-w-0 flex-1 space-y-4">

              <div>
                <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
                  Pickup
                </p>

                <p className="mt-1 truncate text-sm font-medium text-[#292524]">
                  {booking.pickup}
                </p>
              </div>

              {booking.destination && (
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-[#A8A29E]">
                    Destination
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-[#292524]">
                    {booking.destination}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* META */}
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3">

          <BookingMeta
            icon={<CalendarDays size={15} />}
            label="Date"
            value={booking.date}
          />

          <BookingMeta
            icon={<Clock3 size={15} />}
            label="Time"
            value={booking.time}
          />

          <BookingMeta
            icon={<Users size={15} />}
            label="Passengers"
            value={`${booking.passengers}`}
          />
        </div>

        {/* FOOTER */}
        <div className="mt-5 flex flex-col gap-3 border-t border-[#E7E2D8] pt-5 sm:flex-row sm:items-center sm:justify-between">

          <p className="text-xs text-[#A8A29E]">
            Booking ID · {booking.id}
          </p>

          <Link
            href={`/driver-bookings/${booking.id}`}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-[#D6D3D1] px-4 py-2.5 text-sm font-semibold text-[#292524] transition hover:border-[#8B6F3D] hover:bg-[#F7F3EA]"
          >
            View booking
            <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function BookingMeta({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-[#E7E2D8] bg-white px-3 py-3">
      <div className="flex items-center gap-1.5 text-[#8B6F3D]">
        {icon}
        <span className="text-[10px] font-semibold uppercase tracking-wide text-[#A8A29E]">
          {label}
        </span>
      </div>

      <p className="mt-1 text-sm font-medium text-[#292524]">
        {value}
      </p>
    </div>
  );
}