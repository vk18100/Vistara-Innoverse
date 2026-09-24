"use client";

import Link from "next/link";
import { useState } from "react";
import Navbar from "@/components/navbar";

type VerificationStatus =
  | "Verified"
  | "In review"
  | "Required";

type VerificationItem = {
  id: string;
  title: string;
  description: string;
  status: VerificationStatus;
  icon: string;
  href: string;
};

const verificationItems: VerificationItem[] = [
  {
    id: "identity",
    title: "Identity verification",
    description:
      "Confirm your identity with a valid government-issued document.",
    status: "Verified",
    icon: "◉",
    href: "/host/verification/identity",
  },
  {
    id: "property",
    title: "Property verification",
    description:
      "Verify the ownership and registration details of your property.",
    status: "In review",
    icon: "⌂",
    href: "/host/verification/property",
  },
  {
    id: "documents",
    title: "Host documents",
    description:
      "Upload the documents required to publish and operate your listing.",
    status: "Required",
    icon: "▤",
    href: "/host/verification/documents",
  },
];

export default function HostVerificationPage() {
  const [showInfo, setShowInfo] = useState(false);

  const verifiedCount = verificationItems.filter(
    (item) => item.status === "Verified"
  ).length;

  const progress = Math.round(
    (verifiedCount / verificationItems.length) * 100
  );

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/host"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Host dashboard
          </Link>

          <div className="mt-7 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                HOST VERIFICATION
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Verify your hosting profile
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                Complete your verification to build trust with
                travellers and prepare your property for publishing.
              </p>
            </div>

            <div className="rounded-2xl bg-[#EEF2FF] px-5 py-4">
              <p className="text-xs font-medium text-[#64748B]">
                Verification progress
              </p>

              <p className="mt-1 text-2xl font-semibold">
                {progress}%
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="grid gap-8 lg:grid-cols-[1.5fr_0.7fr]">

          {/* LEFT */}
          <div>

            {/* PROGRESS CARD */}
            <div className="rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.14)] md:p-8">

              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                    YOUR PROGRESS
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Almost there.
                  </h2>

                  <p className="mt-2 max-w-lg text-sm leading-6 text-white/70">
                    Complete the remaining verification steps
                    before publishing your property.
                  </p>
                </div>

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                  <div className="text-center">
                    <p className="text-2xl font-semibold">
                      {progress}%
                    </p>

                    <p className="text-[9px] uppercase tracking-wider text-white/50">
                      complete
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-7 h-2 overflow-hidden rounded-full bg-white/10">
                <div
                  className="h-full rounded-full bg-white transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <div className="mt-3 flex justify-between text-[11px] text-white/50">
                <span>
                  {verifiedCount} of {verificationItems.length} completed
                </span>

                <span>
                  {verificationItems.length - verifiedCount} remaining
                </span>
              </div>
            </div>

            {/* VERIFICATION STEPS */}
            <div className="mt-7 rounded-[30px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.04)] md:p-7">

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                  VERIFICATION STEPS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold">
                  Complete your profile
                </h2>
              </div>

              <div className="mt-6 space-y-4">
                {verificationItems.map((item, index) => (
                  <VerificationCard
                    key={item.id}
                    item={item}
                    number={index + 1}
                  />
                ))}
              </div>
            </div>

            {/* TRUST INFORMATION */}
            <div className="mt-7 rounded-[30px] border border-[#03045E]/10 bg-white p-6 md:p-7">

              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF2FF] text-[#03045E]">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold">
                    Why verification matters
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    Verification helps Vistara maintain a trusted
                    hosting community and gives travellers more
                    confidence when choosing a stay.
                  </p>
                </div>
              </div>

              <button
                onClick={() => setShowInfo(!showInfo)}
                className="mt-5 text-sm font-semibold text-[#0D21A1] hover:underline"
              >
                {showInfo
                  ? "Hide verification information"
                  : "Learn more about verification →"}
              </button>

              {showInfo && (
                <div className="mt-5 rounded-2xl bg-[#FAFAF8] p-5">
                  <ul className="space-y-3 text-sm leading-6 text-[#64748B]">
                    <li>
                      • Your submitted information should be accurate
                      and up to date.
                    </li>

                    <li>
                      • Documents may be reviewed before a listing is
                      published.
                    </li>

                    <li>
                      • Verification status can change if submitted
                      information needs additional review.
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* PROFILE STATUS */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                HOST PROFILE
              </p>

              <div className="mt-5 flex items-center gap-4">

                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-lg font-semibold">
                  SG
                </div>

                <div>
                  <p className="font-semibold">
                    Sristi Gupta
                  </p>

                  <p className="mt-1 text-xs text-[#64748B]">
                    Vistara Host
                  </p>
                </div>

              </div>

              <div className="mt-6 rounded-2xl bg-[#ECFDF5] p-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-100 text-xs text-emerald-700">
                    ✓
                  </span>

                  <span className="text-sm font-semibold text-emerald-700">
                    Identity verified
                  </span>
                </div>

                <p className="mt-2 text-xs leading-5 text-emerald-700/70">
                  Your identity verification has been completed.
                </p>
              </div>

            </div>

            {/* REQUIRED ACTION */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                NEXT STEP
              </p>

              <h2 className="mt-3 font-serif text-2xl font-semibold">
                Finish your documents
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#64748B]">
                Upload the remaining host documents so your
                property can move towards publishing.
              </p>

              <Link
                href="/host/verification/documents"
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Upload documents
              </Link>

            </div>

            {/* SUPPORT */}
            <div className="rounded-[30px] bg-[#F7F3EA] p-7">

              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                NEED HELP?
              </p>

              <h3 className="mt-3 font-serif text-xl font-semibold">
                Have questions about verification?
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Our support team can help you understand the
                verification requirements.
              </p>

              <Link
                href="/help"
                className="mt-5 inline-flex text-sm font-semibold text-[#03045E] hover:underline"
              >
                Visit help centre →
              </Link>

            </div>

          </aside>
        </div>

      </section>
    </main>
  );
}

/* -------------------------------- */
/* VERIFICATION CARD */
/* -------------------------------- */

function VerificationCard({
  item,
  number,
}: {
  item: VerificationItem;
  number: number;
}) {
  const isVerified = item.status === "Verified";
  const isReview = item.status === "In review";

  return (
    <div className="rounded-2xl border border-[#03045E]/10 p-5 transition hover:border-[#03045E]/20 hover:shadow-sm">

      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

        {/* ICON */}
        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg ${
            isVerified
              ? "bg-[#ECFDF5] text-emerald-700"
              : isReview
              ? "bg-[#FFF7E6] text-[#9A6700]"
              : "bg-[#EEF2FF] text-[#03045E]"
          }`}
        >
          {isVerified ? "✓" : item.icon}
        </div>

        {/* CONTENT */}
        <div className="min-w-0 flex-1">

          <div className="flex flex-wrap items-center gap-2">

            <span className="text-[10px] font-bold text-[#94A3B8]">
              0{number}
            </span>

            <h3 className="font-semibold">
              {item.title}
            </h3>

            <VerificationBadge status={item.status} />

          </div>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
            {item.description}
          </p>

        </div>

        {/* ACTION */}
        <Link
          href={item.href}
          className={`shrink-0 rounded-xl px-4 py-2.5 text-xs font-semibold transition ${
            isVerified
              ? "border border-[#03045E]/10 text-[#03045E] hover:bg-[#F7F3EA]"
              : "bg-[#03045E] text-white hover:bg-[#0D21A1]"
          }`}
        >
          {isVerified
            ? "View"
            : isReview
            ? "View status"
            : "Complete"}
        </Link>

      </div>
    </div>
  );
}

/* -------------------------------- */
/* VERIFICATION BADGE */
/* -------------------------------- */

function VerificationBadge({
  status,
}: {
  status: VerificationStatus;
}) {
  const styles = {
    Verified:
      "bg-[#ECFDF5] text-emerald-700",
    "In review":
      "bg-[#FFF7E6] text-[#9A6700]",
    Required:
      "bg-[#EEF2FF] text-[#0D21A1]",
  };

  return (
    <span
      className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${styles[status]}`}
    >
      {status}
    </span>
  );
}