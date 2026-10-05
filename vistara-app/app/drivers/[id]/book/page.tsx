"use client";

import Link from "next/link";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Car,
  CheckCircle2,
  Clock,
  MapPin,
  ShieldCheck,
  Star,
  Users,
} from "lucide-react";

type Driver = {
  id: number;
  name: string;
  city: string;
  bio?: string | null;
  image?: string | null;
  vehicle?: string | null;
  vehicleType?: string | null;
  rating: number;
  reviewCount: number;
  price?: number | null;
  seats?: number | null;
  verified?: boolean;
};

export default function DriverBookPage() {
  const [driver, setDriver] = useState<Driver | null>(null);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [passengers, setPassengers] = useState("1");

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const driverId =
    typeof window !== "undefined"
      ? window.location.pathname.split("/")[2]
      : "";

  useEffect(() => {
    if (!driverId) {
      setError("Invalid driver.");
      setLoading(false);
      return;
    }

    const loadDriver = async () => {
      try {
        const response = await fetch(
          `/api/drivers/${driverId}`,
          {
            credentials: "include",
          }
        );

        const result = await response.json();

        if (!response.ok || !result?.success) {
          throw new Error(
            result?.message || "Unable to load driver."
          );
        }

        setDriver(result.data?.driver || result.data);
      } catch (err) {
        console.error("DRIVER_BOOK_LOAD_ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load driver."
        );
      } finally {
        setLoading(false);
      }
    };

    loadDriver();
  }, [driverId]);

  const price = Number(driver?.price || 0);

  const passengerCount = Math.max(
    1,
    Number(passengers) || 1
  );

  /*
   * Simple Vistara ride pricing.
   * Base fare is multiplied slightly for larger groups.
   */
  const total = useMemo(() => {
    if (!price) return 0;

    if (passengerCount <= 4) {
      return price;
    }

    return price + Math.max(0, passengerCount - 4) * 150;
  }, [price, passengerCount]);

  const handleSubmit = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!driverId) return;

    setError("");

    if (!date || !time) {
      setError("Please select date and time.");
      return;
    }

    if (!pickup.trim()) {
      setError("Please enter your pickup location.");
      return;
    }

    if (!destination.trim()) {
      setError("Please enter your destination.");
      return;
    }

    if (passengerCount < 1) {
      setError("Please enter a valid passenger count.");
      return;
    }

    if (
      driver?.seats &&
      passengerCount > driver.seats
    ) {
      setError(
        `This vehicle can carry up to ${driver.seats} passengers.`
      );
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(
        `/api/drivers/${driverId}/book`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            pickup,
            destination,
            date,
            time,
            passengers: passengerCount,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result?.success) {
        throw new Error(
          result?.message ||
            "Unable to create ride booking."
        );
      }

      /*
       * If your booking API returns:
       * data.booking.id
       *
       * then redirect to the booking confirmation.
       */
      const bookingId =
        result?.data?.booking?.id ||
        result?.booking?.id;

      if (bookingId) {
        window.location.href = `/driver-bookings/${bookingId}`;
        return;
      }

      /*
       * Fallback if confirmation route is not created yet.
       */
      window.location.href = "/trips";
    } catch (err) {
      console.error("DRIVER_BOOK_ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to book this ride."
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Header />

        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-black/[0.06]" />

            <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">
              <div className="h-[500px] rounded-3xl bg-black/[0.05]" />

              <div className="h-[500px] rounded-3xl bg-black/[0.05]" />
            </div>
          </div>
        </div>

        <Footer />
      </main>
    );
  }

  if (error && !driver) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Header />

        <div className="mx-auto max-w-6xl px-5 py-24 text-center lg:px-8">
          <Car className="mx-auto" size={30} />

          <h1 className="mt-4 text-lg font-semibold">
            Driver unavailable
          </h1>

          <p className="mt-2 text-xs text-black/45">
            {error}
          </p>

          <Link
            href="/drivers"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-5 py-2.5 text-xs font-semibold text-white"
          >
            <ArrowLeft size={13} />
            Back to drivers
          </Link>
        </div>

        <Footer />
      </main>
    );
  }

  if (!driver) return null;

  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="mx-auto max-w-6xl px-5 pb-14 pt-7 lg:px-8">

        {/* BACK */}

        <Link
          href={`/drivers/${driver.id}`}
          className="inline-flex items-center gap-2 text-xs text-black/50 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to driver
        </Link>

        {/* TITLE */}

        <div className="mt-6">

          <p className="text-[9px] font-bold uppercase tracking-[0.25em] text-black/40">
            BOOK A LOCAL RIDE
          </p>

          <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight">
            Ride with {driver.name}
          </h1>

          <p className="mt-2 text-xs text-black/45">
            Plan your ride around {driver.city}.
          </p>

        </div>

        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_380px]">

          {/* ================= FORM ================= */}

          <form
            onSubmit={handleSubmit}
            className="rounded-3xl border border-black/10 p-5 sm:p-7"
          >

            <div className="flex items-center gap-3 border-b border-black/10 pb-5">

              <div className="h-12 w-12 overflow-hidden rounded-xl bg-black/[0.05]">
                <img
                  src={
                    driver.image ||
                    "/images/profile.jpg"
                  }
                  alt={driver.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div>

                <div className="flex items-center gap-1.5">

                  <h2 className="text-sm font-semibold">
                    {driver.name}
                  </h2>

                  {driver.verified && (
                    <ShieldCheck size={12} />
                  )}

                </div>

                <div className="mt-1 flex items-center gap-2 text-[10px] text-black/45">

                  <span className="flex items-center gap-1">
                    <Star
                      size={10}
                      fill="currentColor"
                    />
                    {Number(driver.rating).toFixed(1)}
                  </span>

                  <span>·</span>

                  <span>
                    {driver.vehicle ||
                      driver.vehicleType ||
                      "Comfort ride"}
                  </span>

                </div>

              </div>

            </div>

            {/* DATE + TIME */}

            <div className="mt-6 grid gap-4 sm:grid-cols-2">

              <Field label="Date">
                <input
                  type="date"
                  value={date}
                  min={
                    new Date()
                      .toISOString()
                      .split("T")[0]
                  }
                  onChange={(e) =>
                    setDate(e.target.value)
                  }
                  className="input"
                  required
                />
              </Field>

              <Field label="Pickup time">
                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  className="input"
                  required
                />
              </Field>

            </div>

            {/* PICKUP */}

            <div className="mt-5">
              <Field label="Pickup location">
                <div className="relative">

                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                  />

                  <input
                    type="text"
                    value={pickup}
                    onChange={(e) =>
                      setPickup(e.target.value)
                    }
                    placeholder="Where should the driver pick you up?"
                    className="input pl-9"
                    required
                  />

                </div>
              </Field>
            </div>

            {/* DESTINATION */}

            <div className="mt-5">
              <Field label="Destination">
                <div className="relative">

                  <MapPin
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                  />

                  <input
                    type="text"
                    value={destination}
                    onChange={(e) =>
                      setDestination(e.target.value)
                    }
                    placeholder="Where are you going?"
                    className="input pl-9"
                    required
                  />

                </div>
              </Field>
            </div>

            {/* PASSENGERS */}

            <div className="mt-5">

              <Field label="Passengers">

                <div className="relative">

                  <Users
                    size={14}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-black/40"
                  />

                  <input
                    type="number"
                    min="1"
                    max={driver.seats || 20}
                    value={passengers}
                    onChange={(e) =>
                      setPassengers(e.target.value)
                    }
                    className="input pl-9"
                    required
                  />

                </div>

              </Field>

            </div>

            {/* ERROR */}

            {error && (
              <div className="mt-5 rounded-xl border border-black/15 bg-black/[0.03] px-4 py-3 text-xs">
                {error}
              </div>
            )}

            {/* SUBMIT */}

            <button
              type="submit"
              disabled={submitting}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-black px-5 py-3.5 text-xs font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitting
                ? "Confirming ride..."
                : "Confirm ride"}

              {!submitting && (
                <ArrowRight size={14} />
              )}
            </button>

            <p className="mt-3 text-center text-[9px] text-black/35">
              You can review your ride details before
              completing the booking.
            </p>

          </form>

          {/* ================= SUMMARY ================= */}

          <aside className="h-fit rounded-3xl border border-black/10 p-5 sm:p-6 lg:sticky lg:top-20">

            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-black/40">
              RIDE SUMMARY
            </p>

            <h2 className="mt-2 text-base font-semibold">
              Your local ride
            </h2>

            {/* DRIVER */}

            <div className="mt-5 flex items-center gap-3 border-b border-black/10 pb-5">

              <div className="h-11 w-11 overflow-hidden rounded-xl">
                <img
                  src={
                    driver.image ||
                    "/images/profile.jpg"
                  }
                  alt={driver.name}
                  className="h-full w-full object-cover"
                />
              </div>

              <div className="min-w-0">

                <p className="truncate text-xs font-semibold">
                  {driver.name}
                </p>

                <p className="mt-1 text-[10px] text-black/45">
                  {driver.vehicle ||
                    driver.vehicleType ||
                    "Local ride"}
                </p>

              </div>

            </div>

            {/* DETAILS */}

            <div className="space-y-4 py-5">

              <SummaryRow
                icon={<CalendarIcon />}
                label="Date"
                value={
                  date
                    ? formatDate(date)
                    : "Select a date"
                }
              />

              <SummaryRow
                icon={<Clock size={14} />}
                label="Time"
                value={time || "Select time"}
              />

              <SummaryRow
                icon={<MapPin size={14} />}
                label="Route"
                value={
                  pickup && destination
                    ? `${pickup} → ${destination}`
                    : "Add your route"
                }
              />

              <SummaryRow
                icon={<Users size={14} />}
                label="Passengers"
                value={`${passengerCount}`}
              />

            </div>

            {/* PRICE */}

            <div className="border-t border-black/10 pt-5">

              <div className="flex items-center justify-between">

                <span className="text-xs text-black/50">
                  Ride fare
                </span>

                <span className="text-base font-semibold">
                  ₹
                  {total.toLocaleString("en-IN")}
                </span>

              </div>

              <p className="mt-2 text-[9px] leading-4 text-black/35">
                Final fare may depend on the selected
                route and ride details.
              </p>

            </div>

            {/* TRUST */}

            <div className="mt-5 flex items-center gap-2 rounded-xl bg-black/[0.035] px-3 py-3">

              <ShieldCheck size={14} />

              <p className="text-[9px] leading-4 text-black/50">
                Vistara verified local driver
              </p>

            </div>

          </aside>

        </div>

      </section>

      <Footer />
    </main>
  );
}

