"use client";

import { useMemo, useState } from "react";

export type FilterValues = {
  price: string;
  propertyType: string;
  rating: string;
  verified: boolean;
  amenities: string[];
};

type FiltersProps = {
  onApply?: (filters: FilterValues) => void;
};

const PRICE_OPTIONS = [
  { label: "Any price", value: "Any" },
  { label: "Under ₹1,000", value: "₹1k" },
  { label: "₹1,000 – ₹3,000", value: "₹1k–₹3k" },
  { label: "₹3,000+", value: "₹3k+" },
];

const PROPERTY_TYPES = [
  { label: "Any type", value: "Any", icon: "✦" },
  { label: "Villa", value: "Villa", icon: "⌂" },
  { label: "Apartment", value: "Apartment", icon: "▦" },
  { label: "House", value: "House", icon: "⌂" },
  { label: "Hotel", value: "Hotel", icon: "▤" },
];

const RATINGS = [
  { label: "Any rating", value: "Any" },
  { label: "4.0+", value: "4" },
  { label: "4.5+", value: "4.5" },
  { label: "4.8+", value: "4.8" },
];

const AMENITIES = [
  "Wi-Fi",
  "Parking",
  "Kitchen",
  "Pool",
  "Air conditioning",
];

const DEFAULT_FILTERS: FilterValues = {
  price: "Any",
  propertyType: "Any",
  rating: "Any",
  verified: false,
  amenities: [],
};

