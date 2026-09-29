"use client";

import Link from "next/link";
import { Heart, Star } from "lucide-react";

type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
};

type PropCardProps = {
  property: Property;
};

export default function PropCard({ property }: PropCardProps) {
  const imageUrl =
    property.image?.trim() ||
    "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80";

  return (
    <Link
      href={`/stays/${property.id}`}
      className="group block"
    >
      {/* IMAGE */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-[20px] bg-[#EEF2F7]">
        <img
          src={imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.src =
              "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=1200&q=80";
          }}
        />

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-[#03045E] shadow-sm backdrop-blur transition hover:bg-white"
          aria-label="Add to wishlist"
        >
          <Heart size={19} strokeWidth={1.8} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="mt-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="line-clamp-1 text-[17px] font-semibold text-[#03045E]">
            {property.title}
          </h3>

          <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#03045E]">
            <Star
              size={15}
              fill="currentColor"
              strokeWidth={0}
            />
            {property.rating > 0
              ? property.rating.toFixed(1)
              : "New"}
          </div>
        </div>

        <p className="mt-1 text-[15px] text-[#64748B]">
          {property.location}
        </p>

        <div className="mt-4">
          <span className="text-[17px] font-bold text-[#03045E]">
            ₹{property.price.toLocaleString("en-IN")}
          </span>

          <span className="ml-1 text-sm text-[#64748B]">
            / night
          </span>
        </div>
      </div>
    </Link>
  );
}