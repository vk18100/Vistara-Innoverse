"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const payments = [
  {
    id: "PAY-2026-4821",
    bookingId: "VS-2026-1048",
    title: "A peaceful stay by the Ganges",
    date: "24 Sep 2026",
    method: "UPI",
    amount: "₹18,500",
    status: "Paid",
  },
  {
    id: "PAY-2026-3914",
    bookingId: "VS-2026-0981",
    title: "Sunrise boat ride & old city walk",
    date: "24 Sep 2026",
    method: "UPI",
    amount: "₹3,200",
    status: "Paid",
  },
  {
    id: "PAY-2026-2768",
    bookingId: "VS-2026-0714",
    title: "Heritage retreat in Jaipur",
    date: "10 Aug 2026",
    method: "Card",
    amount: "₹15,800",
    status: "Paid",
  },
];

const paymentMethods = [
  {
    type: "UPI",
    detail: "sristi@upi",
    default: true,
  },
  {
    type: "Visa",
    detail: "•••• 4821",
    default: false,
  },
];

export default function PaymentsPage() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Settings
          </Link>

          <div className="mt-9 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              PAYMENTS
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-5xl">
              Payments
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#64748B]">
              Manage your payment methods and keep track of payments
              made for your Vistara bookings.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_0.6fr]">

          {/* PAYMENT HISTORY */}
          <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)] md:p-9">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  TRANSACTIONS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Payment history
                </h2>
              </div>

              <button className="text-sm font-semibold text-[#0D21A1] hover:underline">
                Download history
              </button>
            </div>

            <div className="mt-7 space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-5 transition hover:border-[#03045E]/20"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#03045E]">
                        ₹
                      </div>

                      <div>
                        <h3 className="text-sm font-semibold text-[#03045E]">
                          {payment.title}
                        </h3>

                        <p className="mt-1 text-xs text-[#64748B]">
                          {payment.date} · {payment.method}
                        </p>

                        <p className="mt-1 text-xs text-[#94A3B8]">
                          {payment.id}
                        </p>
                      </div>
                    </div>

                    <div className="text-left sm:text-right">
                      <p className="text-base font-semibold text-[#03045E]">
                        {payment.amount}
                      </p>

                      <span className="mt-1 inline-block rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-bold text-emerald-700">
                        {payment.status}
                      </span>
                    </div>
                  </div>

                  <div className="mt-5 flex items-center justify-between border-t border-[#E5E7EB] pt-4">
                    <p className="text-xs text-[#94A3B8]">
                      Booking:{" "}
                      <span className="font-medium text-[#64748B]">
                        {payment.bookingId}
                      </span>
                    </p>

                    <Link
                      href={`/payments/${payment.id}`}
                      className="text-xs font-semibold text-[#0D21A1] hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="h-fit rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PAYMENT METHODS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Your methods
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#64748B]">
              Manage the payment methods available for future bookings.
            </p>

            <div className="mt-6 space-y-3">
              {paymentMethods.map((method) => (
                <div
                  key={method.detail}
                  className="rounded-2xl border border-[#E5E7EB] bg-[#FAFAF8] p-4"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#03045E] text-sm font-bold text-white">
                        {method.type === "UPI" ? "U" : "V"}
                      </div>

                      <div>
                        <p className="text-sm font-semibold">
                          {method.type}
                        </p>

                        <p className="text-xs text-[#64748B]">
                          {method.detail}
                        </p>
                      </div>
                    </div>

                    {method.default && (
                      <span className="rounded-full bg-[#EEF2FF] px-2.5 py-1 text-[10px] font-bold text-[#03045E]">
                        DEFAULT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-5 w-full rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white">
              + Add payment method
            </button>
          </div>
        </div>

        {/* PAYMENT SECURITY */}
        <div className="mt-6 rounded-[28px] border border-[#C6A15B]/25 bg-gradient-to-br from-[#F7F3EA] via-white to-[#EEF2FF] p-7 md:p-9">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PAYMENT SECURITY
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                Your payment information is protected
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
                Payment details are handled securely and are not displayed
                in full on your account.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#03045E] text-xl text-white">
              ✓
            </div>
          </div>
        </div>

        {/* SUPPORT */}
        <div className="mt-6 flex flex-col gap-5 rounded-[28px] border border-[#03045E]/10 bg-[#FAFAF8] p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <h2 className="text-lg font-semibold">
              Need help with a payment?
            </h2>

            <p className="mt-1 text-sm text-[#64748B]">
              Contact support if a payment looks incorrect or you need
              help with a refund.
            </p>
          </div>

          <Link
            href="/support"
            className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            Get help
          </Link>
        </div>
      </section>
    </main>
  );
}