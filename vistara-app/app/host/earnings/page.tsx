"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";

type EarningStatus = "Paid" | "Pending" | "Processing";

type Earning = {
  id: string;
  guest: string;
  property: string;
  date: string;
  amount: number;
  fee: number;
  payout: number;
  status: EarningStatus;
};

const earnings: Earning[] = [
  {
    id: "VST-1001",
    guest: "Aarav Sharma",
    property: "The Heritage Courtyard",
    date: "21 Oct 2026",
    amount: 13500,
    fee: 1350,
    payout: 12150,
    status: "Paid",
  },
  {
    id: "VST-1002",
    guest: "Riya Mehta",
    property: "Ganga Riverside Retreat",
    date: "27 Oct 2026",
    amount: 11400,
    fee: 1140,
    payout: 10260,
    status: "Pending",
  },
  {
    id: "VST-1003",
    guest: "Kabir Singh",
    property: "The Heritage Courtyard",
    date: "05 Nov 2026",
    amount: 18000,
    fee: 1800,
    payout: 16200,
    status: "Processing",
  },
  {
    id: "VST-1004",
    guest: "Ananya Verma",
    property: "Ganga Riverside Retreat",
    date: "11 Sep 2026",
    amount: 11400,
    fee: 1140,
    payout: 10260,
    status: "Paid",
  },
];

const formatCurrency = (value: number) =>
  `₹${value.toLocaleString("en-IN")}`;

