import PropertyCard from "@/components/cards/properCard";
import { properties } from "@/data/properties";

export default function PropertyGrid() {
  return (
    <section className="bg-white px-6 py-16 lg:px-10">
      <div className="mx-auto max-w-7xl">

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0D21A1]">
            VISTARA STAYS
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E]">
            Places worth staying in
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

      </div>
    </section>
  );
}