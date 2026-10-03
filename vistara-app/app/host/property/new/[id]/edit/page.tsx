"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  BedDouble,
  Check,
  ChevronRight,
  ImagePlus,
  Loader2,
  MapPin,
  Save,
  Trash2,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";

type PropertyForm = {
  name: string;
  type: string;
  description: string;
  location: string;
  city: string;
  state: string;
  country: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  price: number;
  cleaningFee: number;
  image: string;
};

const initialProperty: PropertyForm = {
  name: "The Heritage Villa",
  type: "Villa",
  description:
    "A peaceful private villa designed for comfortable stays, family trips and memorable travel experiences.",
  location: "Boring Road",
  city: "Patna",
  state: "Bihar",
  country: "India",
  guests: 6,
  bedrooms: 3,
  beds: 4,
  bathrooms: 3,
  price: 4500,
  cleaningFee: 500,
  image:
    "/images/house.jpg",
};

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const propertyId = params.id as string;

  const [form, setForm] =
    useState<PropertyForm>(initialProperty);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  /*
   * Load existing property.
   *
   * Replace this demo block with:
   *
   * const response = await fetch(
   *   `/api/host/properties/${propertyId}`
   * );
   *
   * const data = await response.json();
   *
   * setForm(data.property);
   */

  useEffect(() => {
    let mounted = true;

    async function loadProperty() {
      try {
        setLoading(true);
        setError("");

        // Demo delay so loading state can be tested.
        await new Promise((resolve) =>
          setTimeout(resolve, 500),
        );

        if (!mounted) return;

        setForm(initialProperty);
      } catch {
        if (mounted) {
          setError(
            "Unable to load this property. Please try again.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProperty();

    return () => {
      mounted = false;
    };
  }, [propertyId]);

  function updateField<K extends keyof PropertyForm>(
    field: K,
    value: PropertyForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSave() {
    if (!form.name.trim()) {
      setError("Property name is required.");
      return;
    }

    if (!form.city.trim()) {
      setError("City is required.");
      return;
    }

    if (form.price <= 0) {
      setError("Please enter a valid nightly price.");
      return;
    }

    try {
      setSaving(true);
      setError("");

      /*
       * Production API:
       *
       * const response = await fetch(
       *   `/api/host/properties/${propertyId}`,
       *   {
       *     method: "PATCH",
       *     headers: {
       *       "Content-Type": "application/json",
       *     },
       *     body: JSON.stringify(form),
       *   }
       * );
       *
       * if (!response.ok) {
       *   throw new Error("Failed to update property");
       * }
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 900),
      );

      router.push(`/host/property/${propertyId}`);
      router.refresh();
    } catch {
      setError(
        "Something went wrong while saving. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    const confirmed = window.confirm(
      "Are you sure you want to delete this property? This action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      setDeleting(true);
      setError("");

      /*
       * Production API:
       *
       * await fetch(
       *   `/api/host/properties/${propertyId}`,
       *   {
       *     method: "DELETE",
       *   }
       * );
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 700),
      );

      router.push("/host/properties");
      router.refresh();
    } catch {
      setError(
        "Unable to delete the property. Please try again.",
      );
    } finally {
      setDeleting(false);
    }
  }

  if (loading) {
    return <EditPropertySkeleton />;
  }

  if (error && !form.name) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] px-5 py-16">
        <div className="mx-auto max-w-xl rounded-[28px] border border-black/8 bg-white p-8 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#FFF1EF] text-[#9B4439]">
            !
          </div>

          <h1 className="mt-5 font-serif text-2xl font-semibold">
            Property could not be loaded
          </h1>

          <p className="mt-2 text-sm text-[#78716C]">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-[#18181B] px-5 py-3 text-sm font-bold text-white"
          >
            Try again
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* HEADER */}
      <header className="sticky top-0 z-30 border-b border-black/8 bg-[#FAF8F3]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
          <Link
            href={`/host/property/${propertyId}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
          >
            <ArrowLeft size={17} />
            <span className="hidden sm:inline">
              Back to property
            </span>
            <span className="sm:hidden">Back</span>
          </Link>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                router.push(`/host/property/${propertyId}`)
              }
              className="hidden rounded-xl border border-black/8 bg-white px-4 py-2.5 text-sm font-bold sm:block"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={handleSave}
              disabled={saving || deleting}
              className="inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-4 py-2.5 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? (
                <Loader2
                  size={16}
                  className="animate-spin"
                />
              ) : (
                <Save size={16} />
              )}

              {saving ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-5 py-8 sm:px-8 lg:py-10">
        {/* TITLE */}
        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
            Property management
          </p>

          <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">
            Edit property
          </h1>

          <p className="mt-2 text-sm text-[#78716C]">
            Update your property information, pricing and
            guest details.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mt-6 flex items-start gap-3 rounded-2xl border border-[#E7B7B0] bg-[#FFF1EF] p-4 text-sm text-[#873F36]">
            <span className="font-bold">!</span>

            <div>
              <p className="font-bold">
                Unable to save changes
              </p>

              <p className="mt-1">{error}</p>
            </div>
          </div>
        )}

        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_320px]">
          {/* MAIN FORM */}
          <div className="space-y-6">
            {/* BASIC INFO */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <SectionHeader
                number="01"
                title="Basic information"
                description="Tell guests what makes this property special."
              />

              <div className="mt-7 space-y-5">
                <Field
                  label="Property name"
                  required
                  value={form.name}
                  onChange={(value) =>
                    updateField("name", value)
                  }
                  placeholder="e.g. The Heritage Villa"
                />

                <div className="grid gap-5 sm:grid-cols-2">
                  <SelectField
                    label="Property type"
                    value={form.type}
                    options={[
                      "Villa",
                      "Apartment",
                      "House",
                      "Cottage",
                      "Homestay",
                      "Hotel",
                    ]}
                    onChange={(value) =>
                      updateField("type", value)
                    }
                  />

                  <NumberField
                    label="Nightly price"
                    prefix="₹"
                    value={form.price}
                    onChange={(value) =>
                      updateField("price", value)
                    }
                  />
                </div>

                <div>
                  <label className="text-xs font-bold text-[#44403C]">
                    Description
                  </label>

                  <textarea
                    value={form.description}
                    onChange={(event) =>
                      updateField(
                        "description",
                        event.target.value,
                      )
                    }
                    rows={5}
                    placeholder="Describe your property..."
                    className="mt-2 w-full resize-none rounded-xl border border-black/8 bg-[#FAF8F3] px-4 py-3 text-sm leading-6 outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
                  />

                  <p className="mt-2 text-right text-[11px] text-[#A8A29E]">
                    {form.description.length} characters
                  </p>
                </div>
              </div>
            </section>

            {/* LOCATION */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <SectionHeader
                number="02"
                title="Location"
                description="Help guests understand where your property is."
              />

              <div className="mt-7 space-y-5">
                <Field
                  label="Address / area"
                  value={form.location}
                  onChange={(value) =>
                    updateField("location", value)
                  }
                  placeholder="Street, locality or area"
                />

                <div className="grid gap-5 sm:grid-cols-3">
                  <Field
                    label="City"
                    required
                    value={form.city}
                    onChange={(value) =>
                      updateField("city", value)
                    }
                  />

                  <Field
                    label="State"
                    value={form.state}
                    onChange={(value) =>
                      updateField("state", value)
                    }
                  />

                  <Field
                    label="Country"
                    value={form.country}
                    onChange={(value) =>
                      updateField("country", value)
                    }
                  />
                </div>

                <div className="flex items-start gap-3 rounded-2xl bg-[#FFF8E8] p-4">
                  <MapPin
                    size={18}
                    className="mt-0.5 shrink-0 text-[#9A711E]"
                  />

                  <div>
                    <p className="text-sm font-bold">
                      Location visibility
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#78716C]">
                      Your exact address can remain private.
                      Guests will see the general location
                      before booking.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* GUESTS & ROOMS */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <SectionHeader
                number="03"
                title="Guests & rooms"
                description="Set the capacity and sleeping arrangements."
              />

              <div className="mt-7 grid gap-4 sm:grid-cols-2">
                <NumberField
                  label="Maximum guests"
                  value={form.guests}
                  onChange={(value) =>
                    updateField("guests", value)
                  }
                  icon={<Users size={16} />}
                />

                <NumberField
                  label="Bedrooms"
                  value={form.bedrooms}
                  onChange={(value) =>
                    updateField("bedrooms", value)
                  }
                  icon={<BedDouble size={16} />}
                />

                <NumberField
                  label="Beds"
                  value={form.beds}
                  onChange={(value) =>
                    updateField("beds", value)
                  }
                />

                <NumberField
                  label="Bathrooms"
                  value={form.bathrooms}
                  onChange={(value) =>
                    updateField("bathrooms", value)
                  }
                />
              </div>
            </section>

            {/* PRICING */}
            <section className="rounded-[26px] border border-black/8 bg-white p-6 sm:p-8">
              <SectionHeader
                number="04"
                title="Pricing"
                description="Manage the price guests will see."
              />

              <div className="mt-7 grid gap-5 sm:grid-cols-2">
                <NumberField
                  label="Price per night"
                  prefix="₹"
                  value={form.price}
                  onChange={(value) =>
                    updateField("price", value)
                  }
                />

                <NumberField
                  label="Cleaning fee"
                  prefix="₹"
                  value={form.cleaningFee}
                  onChange={(value) =>
                    updateField("cleaningFee", value)
                  }
                />
              </div>

              <div className="mt-5 rounded-2xl border border-black/7 bg-[#FAF8F3] p-5">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-[#78716C]">
                    Guest nightly price
                  </span>

                  <span className="font-bold">
                    ₹
                    {form.price.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm">
                  <span className="text-[#78716C]">
                    Cleaning fee
                  </span>

                  <span className="font-bold">
                    ₹
                    {form.cleaningFee.toLocaleString(
                      "en-IN",
                    )}
                  </span>
                </div>
              </div>
            </section>

            {/* SAVE */}
            <div className="rounded-[26px] border border-[#D9A441]/25 bg-[#FFF8E8] p-6 sm:p-7">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-serif text-xl font-semibold">
                    Ready to save?
                  </h2>

                  <p className="mt-1 text-sm text-[#78716C]">
                    Your changes will be visible after saving.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleSave}
                  disabled={saving || deleting}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#18181B] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#292524] disabled:opacity-60"
                >
                  {saving ? (
                    <Loader2
                      size={16}
                      className="animate-spin"
                    />
                  ) : (
                    <Check size={16} />
                  )}

                  {saving
                    ? "Saving..."
                    : "Save property"}
                </button>
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <aside className="h-fit space-y-5 lg:sticky lg:top-24">
            {/* IMAGE */}
            <section className="overflow-hidden rounded-[26px] border border-black/8 bg-white">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F2F0EA]">
                {form.image ? (
                  <img
                    src={form.image}
                    alt={form.name}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-[#A8A29E]">
                    <ImagePlus size={30} />
                  </div>
                )}

                <button
                  type="button"
                  className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl bg-white/95 px-3 py-2 text-xs font-bold shadow-sm backdrop-blur"
                >
                  <ImagePlus size={14} />
                  Change photo
                </button>
              </div>

              <div className="p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A711E]">
                  Cover photo
                </p>

                <p className="mt-2 text-sm font-semibold">
                  {form.name}
                </p>

                <p className="mt-1 text-xs text-[#78716C]">
                  This image appears first on your listing.
                </p>
              </div>
            </section>

            {/* COMPLETION */}
            <section className="rounded-[26px] border border-black/8 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A711E]">
                Listing status
              </p>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F3F8EE] text-[#4E693E]">
                  <Check size={18} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    Published
                  </p>

                  <p className="text-xs text-[#78716C]">
                    Visible to guests
                  </p>
                </div>
              </div>
            </section>

            {/* QUICK NAV */}
            <section className="rounded-[26px] border border-black/8 bg-white p-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#A8A29E]">
                Property
              </p>

              <div className="mt-3 divide-y divide-black/7">
                <QuickLink
                  href={`/host/property/${propertyId}`}
                  label="View property"
                />

                <QuickLink
                  href={`/host/bookings?propertyId=${propertyId}`}
                  label="View bookings"
                />

                <QuickLink
                  href={`/host/calendar?propertyId=${propertyId}`}
                  label="Open calendar"
                />
              </div>
            </section>

            {/* DELETE */}
            <section className="rounded-[26px] border border-[#E7B7B0]/70 bg-[#FFF8F6] p-5">
              <p className="text-sm font-bold text-[#873F36]">
                Delete property
              </p>

              <p className="mt-1 text-xs leading-5 text-[#9B665E]">
                This will permanently remove the property
                from your listings.
              </p>

              <button
                type="button"
                onClick={handleDelete}
                disabled={deleting || saving}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#D7A39C] px-4 py-2.5 text-xs font-bold text-[#873F36] transition hover:bg-[#FDECE8] disabled:opacity-50"
              >
                {deleting ? (
                  <Loader2
                    size={15}
                    className="animate-spin"
                  />
                ) : (
                  <Trash2 size={15} />
                )}

                {deleting
                  ? "Deleting..."
                  : "Delete property"}
              </button>
            </section>
          </aside>
        </div>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* SECTION HEADER                                                              */
/* -------------------------------------------------------------------------- */

function SectionHeader({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#FFF8E8] text-xs font-bold text-[#9A711E]">
        {number}
      </div>

      <div>
        <h2 className="font-serif text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-1 text-sm text-[#78716C]">
          {description}
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* FIELD                                                                       */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="text-xs font-bold text-[#44403C]">
        {label}

        {required && (
          <span className="ml-1 text-[#9A711E]">*</span>
        )}
      </label>

      <input
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#FAF8F3] px-4 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* SELECT                                                                      */
/* -------------------------------------------------------------------------- */

function SelectField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: string[];
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label className="text-xs font-bold text-[#44403C]">
        {label}
      </label>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="mt-2 h-12 w-full rounded-xl border border-black/8 bg-[#FAF8F3] px-4 text-sm outline-none focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* NUMBER FIELD                                                                */
/* -------------------------------------------------------------------------- */

function NumberField({
  label,
  value,
  onChange,
  prefix,
  icon,
}: {
  label: string;
  value: number;
  onChange: (value: number) => void;
  prefix?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div>
      <label className="flex items-center gap-1.5 text-xs font-bold text-[#44403C]">
        {icon}
        {label}
      </label>

      <div className="relative mt-2">
        {prefix && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-[#9A711E]">
            {prefix}
          </span>
        )}

        <input
          type="number"
          min={0}
          value={value}
          onChange={(event) =>
            onChange(Number(event.target.value))
          }
          className={`h-12 w-full rounded-xl border border-black/8 bg-[#FAF8F3] pr-4 text-sm font-semibold outline-none transition focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10 ${
            prefix ? "pl-9" : "pl-4"
          }`}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* QUICK LINK                                                                  */
/* -------------------------------------------------------------------------- */

function QuickLink({
  href,
  label,
}: {
  href: string;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between py-3 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
    >
      {label}

      <ChevronRight size={15} />
    </Link>
  );
}

/* -------------------------------------------------------------------------- */
/* LOADING SKELETON                                                            */
/* -------------------------------------------------------------------------- */

function EditPropertySkeleton() {
  return (
    <main className="min-h-screen bg-[#FAF8F3]">
      <header className="border-b border-black/8 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-8">
          <div className="h-5 w-32 animate-pulse rounded bg-[#E7E3D9]" />
          <div className="h-10 w-32 animate-pulse rounded-xl bg-[#E7E3D9]" />
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="h-4 w-32 animate-pulse rounded bg-[#E7E3D9]" />

        <div className="mt-3 h-10 w-64 animate-pulse rounded bg-[#E7E3D9]" />

        <div className="mt-8 grid gap-7 lg:grid-cols-[1fr_320px]">
          <div className="space-y-6">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-64 animate-pulse rounded-[26px] bg-white"
              />
            ))}
          </div>

          <div className="h-[420px] animate-pulse rounded-[26px] bg-white" />
        </div>
      </div>
    </main>
  );
}