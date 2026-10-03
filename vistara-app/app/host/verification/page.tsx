"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  ChevronRight,
  FileCheck2,
  FileText,
  Home,
  IdCard,
  LockKeyhole,
  ShieldCheck,
  Upload,
  UserRound,
  X,
  XCircle,
} from "lucide-react";

type VerificationStatus =
  | "verified"
  | "pending"
  | "rejected"
  | "not_started";

type VerificationStep = {
  id: string;
  title: string;
  description: string;
  status: VerificationStatus;
  icon: React.ReactNode;
};

export default function HostVerificationPage() {
  const [steps, setSteps] = useState<VerificationStep[]>([
    {
      id: "identity",
      title: "Identity verification",
      description:
        "Verify your identity with a valid government-issued document.",
      status: "verified",
      icon: <IdCard size={19} />,
    },
    {
      id: "property",
      title: "Property verification",
      description:
        "Confirm that you own or are authorized to host this property.",
      status: "pending",
      icon: <Home size={19} />,
    },
    {
      id: "documents",
      title: "Property documents",
      description:
        "Upload supporting documents for your property listing.",
      status: "not_started",
      icon: <FileText size={19} />,
    },
    {
      id: "payout",
      title: "Payout verification",
      description:
        "Verify your payout details before receiving booking earnings.",
      status: "not_started",
      icon: <LockKeyhole size={19} />,
    },
  ]);

  const [activeStep, setActiveStep] = useState("property");
  const [submitted, setSubmitted] = useState(false);

  const verifiedCount = steps.filter(
    (step) => step.status === "verified",
  ).length;

  const progress = Math.round(
    (verifiedCount / steps.length) * 100,
  );

  function markCurrentStepComplete() {
    setSteps((current) =>
      current.map((step) =>
        step.id === activeStep
          ? {
              ...step,
              status: "verified",
            }
          : step,
      ),
    );

    setSubmitted(true);
  }

  const currentStep = steps.find(
    (step) => step.id === activeStep,
  );

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* Header */}
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8 lg:px-10">
          <Link
            href="/host"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441] text-[#18181B]">
              <Home size={20} />
            </div>

            <div>
              <p className="font-serif text-xl font-semibold">
                Vistara
              </p>

              <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                Host
              </p>
            </div>
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-[#D9A441]/25 bg-[#FFF8E8] px-3 py-2 text-xs font-bold text-[#765817]">
            <ShieldCheck size={15} />
            Secure verification
          </div>
        </div>
      </header>

      {/* Main */}
      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* Heading */}
        <div className="max-w-3xl">
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
            Host verification
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
            Build trust before you host
          </h1>

          <p className="mt-3 text-sm leading-6 text-[#71717A] sm:text-base">
            Complete your verification to make your host profile
            and properties ready for guests.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 rounded-[26px] border border-black/8 bg-white p-5 shadow-[0_12px_40px_rgba(24,24,27,0.04)] sm:p-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-bold text-[#44403C]">
                Verification progress
              </p>

              <p className="mt-1 text-xs text-[#78716C]">
                {verifiedCount} of {steps.length} steps completed
              </p>
            </div>

            <p className="font-serif text-2xl font-semibold">
              {progress}%
            </p>
          </div>

          <div className="mt-5 h-2 overflow-hidden rounded-full bg-[#F1F0EB]">
            <div
              className="h-full rounded-full bg-[#D9A441] transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Layout */}
        <div className="mt-8 grid gap-7 lg:grid-cols-[360px_1fr]">
          {/* Steps */}
          <aside className="rounded-[26px] border border-black/8 bg-white p-3">
            {steps.map((step, index) => {
              const active = step.id === activeStep;

              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActiveStep(step.id)}
                  className={`relative flex w-full gap-4 rounded-2xl p-4 text-left transition ${
                    active
                      ? "bg-[#FFF8E8]"
                      : "hover:bg-[#FAF8F3]"
                  }`}
                >
                  <div className="relative flex flex-col items-center">
                    <StepIcon
                      status={step.status}
                      icon={step.icon}
                    />

                    {index !== steps.length - 1 && (
                      <span className="absolute top-11 h-10 w-px bg-black/8" />
                    )}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-bold">
                        {step.title}
                      </p>

                      <ChevronRight
                        size={15}
                        className={`shrink-0 transition ${
                          active
                            ? "text-[#9A711E]"
                            : "text-[#A8A29E]"
                        }`}
                      />
                    </div>

                    <p className="mt-1 text-xs leading-5 text-[#78716C]">
                      {step.description}
                    </p>

                    <StatusText status={step.status} />
                  </div>
                </button>
              );
            })}
          </aside>

          {/* Detail */}
          <section className="rounded-[26px] border border-black/8 bg-white p-5 shadow-[0_12px_40px_rgba(24,24,27,0.04)] sm:p-7">
            {currentStep && (
              <>
                <div className="flex flex-col gap-5 border-b border-black/7 pb-6 sm:flex-row sm:items-start sm:justify-between">
                  <div className="flex gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
                      {currentStep.icon}
                    </div>

                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                        Verification step
                      </p>

                      <h2 className="mt-1 font-serif text-2xl font-semibold">
                        {currentStep.title}
                      </h2>

                      <p className="mt-1 text-sm leading-6 text-[#78716C]">
                        {currentStep.description}
                      </p>
                    </div>
                  </div>

                  <StatusBadge
                    status={currentStep.status}
                  />
                </div>

                {currentStep.id === "identity" && (
                  <IdentitySection
                    status={currentStep.status}
                  />
                )}

                {currentStep.id === "property" && (
                  <PropertySection
                    status={currentStep.status}
                  />
                )}

                {currentStep.id === "documents" && (
                  <DocumentsSection />
                )}

                {currentStep.id === "payout" && (
                  <PayoutSection />
                )}

                {/* Submit */}
                {currentStep.status !== "verified" && (
                  <div className="mt-7 flex flex-col gap-3 border-t border-black/7 pt-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex items-start gap-2 text-xs leading-5 text-[#78716C]">
                      <ShieldCheck
                        size={16}
                        className="mt-0.5 shrink-0 text-[#9A711E]"
                      />

                      <span>
                        Your submitted information is securely
                        handled for verification purposes.
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={markCurrentStepComplete}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D]"
                    >
                      Submit for verification
                      <ArrowRight size={16} />
                    </button>
                  </div>
                )}

                {submitted && (
                  <div className="mt-5 rounded-xl border border-[#C9D8BC] bg-[#F3F8EE] px-4 py-3 text-sm text-[#4E693E]">
                    Verification information submitted
                    successfully.
                  </div>
                )}
              </>
            )}
          </section>
        </div>

        {/* Bottom security note */}
        <div className="mt-8 flex flex-col gap-4 rounded-[24px] border border-black/8 bg-[#18181B] p-5 text-white sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div className="flex gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#D9A441] text-[#18181B]">
              <ShieldCheck size={21} />
            </div>

            <div>
              <p className="text-sm font-bold">
                Why verification matters
              </p>

              <p className="mt-1 max-w-2xl text-xs leading-5 text-white/55">
                Verification helps establish trust between hosts
                and guests and supports a safer marketplace.
              </p>
            </div>
          </div>

          <Link
            href="/host/help/verification"
            className="inline-flex items-center gap-2 text-xs font-bold text-[#E7C46D] hover:underline"
          >
            Learn more
            <ArrowRight size={14} />
          </Link>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Step Icon                                                                   */
