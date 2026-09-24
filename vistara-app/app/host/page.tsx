"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

type HostStats = {
  properties: number;
  activeProperties: number;
  bookings: number;
  upcomingBookings: number;
  earnings: number;
};

type HostProperty = {
  id: string;
  name: string;
  location: string;
  type: string;
  status: "ACTIVE" | "INACTIVE" | "PENDING" | "REJECTED";
  image?: string | null;
};

type HostBooking = {
  id: string;
  guest: string;
  property: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
};

type HostDashboardData = {
  host: {
    id: string;
    name: string;
  };

  stats: HostStats;

  properties: HostProperty[];

  bookings: HostBooking[];

  verification: {
    status: "VERIFIED" | "PENDING" | "NOT_VERIFIED";
  };
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(date));
}

function getPropertyStatus(status: HostProperty["status"]) {
  switch (status) {
    case "ACTIVE":
      return {
        label: "Active",
        className: "bg-emerald-50 text-emerald-700",
      };

    case "PENDING":
      return {
        label: "Pending",
        className: "bg-amber-50 text-amber-700",
      };

    case "REJECTED":
      return {
        label: "Rejected",
        className: "bg-red-50 text-red-700",
      };

    default:
      return {
        label: "Inactive",
        className: "bg-slate-100 text-slate-600",
      };
  }
}

function getBookingStatus(status: HostBooking["status"]) {
  switch (status) {
    case "CONFIRMED":
      return {
        label: "Confirmed",
        className: "bg-emerald-50 text-emerald-700",
      };

    case "PENDING":
      return {
        label: "Pending",
        className: "bg-amber-50 text-amber-700",
      };

    case "CANCELLED":
      return {
        label: "Cancelled",
        className: "bg-red-50 text-red-700",
      };

    default:
      return {
        label: "Completed",
        className: "bg-slate-100 text-slate-600",
      };
  }
}

