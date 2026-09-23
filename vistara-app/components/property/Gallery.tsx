"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryProps = {
  images: string[];
};

export default function Gallery({ images }: GalleryProps) {
  const [active, setActive] = useState(0);

  return (
    <div className="space-y-3">
      {/* Main Image */}
      <div className="relative h-[420px] w-full overflow-hidden rounded-2xl">
        <Image
          src={images[active]}
          alt="Property"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 overflow-x-auto">
        {images.map((image, index) => (
          <button
            key={image}
            onClick={() => setActive(index)}
            className={`relative h-20 w-24 shrink-0 overflow-hidden rounded-xl border-2 ${
              active === index
                ? "border-[#0D21A1]"
                : "border-transparent"
            }`}
          >
            <Image
              src={image}
              alt={`Property ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}