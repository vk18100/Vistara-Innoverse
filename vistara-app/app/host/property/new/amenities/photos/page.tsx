"use client";

import { useState } from "react";

export default function PropertyPhotosPage() {
  const [photos, setPhotos] = useState<string[]>([]);

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

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const newPhotos = Array.from(files).map((file) =>
      URL.createObjectURL(file)
    );

    setPhotos((current) => [...current, ...newPhotos].slice(0, 20));
  };

  const removePhoto = (index: number) => {
    setPhotos((current) => current.filter((_, i) => i !== index));
  };

  const handleContinue = () => {
    if (photos.length < 5) {
      alert("Please add at least 5 photos.");
      return;
    }

    console.log({
      photos,
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

              Show guests what makes
              <span className="block text-[#0D21A1]">
                your place worth remembering.
              </span>

            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#03045E]/50 sm:text-base">
              Great photography gives travellers a feeling for the
              property before they arrive. Add your best images first.
            </p>

          </div>

          <div>

            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#03045E]/35">
              Current step
            </p>

            <p className="mt-1 text-3xl font-semibold">
              05<span className="text-[#03045E]/20">/10</span>
            </p>

          </div>

        </div>


        {/* PROGRESS */}
        <div className="mb-12 overflow-x-auto pb-2">

          <div className="flex min-w-[900px] items-center">

            {steps.map((step, index) => {

              const active = index === 4;
              const completed = index < 4;

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
                        index < 4
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


          {/* PHOTO CARD */}
          <section className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_70px_rgba(3,4,94,0.08)]">

            <div className="border-b border-[#03045E]/8 px-7 py-8 sm:px-10">

              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">

                <div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                    Step 05
                  </p>

                  <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                    Property photos
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-6 text-[#03045E]/50">
                    Upload at least 5 high-quality photos. Your first
                    image will become the cover of your listing.
                  </p>

                </div>

                <div className="rounded-full bg-[#03045E]/5 px-4 py-2">

                  <span className="text-xs font-semibold">
                    {photos.length} / 20 photos
                  </span>

                </div>

              </div>

            </div>


            <div className="px-7 py-8 sm:px-10 sm:py-10">

              {/* Upload */}
              <label
                htmlFor="photos"
                className="group relative flex min-h-[260px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-[24px] border border-dashed border-[#0D21A1]/30 bg-[#0D21A1]/[0.025] px-6 text-center transition duration-300 hover:border-[#0D21A1] hover:bg-[#0D21A1]/[0.05]"
              >

                <input
                  id="photos"
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={(e) => handleFiles(e.target.files)}
                />

                <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#03045E] text-2xl text-white shadow-[0_12px_30px_rgba(3,4,94,0.18)] transition duration-300 group-hover:-translate-y-1">
                  ↑
                </div>

                <h3 className="text-base font-semibold">
                  Drop your photos here
                </h3>

                <p className="mt-2 text-sm text-[#03045E]/40">
                  or click to browse your device
                </p>

                <span className="mt-5 rounded-full border border-[#03045E]/10 bg-white px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-[#03045E]/45">
                  JPG · PNG · WEBP
                </span>

              </label>


              {/* Photo Grid */}
              {photos.length > 0 && (

                <div className="mt-10">

                  <div className="mb-5 flex items-center justify-between">

                    <div>

                      <h3 className="text-sm font-semibold">
                        Your gallery
                      </h3>

                      <p className="mt-1 text-xs text-[#03045E]/40">
                        Drag-and-drop ordering can be added next.
                      </p>

                    </div>

                    <span className="text-xs font-medium text-[#0D21A1]">
                      {photos.length} uploaded
                    </span>

                  </div>


                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">

                    {photos.map((photo, index) => (

                      <div
                        key={photo}
                        className={`group relative overflow-hidden rounded-2xl border border-[#03045E]/10 bg-[#03045E]/5 ${
                          index === 0
                            ? "sm:col-span-2 sm:row-span-2"
                            : ""
                        }`}
                      >

                        <img
                          src={photo}
                          alt={`Property photo ${index + 1}`}
                          className={`h-full w-full object-cover ${
                            index === 0
                              ? "aspect-square"
                              : "aspect-[4/3]"
                          }`}
                        />

                        {/* Cover */}
                        {index === 0 && (
                          <div className="absolute left-3 top-3 rounded-full bg-[#03045E] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-white">
                            Cover photo
                          </div>
                        )}

                        {/* Remove */}
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-sm text-[#03045E] opacity-0 shadow-lg backdrop-blur transition group-hover:opacity-100"
                        >
                          ×
                        </button>

                      </div>

                    ))}

                  </div>

                </div>

              )}


              {/* Tips */}
              <div className="mt-10 grid gap-3 sm:grid-cols-3">

                <PhotoTip
                  number="01"
                  title="Bright"
                  text="Use natural light whenever possible."
                />

                <PhotoTip
                  number="02"
                  title="Wide"
                  text="Show the full room and surroundings."
                />

                <PhotoTip
                  number="03"
                  title="Authentic"
                  text="Keep photos realistic and current."
                />

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
                    Visual story
                  </span>

                </div>


                <div className="mt-20">

                  <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/10">
                    <span className="text-lg">◈</span>
                  </div>

                  <h3 className="max-w-xs text-3xl font-semibold leading-tight tracking-[-0.03em]">
                    Let the property speak for itself.
                  </h3>

                  <p className="mt-5 max-w-sm text-sm leading-7 text-white/55">
                    Your photos are often the first emotional connection
                    a traveller makes with your property.
                  </p>

                </div>


                {/* Photo counter */}
                <div className="mt-10 rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur">

                  <div className="flex items-end justify-between">

                    <div>

                      <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/35">
                        Gallery progress
                      </p>

                      <p className="mt-2 text-4xl font-semibold">
                        {String(photos.length).padStart(2, "0")}
                      </p>

                    </div>

                    <span className="pb-1 text-xs text-white/35">
                      / 20
                    </span>

                  </div>


                  <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/10">

                    <div
                      className="h-full rounded-full bg-white transition-all duration-500"
                      style={{
                        width: `${Math.min(
                          (photos.length / 20) * 100,
                          100
                        )}%`,
                      }}
                    />

                  </div>

                </div>


                <div className="mt-auto pt-10">

                  <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/35">
                    Photography essentials
                  </p>

                  <div className="space-y-4">

                    <Feature text="Show the property honestly" />

                    <Feature text="Lead with your strongest image" />

                    <Feature text="Capture different spaces" />

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


/* PHOTO TIP */

function PhotoTip({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#03045E]/8 bg-[#03045E]/[0.02] p-4">

      <span className="text-[10px] font-semibold tracking-[0.15em] text-[#0D21A1]">
        {number}
      </span>

      <h4 className="mt-3 text-sm font-semibold">
        {title}
      </h4>

      <p className="mt-1 text-xs leading-5 text-[#03045E]/40">
        {text}
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