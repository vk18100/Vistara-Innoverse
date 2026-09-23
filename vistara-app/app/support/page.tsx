"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";

const topics = [
  {
    icon: "✦",
    title: "Bookings",
    description: "Manage, modify or cancel a reservation.",
    href: "/bookings",
  },
  {
    icon: "₹",
    title: "Payments",
    description: "Payment, refund and transaction related help.",
    href: "/payments",
  },
  {
    icon: "⌂",
    title: "Stays",
    description: "Questions about your property or stay.",
    href: "/bookings",
  },
  {
    icon: "◇",
    title: "Experiences",
    description: "Get help with activities and experiences.",
    href: "/explore",
  },
];

const faqs = [
  {
    question: "How can I modify my booking?",
    answer:
      "Open your booking from My Bookings and select Manage booking to view the available options.",
  },
  {
    question: "How can I cancel a booking?",
    answer:
      "Open the relevant booking and select Cancel booking. Available cancellation options depend on the reservation.",
  },
  {
    question: "Where can I see my payments?",
    answer:
      "You can view your payment history and individual transaction details from the Payments section.",
  },
  {
    question: "How do I contact my host?",
    answer:
      "Open your booking details and use the Contact host option to reach the host.",
  },
  {
    question: "Where can I find my saved places?",
    answer:
      "Your saved stays, villas, restaurants and experiences are available in Wishlist.",
  },
];

export default function SupportPage() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
      <section className="relative overflow-hidden border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#C6A15B]/10 blur-3xl" />
        <div className="absolute -bottom-32 left-10 h-72 w-72 rounded-full bg-[#0D21A1]/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl px-6 py-16 lg:px-10 lg:py-20">
          <Link
            href="/settings"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Settings
          </Link>

          <div className="mx-auto mt-10 max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              VISTARA SUPPORT
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight md:text-6xl">
              How can we help?
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-[#64748B]">
              Find answers about your bookings, payments, stays and
              experiences.
            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-9 flex max-w-2xl items-center rounded-2xl border border-[#03045E]/10 bg-white p-2 shadow-[0_15px_50px_rgba(3,4,94,0.08)]">
              <span className="px-4 text-lg text-[#94A3B8]">
                ⌕
              </span>

              <input
                type="text"
                placeholder="Search for help..."
                className="min-w-0 flex-1 bg-transparent px-2 py-3 text-sm outline-none placeholder:text-[#94A3B8]"
              />

              <button className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]">
                Search
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C6A15B]">
            HELP CENTER
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold">
            What do you need help with?
          </h2>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {topics.map((topic) => (
            <Link
              key={topic.title}
              href={topic.href}
              className="group rounded-[26px] border border-[#03045E]/10 bg-white p-6 shadow-[0_10px_35px_rgba(3,4,94,0.04)] transition duration-300 hover:-translate-y-1 hover:border-[#03045E]/20 hover:shadow-[0_18px_45px_rgba(3,4,94,0.08)]"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EEF2FF] text-lg font-semibold text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
                {topic.icon}
              </div>

              <h3 className="mt-5 text-lg font-semibold">
                {topic.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                {topic.description}
              </p>

              <p className="mt-5 text-sm font-semibold text-[#0D21A1]">
                View help →
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="border-y border-[#03045E]/10 bg-[#FAFAF8]">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C6A15B]">
              COMMON QUESTIONS
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-9 space-y-3">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl border border-[#03045E]/10 bg-white"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-5 p-5 text-sm font-semibold">
                  {faq.question}

                  <span className="text-xl font-normal text-[#64748B] transition group-open:rotate-45">
                    +
                  </span>
                </summary>

                <div className="px-5 pb-5">
                  <p className="max-w-3xl text-sm leading-6 text-[#64748B]">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
        <div className="overflow-hidden rounded-[32px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-8 text-white md:p-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="max-w-xl">
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C6A15B]">
                STILL NEED HELP?
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
                Talk to the Vistara team.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/70">
                If you cannot find the answer, our support team can
                help you with your trip.
              </p>
            </div>

            <button className="w-fit shrink-0 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]">
              Contact support
            </button>
          </div>
        </div>
      </section>

      {/* SMALL FOOTER */}
      <div className="border-t border-[#03045E]/10 bg-white px-6 py-7 text-center">
        <p className="text-xs text-[#94A3B8]">
          Vistara Support · Here to make every journey easier.
        </p>
      </div>
    </main>
  );
}