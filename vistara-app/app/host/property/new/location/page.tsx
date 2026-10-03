"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Globe2,
  Home,
  Info,
  MapPin,
  Navigation,
  Search,
} from "lucide-react";
import { useEffect, useState } from "react";

type LocationState = {
  country: string;
  state: string;
  city: string;
  locality: string;
  address: string;
  landmark: string;
  pincode: string;
};

const DEFAULT_LOCATION: LocationState = {
  country: "India",
  state: "",
  city: "",
  locality: "",
  address: "",
  landmark: "",
  pincode: "",
};

export default function LocationPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);
  const storageKey = `vistara-property-${id}-location`;

  const [location, setLocation] =
    useState<LocationState>(DEFAULT_LOCATION);

  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<
    Partial<Record<keyof LocationState, string>>
  >({});

  /* ---------------------------------------------------------------------- */
  /* LOAD                                                                    */
  /* ---------------------------------------------------------------------- */

  useEffect(() => {
    try {
      const stored = localStorage.getItem(storageKey);

      if (stored) {
        const parsed = JSON.parse(stored);

        setLocation({
          country:
            parsed.country || DEFAULT_LOCATION.country,
          state: parsed.state || "",
          city: parsed.city || "",
          locality: parsed.locality || "",
          address: parsed.address || "",
          landmark: parsed.landmark || "",
          pincode: parsed.pincode || "",
        });
      }
    } catch {
      setLocation(DEFAULT_LOCATION);
    } finally {
      setLoaded(true);
    }
  }, [storageKey]);

  /* ---------------------------------------------------------------------- */
  /* UPDATE                                                                  */
  /* ---------------------------------------------------------------------- */

  function updateField(
    field: keyof LocationState,
    value: string,
  ) {
    setLocation((current) => ({
      ...current,
      [field]: value,
    }));

    setSaved(false);

    if (errors[field]) {
      setErrors((current) => ({
        ...current,
        [field]: "",
      }));
    }
  }

  /* ---------------------------------------------------------------------- */
  /* VALIDATION                                                              */
  /* ---------------------------------------------------------------------- */

  function validate() {
    const nextErrors: Partial<
      Record<keyof LocationState, string>
    > = {};

    if (!location.country.trim()) {
      nextErrors.country = "Country is required";
    }

    if (!location.state.trim()) {
      nextErrors.state = "State is required";
    }

    if (!location.city.trim()) {
      nextErrors.city = "City is required";
    }

    if (!location.locality.trim()) {
      nextErrors.locality =
        "Locality or area is required";
    }

    if (!location.address.trim()) {
      nextErrors.address =
        "Property address is required";
    }

    if (!location.pincode.trim()) {
      nextErrors.pincode =
        "PIN code is required";
    } else if (!/^\d{6}$/.test(location.pincode)) {
      nextErrors.pincode =
        "Enter a valid 6-digit PIN code";
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  }

  /* ---------------------------------------------------------------------- */
  /* SAVE                                                                    */
  /* ---------------------------------------------------------------------- */

  function saveLocation() {
    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(location),
      );

      setSaved(true);
    } catch {
      setSaved(false);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* CONTINUE                                                                */
  /* ---------------------------------------------------------------------- */

  function handleContinue() {
    if (!validate()) {
      window.scrollTo({
        top: 250,
        behavior: "smooth",
      });

      return;
    }

    setSaving(true);

    try {
      localStorage.setItem(
        storageKey,
        JSON.stringify(location),
      );
    } finally {
      setTimeout(() => {
        router.push(
          `/host/property/new/${id}/pricing`,
        );
      }, 300);
    }
  }

  /* ---------------------------------------------------------------------- */
  /* LOADING                                                                 */
  /* ---------------------------------------------------------------------- */

  if (!loaded) {
    return (
      <main className="min-h-screen bg-[#FAF8F3]">
        <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-5 w-28 rounded bg-[#E7E0D4]" />
            <div className="mt-12 h-10 w-80 rounded bg-[#E7E0D4]" />
            <div className="mt-4 h-4 w-[450px] max-w-full rounded bg-[#E7E0D4]" />
            <div className="mt-10 h-96 rounded-[28px] bg-[#E7E0D4]" />
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* ================================================================== */}
      {/* HEADER                                                             */}
      {/* ================================================================== */}

      <header className="sticky top-0 z-40 border-b border-black/[0.07] bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href={`/host/property/new/${id}/guests`}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#57534E] transition hover:text-[#9A711E]"
          >
            <ArrowLeft size={16} />

            <span className="hidden sm:inline">
              Back to guests
            </span>

            <span className="sm:hidden">
              Back
            </span>
          </Link>

          <div className="hidden items-center gap-2 sm:flex">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#18181B] text-xs font-bold text-white">
              V
            </div>

            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#78716C]">
              Property setup
            </span>
          </div>

          <span className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A8A29E]">
            05 / 07
          </span>
        </div>
      </header>

      {/* ================================================================== */}
      {/* PROGRESS                                                            */}
      {/* ================================================================== */}

      <div className="border-b border-black/[0.06] bg-white">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-1.5">
            <div className="w-[71%] bg-[#D9A441]" />
            <div className="flex-1 bg-[#EEE9E0]" />
          </div>
        </div>
      </div>

      {/* ================================================================== */}
      {/* CONTENT                                                             */}
      {/* ================================================================== */}

      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* INTRO */}

        <section className="max-w-2xl">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#FFF4D8] text-[#9A711E]">
            <MapPin size={21} />
          </div>

          <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
            Property location
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
            Where is your place?
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-7 text-[#78716C]">
            Add the location of your property so guests
            can understand the area before booking.
          </p>
        </section>

        {/* ================================================================== */}
        {/* LOCATION FORM                                                      */}
        {/* ================================================================== */}

        <section className="mt-10 rounded-[28px] border border-[#E4DDD1] bg-white p-5 shadow-[0_15px_45px_rgba(24,24,27,0.04)] sm:p-7">
          {/* SECTION HEADER */}

          <div className="flex items-start gap-4 border-b border-black/[0.07] pb-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F7F3EB] text-[#9A711E]">
              <Globe2 size={18} />
            </div>

            <div>
              <h2 className="text-sm font-bold">
                Address details
              </h2>

              <p className="mt-1 text-[11px] leading-5 text-[#A8A29E]">
                Guests will use this information to
                understand where your property is located.
              </p>
            </div>
          </div>

          {/* COUNTRY / STATE */}

          <div className="mt-7 grid gap-5 sm:grid-cols-2">
            <Field
              label="Country"
              required
              error={errors.country}
            >
              <div className="relative">
                <Globe2
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"
                />

                <input
                  value={location.country}
                  onChange={(e) =>
                    updateField(
                      "country",
                      e.target.value,
                    )
                  }
                  placeholder="India"
                  className={inputClass(
                    !!errors.country,
                    true,
                  )}
                />
              </div>
            </Field>

            <Field
              label="State / Union Territory"
              required
              error={errors.state}
            >
              <input
                value={location.state}
                onChange={(e) =>
                  updateField(
                    "state",
                    e.target.value,
                  )
                }
                placeholder="Bihar"
                className={inputClass(
                  !!errors.state,
                )}
              />
            </Field>
          </div>

          {/* CITY / LOCALITY */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="City"
              required
              error={errors.city}
            >
              <input
                value={location.city}
                onChange={(e) =>
                  updateField(
                    "city",
                    e.target.value,
                  )
                }
                placeholder="Patna"
                className={inputClass(
                  !!errors.city,
                )}
              />
            </Field>

            <Field
              label="Locality / Area"
              required
              error={errors.locality}
            >
              <input
                value={location.locality}
                onChange={(e) =>
                  updateField(
                    "locality",
                    e.target.value,
                  )
                }
                placeholder="Boring Road"
                className={inputClass(
                  !!errors.locality,
                )}
              />
            </Field>
          </div>

          {/* ADDRESS */}

          <div className="mt-5">
            <Field
              label="Property address"
              required
              error={errors.address}
            >
              <textarea
                value={location.address}
                onChange={(e) =>
                  updateField(
                    "address",
                    e.target.value,
                  )
                }
                rows={4}
                placeholder="Enter the complete property address"
                className={`${inputClass(
                  !!errors.address,
                )} min-h-[120px] resize-none py-3.5`}
              />
            </Field>
          </div>

          {/* LANDMARK / PIN */}

          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <Field
              label="Nearby landmark"
              optional
            >
              <div className="relative">
                <Navigation
                  size={15}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#A8A29E]"
                />

                <input
                  value={location.landmark}
                  onChange={(e) =>
                    updateField(
                      "landmark",
                      e.target.value,
                    )
                  }
                  placeholder="Near a known landmark"
                  className={inputClass(
                    false,
                    true,
                  )}
                />
              </div>
            </Field>

            <Field
              label="PIN code"
              required
              error={errors.pincode}
            >
              <input
                inputMode="numeric"
                maxLength={6}
                value={location.pincode}
                onChange={(e) =>
                  updateField(
                    "pincode",
                    e.target.value.replace(
                      /\D/g,
                      "",
                    ),
                  )
                }
                placeholder="800001"
                className={inputClass(
                  !!errors.pincode,
                )}
              />
            </Field>
          </div>
        </section>

        {/* ================================================================== */}
        {/* MAP PREVIEW                                                        */}
        {/* ================================================================== */}

        <section className="mt-5 overflow-hidden rounded-[28px] border border-[#E4DDD1] bg-white shadow-[0_15px_45px_rgba(24,24,27,0.04)]">
          <div className="border-b border-black/[0.07] p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A711E]">
              Location preview
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Your property area
            </h2>
          </div>

          <div className="relative min-h-[300px] overflow-hidden bg-[#ECE7DE] sm:min-h-[360px]">
            {/* MAP-LIKE BACKGROUND */}

            <div className="absolute inset-0 opacity-70">
              <div className="absolute left-[12%] top-[15%] h-px w-[80%] rotate-[14deg] bg-[#C9C0B0]" />

              <div className="absolute left-[5%] top-[55%] h-px w-[90%] -rotate-[8deg] bg-[#C9C0B0]" />

              <div className="absolute left-[28%] top-0 h-[120%] w-px rotate-[12deg] bg-[#D2CABB]" />

              <div className="absolute right-[20%] top-0 h-[120%] w-px -rotate-[20deg] bg-[#D2CABB]" />

              <div className="absolute left-[15%] top-[30%] h-28 w-28 rounded-full bg-[#D9A441]/10 blur-2xl" />

              <div className="absolute bottom-[15%] right-[15%] h-40 w-40 rounded-full bg-[#A89B7A]/10 blur-3xl" />
            </div>

            {/* MAP CARD */}

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <div className="rounded-[22px] border border-black/[0.08] bg-white/95 p-5 text-center shadow-xl backdrop-blur">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#18181B] text-[#D9A441]">
                  <MapPin size={20} />
                </div>

                <p className="mt-4 font-serif text-lg font-semibold">
                  {location.city ||
                    "Your city"}
                  {location.state
                    ? `, ${location.state}`
                    : ""}
                </p>

                <p className="mt-1 max-w-xs text-[10px] leading-5 text-[#A8A29E]">
                  The exact address is kept private
                  until a booking is confirmed.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ================================================================== */}
        {/* PRIVACY NOTICE                                                     */}
        {/* ================================================================== */}

        <section className="mt-5 flex gap-3 rounded-2xl border border-[#E7DCC4] bg-[#FFF9EA] p-4 sm:p-5">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white text-[#9A711E]">
            <Info size={17} />
          </div>

          <div>
            <p className="text-xs font-bold text-[#51472F]">
              Your privacy matters
            </p>

            <p className="mt-1 text-[11px] leading-5 text-[#7C7052]">
              Your general location can be shown to
              guests while the precise address can remain
              protected until a reservation is confirmed.
            </p>
          </div>
        </section>

        {/* ================================================================== */}
        {/* SAVED                                                              */}
        {/* ================================================================== */}

        <div className="mt-5 flex min-h-5 justify-center">
          {saved && (
            <p className="flex items-center gap-1.5 text-[10px] font-bold text-[#68705A]">
              <Check size={13} />
              Location saved
            </p>
          )}
        </div>
      </div>

      {/* ================================================================== */}
      {/* FOOTER                                                             */}
      {/* ================================================================== */}

      <footer className="sticky bottom-0 z-30 border-t border-black/[0.07] bg-[#FAF8F3]/95 backdrop-blur-xl">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <Link
            href={`/host/property/new/${id}/guests`}
            className="inline-flex items-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-[#57534E] transition hover:bg-white"
          >
            <ArrowLeft size={15} />

            <span className="hidden sm:inline">
              Back
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={saveLocation}
              className="hidden rounded-xl border border-[#D8D1C5] bg-white px-5 py-3 text-xs font-bold text-[#403C37] transition hover:border-[#D9A441] sm:inline-flex"
            >
              Save
            </button>

            <button
              type="button"
              onClick={handleContinue}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-xs font-bold text-[#18181B] shadow-[0_8px_20px_rgba(217,164,65,0.18)] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-60 sm:px-6"
            >
              {saving ? "Saving..." : "Continue"}

              {!saving && (
                <ArrowRight size={15} />
              )}
            </button>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ========================================================================== */
/* FIELD                                                                      */
/* ========================================================================== */

function Field({
  label,
  children,
  required = false,
  optional = false,
  error,
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  optional?: boolean;
  error?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between">
        <label className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#57534E]">
          {label}
        </label>

        {required && (
          <span className="text-[9px] font-semibold text-[#9A711E]">
            Required
          </span>
        )}

        {optional && (
          <span className="text-[9px] font-semibold text-[#A8A29E]">
            Optional
          </span>
        )}
      </div>

      {children}

      {error && (
        <p className="mt-1.5 text-[10px] font-semibold text-[#9A711E]">
          {error}
        </p>
      )}
    </div>
  );
}

/* ========================================================================== */
/* INPUT CLASS                                                                */
/* ========================================================================== */

function inputClass(
  hasError = false,
  withIcon = false,
) {
  return [
    "w-full rounded-xl border bg-[#FCFBF8] px-4 py-3.5 text-sm text-[#292524] outline-none transition placeholder:text-[#B4AEA5]",
    withIcon ? "pl-11" : "",
    hasError
      ? "border-[#B88A2B] focus:border-[#9A711E]"
      : "border-[#DED8CE] focus:border-[#D9A441] focus:ring-2 focus:ring-[#D9A441]/10",
  ].join(" ");
}