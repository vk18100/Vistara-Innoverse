"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  ShieldCheck,
  Star,
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

  driver?: {
    name: string;
    rating?: number;
    totalTrips?: number;
    isVerified?: boolean;
  };
};

const bookingLabels: Record<string, string> = {
  route: "Route Driver",
  per_hour: "Per Hour",
  whole_trip: "Whole Trip",
  religious: "Religious Trip",
};

const statusStyles = {
  pending: "bg-[#FFF7E8] text-[#8A6418]",
  confirmed: "bg-[#EEF7F2] text-[#28704D]",
  completed: "bg-[#F0F4F1] text-[#496354]",
  cancelled: "bg-[#FEF1F1] text-[#A34A4A]",
};

export default function DriverBookingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBooking() {
      try {
        const { id } = await params;

        const response = await fetch(`/api/driver-bookings/${id}`);
        const result = await response.json();

        if (result.success) {
          setBooking(result.data);
        }
      } catch (error) {
        console.error("Booking detail error:", error);
      } finally {
        setLoading(false);
      }
    }

    loadBooking();
  }, [params]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <Navbar />

        <div className="mx-auto max-w-5xl px-5 py-12 md:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-[#EAE7E1]" />

          <div className="mt-8 h-10 w-72 animate-pulse rounded bg-[#EAE7E1]" />

          <div className="mt-8 h-[420px] animate-pulse rounded-[28px] bg-white" />
        </div>
      </main>
    );
  }

  if (!booking) {
    return (
      <main className="min-h-screen bg-[#FAF9F7]">
        <Navbar />

        <div className="flex min-h-[70vh] items-center justify-center px-6">
          <div className="text-center">
            <Car className="mx-auto text-[#8B6F3D]" size={34} />

            <h1 className="mt-5 font-serif text-3xl font-semibold text-[#292524]">
              Booking not found
            </h1>

            <p className="mt-2 text-sm text-[#78716C]">
              This booking may have been removed or is no longer available.
            </p>

            <Link
              href="/driver-bookings"
              className="mt-6 inline-flex rounded-full bg-[#292524] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#44403C]"
            >
              Back to bookings
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const driverName = booking.driver?.name || "Your Driver";
  const rating = booking.driver?.rating ?? 4.8;
  const totalTrips = booking.driver?.totalTrips ?? 0;

  return (
    <main className="min-h-screen bg-[#FAF9F7] text-[#292524]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-5 py-8 md:px-8 md:py-12">
        {/* BACK */}
        <Link
          href="/driver-bookings"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#78716C] transition hover:text-[#292524]"
        >
          <ArrowLeft size={17} />
          Back to bookings
        </Link>

        {/* HEADER */}
        <div className="mt-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#8B6F3D]">
              DRIVER BOOKING
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight md:text-4xl">
              Your journey
            </h1>
          </div>

          <span
            className={`w-fit rounded-full px-4 py-2 text-xs font-semibold capitalize ${
              statusStyles[booking.status]
            }`}
          >
            {booking.status}
          </span>
        </div>

        {/* MAIN CARD */}
        <div className="mt-8 overflow-hidden rounded-[28px] border border-[#E7E2D8] bg-white shadow-[0_16px_50px_rgba(41,37,36,0.06)]">
          {/* DRIVER */}
          <div className="border-b border-[#E7E2D8] p-6 md:p-8">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                {/* SAME IMAGE FOR EVERY DRIVER */}
                <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-[#F1EEE8]">
                  <img
                    src="/images/profile.jpg"
                    alt={driverName}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h2 className="text-lg font-semibold">{driverName}</h2>

                    {booking.driver?.isVerified !== false && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#F3F6F3] px-2.5 py-1 text-[11px] font-semibold text-[#496354]">
                        <ShieldCheck size={13} />
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="mt-1 flex flex-wrap items-center gap-3 text-sm text-[#78716C]">
                    <span className="flex items-center gap-1">
                      <Star
                        size={14}
                        fill="currentColor"
                        className="text-[#B08A43]"
                      />
                      {rating.toFixed(1)}
                    </span>

                    <span>•</span>

                    <span>{totalTrips} trips</span>
                  </div>
                </div>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs uppercase tracking-wider text-[#A8A29E]">
                  Service
                </p>

                <p className="mt-1 text-sm font-semibold text-[#57534E]">
                  {bookingLabels[booking.bookingType] || "Driver Service"}
                </p>
              </div>
            </div>
          </div>

          {/* ROUTE */}
          <div className="p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A8A29E]">
              JOURNEY DETAILS
            </p>

            <div className="mt-6">
              <LocationRow
                icon={<MapPin size={17} />}
                label="Pickup"
                value={booking.pickup}
              />

              {booking.destination && (
                <>
                  <div className="ml-[17px] h-7 border-l border-dashed border-[#D6D1C9]" />

                  <LocationRow
                    icon={<MapPin size={17} />}
                    label="Destination"
                    value={booking.destination}
                  />
                </>
              )}
            </div>

            {/* META */}
            <div className="mt-8 grid grid-cols-1 gap-3 border-t border-[#E7E2D8] pt-6 sm:grid-cols-3">
              <DetailItem
                icon={<CalendarDays size={17} />}
                label="Date"
                value={booking.date}
              />

              <DetailItem
                icon={<Clock3 size={17} />}
                label="Time"
                value={booking.time}
              />

              <DetailItem
                icon={<Users size={17} />}
                label="Passengers"
                value={`${booking.passengers}`}
              />
            </div>
          </div>

          {/* FARE */}
          <div className="border-t border-[#E7E2D8] bg-[#FBFAF8] p-6 md:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.16em] text-[#A8A29E]">
                  ESTIMATED FARE
                </p>

                <p className="mt-1 text-3xl font-semibold text-[#292524]">
                  ₹{booking.price.toLocaleString("en-IN")}
                </p>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-[#A8A29E]">Booking ID</p>
                <p className="mt-1 text-sm font-medium text-[#57534E]">
                  {booking.id}
                </p>
              </div>
            </div>
          </div>

          {/* NOTES */}
          {booking.notes && (
            <div className="border-t border-[#E7E2D8] p-6 md:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#A8A29E]">
                NOTES
              </p>

              <p className="mt-3 text-sm leading-6 text-[#57534E]">
                {booking.notes}
              </p>
            </div>
          )}

          {/* CONFIRMATION */}
          {booking.status === "confirmed" && (
            <div className="flex items-start gap-3 border-t border-[#E7E2D8] bg-[#F5F8F5] p-6">
              <CheckCircle2
                size={20}
                className="mt-0.5 shrink-0 text-[#496354]"
              />

              <div>
                <p className="text-sm font-semibold text-[#3F5147]">
                  Your booking is confirmed
                </p>

                <p className="mt-1 text-sm text-[#69766F]">
                  Your driver and journey details are ready.
                </p>
              </div>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}

function LocationRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3F0EA] text-[#8B6F3D]">
        {icon}
      </div>

      <div>
        <p className="text-xs uppercase tracking-wide text-[#A8A29E]">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-[#44403C]">
          {value}
        </p>
      </div>
    </div>
  );
}

function DetailItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-[#FBFAF8] p-4">
      <div className="text-[#8B6F3D]">{icon}</div>

      <div>
        <p className="text-xs text-[#A8A29E]">{label}</p>

        <p className="mt-1 text-sm font-semibold text-[#57534E]">
          {value}
        </p>
      </div>
    </div>
  );
}