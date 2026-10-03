"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";

const faqs = [
  {
    question: "How do I make a booking?",
    answer:
      "Choose a stay or experience you are interested in, select your preferred dates and continue with the booking process. Your booking details will be available from your account once the reservation is confirmed.",
  },
  {
    question: "Where can I see my bookings?",
    answer:
      "Your confirmed and upcoming bookings can be viewed from your account. Open your profile and select My Bookings to see your trip details.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation availability depends on the booking and its applicable cancellation terms. Open your booking details to review the available options before cancelling.",
  },
  {
    question: "How does payment work?",
    answer:
      "Payment information is shown during the booking process. Your final amount and applicable charges are displayed before you confirm the reservation.",
  },
  {
    question: "How can I change my account information?",
    answer:
      "You can update available personal information from your account settings. Changes made there will be reflected across your Vistara account.",
  },
  {
    question: "How do I save a place for later?",
    answer:
      "Use the wishlist option on a place or stay you like. Saved places can then be accessed from your Wishlist section.",
  },
  {
    question: "I found an issue on the website. What should I do?",
    answer:
      "If something is not working correctly, please contact the Vistara support team with a short description of the issue. Screenshots or relevant booking details can also help us understand the problem.",
  },
  {
    question: "How can I contact Vistara?",
    answer:
      "You can contact our support team directly by email. Include your name, registered email address and a clear description of your question so that we can assist you faster.",
  },
];

export default function HelpPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-[#FAF9F5] text-[#292722]">
      <Navbar />

      <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-8 sm:py-12 lg:px-10">

        {/* Back */}
        <Link
          href="/settings"
          className="inline-flex items-center gap-2 text-sm font-medium text-[#77736A] transition hover:text-[#292722]"
        >
          ← Back to settings
        </Link>

        {/* Header */}
        <div className="mt-9 max-w-3xl">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#A47B35]">
            SUPPORT
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#292722] sm:text-5xl">
            How can we help?
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-[#77736A] sm:text-base">
            Find answers to common questions about your Vistara account,
            bookings, payments and trips.
          </p>
        </div>

        {/* FAQ */}
        <section className="mt-10">
          <div className="mb-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#A47B35]">
              COMMON QUESTIONS
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#292722]">
              Frequently asked questions
            </h2>
          </div>

          <div className="overflow-hidden rounded-[26px] border border-[#292722]/10 bg-white">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <div
                  key={faq.question}
                  className="border-b border-[#292722]/10 last:border-b-0"
                >
                  <button
                    type="button"
                    onClick={() =>
                      setOpenIndex(isOpen ? null : index)
                    }
                    className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left transition hover:bg-[#FCFAF5] sm:px-6"
                  >
                    <span className="text-sm font-semibold text-[#292722] sm:text-base">
                      {faq.question}
                    </span>

                    <span
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F3EBDD] text-[#8A672E] transition-transform duration-200 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 sm:px-6 sm:pb-6">
                      <p className="max-w-3xl text-sm leading-7 text-[#77736A]">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-10">
          <div className="overflow-hidden rounded-[28px] bg-[#292722] p-7 text-white sm:p-9 lg:p-10">
            <div className="max-w-2xl">
              <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-[#D5B879]">
                NEED MORE HELP?
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold sm:text-4xl">
                Talk to our support team.
              </h2>

              <p className="mt-3 text-sm leading-7 text-white/65">
                Couldn't find the answer you were looking for? Send us an
                email and tell us what you need help with. Our team will get
                back to you.
              </p>

              {/* Email box */}
              <div className="mt-7 rounded-2xl border border-white/10 bg-white/5 p-4 sm:p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45">
                  EMAIL SUPPORT
                </p>

                <div className="mt-2 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <a
                    href="mailto:support@vistara.com"
                    className="break-all text-base font-semibold text-white transition hover:text-[#D5B879]"
                  >
                    support@vistara.com
                  </a>

                  <a
                    href="mailto:support@vistara.com?subject=Vistara%20Support%20Request"
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#292722] transition hover:bg-[#F3EBDD]"
                  >
                    Email us
                    <span>→</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Direct options */}
        <section className="mt-8 grid gap-4 sm:grid-cols-2">
          <Link
            href="/profile"
            className="group rounded-[22px] border border-[#292722]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:bg-[#FCFAF5]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A47B35]">
              ACCOUNT
            </p>

            <h3 className="mt-3 text-base font-semibold text-[#292722]">
              Manage your account
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#77736A]">
              Update your profile and account information.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-[#8A672E] transition group-hover:translate-x-1">
              Open profile →
            </span>
          </Link>

          <Link
            href="/trips"
            className="group rounded-[22px] border border-[#292722]/10 bg-white p-6 transition hover:-translate-y-0.5 hover:bg-[#FCFAF5]"
          >
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#A47B35]">
              YOUR JOURNEY
            </p>

            <h3 className="mt-3 text-base font-semibold text-[#292722]">
              View your trips
            </h3>

            <p className="mt-2 text-sm leading-6 text-[#77736A]">
              Continue planning and manage your saved journeys.
            </p>

            <span className="mt-4 inline-block text-sm font-semibold text-[#8A672E] transition group-hover:translate-x-1">
              View trips →
            </span>
          </Link>
        </section>

        {/* Footer note */}
        <div className="py-10 text-center">
          <p className="text-xs text-[#9A968E]">
            Vistara Support · We're here to help with your journey.
          </p>
        </div>
      </section>
    </main>
  );
}