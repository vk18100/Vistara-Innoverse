"use client";

import Image from "next/image";
import Link from "next/link";

import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-[#03045E]/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden">

        <Image
          src={property.image}
          alt={property.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/40 via-transparent to-transparent" />

        {/* Featured */}
        {property.featured && (
          <span className="absolute left-4 top-4 rounded-full bg-[#03045E] px-3 py-1.5 text-xs font-semibold text-white">
            Featured
          </span>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label="Add to wishlist"
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#03045E] shadow-md transition hover:scale-105"
        >
          ♡
        </button>

        {/* ML Recommendation */}
        {property.ml?.recommendationScore && (
          <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E] shadow-md">
            {property.ml.recommendationScore}% Match
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-5">

        <div className="mb-2 flex items-start justify-between gap-4">

          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-[#0D21A1]">
              {property.type}
            </p>

            <h3 className="mt-1 line-clamp-1 text-lg font-bold text-[#03045E]">
              {property.title}
            </h3>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#03045E]">
            <span>★</span>
            <span>{property.rating}</span>
          </div>
        </div>

        <p className="line-clamp-1 text-sm text-gray-500">
          {property.location}
        </p>

        <div className="mt-3 flex gap-3 text-xs text-gray-500">
          <span>{property.guests} guests</span>
          <span>•</span>
          <span>{property.bedrooms} bedrooms</span>
          <span>•</span>
          <span>{property.bathrooms} baths</span>
        </div>

        {/* ML TRUST */}
        {property.ml?.trustScore !== undefined && (
          <div className="mt-4 flex items-center justify-between rounded-xl bg-[#03045E]/5 px-3 py-2">

            <span className="text-xs font-medium text-[#03045E]">
              Vistara Trust
            </span>

            <span className="text-sm font-bold text-[#0D21A1]">
              {property.ml.trustScore}/100
            </span>
          </div>
        )}

        {/* PRICE */}
        <div className="mt-5 flex items-end justify-between">

          <div>
            <span className="text-xl font-bold text-[#03045E]">
              ₹{property.price.toLocaleString("en-IN")}
            </span>

            <span className="ml-1 text-xs text-gray-500">
              / night
            </span>
          </div>

          <Link
            href={`/property/${property.id}`}
            className="rounded-xl bg-[#03045E] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            View Stay
          </Link>
        </div>
      </div>
    </article>
  );
}