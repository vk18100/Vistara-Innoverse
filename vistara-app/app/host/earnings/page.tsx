"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowDownToLine,
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  IndianRupee,
  Wallet,
} from "lucide-react";
import Navbar from "@/components/navbar";

/**
 * Vistara Host — Earnings
 *
 * Visual system:
 * - No blue
 * - Warm ivory background
 * - Charcoal / black typography
 * - Gold #D9A441 as the signature accent
 *
 * API contract is intentionally kept at:
 * GET /api/host/earnings
 */

type EarningStatus = "PAID" | "PENDING" | "PROCESSING" | "FAILED";

type Earning = {
  id: number | string;
  bookingId?: number | string;
  guestName?: string;
  propertyName?: string;
  amount: number;
  status?: EarningStatus | string;
  date?: string;
};

type EarningsResponse = {
  success?: boolean;
  data?: Earning[];
  message?: string;
};

const GOLD = "#D9A441";
const GOLD_DARK = "#8A651B";
const IVORY = "#FAF8F3";
const INK = "#18181B";

const DEMO_EARNINGS: Earning[] = [
  {
    id: "demo-1",
    bookingId: "VS-1048",
    guestName: "Aarav Sharma",
    propertyName: "Dubai Skyline Residence",
    amount: 55500,
    status: "PAID",
    date: "2026-09-28",
  },
  {
    id: "demo-2",
    bookingId: "VS-1052",
    guestName: "Meera Kapoor",
    propertyName: "Vistara Beach House",
    amount: 27600,
    status: "PROCESSING",
    date: "2026-10-01",
  },
  {
    id: "demo-3",
    bookingId: "VS-1057",
    guestName: "Rohan Verma",
    propertyName: "The Heritage House",
    amount: 7200,
    status: "PENDING",
    date: "2026-10-02",
  },
  {
    id: "demo-4",
    bookingId: "VS-1039",
    guestName: "Ananya Singh",
    propertyName: "Green Valley Farm Stay",
    amount: 14400,
    status: "PAID",
    date: "2026-09-22",
  },
];

function formatMoney(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value) || 0);
}