export default function Filters({ onApply }: FiltersProps) {
  const [price, setPrice] = useState(DEFAULT_FILTERS.price);
  const [propertyType, setPropertyType] = useState(
    DEFAULT_FILTERS.propertyType
  );
  const [rating, setRating] = useState(DEFAULT_FILTERS.rating);
  const [verified, setVerified] = useState(DEFAULT_FILTERS.verified);
  const [amenities, setAmenities] = useState<string[]>(
    DEFAULT_FILTERS.amenities
  );

  const activeFilterCount = useMemo(() => {
    let count = 0;

    if (price !== "Any") count++;
    if (propertyType !== "Any") count++;
    if (rating !== "Any") count++;
    if (verified) count++;
    count += amenities.length;

    return count;
  }, [price, propertyType, rating, verified, amenities]);

  const getFilters = (): FilterValues => ({
    price,
    propertyType,
    rating,
    verified,
    amenities,
  });

  const clearFilters = () => {
    setPrice("Any");
    setPropertyType("Any");
    setRating("Any");
    setVerified(false);
    setAmenities([]);

    onApply?.(DEFAULT_FILTERS);
  };

  const handleApply = () => {
    onApply?.(getFilters());
  };

  const toggleAmenity = (amenity: string) => {
    setAmenities((current) =>
      current.includes(amenity)
        ? current.filter((item) => item !== amenity)
        : [...current, amenity]
    );
  };

  return (
    <aside
      className="
        w-full
        overflow-hidden
        rounded-[28px]
        border border-[#E7E2D8]
        bg-[#FFFDF9]
        shadow-[0_15px_45px_rgba(41,37,36,0.06)]
      "
    >
      {/* HEADER */}

      <div className="border-b border-[#E7E2D8] px-5 py-5 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-semibold text-[#292524]">
                Refine your stay
              </h2>

              {activeFilterCount > 0 && (
                <span className="flex h-6 min-w-6 items-center justify-center rounded-full bg-[#B96342] px-1.5 text-[11px] font-bold text-white">
                  {activeFilterCount}
                </span>
              )}
            </div>

            <p className="mt-1 text-xs leading-5 text-[#78716C]">
              Find a place that feels right for your journey.
            </p>
          </div>

          {activeFilterCount > 0 && (
            <button
              type="button"
              onClick={clearFilters}
              className="
                shrink-0
                text-xs
                font-semibold
                text-[#B96342]
                transition
                hover:text-[#8B4933]
                hover:underline
              "
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      <div className="space-y-7 p-5 sm:p-6">

        {/* PRICE */}

        <section>
          <FilterHeading
            title="Price per night"
            subtitle="Choose your comfort range"
          />

          <div className="mt-4 grid grid-cols-2 gap-2">
            {PRICE_OPTIONS.map((option) => {
              const active = price === option.value;

              return (
                <button
                  key={option.value}
                  type="button"
                  onClick={() => setPrice(option.value)}
                  className={`
                    rounded-2xl
                    border
                    px-3
                    py-3
                    text-left
                    transition-all
                    duration-200
                    ${
                      active
                        ? "border-[#B96342] bg-[#F7EDE7] text-[#8B4933]"
                        : "border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C6A15B] hover:bg-[#FCF8F1]"
                    }
                  `}
                >
                  <span className="block text-xs font-semibold">
                    {option.label}
                  </span>

                  {active && (
                    <span className="mt-1 block text-[10px] font-medium text-[#B96342]">
                      Selected
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </section>

        {/* PROPERTY TYPE */}

        <section>
          <FilterHeading
            title="Stay type"
            subtitle="What kind of place are you looking for?"
          />

          <div className="mt-4 grid grid-cols-2 gap-2">
            {PROPERTY_TYPES.map((type) => {
              const active = propertyType === type.value;

              return (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setPropertyType(type.value)}
                  className={`
                    flex
                    items-center
                    gap-3
                    rounded-2xl
                    border
                    px-3
                    py-3
                    text-left
                    transition-all
                    ${
                      active
                        ? "border-[#B96342] bg-[#F7EDE7]"
                        : "border-[#E7E2D8] bg-white hover:border-[#C6A15B] hover:bg-[#FCF8F1]"
                    }
                  `}
                >
                  <span
                    className={`
                      flex
                      h-8
                      w-8
                      shrink-0
                      items-center
                      justify-center
                      rounded-xl
                      text-sm
                      ${
                        active
                          ? "bg-[#B96342] text-white"
                          : "bg-[#F7F3EA] text-[#8B6F3D]"
                      }
                    `}
                  >
                    {type.icon}
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      active ? "text-[#8B4933]" : "text-[#57534E]"
                    }`}
                  >
                    {type.label}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        {/* RATING */}

        <section>
          <FilterHeading
            title="Guest rating"
            subtitle="Choose a minimum rating"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {RATINGS.map((item) => {
              const active = rating === item.value;

              return (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => setRating(item.value)}
                  className={`
                    rounded-full
                    border
                    px-4
                    py-2.5
                    text-xs
                    font-semibold
                    transition
                    ${
                      active
                        ? "border-[#B96342] bg-[#B96342] text-white"
                        : "border-[#E7E2D8] bg-white text-[#57534E] hover:border-[#C6A15B]"
                    }
                  `}
                >
                  {item.value !== "Any" && (
                    <span className="mr-1 text-[#D9A441]">★</span>
                  )}

                  {item.label}
                </button>
              );
            })}
          </div>
        </section>

        {/* AMENITIES */}

        <section>
          <FilterHeading
            title="Amenities"
            subtitle="Make your stay feel more like you"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {AMENITIES.map((amenity) => {
              const active = amenities.includes(amenity);

              return (
                <button
                  key={amenity}
                  type="button"
                  onClick={() => toggleAmenity(amenity)}
                  className={`
                    rounded-full
                    border
                    px-3.5
                    py-2
                    text-xs
                    font-medium
                    transition
                    ${
                      active
                        ? "border-[#8B6F3D] bg-[#F7F3EA] text-[#6B532F]"
                        : "border-[#E7E2D8] bg-white text-[#78716C] hover:border-[#C6A15B]"
                    }
                  `}
                >
                  {active && (
                    <span className="mr-1.5 text-[#B96342]">✓</span>
                  )}

                  {amenity}
                </button>
              );
            })}
          </div>
        </section>

        {/* VERIFIED */}

        <section className="rounded-2xl border border-[#E7E2D8] bg-[#F9F5ED] p-4">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={verified}
              onChange={(event) => setVerified(event.target.checked)}
              className="
                mt-0.5
                h-4
                w-4
                shrink-0
                cursor-pointer
                accent-[#B96342]
              "
            />

            <div>
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-[#292524]">
                  Verified stays only
                </p>

                <span className="rounded-full bg-white px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#8B6F3D]">
                  Vistara
                </span>
              </div>

              <p className="mt-1 text-xs leading-5 text-[#78716C]">
                Show properties that have completed Vistara verification.
              </p>
            </div>
          </label>
        </section>

        {/* APPLY */}

        <button
          type="button"
          onClick={handleApply}
          className="
            group
            flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-2xl
            bg-[#292524]
            px-5
            py-3.5
            text-sm
            font-semibold
            text-white
            transition-all
            duration-200
            hover:bg-[#B96342]
            active:scale-[0.99]
          "
        >
          <span>
            {activeFilterCount > 0
              ? `Show stays · ${activeFilterCount} filter${
                  activeFilterCount === 1 ? "" : "s"
                }`
              : "Show all stays"}
          </span>

          <span className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </aside>
  );
}

/* ---------------- FILTER HEADING ---------------- */

function FilterHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-[#292524]">
        {title}
      </h3>

      <p className="mt-1 text-[11px] leading-5 text-[#A8A29E]">
        {subtitle}
      </p>
    </div>
  );
}