/* =========================
   FIELD
========================= */

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">

      <span className="mb-2 block text-[10px] font-medium text-black/55">
        {label}
      </span>

      {children}

    </label>
  );
}

/* =========================
   SUMMARY ROW
========================= */

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
    <div className="flex gap-3">

      <div className="mt-0.5 shrink-0">
        {icon}
      </div>

      <div className="min-w-0">

        <p className="text-[9px] uppercase tracking-wide text-black/35">
          {label}
        </p>

        <p className="mt-1 truncate text-xs font-medium">
          {value}
        </p>

      </div>

    </div>
  );
}

/* =========================
   DATE ICON
========================= */

function CalendarIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="17"
        rx="2"
      />
      <path d="M16 2v4M8 2v4M3 10h18" />
    </svg>
  );
}

/* =========================
   FORMAT DATE
========================= */

function formatDate(value: string) {
  try {
    return new Date(
      `${value}T00:00:00`
    ).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch {
    return value;
  }
}

/* =========================
   HEADER
========================= */

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur">

      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-5 lg:px-8">

        <Link
          href="/"
          className="text-xl font-semibold tracking-tight"
        >
          Vistara
        </Link>

        <nav className="hidden items-center gap-7 text-xs md:flex">

          <Link
            href="/explore"
            className="text-black/50 hover:text-black"
          >
            Explore
          </Link>

          <Link
            href="/trips"
            className="text-black/50 hover:text-black"
          >
            Trips
          </Link>

          <Link
            href="/wishlist"
            className="text-black/50 hover:text-black"
          >
            Wishlist
          </Link>

          <Link
            href="/guides"
            className="text-black/50 hover:text-black"
          >
            Guides
          </Link>

          <Link
            href="/drivers"
            className="font-semibold"
          >
            Drivers
          </Link>

        </nav>

        <Link
          href="/explore"
          className="text-xs font-medium"
        >
          Explore
        </Link>

      </div>

    </header>
  );
}

/* =========================
   FOOTER
========================= */

function Footer() {
  return (
    <footer className="border-t border-black/10">

      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-7 sm:flex-row sm:items-center sm:justify-between lg:px-8">

        <div>

          <p className="text-sm font-semibold">
            Vistara
          </p>

          <p className="mt-1 text-[10px] text-black/40">
            Discover places. Meet locals. Travel differently.
          </p>

        </div>

        <div className="flex gap-5 text-[10px] text-black/45">

          <Link href="/explore">
            Explore
          </Link>

          <Link href="/trips">
            Trips
          </Link>

          <Link href="/guides">
            Guides
          </Link>

          <Link
            href="/drivers"
            className="text-black"
          >
            Drivers
          </Link>

        </div>

      </div>

    </footer>
  );
}