/* -------------------------------------------------------------------------- */

function StepIcon({
  status,
  icon,
}: {
  status: VerificationStatus;
  icon: React.ReactNode;
}) {
  if (status === "verified") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F3F8EE] text-[#4E693E]">
        <Check size={19} strokeWidth={2.5} />
      </div>
    );
  }

  if (status === "rejected") {
    return (
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF1EF] text-[#9B4439]">
        <X size={18} />
      </div>
    );
  }

  return (
    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
      {icon}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Status                                                                      */
/* -------------------------------------------------------------------------- */

function StatusText({
  status,
}: {
  status: VerificationStatus;
}) {
  const config = {
    verified: {
      text: "Verified",
      className: "text-[#4E693E]",
    },
    pending: {
      text: "Under review",
      className: "text-[#9A711E]",
    },
    rejected: {
      text: "Needs attention",
      className: "text-[#9B4439]",
    },
    not_started: {
      text: "Not started",
      className: "text-[#A8A29E]",
    },
  };

  const item = config[status];

  return (
    <p
      className={`mt-2 text-[10px] font-bold ${item.className}`}
    >
      {item.text}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/* Status Badge                                                                */
/* -------------------------------------------------------------------------- */

function StatusBadge({
  status,
}: {
  status: VerificationStatus;
}) {
  if (status === "verified") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F3F8EE] px-3 py-1.5 text-[10px] font-bold text-[#4E693E]">
        <CheckCircle2 size={13} />
        Verified
      </span>
    );
  }

  if (status === "pending") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFF8E8] px-3 py-1.5 text-[10px] font-bold text-[#8A651B]">
        <ShieldCheck size={13} />
        Pending
      </span>
    );
  }

  if (status === "rejected") {
    return (
      <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#FFF1EF] px-3 py-1.5 text-[10px] font-bold text-[#9B4439]">
        <XCircle size={13} />
        Needs changes
      </span>
    );
  }

  return (
    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#F5F4EF] px-3 py-1.5 text-[10px] font-bold text-[#78716C]">
      Not started
    </span>
  );
}

/* -------------------------------------------------------------------------- */
/* Identity                                                                    */
/* -------------------------------------------------------------------------- */

