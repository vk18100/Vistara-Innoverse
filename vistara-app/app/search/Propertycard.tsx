"use client";

import Link from "next/link";
import { Heart, Star, ArrowUpRight, Check } from "lucide-react";
import { useState } from "react";

type PropertyCardProps = {
  id: number | string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating?: number;
  verified?: boolean;
};

export default function PropertyCard({
  id,
  title,
  location,
  price,
  image,
  rating,
  verified,
}: PropertyCardProps) {
  const [liked, setLiked] = useState(false);

  return (
    <Link
      href={`/stays/${id}`}
      className="group block"
    >
      {/* ================================
          IMAGE
      ================================= */}

      <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#E9E5DC]">

        <img
          src={image}
          alt={title}
          className="
            h-full
            w-full
            object-cover
            transition-transform
            duration-700
            ease-out
            group-hover:scale-105
          "
        />

        {/* IMAGE OVERLAY */}

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-gradient-to-t
            from-black/40
            via-transparent
            to-black/5
            opacity-60
          "
        />

        {/* ================================
            VERIFIED
        ================================= */}

        {verified && (
          <div
            className="
              absolute
              left-4
              top-4
              flex
              items-center
              gap-1.5
              rounded-full
              bg-white/95
              px-3
              py-1.5
              text-[11px]
              font-semibold
              tracking-wide
              text-[#292724]
              shadow-sm
              backdrop-blur-sm
            "
          >
            <Check size={13} strokeWidth={2.5} />
            Verified
          </div>
        )}

        {/* ================================
            WISHLIST
        ================================= */}

        <button
          type="button"
          aria-label={
            liked
              ? `Remove ${title} from wishlist`
              : `Save ${title} to wishlist`
          }
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setLiked((value) => !value);
          }}
          className="
            absolute
            right-4
            top-4
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-[#292724]
            shadow-sm
            backdrop-blur-sm
            transition-all
            duration-200
            hover:scale-110
            hover:bg-white
          "
        >
          <Heart
            size={18}
            strokeWidth={1.8}
            className={
              liked
                ? "fill-[#292724] text-[#292724]"
                : ""
            }
          />
        </button>

        {/* ================================
            VIEW BUTTON
        ================================= */}

        <div
          className="
            absolute
            bottom-4
            right-4
            flex
            h-10
            w-10
            translate-y-2
            items-center
            justify-center
            rounded-full
            bg-white/95
            text-[#292724]
            opacity-0
            shadow-sm
            transition-all
            duration-300
            group-hover:translate-y-0
            group-hover:opacity-100
          "
        >
          <ArrowUpRight size={17} />
        </div>
      </div>

      {/* ================================
          CONTENT
      ================================= */}

      <div className="pt-4">

        {/* TITLE + RATING */}

        <div className="flex items-start justify-between gap-4">

          <h2
            className="
              text-[17px]
              font-semibold
              leading-6
              tracking-[-0.01em]
              text-[#171614]
              transition
              group-hover:underline
              group-hover:underline-offset-4
            "
          >
            {title}
          </h2>

          {rating !== undefined && (
            <span className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#292724]">
              <Star
                size={14}
                className="fill-[#292724]"
              />
              {rating}
            </span>
          )}
        </div>

        {/* LOCATION */}

        <p className="mt-1.5 text-sm text-[#77726A]">
          {location}
        </p>

        {/* PRICE */}

        <div className="mt-3 flex items-baseline">

          <span className="text-[16px] font-semibold text-[#171614]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <span className="ml-1.5 text-sm text-[#77726A]">
            / night
          </span>

        </div>
      </div>
    </Link>
  );
}