"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type PropertyData = {
  id: string;
  status: "DRAFT" | "PENDING" | "PUBLISHED";
  verificationStatus: "NOT_STARTED" | "PENDING" | "VERIFIED";

  name: string;
  type: string;
  description: string;

  amenities: string[];

  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;

  address: string;
  city: string;
  state: string;
  country: string;

  price: string;
  cleaningFee: string;

  rules: string[];

  photos: string[];

  checkIn: string;
  checkOut: string;
  minNights: number;
  available: boolean;

  verification: {
    ownership: boolean;
    authorization: boolean;
    supporting: boolean;
  };
};

const PROPERTY_TYPES = [
  "Entire home",
  "Entire villa",
  "Apartment",
  "Private room",
  "Guest house",
  "Homestay",
];

const AMENITIES = [
  "Wi-Fi",
  "Air conditioning",
  "Parking",
  "Kitchen",
  "Pool",
  "Breakfast",
  "TV",
  "Workspace",
  "Washing machine",
  "Garden",
  "Pet friendly",
  "Hot water",
];

const RULES = [
  "No smoking",
  "No parties",
  "Pets allowed",
  "Children allowed",
  "Quiet hours",
  "No unregistered guests",
];

const STEPS = [
  "Basic details",
  "Amenities",
  "Guests & rooms",
  "Location",
  "Pricing",
  "Rules",
  "Photos",
  "Availability",
  "Preview",
  "Verification",
];

