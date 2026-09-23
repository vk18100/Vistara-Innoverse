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

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default function PropertyAvailabilityPage() {
  const today = new Date();

  const [month, setMonth] = useState(today.getMonth());
  const [year, setYear] = useState(today.getFullYear());

  const [selectedDates, setSelectedDates] = useState<number[]>([]);
  const [minStay, setMinStay] = useState("2");
  const [maxStay, setMaxStay] = useState("30");
  const [instantBooking, setInstantBooking] = useState(true);

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const previousMonth = () => {
    if (month === 0) {
      setMonth(11);
      setYear((current) => current - 1);
    } else {
      setMonth((current) => current - 1);
    }
  };

  const nextMonth = () => {
    if (month === 11) {
      setMonth(0);
      setYear((current) => current + 1);
    } else {
      setMonth((current) => current + 1);
    }
  };

  const toggleDate = (day: number) => {
    setSelectedDates((current) =>
      current.includes(day)
        ? current.filter((item) => item !== day)
        : [...current, day]
    );
  };

  const handleContinue = () => {
    if (Number(minStay) <= 0) {
      alert("Minimum stay must be at least 1 night.");
      return;
    }

    console.log({
      selectedDates,
      minStay,
      maxStay,
      instantBooking,
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

              Decide when your
              <span className="block text-[#0D21A1]">
                property is available.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Choose the dates guests can book, define your stay
              preferences and decide how reservations should work.
            </p>

          </div>

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              07<span className="text-[#03045E]/20">/10</span>
            </p>

          </div>

        </div>


        {/* PROGRESS */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 6;
              const completed = index < 6;

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
                        index < 6
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

          {/* AVAILABILITY CARD */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 07
              </p>

              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Availability
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                Select unavailable dates and configure the booking
                preferences for your property.
              </p>

            </div>


            <div className="px-7 py-8 sm:px-10 sm:py-10">

              {/* CALENDAR */}
              <div>

                <div className="mb-6 flex items-center justify-between">

                  <div>

                    <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[#03045E]/35">
                      Availability calendar
                    </p>

                    <h3 className="mt-2 text-xl font-semibold">
                      {months[month]} {year}
                    </h3>

                  </div>

                  <div className="flex gap-2">

                    <button
                      type="button"
                      onClick={previousMonth}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#03045E]/10 text-sm transition hover:border-[#0D21A1]/30 hover:bg-[#0D21A1]/5"
                    >
                      ←
                    </button>

                    <button
                      type="button"
                      onClick={nextMonth}
                      className="flex h-10 w-10 items-center justify-center rounded-full border border-[#03045E]/10 text-sm transition hover:border-[#0D21A1]/30 hover:bg-[#0D21A1]/5"
                    >
                      →
                    </button>

                  </div>

                </div>


                {/* Calendar */}
                <div className="rounded-[24px] border border-[#03045E]/8 p-4 sm:p-6">

                  <div className="grid grid-cols-7 gap-2">

                    {[
                      "Sun",
                      "Mon",
                      "Tue",
                      "Wed",
                      "Thu",
                      "Fri",
                      "Sat",
                    ].map((day) => (

                      <div
                        key={day}
                        className="pb-3 text-center text-[10px] font-semibold uppercase tracking-[0.12em] text-[#03045E]/30"
                      >
                        {day}
                      </div>

                    ))}


                    {Array.from({ length: firstDay }).map((_, index) => (
                      <div key={`empty-${index}`} />
                    ))}


                    {Array.from(
                      { length: daysInMonth },
                      (_, index) => index + 1
                    ).map((day) => {

                      const selected = selectedDates.includes(day);

                      return (
                        <button
                          key={day}
                          type="button"
                          onClick={() => toggleDate(day)}
                          className={`aspect-square rounded-xl text-xs font-medium transition ${
                            selected
                              ? "bg-[#03045E] text-white shadow-[0_8px_20px_rgba(3,4,94,0.18)]"
                              : "text-[#03045E]/60 hover:bg-[#0D21A1]/[0.07] hover:text-[#03045E]"
                          }`}
                        >
                          {day}
                        </button>
                      );
                    })}

                  </div>

                </div>


                <div className="mt-4 flex flex-wrap gap-5">

                  <CalendarLegend
                    label="Available"
                    type="available"
                  />

                  <CalendarLegend
                    label="Blocked"
                    type="blocked"
                  />

                </div>

              </div>


              {/* BOOKING SETTINGS */}
              <div className="mt-12 border-t border-[#03045E]/8 pt-10">

                <div className="mb-6">

                  <h3 className="text-base font-semibold">
                    Booking preferences
                  </h3>

                  <p className="mt-1 text-xs text-[#03045E]/40">
                    Fine-tune how long guests can stay.
                  </p>

                </div>


                <div className="grid gap-5 sm:grid-cols-2">

                  <SettingInput
                    label="Minimum stay"
                    value={minStay}
                    onChange={setMinStay}
                    suffix="nights"
                  />

                  <SettingInput
                    label="Maximum stay"
                    value={maxStay}
                    onChange={setMaxStay}
                    suffix="nights"
                  />

                </div>

              </div>


              {/* INSTANT BOOKING */}
              <div className="mt-8 rounded-2xl border border-[#03045E]/8 bg-[#03045E]/[0.02] p-5">

                <div className="flex items-center justify-between gap-5">

                  <div className="flex gap-4">

                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#03045E] text-white">
                      ⚡
                    </div>

                    <div>

                      <h3 className="text-sm font-semibold">
                        Instant booking
                      </h3>

                      <p className="mt-1 max-w-lg text-xs leading-5 text-[#03045E]/45">
                        Allow eligible guests to book immediately
                        without waiting for manual approval.
                      </p>

                    </div>

                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setInstantBooking(!instantBooking)
                    }
                    className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                      instantBooking
                        ? "bg-[#03045E]"
                        : "bg-[#03045E]/15"
                    }`}
                  >

                    <span
                      className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                        instantBooking
                          ? "left-6"
                          : "left-1"
                      }`}
                    />

                  </button>

                </div>

              </div>


              {/* SELECTION INFO */}
              <div className="mt-8 flex items-center justify-between rounded-2xl bg-[#0D21A1]/[0.045] px-5 py-4">

                <div>

                  <p className="text-xs font-semibold">
                    {selectedDates.length} dates selected
                  </p>

                  <p className="mt-1 text-[11px] text-[#03045E]/40">
                    Selected dates will be marked unavailable.
                  </p>

                </div>

                {selectedDates.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setSelectedDates([])}
                    className="text-xs font-semibold text-[#0D21A1] hover:underline"
                  >
                    Clear
                  </button>
                )}

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

            <div className="relative min-h-[680px] overflow-hidden rounded-[28px] bg-[#03045E] p-8 text-white shadow-[0_25px_70px_rgba(3,4,94,0.18)] sm:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D21A1]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#0D21A1]/30 blur-3xl" />


              <div className="relative z-10 flex h-full flex-col">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Vistara
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Availability
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">◷</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Make every open night count.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Keep your calendar accurate so travellers know
                    exactly when your property is ready for them.
                  </p>

                </div>


                {/* AVAILABILITY STATS */}
                <div className="mt-10 grid grid-cols-2 gap-3">

                  <Stat
                    value={String(selectedDates.length).padStart(2, "0")}
                    label="Blocked"
                  />

                  <Stat
                    value={instantBooking ? "ON" : "OFF"}
                    label="Instant"
                  />

                </div>


                {/* MINI CALENDAR */}
                <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="mb-4 flex items-center justify-between">

                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Calendar signal
                    </span>

                    <span className="text-[10px] text-white/30">
                      Live setup
                    </span>

                  </div>

                  <div className="grid grid-cols-7 gap-1.5">

                    {Array.from({ length: 28 }, (_, index) => {

                      const active =
                        selectedDates.includes(
                          (index % daysInMonth) + 1
                        );

                      return (
                        <div
                          key={index}
                          className={`aspect-square rounded-sm ${
                            active
                              ? "bg-white"
                              : index % 5 === 0
                                ? "bg-white/25"
                                : "bg-white/8"
                          }`}
                        />
                      );
                    })}

                  </div>

                </div>


                <div className="mt-auto pt-10">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Availability essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Accurate booking calendar" />

                    <Feature text="Flexible stay preferences" />

                    <Feature text="Fast reservation experience" />

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


/* SETTING INPUT */

function SettingInput({
  label,
  value,
  onChange,
  suffix,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  suffix: string;
}) {
  return (
    <div>

      <label className="mb-3 block text-sm font-semibold">
        {label}
      </label>

      <div className="relative">

        <input
          type="number"
          min="1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-14 w-full rounded-2xl border border-[#03045E]/10 bg-[#03045E]/[0.025] px-5 pr-20 text-sm font-medium outline-none transition hover:border-[#0D21A1]/20 focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
        />

        <span className="absolute right-5 top-1/2 -translate-y-1/2 text-xs text-[#03045E]/35">
          {suffix}
        </span>

      </div>

    </div>
  );
}


/* CALENDAR LEGEND */

function CalendarLegend({
  label,
  type,
}: {
  label: string;
  type: "available" | "blocked";
}) {
  return (
    <div className="flex items-center gap-2">

      <span
        className={`h-2.5 w-2.5 rounded-full ${
          type === "blocked"
            ? "bg-[#03045E]"
            : "border border-[#03045E]/15 bg-white"
        }`}
      />

      <span className="text-[11px] text-[#03045E]/40">
        {label}
      </span>

    </div>
  );
}


/* STAT */

function Stat({
  value,
  label,
}: {
  value: string;
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