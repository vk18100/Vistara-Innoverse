"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  ArrowLeft,
  CalendarDays,
  Car,
  CheckCircle2,
  Clock3,
  MapPin,
  Users,
} from "lucide-react";
import Navbar from "@/components/navbar";

export default function DriverBookingPage() {
  const params = useParams();
  const searchParams = useSearchParams();

  const driverId = params.id as string;

  const bookingType =
    searchParams.get("type") || "route";

  const initialPrice =
    Number(searchParams.get("price")) || 0;

  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [notes, setNotes] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const serviceLabels: Record<string, string> = {
    route: "Route Driver",
    per_hour: "Per Hour Driver",
    whole_trip: "Whole Trip",
    religious: "Religious / Pilgrimage",
  };

  async function handleBooking() {
    if (!pickup || !date || !time) {
      alert("Please fill pickup, date and time.");
      return;
    }

    if (
      bookingType === "route" ||
      bookingType === "religious"
    ) {
      if (!destination) {
        alert("Please enter your destination.");
        return;
      }
    }

    try {
      setSubmitting(true);

      const response = await fetch("/api/driver-bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          driverId,
          bookingType,
          pickup,
          destination,
          date,
          time,
          passengers,
          notes,
          price: initialPrice,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Booking failed"
        );
      }

      setSuccess(true);
    } catch (error) {
      console.error("Booking error:", error);
      alert("Unable to create booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <>
        <Navbar />

        <main className="flex min-h-[75vh] items-center justify-center px-6">
          <div className="w-full max-w-xl rounded-[30px] border border-[#03045E]/10 bg-white p-8 text-center shadow-[0_20px_60px_rgba(3,4,94,0.08)] md:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF0FF] text-[#03045E]">
              <CheckCircle2 size={34} />
            </div>

            <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              BOOKING REQUESTED
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold">
              Your driver booking is on its way.
            </h1>

            <p className="mt-4 text-sm leading-6 text-[#64748B]">
              Your booking request has been submitted. You can
              view its status from your driver bookings.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/driver-bookings"
                className="flex-1 rounded-xl bg-[#03045E] px-5 py-3.5 text-sm font-semibold text-white"
              >
                View My Bookings
              </Link>

              <Link
                href="/driver"
                className="flex-1 rounded-xl border border-[#03045E]/15 px-5 py-3.5 text-sm font-semibold"
              >
                Find Another Driver
              </Link>
            </div>
          </div>
        </main>
      </>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFBFF] text-[#03045E]">
      <Navbar />

      {/* BACK */}
      <div className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-5 lg:px-10">
          <Link
            href={`/driver/${driverId}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            <ArrowLeft size={17} />
            Back to driver
          </Link>
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
          {/* FORM */}
          <div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                DRIVER BOOKING
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold">
                Plan your journey
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                Enter your journey details and send a booking
                request to the driver.
              </p>
            </div>

            {/* BOOKING TYPE */}
            <div className="mt-8 rounded-[25px] border border-[#03045E]/10 bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#EEF0FF]">
                  <Car size={19} />
                </div>

                <div>
                  <p className="text-xs text-[#64748B]">
                    Booking type
                  </p>

                  <h2 className="mt-0.5 font-semibold">
                    {serviceLabels[bookingType] ||
                      "Driver Service"}
                  </h2>
                </div>
              </div>
            </div>

            {/* LOCATION */}
            <div className="mt-5 rounded-[25px] border border-[#03045E]/10 bg-white p-6">
              <div className="flex items-center gap-2">
                <MapPin size={19} />

                <h2 className="font-serif text-xl font-semibold">
                  Journey details
                </h2>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">
                    Pickup location
                  </label>

                  <input
                    value={pickup}
                    onChange={(e) =>
                      setPickup(e.target.value)
                    }
                    placeholder="Hotel, airport, home..."
                    className="mt-2 w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#03045E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Destination
                  </label>

                  <input
                    value={destination}
                    onChange={(e) =>
                      setDestination(e.target.value)
                    }
                    placeholder="Where are you going?"
                    className="mt-2 w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3.5 text-sm outline-none transition focus:border-[#03045E]"
                  />
                </div>
              </div>
            </div>

            {/* DATE TIME */}
            <div className="mt-5 rounded-[25px] border border-[#03045E]/10 bg-white p-6">
              <div className="flex items-center gap-2">
                <CalendarDays size={19} />

                <h2 className="font-serif text-xl font-semibold">
                  Date & time
                </h2>
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
                <div>
                  <label className="text-sm font-semibold">
                    Travel date
                  </label>

                  <input
                    type="date"
                    value={date}
                    onChange={(e) =>
                      setDate(e.target.value)
                    }
                    min={
                      new Date()
                        .toISOString()
                        .split("T")[0]
                    }
                    className="mt-2 w-full rounded-xl border border-[#03045E]/15 px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
                  />
                </div>

                <div>
                  <label className="text-sm font-semibold">
                    Pickup time
                  </label>

                  <input
                    type="time"
                    value={time}
                    onChange={(e) =>
                      setTime(e.target.value)
                    }
                    className="mt-2 w-full rounded-xl border border-[#03045E]/15 px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
                  />
                </div>
              </div>
            </div>

            {/* PASSENGERS */}
            <div className="mt-5 rounded-[25px] border border-[#03045E]/10 bg-white p-6">
              <div className="flex items-center gap-2">
                <Users size={19} />

                <h2 className="font-serif text-xl font-semibold">
                  Passengers
                </h2>
              </div>

              <div className="mt-5 flex items-center justify-between rounded-xl bg-[#F7F9FF] p-4">
                <div>
                  <p className="text-sm font-semibold">
                    Number of passengers
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Includes all travelers
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() =>
                      setPassengers(
                        Math.max(1, passengers - 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-[#03045E]/15 bg-white font-semibold"
                  >
                    −
                  </button>

                  <span className="w-5 text-center font-semibold">
                    {passengers}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setPassengers(
                        Math.min(10, passengers + 1)
                      )
                    }
                    className="flex h-9 w-9 items-center justify-center rounded-full bg-[#03045E] font-semibold text-white"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* NOTES */}
            <div className="mt-5 rounded-[25px] border border-[#03045E]/10 bg-white p-6">
              <h2 className="font-serif text-xl font-semibold">
                Additional requirements
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                Tell the driver anything important about your
                journey.
              </p>

              <textarea
                value={notes}
                onChange={(e) =>
                  setNotes(e.target.value)
                }
                rows={5}
                placeholder="Extra stops, luggage, temple visits, special requirements..."
                className="mt-5 w-full resize-none rounded-xl border border-[#03045E]/15 px-4 py-3.5 text-sm outline-none focus:border-[#03045E]"
              />
            </div>
          </div>

          {/* SUMMARY */}
          <aside>
            <div className="sticky top-6 rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_18px_60px_rgba(3,4,94,0.08)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                YOUR BOOKING
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold">
                Booking summary
              </h2>

              <div className="mt-6 space-y-4">
                <SummaryRow
                  icon={<Car size={17} />}
                  label="Service"
                  value={
                    serviceLabels[bookingType] ||
                    "Driver"
                  }
                />

                <SummaryRow
                  icon={<MapPin size={17} />}
                  label="Pickup"
                  value={pickup || "Not selected"}
                />

                <SummaryRow
                  icon={<MapPin size={17} />}
                  label="Destination"
                  value={
                    destination || "Not selected"
                  }
                />

                <SummaryRow
                  icon={<CalendarDays size={17} />}
                  label="Date"
                  value={date || "Not selected"}
                />

                <SummaryRow
                  icon={<Clock3 size={17} />}
                  label="Time"
                  value={time || "Not selected"}
                />

                <SummaryRow
                  icon={<Users size={17} />}
                  label="Passengers"
                  value={`${passengers}`}
                />
              </div>

              <div className="my-6 border-t border-[#03045E]/10" />

              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs text-[#64748B]">
                    Estimated total
                  </p>

                  <p className="mt-1 text-xs text-[#94A3B8]">
                    Final fare may vary
                  </p>
                </div>

                <p className="text-2xl font-semibold">
                  ₹{initialPrice.toLocaleString("en-IN")}
                </p>
              </div>

              <button
                type="button"
                disabled={submitting}
                onClick={handleBooking}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#03045E] px-5 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? (
                  <>
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                    Sending request...
                  </>
                ) : (
                  <>
                    <CheckCircle2 size={18} />
                    Request Booking
                  </>
                )}
              </button>

              <p className="mt-4 text-center text-xs leading-5 text-[#94A3B8]">
                Your booking will be confirmed after the
                required availability/payment steps.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function SummaryRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-[#0D21A1]">
        {icon}
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-xs text-[#94A3B8]">
          {label}
        </p>

        <p className="mt-0.5 truncate text-sm font-medium">
          {value}
        </p>
      </div>
    </div>
  );
}