"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import Navbar from "@/components/navbar";

const payment = {
  id: "PAY-2026-4821",
  bookingId: "VS-2026-1048",
  status: "Paid",
  date: "24 Sep 2026",
  method: "UPI",
  upi: "sristi@upi",

  property: "A peaceful stay by the Ganges",
  location: "Varanasi, Uttar Pradesh",
  checkIn: "18 Oct 2026",
  checkOut: "21 Oct 2026",

  stay: "₹15,600",
  serviceFee: "₹1,900",
  taxes: "₹1,000",
  total: "₹18,500",
};

export default function PaymentDetailsPage() {
  const params = useParams();

  const transactionId =
    typeof params.id === "string" ? params.id : payment.id;

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#29251F]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#29251F]/10 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
          <Link
            href="/settings/payments"
            className="inline-flex items-center text-sm font-medium text-[#756F65] transition hover:text-[#29251F]"
          >
            ← Back to payments
          </Link>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
                PAYMENT RECEIPT
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#29251F] sm:text-5xl">
                Payment details
              </h1>

              <p className="mt-2 text-sm text-[#756F65]">
                Transaction #{transactionId}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#F0F7F1] px-4 py-2 text-xs font-bold text-[#3F6B46]">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#3F6B46] text-[9px] text-white">
                ✓
              </span>
              {payment.status}
            </span>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        {/* RECEIPT */}
        <div className="overflow-hidden rounded-[32px] border border-[#29251F]/10 bg-white shadow-[0_20px_60px_rgba(41,37,31,0.06)]">

          {/* RECEIPT HEADER */}
          <div className="border-b border-[#29251F]/10 p-7 sm:p-9 md:p-10">
            <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#29251F] font-serif text-lg font-bold text-white">
                    V
                  </div>

                  <span className="font-serif text-2xl font-semibold text-[#29251F]">
                    Vistara
                  </span>
                </div>

                <p className="mt-5 text-sm text-[#756F65]">
                  Payment successfully received.
                </p>
              </div>

              <button
                type="button"
                className="w-fit rounded-xl border border-[#29251F]/20 px-5 py-3 text-sm font-semibold text-[#29251F] transition hover:border-[#C6A15B] hover:bg-[#F7F3EA]"
              >
                Download receipt
              </button>
            </div>
          </div>

          {/* RECEIPT BODY */}
          <div className="p-7 sm:p-9 md:p-10">

            {/* BASIC DETAILS */}
            <div className="grid gap-6 rounded-[24px] bg-[#F7F3EA] p-6 sm:grid-cols-3">
              <Info
                label="PAYMENT DATE"
                value={payment.date}
              />

              <Info
                label="PAYMENT METHOD"
                value={payment.method}
              />

              <Info
                label="BOOKING ID"
                value={payment.bookingId}
              />
            </div>

            {/* BOOKING */}
            <div className="mt-10">
              <SectionLabel>
                BOOKING
              </SectionLabel>

              <div className="mt-4 rounded-[24px] border border-[#29251F]/10 bg-[#FAFAF8] p-6">
                <h2 className="text-xl font-semibold text-[#29251F]">
                  {payment.property}
                </h2>

                <p className="mt-1 text-sm text-[#756F65]">
                  {payment.location}
                </p>

                <div className="mt-6 grid gap-5 border-t border-[#29251F]/10 pt-5 sm:grid-cols-2">
                  <Info
                    label="CHECK-IN"
                    value={payment.checkIn}
                  />

                  <Info
                    label="CHECK-OUT"
                    value={payment.checkOut}
                  />
                </div>
              </div>
            </div>

            {/* PAYMENT BREAKDOWN */}
            <div className="mt-10">
              <SectionLabel>
                PAYMENT BREAKDOWN
              </SectionLabel>

              <div className="mt-5 space-y-4">
                <PriceRow
                  label="Stay"
                  value={payment.stay}
                />

                <PriceRow
                  label="Service fee"
                  value={payment.serviceFee}
                />

                <PriceRow
                  label="Taxes"
                  value={payment.taxes}
                />
              </div>

              <div className="my-6 h-px bg-[#29251F]/10" />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold text-[#29251F]">
                  Total paid
                </span>

                <span className="font-serif text-2xl font-semibold text-[#29251F]">
                  {payment.total}
                </span>
              </div>
            </div>

            {/* PAYMENT METHOD */}
            <div className="mt-10">
              <SectionLabel>
                PAYMENT METHOD
              </SectionLabel>

              <div className="mt-4 flex flex-col gap-4 rounded-[24px] border border-[#29251F]/10 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F7F3EA] font-semibold text-[#29251F]">
                    U
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-[#29251F]">
                      UPI payment
                    </p>

                    <p className="mt-1 text-sm text-[#756F65]">
                      {payment.upi}
                    </p>
                  </div>
                </div>

                <span className="w-fit rounded-full bg-[#F0F7F1] px-3 py-1.5 text-xs font-bold text-[#3F6B46]">
                  PAID
                </span>
              </div>
            </div>

            {/* TRANSACTION */}
            <div className="mt-10">
              <SectionLabel>
                TRANSACTION
              </SectionLabel>

              <div className="mt-4 space-y-4 rounded-[24px] bg-[#FAFAF8] p-6">
                <Row
                  label="Transaction ID"
                  value={payment.id}
                />

                <Row
                  label="Booking ID"
                  value={payment.bookingId}
                />

                <Row
                  label="Payment date"
                  value={payment.date}
                />

                <Row
                  label="Payment method"
                  value={payment.method}
                />

                <Row
                  label="Status"
                  value="Successfully completed"
                  last
                />
              </div>
            </div>

            {/* CONFIRMATION */}
            <div className="mt-10 rounded-[24px] border border-[#C6A15B]/25 bg-[#F7F3EA] p-6">
              <div className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#C6A15B] text-sm font-bold text-white">
                  ✓
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-[#29251F]">
                    Payment confirmed
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-[#756F65]">
                    Your payment has been successfully processed and
                    recorded against this booking.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-[#29251F]/10 bg-[#FAFAF8] px-7 py-6 text-center sm:px-9">
            <p className="text-xs leading-5 text-[#9A948A]">
              This receipt confirms the payment associated with this
              Vistara booking.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/bookings/${payment.bookingId}`}
            className="rounded-xl bg-[#29251F] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#4A433A]"
          >
            View booking
          </Link>

          <Link
            href="/settings/payments"
            className="rounded-xl border border-[#29251F]/20 bg-white px-6 py-3 text-center text-sm font-semibold text-[#29251F] transition hover:border-[#C6A15B] hover:bg-[#F7F3EA]"
          >
            Back to payments
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C6A15B]">
      {children}
    </p>
  );
}

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.16em] text-[#9A948A]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-[#29251F]">
        {value}
      </p>
    </div>
  );
}

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-[#756F65]">
        {label}
      </span>

      <span className="font-medium text-[#29251F]">
        {value}
      </span>
    </div>
  );
}

function Row({
  label,
  value,
  last = false,
}: {
  label: string;
  value: string;
  last?: boolean;
}) {
  return (
    <div
      className={`flex flex-col gap-1 pb-4 sm:flex-row sm:items-center sm:justify-between ${
        !last ? "border-b border-[#E5E1D9]" : ""
      }`}
    >
      <span className="text-sm text-[#756F65]">
        {label}
      </span>

      <span className="text-sm font-medium text-[#29251F]">
        {value}
      </span>
    </div>
  );
}