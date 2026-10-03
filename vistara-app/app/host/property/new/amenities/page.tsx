"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Coffee,
  Dumbbell,
  Home,
  Loader2,
  MapPin,
  ParkingCircle,
  ShieldCheck,
  Sparkles,
  Tv,
  Utensils,
  Wifi,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";

/* -------------------------------------------------------------------------- */
/* TYPES                                                                       */
/* -------------------------------------------------------------------------- */

type AmenityGroup = {
  title: string;
  description: string;
  icon: React.ReactNode;
  items: string[];
};

/* -------------------------------------------------------------------------- */
/* AMENITIES                                                                   */
/* -------------------------------------------------------------------------- */

const amenityGroups: AmenityGroup[] = [
  {
    title: "Essentials",
    description: "Everyday comforts guests expect.",
    icon: <Home size={18} />,
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
    icon: <Utensils size={18} />,
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
    icon: <MapPin size={18} />,
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
    icon: <Dumbbell size={18} />,
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
    icon: <Sparkles size={18} />,
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

/* -------------------------------------------------------------------------- */
/* STEPS                                                                       */
/* -------------------------------------------------------------------------- */

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

/* -------------------------------------------------------------------------- */
/* PAGE                                                                        */
/* -------------------------------------------------------------------------- */

export default function PropertyAmenitiesPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = params.id as string;

  const [selected, setSelected] = useState<string[]>([
    "Wi-Fi",
    "Air conditioning",
  ]);

  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const selectedByGroup = useMemo(() => {
    return amenityGroups.map((group) => ({
      ...group,
      selectedCount: group.items.filter((item) =>
        selected.includes(item),
      ).length,
    }));
  }, [selected]);

  /* ------------------------------------------------------------------------ */
  /* TOGGLE                                                                   */
  /* ------------------------------------------------------------------------ */

  function toggleAmenity(amenity: string) {
    setSelected((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity],
    );

    setError("");
  }

  /* ------------------------------------------------------------------------ */
  /* SELECT / CLEAR                                                           */
  /* ------------------------------------------------------------------------ */

  function selectAll() {
    setSelected(
      amenityGroups.flatMap((group) => group.items),
    );

    setError("");
  }

  function clearAll() {
    setSelected([]);
  }

  /* ------------------------------------------------------------------------ */
  /* CONTINUE                                                                  */
  /* ------------------------------------------------------------------------ */

  async function handleContinue() {
    if (selected.length === 0) {
      setError(
        "Please select at least one amenity before continuing.",
      );
      return;
    }

    try {
      setSaving(true);
      setError("");

      /*
       * Production API:
       *
       * await fetch(
       *   `/api/host/properties/${propertyId}/amenities`,
       *   {
       *     method: "PUT",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify({
       *       amenities: selected,
       *     }),
       *   },
       * );
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700),
      );

      router.push(
        `/host/property/new/${propertyId}/photos`,
      );
    } catch {
      setError(
        "Something went wrong while saving your amenities.",
      );
    } finally {
      setSaving(false);
    }
  }

  /* ------------------------------------------------------------------------ */
  /* RENDER                                                                    */
  /* ------------------------------------------------------------------------ */

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* ------------------------------------------------------------------ */}
      {/* HEADER                                                             */}
      {/* ------------------------------------------------------------------ */}

      <header className="sticky top-0 z-50 border-b border-black/8 bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
          {/* BRAND */}
          <Link
            href="/host"
            className="flex items-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#18181B]">
              <span className="font-serif text-lg font-bold text-white">
                V
              </span>
            </div>

            <div className="hidden sm:block">
              <p className="text-sm font-bold tracking-tight">
                VISTARA
              </p>

              <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-[#A8A29E]">
                Host Studio
              </p>
            </div>
          </Link>

          {/* STEP */}
          <div className="hidden text-center md:block">
            <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
              Create your listing
            </p>

            <p className="mt-0.5 text-xs font-semibold">
              Amenities
            </p>
          </div>

          {/* EXIT */}
          <Link
            href="/host"
            className="rounded-full border border-black/8 bg-white px-4 py-2 text-xs font-semibold text-[#57534E] transition hover:bg-[#F5F2EB]"
          >
            Exit
          </Link>
        </div>
      </header>

      {/* ------------------------------------------------------------------ */}
      {/* MAIN                                                               */}
      {/* ------------------------------------------------------------------ */}

      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        {/* TOP HEADING */}
        <section className="flex flex-col justify-between gap-7 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-2.5">
              <span className="h-2 w-2 rounded-full bg-[#D9A441]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-[#9A711E]">
                Create your listing
              </span>
            </div>

            <h1 className="font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              What makes your stay
              <span className="block text-[#9A711E]">
                feel special?
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-sm leading-7 text-[#78716C] sm:text-base">
              Select everything available at your property.
              Guests use these details to understand the
              comfort, convenience and experience you offer.
            </p>
          </div>

          {/* CURRENT STEP */}
          <div className="lg:text-right">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#A8A29E]">
              Current step
            </p>

            <p className="mt-1 font-serif text-3xl font-semibold">
              04
              <span className="text-[#CFC9BE]">
                /10
              </span>
            </p>
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* PROGRESS                                                         */}
        {/* ---------------------------------------------------------------- */}

        <section className="mt-9 overflow-x-auto pb-3">
          <div className="flex min-w-[820px] items-center">
            {steps.map((step, index) => {
              const active = index === 3;
              const completed = index < 3;

              return (
                <div
                  key={step}
                  className="flex flex-1 items-center"
                >
                  <div className="flex items-center gap-2.5">
                    <div
                      className={[
                        "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-bold transition",
                        active
                          ? "bg-[#D9A441] text-[#18181B] shadow-[0_8px_24px_rgba(217,164,65,0.25)]"
                          : completed
                            ? "bg-[#E9DFC5] text-[#705316]"
                            : "border border-black/10 bg-white text-[#A8A29E]",
                      ].join(" ")}
                    >
                      {completed ? (
                        <Check size={13} />
                      ) : (
                        String(index + 1).padStart(2, "0")
                      )}
                    </div>

                    <span
                      className={[
                        "hidden text-[11px] font-semibold xl:block",
                        active
                          ? "text-[#18181B]"
                          : completed
                            ? "text-[#80621F]"
                            : "text-[#A8A29E]",
                      ].join(" ")}
                    >
                      {step}
                    </span>
                  </div>

                  {index !== steps.length - 1 && (
                    <div
                      className={[
                        "mx-2 h-px flex-1",
                        index < 3
                          ? "bg-[#D9A441]/50"
                          : "bg-black/8",
                      ].join(" ")}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ---------------------------------------------------------------- */}
        {/* ERROR                                                            */}
        {/* ---------------------------------------------------------------- */}

        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E4B5AD] bg-[#FFF3F0] p-4 text-sm text-[#82443B]">
            <X
              size={17}
              className="mt-0.5 shrink-0"
            />

            <div className="flex-1">
              <p className="font-bold">
                Please check your selection
              </p>

              <p className="mt-1 text-xs">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error"
            >
              <X size={15} />
            </button>
          </div>
        )}

        {/* ---------------------------------------------------------------- */}
        {/* CONTENT GRID                                                     */}
        {/* ---------------------------------------------------------------- */}

        <div className="mt-8 grid gap-7 xl:grid-cols-[minmax(0,1fr)_360px]">
          {/* ============================================================ */}
          {/* AMENITIES CARD                                               */}
          {/* ============================================================ */}

          <section className="overflow-hidden rounded-[28px] border border-black/8 bg-white shadow-[0_18px_60px_rgba(24,24,27,0.05)]">
            {/* CARD HEADER */}
            <div className="border-b border-black/7 px-6 py-7 sm:px-9">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
                    Step 04
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold sm:text-3xl">
                    Amenities
                  </h2>

                  <p className="mt-2 max-w-xl text-sm leading-6 text-[#78716C]">
                    Choose all the amenities and facilities
                    guests can expect during their stay.
                  </p>
                </div>

                {/* SELECTED COUNT */}
                <div className="flex items-center gap-2 self-start rounded-full bg-[#FFF8E8] px-4 py-2 sm:self-auto">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#D9A441] text-[10px] font-bold">
                    {selected.length}
                  </span>

                  <span className="text-xs font-bold text-[#6D531C]">
                    selected
                  </span>
                </div>
              </div>

              {/* QUICK ACTIONS */}
              <div className="mt-6 flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={selectAll}
                  className="rounded-lg border border-black/8 bg-[#FAF8F3] px-3 py-2 text-[11px] font-bold text-[#57534E] transition hover:border-[#D9A441]/50 hover:bg-[#FFF8E8]"
                >
                  Select all
                </button>

                <button
                  type="button"
                  onClick={clearAll}
                  disabled={selected.length === 0}
                  className="rounded-lg border border-black/8 bg-white px-3 py-2 text-[11px] font-bold text-[#78716C] transition hover:bg-[#F5F2EB] disabled:cursor-not-allowed disabled:opacity-40"
                >
                  Clear all
                </button>
              </div>
            </div>

            {/* AMENITY LIST */}
            <div className="px-6 py-7 sm:px-9 sm:py-9">
              <div className="space-y-10">
                {selectedByGroup.map((group) => (
                  <div key={group.title}>
                    {/* GROUP TITLE */}
                    <div className="mb-5 flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EA] text-[#9A711E]">
                          {group.icon}
                        </div>

                        <div>
                          <h3 className="text-base font-bold">
                            {group.title}
                          </h3>

                          <p className="mt-1 text-xs leading-5 text-[#A8A29E]">
                            {group.description}
                          </p>
                        </div>
                      </div>

                      <span className="shrink-0 rounded-full bg-[#F7F3EA] px-2.5 py-1 text-[10px] font-bold text-[#80621F]">
                        {group.selectedCount}/
                        {group.items.length}
                      </span>
                    </div>

                    {/* ITEMS */}
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                      {group.items.map((amenity) => {
                        const isSelected =
                          selected.includes(amenity);

                        return (
                          <button
                            key={amenity}
                            type="button"
                            aria-pressed={isSelected}
                            onClick={() =>
                              toggleAmenity(amenity)
                            }
                            className={[
                              "group flex min-h-[72px] items-center gap-3 rounded-2xl border p-3.5 text-left transition-all duration-200",
                              isSelected
                                ? "border-[#D9A441] bg-[#FFF8E8] shadow-[0_8px_25px_rgba(217,164,65,0.08)]"
                                : "border-black/8 bg-white hover:-translate-y-0.5 hover:border-[#D9A441]/45 hover:bg-[#FFFCF6]",
                            ].join(" ")}
                          >
                            {/* CHECK */}
                            <span
                              className={[
                                "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition",
                                isSelected
                                  ? "bg-[#D9A441] text-[#18181B]"
                                  : "bg-[#F5F2EB] text-[#A8A29E] group-hover:bg-[#FFF8E8] group-hover:text-[#9A711E]",
                              ].join(" ")}
                            >
                              {isSelected ? (
                                <Check size={16} />
                              ) : (
                                <span className="text-lg leading-none">
                                  +
                                </span>
                              )}
                            </span>

                            <span
                              className={[
                                "text-sm font-semibold",
                                isSelected
                                  ? "text-[#18181B]"
                                  : "text-[#57534E]",
                              ].join(" ")}
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

            {/* CARD FOOTER */}
            <div className="flex flex-col-reverse gap-4 border-t border-black/7 bg-[#FAF8F3]/60 px-6 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-9">
              <Link
                href={`/host/property/new/${propertyId}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-black/8 bg-white px-5 py-3 text-sm font-bold text-[#57534E] transition hover:bg-[#F5F2EB]"
              >
                <ArrowLeft size={15} />
                Back
              </Link>

              <button
                type="button"
                onClick={handleContinue}
                disabled={saving}
                className="group inline-flex items-center justify-center gap-3 rounded-xl bg-[#18181B] px-6 py-3.5 text-sm font-bold text-white shadow-[0_10px_25px_rgba(24,24,27,0.12)] transition hover:bg-[#292524] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? (
                  <>
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                    Saving...
                  </>
                ) : (
                  <>
                    Continue
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </>
                )}
              </button>
            </div>
          </section>

          {/* ============================================================ */}
          {/* SIDE PANEL                                                    */}
          {/* ============================================================ */}

          <aside className="h-fit xl:sticky xl:top-24">
            <div className="overflow-hidden rounded-[28px] border border-[#D9A441]/25 bg-[#FFF8E8] shadow-[0_18px_55px_rgba(24,24,27,0.05)]">
              {/* TOP */}
              <div className="border-b border-[#D9A441]/15 p-7 sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                    Vistara
                  </span>

                  <span className="rounded-full border border-[#D9A441]/25 bg-white px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.15em] text-[#80621F]">
                    Host Studio
                  </span>
                </div>

                <div className="mt-12">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#D9A441] text-[#18181B]">
                    <Sparkles size={20} />
                  </div>

                  <h3 className="mt-5 max-w-xs font-serif text-2xl font-semibold leading-tight sm:text-3xl">
                    Small details create a memorable stay.
                  </h3>

                  <p className="mt-4 text-sm leading-6 text-[#786A4A]">
                    Give guests a clear picture of the
                    comfort and conveniences available at
                    your property.
                  </p>
                </div>
              </div>

              {/* SELECTED PREVIEW */}
              <div className="p-7 sm:p-8">
                <div className="rounded-2xl border border-[#D9A441]/20 bg-white p-5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#A8A29E]">
                      Selected amenities
                    </span>

                    <span className="font-serif text-xl font-semibold">
                      {selected.length}
                    </span>
                  </div>

                  {selected.length === 0 ? (
                    <p className="mt-4 text-xs leading-5 text-[#A8A29E]">
                      Your selected amenities will appear
                      here.
                    </p>
                  ) : (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selected.slice(0, 6).map((item) => (
                        <span
                          key={item}
                          className="rounded-full border border-black/7 bg-[#FAF8F3] px-3 py-1.5 text-[10px] font-semibold text-[#57534E]"
                        >
                          {item}
                        </span>
                      ))}

                      {selected.length > 6 && (
                        <span className="rounded-full bg-[#18181B] px-3 py-1.5 text-[10px] font-bold text-white">
                          +{selected.length - 6} more
                        </span>
                      )}
                    </div>
                  )}
                </div>

                {/* TRUST */}
                <div className="mt-6 flex items-start gap-3 rounded-2xl bg-white/70 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F3F8EE] text-[#4E693E]">
                    <ShieldCheck size={17} />
                  </div>

                  <div>
                    <p className="text-xs font-bold">
                      Keep it accurate
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-[#786A4A]">
                      Only select amenities that are actually
                      available to guests.
                    </p>
                  </div>
                </div>

                {/* ESSENTIALS */}
                <div className="mt-7">
                  <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.18em] text-[#A8A29E]">
                    Experience essentials
                  </p>

                  <div className="space-y-3">
                    <Feature
                      icon={<Wifi size={14} />}
                      text="Reliable everyday essentials"
                    />

                    <Feature
                      icon={<Coffee size={14} />}
                      text="Comfort & convenience"
                    />

                    <Feature
                      icon={<Tv size={14} />}
                      text="A stay guests can understand"
                    />

                    <Feature
                      icon={<ParkingCircle size={14} />}
                      text="Transparent property details"
                    />
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* MOBILE CONTINUE */}
        <div className="mt-7 xl:hidden">
          <button
            type="button"
            onClick={handleContinue}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#D9A441] px-5 py-4 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D] disabled:opacity-60"
          >
            {saving ? (
              <>
                <Loader2
                  size={17}
                  className="animate-spin"
                />
                Saving...
              </>
            ) : (
              <>
                Save & continue
                <ArrowRight size={17} />
              </>
            )}
          </button>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* FEATURE                                                                     */
/* -------------------------------------------------------------------------- */

function Feature({
  icon,
  text,
}: {
  icon: React.ReactNode;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A711E]">
        {icon}
      </div>

      <span className="text-xs font-semibold text-[#665A3E]">
        {text}
      </span>
    </div>
  );
}