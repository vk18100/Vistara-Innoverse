"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

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

const initialPaymentMethods = [
  {
    id: 1,
    type: "UPI",
    detail: "sristi@upi",
    isDefault: true,
  },
  {
    id: 2,
    type: "Visa",
    detail: "•••• 4821",
    isDefault: false,
  },
];

export default function PaymentsPage() {
  const [paymentMethods, setPaymentMethods] = useState(
    initialPaymentMethods
  );

  function removePaymentMethod(id: number) {
    setPaymentMethods((current) =>
      current.filter((method) => method.id !== id)
    );
  }

  function setDefaultPaymentMethod(id: number) {
    setPaymentMethods((current) =>
      current.map((method) => ({
        ...method,
        isDefault: method.id === id,
      }))
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">
          <Link
            href="/settings"
            className="text-xs font-semibold text-gray-500 transition hover:text-black"
          >
            ← Settings
          </Link>

          <div className="mt-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
              Payments
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Payments
            </h1>

            <p className="mt-2 max-w-xl text-sm font-medium leading-5 text-gray-500">
              Manage your payment methods and review payments made
              for your Vistara bookings.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-6 sm:py-8 lg:px-8">
        <div className="grid gap-5 lg:grid-cols-[1.5fr_0.7fr]">

          {/* PAYMENT HISTORY */}
          <div className="rounded-2xl border border-black/10 bg-white">
            <div className="border-b border-black/10 px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                Transactions
              </p>

              <div className="mt-1 flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-bold text-black">
                    Payment history
                  </h2>

                  <p className="mt-1 text-xs font-medium text-gray-500">
                    Your recent booking payments.
                  </p>
                </div>

                <button
                  type="button"
                  className="text-xs font-bold text-black underline-offset-4 hover:underline"
                >
                  Download
                </button>
              </div>
            </div>

            <div className="divide-y divide-black/10">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="px-5 py-4 transition hover:bg-gray-50"
                >
                  <div className="flex items-start justify-between gap-4">

                    {/* INFO */}
                    <div className="flex min-w-0 items-start gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-black text-xs font-bold text-white">
                        ₹
                      </div>

                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold text-black">
                          {payment.title}
                        </h3>

                        <p className="mt-1 text-xs font-medium text-gray-500">
                          {payment.date} · {payment.method}
                        </p>

                        <p className="mt-1 text-[10px] font-medium text-gray-400">
                          {payment.id}
                        </p>
                      </div>
                    </div>

                    {/* AMOUNT */}
                    <div className="shrink-0 text-right">
                      <p className="text-sm font-bold text-black">
                        {payment.amount}
                      </p>

                      <span className="mt-1 inline-block rounded-full border border-black/10 px-2 py-0.5 text-[10px] font-bold text-black">
                        {payment.status}
                      </span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-3 flex items-center justify-between border-t border-black/10 pt-3">
                    <p className="text-[10px] font-medium text-gray-400">
                      Booking{" "}
                      <span className="font-bold text-gray-600">
                        {payment.bookingId}
                      </span>
                    </p>

                    <Link
                      href={`/settings/payments/${payment.id}`}
                      className="text-[11px] font-bold text-black underline-offset-4 hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="h-fit rounded-2xl border border-black/10 bg-white">
            <div className="border-b border-black/10 px-5 py-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                Payment methods
              </p>

              <h2 className="mt-1 text-lg font-bold text-black">
                Your methods
              </h2>

              <p className="mt-1 text-xs font-medium leading-5 text-gray-500">
                Methods available for future bookings.
              </p>
            </div>

            <div className="space-y-3 p-5">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="rounded-xl border border-black/10 p-3"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-[10px] font-bold text-white">
                          {method.type === "UPI" ? "U" : "V"}
                        </div>

                        <div>
                          <p className="text-xs font-bold text-black">
                            {method.type}
                          </p>

                          <p className="mt-0.5 text-[11px] font-medium text-gray-500">
                            {method.detail}
                          </p>
                        </div>
                      </div>

                      {method.isDefault && (
                        <span className="rounded-full border border-black px-2 py-0.5 text-[9px] font-bold text-black">
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <div className="mt-3 flex items-center gap-4">
                      {!method.isDefault && (
                        <button
                          type="button"
                          onClick={() =>
                            setDefaultPaymentMethod(method.id)
                          }
                          className="text-[11px] font-bold text-black underline-offset-4 hover:underline"
                        >
                          Make default
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removePaymentMethod(method.id)
                        }
                        className="text-[11px] font-bold text-gray-500 underline-offset-4 hover:text-black hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-xl border border-dashed border-black/20 p-5 text-center">
                  <p className="text-xs font-bold text-black">
                    No payment methods
                  </p>

                  <p className="mt-1 text-[11px] font-medium text-gray-500">
                    Add a payment method when you are ready to book.
                  </p>
                </div>
              )}

              <button
                type="button"
                className="w-full rounded-xl border border-black px-4 py-2.5 text-xs font-bold text-black transition hover:bg-black hover:text-white"
              >
                + Add payment method
              </button>
            </div>
          </div>
        </div>

        {/* SECURITY */}
        <div className="mt-5 rounded-2xl border border-black/10 bg-gray-50 px-5 py-5">
          <div className="flex items-center gap-4">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-black text-xs font-bold text-white">
              ✓
            </div>

            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-gray-500">
                Payment security
              </p>

              <h2 className="mt-1 text-sm font-bold text-black">
                Your payment details stay protected
              </h2>

              <p className="mt-1 text-xs font-medium leading-5 text-gray-500">
                Only limited payment information is displayed.
                Full card details are never shown on your account.
              </p>
            </div>
          </div>
        </div>

        {/* BACK */}
        <div className="mt-5">
          <Link
            href="/settings"
            className="inline-flex rounded-lg border border-black/15 px-4 py-2.5 text-xs font-bold text-black transition hover:bg-black hover:text-white"
          >
            ← Back to settings
          </Link>
        </div>
      </section>
    </main>
  );
}