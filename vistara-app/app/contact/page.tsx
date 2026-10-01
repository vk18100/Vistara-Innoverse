"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Link
            href="/"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to home
          </Link>

          <div className="mt-10 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#C6A15B]">
              GET IN TOUCH
            </p>

            <h1 className="mt-4 font-serif text-5xl font-semibold leading-tight text-[#03045E] md:text-6xl">
              We&apos;re here to help.
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
              Whether you have a question about a booking, a property,
              payments, or your Vistara journey, our team is here for you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* LEFT */}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
              CONTACT VISTARA
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold text-[#03045E]">
              Let&apos;s talk.
            </h2>

            <p className="mt-4 max-w-md text-sm leading-7 text-[#64748B]">
              Have something on your mind? Send us a message and the Vistara
              team will get back to you.
            </p>

            <div className="mt-9 space-y-4">
              {/* EMAIL */}
              <div className="rounded-2xl border border-[#03045E]/10 bg-[#FAFAF8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
                  EMAIL
                </p>

                <p className="mt-2 text-sm font-semibold text-[#03045E]">
                  hello@vistara.travel
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  We usually respond within 24 hours.
                </p>
              </div>

              {/* SUPPORT */}
              <div className="rounded-2xl border border-[#03045E]/10 bg-[#FAFAF8] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#94A3B8]">
                  SUPPORT
                </p>

                <p className="mt-2 text-sm font-semibold text-[#03045E]">
                  Booking &amp; travel assistance
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  Questions about your stay, payment, cancellation or
                  reservation.
                </p>
              </div>

              {/* LOCATION */}
              <div className="rounded-2xl border border-[#C6A15B]/20 bg-[#F7F3EA] p-5">
                <p className="text-xs font-bold uppercase tracking-[0.15em] text-[#C6A15B]">
                  VISTARA
                </p>

                <p className="mt-2 text-sm font-semibold text-[#03045E]">
                  Discover India differently.
                </p>

                <p className="mt-1 text-xs leading-5 text-[#64748B]">
                  From hidden stays to meaningful local experiences.
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_50px_rgba(3,4,94,0.07)] md:p-8">
            {submitted ? (
              <div className="flex min-h-[450px] flex-col items-center justify-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF5] text-2xl text-emerald-700">
                  ✓
                </div>

                <p className="mt-6 text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                  MESSAGE SENT
                </p>

                <h2 className="mt-3 font-serif text-3xl font-semibold text-[#03045E]">
                  Thank you for reaching out.
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-[#64748B]">
                  Your message has been received. Our team will get back to
                  you soon.
                </p>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-7 rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  SEND A MESSAGE
                </p>

                <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
                  How can we help?
                </h2>

                <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                  {/* NAME */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-semibold text-[#03045E]"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
                    />
                  </div>

                  {/* EMAIL */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-semibold text-[#03045E]"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
                    />
                  </div>

                  {/* SUBJECT */}
                  <div>
                    <label
                      htmlFor="subject"
                      className="mb-2 block text-sm font-semibold text-[#03045E]"
                    >
                      Subject
                    </label>

                    <select
                      id="subject"
                      name="subject"
                      required
                      className="w-full rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
                    >
                      <option value="">Select a topic</option>
                      <option value="booking">Booking assistance</option>
                      <option value="payment">Payment issue</option>
                      <option value="cancellation">Cancellation</option>
                      <option value="property">Property / hosting</option>
                      <option value="experience">Experience</option>
                      <option value="other">Something else</option>
                    </select>
                  </div>

                  {/* MESSAGE */}
                  <div>
                    <label
                      htmlFor="message"
                      className="mb-2 block text-sm font-semibold text-[#03045E]"
                    >
                      Message
                    </label>

                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      placeholder="Tell us how we can help..."
                      className="w-full resize-none rounded-xl border border-[#DDE2E8] bg-white px-4 py-3 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
                    />
                  </div>

                  {/* SUBMIT */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#03045E] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                  >
                    Send message
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      {/* FAQ CTA */}
      <section className="border-t border-[#03045E]/10 bg-[#03045E]">
        <div className="mx-auto max-w-7xl px-6 py-14 text-center lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
            NEED QUICK HELP?
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold text-white">
            Looking for an answer?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/65">
            You may find what you need in our support and help section.
          </p>

          <Link
            href="/help"
            className="mt-7 inline-flex rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#EEF4FF]"
          >
            Visit Help Center
          </Link>
        </div>
      </section>
    </main>
  );
}