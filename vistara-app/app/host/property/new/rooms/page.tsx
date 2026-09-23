"use client";

import { useState } from "react";

const initialValues = {
  guests: 2,
  bedrooms: 1,
  beds: 1,
  bathrooms: 1,
  livingRoom: 1,
  size: "",
};

export default function PropertyRoomsPage() {
  const [values, setValues] = useState(initialValues);

  const updateValue = (key: keyof typeof values, amount: number) => {
    if (key === "size") return;

    setValues((prev) => ({
      ...prev,
      [key]: Math.max(0, (prev[key] as number) + amount),
    }));
  };

  const handleContinue = () => {
    if (!values.size) {
      alert("Please enter the property size.");
      return;
    }

    console.log(values);
  };

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
              Tell us about the
              <span className="block text-[#0D21A1]">
                space itself.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Help guests understand how much space your property offers
              and how many people it can comfortably accommodate.
            </p>

          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              03<span className="text-[#03045E]/20">/10</span>
            </p>
          </div>

        </div>


        {/* Progress */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 2;
              const completed = index < 2;

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
                        index < 2
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

          {/* Main Card */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 03
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Rooms & guests
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                Set the capacity and sleeping arrangements of your property.
              </p>

            </div>


            <div className="px-7 py-8 sm:px-10 sm:py-10">

              {/* Guests */}
              <Counter
                label="Maximum guests"
                description="How many guests can comfortably stay?"
                value={values.guests}
                onDecrease={() => updateValue("guests", -1)}
                onIncrease={() => updateValue("guests", 1)}
              />

              <Divider />

              {/* Bedrooms */}
              <Counter
                label="Bedrooms"
                description="Private sleeping rooms available to guests."
                value={values.bedrooms}
                onDecrease={() => updateValue("bedrooms", -1)}
                onIncrease={() => updateValue("bedrooms", 1)}
              />

              <Divider />

              {/* Beds */}
              <Counter
                label="Beds"
                description="Include all beds available in the property."
                value={values.beds}
                onDecrease={() => updateValue("beds", -1)}
                onIncrease={() => updateValue("beds", 1)}
              />

              <Divider />

              {/* Bathrooms */}
              <Counter
                label="Bathrooms"
                description="Total bathrooms guests can use."
                value={values.bathrooms}
                onDecrease={() => updateValue("bathrooms", -1)}
                onIncrease={() => updateValue("bathrooms", 1)}
              />

              <Divider />

              {/* Living Room */}
              <Counter
                label="Living rooms"
                description="Shared living or lounge spaces."
                value={values.livingRoom}
                onDecrease={() => updateValue("livingRoom", -1)}
                onIncrease={() => updateValue("livingRoom", 1)}
              />

              <Divider />

              {/* Property Size */}
              <div className="pt-2">

                <label className="mb-3 block text-sm font-semibold">
                  Property size
                </label>

                <div className="flex max-w-md items-center gap-3">

                  <input
                    type="number"
                    min="0"
                    value={values.size}
                    onChange={(e) =>
                      setValues((prev) => ({
                        ...prev,
                        size: e.target.value,
                      }))
                    }
                    placeholder="1200"
                    className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 text-sm outline-none transition placeholder:text-[#03045E]/25 hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                  />

                  <div className="flex h-14 shrink-0 items-center rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 text-sm font-medium">
                    sq ft
                  </div>

                </div>

                <p className="mt-2 text-xs text-[#03045E]/35">
                  Approximate usable property area.
                </p>

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
                    Space
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">⌂</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Give guests a clear sense of your space.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Accurate capacity and room information helps guests
                    choose a stay that feels right for them.
                  </p>

                </div>


                {/* Visual Stats */}
                <div className="mt-10 grid grid-cols-2 gap-3">

                  <Stat
                    value={values.guests}
                    label="Guests"
                  />

                  <Stat
                    value={values.bedrooms}
                    label="Bedrooms"
                  />

                </div>


                <div className="mt-auto pt-10">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Space essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Guest capacity" />

                    <Feature text="Sleeping arrangements" />

                    <Feature text="Property dimensions" />

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


/* Counter */

function Counter({
  label,
  description,
  value,
  onDecrease,
  onIncrease,
}: {
  label: string;
  description: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex flex-col gap-5 py-2 sm:flex-row sm:items-center sm:justify-between">

      <div>
        <h3 className="text-sm font-semibold">
          {label}
        </h3>

        <p className="mt-1 text-xs leading-5 text-[#03045E]/40">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">

        <button
          type="button"
          onClick={onDecrease}
          disabled={value <= 0}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#03045E]/10 text-lg text-[#03045E]/60 transition hover:border-[#0D21A1]/30 hover:bg-[#0D21A1]/5 disabled:cursor-not-allowed disabled:opacity-30"
        >
          −
        </button>

        <span className="flex w-10 justify-center text-base font-semibold">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#03045E] text-lg text-white transition hover:bg-[#0D21A1]"
        >
          +
        </button>

      </div>

    </div>
  );
}


/* Divider */

function Divider() {
  return (
    <div className="my-7 h-px bg-[#03045E]/7" />
  );
}


/* Stat */

function Stat({
  value,
  label,
}: {
  value: number;
  label: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur">
      <p className="text-2xl font-semibold">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-white/40">
        {label}
      </p>
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