function createId() {
  if (
    typeof crypto !== "undefined" &&
    "randomUUID" in crypto
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2)}`;
}

function getInitialProperty(id: string): PropertyData {
  return {
    id,

    status: "DRAFT",
    verificationStatus: "NOT_STARTED",

    name: "",
    type: "",
    description: "",

    amenities: [],

    guests: 2,
    bedrooms: 1,
    beds: 1,
    bathrooms: 1,

    address: "",
    city: "",
    state: "",
    country: "India",

    price: "",
    cleaningFee: "",

    rules: [],

    photos: [],

    checkIn: "14:00",
    checkOut: "11:00",
    minNights: 1,
    available: true,

    verification: {
      ownership: false,
      authorization: false,
      supporting: false,
    },
  };
}

export default function NewPropertyPage() {
  const router = useRouter();

  const [property, setProperty] =
    useState<PropertyData | null>(null);

  const [step, setStep] = useState(0);

  const [saving, setSaving] = useState(false);

  useEffect(() => {
    let id = sessionStorage.getItem(
      "vistara-new-property-id"
    );

    if (!id) {
      id = createId();

      sessionStorage.setItem(
        "vistara-new-property-id",
        id
      );
    }

    const key = `vistara-property-${id}`;

    const existing = localStorage.getItem(key);

    if (existing) {
      try {
        setProperty(JSON.parse(existing));
        return;
      } catch {
        // continue with fresh property
      }
    }

    const initial = getInitialProperty(id);

    localStorage.setItem(
      key,
      JSON.stringify(initial)
    );

    setProperty(initial);
  }, []);

  const updateProperty = (
    updates: Partial<PropertyData>
  ) => {
    if (!property) return;

    const updated = {
      ...property,
      ...updates,
    };

    setProperty(updated);

    localStorage.setItem(
      `vistara-property-${property.id}`,
      JSON.stringify(updated)
    );
  };

  const toggleArrayValue = (
    field: "amenities" | "rules",
    value: string
  ) => {
    if (!property) return;

    const current = property[field];

    const updated = current.includes(value)
      ? current.filter((item) => item !== value)
      : [...current, value];

    updateProperty({
      [field]: updated,
    });
  };

  const next = () => {
    if (!property) return;

    if (step === 0) {
      if (!property.name.trim()) {
        alert("Please enter your property name.");
        return;
      }

      if (!property.type) {
        alert("Please select property type.");
        return;
      }
    }

    if (step === 3) {
      if (
        !property.address.trim() ||
        !property.city.trim() ||
        !property.state.trim()
      ) {
        alert("Please complete the location details.");
        return;
      }
    }

    if (step === 4) {
      if (!property.price) {
        alert("Please enter nightly price.");
        return;
      }
    }

    setStep((current) =>
      Math.min(current + 1, STEPS.length - 1)
    );
  };

  const back = () => {
    setStep((current) =>
      Math.max(current - 1, 0)
    );
  };

  const saveDraft = () => {
    if (!property) return;

    const updated = {
      ...property,
      status: "DRAFT" as const,
    };

    localStorage.setItem(
      `vistara-property-${property.id}`,
      JSON.stringify(updated)
    );

    setProperty(updated);

    alert("Property draft saved.");
  };

  const submitVerification = () => {
    if (!property) return;

    if (!property.verification.ownership) {
      alert(
        "Please upload the property ownership document."
      );
      return;
    }

    setSaving(true);

    const updated: PropertyData = {
      ...property,
      status: "PENDING",
      verificationStatus: "PENDING",
    };

    localStorage.setItem(
      `vistara-property-${property.id}`,
      JSON.stringify(updated)
    );

    setProperty(updated);

    setTimeout(() => {
      setSaving(false);

      sessionStorage.removeItem(
        "vistara-new-property-id"
      );

      router.replace("/host/properties");
    }, 700);
  };

  const progress = useMemo(() => {
    return ((step + 1) / STEPS.length) * 100;
  }, [step]);

  if (!property) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAF8F3]">
        <div className="text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-[#E7DFD7] border-t-[#D9A441]" />

          <p className="text-sm text-[#57534E]">
            Starting your property setup...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#111827]">

      {/* TOP BAR */}
      <header className="sticky top-0 z-40 border-b border-[#E7DFD7] bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">

          <button
            onClick={() => router.push("/host/properties")}
            className="flex items-center gap-2 text-sm font-medium text-[#57534E]"
          >
            ← Back
          </button>

          <div className="text-sm font-medium text-[#57534E]">
            Step {step + 1} / {STEPS.length}
          </div>

          <button
            onClick={saveDraft}
            className="rounded-full border border-[#E2D9CF] bg-white px-5 py-2.5 text-sm font-semibold"
          >
            Save draft
          </button>

        </div>

        {/* PROGRESS */}
        <div className="h-1 bg-[#EEE8E0]">
          <div
            className="h-full bg-[#D9A441] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </header>

      {/* STEP NAVIGATION */}
      <div className="border-b border-[#E7DFD7] bg-white">
        <div className="mx-auto max-w-[1400px] overflow-x-auto px-6">
          <div className="flex min-w-max items-center gap-8 py-5">

            {STEPS.map((item, index) => {
              const active = index === step;
              const completed = index < step;

              return (
                <button
                  key={item}
                  onClick={() => {
                    if (index <= step) {
                      setStep(index);
                    }
                  }}
                  className="flex items-center gap-3"
                >
                  <span
                    className={[
                      "flex h-9 w-9 items-center justify-center rounded-full border text-sm font-semibold",
                      active
                        ? "border-[#111827] bg-[#111827] text-white"
                        : completed
                        ? "border-[#D9A441] bg-[#D9A441] text-white"
                        : "border-[#DED7CF] bg-white text-[#78716C]",
                    ].join(" ")}
                  >
                    {completed ? "✓" : index + 1}
                  </span>

                  <span
                    className={[
                      "text-sm whitespace-nowrap",
                      active
                        ? "font-semibold text-[#111827]"
                        : "text-[#78716C]",
                    ].join(" ")}
                  >
                    {item}
                  </span>
                </button>
              );
            })}

          </div>
        </div>
      </div>

      {/* CONTENT */}
      <div className="mx-auto max-w-[1050px] px-5 py-12">

        {/* STEP 1 */}
        {step === 0 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="mb-3 text-xs font-bold tracking-[0.25em] text-[#B18120]">
              BASIC DETAILS
            </p>

            <h1 className="font-serif text-4xl font-bold">
              Tell us about your property
            </h1>

            <p className="mt-3 text-[#78716C]">
              Start with the basic information guests need.
            </p>

            <div className="mt-10 space-y-7">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Property name
                </label>

                <input
                  value={property.name}
                  onChange={(e) =>
                    updateProperty({
                      name: e.target.value,
                    })
                  }
                  placeholder="e.g. The Heritage Villa"
                  className="w-full rounded-xl border border-[#DED7CF] px-4 py-3 outline-none focus:border-[#D9A441]"
                />
              </div>

              <div>
                <label className="mb-3 block text-sm font-semibold">
                  Property type
                </label>

                <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {PROPERTY_TYPES.map((type) => (
                    <button
                      key={type}
                      onClick={() =>
                        updateProperty({ type })
                      }
                      className={[
                        "rounded-xl border p-4 text-left transition",
                        property.type === type
                          ? "border-[#D9A441] bg-[#FFF8E8]"
                          : "border-[#E3DDD6] bg-white hover:border-[#BEB5AA]",
                      ].join(" ")}
                    >
                      <span className="font-semibold">
                        {type}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Description
                </label>

                <textarea
                  rows={6}
                  value={property.description}
                  onChange={(e) =>
                    updateProperty({
                      description: e.target.value,
                    })
                  }
                  placeholder="Describe your property, neighbourhood and what makes it special..."
                  className="w-full resize-none rounded-xl border border-[#DED7CF] px-4 py-3 outline-none focus:border-[#D9A441]"
                />
              </div>

            </div>
          </section>
        )}

        {/* STEP 2 */}
        {step === 1 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              PROPERTY FEATURES
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              What does your property offer?
            </h1>

            <p className="mt-3 text-[#78716C]">
              Choose the amenities available to guests.
            </p>

            <div className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {AMENITIES.map((amenity) => {
                const selected =
                  property.amenities.includes(amenity);

                return (
                  <button
                    key={amenity}
                    onClick={() =>
                      toggleArrayValue(
                        "amenities",
                        amenity
                      )
                    }
                    className={[
                      "flex items-center justify-between rounded-xl border p-5 text-left",
                      selected
                        ? "border-[#D9A441] bg-[#FFF8E8]"
                        : "border-[#E3DDD6]",
                    ].join(" ")}
                  >
                    <span className="font-semibold">
                      {amenity}
                    </span>

                    <span
                      className={[
                        "flex h-6 w-6 items-center justify-center rounded-full border",
                        selected
                          ? "border-[#D9A441] bg-[#D9A441] text-white"
                          : "border-[#D8D2CB]",
                      ].join(" ")}
                    >
                      {selected ? "✓" : ""}
                    </span>
                  </button>
                );
              })}

            </div>
          </section>
        )}

        {/* STEP 3 */}
        {step === 2 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              ROOMS & SLEEPING
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              Tell guests about the space
            </h1>

            <p className="mt-3 text-[#78716C]">
              Add the rooms, beds and bathrooms available.
            </p>

            <div className="mt-10 space-y-4">

              {[
                ["guests", "Guests", property.guests],
                ["bedrooms", "Bedrooms", property.bedrooms],
                ["beds", "Beds", property.beds],
                ["bathrooms", "Bathrooms", property.bathrooms],
              ].map(([field, label, value]) => (
                <div
                  key={field}
                  className="flex items-center justify-between rounded-2xl border border-[#E3DDD6] p-5"
                >
                  <span className="font-semibold">
                    {label}
                  </span>

                  <div className="flex items-center gap-4">
                    <button
                      onClick={() =>
                        updateProperty({
                          [field as string]: Math.max(
                            1,
                            Number(value) - 1
                          ),
                        } as Partial<PropertyData>)
                      }
                      className="h-9 w-9 rounded-full border"
                    >
                      −
                    </button>

                    <span className="w-8 text-center font-semibold">
                      {value}
                    </span>

                    <button
                      onClick={() =>
                        updateProperty({
                          [field as string]:
                            Number(value) + 1,
                        } as Partial<PropertyData>)
                      }
                      className="h-9 w-9 rounded-full border"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}

            </div>
          </section>
        )}

        {/* STEP 4 */}
        {step === 3 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              LOCATION
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              Where is your property?
            </h1>

            <div className="mt-10 grid gap-6">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Full address
                </label>

                <input
                  value={property.address}
                  onChange={(e) =>
                    updateProperty({
                      address: e.target.value,
                    })
                  }
                  placeholder="Street / Road / Area"
                  className="w-full rounded-xl border border-[#DED7CF] px-4 py-3"
                />
              </div>

              <div className="grid gap-6 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    City
                  </label>

                  <input
                    value={property.city}
                    onChange={(e) =>
                      updateProperty({
                        city: e.target.value,
                      })
                    }
                    placeholder="Patna"
                    className="w-full rounded-xl border border-[#DED7CF] px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    State
                  </label>

                  <input
                    value={property.state}
                    onChange={(e) =>
                      updateProperty({
                        state: e.target.value,
                      })
                    }
                    placeholder="Bihar"
                    className="w-full rounded-xl border border-[#DED7CF] px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Country
                  </label>

                  <input
                    value={property.country}
                    onChange={(e) =>
                      updateProperty({
                        country: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border border-[#DED7CF] px-4 py-3"
                  />
                </div>

              </div>
            </div>
          </section>
        )}

        {/* STEP 5 */}
        {step === 4 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              PRICING
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              Set your price
            </h1>

            <p className="mt-3 text-[#78716C]">
              Guests will see your nightly price before booking.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Price per night
                </label>

                <div className="flex items-center rounded-xl border border-[#DED7CF]">
                  <span className="px-4 text-lg">
                    ₹
                  </span>

                  <input
                    type="number"
                    value={property.price}
                    onChange={(e) =>
                      updateProperty({
                        price: e.target.value,
                      })
                    }
                    placeholder="4500"
                    className="w-full rounded-xl px-2 py-3 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  Cleaning fee
                </label>

                <div className="flex items-center rounded-xl border border-[#DED7CF]">
                  <span className="px-4 text-lg">
                    ₹
                  </span>

                  <input
                    type="number"
                    value={property.cleaningFee}
                    onChange={(e) =>
                      updateProperty({
                        cleaningFee: e.target.value,
                      })
                    }
                    placeholder="500"
                    className="w-full rounded-xl px-2 py-3 outline-none"
                  />
                </div>
              </div>

            </div>
          </section>
        )}

        {/* STEP 6 */}
        {step === 5 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              HOUSE RULES
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              Set your house rules
            </h1>

            <div className="mt-10 grid gap-3 sm:grid-cols-2">

              {RULES.map((rule) => {
                const selected =
                  property.rules.includes(rule);

                return (
                  <button
                    key={rule}
                    onClick={() =>
                      toggleArrayValue(
                        "rules",
                        rule
                      )
                    }
                    className={[
                      "rounded-xl border p-5 text-left font-semibold",
                      selected
                        ? "border-[#D9A441] bg-[#FFF8E8]"
                        : "border-[#E3DDD6]",
                    ].join(" ")}
                  >
                    {selected ? "✓ " : ""}
                    {rule}
                  </button>
                );
              })}

            </div>
          </section>
        )}

        {/* STEP 7 */}
        {step === 6 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              PHOTOS
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              Show guests your property
            </h1>

            <p className="mt-3 text-[#78716C]">
              Add photos of your rooms, exterior and important spaces.
            </p>

            <div className="mt-10 rounded-2xl border-2 border-dashed border-[#D8D0C7] p-10 text-center">

              <div className="text-4xl">
                📷
              </div>

              <p className="mt-4 font-semibold">
                Upload property photos
              </p>

              <p className="mt-2 text-sm text-[#78716C]">
                JPG, PNG or WEBP
              </p>

              <input
                type="file"
                multiple
                accept="image/*"
                className="mt-6 block w-full text-sm"
                onChange={(e) => {
                  const files = Array.from(
                    e.target.files || []
                  );

                  const names = files.map(
                    (file) => file.name
                  );

                  updateProperty({
                    photos: [
                      ...property.photos,
                      ...names,
                    ],
                  });
                }}
              />

            </div>

            {property.photos.length > 0 && (
              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {property.photos.map(
                  (photo, index) => (
                    <div
                      key={`${photo}-${index}`}
                      className="rounded-xl border bg-[#FAF8F3] p-4"
                    >
                      <div className="text-sm font-medium">
                        {photo}
                      </div>
                    </div>
                  )
                )}
              </div>
            )}

          </section>
        )}

        {/* STEP 8 */}
        {step === 7 && (
          <section className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

            <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
              AVAILABILITY
            </p>

            <h1 className="mt-3 font-serif text-4xl font-bold">
              When can guests stay?
            </h1>

            <div className="mt-10 space-y-6">

              <div className="flex items-center justify-between rounded-2xl border p-5">
                <div>
                  <p className="font-semibold">
                    Available for booking
                  </p>

                  <p className="mt-1 text-sm text-[#78716C]">
                    Turn this off if the property is temporarily unavailable.
                  </p>
                </div>

                <button
                  onClick={() =>
                    updateProperty({
                      available:
                        !property.available,
                    })
                  }
                  className={[
                    "h-7 w-14 rounded-full p-1 transition",
                    property.available
                      ? "bg-[#D9A441]"
                      : "bg-[#D6D3D1]",
                  ].join(" ")}
                >
                  <span
                    className={[
                      "block h-5 w-5 rounded-full bg-white transition",
                      property.available
                        ? "translate-x-7"
                        : "translate-x-0",
                    ].join(" ")}
                  />
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Check-in
                  </label>

                  <input
                    type="time"
                    value={property.checkIn}
                    onChange={(e) =>
                      updateProperty({
                        checkIn: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Check-out
                  </label>

                  <input
                    type="time"
                    value={property.checkOut}
                    onChange={(e) =>
                      updateProperty({
                        checkOut: e.target.value,
                      })
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold">
                    Minimum nights
                  </label>

                  <input
                    type="number"
                    min={1}
                    value={property.minNights}
                    onChange={(e) =>
                      updateProperty({
                        minNights: Math.max(
                          1,
                          Number(e.target.value)
                        ),
                      })
                    }
                    className="w-full rounded-xl border px-4 py-3"
                  />
                </div>

              </div>
            </div>
          </section>
        )}

        {/* STEP 9 PREVIEW */}
        {step === 8 && (
          <section>

            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
                PREVIEW
              </p>

              <h1 className="mt-3 font-serif text-4xl font-bold">
                Review your listing
              </h1>

              <p className="mt-3 text-[#78716C]">
                This is how your property information will be presented.
              </p>
            </div>

            <div className="overflow-hidden rounded-[28px] border border-[#E5DED6] bg-white shadow-sm">

              <div className="bg-[#302720] px-8 py-10 text-white">

                <div className="flex flex-wrap items-center gap-3">

                  <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-semibold">
                    DRAFT
                  </span>

                  <span className="rounded-full bg-[#D9A441] px-4 py-2 text-xs font-semibold text-black">
                    PREVIEW
                  </span>

                </div>

                <h2 className="mt-7 font-serif text-5xl font-bold">
                  {property.name ||
                    "Your property name"}
                </h2>

                <p className="mt-4 text-lg text-white/70">
                  {property.city ||
                    "City"}
                  {property.state
                    ? `, ${property.state}`
                    : ""}
                </p>

              </div>

              <div className="grid gap-8 p-8 md:grid-cols-2">

                <div>
                  <p className="text-sm text-[#78716C]">
                    Property type
                  </p>

                  <p className="mt-1 font-semibold">
                    {property.type ||
                      "Not selected"}
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#78716C]">
                    Price
                  </p>

                  <p className="mt-1 text-2xl font-bold">
                    ₹
                    {property.price ||
                      "0"}
                    <span className="text-sm font-normal">
                      {" "}
                      / night
                    </span>
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#78716C]">
                    Guests
                  </p>

                  <p className="mt-1 font-semibold">
                    {property.guests} guests
                  </p>
                </div>

                <div>
                  <p className="text-sm text-[#78716C]">
                    Rooms
                  </p>

                  <p className="mt-1 font-semibold">
                    {property.bedrooms} bedrooms ·{" "}
                    {property.beds} beds ·{" "}
                    {property.bathrooms} bathrooms
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-[#78716C]">
                    Address
                  </p>

                  <p className="mt-1 font-semibold">
                    {property.address},{" "}
                    {property.city},{" "}
                    {property.state}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-[#78716C]">
                    Description
                  </p>

                  <p className="mt-2 leading-7">
                    {property.description ||
                      "No description added yet."}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm text-[#78716C]">
                    Amenities
                  </p>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {property.amenities.length > 0 ? (
                      property.amenities.map(
                        (amenity) => (
                          <span
                            key={amenity}
                            className="rounded-full bg-[#FAF8F3] px-4 py-2 text-sm"
                          >
                            {amenity}
                          </span>
                        )
                      )
                    ) : (
                      <span className="text-sm text-[#78716C]">
                        No amenities selected
                      </span>
                    )}
                  </div>
                </div>

              </div>

            </div>
          </section>
        )}

        {/* STEP 10 VERIFICATION */}
        {step === 9 && (
          <section>

            <div className="mb-8">
              <p className="text-xs font-bold tracking-[0.25em] text-[#B18120]">
                VISTARA VERIFICATION
              </p>

              <h1 className="mt-3 font-serif text-4xl font-bold">
                Verify your property
              </h1>

              <p className="mt-3 max-w-2xl text-[#78716C]">
                Upload the required documents so Vistara can review your property before it goes live.
              </p>
            </div>

            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-8 shadow-sm">

              <div className="rounded-2xl bg-[#302720] p-7 text-white">

                <div className="flex items-start justify-between gap-6">

                  <div>
                    <p className="text-xs font-bold tracking-[0.2em] text-[#D9A441]">
                      PROPERTY VERIFICATION
                    </p>

                    <h2 className="mt-3 font-serif text-3xl font-bold">
                      Build trust before your first guest arrives.
                    </h2>

                    <p className="mt-3 max-w-2xl text-white/70">
                      Complete the verification requirements before submitting your property.
                    </p>
                  </div>

                  <div className="rounded-xl border border-white/10 px-5 py-4">
                    <p className="text-xs text-white/50">
                      STATUS
                    </p>

                    <p className="mt-1 font-semibold">
                      Ready to submit
                    </p>
                  </div>

                </div>

              </div>

              <div className="mt-8 space-y-4">

                {/* OWNERSHIP */}
                <label
                  className={[
                    "flex cursor-pointer items-center justify-between rounded-2xl border p-5",
                    property.verification.ownership
                      ? "border-[#D9A441] bg-[#FFF8E8]"
                      : "border-[#E3DDD6]",
                  ].join(" ")}
                >

                  <div>
                    <p className="font-semibold">
                      Property ownership document
                    </p>

                    <p className="mt-1 text-sm text-[#78716C]">
                      PDF, JPG or PNG · Maximum 10 MB
                    </p>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        updateProperty({
                          verification: {
                            ...property.verification,
                            ownership: true,
                          },
                        });
                      }
                    }}
                  />

                  <span className="rounded-full border px-4 py-2 text-sm">
                    {property.verification.ownership
                      ? "✓ Uploaded"
                      : "Upload"}
                  </span>

                </label>

                {/* AUTHORIZATION */}
                <label
                  className={[
                    "flex cursor-pointer items-center justify-between rounded-2xl border p-5",
                    property.verification.authorization
                      ? "border-[#D9A441] bg-[#FFF8E8]"
                      : "border-[#E3DDD6]",
                  ].join(" ")}
                >

                  <div>
                    <p className="font-semibold">
                      Host authorization document
                    </p>

                    <p className="mt-1 text-sm text-[#78716C]">
                      Required if you manage the property on behalf of the owner.
                    </p>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        updateProperty({
                          verification: {
                            ...property.verification,
                            authorization: true,
                          },
                        });
                      }
                    }}
                  />

                  <span className="rounded-full border px-4 py-2 text-sm">
                    {property.verification.authorization
                      ? "✓ Uploaded"
                      : "Upload"}
                  </span>

                </label>

                {/* SUPPORTING */}
                <label
                  className={[
                    "flex cursor-pointer items-center justify-between rounded-2xl border p-5",
                    property.verification.supporting
                      ? "border-[#D9A441] bg-[#FFF8E8]"
                      : "border-[#E3DDD6]",
                  ].join(" ")}
                >

                  <div>
                    <p className="font-semibold">
                      Additional supporting document
                    </p>

                    <p className="mt-1 text-sm text-[#78716C]">
                      Optional
                    </p>
                  </div>

                  <input
                    type="file"
                    className="hidden"
                    accept=".pdf,.jpg,.jpeg,.png"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        updateProperty({
                          verification: {
                            ...property.verification,
                            supporting: true,
                          },
                        });
                      }
                    }}
                  />

                  <span className="rounded-full border px-4 py-2 text-sm">
                    {property.verification.supporting
                      ? "✓ Uploaded"
                      : "Upload"}
                  </span>

                </label>

              </div>

              <div className="mt-8 rounded-xl bg-[#FAF8F3] p-5 text-sm text-[#57534E]">
                🛡️ Your submitted information is securely handled for verification purposes.
              </div>

            </div>

          </section>
        )}

        {/* BOTTOM NAVIGATION */}
        <div className="mt-8 flex items-center justify-between">

          <button
            onClick={back}
            disabled={step === 0}
            className={[
              "rounded-xl border border-[#DED7CF] bg-white px-6 py-3 font-semibold",
              step === 0
                ? "cursor-not-allowed opacity-40"
                : "",
            ].join(" ")}
          >
            ← Back
          </button>

          <div className="flex gap-3">

            {step < STEPS.length - 1 && (
              <button
                onClick={next}
                className="rounded-xl bg-[#D9A441] px-8 py-3 font-bold text-black shadow-sm transition hover:brightness-95"
              >
                Continue →
              </button>
            )}

            {step === STEPS.length - 1 && (
              <button
                onClick={submitVerification}
                disabled={saving}
                className="rounded-xl bg-[#D9A441] px-8 py-3 font-bold text-black shadow-sm disabled:opacity-50"
              >
                {saving
                  ? "Submitting..."
                  : "Submit for verification →"}
              </button>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}