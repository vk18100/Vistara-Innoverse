"use client";

import PropertyCard from "./propertycard";
import type { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {
  if (properties.length === 0) {
    return (
      <div className="flex min-h-[320px] items-center justify-center rounded-[28px] border border-stone-200 bg-[#FAF9F6] px-6 py-12 text-center">
        <div className="max-w-md">
          <div
            aria-hidden="true"
            className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#F1E9DC] text-2xl text-[#9A7653]"
          >
            ✦
          </div>

          <h3 className="mt-5 text-xl font-semibold tracking-tight text-[#292524]">
            No stays found
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#78716C]">
            We couldn't find stays matching your current search. Try another
            destination or adjust your filters.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section
      aria-label="Available stays"
      className="w-full"
    >
      <div
        className="
          grid
          grid-cols-1
          gap-x-5
          gap-y-10
          sm:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
          2xl:gap-x-6
        "
      >
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            property={property}
          />
        ))}
      </div>
    </section>
  );
}