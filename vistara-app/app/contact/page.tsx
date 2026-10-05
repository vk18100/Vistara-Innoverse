"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setLoading(true);
    setError("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      subject: String(formData.get("subject") || ""),
      message: String(formData.get("message") || ""),
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result?.message || "Unable to send message.");
      }

      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 lg:px-8 lg:py-14">
          <Link
            href="/support"
            className="text-xs font-medium text-black/50 transition hover:text-black"
          >
            ← Back to support
          </Link>

          <div className="mt-8 max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">
              CONTACT VISTARA
            </p>

            <h1 className="mt-3 font-serif text-3xl font-semibold tracking-tight text-black md:text-5xl">
              How can we help?
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-black/60">
              Have a question about a booking, payment, stay, or your Vistara
              account? Send us a message and our support team will get back to
              you.
            </p>
          </div>
        </div>
      </section>

      {/* CONTACT AREA */}
      <section className="mx-auto max-w-6xl px-5 py-10 lg:px-8 lg:py-12">
        <div className="grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">

          {/* FORM */}
          <div className="rounded-2xl border border-black/10 bg-white p-5 md:p-7">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/50">
                SEND A MESSAGE
              </p>

              <h2 className="mt-2 text-xl font-semibold text-black">
                Tell us what you need
              </h2>

              <p className="mt-1.5 text-xs leading-5 text-black/55">
                Share a few details so we can understand your request and help
                you faster.
              </p>
            </div>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-black/10 bg-black/[0.02] p-5">
                <div className="flex h-9 w-9 items-center justify-center rounded-full border border-black bg-black text-sm text-white">
                  ✓
                </div>

                <h3 className="mt-4 text-base font-semibold text-black">
                  Message received
                </h3>

                <p className="mt-1.5 text-xs leading-5 text-black/55">
                  Thank you for contacting Vistara. Our support team will
                  review your message and get back to you.
                </p>

                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-4 text-xs font-semibold text-black underline underline-offset-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label
                      htmlFor="name"
                      className="text-xs font-semibold text-black"
                    >
                      Full name
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      placeholder="Your name"
                      className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs text-black outline-none placeholder:text-black/35 focus:border-black"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="text-xs font-semibold text-black"
                    >
                      Email address
                    </label>

                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                      className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs text-black outline-none placeholder:text-black/35 focus:border-black"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="text-xs font-semibold text-black"
                  >
                    What can we help with?
                  </label>

                  <select
                    id="subject"
                    name="subject"
                    required
                    defaultValue=""
                    className="mt-1.5 w-full rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs text-black outline-none focus:border-black"
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
                    className="text-xs font-semibold text-black"
                  >
                    Message
                  </label>

                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={5}
                    placeholder="Tell us how we can help..."
                    className="mt-1.5 w-full resize-none rounded-lg border border-black/15 bg-white px-3 py-2.5 text-xs leading-5 text-black outline-none placeholder:text-black/35 focus:border-black"
                  />
                </div>

                {error && (
                  <div className="rounded-lg border border-black/15 bg-black/[0.03] px-3 py-2.5 text-xs text-black">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-lg bg-black px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Sending..." : "Send message →"}
                </button>
              </form>
            )}
          </div>

          {/* SIDE INFO */}
          <aside className="space-y-4">

            {/* EMAIL */}
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                EMAIL SUPPORT
              </p>

              <h2 className="mt-2 text-lg font-semibold text-black">
                Prefer email?
              </h2>

              <p className="mt-2 text-xs leading-5 text-black/55">
                You can also reach the Vistara support team directly through
                email.
              </p>

              <a
                href="mailto:support@vistara.com"
                className="mt-4 inline-flex rounded-lg border border-black px-4 py-2 text-xs font-semibold text-black transition hover:bg-black hover:text-white"
              >
                support@vistara.com
              </a>
            </div>

            {/* DETAILS */}
            <div className="rounded-2xl border border-black/10 bg-black/[0.025] p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                BEFORE CONTACTING US
              </p>

              <h2 className="mt-2 text-lg font-semibold text-black">
                Have your details ready
              </h2>

              <ul className="mt-4 space-y-2 text-xs leading-5 text-black/60">
                <li>• Booking ID, if your question is about a reservation.</li>
                <li>• Email linked to your Vistara account.</li>
                <li>• Payment or transaction details, if relevant.</li>
              </ul>
            </div>

            {/* SUPPORT */}
            <div className="rounded-2xl border border-black/10 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                QUICK ANSWERS
              </p>

              <h2 className="mt-2 text-lg font-semibold text-black">
                Looking for something else?
              </h2>

              <p className="mt-2 text-xs leading-5 text-black/55">
                You may find the answer faster in our support centre.
              </p>

              <Link
                href="/support"
                className="mt-4 inline-flex text-xs font-semibold text-black underline underline-offset-4"
              >
                Visit support centre →
              </Link>
            </div>

          </aside>
        </div>

        {/* COMMON QUESTIONS */}
        <section className="mt-12 border-t border-black/10 pt-10">
          <div className="max-w-xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
              COMMON QUESTIONS
            </p>

            <h2 className="mt-2 text-2xl font-semibold tracking-tight text-black">
              Before you send a message
            </h2>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-xl border border-black/10 bg-white p-5">
              <h3 className="text-sm font-semibold text-black">
                Booking changes
              </h3>

              <p className="mt-2 text-xs leading-5 text-black/55">
                Need to change or cancel a reservation? Include your booking
                ID in your message.
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-5">
              <h3 className="text-sm font-semibold text-black">
                Payment questions
              </h3>

              <p className="mt-2 text-xs leading-5 text-black/55">
                For payment issues, include the relevant transaction details
                so the team can investigate.
              </p>
            </div>

            <div className="rounded-xl border border-black/10 bg-white p-5">
              <h3 className="text-sm font-semibold text-black">
                Host support
              </h3>

              <p className="mt-2 text-xs leading-5 text-black/55">
                Hosts can contact us about listings, verification, property
                information, or hosting questions.
              </p>
            </div>

          </div>
        </section>
      </section>

      <Footer />
    </main>
  );
}