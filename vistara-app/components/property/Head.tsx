"use client";

import { useState } from "react";
import { Heart, Share2, Star } from "lucide-react";

type HeadProps = {
  name: string;
  location: string;
  rating: number;
  reviews: number;
};

export default function Head({
  name,
  location,
  rating,
  reviews,
}: HeadProps) {
  const [saved, setSaved] = useState(false);

  const handleShare = async () => {
    const shareData = {
      title: name,
      text: `Check out ${name} on Vistara`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        alert("Link copied!");
      }
    } catch {
      // User cancelled sharing.
    }
  };

  return (
    <header className="border-b border-stone-200 pb-6 pt-3">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        {/* Property information */}
        <div className="min-w-0">
          <h1 className="max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-stone-900 sm:text-3xl lg:text-4xl">
            {name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm text-stone-500">
            <span className="font-medium text-stone-700">
              {location}
            </span>

            <span
              aria-hidden="true"
              className="text-stone-300"
            >
              •
            </span>

            <span className="inline-flex items-center gap-1 font-medium text-stone-800">
              <Star
                size={15}
                fill="currentColor"
                className="text-[#B48A5A]"
                aria-hidden="true"
              />

              {Number(rating).toFixed(1)}
            </span>

            <span className="text-stone-400">
              {reviews} {reviews === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleShare}
            aria-label="Share this property"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              border-stone-200
              bg-white
              px-4
              py-2.5
              text-sm
              font-medium
              text-stone-700
              transition
              hover:border-stone-300
              hover:bg-stone-50
              focus:outline-none
              focus:ring-2
              focus:ring-stone-300
              focus:ring-offset-2
            "
          >
            <Share2 size={16} aria-hidden="true" />
            <span className="hidden xs:inline sm:inline">
              Share
            </span>
          </button>

          <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-label={saved ? "Remove from saved" : "Save this property"}
            aria-pressed={saved}
            className={`
              inline-flex
              items-center
              gap-2
              rounded-full
              border
              px-4
              py-2.5
              text-sm
              font-medium
              transition
              focus:outline-none
              focus:ring-2
              focus:ring-stone-300
              focus:ring-offset-2
              ${
                saved
                  ? "border-[#D8C1A3] bg-[#F7F0E7] text-[#8A6847]"
                  : "border-stone-200 bg-white text-stone-700 hover:border-stone-300 hover:bg-stone-50"
              }
            `}
          >
            <Heart
              size={16}
              fill={saved ? "currentColor" : "none"}
              aria-hidden="true"
            />

            <span className="hidden sm:inline">
              {saved ? "Saved" : "Save"}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}