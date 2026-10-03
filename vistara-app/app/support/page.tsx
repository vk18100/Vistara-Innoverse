"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Search,
  ChevronDown,
  MessageCircle,
  Mail,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

const faqs = [
  {
    question: "How can I manage my booking?",
    answer:
      "Open your Bookings page to view your reservation, dates, guests, payment details and available booking options.",
  },
  {
    question: "Can I cancel my booking?",
    answer:
      "Cancellation depends on the booking's applicable cancellation terms. Open your booking details to see whether cancellation is available.",
  },
  {
    question: "Where can I see my payment details?",
    answer:
      "You can review your payment and transaction information from your Payments section.",
  },
  {
    question: "I have an issue with my stay. What should I do?",
    answer:
      "Open your booking details first. If you still need assistance, contact Vistara Support and include your booking ID.",
  },
  {
    question: "How does property verification work?",
    answer:
      "Hosts submit the required property and identity information for review. Verification information helps guests understand which checks have been completed.",
  },
  {
    question: "How can I contact Vistara Support?",
    answer:
      "Use the Contact Support button below. For booking-related questions, keep your booking ID ready so our team can assist you more efficiently.",
  },
];

export default function SupportPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) => {
    const query = search.toLowerCase().trim();

    if (!query) return true;

    return (
      faq.question.toLowerCase().includes(query) ||
      faq.answer.toLowerCase().includes(query)
    );
  });

  return (
    <main className="min-h-screen bg-[#F8F6F2] text-[#29231F]">
      <Navbar />

      {/* =====================================================
          HERO
      ===================================================== */}
      <section className="border-b border-[#DED8CF] bg-[#F3EEE6]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B8834D]">
              VISTARA SUPPORT
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#29231F] md:text-6xl">
              How can we help?
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-[#6F665F]">
              Find answers about your bookings, payments, stays and
              account. If you still need help, our support team is here
              for you.
            </p>

            {/* SEARCH */}
            <div className="mx-auto mt-9 max-w-2xl">
              <div className="flex items-center gap-3 rounded-2xl border border-[#D8D0C6] bg-white px-5 py-4 shadow-[0_8px_30px_rgba(41,35,31,0.05)]">
                <Search
                  size={20}
                  className="shrink-0 text-[#81776E]"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Search help and answers..."
                  className="w-full bg-transparent text-sm text-[#29231F] outline-none placeholder:text-[#9A9189]"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-4xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="text-center">
            <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#B8834D]">
              HELP CENTER
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#29231F] md:text-4xl">
              Frequently asked questions
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-6 text-[#766D65]">
              Quick answers to common questions about your Vistara
              experience.
            </p>
          </div>

          <div className="mt-10 overflow-hidden rounded-[26px] border border-[#DED8CF] bg-[#FCFBF9]">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => {
                const isOpen = openFaq === index;

                return (
                  <div
                    key={faq.question}
                    className="border-b border-[#E5DFD7] last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="flex w-full items-center justify-between gap-6 px-6 py-6 text-left transition hover:bg-[#F8F5F0] md:px-7"
                    >
                      <span className="text-sm font-semibold text-[#29231F] md:text-base">
                        {faq.question}
                      </span>

                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F1ECE4]">
                        <ChevronDown
                          size={17}
                          className={`text-[#665D55] transition-transform duration-300 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </span>
                    </button>

                    {isOpen && (
                      <div className="px-6 pb-6 md:px-7">
                        <p className="max-w-3xl text-sm leading-7 text-[#766D65]">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="px-6 py-14 text-center">
                <p className="text-sm text-[#766D65]">
                  No answers found for your search.
                </p>

                <button
                  type="button"
                  onClick={() => setSearch("")}
                  className="mt-4 text-sm font-semibold text-[#29231F] underline underline-offset-4"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTACT SUPPORT
      ===================================================== */}
      <section className="border-t border-[#DED8CF] bg-[#F8F6F2]">
        <div className="mx-auto max-w-6xl px-6 py-16 lg:px-10 lg:py-20">
          <div className="overflow-hidden rounded-[32px] bg-[#29231F]">
            <div className="grid lg:grid-cols-[1.2fr_0.8fr]">
              {/* LEFT */}
              <div className="p-8 md:p-10 lg:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#D4A15F]">
                  CONTACT SUPPORT
                </p>

                <h2 className="mt-4 max-w-xl font-serif text-3xl font-semibold text-white md:text-4xl">
                  Didn&apos;t find what you were looking for?
                </h2>

                <p className="mt-5 max-w-xl text-sm leading-7 text-[#C9C0B8]">
                  Tell us what you need help with. Our support team can
                  assist you with bookings, payments, stays and other
                  Vistara-related questions.
                </p>

                <Link
                  href="/support/contact"
                  className="mt-8 inline-flex items-center gap-3 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-[#29231F] transition hover:bg-[#F3EEE6]"
                >
                  <MessageCircle size={18} />
                  Contact support
                  <ArrowRight size={16} />
                </Link>
              </div>

              {/* RIGHT */}
              <div className="border-t border-white/10 bg-[#342D28] p-8 lg:border-l lg:border-t-0 lg:p-10">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#D4A15F]">
                  BEFORE YOU CONTACT US
                </p>

                <div className="mt-7 space-y-6">
                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Mail
                        size={19}
                        className="text-[#D4A15F]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Keep your details ready
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[#BDB3AA]">
                        For booking questions, include your booking ID
                        and reservation details.
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <ShieldCheck
                        size={19}
                        className="text-[#D4A15F]"
                      />
                    </div>

                    <div>
                      <h3 className="text-sm font-semibold text-white">
                        Keep your account secure
                      </h3>

                      <p className="mt-1 text-sm leading-6 text-[#BDB3AA]">
                        Never share your password or verification codes
                        with anyone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}