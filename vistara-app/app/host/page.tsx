"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Navbar from "@/components/navbar";

/* -------------------------------------------------------------------------- */
/* Host Dashboard — Production UI                                             */
/* Palette: warm ivory + charcoal + Vistara gold. No blue.                    */
/* -------------------------------------------------------------------------- */

type PropertyStatus = "ACTIVE" | "INACTIVE" | "PENDING" | "REJECTED";
type BookingStatus = "CONFIRMED" | "PENDING" | "CANCELLED" | "COMPLETED";
type VerificationStatus = "VERIFIED" | "PENDING" | "NOT_VERIFIED";

type HostProperty = {
  id: string;
  name: string;
  location: string;
  type: string;
  status: PropertyStatus;
  image?: string | null;
  price?: number;
  rating?: number;
  reviews?: number;
};

type HostBooking = {
  id: string;
  guest: string;
  property: string;
  checkIn: string;
  checkOut: string;
  amount: number;
  status: BookingStatus;
};

type HostDashboardData = {
  host: {
    id: string;
    name: string;
  };
  stats: {
    properties: number;
    activeProperties: number;
    bookings: number;
    upcomingBookings: number;
    earnings: number;
  };
  properties: HostProperty[];
  bookings: HostBooking[];
  verification: {
    status: VerificationStatus;
  };
};

/* -------------------------------------------------------------------------- */
/* Demo listings — used only when the account has no live listings yet.       */
/* -------------------------------------------------------------------------- */

const DEMO_PROPERTIES: HostProperty[] = [
  {
    id: "demo-dubai",
    name: "Dubai Skyline Residence",
    location: "Downtown Dubai, UAE",
    type: "Luxury Apartment",
    status: "ACTIVE",
    image: "/images/dubai.jpg",
    price: 18500,
    rating: 4.9,
    reviews: 128,
  },
  {
    id: "demo-beach-house",
    name: "Vistara Beach House",
    location: "North Goa, India",
    type: "Beach House",
    status: "ACTIVE",
    image: "/images/beachhouse.jpg",
    price: 9200,
    rating: 4.8,
    reviews: 84,
  },
  {
    id: "demo-farm",
    name: "Green Valley Farm Stay",
    location: "Patna, Bihar",
    type: "Farm Stay",
    status: "PENDING",
    image: "/images/farm.jpg",
    price: 4800,
    rating: 4.7,
    reviews: 36,
  },
  {
    id: "demo-heritage",
    name: "The Heritage House",
    location: "Patna, Bihar",
    type: "Homestay",
    status: "ACTIVE",
    image: "/images/house.jpg",
    price: 3600,
    rating: 4.6,
    reviews: 52,
  },
];

const DEMO_BOOKINGS: HostBooking[] = [
  {
    id: "demo-booking-1",
    guest: "Aarav Sharma",
    property: "Dubai Skyline Residence",
    checkIn: "2026-10-09",
    checkOut: "2026-10-12",
    amount: 55500,
    status: "CONFIRMED",
  },
  {
    id: "demo-booking-2",
    guest: "Meera Kapoor",
    property: "Vistara Beach House",
    checkIn: "2026-10-15",
    checkOut: "2026-10-18",
    amount: 27600,
    status: "PENDING",
  },
  {
    id: "demo-booking-3",
    guest: "Rohan Verma",
    property: "The Heritage House",
    checkIn: "2026-10-21",
    checkOut: "2026-10-23",
    amount: 7200,
    status: "CONFIRMED",
  },
];

/* -------------------------------------------------------------------------- */
/* Helpers                                                                    */
/* -------------------------------------------------------------------------- */

const GOLD = "#D9A441";
const INK = "#171717";
const MUTED = "#6B7280";
const IVORY = "#FAF8F3";

const money = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));

