"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  FileCheck2,
  Home,
  IdCard,
  Info,
  ShieldCheck,
  Upload,
} from "lucide-react";

import Navbar from "@/components/navbar";

type VerificationItem = {
  id: string;
  number: string;
  title: string;
  description: string;
  requirement: string;
  icon: React.ElementType;
};

const verificationItems: VerificationItem[] = [
  {
    id: "identity",
    number: "01",
    title: "Identity Verification",
    description:
      "Verify your identity with a valid government-issued identity document.",
    requirement: "Government-issued ID",
    icon: IdCard,
  },
  {
    id: "ownership",
    number: "02",
    title: "Property Ownership",
    description:
      "Upload a document that establishes your right to list and host this property.",
    requirement: "Ownership document",
    icon: Home,
  },
  {
    id: "certificate",
    number: "03",
    title: "Property Certificate",
    description:
      "Provide the relevant property or registration certificate for review.",
    requirement: "Property certificate",
    icon: FileCheck2,
  },
];

export default function VerificationPage() {
  const [completed, setCompleted] = useState<string[]>([]);

  const completedCount = completed.length;
  const totalCount = verificationItems.length;
  const progress = Math.round((completedCount / totalCount) * 100);
  const readyToSubmit = completedCount === totalCount;

  const handleUpload = (id: string) => {
    setCompleted((current) => {
      if (current.includes(id)) {
        return current.filter((item) => item !== id);
      }

      return [...current, id];
    });
  };

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#E7DFD7] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10">
          <Link
            href="/host/property/new"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            <ArrowLeft size={16} />
            Back to property
          </Link>

          <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#B8945A]">
                HOST DASHBOARD
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Verify your property
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756D67]">
                Complete the verification steps below before submitting
                your property for review.
              </p>
            </div>

            <div className="flex w-fit items-center gap-3 rounded-2xl border border-[#E7DFD7] bg-[#FAF8F3] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E8DE] text-[#B76545]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A19891]">
                  LISTING STATUS
                </p>

                <p className="mt-0.5 text-sm font-semibold">
                  {readyToSubmit
                    ? "Ready for review"
                    : "Verification required"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-7 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* HERO CARD */}

            <section className="relative overflow-hidden rounded-[30px] bg-[#302722] p-7 text-white sm:p-9">
              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#B76545]/20 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
                  <div className="max-w-xl">
                    <div className="flex items-center gap-2">
                      <ShieldCheck
                        size={17}
                        className="text-[#D1A866]"
                      />

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1A866]">
                        Vistara verification
                      </span>
                    </div>

                    <h2 className="mt-5 font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                      Build trust before your first guest arrives.
                    </h2>

                    <p className="mt-4 text-sm leading-6 text-white/65">
                      Complete these important checks so your property
                      information can be reviewed before going live.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      PROGRESS
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {completedCount}/{totalCount}
                    </p>

                    <p className="text-xs text-white/45">
                      completed
                    </p>
                  </div>
                </div>

                {/* PROGRESS */}

                <div className="mt-9">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/50">
                      Verification progress
                    </span>

                    <span className="font-semibold">
                      {progress}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#D1A866] transition-all duration-500"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK STATS */}

            <div className="grid gap-4 sm:grid-cols-3">
              <StatCard
                icon={<CheckCircle2 size={18} />}
                label="Completed"
                value={`${completedCount} / 3`}
              />

              <StatCard
                icon={<FileCheck2 size={18} />}
                label="Remaining"
                value={`${totalCount - completedCount}`}
              />

              <StatCard
                icon={<ShieldCheck size={18} />}
                label="Status"
                value={readyToSubmit ? "Ready" : "Pending"}
              />
            </div>

            {/* CHECKLIST */}

            <section className="rounded-[30px] border border-[#E7DFD7] bg-white p-6 sm:p-8">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                    REQUIRED INFORMATION
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    Verification checklist
                  </h2>
                </div>

                <p className="text-xs text-[#948981]">
                  {readyToSubmit
                    ? "Everything is complete"
                    : `${totalCount - completedCount} step${
                        totalCount - completedCount === 1
                          ? ""
                          : "s"
                      } remaining`}
                </p>
              </div>

              <div className="mt-7 space-y-4">
                {verificationItems.map((item) => {
                  const Icon = item.icon;
                  const isCompleted = completed.includes(item.id);

                  return (
                    <div
                      key={item.id}
                      className={`rounded-[22px] border p-5 transition ${
                        isCompleted
                          ? "border-[#D8E0D2] bg-[#F7F9F4]"
                          : "border-[#E7DFD7] bg-white hover:border-[#CDBBAE]"
                      }`}
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* ICON */}

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                            isCompleted
                              ? "bg-[#68705A] text-white"
                              : "bg-[#F3EEE8] text-[#B76545]"
                          }`}
                        >
                          {isCompleted ? (
                            <Check size={20} />
                          ) : (
                            <Icon size={20} />
                          )}
                        </div>

                        {/* CONTENT */}

                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-[10px] font-bold tracking-[0.12em] text-[#B8945A]">
                              {item.number}
                            </span>

                            <h3 className="text-base font-semibold text-[#342B26]">
                              {item.title}
                            </h3>

                            {isCompleted && (
                              <span className="rounded-full bg-[#EAF0E6] px-2.5 py-1 text-[10px] font-bold text-[#68705A]">
                                Completed
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-[#756D67]">
                            {item.description}
                          </p>

                          <p className="mt-2 text-xs text-[#A19891]">
                            {item.requirement}
                          </p>
                        </div>

                        {/* BUTTON */}

                        <button
                          type="button"
                          onClick={() => handleUpload(item.id)}
                          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                            isCompleted
                              ? "border border-[#D7DFD1] bg-white text-[#68705A] hover:border-[#B76545]"
                              : "bg-[#B76545] text-white hover:bg-[#965039]"
                          }`}
                        >
                          {isCompleted ? (
                            <>
                              <Check size={15} />
                              Completed
                            </>
                          ) : (
                            <>
                              <Upload size={15} />
                              Upload
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* WHY */}

            <section className="rounded-[28px] border border-[#E7DFD7] bg-[#F3EFEA] p-6 sm:p-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#B76545] shadow-sm">
                  <Info size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                    WHY VERIFICATION MATTERS
                  </p>

                  <h2 className="mt-2 font-serif text-xl font-semibold">
                    A clearer experience for travelers
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-[#756D67]">
                    Verification helps provide clearer property
                    information and gives hosts a structured way to
                    prepare their listing before review.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              RIGHT SIDEBAR
          ================================================= */}

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

            {/* READINESS */}

            <div className="rounded-[28px] border border-[#E7DFD7] bg-white p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EEE8] text-[#B76545]">
                  <ShieldCheck size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#B8945A]">
                    PROPERTY
                  </p>

                  <h3 className="mt-1 text-base font-semibold">
                    Listing readiness
                  </h3>
                </div>
              </div>

              <div className="mt-6">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#756D67]">
                    Verification
                  </span>

                  <span className="font-semibold">
                    {progress}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEE8E1]">
                  <div
                    className="h-full rounded-full bg-[#B76545] transition-all duration-500"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-[#EEE7E1] pt-5">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      readyToSubmit
                        ? "bg-[#68705A]"
                        : "bg-[#B8945A]"
                    }`}
                  />

                  <span className="text-[#5F554E]">
                    {readyToSubmit
                      ? "Ready to submit"
                      : "Verification in progress"}
                  </span>
                </div>
              </div>
            </div>

            {/* HELP */}

            <div className="rounded-[28px] bg-[#302722] p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1A866]">
                NEED HELP?
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold">
                Not sure what to upload?
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Review the requirements for each step before
                submitting your property.
              </p>

              <Link
                href="/support"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-[#D1A866]"
              >
                Get support
                <ArrowRight size={14} />
              </Link>
            </div>

            {/* SUBMIT */}

            <div className="rounded-[28px] border border-[#E2D7CC] bg-[#F7F3ED] p-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                FINAL STEP
              </p>

              <h3 className="mt-2 font-serif text-2xl font-semibold">
                Submit for review
              </h3>

              <p className="mt-2 text-sm leading-6 text-[#756D67]">
                Complete all required verification steps before
                sending your property for review.
              </p>

              <button
                type="button"
                disabled={!readyToSubmit}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B76545] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#965039] disabled:cursor-not-allowed disabled:bg-[#D5C9BF]"
              >
                Submit for Verification
                <ArrowRight size={15} />
              </button>

              {!readyToSubmit && (
                <p className="mt-3 text-center text-[11px] leading-5 text-[#9B9088]">
                  Complete all three steps to continue.
                </p>
              )}
            </div>

            {/* BACK */}

            <Link
              href="/host/property/new"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-[#DCD2CA] bg-white px-5 py-3 text-sm font-semibold text-[#5F554E] transition hover:border-[#B76545] hover:text-[#B76545]"
            >
              <ArrowLeft size={15} />
              Back to property
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   STAT CARD
============================================================ */

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#E7DFD7] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EEE8] text-[#B76545]">
          {icon}
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A19891]">
            {label}
          </p>

          <p className="mt-1 text-sm font-semibold text-[#40362F]">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}