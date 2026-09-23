"use client";

import { useState } from "react";

export default function PropertyLocationPage() {
  const [country, setCountry] = useState("India");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [locality, setLocality] = useState("");
  const [address, setAddress] = useState("");
  const [pin, setPin] = useState("");

  const handleContinue = () => {
    if (!state || !city || !locality || !address || !pin) {
      alert("Please complete all location details.");
      return;
    }

    console.log({
      country,
      state,
      city,
      locality,
      address,
      pin,
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#03045E]">

      {/* Header */}
      <header className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto flex h-20 max-w-[1500px] items-center justify-between px-6 lg:px-10">

          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#03045E]">
              <span className="font-bold text-white">V</span>
            </div>

            <div>
              <p className="text-sm font-semibold">VISTARA</p>
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

      {/* Main */}
      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">

        {/* Heading */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">

          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#0D21A1]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0D21A1]">
                Create your listing
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Where is your
              <span className="block text-[#0D21A1]">
                property located?
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Help travellers find your property by providing an accurate
              location and address.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              02<span className="text-[#03045E]/20">/10</span>
            </p>
          </div>

        </div>

        {/* Progress */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex min-w-[900px] items-center">

            {[
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
            ].map((step, index) => {

              const active = index === 1;
              const completed = index === 0;

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
                      {completed ? "✓" : String(index + 1).padStart(2, "0")}
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
                        index < 1
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

        {/* Content */}
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">

          {/* Form */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 02
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Property location
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#03045E]/50">
                Enter the location where guests will stay.
              </p>

            </div>

            <div className="px-7 py-8 sm:px-10 sm:py-10">

              {/* Country + State */}
              <div className="grid gap-6 sm:grid-cols-2">

                <Field
                  label="Country"
                  value={country}
                  onChange={setCountry}
                  options={["India", "Nepal", "Bhutan", "Sri Lanka"]}
                />

                <Field
                  label="State / Region"
                  value={state}
                  onChange={setState}
                  placeholder="e.g. Bihar"
                />

              </div>

              {/* City + Locality */}
              <div className="mt-7 grid gap-6 sm:grid-cols-2">

                <Field
                  label="City"
                  value={city}
                  onChange={setCity}
                  placeholder="e.g. Patna"
                />

                <Field
                  label="Locality"
                  value={locality}
                  onChange={setLocality}
                  placeholder="e.g. Boring Road"
                />

              </div>

              {/* Address */}
              <div className="mt-7">

                <label className="mb-3 block text-sm font-semibold">
                  Full address
                </label>

                <textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  rows={4}
                  placeholder="Enter the complete property address..."
                  className="w-full resize-none rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 py-4 text-sm leading-7 outline-none transition placeholder:text-[#03045E]/25 hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />

              </div>

              {/* PIN */}
              <div className="mt-7 max-w-sm">

                <label className="mb-3 block text-sm font-semibold">
                  PIN code
                </label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={pin}
                  onChange={(e) =>
                    setPin(e.target.value.replace(/\D/g, ""))
                  }
                  placeholder="800001"
                  className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 text-sm outline-none transition placeholder:text-[#03045E]/25 hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />

              </div>

              {/* Map Preview */}
              <div className="mt-8 overflow-hidden rounded-[24px] border border-[#03045E]/10">

                <div className="relative h-[280px] bg-[#03045E]/[0.035]">

                  {/* Grid */}
                  <div
                    className="absolute inset-0 opacity-30"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(3,4,94,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(3,4,94,.08) 1px, transparent 1px)",
                      backgroundSize: "32px 32px",
                    }}
                  />

                  {/* Decorative roads */}
                  <div className="absolute left-[12%] top-[58%] h-px w-[80%] rotate-[-12deg] bg-[#0D21A1]/20" />
                  <div className="absolute left-[35%] top-[15%] h-[80%] w-px rotate-[18deg] bg-[#0D21A1]/15" />

                  {/* Location pin */}
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">

                    <div className="absolute -inset-5 animate-pulse rounded-full bg-[#0D21A1]/10" />

                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-[#03045E] shadow-[0_12px_30px_rgba(3,4,94,0.3)]">
                      <span className="text-lg text-white">⌖</span>
                    </div>

                  </div>

                  {/* Map label */}
                  <div className="absolute bottom-5 left-5 rounded-xl border border-white/70 bg-white/90 px-4 py-3 shadow-lg backdrop-blur">
                    <p className="text-xs font-semibold">
                      Property location
                    </p>

                    <p className="mt-1 text-[11px] text-[#03045E]/45">
                      Map location will be confirmed later
                    </p>
                  </div>

                </div>

              </div>

            </div>

            {/* Footer */}
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

          {/* Side Panel */}
          <aside>

            <div className="relative min-h-[560px] overflow-hidden rounded-[28px] bg-[#03045E] p-8 text-white shadow-[0_25px_70px_rgba(3,4,94,0.18)] sm:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D21A1]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#0D21A1]/30 blur-3xl" />

              <div className="relative z-10 flex h-full flex-col">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Vistara
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Location
                  </span>

                </div>

                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-xl">⌖</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Help travellers know where their journey begins.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Accurate location information creates confidence
                    before a guest ever arrives.
                  </p>

                </div>

                <div className="mt-auto pt-16">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Location essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Accurate city and locality" />

                    <Feature text="Complete property address" />

                    <Feature text="Verified map location" />

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


/* Field */

function Field({
  label,
  value,
  onChange,
  placeholder,
  options,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: string[];
}) {
  return (
    <div>

      <label className="mb-3 block text-sm font-semibold">
        {label}
      </label>

      {options ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full appearance-none rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 text-sm outline-none transition hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 text-sm outline-none transition placeholder:text-[#03045E]/25 hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
        />
      )}

    </div>
  );
}


/* Feature */

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