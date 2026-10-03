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
    <main className="min-h-screen bg-[#FAFAF8] text-[#29231D]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#29231D]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#756D63] transition hover:text-[#29231D]"
          >
            ← Settings
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B28A45]">
              PAYMENTS
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#29231D] sm:text-5xl">
              Payments
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756D63] sm:text-base">
              Manage your payment methods and review payments made for
              your Vistara bookings.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[1.45fr_0.55fr]">

          {/* PAYMENT HISTORY */}
          <div className="rounded-[28px] border border-[#29231D]/10 bg-white p-6 shadow-[0_16px_45px_rgba(41,35,29,0.05)] sm:p-8">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B28A45]">
                  TRANSACTIONS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#29231D]">
                  Payment history
                </h2>

                <p className="mt-2 text-sm text-[#756D63]">
                  Your recent booking payments.
                </p>
              </div>

              <button
                type="button"
                className="w-fit text-sm font-semibold text-[#8A6935] transition hover:text-[#29231D] hover:underline"
              >
                Download history
              </button>
            </div>

            <div className="mt-7 space-y-4">
              {payments.map((payment) => (
                <div
                  key={payment.id}
                  className="
                    rounded-2xl
                    border border-[#E7E1D8]
                    bg-[#FAFAF8]
                    p-5
                    transition
                    hover:border-[#B28A45]/40
                    hover:bg-[#F7F3EA]
                  "
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                    {/* PAYMENT INFO */}
                    <div className="flex items-start gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F0E8D8] text-sm font-bold text-[#8A6935]">
                        ₹
                      </div>

                      <div className="min-w-0">
                        <h3 className="text-sm font-semibold text-[#29231D]">
                          {payment.title}
                        </h3>

                        <p className="mt-1 text-xs text-[#756D63]">
                          {payment.date} · {payment.method}
                        </p>

                        <p className="mt-1 text-xs text-[#A49B90]">
                          {payment.id}
                        </p>
                      </div>
                    </div>

                    {/* AMOUNT */}
                    <div className="text-left sm:text-right">
                      <p className="text-base font-semibold text-[#29231D]">
                        {payment.amount}
                      </p>

                      <span className="mt-1 inline-block rounded-full bg-[#EDF5ED] px-3 py-1 text-xs font-bold text-[#557A55]">
                        {payment.status}
                      </span>
                    </div>
                  </div>

                  {/* FOOTER */}
                  <div className="mt-5 flex flex-col gap-3 border-t border-[#E7E1D8] pt-4 sm:flex-row sm:items-center sm:justify-between">
                    <p className="text-xs text-[#A49B90]">
                      Booking:{" "}
                      <span className="font-medium text-[#756D63]">
                        {payment.bookingId}
                      </span>
                    </p>

                    <Link
                      href={`/settings/payments/${payment.id}`}
                      className="text-xs font-semibold text-[#8A6935] transition hover:text-[#29231D] hover:underline"
                    >
                      View details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PAYMENT METHODS */}
          <div className="h-fit rounded-[28px] border border-[#29231D]/10 bg-white p-6 shadow-[0_16px_45px_rgba(41,35,29,0.05)] sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B28A45]">
              PAYMENT METHODS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold text-[#29231D]">
              Your methods
            </h2>

            <p className="mt-2 text-sm leading-6 text-[#756D63]">
              Payment methods available for future bookings.
            </p>

            <div className="mt-6 space-y-3">
              {paymentMethods.length > 0 ? (
                paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="rounded-2xl border border-[#E7E1D8] bg-[#FAFAF8] p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#29231D] text-sm font-bold text-white">
                          {method.type === "UPI" ? "U" : "V"}
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#29231D]">
                            {method.type}
                          </p>

                          <p className="mt-1 text-xs text-[#756D63]">
                            {method.detail}
                          </p>
                        </div>
                      </div>

                      {method.isDefault && (
                        <span className="rounded-full bg-[#F0E8D8] px-2.5 py-1 text-[10px] font-bold text-[#8A6935]">
                          DEFAULT
                        </span>
                      )}
                    </div>

                    <div className="mt-4 flex items-center gap-4">
                      {!method.isDefault && (
                        <button
                          type="button"
                          onClick={() =>
                            setDefaultPaymentMethod(method.id)
                          }
                          className="text-xs font-semibold text-[#8A6935] hover:underline"
                        >
                          Make default
                        </button>
                      )}

                      <button
                        type="button"
                        onClick={() =>
                          removePaymentMethod(method.id)
                        }
                        className="text-xs font-semibold text-[#9B5C50] hover:underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="rounded-2xl border border-dashed border-[#D8D0C5] bg-[#FAFAF8] p-6 text-center">
                  <p className="text-sm font-semibold text-[#29231D]">
                    No payment methods
                  </p>

                  <p className="mt-1 text-xs text-[#756D63]">
                    Add a payment method when you are ready to book.
                  </p>
                </div>
              )}
            </div>

            <button
              type="button"
              className="
                mt-5 w-full rounded-xl
                border border-[#29231D]/20
                px-5 py-3
                text-sm font-semibold
                text-[#29231D]
                transition
                hover:border-[#B28A45]
                hover:bg-[#F7F3EA]
              "
            >
              + Add payment method
            </button>
          </div>
        </div>

        {/* SECURITY NOTE */}
        <div className="mt-6 rounded-[28px] border border-[#B28A45]/25 bg-[#F7F3EA] p-6 sm:p-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B28A45]">
                PAYMENT SECURITY
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold text-[#29231D]">
                Your payment details stay protected
              </h2>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D63]">
                Only limited payment information is displayed here.
                Full card details are never shown on your account.
              </p>
            </div>

            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-white text-lg font-semibold text-[#8A6935] shadow-sm">
              ✓
            </div>
          </div>
        </div>

        {/* BACK TO SETTINGS */}
        <div className="mt-6">
          <Link
            href="/settings"
            className="inline-flex rounded-xl border border-[#29231D]/15 bg-white px-5 py-3 text-sm font-semibold text-[#29231D] transition hover:border-[#B28A45] hover:bg-[#F7F3EA]"
          >
            ← Back to settings
          </Link>
        </div>
      </section>
    </main>
  );
}