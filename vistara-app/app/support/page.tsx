"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  Mail,
  MessageCircle,
  HelpCircle,
  ArrowRight,
  Search,
} from "lucide-react";

import Navbar from "@/components/navbar";

const faqs = [
  {
    question: "How do I make a booking?",
    answer:
      "Choose a stay, experience, guide, or driver, select your details, and continue to confirmation.",
  },
  {
    question: "Where can I see my bookings?",
    answer:
      "You can view your upcoming and completed bookings from your Trips or Booking section.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Cancellation depends on the booking's cancellation policy. Open your booking to see the available options.",
  },
  {
    question: "How does Vistara protect my information?",
    answer:
      "We use secure authentication and protect account information according to our privacy practices.",
  },
];

export default function SupportPage() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    `${faq.question} ${faq.answer}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const data = new FormData(form);

    const subject = String(data.get("subject") || "");
    const message = String(data.get("message") || "");

    const params = new URLSearchParams({
      subject,
      message,
    });

    window.location.href = `/contact?${params.toString()}`;
  }

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      <section className="mx-auto w-full max-w-5xl px-4 py-8 sm:px-6 lg:px-8">

        {/* HEADER */}
        <div className="max-w-2xl">
          <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-500">
            Vistara Support
          </p>

          <h1 className="mt-1.5 font-serif text-[27px] font-semibold tracking-tight sm:text-[30px]">
            How can we help?
          </h1>

          <p className="mt-2 max-w-xl text-[11px] leading-5 text-neutral-500">
            Find quick answers or contact our support team for help
            with your Vistara journey.
          </p>
        </div>

        {/* SEARCH */}
        <div className="mt-6 max-w-xl">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for help..."
              className="
                h-10
                w-full
                rounded-lg
                border
                border-neutral-200
                bg-white
                pl-9
                pr-3
                text-[11px]
                outline-none
                transition
                placeholder:text-neutral-400
                hover:border-neutral-300
                focus:border-black
                focus:ring-2
                focus:ring-black/[0.04]
              "
            />
          </div>
        </div>

        {/* SUPPORT OPTIONS */}
        <div className="mt-7 grid gap-3 sm:grid-cols-3">

          <Link
            href="/contact"
            className="
              group
              rounded-xl
              border
              border-neutral-200
              bg-white
              p-4
              transition
              hover:border-black
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white">
              <MessageCircle size={15} />
            </div>

            <h2 className="mt-3 text-[12px] font-semibold">
              Contact Support
            </h2>

            <p className="mt-1 text-[10px] leading-4 text-neutral-500">
              Send us a message about your issue.
            </p>

            <span className="mt-3 flex items-center gap-1 text-[10px] font-semibold">
              Contact us
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          <Link
            href="/trips"
            className="
              group
              rounded-xl
              border
              border-neutral-200
              bg-white
              p-4
              transition
              hover:border-black
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200">
              <HelpCircle size={15} />
            </div>

            <h2 className="mt-3 text-[12px] font-semibold">
              My Trips
            </h2>

            <p className="mt-1 text-[10px] leading-4 text-neutral-500">
              Check bookings and upcoming journeys.
            </p>

            <span className="mt-3 flex items-center gap-1 text-[10px] font-semibold">
              View trips
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </Link>

          <a
            href="mailto:support@vistara.com"
            className="
              group
              rounded-xl
              border
              border-neutral-200
              bg-white
              p-4
              transition
              hover:border-black
              hover:shadow-[0_8px_25px_rgba(0,0,0,0.04)]
            "
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-neutral-200">
              <Mail size={15} />
            </div>

            <h2 className="mt-3 text-[12px] font-semibold">
              Email Us
            </h2>

            <p className="mt-1 text-[10px] leading-4 text-neutral-500">
              Prefer email? Reach our support team directly.
            </p>

            <span className="mt-3 flex items-center gap-1 text-[10px] font-semibold">
              Send email
              <ArrowRight
                size={12}
                className="transition-transform group-hover:translate-x-0.5"
              />
            </span>
          </a>
        </div>

        {/* FAQ + CONTACT */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1.35fr_0.85fr]">

          {/* FAQ */}
          <section>
            <div className="mb-3">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
                Help centre
              </p>

              <h2 className="mt-1 text-[17px] font-semibold">
                Frequently asked questions
              </h2>
            </div>

            <div className="divide-y divide-neutral-200 rounded-xl border border-neutral-200">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((faq, index) => {
                  const isOpen = openFaq === index;

                  return (
                    <button
                      key={faq.question}
                      type="button"
                      onClick={() =>
                        setOpenFaq(isOpen ? null : index)
                      }
                      className="w-full px-4 py-3.5 text-left"
                    >
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-[11px] font-medium">
                          {faq.question}
                        </span>

                        <span className="text-[15px] text-neutral-400">
                          {isOpen ? "−" : "+"}
                        </span>
                      </div>

                      {isOpen && (
                        <p className="mt-2 max-w-xl text-[10px] leading-5 text-neutral-500">
                          {faq.answer}
                        </p>
                      )}
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-6 text-center text-[11px] text-neutral-500">
                  No help articles found.
                </div>
              )}
            </div>
          </section>

          {/* QUICK CONTACT */}
          <section className="h-fit rounded-xl border border-neutral-200 p-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-neutral-400">
              Still need help?
            </p>

            <h2 className="mt-1.5 text-[17px] font-semibold">
              Tell us what happened
            </h2>

            <p className="mt-1.5 text-[10px] leading-4 text-neutral-500">
              Give us a few details and our team can help you.
            </p>

            <form
              onSubmit={handleSubmit}
              className="mt-5 space-y-3"
            >
              <input
                name="subject"
                required
                placeholder="Subject"
                className="
                  h-9
                  w-full
                  rounded-lg
                  border
                  border-neutral-200
                  px-3
                  text-[10px]
                  outline-none
                  placeholder:text-neutral-400
                  focus:border-black
                "
              />

              <textarea
                name="message"
                required
                rows={4}
                placeholder="Describe your issue..."
                className="
                  w-full
                  resize-none
                  rounded-lg
                  border
                  border-neutral-200
                  px-3
                  py-2.5
                  text-[10px]
                  leading-4
                  outline-none
                  placeholder:text-neutral-400
                  focus:border-black
                "
              />

              <button
                type="submit"
                className="
                  flex
                  h-9
                  w-full
                  items-center
                  justify-center
                  gap-1.5
                  rounded-lg
                  bg-black
                  text-[10px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-neutral-800
                "
              >
                Contact support
                <ArrowRight size={13} />
              </button>
            </form>
          </section>
        </div>

        {/* FOOTER NOTE */}
        <div className="mt-8 border-t border-neutral-200 pt-5 text-center">
          <p className="text-[9px] text-neutral-400">
            Vistara Support · We're here to make your journey easier.
          </p>
        </div>
      </section>
    </main>
  );
}