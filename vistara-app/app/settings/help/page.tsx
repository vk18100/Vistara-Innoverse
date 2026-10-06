"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import {
  Search,
  ChevronDown,
  MessageCircle,
  BookOpen,
  ShieldCheck,
  CreditCard,
  CalendarDays,
  User,
} from "lucide-react";
import { useState } from "react";

const categories = [
  {
    title: "Bookings & trips",
    description: "Bookings, cancellations and trip information.",
    icon: CalendarDays,
  },
  {
    title: "Payments & refunds",
    description: "Payments, refunds and transaction questions.",
    icon: CreditCard,
  },
  {
    title: "Account & login",
    description: "Login, password and account issues.",
    icon: User,
  },
  {
    title: "Safety & verification",
    description: "Trust, verification and safety information.",
    icon: ShieldCheck,
  },
];

const faqs = [
  {
    question: "How do I make a booking?",
    answer:
      "Choose a stay, experience, local plan or ride, select the required details and continue through the booking flow.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation availability depends on the booking and its cancellation policy. Check your booking details for the applicable terms.",
  },
  {
    question: "Where can I find my bookings?",
    answer:
      "You can view your upcoming and previous bookings from your Trips & Bookings section.",
  },
  {
    question: "How do I reset my password?",
    answer:
      "Go to the Sign In page and select Forgot Password. Enter your registered email to receive reset instructions.",
  },
  {
    question: "How do payments and refunds work?",
    answer:
      "Payment and refund details depend on the service you booked. Your booking information will show the applicable payment and cancellation terms.",
  },
  {
    question: "How can I contact Vistara support?",
    answer:
      "If you cannot find an answer here, visit Support to send your issue directly to the Vistara support team.",
  },
];

export default function HelpPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto w-full max-w-5xl px-5 py-8 sm:px-6 sm:py-10 lg:px-8">

        {/* HEADER */}
        <div className="border-b border-black/10 pb-7">
          <div className="mb-4 flex items-center gap-2 text-[11px] font-medium text-black/45">
            <Link
              href="/settings"
              className="hover:text-black"
            >
              Settings
            </Link>

            <span>/</span>

            <span className="text-black">Help</span>
          </div>

          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
            VISTARA HELP CENTRE
          </p>

          <h1 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            How can we help?
          </h1>

          <p className="mt-2 max-w-xl text-xs font-medium leading-5 text-black/55 sm:text-sm">
            Find quick answers about bookings, payments, your account,
            trips and using Vistara.
          </p>

          {/* SEARCH */}
          <div className="relative mt-5 max-w-2xl">
            <Search
              size={16}
              strokeWidth={2}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-black/40"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="
                h-11
                w-full
                rounded-lg
                border
                border-black/15
                bg-white
                pl-10
                pr-4
                text-xs
                font-medium
                text-black
                outline-none
                placeholder:text-black/35
                focus:border-black
              "
            />
          </div>
        </div>

        {/* CATEGORIES */}
        <section className="py-7">
          <div className="mb-4">
            <h2 className="text-base font-bold">
              Browse by topic
            </h2>

            <p className="mt-1 text-xs font-medium text-black/50">
              Choose a category to find relevant information.
            </p>
          </div>

          <div className="grid grid-cols-1 overflow-hidden rounded-xl border border-black/10 sm:grid-cols-2">
            {categories.map((category, index) => {
              const Icon = category.icon;

              return (
                <Link
                  key={category.title}
                  href="/support"
                  className={`
                    group flex items-center gap-3 p-4
                    transition hover:bg-black/[0.025]
                    ${
                      index < 2
                        ? "border-b border-black/10 sm:border-b"
                        : ""
                    }
                    ${
                      index % 2 === 0
                        ? "sm:border-r sm:border-black/10"
                        : ""
                    }
                  `}
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10">
                    <Icon size={16} strokeWidth={2} />
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="text-xs font-bold">
                      {category.title}
                    </h3>

                    <p className="mt-0.5 text-[11px] font-medium leading-4 text-black/50">
                      {category.description}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* FAQ */}
        <section>
          <div className="mb-4">
            <h2 className="text-base font-bold">
              Frequently asked questions
            </h2>

            <p className="mt-1 text-xs font-medium text-black/50">
              Quick answers to common questions.
            </p>
          </div>

          <div className="overflow-hidden rounded-xl border border-black/10">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className={
                      index !== filteredFaqs.length - 1
                        ? "border-b border-black/10"
                        : ""
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-4 px-4 py-4 text-left transition hover:bg-black/[0.02] sm:px-5"
                    >
                      <span className="text-xs font-bold sm:text-sm">
                        {faq.question}
                      </span>

                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className={`shrink-0 transition-transform ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {isOpen && (
                      <div className="px-4 pb-4 sm:px-5">
                        <p className="max-w-3xl text-xs font-medium leading-5 text-black/55">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-5 py-8 text-center">
                <p className="text-xs font-bold">
                  No results found
                </p>

                <p className="mt-1 text-[11px] text-black/45">
                  Try searching with different words.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* SUPPORT */}
        <section className="mt-7 border-t border-black/10 pt-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10">
                <MessageCircle size={16} strokeWidth={2} />
              </div>

              <div>
                <h2 className="text-xs font-bold sm:text-sm">
                  Still need help?
                </h2>

                <p className="mt-1 text-[11px] font-medium text-black/50">
                  Contact Vistara support for help with your issue.
                </p>
              </div>
            </div>

            <Link
              href="/support"
              className="
                inline-flex
                items-center
                justify-center
                rounded-lg
                bg-black
                px-4
                py-2.5
                text-xs
                font-bold
                text-white
                transition
                hover:bg-black/80
              "
            >
              Contact Support
            </Link>
          </div>
        </section>

        {/* FOOTER NOTE */}
        <div className="mt-7 border-t border-black/10 pt-5">
          <div className="flex items-center gap-2 text-[11px] font-medium text-black/40">
            <BookOpen size={14} />
            <span>Vistara Help Centre</span>
          </div>
        </div>
      </section>
    </main>
  );
}