export default function HostPage() {
  const [data, setData] = useState<HostDashboardData | null>(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch("/api/host/dashboard", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("Unable to load host dashboard.");
        }

       const result = await response.json();

if (!result.success) {
  throw new Error(result.message || "Unable to load host dashboard.");
}

setData(result.data);
      } catch (error) {
        console.error("Host dashboard error:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Something went wrong."
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return <HostDashboardSkeleton />;
  }

  if (error) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
        <Navbar />

        <section className="mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-6">
          <div className="max-w-md rounded-[28px] border border-[#03045E]/10 bg-white p-8 text-center shadow-[0_12px_40px_rgba(3,4,94,0.06)]">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-red-50 text-red-600">
              !
            </div>

            <h1 className="mt-5 font-serif text-2xl font-semibold">
              Unable to load dashboard
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              {error}
            </p>

            <button
              onClick={() => window.location.reload()}
              className="mt-6 rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Try again
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!data) {
    return null;
  }

const verificationPending =
  data.verification?.status !== "VERIFIED";
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                VISTARA HOST
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Welcome back, {data.host.name}.
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Manage your properties, bookings and hosting activity
                from one place.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              + Add property
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* STATS */}
        <div className="grid gap-5 md:grid-cols-3">

          <StatCard
            label="Properties"
            value={String(data.stats.properties).padStart(2, "0")}
            detail={`${data.stats.activeProperties} active listings`}
          />

          <StatCard
            label="Bookings"
            value={String(data.stats.bookings).padStart(2, "0")}
            detail={`${data.stats.upcomingBookings} upcoming`}
          />

          <StatCard
            label="Earnings"
            value={formatCurrency(data.stats.earnings)}
            detail="This month"
          />

        </div>

        {/* MAIN GRID */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[1.5fr_0.7fr]">

          {/* PROPERTIES */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.05)]">

            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                  YOUR LISTINGS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Your properties
                </h2>
              </div>

              <Link
                href="/host/properties"
                className="text-sm font-semibold text-[#0D21A1] hover:underline"
              >
                View all
              </Link>
            </div>

            {data.properties.length === 0 ? (
              <EmptyProperties />
            ) : (
              <div className="mt-6 space-y-4">
                {data.properties.slice(0, 4).map((property) => {
                  const status = getPropertyStatus(property.status);

                  return (
                    <div
                      key={property.id}
                      className="flex flex-col gap-4 rounded-2xl border border-[#03045E]/10 p-4 transition hover:border-[#0D21A1]/30 sm:flex-row"
                    >

                      <div className="h-32 w-full overflow-hidden rounded-xl bg-[#EEF2FF] sm:w-40">
                        {property.image ? (
                          <img
                            src={property.image}
                            alt={property.name}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-sm text-[#64748B]">
                            No image
                          </div>
                        )}
                      </div>

                      <div className="flex flex-1 flex-col justify-between">

                        <div>
                          <span
                            className={`rounded-full px-3 py-1 text-[11px] font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>

                          <h3 className="mt-3 font-serif text-xl font-semibold">
                            {property.name}
                          </h3>

                          <p className="mt-1 text-sm text-[#64748B]">
                            {property.location} · {property.type}
                          </p>
                        </div>

                        <Link
                          href={`/host/properties/${property.id}`}
                          className="mt-4 text-sm font-semibold text-[#03045E]"
                        >
                          Manage property →
                        </Link>

                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-6">

            {/* VERIFICATION */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.16)]">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-white/60">
                VERIFICATION
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold">
                {verificationPending
                  ? "Complete your host verification."
                  : "Your host account is verified."}
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                {verificationPending
                  ? "Verify your identity and property before publishing a new listing on Vistara."
                  : "Your verification is complete and your account is ready for hosting."}
              </p>

              <Link
                href="/host/verification"
                className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                {verificationPending
                  ? "Continue verification"
                  : "View verification"}
              </Link>

            </div>

            {/* QUICK ACTIONS */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                QUICK ACTIONS
              </p>

              <div className="mt-5 space-y-2">

                <HostLink
                  href="/host/property/new"
                  title="Add a new property"
                  icon="+"
                />

                <HostLink
                  href="/host/properties"
                  title="Manage properties"
                  icon="⌂"
                />

                <HostLink
                  href="/host/bookings"
                  title="View bookings"
                  icon="◷"
                />

                <HostLink
                  href="/host/verification"
                  title="Verification"
                  icon="✓"
                />

              </div>
            </div>

          </div>
        </div>

        {/* BOOKINGS */}
        <div className="mt-8 rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

          <div className="flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                BOOKINGS
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Upcoming stays
              </h2>
            </div>

            <Link
              href="/host/bookings"
              className="text-sm font-semibold text-[#0D21A1] hover:underline"
            >
              View all
            </Link>
          </div>

          {data.bookings.length === 0 ? (
            <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-8 text-center">
              <p className="text-sm font-medium">
                No upcoming bookings
              </p>

              <p className="mt-1 text-sm text-[#64748B]">
                New reservations will appear here.
              </p>
            </div>
          ) : (
            <div className="mt-6 overflow-x-auto">

              <table className="w-full min-w-[700px] text-left">

                <thead>
                  <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-[#94A3B8]">
                    <th className="pb-4">Guest</th>
                    <th className="pb-4">Property</th>
                    <th className="pb-4">Dates</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {data.bookings.slice(0, 5).map((booking) => {
                    const status = getBookingStatus(
                      booking.status
                    );

                    return (
                      <tr
                        key={booking.id}
                        className="border-b border-gray-100 last:border-0"
                      >

                        <td className="py-5 text-sm font-semibold">
                          {booking.guest}
                        </td>

                        <td className="py-5 text-sm text-[#64748B]">
                          {booking.property}
                        </td>

                        <td className="py-5 text-sm text-[#64748B]">
                          {formatDate(booking.checkIn)} –{" "}
                          {formatDate(booking.checkOut)}
                        </td>

                        <td className="py-5 text-sm font-semibold">
                          {formatCurrency(booking.amount)}
                        </td>

                        <td className="py-5">
                          <span
                            className={`rounded-full px-3 py-1 text-xs font-semibold ${status.className}`}
                          >
                            {status.label}
                          </span>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>

              </table>

            </div>
          )}

        </div>

      </section>
    </main>
  );
}

/* ------------------------------------------------ */
/* STAT CARD */
/* ------------------------------------------------ */

function StatCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[26px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.05)]">

      <p className="text-sm font-medium text-[#64748B]">
        {label}
      </p>

      <p className="mt-3 font-serif text-3xl font-semibold">
        {value}
      </p>

      <p className="mt-2 text-xs text-[#94A3B8]">
        {detail}
      </p>

    </div>
  );
}

/* ------------------------------------------------ */
/* EMPTY PROPERTIES */
/* ------------------------------------------------ */

function EmptyProperties() {
  return (
    <div className="mt-6 rounded-2xl bg-[#FAFAF8] p-8 text-center">

      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#03045E]">
        +
      </div>

      <h3 className="mt-4 font-serif text-xl font-semibold">
        Add your first property
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#64748B]">
        Create your first Vistara listing and start receiving
        bookings.
      </p>

      <Link
        href="/host/property/new"
        className="mt-5 inline-flex rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]"
      >
        Add property
      </Link>

    </div>
  );
}

/* ------------------------------------------------ */
/* QUICK ACTION */
/* ------------------------------------------------ */

function HostLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl p-3 transition hover:bg-[#F7F3EA]"
    >
      <div className="flex items-center gap-3">

        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF2FF] text-[#03045E]">
          {icon}
        </span>

        <span className="text-sm font-medium">
          {title}
        </span>

      </div>

      <span className="text-[#94A3B8] transition group-hover:translate-x-1">
        →
      </span>

    </Link>
  );
}

/* ------------------------------------------------ */
/* LOADING */
/* ------------------------------------------------ */

function HostDashboardSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      <Navbar />

      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

          <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-12 w-80 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-4 w-96 max-w-full animate-pulse rounded bg-slate-100" />

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="grid gap-5 md:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-[26px] bg-white"
            />
          ))}
        </div>

        <div className="mt-8 grid gap-7 lg:grid-cols-[1.5fr_0.7fr]">

          <div className="h-[450px] animate-pulse rounded-[30px] bg-white" />

          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-[30px] bg-[#03045E]/10" />
            <div className="h-64 animate-pulse rounded-[30px] bg-white" />
          </div>

        </div>

      </section>
    </main>
  );
}