function propertyStatus(status: PropertyStatus) {
  const styles: Record<
    PropertyStatus,
    { label: string; className: string; dot: string }
  > = {
    ACTIVE: {
      label: "Active",
      className: "bg-[#F4F8F1] text-[#49613A] ring-[#49613A]/15",
      dot: "bg-[#6C8A54]",
    },
    PENDING: {
      label: "Pending",
      className: "bg-[#FFF8E8] text-[#8A651B] ring-[#D9A441]/25",
      dot: "bg-[#D9A441]",
    },
    INACTIVE: {
      label: "Inactive",
      className: "bg-[#F3F3F1] text-[#66665F] ring-black/10",
      dot: "bg-[#999991]",
    },
    REJECTED: {
      label: "Rejected",
      className: "bg-[#FFF1EF] text-[#9B4439] ring-[#9B4439]/15",
      dot: "bg-[#C45B4E]",
    },
  };

  return styles[status];
}

function bookingStatus(status: BookingStatus) {
  const styles: Record<
    BookingStatus,
    { label: string; className: string; dot: string }
  > = {
    CONFIRMED: {
      label: "Confirmed",
      className: "bg-[#F4F8F1] text-[#49613A] ring-[#49613A]/15",
      dot: "bg-[#6C8A54]",
    },
    PENDING: {
      label: "Pending",
      className: "bg-[#FFF8E8] text-[#8A651B] ring-[#D9A441]/25",
      dot: "bg-[#D9A441]",
    },
    CANCELLED: {
      label: "Cancelled",
      className: "bg-[#FFF1EF] text-[#9B4439] ring-[#9B4439]/15",
      dot: "bg-[#C45B4E]",
    },
    COMPLETED: {
      label: "Completed",
      className: "bg-[#F3F3F1] text-[#66665F] ring-black/10",
      dot: "bg-[#999991]",
    },
  };

  return styles[status];
}

function applyDemoFallback(data: HostDashboardData) {
  const hasProperties = data.properties.length > 0;
  const hasBookings = data.bookings.length > 0;

  if (hasProperties && hasBookings) {
    return { data, demo: false };
  }

  return {
    demo: true,
    data: {
      ...data,
      stats: {
        ...data.stats,
        properties: hasProperties
          ? data.stats.properties
          : DEMO_PROPERTIES.length,
        activeProperties: hasProperties
          ? data.stats.activeProperties
          : DEMO_PROPERTIES.filter((p) => p.status === "ACTIVE").length,
        bookings: hasBookings ? data.stats.bookings : DEMO_BOOKINGS.length,
        upcomingBookings: hasBookings
          ? data.stats.upcomingBookings
          : DEMO_BOOKINGS.length,
        earnings: data.stats.earnings || 90400,
      },
      properties: hasProperties ? data.properties : DEMO_PROPERTIES,
      bookings: hasBookings ? data.bookings : DEMO_BOOKINGS,
    },
  };
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                      */
/* -------------------------------------------------------------------------- */

function Icon({
  name,
  size = 20,
}: {
  name:
    | "home"
    | "calendar"
    | "wallet"
    | "plus"
    | "arrow"
    | "check"
    | "shield"
    | "message"
    | "settings"
    | "trend"
    | "star"
    | "users"
    | "refresh";
  size?: number;
}) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "home":
      return (
        <svg {...common}>
          <path d="m3 10 9-7 9 7" />
          <path d="M5 9v11h14V9" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="17" rx="2" />
          <path d="M16 2v4M8 2v4M3 10h18" />
        </svg>
      );
    case "wallet":
      return (
        <svg {...common}>
          <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 1 4 16.5z" />
          <path d="M4 7h16M16 13h.01" />
        </svg>
      );
    case "plus":
      return (
        <svg {...common}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...common}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...common}>
          <path d="m5 12 4 4L19 6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3 20 6v5c0 5-3.3 8.4-8 10-4.7-1.6-8-5-8-10V6z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "message":
      return (
        <svg {...common}>
          <path d="M20 11.5a7.5 7.5 0 0 1-8 7.5 8.4 8.4 0 0 1-3.6-.8L4 20l1.4-3.7A7.3 7.3 0 0 1 4 11.5 7.5 7.5 0 0 1 12 4a7.5 7.5 0 0 1 8 7.5Z" />
        </svg>
      );
    case "settings":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-1.4 1.4-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-2v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L9 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H7v-2h.8a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L9 9l1.4-1.4.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6v-.2h2v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1L19.8 9l-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2v2H21a1.7 1.7 0 0 0-1.6 1Z" />
        </svg>
      );
    case "trend":
      return (
        <svg {...common}>
          <path d="m4 16 5-5 4 3 7-8" />
          <path d="M15 6h5v5" />
        </svg>
      );
    case "star":
      return (
        <svg {...common} fill="currentColor">
          <path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-2.9-5.6 2.9 1.1-6.2L3 9.6l6.2-.9z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
          <circle cx="9.5" cy="7" r="4" />
          <path d="M17 11a4 4 0 1 0 0-8M21 21v-2a4 4 0 0 0-3-3.9" />
        </svg>
      );
    case "refresh":
      return (
        <svg {...common}>
          <path d="M20 11a8 8 0 0 0-14.9-3L3 11" />
          <path d="M3 5v6h6M4 13a8 8 0 0 0 14.9 3L21 13" />
          <path d="M21 19v-6h-6" />
        </svg>
      );
  }
}