function IdentitySection({
  status,
}: {
  status: VerificationStatus;
}) {
  return (
    <div className="pt-7">
      <div className="rounded-2xl border border-[#C9D8BC] bg-[#F3F8EE] p-5">
        <div className="flex gap-3">
          <CheckCircle2
            size={20}
            className="shrink-0 text-[#4E693E]"
          />

          <div>
            <p className="text-sm font-bold text-[#4E693E]">
              Identity verified
            </p>

            <p className="mt-1 text-xs leading-5 text-[#5F7252]">
              Your identity documents have been successfully
              verified.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <InfoCard
          label="Verification type"
          value="Government ID"
        />

        <InfoCard
          label="Verification status"
          value={
            status === "verified"
              ? "Verified"
              : "Under review"
          }
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Property                                                                    */
/* -------------------------------------------------------------------------- */

function PropertySection({
  status,
}: {
  status: VerificationStatus;
}) {
  return (
    <div className="pt-7">
      {status === "pending" ? (
        <div className="rounded-2xl border border-[#D9A441]/25 bg-[#FFF8E8] p-5">
          <div className="flex gap-3">
            <ShieldCheck
              size={21}
              className="shrink-0 text-[#9A711E]"
            />

            <div>
              <p className="text-sm font-bold text-[#765817]">
                Property verification is under review
              </p>

              <p className="mt-1 text-xs leading-5 text-[#8A651B]">
                Our verification team is reviewing the property
                information you submitted.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border border-black/7 bg-[#FAF8F3] p-5">
          <p className="text-sm font-bold">
            Confirm your property
          </p>

          <p className="mt-1 text-xs leading-5 text-[#78716C]">
            Provide the property details and authorization
            information required to verify your listing.
          </p>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <InputBox
              label="Property name"
              placeholder="Dubai Skyline Residence"
            />

            <InputBox
              label="Property type"
              placeholder="Luxury Apartment"
            />

            <InputBox
              label="City"
              placeholder="Dubai"
            />

            <InputBox
              label="Country"
              placeholder="United Arab Emirates"
            />
          </div>
        </div>
      )}

      <div className="mt-6">
        <p className="text-sm font-bold">
          Proof of ownership or authorization
        </p>

        <p className="mt-1 text-xs text-[#78716C]">
          Upload a document that demonstrates your right to
          host the property.
        </p>

        <UploadBox
          title="Upload property document"
          description="PDF, JPG or PNG · Maximum 10 MB"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Documents                                                                   */
/* -------------------------------------------------------------------------- */

function DocumentsSection() {
  return (
    <div className="pt-7">
      <p className="text-sm font-bold">
        Supporting documents
      </p>

      <p className="mt-1 text-xs leading-5 text-[#78716C]">
        Upload documents that help us verify the property and
        hosting authorization.
      </p>

      <div className="mt-5 space-y-3">
        <UploadBox
          title="Property ownership document"
          description="PDF, JPG or PNG · Maximum 10 MB"
        />

        <UploadBox
          title="Host authorization document"
          description="Required if you are managing the property on behalf of the owner."
        />

        <UploadBox
          title="Additional supporting document"
          description="Optional"
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Payout                                                                      */
/* -------------------------------------------------------------------------- */

function PayoutSection() {
  return (
    <div className="pt-7">
      <div className="rounded-2xl border border-black/7 bg-[#FAF8F3] p-5">
        <p className="text-sm font-bold">
          Payout account
        </p>

        <p className="mt-1 text-xs leading-5 text-[#78716C]">
          Verify your payout information before receiving
          booking earnings.
        </p>

        <div className="mt-5 space-y-4">
          <InputBox
            label="Account holder name"
            placeholder="Enter account holder name"
          />

          <InputBox
            label="Account number"
            placeholder="Enter account number"
          />

          <InputBox
            label="IFSC / Bank code"
            placeholder="Enter bank code"
          />
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Upload Box                                                                  */
/* -------------------------------------------------------------------------- */

function UploadBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <label className="block cursor-pointer rounded-2xl border border-dashed border-black/15 bg-white p-5 transition hover:border-[#D9A441]/50 hover:bg-[#FFFDF8]">
      <input
        type="file"
        className="hidden"
        accept=".pdf,.jpg,.jpeg,.png"
      />

      <div className="flex items-center gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
          <Upload size={19} />
        </div>

        <div className="min-w-0">
          <p className="text-sm font-bold">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#78716C]">
            {description}
          </p>
        </div>

        <ArrowRight
          size={17}
          className="ml-auto shrink-0 text-[#A8A29E]"
        />
      </div>
    </label>
  );
}

/* -------------------------------------------------------------------------- */
/* Input                                                                       */
/* -------------------------------------------------------------------------- */

function InputBox({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-[#44403C]">
        {label}
      </label>

      <input
        placeholder={placeholder}
        className="h-11 w-full rounded-xl border border-black/8 bg-white px-3 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Info Card                                                                   */
/* -------------------------------------------------------------------------- */

function InfoCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-black/7 bg-[#FAF8F3] p-4">
      <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#A8A29E]">
        {label}
      </p>

      <p className="mt-2 text-sm font-bold">
        {value}
      </p>
    </div>
  );
}