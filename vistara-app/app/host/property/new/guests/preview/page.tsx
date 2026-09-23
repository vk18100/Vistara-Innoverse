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

export default function PreviewPage() {
  const [published, setPublished] = useState(false);

  const listing = {
    title: "The Blue Haven",
    location: "Patna, Bihar",
    type: "Entire villa",
    guests: 4,
    bedrooms: 2,
    beds: 2,
    baths: 2,
    price: "₹4,500",
    rating: "4.9",
    reviews: 28,
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
                Final review
              </span>
            </div>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Your property is
              <span className="block text-[#0D21A1]">
                almost ready.
              </span>
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Review how your listing will appear to travellers before
              you publish it on Vistara.
            </p>
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              10<span className="text-[#03045E]/20">/10</span>
            </p>
          </div>

        </div>


        {/* PROGRESS */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 9;

              return (
                <div
                  key={step}
                  className="flex flex-1 items-center"
                >

                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-semibold ${
                        active
                          ? "bg-[#03045E] text-white"
                          : "bg-[#0D21A1] text-white"
                      }`}
                    >
                      {active
                        ? "10"
                        : "✓"}
                    </div>

                    <span
                      className={`hidden text-xs font-medium xl:block ${
                        active
                          ? "text-[#03045E]"
                          : "text-[#0D21A1]"
                      }`}
                    >
                      {step}
                    </span>

                  </div>

                  {index !== 9 && (
                    <div className="mx-3 h-px flex-1 bg-[#0D21A1]/40" />
                  )}

                </div>
              );
            })}

          </div>

        </div>


        {/* CONTENT */}
        <div className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_390px]">

          {/* PREVIEW */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 10
              </p>

              <h2 className="text-2xl font-semibold sm:text-3xl">
                Preview listing
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                This is the experience guests will see when they discover
                your property.
              </p>

            </div>


            <div className="p-6 sm:p-10">

              {/* PROPERTY HERO */}
              <div className="overflow-hidden rounded-[24px] border border-[#03045E]/8">

                <div className="relative flex h-[300px] items-end bg-[#03045E] p-7 sm:h-[380px] sm:p-9">

                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_25%,rgba(13,33,161,0.8),transparent_35%),linear-gradient(135deg,#03045E,#0D21A1)]" />

                  <div className="absolute right-7 top-7 flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs text-white backdrop-blur">
                    ♡ Save
                  </div>

                  <div className="relative z-10">

                    <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.15em] text-white/70">
                      {listing.type}
                    </span>

                    <h3 className="mt-4 text-3xl font-semibold tracking-[-0.03em] text-white sm:text-4xl">
                      {listing.title}
                    </h3>

                    <p className="mt-2 text-sm text-white/55">
                      {listing.location}
                    </p>

                  </div>

                </div>


                {/* PROPERTY DETAILS */}
                <div className="p-6 sm:p-8">

                  <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                    <div>

                      <h4 className="text-xl font-semibold">
                        {listing.title}
                      </h4>

                      <p className="mt-2 text-sm text-[#03045E]/45">
                        {listing.guests} guests · {listing.bedrooms} bedrooms ·{" "}
                        {listing.beds} beds · {listing.baths} baths
                      </p>

                    </div>

                    <div className="text-left sm:text-right">

                      <p className="text-lg font-semibold">
                        {listing.price}
                        <span className="text-xs font-normal text-[#03045E]/40">
                          {" "}
                          night
                        </span>
                      </p>

                      <p className="mt-1 text-xs text-[#03045E]/40">
                        ★ {listing.rating} · {listing.reviews} reviews
                      </p>

                    </div>

                  </div>


                  <div className="my-7 h-px bg-[#03045E]/8" />


                  {/* HIGHLIGHTS */}
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">

                    <PreviewStat
                      value={`${listing.guests}`}
                      label="Guests"
                    />

                    <PreviewStat
                      value={`${listing.bedrooms}`}
                      label="Bedrooms"
                    />

                    <PreviewStat
                      value={`${listing.beds}`}
                      label="Beds"
                    />

                    <PreviewStat
                      value={`${listing.baths}`}
                      label="Baths"
                    />

                  </div>


                  {/* DESCRIPTION */}
                  <div className="mt-8">

                    <p className="text-sm font-semibold">
                      About this place
                    </p>

                    <p className="mt-3 text-sm leading-7 text-[#03045E]/50">
                      A thoughtfully designed stay for travellers looking
                      for comfort, privacy and a memorable experience in
                      the heart of the destination.
                    </p>

                  </div>


                  {/* AMENITIES */}
                  <div className="mt-8">

                    <p className="text-sm font-semibold">
                      What this place offers
                    </p>

                    <div className="mt-4 grid grid-cols-2 gap-3">

                      {[
                        "Wi-Fi",
                        "Kitchen",
                        "Air conditioning",
                        "Parking",
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 rounded-xl border border-[#03045E]/8 px-4 py-3"
                        >
                          <span className="text-xs text-[#0D21A1]">
                            ✓
                          </span>

                          <span className="text-xs text-[#03045E]/60">
                            {item}
                          </span>
                        </div>
                      ))}

                    </div>

                  </div>

                </div>

              </div>


              {/* REVIEW CHECK */}
              <div className="mt-8 rounded-2xl border border-[#0D21A1]/15 bg-[#0D21A1]/[0.035] p-5">

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#03045E] text-white">
                    ✓
                  </div>

                  <div>

                    <h3 className="text-sm font-semibold">
                      Listing looks ready
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-[#03045E]/45">
                      Your essential property information has been
                      completed. You can publish this listing or go back
                      and make changes.
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* FOOTER */}
            <div className="flex flex-col-reverse gap-4 border-t border-[#03045E]/8 bg-[#03045E]/[0.015] px-7 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">

              <button
                type="button"
                className="text-sm font-medium text-[#03045E]/45 hover:text-[#03045E]"
              >
                ← Edit listing
              </button>

              <button
                type="button"
                onClick={() => setPublished(true)}
                className="group inline-flex items-center justify-center gap-3 rounded-2xl bg-[#03045E] px-7 py-4 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(3,4,94,0.2)] transition hover:-translate-y-0.5 hover:bg-[#0D21A1]"
              >
                Publish property

                <span className="transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>

            </div>

          </section>


          {/* SIDE PANEL */}
          <aside>

            <div className="relative min-h-[620px] overflow-hidden rounded-[28px] bg-[#03045E] p-8 text-white shadow-[0_25px_70px_rgba(3,4,94,0.18)] sm:p-10">

              <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#0D21A1]/50 blur-3xl" />

              <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full bg-[#0D21A1]/30 blur-3xl" />


              <div className="relative z-10 flex h-full flex-col">

                <div className="flex items-center justify-between">

                  <span className="text-xs font-semibold uppercase tracking-[0.22em] text-white/45">
                    Vistara
                  </span>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/50">
                    Final review
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">✦</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    One final look before your property goes live.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Review your details carefully. Once published,
                    travellers can discover your property on Vistara.
                  </p>

                </div>


                {/* CHECKLIST */}
                <div className="mt-10 space-y-3">

                  {[
                    "Property information",
                    "Location & rooms",
                    "Amenities & photos",
                    "Pricing & availability",
                    "Rules & guest capacity",
                  ].map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 px-4 py-3"
                    >

                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white text-[10px] text-[#03045E]">
                        ✓
                      </span>

                      <span className="text-xs text-white/65">
                        {item}
                      </span>

                    </div>
                  ))}

                </div>


                <div className="mt-auto pt-10">

                  <div className="rounded-2xl border border-white/10 bg-white/5 p-5">

                    <p className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                      Listing status
                    </p>

                    <div className="mt-3 flex items-center justify-between">

                      <span className="text-sm font-medium">
                        {published ? "Published" : "Ready to publish"}
                      </span>

                      <span
                        className={`h-2 w-2 rounded-full ${
                          published
                            ? "bg-white"
                            : "bg-[#0D21A1]"
                        }`}
                      />

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>

      </div>


      {/* SUCCESS MODAL */}
      {published && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#03045E]/50 p-6 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-[28px] bg-white p-8 text-center shadow-2xl">

            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#03045E] text-xl text-white">
              ✓
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-[#0D21A1]">
              Vistara
            </p>

            <h2 className="mt-3 text-2xl font-semibold">
              Your property is live.
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#03045E]/50">
              The listing has been prepared successfully and is ready
              for travellers to discover.
            </p>

            <button
              onClick={() => setPublished(false)}
              className="mt-7 w-full rounded-2xl bg-[#03045E] px-6 py-4 text-sm font-semibold text-white hover:bg-[#0D21A1]"
            >
              Done
            </button>

          </div>

        </div>
      )}

    </main>
  );
}


function PreviewStat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div className="rounded-xl border border-[#03045E]/8 bg-[#03045E]/[0.02] p-4">

      <p className="text-lg font-semibold">
        {value}
      </p>

      <p className="mt-1 text-[10px] uppercase tracking-[0.12em] text-[#03045E]/35">
        {label}
      </p>

    </div>
  );
}