/* -------------------------------------------------------------------------- */
/* Page                                                                       */
/* -------------------------------------------------------------------------- */

export default function HostPage() {
  const [data, setData] = useState<HostDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [demoData, setDemoData] = useState(false);

  const loadDashboard = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/host/dashboard", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      const text = await response.text();

      let result: {
        success?: boolean;
        data?: HostDashboardData;
        message?: string;
      };

      try {
        result = text ? JSON.parse(text) : {};
      } catch {
        throw new Error("The dashboard returned an invalid response.");
      }

     if (!response.ok || !result.success || !result.data) {
  console.log("HOST DASHBOARD RESPONSE:", {
    status: response.status,
    result,
  });

  throw new Error(
    result.message || "Unable to load the host dashboard.",
  );
}

      const fallback = applyDemoFallback(result.data);

      setData(fallback.data);
      setDemoData(fallback.demo);
    } catch (err) {
      console.error("Host dashboard:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load the host dashboard.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadDashboard();
  }, [loadDashboard]);

  if (loading) return <HostDashboardSkeleton />;

  if (error) {
    return (
      <main className={`min-h-screen bg-[${IVORY}] text-[${INK}]`}>
        <Navbar />
        <section className="mx-auto flex min-h-[72vh] max-w-7xl items-center justify-center px-5 py-16">
          <div className="w-full max-w-md rounded-[28px] border border-black/10 bg-white p-8 text-center shadow-[0_20px_70px_rgba(0,0,0,0.08)]">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
              !
            </div>
            <p className="mt-5 text-[10px] font-bold uppercase tracking-[0.24em] text-[#9A711E]">
              Vistara Host
            </p>
            <h1 className="mt-2 font-serif text-2xl font-semibold">
              Dashboard unavailable
            </h1>
            <p className="mt-3 text-sm leading-6 text-[#6B7280]">{error}</p>
            <button
              type="button"
              onClick={loadDashboard}
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#171717] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#333]"
            >
              <Icon name="refresh" size={16} />
              Try again
            </button>
          </div>
        </section>
      </main>
    );
  }

  if (!data) return null;

  const activeProperties = data.properties.filter(
    (property) => property.status === "ACTIVE",
  );

  const ratedProperties = activeProperties.filter(
    (property) => typeof property.rating === "number",
  );

  const averageRating =
    ratedProperties.length > 0
      ? ratedProperties.reduce(
          (sum, property) => sum + (property.rating || 0),
          0,
        ) / ratedProperties.length
      : 0;

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#171717]">
      <Navbar />

      {/* ------------------------------------------------------------------ */}
      {/* Premium hero                                                       */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative overflow-hidden border-b border-black/10 bg-[#171717] text-white">
        <div className="absolute -right-28 -top-32 h-96 w-96 rounded-full bg-[#D9A441]/18 blur-3xl" />
        <div className="absolute -bottom-40 left-1/3 h-80 w-80 rounded-full bg-[#D9A441]/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-[#D9A441]/40" />

        <div className="relative mx-auto max-w-7xl px-5 py-11 sm:px-8 lg:px-10 lg:py-16">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/35 bg-[#D9A441]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#E7C46D]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                Host workspace
              </div>

              <h1 className="mt-5 max-w-3xl font-serif text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                Welcome back, {data.host.name}.
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-white/65 sm:text-base">
                A refined workspace to manage your properties, guests,
                reservations and hosting performance.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/host/calendar"
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white backdrop-blur transition hover:border-[#D9A441]/40 hover:bg-[#D9A441]/10"
              >
                <Icon name="calendar" size={17} />
                Calendar
              </Link>

              <Link
                href="/host/property/new"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#171717] shadow-[0_12px_35px_rgba(217,164,65,0.24)] transition hover:bg-[#E7C46D]"
              >
                <Icon name="plus" size={18} />
                Add property
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Demo notice */}
        {demoData && (
          <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-[#D9A441]/25 bg-[#FFF8E8] px-4 py-3 text-sm text-[#765817] sm:flex-row sm:items-center sm:justify-between">
            <span>
              Sample listings are displayed because this account has no live
              listing data yet.
            </span>
            <Link
              href="/host/property/new"
              className="font-bold underline underline-offset-4"
            >
              Create a live listing
            </Link>
          </div>
        )}

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <MetricCard
            icon="home"
            label="Properties"
            value={String(data.stats.properties).padStart(2, "0")}
            detail={`${data.stats.activeProperties} active listings`}
          />
          <MetricCard
            icon="calendar"
            label="Bookings"
            value={String(data.stats.bookings).padStart(2, "0")}
            detail={`${data.stats.upcomingBookings} upcoming stays`}
          />
          <MetricCard
            icon="wallet"
            label="This month"
            value={money(data.stats.earnings)}
            detail="Hosting earnings"
            gold
          />
          <MetricCard
            icon="trend"
            label="Guest rating"
            value={averageRating ? averageRating.toFixed(1) : "—"}
            suffix={averageRating ? " / 5" : ""}
            detail={averageRating ? "Across active listings" : "No ratings yet"}
          />
        </div>

        <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1.65fr)_360px]">
          {/* Properties */}
          <section className="rounded-[30px] border border-black/8 bg-white p-5 shadow-[0_14px_50px_rgba(23,23,23,0.05)] sm:p-7">
            <SectionHeading
              eyebrow="Your portfolio"
              title="Your properties"
              actionHref="/host/properties"
              actionLabel="View all"
            />

            {data.properties.length === 0 ? (
              <EmptyProperties />
            ) : (
              <div className="mt-6 grid gap-5 md:grid-cols-2">
                {data.properties.slice(0, 4).map((property) => (
                  <PropertyCard key={property.id} property={property} />
                ))}
              </div>
            )}
          </section>

          {/* Right rail */}
          <aside className="space-y-6">
            <VerificationCard status={data.verification?.status} />

            <section className="rounded-[30px] border border-black/8 bg-white p-6 shadow-[0_14px_50px_rgba(23,23,23,0.04)]">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
                Workspace
              </p>
              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Quick actions
              </h2>

              <div className="mt-5 space-y-1">
                <ActionLink
                  href="/host/property/new"
                  title="Add a new property"
                  icon="plus"
                />
                <ActionLink
                  href="/host/bookings"
                  title="Review bookings"
                  icon="calendar"
                />
                <ActionLink
                  href="/host/earnings"
                  title="View earnings"
                  icon="wallet"
                />
                <ActionLink
                  href="/host/messages"
                  title="Open messages"
                  icon="message"
                />
                <ActionLink
                  href="/host/verification"
                  title="Manage verification"
                  icon="shield"
                />
              </div>
            </section>
          </aside>
        </div>

        {/* Bookings */}
        <section className="mt-7 rounded-[30px] border border-black/8 bg-white p-5 shadow-[0_14px_50px_rgba(23,23,23,0.04)] sm:p-7">
          <SectionHeading
            eyebrow="Reservations"
            title="Upcoming stays"
            actionHref="/host/bookings"
            actionLabel="View all bookings"
          />

          {data.bookings.length === 0 ? (
            <EmptyBookings />
          ) : (
            <>
              <div className="mt-6 hidden overflow-hidden rounded-2xl border border-black/8 md:block">
                <table className="w-full text-left">
                  <thead className="bg-[#FAF8F3]">
                    <tr className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#8B8B83]">
                      <th className="px-5 py-4">Guest</th>
                      <th className="px-5 py-4">Property</th>
                      <th className="px-5 py-4">Stay</th>
                      <th className="px-5 py-4">Amount</th>
                      <th className="px-5 py-4">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.bookings.slice(0, 5).map((booking) => {
                      const status = bookingStatus(booking.status);

                      return (
                        <tr
                          key={booking.id}
                          className="border-t border-black/6 transition hover:bg-[#FAF8F3]"
                        >
                          <td className="px-5 py-5 text-sm font-semibold">
                            {booking.guest}
                          </td>
                          <td className="px-5 py-5 text-sm text-[#6B7280]">
                            {booking.property}
                          </td>
                          <td className="px-5 py-5 text-sm text-[#6B7280]">
                            {formatDate(booking.checkIn)} –{" "}
                            {formatDate(booking.checkOut)}
                          </td>
                          <td className="px-5 py-5 text-sm font-bold">
                            {money(booking.amount)}
                          </td>
                          <td className="px-5 py-5">
                            <StatusBadge {...status} />
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>

              <div className="mt-6 space-y-3 md:hidden">
                {data.bookings.slice(0, 5).map((booking) => {
                  const status = bookingStatus(booking.status);

                  return (
                    <div
                      key={booking.id}
                      className="rounded-2xl border border-black/8 p-4"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="font-semibold">{booking.guest}</p>
                          <p className="mt-1 text-xs text-[#6B7280]">
                            {booking.property}
                          </p>
                        </div>
                        <StatusBadge {...status} />
                      </div>

                      <div className="mt-4 flex items-end justify-between border-t border-black/6 pt-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#999991]">
                            Stay
                          </p>
                          <p className="mt-1 text-sm text-[#6B7280]">
                            {formatDate(booking.checkIn)} –{" "}
                            {formatDate(booking.checkOut)}
                          </p>
                        </div>
                        <p className="text-sm font-bold">
                          {money(booking.amount)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </section>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* UI components                                                              */
/* -------------------------------------------------------------------------- */

function MetricCard({
  icon,
  label,
  value,
  detail,
  suffix = "",
  gold = false,
}: {
  icon: "home" | "calendar" | "wallet" | "trend";
  label: string;
  value: string;
  detail: string;
  suffix?: string;
  gold?: boolean;
}) {
  return (
    <div
      className={`group rounded-[26px] border bg-white p-5 shadow-[0_12px_40px_rgba(23,23,23,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(23,23,23,0.08)] sm:p-6 ${
        gold ? "border-[#D9A441]/35" : "border-black/8"
      }`}
    >
      <div className="flex items-center justify-between">
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            gold ? "bg-[#FFF8E8] text-[#9A711E]" : "bg-[#F5F4EF] text-[#333]"
          }`}
        >
          <Icon name={icon} size={19} />
        </span>
        <span className="text-xs font-medium text-[#999991]">{label}</span>
      </div>

      <p className="mt-5 truncate font-serif text-3xl font-semibold tracking-tight">
        {value}
        {suffix && (
          <span className="text-base font-medium text-[#77776F]">{suffix}</span>
        )}
      </p>

      <p className="mt-2 text-xs text-[#77776F]">{detail}</p>
    </div>
  );
}

function SectionHeading({
  eyebrow,
  title,
  actionHref,
  actionLabel,
}: {
  eyebrow: string;
  title: string;
  actionHref: string;
  actionLabel: string;
}) {
  return (
    <div className="flex items-end justify-between gap-4">
      <div>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
          {eyebrow}
        </p>
        <h2 className="mt-2 font-serif text-2xl font-semibold">{title}</h2>
      </div>

      <Link
        href={actionHref}
        className="hidden items-center gap-1 text-sm font-bold text-[#9A711E] transition hover:text-[#171717] sm:inline-flex"
      >
        {actionLabel}
        <Icon name="arrow" size={15} />
      </Link>
    </div>
  );
}

function PropertyCard({ property }: { property: HostProperty }) {
  const status = propertyStatus(property.status);

  return (
    <article className="group overflow-hidden rounded-[22px] border border-black/8 bg-white transition duration-300 hover:-translate-y-1 hover:border-[#D9A441]/35 hover:shadow-[0_22px_55px_rgba(23,23,23,0.10)]">
      <div className="relative h-52 overflow-hidden bg-[#EEECE5]">
        <PropertyImage
          src={property.image}
          alt={property.name}
          fallbackSrc="/images/patna.jpg.jpg"
        />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between bg-gradient-to-b from-black/55 via-black/15 to-transparent p-4">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ring-1 ${status.className}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${status.dot}`} />
            {status.label}
          </span>

          {property.rating ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1.5 text-xs font-bold text-[#171717]">
              <Icon name="star" size={12} />
              {property.rating.toFixed(1)}
            </span>
          ) : null}
        </div>
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#999991]">
              {property.type}
            </p>
            <h3 className="mt-2 truncate font-serif text-xl font-semibold">
              {property.name}
            </h3>
            <p className="mt-1 truncate text-sm text-[#6B7280]">
              {property.location}
            </p>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-black/7 pt-4">
          <div>
            {property.price ? (
              <>
                <span className="font-semibold">{money(property.price)}</span>
                <span className="text-xs text-[#999991]"> / night</span>
              </>
            ) : (
              <span className="text-xs text-[#999991]">Pricing not set</span>
            )}
          </div>

          <Link
            href={`/host/properties/${property.id}`}
            className="inline-flex items-center gap-1 text-xs font-bold text-[#9A711E] transition hover:text-[#171717]"
          >
            Manage
            <Icon name="arrow" size={13} />
          </Link>
        </div>
      </div>
    </article>
  );
}

function PropertyImage({
  src,
  alt,
  fallbackSrc,
}: {
  src?: string | null;
  alt: string;
  fallbackSrc: string;
}) {
  const [currentSrc, setCurrentSrc] = useState(src || fallbackSrc);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setCurrentSrc(src || fallbackSrc);
    setFailed(false);
  }, [src, fallbackSrc]);

  if (failed) {
    return (
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden bg-[#171717]">
        <div className="absolute -right-10 -top-10 h-36 w-36 rounded-full bg-[#D9A441]/15" />
        <div className="absolute -bottom-10 -left-10 h-36 w-36 rounded-full bg-[#D9A441]/10" />
        <div className="relative text-center text-white">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-[#D9A441]/35 bg-[#D9A441]/10 text-[#E7C46D]">
            <Icon name="home" size={21} />
          </div>
          <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/55">
            Vistara Stay
          </p>
        </div>
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      sizes="(max-width: 768px) 100vw, 50vw"
      className="object-cover transition duration-700 group-hover:scale-[1.06]"
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setFailed(true);
        }
      }}
      priority={alt.toLowerCase().includes("dubai")}
    />
  );
}

function VerificationCard({
  status,
}: {
  status?: VerificationStatus;
}) {
  const verified = status === "VERIFIED";

  return (
    <section className="relative overflow-hidden rounded-[30px] bg-[#171717] p-7 text-white shadow-[0_20px_60px_rgba(23,23,23,0.16)]">
      <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[#D9A441]/15 blur-2xl" />

      <div className="relative">
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-white/50">
            Trust & safety
          </p>
          <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-[#D9A441]/25 bg-[#D9A441]/10 text-[#E7C46D]">
            <Icon name="shield" size={18} />
          </div>
        </div>

        <h2 className="mt-5 font-serif text-2xl font-semibold">
          {verified
            ? "Your account is verified"
            : "Complete your verification"}
        </h2>

        <p className="mt-3 text-sm leading-6 text-white/60">
          {verified
            ? "Your host verification is complete and your account is ready for hosting."
            : "Verify your identity and property details before publishing your next listing."}
        </p>

        <Link
          href="/host/verification"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-4 py-3 text-sm font-bold text-[#171717] transition hover:bg-[#E7C46D]"
        >
          {verified ? "View verification" : "Continue verification"}
          <Icon name="arrow" size={16} />
        </Link>
      </div>
    </section>
  );
}

function StatusBadge({
  label,
  className,
  dot,
}: {
  label: string;
  className: string;
  dot: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-1.5 text-[10px] font-bold ring-1 ${className}`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}

function ActionLink({
  href,
  title,
  icon,
}: {
  href: string;
  title: string;
  icon: "plus" | "calendar" | "wallet" | "message" | "shield";
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl px-3 py-3 transition hover:bg-[#FFF8E8]"
    >
      <span className="flex items-center gap-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5F4EF] text-[#444] transition group-hover:bg-[#FFF8E8] group-hover:text-[#9A711E]">
          <Icon name={icon} size={17} />
        </span>
        <span className="text-sm font-medium text-[#444]">{title}</span>
      </span>
      <span className="text-[#999991] transition group-hover:text-[#9A711E]">
        <Icon name="arrow" size={15} />
      </span>
    </Link>
  );
}

function EmptyProperties() {
  return (
    <div className="mt-6 rounded-2xl bg-[#FAF8F3] p-10 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
        <Icon name="plus" size={23} />
      </div>

      <h3 className="mt-5 font-serif text-xl font-semibold">
        Add your first property
      </h3>

      <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-[#6B7280]">
        Create your first Vistara listing with photos, pricing, rooms,
        amenities and house rules.
      </p>

      <Link
        href="/host/property/new"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#171717] transition hover:bg-[#E7C46D]"
      >
        <Icon name="plus" size={17} />
        Add property
      </Link>
    </div>
  );
}

function EmptyBookings() {
  return (
    <div className="mt-6 rounded-2xl bg-[#FAF8F3] p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
        <Icon name="calendar" size={21} />
      </div>
      <h3 className="mt-4 font-serif text-xl font-semibold">
        No upcoming bookings
      </h3>
      <p className="mt-1 text-sm text-[#6B7280]">
        New reservations will appear here.
      </p>
    </div>
  );
}

function HostDashboardSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <Navbar />

      <section className="border-b border-[#D9A441]/20 bg-[#171717]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-10">
          <div className="h-7 w-28 animate-pulse rounded-full bg-white/10" />
          <div className="mt-5 h-12 w-full max-w-xl animate-pulse rounded-xl bg-white/10" />
          <div className="mt-4 h-4 w-full max-w-2xl animate-pulse rounded bg-white/5" />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-[26px] bg-white"
            />
          ))}
        </div>

        <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1.65fr)_360px]">
          <div className="h-[620px] animate-pulse rounded-[30px] bg-white" />
          <div className="space-y-6">
            <div className="h-64 animate-pulse rounded-[30px] bg-[#171717]/10" />
            <div className="h-72 animate-pulse rounded-[30px] bg-white" />
          </div>
        </div>
      </section>
    </main>
  );
}
