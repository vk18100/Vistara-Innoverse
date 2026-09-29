"use client";

import { useState } from "react";

export type FilterValues = {
  price: string;
  propertyType: string;
  rating: string;
  verified: boolean;
};

type FiltersProps = {
  onApply?: (filters: FilterValues) => void;
};

export default function Filters({ onApply }: FiltersProps) {
  const [price, setPrice] = useState("Any");
  const [propertyType, setPropertyType] = useState("Any");
  const [rating, setRating] = useState("Any");
  const [verified, setVerified] = useState(false);

  const clearFilters = () => {
    setPrice("Any");
    setPropertyType("Any");
    setRating("Any");
    setVerified(false);

    onApply?.({
      price: "Any",
      propertyType: "Any",
      rating: "Any",
      verified: false,
    });
  };

  const handleApply = () => {
    onApply?.({
      price,
      propertyType,
      rating,
      verified,
    });
  };

  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#03045E]">
            Filters
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Refine your stay
          </p>
        </div>

        <button
          type="button"
          onClick={clearFilters}
          className="text-xs font-medium text-[#03045E] hover:underline"
        >
          Clear all
        </button>
      </div>

      <div className="mt-6 space-y-6">
        {/* Price */}
        <div>
          <label className="text-sm font-semibold text-gray-800">
            Price per night
          </label>

          <div className="mt-3 grid grid-cols-3 gap-2">
            {["Any", "₹1k–₹3k", "₹3k+"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setPrice(item)}
                className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                  price === item
                    ? "border-[#03045E] bg-[#03045E] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#03045E]"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* Property type */}
        <div>
          <label className="text-sm font-semibold text-gray-800">
            Property type
          </label>

          <div className="mt-3 space-y-2">
            {["Any", "Villa", "Apartment", "House", "Hotel"].map((item) => (
              <label
                key={item}
                className="flex cursor-pointer items-center gap-3 rounded-lg px-2 py-2 hover:bg-gray-50"
              >
                <input
                  type="radio"
                  name="propertyType"
                  checked={propertyType === item}
                  onChange={() => setPropertyType(item)}
                  className="h-4 w-4 accent-[#03045E]"
                />

                <span className="text-sm text-gray-600">
                  {item}
                </span>
              </label>
            ))}
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="text-sm font-semibold text-gray-800">
            Guest rating
          </label>

          <div className="mt-3 grid grid-cols-2 gap-2">
            {["Any", "4+", "4.5+", "4.8+"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setRating(item)}
                className={`rounded-xl border px-3 py-2 text-xs font-medium transition ${
                  rating === item
                    ? "border-[#03045E] bg-[#03045E] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#03045E]"
                }`}
              >
                {item === "Any" ? item : `★ ${item}`}
              </button>
            ))}
          </div>
        </div>

        {/* Verified */}
        <div className="border-t border-gray-100 pt-5">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={verified}
              onChange={(e) => setVerified(e.target.checked)}
              className="mt-1 h-4 w-4 accent-[#03045E]"
            />

            <div>
              <p className="text-sm font-semibold text-gray-800">
                Verified properties
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Show stays that have completed Vistara verification.
              </p>
            </div>
          </label>
        </div>

        {/* Apply */}
        <button
          type="button"
          onClick={handleApply}
          className="w-full rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#023E8A]"
        >
          Apply Filters
        </button>
      </div>
    </aside>
  );
}