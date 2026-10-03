"use client";

import {
  Bath,
  BedDouble,
  Car,
  Coffee,
  Home,
  ShieldCheck,
  Sparkles,
  Tv,
  Utensils,
  Wifi,
  Waves,
  Wind,
} from "lucide-react";

type AmenProps = {
  amenities?: string[];
};

const amenityIcons: Record<string, React.ElementType> = {
  wifi: Wifi,
  "free wifi": Wifi,
  kitchen: Utensils,
  "air conditioning": Wind,
  "air conditioner": Wind,
  tv: Tv,
  parking: Car,
  "free parking": Car,
  pool: Waves,
  swimming: Waves,
  breakfast: Coffee,
  bed: BedDouble,
  bedroom: BedDouble,
  bathroom: Bath,
  "private bathroom": Bath,
  home: Home,
  verified: ShieldCheck,
};

function getAmenityIcon(amenity: string) {
  const normalized = amenity.toLowerCase().trim();

  const matchedKey = Object.keys(amenityIcons).find((key) =>
    normalized.includes(key)
  );

  return matchedKey ? amenityIcons[matchedKey] : Sparkles;
}

export default function Amen({ amenities = [] }: AmenProps) {
  if (amenities.length === 0) {
    return null;
  }

  return (
    <section
      className="border-b border-[#E7E5E4] py-8 sm:py-10"
      aria-labelledby="amenities-heading"
    >
      {/* HEADER */}
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#78716C]">
            Amenities
          </p>

          <h2
            id="amenities-heading"
            className="mt-2 text-xl font-semibold tracking-tight text-[#292524] sm:text-2xl"
          >
            What this place offers
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#78716C]">
            Everything you need for a comfortable stay.
          </p>
        </div>

        <span className="hidden rounded-full bg-[#F5F1E8] px-3 py-1.5 text-xs font-medium text-[#57534E] sm:inline-flex">
          {amenities.length} amenities
        </span>
      </div>

      {/* AMENITIES */}
      <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {amenities.map((amenity) => {
          const Icon = getAmenityIcon(amenity);

          return (
            <div
              key={amenity}
              className="
                group flex items-center gap-4
                rounded-2xl
                border border-[#E7E5E4]
                bg-white
                px-4 py-4
                transition-all duration-200
                hover:-translate-y-0.5
                hover:border-[#D6D3D1]
                hover:bg-[#FCFBF8]
                hover:shadow-[0_8px_24px_rgba(41,37,36,0.06)]
              "
            >
              {/* ICON */}
              <div
                className="
                  flex h-10 w-10 shrink-0 items-center justify-center
                  rounded-xl
                  bg-[#F5F1E8]
                  text-[#8B6F3D]
                  transition-colors
                  group-hover:bg-[#EEE8D9]
                "
              >
                <Icon size={18} strokeWidth={1.8} />
              </div>

              {/* NAME */}
              <span className="text-sm font-medium text-[#44403C]">
                {amenity}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}