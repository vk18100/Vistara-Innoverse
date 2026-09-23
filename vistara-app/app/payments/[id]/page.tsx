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

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-10">
          <Link
            href="/payments"
            className="text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            ← Back to payments
          </Link>

          <div className="mt-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                PAYMENT RECEIPT
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold">
                Payment details
              </h1>

              <p className="mt-2 text-sm text-[#64748B]">
                Transaction #{params.id || payment.id}
              </p>
            </div>

            <span className="w-fit rounded-full bg-[#ECFDF5] px-4 py-2 text-xs font-bold text-emerald-700">
              ✓ {payment.status}
            </span>
          </div>
        </div>
      </section>

      {/* RECEIPT */}
      <section className="mx-auto max-w-5xl px-6 py-10">

        <div className="overflow-hidden rounded-[32px] border border-[#03045E]/10 bg-white shadow-[0_20px_60px_rgba(3,4,94,0.07)]">

          {/* RECEIPT TOP */}
          <div className="border-b border-[#03045E]/10 p-7 md:p-10">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">

              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#03045E] font-serif text-lg font-bold text-white">
                    V
                  </div>

                  <span className="font-serif text-2xl font-semibold">
                    Vistara
                  </span>
                </div>

                <p className="mt-5 text-sm text-[#64748B]">
                  Payment successfully received
                </p>
              </div>

              <button className="rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
                Download receipt
              </button>
            </div>
          </div>

          {/* PAYMENT SUMMARY */}
          <div className="p-7 md:p-10">

            <div className="grid gap-4 sm:grid-cols-3">
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

            {/* PROPERTY */}
            <div className="mt-10 rounded-[24px] bg-[#F7F3EA] p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                BOOKING
              </p>

              <h2 className="mt-2 text-xl font-semibold">
                {payment.property}
              </h2>

              <p className="mt-1 text-sm text-[#64748B]">
                {payment.location}
              </p>

              <div className="mt-5 grid gap-4 border-t border-[#03045E]/10 pt-5 sm:grid-cols-2">
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

            {/* PRICE */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PAYMENT BREAKDOWN
              </p>

              <div className="mt-5 space-y-4 text-sm">
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

              <div className="my-6 h-px bg-[#03045E]/10" />

              <div className="flex items-center justify-between">
                <span className="text-base font-semibold">
                  Total paid
                </span>

                <span className="font-serif text-2xl font-semibold">
                  {payment.total}
                </span>
              </div>
            </div>

            {/* METHOD */}
            <div className="mt-10 rounded-[24px] border border-[#03045E]/10 p-6">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PAYMENT METHOD
              </p>

              <div className="mt-4 flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold">
                    UPI payment
                  </p>

                  <p className="mt-1 text-sm text-[#64748B]">
                    {payment.upi}
                  </p>
                </div>

                <span className="rounded-full bg-[#ECFDF5] px-3 py-1.5 text-xs font-bold text-emerald-700">
                  Paid
                </span>
              </div>
            </div>

            {/* TRANSACTION */}
            <div className="mt-10">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                TRANSACTION
              </p>

              <div className="mt-4 space-y-3 rounded-[24px] bg-[#FAFAF8] p-6 text-sm">
                <Row
                  label="Transaction ID"
                  value={payment.id}
                />

                <Row
                  label="Booking ID"
                  value={payment.bookingId}
                />

                <Row
                  label="Date"
                  value={payment.date}
                />

                <Row
                  label="Status"
                  value="Successfully completed"
                />
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-[#03045E]/10 bg-[#FAFAF8] p-7 text-center">
            <p className="text-xs leading-5 text-[#94A3B8]">
              This receipt confirms that the payment associated with
              this booking was successfully processed.
            </p>
          </div>
        </div>

        {/* ACTIONS */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Link
            href={`/bookings/${payment.bookingId}`}
            className="rounded-xl bg-[#03045E] px-6 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            View booking
          </Link>

          <Link
            href="/payments"
            className="rounded-xl border border-[#03045E]/20 bg-white px-6 py-3 text-center text-sm font-semibold text-[#03045E] transition hover:border-[#03045E]"
          >
            Back to payments
          </Link>
        </div>
      </section>
    </main>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Info({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold tracking-[0.15em] text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1.5 text-sm font-semibold text-[#03045E]">
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
    <div className="flex items-center justify-between">
      <span className="text-[#64748B]">
        {label}
      </span>

      <span className="font-medium">
        {value}
      </span>
    </div>
  );
}

function Row({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex flex-col gap-1 border-b border-[#E5E7EB] pb-3 last:border-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <span className="text-[#64748B]">
        {label}
      </span>

      <span className="font-medium text-[#03045E]">
        {value}
      </span>
    </div>
  );
}