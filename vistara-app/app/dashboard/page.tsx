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
  MapPin,
  ShieldCheck,
  Upload,
} from "lucide-react";

import Navbar from "@/components/navbar";

const verificationItems = [
  {
    id: "identity",
    number: "01",
    title: "Identity Verification",
    description:
      "Verify your identity using a valid government-issued identity document.",
    helper: "Government ID required",
    icon: IdCard,
  },
  {
    id: "ownership",
    number: "02",
    title: "Property Ownership",
    description:
      "Upload documents that establish your right to list and host this property.",
    helper: "Ownership document required",
    icon: Home,
  },
  {
    id: "certificate",
    number: "03",
    title: "Property Certificate",
    description:
      "Provide the relevant property or registration certificate for review.",
    helper: "Property certificate required",
    icon: FileCheck2,
  },
];

export default function Verification() {
  const [uploaded, setUploaded] = useState<string[]>([]);

  const handleUpload = (id: string) => {
    setUploaded((current) =>
      current.includes(id)
        ? current
        : [...current, id]
    );
  };

  const completedCount = uploaded.length;

  const progress =
    (completedCount / verificationItems.length) * 100;

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* =====================================================
          TOP DASHBOARD HEADER
      ===================================================== */}

      <section className="border-b border-[#E6DED6] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-9 sm:px-7 lg:px-10">
          <Link
            href="/host/property/new"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            <ArrowLeft size={15} />
            Back to property
          </Link>

          <div className="mt-8 flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#B8945A]">
                HOST DASHBOARD
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.035em] sm:text-5xl">
                Complete your verification
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756D67]">
                A few important details are needed before your
                property can be reviewed and prepared for guests.
              </p>
            </div>

            {/* STATUS */}

            <div className="flex items-center gap-3 rounded-2xl border border-[#E6DED6] bg-[#FAF8F3] px-4 py-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F0E9DF] text-[#B76545]">
                <ShieldCheck size={19} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A59A91]">
                  Listing status
                </p>

                <p className="mt-0.5 text-sm font-semibold text-[#40362F]">
                  Verification required
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          DASHBOARD
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-9 sm:px-7 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]">

          {/* =================================================
              MAIN COLUMN
          ================================================= */}

          <div className="space-y-6">

            {/* FAMOUS / OVERVIEW CARD */}

            <section className="relative overflow-hidden rounded-[30px] bg-[#302722] p-7 text-white sm:p-9">
              {/* Decorative shape */}

              <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#B76545]/20 blur-2xl" />

              <div className="absolute -bottom-28 left-1/2 h-64 w-64 rounded-full bg-[#B8945A]/10 blur-3xl" />

              <div className="relative">
                <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">

                  <div>
                    <div className="flex items-center gap-2">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                        <ShieldCheck size={16} />
                      </span>

                      <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D7B97E]">
                        Vistara verification
                      </span>
                    </div>

                    <h2 className="mt-5 max-w-xl font-serif text-3xl font-semibold leading-tight sm:text-4xl">
                      Build trust before your first guest arrives.
                    </h2>

                    <p className="mt-4 max-w-xl text-sm leading-6 text-white/65">
                      Complete the verification steps below so
                      your property information can be reviewed
                      with greater clarity and confidence.
                    </p>
                  </div>

                  <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 px-5 py-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-white/45">
                      Progress
                    </p>

                    <p className="mt-1 text-2xl font-semibold">
                      {completedCount}/3
                    </p>

                    <p className="text-xs text-white/50">
                      completed
                    </p>
                  </div>
                </div>

                {/* PROGRESS */}

                <div className="mt-9">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-white/55">
                      Verification progress
                    </span>

                    <span className="font-semibold text-white">
                      {Math.round(progress)}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className="h-full rounded-full bg-[#D1A866] transition-all duration-500"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>
                </div>
              </div>
            </section>

            {/* QUICK STATS */}

            <div className="grid gap-4 sm:grid-cols-3">

              <OverviewCard
                icon={<CheckCircle2 size={18} />}
                label="Completed"
                value={`${completedCount} of 3`}
              />

              <OverviewCard
                icon={<FileCheck2 size={18} />}
                label="Documents"
                value={`${3 - completedCount} pending`}
              />

              <OverviewCard
                icon={<ShieldCheck size={18} />}
                label="Listing"
                value={
                  completedCount === 3
                    ? "Ready for review"
                    : "Not ready"
                }
              />

            </div>

            {/* VERIFICATION SECTION */}

            <section className="rounded-[30px] border border-[#E5DED6] bg-white p-6 sm:p-8">

              <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                    REQUIRED INFORMATION
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    Verification checklist
                  </h2>
                </div>

                <p className="text-xs text-[#948981]">
                  {completedCount === 3
                    ? "All documents uploaded"
                    : `${3 - completedCount} step${
                        3 - completedCount === 1
                          ? ""
                          : "s"
                      } remaining`}
                </p>
              </div>

              <div className="mt-7 space-y-4">
                {verificationItems.map((item) => {
                  const Icon = item.icon;
                  const isUploaded = uploaded.includes(
                    item.id
                  );

                  return (
                    <div
                      key={item.id}
                      className={`group rounded-[22px] border p-5 transition ${
                        isUploaded
                          ? "border-[#D9E0D0] bg-[#F7F8F3]"
                          : "border-[#E7E0D9] bg-white hover:border-[#CBB8A9] hover:shadow-[0_8px_30px_rgba(44,36,32,0.045)]"
                      }`}
                    >
                      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                        {/* NUMBER */}

                        <div
                          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${
                            isUploaded
                              ? "bg-[#68705A] text-white"
                              : "bg-[#F3EFE9] text-[#B76545]"
                          }`}
                        >
                          {isUploaded ? (
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

                            {isUploaded && (
                              <span className="rounded-full border border-[#D6DFCC] bg-[#EDF2E9] px-2.5 py-1 text-[10px] font-bold text-[#68705A]">
                                Uploaded
                              </span>
                            )}
                          </div>

                          <p className="mt-2 text-sm leading-6 text-[#756D67]">
                            {item.description}
                          </p>

                          <p className="mt-2 text-xs text-[#A19891]">
                            {item.helper}
                          </p>
                        </div>

                        {/* ACTION */}

                        <button
                          type="button"
                          onClick={() =>
                            handleUpload(item.id)
                          }
                          className={`inline-flex shrink-0 items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold transition ${
                            isUploaded
                              ? "border border-[#D8DED2] bg-white text-[#68705A] hover:border-[#B76545]"
                              : "bg-[#B76545] text-white hover:bg-[#965039]"
                          }`}
                        >
                          {isUploaded ? (
                            <>
                              <Check size={15} />
                              Uploaded
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

            {/* WHY VERIFICATION */}

            <section className="rounded-[28px] border border-[#E5DED6] bg-[#F3EFEA] p-6 sm:p-7">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white text-[#B76545] shadow-sm">
                  <Info size={18} />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                    WHY IT MATTERS
                  </p>

                  <h2 className="mt-2 font-serif text-xl font-semibold">
                    A clearer experience for everyone
                  </h2>

                  <p className="mt-2 max-w-2xl text-sm leading-6 text-[#756D67]">
                    Verification helps create clearer property
                    information for travelers and gives hosts a
                    structured way to prepare their listing before
                    it is reviewed.
                  </p>
                </div>
              </div>
            </section>
          </div>

          {/* =================================================
              SIDEBAR
          ================================================= */}

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

            {/* PROPERTY READINESS */}

            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_10px_35px_rgba(44,36,32,0.04)]">

              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#F3EFEA] text-[#B76545]">
                  <MapPin size={18} />
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
                <div className="flex items-center justify-between">
                  <span className="text-sm text-[#756D67]">
                    Verification
                  </span>

                  <span className="text-sm font-semibold">
                    {Math.round(progress)}%
                  </span>
                </div>

                <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEE8E1]">
                  <div
                    className="h-full rounded-full bg-[#B76545] transition-all duration-500"
                    style={{
                      width: `${progress}%`,
                    }}
                  />
                </div>
              </div>

              <div className="mt-6 border-t border-[#EEE7E1] pt-5">
                <div className="flex items-center gap-2 text-sm">
                  <span
                    className={`h-2 w-2 rounded-full ${
                      completedCount === 3
                        ? "bg-[#68705A]"
                        : "bg-[#B8945A]"
                    }`}
                  />

                  <span className="text-[#5F554E]">
                    {completedCount === 3
                      ? "Ready to submit"
                      : "Verification in progress"}
                  </span>
                </div>
              </div>
            </div>

            {/* HELP CARD */}

            <div className="rounded-[28px] bg-[#302722] p-6 text-white">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D1A866]">
                NEED HELP?
              </p>

              <h3 className="mt-3 font-serif text-2xl font-semibold">
                Not sure what to upload?
              </h3>

              <p className="mt-3 text-sm leading-6 text-white/60">
                Review the required information for each
                verification step before submitting your documents.
              </p>

              <Link
                href="/support"
                className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#D1A866]"
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
                Upload all required information before sending
                your property for verification.
              </p>

              <button
                type="button"
                disabled={completedCount !== 3}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-[#B76545] px-5 py-3.5 text-sm font-semibold text-white transition hover:bg-[#965039] disabled:cursor-not-allowed disabled:bg-[#D6C8BE]"
              >
                Submit for Verification
                <ArrowRight size={15} />
              </button>

              {completedCount !== 3 && (
                <p className="mt-3 text-center text-[11px] leading-5 text-[#9B9088]">
                  Complete all three verification steps to
                  continue.
                </p>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ============================================================
   OVERVIEW CARD
============================================================ */

function OverviewCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-[22px] border border-[#E5DED6] bg-white p-5">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3EFEA] text-[#B76545]">
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