"use client";

import { useState } from "react";

const amenityGroups = [
  {
    title: "Essentials",
    description: "Everyday comforts guests expect.",
    items: [
      "Wi-Fi",
      "Air conditioning",
      "Heating",
      "Hot water",
      "Workspace",
      "TV",
    ],
  },
  {
    title: "Kitchen & dining",
    description: "Everything needed for meals and drinks.",
    items: [
      "Kitchen",
      "Refrigerator",
      "Microwave",
      "Coffee maker",
      "Dining area",
      "Cookware",
    ],
  },
  {
    title: "Outdoor",
    description: "Spaces to relax and enjoy the surroundings.",
    items: [
      "Garden",
      "Balcony",
      "Terrace",
      "Outdoor seating",
      "BBQ area",
      "Fire pit",
    ],
  },
  {
    title: "Wellness & leisure",
    description: "Features that make the stay more memorable.",
    items: [
      "Swimming pool",
      "Hot tub",
      "Gym",
      "Spa",
      "Games room",
      "Yoga space",
    ],
  },
  {
    title: "Services",
    description: "Additional services available to guests.",
    items: [
      "Parking",
      "Housekeeping",
      "Airport transfer",
      "Laundry",
      "Breakfast",
      "Room service",
    ],
  },
];

export default function PropertyAmenitiesPage() {
  const [selected, setSelected] = useState<string[]>([
    "Wi-Fi",
    "Air conditioning",
  ]);

  const toggleAmenity = (amenity: string) => {
    setSelected((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  const handleContinue = () => {
    if (selected.length === 0) {
      alert("Please select at least one amenity.");
      return;
    }

    console.log({
      amenities: selected,
    });
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

              What makes your stay
              <span className="block text-[#0D21A1]">
                feel special?
              </span>

            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Select the amenities and facilities guests can expect
              when they stay at your property.
            </p>

          </div>

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              04<span className="text-[#03045E]/20">/10</span>
            </p>

          </div>

        </div>


        {/* Progress */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 3;
              const completed = index < 3;

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
                        index < 3
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

          {/* Amenities Card */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                <div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                    Step 04
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Amenities
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                    Select everything that is available at your property.
                  </p>

                </div>

                <div className="shrink-0 rounded-full bg-[#03045E]/5 px-4 py-2">

                  <span className="text-xs font-semibold text-[#03045E]">
                    {selected.length} selected
                  </span>

                </div>

              </div>

            </div>


            <div className="px-7 py-8 sm:px-10 sm:py-10">

              <div className="space-y-10">

                {amenityGroups.map((group) => (

                  <div key={group.title}>

                    <div className="mb-5">

                      <h3 className="text-base font-semibold">
                        {group.title}
                      </h3>

                      <p className="mt-1 text-xs text-[#03045E]/40">
                        {group.description}
                      </p>

                    </div>


                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

                      {group.items.map((amenity) => {

                        const isSelected = selected.includes(amenity);

                        return (
                          <button
                            key={amenity}
                            type="button"
                            onClick={() => toggleAmenity(amenity)}
                            className={`group flex min-h-[76px] items-center gap-4 rounded-2xl border p-4 text-left transition duration-200 ${
                              isSelected
                                ? "border-[#0D21A1] bg-[#0D21A1]/[0.06] shadow-[0_8px_25px_rgba(13,33,161,0.08)]"
                                : "border-[#03045E]/10 bg-white hover:-translate-y-0.5 hover:border-[#0D21A1]/30 hover:bg-[#0D21A1]/[0.025]"
                            }`}
                          >

                            <span
                              className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition ${
                                isSelected
                                  ? "bg-[#03045E] text-white"
                                  : "bg-[#03045E]/5 text-[#03045E]/45 group-hover:bg-[#0D21A1]/10 group-hover:text-[#0D21A1]"
                              }`}
                            >
                              {isSelected ? "✓" : "+"}
                            </span>

                            <span
                              className={`text-sm font-medium ${
                                isSelected
                                  ? "text-[#03045E]"
                                  : "text-[#03045E]/65"
                              }`}
                            >
                              {amenity}
                            </span>

                          </button>
                        );
                      })}

                    </div>

                  </div>

                ))}

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


          {/* Premium Side Panel */}
          <aside>

            <div className="relative min-h-[600px] overflow-hidden rounded-[28px] bg-[#03045E] p-8 text-white shadow-[0_25px_70px_rgba(3,4,94,0.18)] sm:p-10">

              {/* Glow */}
              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D21A1]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#0D21A1]/30 blur-3xl" />


              <div className="relative z-10 flex h-full flex-col">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Vistara
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Experience
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">✦</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Small details can define an entire stay.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Give guests a transparent view of the comforts,
                    conveniences and experiences available to them.
                  </p>

                </div>


                {/* Selected Preview */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="mb-4 flex items-center justify-between">

                    <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                      Selected
                    </span>

                    <span className="text-xs font-semibold text-white">
                      {selected.length}
                    </span>

                  </div>

                  <div className="flex flex-wrap gap-2">

                    {selected.slice(0, 5).map((item) => (

                      <span
                        key={item}
                        className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/65"
                      >
                        {item}
                      </span>

                    ))}

                    {selected.length > 5 && (
                      <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-white/40">
                        +{selected.length - 5} more
                      </span>
                    )}

                  </div>

                </div>


                <div className="mt-auto pt-10">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Experience essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Everyday essentials" />

                    <Feature text="Comfort & convenience" />

                    <Feature text="Memorable experiences" />

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