"use client";

import Link from "next/link";
import { Heart, Star, Check, ArrowUpRight } from "lucide-react";
import { useState } from "react";

type Property = {
  id: string;
  title: string;
  location: string;
  city?: string;
  country?: string;
  image: string;
  price: number;
  currency?: string;
  rating?: number;
  verified?: boolean;
};

type PropCardProps = {
  property: Property;
};

export default function PropCard({ property }: PropCardProps) {
  const [liked, setLiked] = useState(false);

  const imageUrl =
    property.image?.trim() ||
    "/images/property-placeholder.jpg";

  return (
    <Link
      href={`/stays/${property.id}`}
      className="group block"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#EEF2F7]">

        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(event) => {
            event.currentTarget.src =
              "/images/property-placeholder.jpg";
          }}
        />

        {/* Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-black/5 opacity-60" />

        {/* Verified */}
        {property.verified && (
          <div className="absolute left-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#03045E] shadow-sm backdrop-blur-sm">
            <Check size={13} strokeWidth={2.5} />
            Verified
          </div>
        )}

        {/* Wishlist */}
        <button
          type="button"
          aria-label={
            liked
              ? `Remove ${property.title} from wishlist`
              : `Save ${property.title} to wishlist`
          }
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setLiked((value) => !value);
          }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 text-[#03045E] shadow-sm backdrop-blur-sm transition hover:scale-110"
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            className={liked ? "fill-[#03045E]" : ""}
          />
        </button>

        {/* View */}
        <div className="absolute bottom-4 right-4 flex h-10 w-10 translate-y-2 items-center justify-center rounded-full bg-white/95 text-[#03045E] opacity-0 shadow-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* CONTENT */}
      <div className="pt-4">

        <div className="flex items-start justify-between gap-4">

          <h2 className="line-clamp-1 text-[17px] font-semibold leading-6 text-[#03045E]">
            {property.title}
          </h2>

          {property.rating !== undefined && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#03045E]">
              <Star
                size={14}
                className="fill-[#03045E]"
              />
              {property.rating.toFixed(1)}
            </span>
          )}

        </div>

        <p className="mt-1.5 text-sm text-[#64748B]">
          {property.location}
        </p>

        <div className="mt-3 flex items-baseline">

          <span className="text-[16px] font-semibold text-[#03045E]">
            ₹{property.price.toLocaleString("en-IN")}
          </span>

          <span className="ml-1.5 text-sm text-[#64748B]">
            / night
          </span>

        </div>

      </div>
    </Link>
  );
}