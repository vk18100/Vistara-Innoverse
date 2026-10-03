import Link from "next/link";
import Navbar from "@/components/navbar";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  FileCheck2,
  Home,
  Info,
  MapPin,
  ShieldCheck,
  UserCheck,
} from "lucide-react";

const checks = [
  {
    title: "Property Identity",
    description:
      "Property information is checked against the details submitted by the host.",
    status: "Verified",
    icon: Home,
  },
  {
    title: "Host Verification",
    description:
      "Host identity and submitted information are reviewed before the listing is published.",
    status: "Verified",
    icon: UserCheck,
  },
  {
    title: "Location Verification",
    description:
      "The property's listed location is reviewed for consistency with the information provided.",
    status: "Verified",
    icon: MapPin,
  },
  {
    title: "Property Documents",
    description:
      "Required property documentation can be reviewed as part of the verification process.",
    status: "Verified",
    icon: FileCheck2,
  },
];

const verificationSteps = [
  {
    number: "01",
    title: "Information submitted",
    description:
      "The host submits the property, identity and relevant ownership information.",
  },
  {
    number: "02",
    title: "Information reviewed",
    description:
      "The submitted information goes through the applicable Vistara verification checks.",
  },
  {
    number: "03",
    title: "Verification shown",
    description:
      "Once completed, verification information can be displayed to help guests understand the listing.",
  },
];

export default function Verification() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}

      <section className="border-b border-[#E7DFD7] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 sm:px-7 lg:px-10 lg:py-14">
          <Link
            href="/stays"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            <ArrowLeft size={15} />
            Back to Stays
          </Link>

          <div className="mt-12 max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#D8C29B]/50 bg-[#B8945A]/[0.07] px-3.5 py-2">
              <ShieldCheck
                size={14}
                className="text-[#B8945A]"
              />

              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D6E38]">
                Vistara Trust
              </span>
            </div>

            <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              Property
              <span className="block text-[#B76545]">
                Verification
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-sm leading-7 text-[#756D67] sm:text-base">
              Vistara uses a verification process to make property
              information more transparent and easier for guests to
              understand before they book.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================================
          CONTENT
      ========================================================= */}

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-7 lg:px-10 lg:py-14">
        {/* =======================================================
            VERIFIED STATUS CARD
        ======================================================= */}

        <section className="relative overflow-hidden rounded-[30px] bg-[#3A302A] p-7 text-white shadow-[0_24px_70px_rgba(44,36,32,0.13)] sm:p-9 lg:p-10">
          {/* Decorative circles */}
          <div className="absolute -right-28 -top-28 h-72 w-72 rounded-full bg-[#B8945A]/10 blur-2xl" />

          <div className="absolute -bottom-32 -left-24 h-80 w-80 rounded-full bg-[#B76545]/10 blur-3xl" />

          <div className="relative z-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <div className="flex items-start gap-5">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#68705A] text-white shadow-lg">
                  <Check
                    size={25}
                    strokeWidth={2.5}
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#D8B46A]">
                    Verification status
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    Verified Property
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-white/55">
                    The applicable property and host checks have been
                    completed according to Vistara&apos;s verification
                    process.
                  </p>
                </div>
              </div>

              <div className="flex w-fit items-center gap-2 rounded-full border border-[#68705A]/30 bg-[#68705A]/15 px-4 py-2.5">
                <CheckCircle2
                  size={15}
                  className="text-[#AAB49B]"
                />

                <span className="text-xs font-semibold text-white/80">
                  Verified
                </span>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-white/40">
                Last reviewed
              </p>

              <p className="text-xs font-medium text-white/65">
                September 2026
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================
            CHECKS
        ======================================================= */}

        <section className="mt-14">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76545]">
              Verification coverage
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
              What has been checked
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#756D67]">
              These checks help provide clearer information about the
              property and the host behind the listing.
            </p>
          </div>

          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {checks.map((check) => {
              const Icon = check.icon;

              return (
                <article
                  key={check.title}
                  className="group rounded-[24px] border border-[#E5DED6] bg-white p-6 transition duration-300 hover:-translate-y-0.5 hover:border-[#D2C1B5] hover:shadow-[0_16px_40px_rgba(44,36,32,0.06)] sm:p-7"
                >
                  <div className="flex items-start justify-between gap-5">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F2EAE4] text-[#B76545] transition group-hover:bg-[#B76545] group-hover:text-white">
                      <Icon size={18} />
                    </div>

                    <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-[#68705A]/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#68705A]">
                      <Check size={11} strokeWidth={2.5} />
                      {check.status}
                    </span>
                  </div>

                  <h3 className="mt-6 font-serif text-xl font-semibold">
                    {check.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#756D67]">
                    {check.description}
                  </p>
                </article>
              );
            })}
          </div>
        </section>

        {/* =======================================================
            HOW IT WORKS
        ======================================================= */}

        <section className="mt-16">
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B8945A]">
                The process
              </p>

              <h2 className="mt-2 font-serif text-3xl font-semibold tracking-[-0.03em] sm:text-4xl">
                How verification works
              </h2>

              <p className="mt-4 max-w-md text-sm leading-7 text-[#756D67]">
                Verification is designed to give guests more context
                about the information provided for a property.
              </p>
            </div>

            <div className="space-y-3">
              {verificationSteps.map((step) => (
                <div
                  key={step.number}
                  className="group flex gap-5 rounded-[22px] border border-[#E5DED6] bg-white p-5 transition hover:border-[#D2C1B5] sm:p-6"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3EFEA] font-serif text-sm font-semibold text-[#B76545]">
                    {step.number}
                  </div>

                  <div>
                    <h3 className="font-semibold text-[#2C2420]">
                      {step.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#756D67]">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* =======================================================
            IMPORTANT INFORMATION
        ======================================================= */}

        <section className="mt-14 rounded-[24px] border border-[#E5DED6] bg-[#F3EFEA] p-6 sm:p-7">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#B8945A] shadow-sm">
              <Info size={17} />
            </div>

            <div>
              <h3 className="font-semibold text-[#2C2420]">
                Important information
              </h3>

              <p className="mt-2 max-w-4xl text-sm leading-6 text-[#756D67]">
                A verification badge indicates that the listed checks
                have been completed according to Vistara&apos;s
                verification process. It does not represent a guarantee
                of a guest&apos;s experience or eliminate the need for
                guests to review the property details before booking.
              </p>
            </div>
          </div>
        </section>

        {/* =======================================================
            FOOTER CTA
        ======================================================= */}

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-[#E5DED6] pt-7 sm:flex-row sm:items-center">
          <p className="text-xs text-[#9A918B]">
            Verification information is provided for transparency.
          </p>

          <Link
            href="/stays"
            className="inline-flex items-center gap-2 rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_25px_rgba(183,101,69,0.16)] transition hover:-translate-y-0.5 hover:bg-[#965039]"
          >
            Explore stays
            <ArrowLeft
              size={15}
              className="rotate-180"
            />
          </Link>
        </div>
      </section>
    </main>
  );
}