"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  Phone,
  ShieldCheck,
  UserRound,
  Users,
  XCircle,
} from "lucide-react";
import Navbar from "@/components/navbar";

const booking = {
  id: "driver_booking_001",
  driverId: "driver_001",
  driverName: "Rajesh Kumar",
  driverImage:
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80",
  bookingType: "whole_trip",
  pickup: "Patna Airport",
  destination: "Bodh Gaya, Bihar",
  date: "2026-10-12",
  time: "08:00",
  passengers: 3,
  price: 7800,
  status: "confirmed",
  vehicle: "Toyota Innova Crysta",
  vehicleType: "SUV",
  seats: 6,
  notes: "Need one extra stop at Mahabodhi Temple.",
};

const steps = [
  {
    title: "Booking requested",
    description: "Your booking request was submitted.",
    done: true,
  },
  {
    title: "Driver confirmed",
    description: "Your driver has accepted the journey.",
    done: true,
  },
  {
    title: "Journey upcoming",
    description: "Driver will arrive at your pickup location.",
    done: false,
  },
  {
    title: "Journey completed",
    description: "Complete your trip and leave a review.",
    done: false,
  },
];

export default function DriverBookingDetailsPage() {
  const params = useParams();

  const bookingId = params.id as string;

  return (
    <main className="min-h-screen bg-[#FAFBFF] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <div className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
          <Link
            href="/driver-bookings"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            <ArrowLeft size={17} />
            Back to bookings
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* TITLE */}
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              DRIVER JOURNEY
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold">
              Your booking
            </h1>

            <p className="mt-2 text-sm text-[#64748B]">
              Booking ID: {bookingId}
            </p>
          </div>

          <span className="w-fit rounded-full bg-[#EEF0FF] px-4 py-2 text-sm font-semibold capitalize text-[#03045E]">
            {booking.status}
          </span>
        </div>

        <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_390px]">
          {/* LEFT */}
          <div className="space-y-6">
            {/* JOURNEY */}
            <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-7">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#EEF0FF]">
                  <MapPin size={20} />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-[#94A3B8]">
                    JOURNEY
                  </p>

                  <h2 className="mt-1 font-serif text-2xl font-semibold">
                    {booking.pickup} → {booking.destination}
                  </h2>
                </div>
              </div>

              <div className="mt-7 grid gap-4 sm:grid-cols-3">
                <InfoBox
                  icon={<CalendarDays size={17} />}
                  label="Date"
                  value={booking.date}
                />

                <InfoBox
                  icon={<Clock3 size={17} />}
                  label="Pickup"
                  value={booking.time}
                />

                <InfoBox
                  icon={<Users size={17} />}
                  label="Passengers"
                  value={`${booking.passengers}`}
                />
              </div>
            </div>

            {/* DRIVER */}
            <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-7">
              <div className="flex items-center justify-between">
                <h2 className="font-serif text-2xl font-semibold">
                  Your driver
                </h2>

                <div className="flex items-center gap-1 text-xs font-semibold text-[#047857]">
                  <ShieldCheck size={16} />
                  Verified
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
                <img
                  src={booking.driverImage}
                  alt={booking.driverName}
                  className="h-20 w-20 rounded-2xl object-cover"
                />

                <div className="flex-1">
                  <h3 className="text-lg font-semibold">
                    {booking.driverName}
                  </h3>

                  <p className="mt-1 text-sm text-[#64748B]">
                    Experienced local driver
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    <span className="rounded-full bg-[#F7F9FF] px-3 py-1.5 text-xs">
                      {booking.vehicle}
                    </span>

                    <span className="rounded-full bg-[#F7F9FF] px-3 py-1.5 text-xs">
                      {booking.seats} seats
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#03045E]/15 px-4 py-3 text-sm font-semibold hover:border-[#03045E]"
                >
                  <Phone size={16} />
                  Contact
                </button>
              </div>
            </div>

            {/* VEHICLE */}
            <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-7">
              <div className="flex items-center gap-3">
                <Car size={20} />

                <h2 className="font-serif text-2xl font-semibold">
                  Vehicle
                </h2>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-2xl bg-[#F7F9FF] p-5">
                <div>
                  <p className="font-semibold">
                    {booking.vehicle}
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {booking.vehicleType} · {booking.seats} seats
                  </p>
                </div>

                <Car size={28} className="text-[#0D21A1]" />
              </div>
            </div>

            {/* NOTES */}
            {booking.notes && (
              <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 md:p-7">
                <h2 className="font-serif text-2xl font-semibold">
                  Special requirements
                </h2>

                <p className="mt-3 text-sm leading-6 text-[#64748B]">
                  {booking.notes}
                </p>
              </div>
            )}

            {/* CANCEL */}
            {booking.status === "confirmed" && (
              <button
                type="button"
                className="flex w-full items-center justify-center gap-2 rounded-xl border border-red-200 bg-white px-5 py-3.5 text-sm font-semibold text-red-600 hover:bg-red-50"
              >
                <XCircle size={18} />
                Cancel Booking
              </button>
            )}
          </div>

          {/* RIGHT */}
          <aside>
            <div className="sticky top-6 space-y-6">
              {/* STATUS */}
              <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_50px_rgba(3,4,94,0.06)]">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                  JOURNEY STATUS
                </p>

                <div className="mt-7 space-y-6">
                  {steps.map((step, index) => (
                    <div
                      key={step.title}
                      className="relative flex gap-4"
                    >
                      {index !== steps.length - 1 && (
                        <div
                          className={`absolute left-[15px] top-8 h-12 w-px ${
                            step.done
                              ? "bg-[#03045E]"
                              : "bg-[#DDE2E8]"
                          }`}
                        />
                      )}

                      <div
                        className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                          step.done
                            ? "bg-[#03045E] text-white"
                            : "border border-[#DDE2E8] bg-white text-[#94A3B8]"
                        }`}
                      >
                        {step.done ? (
                          <CheckCircle2 size={16} />
                        ) : (
                          <span className="h-2 w-2 rounded-full bg-current" />
                        )}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {step.title}
                        </p>

                        <p className="mt-1 text-xs leading-5 text-[#64748B]">
                          {step.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* PAYMENT */}
              <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#94A3B8]">
                  PAYMENT SUMMARY
                </p>

                <div className="mt-5 flex items-center justify-between">
                  <span className="text-sm text-[#64748B]">
                    Driver service
                  </span>

                  <span className="text-sm font-semibold">
                    ₹{booking.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="my-5 border-t border-[#03045E]/10" />

                <div className="flex items-center justify-between">
                  <span className="font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-semibold">
                    ₹{booking.price.toLocaleString("en-IN")}
                  </span>
                </div>

                <p className="mt-3 text-xs leading-5 text-[#94A3B8]">
                  Final amount may change if the journey details
                  or additional requirements change.
                </p>
              </div>

              {/* DRIVER PROFILE */}
              <Link
                href={`/driver/${booking.driverId}`}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white hover:bg-[#0D21A1]"
              >
                <UserRound size={17} />
                View Driver Profile
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function InfoBox({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-[#F7F9FF] p-4">
      <div className="flex items-center gap-2 text-[#0D21A1]">
        {icon}

        <span className="text-xs font-semibold uppercase tracking-wider text-[#94A3B8]">
          {label}
        </span>
      </div>

      <p className="mt-2 text-sm font-semibold">
        {value}
      </p>
    </div>
  );
}