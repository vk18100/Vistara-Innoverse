"use client";

import { useState } from "react";

export default function PropertyPricingPage() {
  const [price, setPrice] = useState("4500");
  const [cleaningFee, setCleaningFee] = useState("500");
  const [serviceFee, setServiceFee] = useState("0");
  const [smartPricing, setSmartPricing] = useState(true);

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

  const basePrice = Number(price) || 0;
  const cleaning = Number(cleaningFee) || 0;
  const service = Number(serviceFee) || 0;
  const guestTotal = basePrice + cleaning + service;

  const handleContinue = () => {
    if (basePrice <= 0) {
      alert("Please enter a valid nightly price.");
      return;
    }

    console.log({
      price: basePrice,
      cleaningFee: cleaning,
      serviceFee: service,
      smartPricing,
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
              Set a price that feels
              <span className="block text-[#0D21A1]">
                right for your stay.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Choose your nightly rate and additional charges. You can
              refine your pricing strategy after your listing goes live.
            </p>

          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              06<span className="text-[#03045E]/20">/10</span>
            </p>
          </div>

        </div>


        {/* PROGRESS */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 5;
              const completed = index < 5;

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
                        index < 5
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

          {/* PRICING CARD */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 06
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Pricing
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                Set the amount guests will see when they book your
                property.
              </p>

            </div>


            <div className="px-7 py-8 sm:px-10 sm:py-10">

              {/* NIGHTLY PRICE */}
              <div>

                <div className="mb-4 flex items-end justify-between gap-4">

                  <div>

                    <label className="text-sm font-semibold">
                      Nightly price
                    </label>

                    <p className="mt-1 text-xs text-[#03045E]/40">
                      Your base price before additional charges.
                    </p>

                  </div>

                  <span className="text-xs font-medium text-[#0D21A1]">
                    INR / night
                  </span>

                </div>


                <div className="relative">

                  <span className="absolute left-5 top-1/2 -translate-y-1/2 text-lg font-semibold text-[#03045E]/40">
                    ₹
                  </span>

                  <input
                    type="number"
                    min="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="h-20 w-full rounded-2xl border border-[#0D21A1]/20 bg-[#0D21A1]/[0.035] pl-12 pr-5 text-3xl font-semibold outline-none transition hover:border-[#0D21A1]/40 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                  />

                </div>

              </div>


              {/* SMART PRICING */}
              <div className="my-8 rounded-2xl border border-[#0D21A1]/15 bg-[#0D21A1]/[0.035] p-5">

                <div className="flex items-start justify-between gap-5">

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#03045E] text-white">
                      ✦
                    </div>

                    <div>

                      <h3 className="text-sm font-semibold">
                        Smart pricing
                      </h3>

                      <p className="mt-1 max-w-lg text-xs leading-5 text-[#03045E]/45">
                        Allow Vistara to suggest pricing based on
                        demand, seasonality and local market signals.
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() => setSmartPricing(!smartPricing)}
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      smartPricing
                        ? "bg-[#03045E]"
                        : "bg-[#03045E]/15"
                    }`}
                  >

                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        smartPricing
                          ? "left-6"
                          : "left-1"
                      }`}
                    />

                  </button>

                </div>

              </div>


              {/* EXTRA FEES */}
              <div>

                <div className="mb-5">

                  <h3 className="text-sm font-semibold">
                    Additional charges
                  </h3>

                  <p className="mt-1 text-xs text-[#03045E]/40">
                    Optional fees shown clearly to guests.
                  </p>

                </div>


                <div className="grid gap-5 sm:grid-cols-2">

                  <PriceInput
                    label="Cleaning fee"
                    value={cleaningFee}
                    onChange={setCleaningFee}
                  />

                  <PriceInput
                    label="Service fee"
                    value={serviceFee}
                    onChange={setServiceFee}
                  />

                </div>

              </div>


              {/* SUMMARY */}
              <div className="mt-10 rounded-[24px] bg-[#03045E] p-6 text-white">

                <div className="flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Guest price preview
                    </p>

                    <p className="mt-2 text-3xl font-semibold">
                      ₹{guestTotal.toLocaleString("en-IN")}
                    </p>

                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/45">
                    per night
                  </span>

                </div>


                <div className="mt-6 space-y-3 border-t border-white/10 pt-5">

                  <SummaryRow
                    label="Base price"
                    value={`₹${basePrice.toLocaleString("en-IN")}`}
                  />

                  <SummaryRow
                    label="Cleaning"
                    value={`₹${cleaning.toLocaleString("en-IN")}`}
                  />

                  <SummaryRow
                    label="Service"
                    value={`₹${service.toLocaleString("en-IN")}`}
                  />

                </div>

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

            <div className="relative min-h-[650px] overflow-hidden rounded-[28px] bg-[#03045E] p-8 text-white shadow-[0_25px_70px_rgba(3,4,94,0.18)] sm:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D21A1]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#0D21A1]/30 blur-3xl" />


              <div className="relative z-10 flex h-full flex-col">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Vistara
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Pricing intelligence
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">₹</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Price with clarity, then grow with intelligence.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Start with a price that reflects your property.
                    Vistara can help you understand pricing signals
                    as your listing evolves.
                  </p>

                </div>


                {/* PRICE VISUAL */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                        Your nightly rate
                      </p>

                      <p className="mt-2 text-3xl font-semibold">
                        ₹{basePrice.toLocaleString("en-IN")}
                      </p>

                    </div>

                    <span className="text-xs text-white/35">
                      INR
                    </span>

                  </div>


                  <div className="mt-6 flex h-16 items-end gap-1">

                    {[35, 45, 32, 55, 48, 68, 58, 78, 65, 85].map(
                      (height, index) => (
                        <div
                          key={index}
                          className={`flex-1 rounded-t-sm ${
                            index === 9
                              ? "bg-white"
                              : "bg-white/15"
                          }`}
                          style={{ height: `${height}%` }}
                        />
                      )
                    )}

                  </div>

                  <p className="mt-3 text-[10px] text-white/30">
                    Illustrative demand trend
                  </p>

                </div>


                <div className="mt-auto pt-10">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Pricing essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Transparent guest pricing" />

                    <Feature text="Flexible additional fees" />

                    <Feature text="Future-ready pricing insights" />

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


/* PRICE INPUT */

function PriceInput({
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

      <label className="mb-3 block text-sm font-semibold">
        {label}
      </label>

      <div className="relative">

        <span className="absolute left-5 top-1/2 -translate-y-1/2 font-medium text-[#03045E]/35">
          ₹
        </span>

        <input
          type="number"
          min="0"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] pl-10 pr-5 text-sm font-medium outline-none transition placeholder:text-[#03045E]/25 hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
        />

      </div>

    </div>
  );
}


/* SUMMARY ROW */

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-xs">

      <span className="text-white/45">
        {label}
      </span>

      <span className="font-medium text-white/75">
        {value}
      </span>

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