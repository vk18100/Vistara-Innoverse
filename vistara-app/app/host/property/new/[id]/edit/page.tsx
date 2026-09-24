"use client";

import { FormEvent, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

const propertyData: Record<
  string,
  {
    name: string;
    location: string;
    type: string;
    guests: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    description: string;
    image: string;
  }
> = {
  "1": {
    name: "The Heritage Courtyard",
    location: "Patna, Bihar",
    type: "Entire villa",
    guests: "6",
    price: "4500",
    bedrooms: "3",
    bathrooms: "2",
    description:
      "A peaceful heritage-inspired villa in Patna, designed for travellers looking for comfort, privacy and a memorable local experience.",
    image: "/images/pag1 (1).jpg",
  },

  "2": {
    name: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    type: "Private stay",
    guests: "4",
    price: "3800",
    bedrooms: "2",
    bathrooms: "2",
    description:
      "A relaxing riverside retreat with comfortable interiors and easy access to the city's important destinations.",
    image: "/images/pag1 (2).jpg",
  },

  "3": {
    name: "The Quiet House",
    location: "Bodh Gaya, Bihar",
    type: "Entire home",
    guests: "5",
    price: "3200",
    bedrooms: "3",
    bathrooms: "2",
    description:
      "A calm and private home in Bodh Gaya, suitable for families and travellers looking for a peaceful stay.",
    image: "/images/pag1 (3).jpg",
  },
};

export default function EditPropertyPage() {
  const params = useParams();
  const router = useRouter();

  const id = String(params.id);

  const property = propertyData[id];

  const [name, setName] = useState(property?.name ?? "");
  const [location, setLocation] = useState(property?.location ?? "");
  const [type, setType] = useState(property?.type ?? "Entire villa");
  const [guests, setGuests] = useState(property?.guests ?? "");
  const [price, setPrice] = useState(property?.price ?? "");
  const [bedrooms, setBedrooms] = useState(
    property?.bedrooms ?? ""
  );
  const [bathrooms, setBathrooms] = useState(
    property?.bathrooms ?? ""
  );
  const [description, setDescription] = useState(
    property?.description ?? ""
  );

  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!property) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
        <Navbar />

        <section className="mx-auto max-w-4xl px-6 py-20 text-center">
          <h1 className="font-serif text-4xl font-semibold">
            Property not found
          </h1>

          <p className="mt-3 text-sm text-[#64748B]">
            The property you are trying to edit does not exist.
          </p>

          <Link
            href="/host/properties"
            className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white"
          >
            Back to properties
          </Link>
        </section>
      </main>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setSaving(true);
    setSaved(false);

    /*
      Later API:

      await fetch(`/api/host/properties/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          location,
          type,
          guests,
          price,
          bedrooms,
          bathrooms,
          description,
        }),
      });
    */

    setTimeout(() => {
      setSaving(false);
      setSaved(true);
    }, 800);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-5xl px-6 py-8 lg:px-10">
          <Link
            href={`/host/property/${id}`}
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to property
          </Link>

          <div className="mt-7">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
              PROPERTY SETTINGS
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              Edit property
            </h1>

            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
              Update your property information, pricing and guest
              details.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-5xl px-6 py-10 lg:px-10">
        <form onSubmit={handleSubmit} className="space-y-7">
          {/* BASIC INFORMATION */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              BASIC INFORMATION
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Property details
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Input
                label="Property name"
                value={name}
                onChange={setName}
                placeholder="Enter property name"
              />

              <Input
                label="Location"
                value={location}
                onChange={setLocation}
                placeholder="City, State"
              />

              <div>
                <label className="text-sm font-semibold">
                  Property type
                </label>

                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#03045E]"
                >
                  <option>Entire villa</option>
                  <option>Private stay</option>
                  <option>Entire home</option>
                  <option>Apartment</option>
                  <option>Guest house</option>
                  <option>Cottage</option>
                </select>
              </div>

              <Input
                label="Maximum guests"
                value={guests}
                onChange={setGuests}
                type="number"
                placeholder="6"
              />
            </div>
          </div>

          {/* SPACE */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              SPACE & CAPACITY
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Accommodation
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Input
                label="Bedrooms"
                value={bedrooms}
                onChange={setBedrooms}
                type="number"
                placeholder="3"
              />

              <Input
                label="Bathrooms"
                value={bathrooms}
                onChange={setBathrooms}
                type="number"
                placeholder="2"
              />
            </div>
          </div>

          {/* PRICING */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PRICING
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Nightly price
            </h2>

            <div className="mt-7 max-w-md">
              <label className="text-sm font-semibold">
                Price per night
              </label>

              <div className="relative mt-2">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                  ₹
                </span>

                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-xl border border-[#03045E]/15 bg-white py-3 pl-9 pr-4 text-sm outline-none transition focus:border-[#03045E]"
                />
              </div>

              <p className="mt-2 text-xs text-[#94A3B8]">
                This is the base nightly price shown to guests.
              </p>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              DESCRIPTION
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Tell guests about your property
            </h2>

            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={7}
              placeholder="Describe your property..."
              className="mt-7 w-full resize-none rounded-xl border border-[#03045E]/15 bg-white px-4 py-3 text-sm leading-6 outline-none transition focus:border-[#03045E]"
            />

            <p className="mt-2 text-xs text-[#94A3B8]">
              A clear description helps guests understand what makes
              your property special.
            </p>
          </div>

          {/* CURRENT IMAGE */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PROPERTY PHOTO
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Current cover image
            </h2>

            <div className="relative mt-6 h-64 overflow-hidden rounded-2xl">
              <Image
                src={property.image}
                alt={property.name}
                fill
                sizes="(max-width: 1024px) 100vw, 900px"
                className="object-cover"
              />
            </div>

            <button
              type="button"
              className="mt-4 rounded-xl border border-[#03045E]/15 px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
            >
              Change photos
            </button>
          </div>

          {/* SAVE */}
          <div className="flex flex-col gap-4 rounded-[30px] border border-[#03045E]/10 bg-white p-6 shadow-[0_12px_40px_rgba(3,4,94,0.04)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              {saved ? (
                <p className="text-sm font-semibold text-emerald-700">
                  ✓ Changes saved successfully
                </p>
              ) : (
                <p className="text-sm text-[#64748B]">
                  Make sure your information is accurate before saving.
                </p>
              )}
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/host/property/${id}`}
                className="rounded-xl border border-[#03045E]/15 px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

function Input({
  label,
  value,
  onChange,
  type = "text",
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">{label}</label>

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#03045E]"
      />
    </div>
  );
}