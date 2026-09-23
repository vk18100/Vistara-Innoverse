"use client";
import Link from "next/link";

type PropCardProps = {
  id: string;
  name: string;
  location: string;
  image: string;
  price: number;
  rating: number;
};

export default function PropCard({
  id,
  name,
  location,
  image,
  price,
  rating,
}: PropCardProps) {
  return (
    <Link href={`/properties/${id}`} className="group block">
      <article className="cursor-pointer">
        {/* Image */}
        <div className="relative h-64 overflow-hidden rounded-2xl bg-gray-100">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Wishlist */}
          <button
            type="button"
            aria-label="Add to wishlist"
            onClick={(e) => e.preventDefault()}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-xl text-[#03045E] shadow-sm backdrop-blur transition hover:scale-105"
          >
            ♡
          </button>

          {/* Rating */}
          <div className="absolute bottom-4 left-4 flex items-center gap-1 rounded-full bg-white/95 px-3 py-1.5 text-sm font-medium text-[#03045E] shadow-sm">
            <span>★</span>
            <span>{rating}</span>
          </div>
        </div>

        {/* Content */}
        <div className="mt-4">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-[#03045E] transition-colors group-hover:text-[#0D21A1]">
                {name}
              </h3>

              <p className="mt-1 truncate text-sm text-gray-500">
                {location}
              </p>
            </div>
          </div>

          {/* Price */}
          <div className="mt-3 flex items-baseline gap-1 text-sm text-gray-600">
            <span className="text-base font-semibold text-[#03045E]">
              ₹{price}
            </span>

            <span>/ night</span>
          </div>
        </div>
      </article>
    </Link>
  );
}