function formatDate(value?: string) {
  if (!value) return "—";

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "—";

  return date.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function normalizeStatus(status?: string) {
  const value = status?.toUpperCase();

  if (value === "PAID") return "PAID";
  if (value === "PROCESSING") return "PROCESSING";
  if (value === "FAILED") return "FAILED";
  return "PENDING";
}

export default function HostEarningsPage() {
  const [earnings, setEarnings] = useState<Earning[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isDemo, setIsDemo] = useState(false);

  async function loadEarnings() {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/host/earnings", {
        method: "GET",
        cache: "no-store",
        credentials: "include",
      });

      const raw = await response.text();

      let result: EarningsResponse = {};

      try {
        result = raw ? JSON.parse(raw) : {};
      } catch {
        throw new Error("The earnings service returned an invalid response.");
      }

      if (!response.ok || result.success === false) {
        throw new Error(result.message || "Unable to load earnings.");
      }

      const liveEarnings = Array.isArray(result.data) ? result.data : [];

      if (liveEarnings.length > 0) {
        setEarnings(liveEarnings);
        setIsDemo(false);
      } else {
        // Demo data is only used for the prototype/demo state.
        setEarnings(DEMO_EARNINGS);
        setIsDemo(true);
      }
    } catch (err) {
      console.error("HOST_EARNINGS_ERROR:", err);

      // Keep the dashboard usable for a presentation while clearly marking
      // the fallback as demo data.
      setEarnings(DEMO_EARNINGS);
      setIsDemo(true);
      setError(
        err instanceof Error ? err.message : "Unable to load live earnings.",
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadEarnings();
  }, []);

  const totalEarnings = useMemo(
    () =>
      earnings.reduce(
        (total, earning) => total + Number(earning.amount || 0),
        0,
      ),
    [earnings],
  );

  const paidEarnings = useMemo(
    () =>
      earnings
        .filter((earning) => normalizeStatus(earning.status) === "PAID")
        .reduce(
          (total, earning) => total + Number(earning.amount || 0),
          0,
        ),
    [earnings],
  );

  const pendingEarnings = useMemo(
    () =>
      earnings
        .filter((earning) => {
          const status = normalizeStatus(earning.status);
          return status === "PENDING" || status === "PROCESSING";
        })
        .reduce(
          (total, earning) => total + Number(earning.amount || 0),
          0,
        ),
    [earnings],
  );

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      <Navbar />

      {/* Hero */}
      <section className="border-b border-black/8 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10 lg:py-14">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/25 bg-[#FFF8E8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#8A651B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                Host dashboard
              </div>

              <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Earnings
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-7 text-[#71717A] sm:text-base">
                Track booking income, completed payouts and earnings that are
                still being processed.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/host/bookings"
                className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-semibold text-[#292524] transition hover:border-[#D9A441]/40 hover:bg-[#FFF8E8]"
              >
                <CalendarDays size={17} />
                Bookings
              </Link>

              <Link
                href="/host/settings"
                className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] shadow-[0_10px_28px_rgba(217,164,65,0.22)] transition hover:bg-[#E7C46D]"
              >
                Payout settings
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {/* Demo / error state */}
        {isDemo && (
          <div className="mb-6 flex flex-col gap-2 rounded-2xl border border-[#D9A441]/25 bg-[#FFF8E8] px-4 py-3 text-sm text-[#765817] sm:flex-row sm:items-center sm:justify-between">
            <span>
              {error
                ? "Live earnings could not be loaded, so sample transaction data is being shown."
                : "Sample earnings are shown because this account has no recorded transactions yet."}
            </span>

            <button
              type="button"
              onClick={loadEarnings}
              className="font-bold underline underline-offset-4"
            >
              Refresh
            </button>
          </div>
        )}

        {/* Summary */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <SummaryCard
            icon={<Wallet size={20} />}
            label="Total earnings"
            value={formatMoney(totalEarnings)}
            description="All recorded booking income"
            loading={loading}
            featured
          />

          <SummaryCard
            icon={<CheckCircle2 size={20} />}
            label="Paid out"
            value={formatMoney(paidEarnings)}
            description="Completed payouts"
            loading={loading}
          />

          <SummaryCard
            icon={<Clock3 size={20} />}
            label="Pending"
            value={formatMoney(pendingEarnings)}
            description="Awaiting payout"
            loading={loading}
          />
        </div>

        {/* Payout information */}
        <section className="mt-7 rounded-[28px] border border-black/8 bg-white p-5 shadow-[0_12px_45px_rgba(24,24,27,0.04)] sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
                <IndianRupee size={21} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                  Payouts
                </p>
                <h2 className="mt-1 font-serif text-xl font-semibold">
                  Payout information
                </h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-[#71717A]">
                  Earnings are recorded against completed bookings. Payout
                  status is shown for each transaction below.
                </p>
              </div>
            </div>

            <Link
              href="/host/settings"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/10 px-4 py-2.5 text-sm font-semibold text-[#292524] transition hover:border-[#D9A441]/40 hover:bg-[#FFF8E8]"
            >
              Manage payout settings
              <ArrowRight size={15} />
            </Link>
          </div>
        </section>

        {/* Transactions */}
        <section className="mt-10">
          <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                Transactions
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold">
                Recent earnings
              </h2>
            </div>

            {!loading && earnings.length > 0 && (
              <span className="text-sm text-[#71717A]">
                {earnings.length} transaction
                {earnings.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {loading && <EarningsSkeleton />}

          {!loading && earnings.length === 0 && <EmptyEarnings />}

          {!loading && earnings.length > 0 && (
            <>
              {/* Desktop */}
              <div className="hidden overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_12px_45px_rgba(24,24,27,0.04)] md:block">
                <div className="grid grid-cols-[1.5fr_1.1fr_1fr_1fr] border-b border-black/7 bg-[#FAF8F3] px-6 py-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#78716C]">
                  <span>Booking</span>
                  <span>Date</span>
                  <span>Status</span>
                  <span className="text-right">Amount</span>
                </div>

                {earnings.map((earning) => (
                  <EarningRow key={earning.id} earning={earning} />
                ))}
              </div>

              {/* Mobile */}
              <div className="space-y-3 md:hidden">
                {earnings.map((earning) => (
                  <EarningMobileCard key={earning.id} earning={earning} />
                ))}
              </div>
            </>
          )}
        </section>

        {!loading && earnings.length > 0 && (
          <div className="mt-5 flex items-center gap-2 text-xs text-[#78716C]">
            <CalendarDays size={14} />
            <span>
              Earnings are calculated from the booking transactions recorded
              for this host account.
            </span>
          </div>
        )}
      </section>
    </main>
  );
}

function SummaryCard({
  icon,
  label,
  value,
  description,
  loading,
  featured = false,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  description: string;
  loading: boolean;
  featured?: boolean;
}) {
  return (
    <div
      className={`rounded-[26px] border bg-white p-5 shadow-[0_12px_40px_rgba(24,24,27,0.04)] transition hover:-translate-y-0.5 hover:shadow-[0_18px_50px_rgba(24,24,27,0.07)] sm:p-6 ${
        featured ? "border-[#D9A441]/35" : "border-black/8"
      }`}
    >
      <div className="flex items-center justify-between">
        <div
          className={`flex h-11 w-11 items-center justify-center rounded-2xl ${
            featured
              ? "bg-[#FFF8E8] text-[#9A711E]"
              : "bg-[#F5F4EF] text-[#44403C]"
          }`}
        >
          {icon}
        </div>

        {featured && (
          <span className="rounded-full bg-[#FFF8E8] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#9A711E]">
            Overview
          </span>
        )}
      </div>

      <p className="mt-6 text-xs font-semibold text-[#71717A]">{label}</p>

      {loading ? (
        <div className="mt-2 h-9 w-36 animate-pulse rounded-lg bg-[#F1F0EB]" />
      ) : (
        <p className="mt-1 truncate font-serif text-3xl font-semibold tracking-tight text-[#18181B]">
          {value}
        </p>
      )}

      <p className="mt-2 text-xs text-[#A8A29E]">{description}</p>
    </div>
  );
}

function EarningRow({ earning }: { earning: Earning }) {
  return (
    <div className="grid grid-cols-[1.5fr_1.1fr_1fr_1fr] items-center border-b border-black/6 px-6 py-5 last:border-0 transition hover:bg-[#FFFCF5]">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-[#292524]">
          {earning.propertyName || "Property booking"}
        </p>

        <p className="mt-1 truncate text-xs text-[#78716C]">
          {earning.guestName || "Guest booking"}
          {earning.bookingId ? ` · #${earning.bookingId}` : ""}
        </p>
      </div>

      <div className="text-sm text-[#57534E]">
        {formatDate(earning.date)}
      </div>

      <div>
        <StatusBadge status={earning.status} />
      </div>

      <div className="text-right text-sm font-bold text-[#18181B]">
        {formatMoney(earning.amount)}
      </div>
    </div>
  );
}

function EarningMobileCard({ earning }: { earning: Earning }) {
  return (
    <div className="rounded-[22px] border border-black/8 bg-white p-4 shadow-[0_8px_28px_rgba(24,24,27,0.03)]">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-semibold text-[#292524]">
            {earning.propertyName || "Property booking"}
          </p>

          <p className="mt-1 truncate text-xs text-[#78716C]">
            {earning.guestName || "Guest booking"}
            {earning.bookingId ? ` · #${earning.bookingId}` : ""}
          </p>
        </div>

        <p className="shrink-0 text-sm font-bold text-[#18181B]">
          {formatMoney(earning.amount)}
        </p>
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-black/6 pt-3">
        <div className="flex items-center gap-2 text-xs text-[#78716C]">
          <CalendarDays size={14} />
          {formatDate(earning.date)}
        </div>

        <StatusBadge status={earning.status} />
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status?: string }) {
  const normalized = normalizeStatus(status);

  if (normalized === "PAID") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F8EE] px-3 py-1.5 text-[11px] font-bold text-[#4E693E] ring-1 ring-[#6C8A54]/15">
        <CheckCircle2 size={13} />
        Paid
      </span>
    );
  }

  if (normalized === "PROCESSING") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E8] px-3 py-1.5 text-[11px] font-bold text-[#8A651B] ring-1 ring-[#D9A441]/20">
        <Clock3 size={13} />
        Processing
      </span>
    );
  }

  if (normalized === "FAILED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1EF] px-3 py-1.5 text-[11px] font-bold text-[#9B4439] ring-1 ring-[#9B4439]/15">
        Failed
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F4F3EF] px-3 py-1.5 text-[11px] font-bold text-[#57534E] ring-1 ring-black/8">
      <Clock3 size={13} />
      Pending
    </span>
  );
}

function EarningsSkeleton() {
  return (
    <div className="overflow-hidden rounded-[28px] border border-black/8 bg-white">
      {[1, 2, 3, 4].map((item) => (
        <div
          key={item}
          className="flex items-center gap-4 border-b border-black/6 px-5 py-5 last:border-0"
        >
          <div className="h-11 w-11 animate-pulse rounded-xl bg-[#F1F0EB]" />
          <div className="flex-1">
            <div className="h-4 w-40 animate-pulse rounded bg-[#F1F0EB]" />
            <div className="mt-2 h-3 w-28 animate-pulse rounded bg-[#F5F4EF]" />
          </div>
          <div className="h-5 w-20 animate-pulse rounded bg-[#F1F0EB]" />
        </div>
      ))}
    </div>
  );
}

function EmptyEarnings() {
  return (
    <div className="rounded-[28px] border border-dashed border-black/15 bg-white px-6 py-16 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
        <Wallet size={24} />
      </div>

      <h3 className="mt-5 font-serif text-2xl font-semibold">
        No earnings yet
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#71717A]">
        Once guests complete bookings for your properties, your earnings will
        appear here.
      </p>

      <Link
        href="/host/properties"
        className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D]"
      >
        Manage properties
        <ArrowRight size={16} />
      </Link>
    </div>
  );
}
