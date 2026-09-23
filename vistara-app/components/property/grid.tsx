"use client";

import PropertyCard from "./propertycard";
import { Property } from "@/types/property";

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({
  properties,
}: PropertyGridProps) {
  if (!properties.length) {
    return (
      <div className="rounded-2xl border border-[#03045E]/10 bg-white p-12 text-center">
        <h3 className="text-xl font-bold text-[#03045E]">
          No stays found
        </h3>

        <p className="mt-2 text-sm text-gray-500">
          Try changing your search or filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {properties.map((property) => (
        <PropertyCard
          key={property.id}
          property={property}
        />
      ))}
    </div>
  );
}