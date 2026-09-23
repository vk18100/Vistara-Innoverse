"use client";

import { useState } from "react";

const steps = [
  "Basic",
  "Location",
  "Rooms",
  "Amenities",
  "Photos",
  "Pricing",
  "Availability",
  "Rules",
  "Guests",
  "Preview",
];

const defaultRules = [
  {
    id: "smoking",
    title: "Smoking",
    description: "Smoking is not allowed inside the property.",
    icon: "⌁",
  },
  {
    id: "pets",
    title: "Pets",
    description: "Guests can bring pets with them.",
    icon: "◈",
  },
  {
    id: "parties",
    title: "Parties & events",
    description: "Parties and large gatherings are not allowed.",
    icon: "✦",
  },
  {
    id: "quiet",
    title: "Quiet hours",
    description: "Keep noise to a minimum during designated hours.",
    icon: "◌",
  },
];

export default function PropertyRulesPage() {
  const [rules, setRules] = useState({
    smoking: false,
    pets: true,
    parties: false,
    quiet: true,
  });

  const [quietStart, setQuietStart] = useState("22:00");
  const [quietEnd, setQuietEnd] = useState("07:00");

  const [checkInFrom, setCheckInFrom] = useState("14:00");
  const [checkInUntil, setCheckInUntil] = useState("21:00");

  const [checkOut, setCheckOut] = useState("11:00");

  const toggleRule = (id: keyof typeof rules) => {
    setRules((current) => ({
      ...current,
      [id]: !current[id],
    }));
  };

  const handleContinue = () => {
    console.log({
      rules,
      quietStart,
      quietEnd,
      checkInFrom,
      checkInUntil,
      checkOut,
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#03045E]">

      {/* HEADER */}
      <header className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-10">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03045E]">
              <span className="font-bold text-white">V</span>
            </div>

            <div>
              <p className="text-sm font-semibold tracking-tight">
                VISTARA
              </p>

              <p className="text-[10px] uppercase tracking-[0.2em] text-[#03045E]/40">
                Host Studio
              </p>
            </div>

          </div>

          <button className="rounded-full border border-[#03045E]/10 px-4 py-2 text-sm text-[#03045E]/60 transition hover:bg-[#03045E]/5">
            Exit
          </button>

        </div>
      </header>


      {/* MAIN */}
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">

        {/* HEADING */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>

            <div className="mb-4 flex items-center gap-3">

              <span className="h-2 w-2 rounded-full bg-[#0D21A1]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0D21A1]">
                Create your listing
              </span>

            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">

              Set the expectations
              <span className="block text-[#0D21A1]">
                before guests arrive.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Clear house rules create a better experience for both
              guests and hosts. Choose what applies to your property.
            </p>

          </div>

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              08<span className="text-[#03045E]/20">/10</span>
            </p>

          </div>

        </div>


        {/* PROGRESS */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 7;
              const completed = index < 7;

              return (
                <div
                  key={step}
                  className="flex flex-1 items-center"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        active
                          ? "bg-[#03045E] text-white shadow-[0_8px_25px_rgba(3,4,94,0.22)]"
                          : completed
                            ? "bg-[#0D21A1] text-white"
                            : "border border-[#03045E]/10 text-[#03045E]/30"
                      }`}
                    >
                      {completed
                        ? "✓"
                        : String(index + 1).padStart(2, "0")}
                    </div>

                    <span
                      className={`hidden text-xs font-medium xl:block ${
                        active
                          ? "text-[#03045E]"
                          : completed
                            ? "text-[#0D21A1]"
                            : "text-[#03045E]/30"
                      }`}
                    >
                      {step}
                    </span>

                  </div>

                  {index !== 9 && (
                    <div
                      className={`mx-3 h-px flex-1 ${
                        index < 7
                          ? "bg-[#0D21A1]/40"
                          : "bg-[#03045E]/10"
                      }`}
                    />
                  )}

                </div>
              );
            })}

          </div>

        </div>


        {/* CONTENT */}
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">

          {/* RULES CARD */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 08
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                House rules
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                Select the rules guests should know before making a
                reservation.
              </p>

            </div>


            <div className="px-7 py-8 sm:px-10 sm:py-10">

              {/* RULE LIST */}
              <div className="space-y-3">

                {defaultRules.map((rule) => {

                  const enabled =
                    rules[rule.id as keyof typeof rules];

                  return (
                    <button
                      key={rule.id}
                      type="button"
                      onClick={() =>
                        toggleRule(rule.id as keyof typeof rules)
                      }
                      className={`group flex w-full items-center justify-between rounded-2xl border p-5 text-left transition duration-300 ${
                        enabled
                          ? "border-[#0D21A1]/20 bg-[#0D21A1]/[0.035]"
                          : "border-[#03045E]/8 bg-white hover:border-[#03045E]/15 hover:bg-[#03045E]/[0.015]"
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm transition ${
                            enabled
                              ? "bg-[#03045E] text-white"
                              : "bg-[#03045E]/[0.045] text-[#03045E]/40"
                          }`}
                        >
                          {rule.icon}
                        </div>

                        <div>

                          <h3 className="text-sm font-semibold">
                            {rule.title}
                          </h3>

                          <p className="mt-1 max-w-lg text-xs leading-5 text-[#03045E]/40">
                            {rule.description}
                          </p>

                        </div>

                      </div>


                      <div
                        className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                          enabled
                            ? "bg-[#03045E]"
                            : "bg-[#03045E]/15"
                        }`}
                      >

                        <span
                          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                            enabled
                              ? "left-6"
                              : "left-1"
                          }`}
                        />

                      </div>

                    </button>
                  );
                })}

              </div>


              {/* QUIET HOURS */}
              {rules.quiet && (
                <div className="mt-8 rounded-2xl border border-[#03045E]/8 bg-[#03045E]/[0.02] p-5">

                  <div className="mb-5">

                    <h3 className="text-sm font-semibold">
                      Quiet hours
                    </h3>

                    <p className="mt-1 text-xs text-[#03045E]/40">
                      Choose the hours when guests should keep noise
                      to a minimum.
                    </p>

                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">

                    <TimeInput
                      label="Starts"
                      value={quietStart}
                      onChange={setQuietStart}
                    />

                    <TimeInput
                      label="Ends"
                      value={quietEnd}
                      onChange={setQuietEnd}
                    />

                  </div>

                </div>
              )}


              {/* CHECK-IN / CHECK-OUT */}
              <div className="mt-12 border-t border-[#03045E]/8 pt-10">

                <div className="mb-6">

                  <h3 className="text-base font-semibold">
                    Arrival & departure
                  </h3>

                  <p className="mt-1 text-xs text-[#03045E]/40">
                    Give guests a clear window for check-in and
                    check-out.
                  </p>

                </div>


                <div className="space-y-6">

                  <div>

                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#03045E]/35">
                      Check-in
                    </p>

                    <div className="grid gap-4 sm:grid-cols-2">

                      <TimeInput
                        label="From"
                        value={checkInFrom}
                        onChange={setCheckInFrom}
                      />

                      <TimeInput
                        label="Until"
                        value={checkInUntil}
                        onChange={setCheckInUntil}
                      />

                    </div>

                  </div>


                  <div>

                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#03045E]/35">
                      Check-out
                    </p>

                    <TimeInput
                      label="Check-out time"
                      value={checkOut}
                      onChange={setCheckOut}
                    />

                  </div>

                </div>

              </div>


              {/* RULE SUMMARY */}
              <div className="mt-10 rounded-[22px] bg-[#03045E] p-6 text-white">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Your rules
                    </p>

                    <p className="mt-2 text-3xl font-semibold">
                      {
                        Object.values(rules).filter(Boolean).length
                      }
                    </p>

                  </div>

                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10">
                    ✓
                  </div>

                </div>

                <p className="mt-5 text-xs leading-6 text-white/45">
                  These preferences will be visible to guests before
                  they confirm their stay.
                </p>

              </div>

            </div>


            {/* FOOTER */}
            <div className="flex flex-col-reverse gap-4 border-t border-[#03045E]/8 bg-[#03045E]/[0.015] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">

              <button
                type="button"
                className="text-sm font-medium text-[#03045E]/45 transition hover:text-[#03045E]"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#03045E] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(3,4,94,0.2)] transition duration-300 hover:-translate-y-0.5 hover:bg-[#0D21A1]"
              >
                Continue

                <span className="transition-transform duration-300 group-hover:translate-x-1">
                  →
                </span>

              </button>

            </div>

          </section>


          {/* SIDE PANEL */}
          <aside>

            <div className="relative min-h-[700px] overflow-hidden rounded-[28px] bg-[#03045E] p-8 text-white shadow-[0_25px_70px_rgba(3,4,94,0.18)] sm:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D21A1]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#0D21A1]/30 blur-3xl" />


              <div className="relative z-10 flex h-full flex-col">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Vistara
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    House rules
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">◌</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Good stays begin with clear expectations.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Simple, transparent rules help guests understand
                    the character of your property before they arrive.
                  </p>

                </div>


                {/* RULE VISUAL */}
                <div className="mt-10 space-y-2">

                  {defaultRules.map((rule) => {

                    const enabled =
                      rules[rule.id as keyof typeof rules];

                    return (
                      <div
                        key={rule.id}
                        className={`flex items-center justify-between rounded-xl border px-4 py-3 transition ${
                          enabled
                            ? "border-white/10 bg-white/10"
                            : "border-white/5 bg-white/[0.025]"
                        }`}
                      >

                        <div className="flex items-center gap-3">

                          <span
                            className={`flex h-7 w-7 items-center justify-center rounded-lg text-[10px] ${
                              enabled
                                ? "bg-white text-[#03045E]"
                                : "bg-white/5 text-white/25"
                            }`}
                          >
                            {enabled ? "✓" : "—"}
                          </span>

                          <span
                            className={`text-xs ${
                              enabled
                                ? "text-white/70"
                                : "text-white/25"
                            }`}
                          >
                            {rule.title}
                          </span>

                        </div>

                        <span className="text-[9px] uppercase tracking-[0.12em] text-white/25">
                          {enabled ? "On" : "Off"}
                        </span>

                      </div>
                    );
                  })}

                </div>


                <div className="mt-auto pt-10">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Hosting essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Transparent house expectations" />

                    <Feature text="Clear arrival instructions" />

                    <Feature text="Better guest alignment" />

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}


/* TIME INPUT */

function TimeInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>

      <label className="mb-3 block text-xs font-medium text-[#03045E]/45">
        {label}
      </label>

      <input
        type="time"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 text-sm font-medium outline-none transition hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
      />

    </div>
  );
}


/* FEATURE */

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
        <span className="text-[10px] text-white">
          ✓
        </span>
      </div>

      <span className="text-sm text-white/65">
        {text}
      </span>

    </div>
  );
}