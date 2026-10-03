"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Home,
  Image as ImageIcon,
  MapPin,
  Users,
  Sparkles,
} from "lucide-react";

const STEPS = [
  {
    id: 1,
    title: "Basic details",
    description: "Tell us about your property",
    icon: Home,
  },
  {
    id: 2,
    title: "Amenities",
    description: "Add facilities and features",
    icon: Sparkles,
  },
  {
    id: 3,
    title: "Guests",
    description: "Set your guest capacity",
    icon: Users,
  },
  {
    id: 4,
    title: "Location",
    description: "Add your property location",
    icon: MapPin,
  },
  {
    id: 5,
    title: "Photos",
    description: "Showcase your property",
    icon: ImageIcon,
  },
];

type FormData = {
  name: string;
  type: string;
  description: string;
  location: string;
  city: string;
  state: string;
  guests: string;
  bedrooms: string;
  beds: string;
  bathrooms: string;
  price: string;
};

const INITIAL_FORM: FormData = {
  name: "",
  type: "",
  description: "",
  location: "",
  city: "",
  state: "",
  guests: "2",
  bedrooms: "1",
  beds: "1",
  bathrooms: "1",
  price: "",
};

export default function NewPropertyPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(INITIAL_FORM);
  const [saving, setSaving] = useState(false);

  const progress = useMemo(
    () => Math.round((step / STEPS.length) * 100),
    [step],
  );

  function updateField(
    field: keyof FormData,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  function nextStep() {
    if (step < STEPS.length) {
      setStep((current) => current + 1);
    }
  }

  function previousStep() {
    if (step > 1) {
      setStep((current) => current - 1);
    }
  }

  async function saveProperty() {
    try {
      setSaving(true);

      /*
       * Connect this with your actual API when ready.
       *
       * const response = await fetch("/api/host/properties", {
       *   method: "POST",
       *   headers: {
       *     "Content-Type": "application/json",
       *   },
       *   credentials: "include",
       *   body: JSON.stringify(form),
       * });
       */

      await new Promise((resolve) =>
        setTimeout(resolve, 900),
      );

      window.location.href = "/host/properties";
    } catch (error) {
      console.error("CREATE_PROPERTY_ERROR:", error);
      window.alert(
        "Unable to create property right now.",
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      {/* Header */}
      <header className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex min-h-[76px] items-center justify-between gap-4">
            <Link
              href="/host/properties"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#57534E] transition hover:text-[#18181B]"
            >
              <ArrowLeft size={17} />
              Back to properties
            </Link>

            <div className="hidden items-center gap-2 sm:flex">
              <span className="text-xs text-[#A8A29E]">
                Property setup
              </span>

              <span className="font-serif text-lg font-semibold">
                Vistara
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Progress */}
      <section className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-6 sm:px-8 lg:px-10">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
                Step {step} of {STEPS.length}
              </p>

              <h1 className="mt-1 font-serif text-2xl font-semibold sm:text-3xl">
                Add your property
              </h1>
            </div>

            <div className="text-right">
              <p className="text-xs font-semibold text-[#71717A]">
                {progress}% complete
              </p>
            </div>
          </div>

          <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-[#EEEAE0]">
            <div
              className="h-full rounded-full bg-[#D9A441] transition-all duration-500"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>
        </div>
      </section>

      {/* Step navigation */}
      <section className="border-b border-black/[0.07] bg-[#FCFBF8]">
        <div className="mx-auto max-w-7xl overflow-x-auto px-5 py-5 sm:px-8 lg:px-10">
          <div className="flex min-w-max items-center">
            {STEPS.map((item, index) => {
              const Icon = item.icon;
              const completed = item.id < step;
              const active = item.id === step;

              return (
                <div
                  key={item.id}
                  className="flex items-center"
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (item.id <= step) {
                        setStep(item.id);
                      }
                    }}
                    className="flex items-center gap-3 text-left"
                  >
                    <span
                      className={`flex h-9 w-9 items-center justify-center rounded-full border text-xs font-bold transition ${
                        completed
                          ? "border-[#D9A441] bg-[#D9A441] text-[#18181B]"
                          : active
                            ? "border-[#18181B] bg-[#18181B] text-white"
                            : "border-black/10 bg-white text-[#A8A29E]"
                      }`}
                    >
                      {completed ? (
                        <Check size={15} />
                      ) : (
                        <Icon size={15} />
                      )}
                    </span>

                    <span className="hidden sm:block">
                      <span
                        className={`block text-xs font-bold ${
                          active
                            ? "text-[#18181B]"
                            : "text-[#57534E]"
                        }`}
                      >
                        {item.title}
                      </span>

                      <span className="mt-0.5 block text-[10px] text-[#A8A29E]">
                        {item.description}
                      </span>
                    </span>
                  </button>

                  {index !== STEPS.length - 1 && (
                    <div className="mx-4 h-px w-8 bg-black/10 sm:mx-7 sm:w-12" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-8 lg:px-10 lg:py-12">
        <div className="rounded-[28px] border border-black/[0.07] bg-white shadow-[0_18px_55px_rgba(24,24,27,0.05)]">
          <div className="p-6 sm:p-8 lg:p-10">
            {step === 1 && (
              <BasicDetails
                form={form}
                updateField={updateField}
              />
            )}

            {step === 2 && <AmenitiesStep />}

            {step === 3 && (
              <GuestsStep
                form={form}
                updateField={updateField}
              />
            )}

            {step === 4 && (
              <LocationStep
                form={form}
                updateField={updateField}
              />
            )}

            {step === 5 && (
              <PhotosStep />
            )}
          </div>

          {/* Footer actions */}
          <div className="flex flex-col-reverse gap-3 border-t border-black/[0.07] bg-[#FCFBF8] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <button
              type="button"
              onClick={previousStep}
              disabled={step === 1}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-black/10 bg-white px-5 text-sm font-bold text-[#57534E] transition hover:border-black/20 hover:bg-[#FAF8F3] disabled:cursor-not-allowed disabled:opacity-40"
            >
              <ArrowLeft size={16} />
              Back
            </button>

            {step < STEPS.length ? (
              <button
                type="button"
                onClick={nextStep}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-6 text-sm font-bold text-[#18181B] shadow-[0_10px_25px_rgba(217,164,65,0.18)] transition hover:bg-[#E7C46D]"
              >
                Continue
                <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="button"
                onClick={saveProperty}
                disabled={saving}
                className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-[#18181B] px-6 text-sm font-bold text-white transition hover:bg-[#292524] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Create property"}
                {!saving && <Check size={16} />}
              </button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Basic details                                                               */
/* -------------------------------------------------------------------------- */

function BasicDetails({
  form,
  updateField,
}: {
  form: FormData;
  updateField: (
    field: keyof FormData,
    value: string,
  ) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Property basics"
        title="Tell us about your stay"
        description="Start with the essential information guests will see first."
      />

      <div className="mt-8 grid gap-6">
        <Field
          label="Property name"
          required
          placeholder="Example: Vistara Beach House"
          value={form.name}
          onChange={(value) =>
            updateField("name", value)
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <SelectField
            label="Property type"
            required
            value={form.type}
            onChange={(value) =>
              updateField("type", value)
            }
            options={[
              "Villa",
              "Apartment",
              "Beach House",
              "Homestay",
              "Farm Stay",
              "Heritage Stay",
              "Private Room",
              "Guest House",
            ]}
          />

          <Field
            label="Price per night"
            type="number"
            placeholder="₹ 5,000"
            value={form.price}
            onChange={(value) =>
              updateField("price", value)
            }
          />
        </div>

        <TextAreaField
          label="Description"
          required
          placeholder="Describe what makes your property special..."
          value={form.description}
          onChange={(value) =>
            updateField("description", value)
          }
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Amenities                                                                   */
/* -------------------------------------------------------------------------- */

function AmenitiesStep() {
  const amenities = [
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

  const [selected, setSelected] = useState<string[]>([]);

  function toggle(item: string) {
    setSelected((current) =>
      current.includes(item)
        ? current.filter((value) => value !== item)
        : [...current, item],
    );
  }

  return (
    <div>
      <StepHeading
        eyebrow="Property features"
        title="What does your property offer?"
        description="Choose the amenities available to guests."
      />

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((item) => {
          const active = selected.includes(item);

          return (
            <button
              key={item}
              type="button"
              onClick={() => toggle(item)}
              className={`flex min-h-14 items-center justify-between rounded-2xl border px-4 text-left text-sm font-semibold transition ${
                active
                  ? "border-[#D9A441]/60 bg-[#FFF8E8] text-[#765817]"
                  : "border-black/[0.08] bg-white text-[#57534E] hover:border-[#D9A441]/35 hover:bg-[#FCFBF8]"
              }`}
            >
              {item}

              <span
                className={`flex h-6 w-6 items-center justify-center rounded-full border ${
                  active
                    ? "border-[#D9A441] bg-[#D9A441] text-[#18181B]"
                    : "border-black/10"
                }`}
              >
                {active && <Check size={13} />}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Guests                                                                      */
/* -------------------------------------------------------------------------- */

function GuestsStep({
  form,
  updateField,
}: {
  form: FormData;
  updateField: (
    field: keyof FormData,
    value: string,
  ) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Guest capacity"
        title="How many guests can stay?"
        description="Set the capacity and sleeping arrangements for your property."
      />

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <NumberField
          label="Maximum guests"
          value={form.guests}
          onChange={(value) =>
            updateField("guests", value)
          }
        />

        <NumberField
          label="Bedrooms"
          value={form.bedrooms}
          onChange={(value) =>
            updateField("bedrooms", value)
          }
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
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Location                                                                    */
/* -------------------------------------------------------------------------- */

function LocationStep({
  form,
  updateField,
}: {
  form: FormData;
  updateField: (
    field: keyof FormData,
    value: string,
  ) => void;
}) {
  return (
    <div>
      <StepHeading
        eyebrow="Property location"
        title="Where is your property?"
        description="Add the location guests will use to find your stay."
      />

      <div className="mt-8 grid gap-6">
        <Field
          label="Address"
          required
          placeholder="Street, landmark or locality"
          value={form.location}
          onChange={(value) =>
            updateField("location", value)
          }
        />

        <div className="grid gap-6 sm:grid-cols-2">
          <Field
            label="City"
            required
            placeholder="Patna"
            value={form.city}
            onChange={(value) =>
              updateField("city", value)
            }
          />

          <Field
            label="State"
            required
            placeholder="Bihar"
            value={form.state}
            onChange={(value) =>
              updateField("state", value)
            }
          />
        </div>

        <div className="flex items-start gap-3 rounded-2xl border border-[#D9A441]/20 bg-[#FFF8E8] p-4">
          <MapPin
            size={18}
            className="mt-0.5 shrink-0 text-[#9A711E]"
          />

          <div>
            <p className="text-sm font-bold text-[#765817]">
              Location privacy
            </p>

            <p className="mt-1 text-xs leading-5 text-[#8A651B]">
              Your exact address can remain private until a
              booking is confirmed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Photos                                                                      */
/* -------------------------------------------------------------------------- */

function PhotosStep() {
  return (
    <div>
      <StepHeading
        eyebrow="Property gallery"
        title="Show guests your space"
        description="Add clear, high-quality photos of your property."
      />

      <div className="mt-8 rounded-3xl border-2 border-dashed border-black/10 bg-[#FCFBF8] px-6 py-14 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
          <ImageIcon size={28} />
        </div>

        <h3 className="mt-5 font-serif text-xl font-semibold">
          Upload property photos
        </h3>

        <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78716C]">
          Add photos of bedrooms, bathrooms, living spaces,
          exterior areas and special features.
        </p>

        <button
          type="button"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] transition hover:bg-[#E7C46D]"
        >
          <ImageIcon size={17} />
          Choose photos
        </button>

        <p className="mt-4 text-[11px] text-[#A8A29E]">
          JPG, PNG or WEBP · Recommended landscape photos
        </p>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Reusable UI                                                                 */
/* -------------------------------------------------------------------------- */

function StepHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9A711E]">
        {eyebrow}
      </p>

      <h2 className="mt-2 font-serif text-3xl font-semibold tracking-tight sm:text-4xl">
        {title}
      </h2>

      <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71717A]">
        {description}
      </p>
    </div>
  );
}

function Field({
  label,
  required,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#44403C]">
        {label}
        {required && (
          <span className="ml-1 text-[#9A711E]">*</span>
        )}
      </span>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-[#18181B] outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      />
    </label>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field
      label={label}
      type="number"
      value={value}
      onChange={onChange}
    />
  );
}

function SelectField({
  label,
  required,
  value,
  onChange,
  options,
}: {
  label: string;
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  options: string[];
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#44403C]">
        {label}
        {required && (
          <span className="ml-1 text-[#9A711E]">*</span>
        )}
      </span>

      <select
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        className="h-12 w-full rounded-xl border border-black/10 bg-white px-4 text-sm text-[#18181B] outline-none transition focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      >
        <option value="">Select property type</option>

        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}

function TextAreaField({
  label,
  required,
  placeholder,
  value,
  onChange,
}: {
  label: string;
  required?: boolean;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-bold text-[#44403C]">
        {label}
        {required && (
          <span className="ml-1 text-[#9A711E]">*</span>
        )}
      </span>

      <textarea
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        rows={6}
        className="w-full resize-none rounded-xl border border-black/10 bg-white px-4 py-3 text-sm leading-6 text-[#18181B] outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      />
    </label>
  );
}