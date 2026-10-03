"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Link
            href="/support"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to support
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B77945]">
              CONTACT VISTARA
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-6xl">
              How can we help?
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
              Have a question about a booking, payment, stay, or your
              Vistara account? Send us a message and our support team
              will get back to you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT AREA */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">

          {/* FORM */}
          <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-7 shadow-[0_15px_50px_rgba(3,4,94,0.04)] md:p-9">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B77945]">
                SEND A MESSAGE
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#03045E]">
                Tell us what you need
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Please share a few details so we can understand your
                request and help you faster.
              </p>
            </div>

            {submitted ? (
              <div className="mt-8 rounded-2xl border border-[#DDE8DF] bg-[#F4F8F4] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-lg text-[#2F6B45]">
                  ✓
                </div>

                <h3 className="mt-5 text-lg font-semibold text-[#03045E]">
                  Message received
                </h3>

                <p className="mt-2 text-sm leading-6 text-[#64748B]">
                  Thank you for contacting Vistara. Our support team
                  will review your message and get back to you.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-5 text-sm font-semibold text-[#03045E] hover:underline"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div className="grid gap-5 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-sm font-semibold text-[#03045E]"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-2 w-full rounded-xl border border-[#DCE3EB] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/5"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-sm font-semibold text-[#03045E]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-2 w-full rounded-xl border border-[#DCE3EB] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/5"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-[#03045E]"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-xl border border-[#DCE3EB] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/5"
                  >
                    <option value="" disabled>
                      Select a topic
                    </option>
                    <option value="booking">Booking</option>
                    <option value="payment">Payment</option>
                    <option value="stay">Stay or property</option>
                    <option value="account">Account</option>
                    <option value="verification">Verification</option>
                    <option value="other">Something else</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="text-sm font-semibold text-[#03045E]"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    placeholder="Tell us how we can help..."
                    className="mt-2 w-full resize-none rounded-xl border border-[#DCE3EB] bg-white px-4 py-3 text-sm leading-6 text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#03045E] focus:ring-2 focus:ring-[#03045E]/5"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1] sm:w-auto"
                >
                  Send message →
                </button>
              </form>
            )}
          </div>

          {/* CONTACT INFO */}
          <aside className="space-y-5">
            <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B77945]">
                EMAIL SUPPORT
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold text-[#03045E]">
                Prefer email?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                You can also reach the Vistara support team directly
                through email.
              </p>

              <a
                href="mailto:support@vistara.com"
                className="mt-6 inline-flex rounded-xl border border-[#03045E] px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
              >
                support@vistara.com
              </a>
            </div>

            <div className="rounded-[28px] border border-[#E2E8F0] bg-[#F7F3EA] p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B77945]">
                BEFORE CONTACTING US
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold text-[#03045E]">
                Have your details ready
              </h2>

              <ul className="mt-5 space-y-3 text-sm leading-6 text-[#64748B]">
                <li>• Booking ID, if your question is about a reservation.</li>
                <li>• Email address linked to your Vistara account.</li>
                <li>• Payment or transaction details, if relevant.</li>
              </ul>
            </div>

            <div className="rounded-[28px] border border-[#E2E8F0] bg-white p-7">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B77945]">
                QUICK ANSWERS
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold text-[#03045E]">
                Looking for something else?
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                You may find the answer faster in our support centre.
              </p>

              <Link
                href="/support"
                className="mt-5 inline-flex text-sm font-semibold text-[#03045E] hover:underline"
              >
                Visit support centre →
              </Link>
            </div>
          </aside>
        </div>

        {/* COMMON QUESTIONS */}
        <section className="mt-16 border-t border-[#E2E8F0] pt-12">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B77945]">
              COMMON QUESTIONS
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#03045E]">
              Before you send a message
            </h2>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-3">
            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-semibold text-[#03045E]">
                Booking changes
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Need to change or cancel a reservation? Include your
                booking ID in your message.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-semibold text-[#03045E]">
                Payment questions
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                For payment issues, include the relevant transaction
                details so the team can investigate.
              </p>
            </div>

            <div className="rounded-2xl border border-[#E2E8F0] bg-white p-6">
              <h3 className="font-semibold text-[#03045E]">
                Host support
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Hosts can contact us about listings, verification,
                property information, or hosting questions.
              </p>
            </div>
          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}