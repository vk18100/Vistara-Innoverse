"use client";

import { useState } from "react";

export default function Filters() {
  const [price, setPrice] = useState("Any");
  const [propertyType, setPropertyType] = useState("Any");
  const [rating, setRating] = useState("Any");
  const [verified, setVerified] = useState(false);

  return (
    <aside className="w-full rounded-2xl border border-gray-200 bg-white p-5">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-[#03045e]">
            Filters
          </h2>

          <p className="mt-1 text-xs text-gray-500">
            Refine your stay
          </p>
        </div>

        <button
          type="button"
          className="text-xs font-medium text-[#03045e] hover:underline"
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
                    ? "border-[#03045e] bg-[#03045e] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#03045e]"
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
                  className="h-4 w-4 accent-[#03045e]"
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
                className={`rounded-xl border px-3 py-2 text-xs font-medium ${
                  rating === item
                    ? "border-[#03045e] bg-[#03045e] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#03045e]"
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
              className="mt-1 h-4 w-4 accent-[#03045e]"
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
          className="w-full rounded-xl bg-[#03045e] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
        >
          Apply Filters
        </button>

      </div>
    </aside>
  );
}