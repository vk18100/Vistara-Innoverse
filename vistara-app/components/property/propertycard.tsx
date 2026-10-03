"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShieldCheck, ArrowUpRight } from "lucide-react";

import { Property } from "@/types/property";

interface PropertyCardProps {
  property: Property;
}

export default function PropertyCard({
  property,
}: PropertyCardProps) {
  const rating = Number(property.rating ?? 0);
  const price = Number(property.price ?? 0);

  return (
    <article className="group min-w-0">
      {/* IMAGE */}
      <div className="relative overflow-hidden rounded-[24px] bg-[#F3F1EA]">
        <Link
          href={`/stays/${property.id}`}
          aria-label={`View ${property.title}`}
          className="block"
        >
          <div className="relative aspect-[4/3]">
            <Image
              src={property.image}
              alt={property.title}
              fill
              sizes="
                (max-width: 640px) 100vw,
                (max-width: 1024px) 50vw,
                (max-width: 1280px) 33vw,
                25vw
              "
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.04]"
            />

            {/* Soft image overlay */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/5" />
          </div>
        </Link>

        {/* FEATURED */}
        {property.featured && (
          <span className="absolute left-3 top-3 rounded-full bg-[#FFF8E7] px-3 py-1.5 text-[11px] font-bold text-[#8A6420] shadow-sm">
            Featured
          </span>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          aria-label={`Save ${property.title} to wishlist`}
          className="
            absolute right-3 top-3
            flex h-10 w-10 items-center justify-center
            rounded-full
            bg-white/95
            text-[#292524]
            shadow-sm
            backdrop-blur
            transition
            hover:scale-105
            hover:bg-white
            hover:text-[#B96342]
            active:scale-95
          "
        >
          <Heart
            size={18}
            strokeWidth={1.8}
          />
        </button>

        {/* RECOMMENDATION */}
        {property.ml?.recommendationScore !== undefined && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold text-[#292524] shadow-sm backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-[#6F8F72]" />
            {property.ml.recommendationScore}% match
          </div>
        )}
      </div>

      {/* CONTENT */}
      <div className="px-1 pt-4">
        {/* TYPE + RATING */}
        <div className="flex items-center justify-between gap-3">
          <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#8B6F3D]">
            {property.type}
          </span>

          <span className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#292524]">
            <Star
              size={14}
              fill="currentColor"
              strokeWidth={1.5}
            />
            {rating.toFixed(1)}
          </span>
        </div>

        {/* TITLE */}
        <Link href={`/stays/${property.id}`}>
          <h3 className="mt-1.5 line-clamp-1 text-[17px] font-semibold tracking-[-0.01em] text-[#292524] transition group-hover:text-[#8B6F3D]">
            {property.title}
          </h3>
        </Link>

        {/* LOCATION */}
        <p className="mt-1 line-clamp-1 text-sm text-[#78716C]">
          {property.location}
        </p>

        {/* DETAILS */}
        <div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-[#78716C]">
          <span>{property.guests} guests</span>
          <span aria-hidden="true">·</span>
          <span>{property.bedrooms} bedrooms</span>
          <span aria-hidden="true">·</span>
          <span>{property.bathrooms} baths</span>
        </div>

        {/* TRUST */}
        {property.ml?.trustScore !== undefined && (
          <div className="mt-3 flex items-center gap-2 text-xs text-[#57534E]">
            <ShieldCheck
              size={15}
              strokeWidth={1.8}
              className="text-[#6F8F72]"
            />

            <span>
              Vistara verified
            </span>

            <span className="font-semibold text-[#292524]">
              {property.ml.trustScore}/100
            </span>
          </div>
        )}

        {/* PRICE + CTA */}
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="text-lg font-bold text-[#292524]">
              ₹{price.toLocaleString("en-IN")}
            </span>

            <span className="ml-1 text-xs text-[#78716C]">
              / night
            </span>
          </div>

          <Link
            href={`/stays/${property.id}`}
            className="
              inline-flex shrink-0 items-center gap-1.5
              rounded-full
              border border-[#E7E2D8]
              bg-white
              px-4 py-2
              text-xs font-semibold
              text-[#292524]
              transition
              hover:border-[#C6A15B]
              hover:bg-[#F7F3EA]
            "
          >
            View stay
            <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    </article>
  );
}