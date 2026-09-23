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

export default function GuestsPage() {
  const [guests, setGuests] = useState(4);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(1);
  const [infants, setInfants] = useState(0);
  const [pets, setPets] = useState(0);

  const changeValue = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number,
    min = 0
  ) => {
    setter(Math.max(min, value));
  };

  const totalGuests = adults + children;

  const handleContinue = () => {
    if (adults < 1) {
      alert("At least one adult is required.");
      return;
    }

    console.log({
      maxGuests: guests,
      adults,
      children,
      infants,
      pets,
    });
  };

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      {/* HEADER */}
      <header className="border-b border-[#03045E]/10">
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

          <button className="rounded-full border border-[#03045E]/10 px-4 py-2 text-sm text-[#03045E]/60 hover:bg-[#03045E]/5">
            Exit
          </button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-6 py-10 lg:px-10 lg:py-14">
        {/* TITLE */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="h-2 w-2 rounded-full bg-[#0D21A1]" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0D21A1]">
                Create your listing
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Define who your
              <span className="block text-[#0D21A1]">
                property is made for.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Set your guest capacity so travellers know exactly how many
              people your property can comfortably accommodate.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              09<span className="text-[#03045E]/20">/10</span>
            </p>
          </div>
        </div>

        {/* PROGRESS */}
        <div className="mb-12 overflow-x-auto pb-2">
          <div className="flex min-w-[900px] items-center">
            {steps.map((step, index) => {
              const active = index === 8;
              const completed = index < 8;

              return (
                <div key={step} className="flex flex-1 items-center">
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
                        index < 8
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
          {/* MAIN CARD */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">
            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 09
              </p>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Guest capacity
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                Tell guests how many people can comfortably stay at your
                property.
              </p>
            </div>

            <div className="px-7 py-8 sm:px-10 sm:py-10">
              {/* MAX GUESTS */}
              <div className="rounded-[24px] bg-[#03045E] p-6 text-white sm:p-7">
                <div className="flex items-start justify-between gap-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/40">
                      Maximum capacity
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      How many guests can stay?
                    </h3>

                    <p className="mt-2 text-xs leading-5 text-white/45">
                      Include adults and children who can comfortably
                      sleep at the property.
                    </p>
                  </div>

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-xl">
                    {guests}
                  </div>
                </div>

                <div className="mt-7 flex items-center justify-between rounded-2xl bg-white/5 p-3">
                  <button
                    type="button"
                    onClick={() =>
                      changeValue(setGuests, guests - 1, 1)
                    }
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg hover:bg-white/15"
                  >
                    −
                  </button>

                  <div className="text-center">
                    <p className="text-3xl font-semibold">{guests}</p>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-white/35">
                      guests
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setGuests(guests + 1)}
                    className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-lg hover:bg-white/15"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* GUEST BREAKDOWN */}
              <div className="mt-10">
                <div className="mb-6">
                  <h3 className="text-base font-semibold">
                    Guest breakdown
                  </h3>

                  <p className="mt-1 text-xs text-[#03045E]/40">
                    Help guests understand who the space is suitable for.
                  </p>
                </div>

                <div className="space-y-3">
                  <GuestCounter
                    title="Adults"
                    description="Age 13+"
                    value={adults}
                    onDecrease={() =>
                      changeValue(setAdults, adults - 1, 1)
                    }
                    onIncrease={() => setAdults(adults + 1)}
                  />

                  <GuestCounter
                    title="Children"
                    description="Age 2–12"
                    value={children}
                    onDecrease={() =>
                      changeValue(setChildren, children - 1)
                    }
                    onIncrease={() => setChildren(children + 1)}
                  />

                  <GuestCounter
                    title="Infants"
                    description="Under 2"
                    value={infants}
                    onDecrease={() =>
                      changeValue(setInfants, infants - 1)
                    }
                    onIncrease={() => setInfants(infants + 1)}
                  />

                  <GuestCounter
                    title="Pets"
                    description="Pets allowed"
                    value={pets}
                    onDecrease={() => changeValue(setPets, pets - 1)}
                    onIncrease={() => setPets(pets + 1)}
                  />
                </div>
              </div>

              {/* CAPACITY CHECK */}
              <div
                className={`mt-8 rounded-2xl border p-5 ${
                  totalGuests <= guests
                    ? "border-[#0D21A1]/15 bg-[#0D21A1]/[0.035]"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold">
                      Current guest setup
                    </p>

                    <p className="mt-1 text-xs text-[#03045E]/40">
                      {totalGuests} guests selected out of {guests}
                    </p>
                  </div>

                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-full ${
                      totalGuests <= guests
                        ? "bg-[#03045E] text-white"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {totalGuests <= guests ? "✓" : "!"}
                  </span>
                </div>
              </div>

              {/* NOTE */}
              <div className="mt-8 rounded-2xl border border-[#03045E]/8 bg-[#03045E]/[0.02] p-5">
                <p className="text-xs font-semibold">
                  Hosting note
                </p>

                <p className="mt-2 text-xs leading-6 text-[#03045E]/45">
                  Capacity should reflect the real sleeping arrangements
                  and usable space of your property. Guests will see this
                  information before booking.
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex flex-col-reverse gap-4 border-t border-[#03045E]/8 bg-[#03045E]/[0.015] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
              <button
                type="button"
                className="text-sm font-medium text-[#03045E]/45 hover:text-[#03045E]"
              >
                ← Back
              </button>

              <button
                type="button"
                onClick={handleContinue}
                disabled={totalGuests > guests}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#03045E] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(3,4,94,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-40"
              >
                Continue

                <span className="transition-transform group-hover:translate-x-1">
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
                    Guest profile
                  </span>
                </div>

                <div className="mt-20">
                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">◎</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Give every traveller the right expectation.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    A clear capacity makes your property easier to
                    understand and helps guests choose with confidence.
                  </p>
                </div>

                {/* VISUAL */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                        Guest capacity
                      </p>

                      <p className="mt-2 text-3xl font-semibold">
                        {guests}
                      </p>
                    </div>

                    <span className="text-xs text-white/30">
                      people
                    </span>
                  </div>

                  <div className="mt-6 grid grid-cols-4 gap-2">
                    {Array.from({ length: Math.min(guests, 12) }).map(
                      (_, index) => (
                        <div
                          key={index}
                          className={`flex aspect-square items-center justify-center rounded-xl ${
                            index < totalGuests
                              ? "bg-white text-[#03045E]"
                              : "bg-white/10 text-white/20"
                          }`}
                        >
                          <span className="text-xs">●</span>
                        </div>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-auto pt-10">
                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Guest essentials
                  </p>

                  <div className="space-y-4">
                    <Feature text="Accurate property capacity" />
                    <Feature text="Clear guest expectations" />
                    <Feature text="Comfort-focused stays" />
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

function GuestCounter({
  title,
  description,
  value,
  onDecrease,
  onIncrease,
}: {
  title: string;
  description: string;
  value: number;
  onDecrease: () => void;
  onIncrease: () => void;
}) {
  return (
    <div className="flex items-center justify-between rounded-2xl border border-[#03045E]/8 p-4">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs text-[#03045E]/40">
          {description}
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onDecrease}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#03045E]/10 text-sm hover:bg-[#03045E]/5"
        >
          −
        </button>

        <span className="w-5 text-center text-sm font-semibold">
          {value}
        </span>

        <button
          type="button"
          onClick={onIncrease}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#03045E]/10 text-sm hover:bg-[#03045E]/5"
        >
          +
        </button>
      </div>
    </div>
  );
}

function Feature({ text }: { text: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10">
        <span className="text-[10px]">✓</span>
      </div>

      <span className="text-sm text-white/65">{text}</span>
    </div>
  );
}