export default function HostEarningsPage() {
  const [period, setPeriod] = useState("This month");
  const [search, setSearch] = useState("");

  const totalGross = earnings.reduce(
    (sum, earning) => sum + earning.amount,
    0
  );

  const totalFees = earnings.reduce(
    (sum, earning) => sum + earning.fee,
    0
  );

  const totalPayout = earnings.reduce(
    (sum, earning) => sum + earning.payout,
    0
  );

  const pendingAmount = earnings
    .filter(
      (earning) =>
        earning.status === "Pending" ||
        earning.status === "Processing"
    )
    .reduce((sum, earning) => sum + earning.payout, 0);

  const filteredEarnings = useMemo(() => {
    const query = search.toLowerCase().trim();

    if (!query) return earnings;

    return earnings.filter(
      (earning) =>
        earning.guest.toLowerCase().includes(query) ||
        earning.property.toLowerCase().includes(query) ||
        earning.id.toLowerCase().includes(query)
    );
  }, [search]);

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
                HOST FINANCE
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Earnings
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Track your hosting revenue, payouts and earnings
                from completed stays.
              </p>
            </div>

            <select
              value={period}
              onChange={(event) => setPeriod(event.target.value)}
              className="w-full rounded-xl border border-[#03045E]/10 bg-white px-4 py-3 text-sm outline-none focus:border-[#03045E] md:w-48"
            >
              <option>This month</option>
              <option>Last month</option>
              <option>Last 3 months</option>
              <option>This year</option>
            </select>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        {/* SUMMARY */}
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <EarningCard
            label="Total earnings"
            value={formatCurrency(totalGross)}
            detail="Gross booking revenue"
          />

          <EarningCard
            label="Platform fees"
            value={formatCurrency(totalFees)}
            detail="Service fees deducted"
          />

          <EarningCard
            label="Your payout"
            value={formatCurrency(totalPayout)}
            detail="After platform fees"
          />

          <EarningCard
            label="Pending"
            value={formatCurrency(pendingAmount)}
            detail="Upcoming payouts"
          />
        </div>

        {/* PAYOUT CARD */}
        <div className="mt-7 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.14)] md:p-8">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                AVAILABLE PAYOUT
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                {formatCurrency(totalPayout)}
              </h2>

              <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
                Your earnings are calculated from completed and
                eligible reservations after applicable platform fees.
              </p>
            </div>

            <Link
              href="/host/settings"
              className="w-fit rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
            >
              Payout settings
            </Link>
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="mt-7 grid gap-7 lg:grid-cols-[1fr_320px]">
          {/* TRANSACTIONS */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.04)] md:p-7">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  TRANSACTIONS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Earnings history
                </h2>
              </div>

              <div className="relative">
                <input
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search booking..."
                  className="w-full rounded-xl border border-[#03045E]/10 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#03045E] sm:w-56"
                />
              </div>
            </div>

            {/* MOBILE CARDS */}
            <div className="mt-6 space-y-4 md:hidden">
              {filteredEarnings.map((earning) => (
                <div
                  key={earning.id}
                  className="rounded-2xl border border-[#03045E]/10 p-5"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-sm font-semibold">
                        {earning.guest}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {earning.property}
                      </p>
                    </div>

                    <EarningStatus status={earning.status} />
                  </div>

                  <div className="mt-5 grid grid-cols-2 gap-4">
                    <MiniInfo
                      label="Booking"
                      value={earning.id}
                    />

                    <MiniInfo
                      label="Date"
                      value={earning.date}
                    />

                    <MiniInfo
                      label="Gross"
                      value={formatCurrency(earning.amount)}
                    />

                    <MiniInfo
                      label="Payout"
                      value={formatCurrency(earning.payout)}
                    />
                  </div>
                </div>
              ))}

              {filteredEarnings.length === 0 && (
                <EmptyState />
              )}
            </div>

            {/* DESKTOP TABLE */}
            <div className="mt-6 hidden overflow-x-auto md:block">
              <table className="w-full min-w-[720px] text-left">
                <thead>
                  <tr className="border-b border-[#03045E]/10 text-[10px] uppercase tracking-wider text-[#94A3B8]">
                    <th className="pb-4">Booking</th>
                    <th className="pb-4">Property</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4">Gross</th>
                    <th className="pb-4">Payout</th>
                    <th className="pb-4">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredEarnings.map((earning) => (
                    <tr
                      key={earning.id}
                      className="border-b border-[#03045E]/10 last:border-0"
                    >
                      <td className="py-5">
                        <p className="text-sm font-semibold">
                          {earning.guest}
                        </p>

                        <p className="mt-1 text-xs text-[#94A3B8]">
                          {earning.id}
                        </p>
                      </td>

                      <td className="py-5 text-sm text-[#64748B]">
                        {earning.property}
                      </td>

                      <td className="py-5 text-sm text-[#64748B]">
                        {earning.date}
                      </td>

                      <td className="py-5">
                        <p className="text-sm font-semibold">
                          {formatCurrency(earning.amount)}
                        </p>

                        <p className="mt-1 text-xs text-[#94A3B8]">
                          Fee {formatCurrency(earning.fee)}
                        </p>
                      </td>

                      <td className="py-5 text-sm font-semibold">
                        {formatCurrency(earning.payout)}
                      </td>

                      <td className="py-5">
                        <EarningStatus
                          status={earning.status}
                        />
                      </td>
                    </tr>
                  ))}

                  {filteredEarnings.length === 0 && (
                    <tr>
                      <td colSpan={6}>
                        <EmptyState />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <aside className="space-y-6">
            {/* BREAKDOWN */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                BREAKDOWN
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                {period}
              </h2>

              <div className="mt-6 space-y-5">
                <BreakdownRow
                  label="Booking revenue"
                  value={formatCurrency(totalGross)}
                  width="100%"
                />

                <BreakdownRow
                  label="Platform fees"
                  value={`-${formatCurrency(totalFees)}`}
                  width="35%"
                />

                <div className="border-t border-[#03045E]/10 pt-5">
                  <BreakdownRow
                    label="Net payout"
                    value={formatCurrency(totalPayout)}
                    width="65%"
                    strong
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT SETTINGS */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PAYOUT ACCOUNT
              </p>

              <div className="mt-5 flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#03045E]">
                  ₹
                </div>

                <div>
                  <p className="text-sm font-semibold">
                    Bank account
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    •••• •••• 4821
                  </p>
                </div>
              </div>

              <div className="mt-5 rounded-xl bg-[#ECFDF5] p-3">
                <p className="text-xs font-semibold text-emerald-700">
                  Payout account connected
                </p>
              </div>

              <Link
                href="/host/settings"
                className="mt-5 inline-flex text-sm font-semibold text-[#03045E] hover:underline"
              >
                Manage payout account →
              </Link>
            </div>

            {/* HELP */}
            <div className="rounded-[30px] bg-[#F7F3EA] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PAYOUT HELP
              </p>

              <h3 className="mt-3 font-serif text-xl font-semibold">
                Need help with a payout?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Check your payout details or contact support if a
                payment needs attention.
              </p>

              <Link
                href="/help"
                className="mt-5 inline-flex text-sm font-semibold text-[#03045E] hover:underline"
              >
                Visit help centre →
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------- */
/* EARNING CARD */
/* -------------------------------- */

function EarningCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
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

/* -------------------------------- */
/* STATUS */
/* -------------------------------- */

function EarningStatus({
  status,
}: {
  status: EarningStatus;
}) {
  const styles = {
    Paid: "bg-[#ECFDF5] text-emerald-700",
    Pending: "bg-[#FFF7E6] text-[#9A6700]",
    Processing: "bg-[#EEF2FF] text-[#0D21A1]",
  };

  return (
    <span
      className={`inline-flex rounded-full px-3 py-1.5 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* -------------------------------- */
/* BREAKDOWN */
/* -------------------------------- */

function BreakdownRow({
  label,
  value,
  width,
  strong = false,
}: {
  label: string;
  value: string;
  width: string;
  strong?: boolean;
}) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <span
          className={`text-sm ${
            strong
              ? "font-semibold text-[#03045E]"
              : "text-[#64748B]"
          }`}
        >
          {label}
        </span>

        <span
          className={`text-sm ${
            strong
              ? "font-semibold text-[#03045E]"
              : "font-medium"
          }`}
        >
          {value}
        </span>
      </div>

      <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#EEF2FF]">
        <div
          className="h-full rounded-full bg-[#03045E]"
          style={{ width }}
        />
      </div>
    </div>
  );
}

/* -------------------------------- */
/* MOBILE INFO */
/* -------------------------------- */

function MiniInfo({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-wider text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1 text-xs font-semibold text-[#03045E]">
        {value}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* EMPTY */
/* -------------------------------- */

function EmptyState() {
  return (
    <div className="py-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#EEF2FF] text-[#03045E]">
        ₹
      </div>

      <p className="mt-4 text-sm font-semibold">
        No earnings found
      </p>

      <p className="mt-1 text-xs text-[#94A3B8]">
        Try changing your search or selected period.
      </p>
    </div>
  );
}