"use client";

import Image from "next/image";
import { useState } from "react";
import { ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";

type GalleryProps = {
  images?: string[];
};

export default function Gallery({ images = [] }: GalleryProps) {
  const validImages = images.filter(Boolean);

  const [active, setActive] = useState(0);

  if (validImages.length === 0) {
    return (
      <div className="flex aspect-[16/9] w-full items-center justify-center rounded-[28px] bg-[#F5F1E8]">
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#8B6F3D] shadow-sm">
            <ImageIcon size={22} strokeWidth={1.7} />
          </div>

          <p className="mt-3 text-sm font-medium text-[#57534E]">
            No property images available
          </p>
        </div>
      </div>
    );
  }

  const currentIndex = Math.min(active, validImages.length - 1);

  const goPrevious = () => {
    setActive((current) =>
      current === 0 ? validImages.length - 1 : current - 1
    );
  };

  const goNext = () => {
    setActive((current) =>
      current === validImages.length - 1 ? 0 : current + 1
    );
  };

  return (
    <section
      className="w-full"
      aria-label="Property photo gallery"
    >
      {/* MAIN IMAGE */}
      <div className="relative overflow-hidden rounded-[28px] bg-[#F5F1E8]">
        <div className="relative aspect-[4/3] w-full sm:aspect-[16/9] lg:aspect-[2/1]">
          <Image
            key={validImages[currentIndex]}
            src={validImages[currentIndex]}
            alt={`Property photo ${currentIndex + 1}`}
            fill
            priority={currentIndex === 0}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 1200px"
            className="object-cover transition-opacity duration-300"
          />

          {/* IMAGE COUNTER */}
          <div className="absolute left-4 top-4 rounded-full bg-black/55 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-md">
            {currentIndex + 1} / {validImages.length}
          </div>

          {/* PREVIOUS */}
          {validImages.length > 1 && (
            <>
              <button
                type="button"
                onClick={goPrevious}
                aria-label="Previous property image"
                className="
                  absolute left-3 top-1/2
                  flex h-10 w-10 -translate-y-1/2
                  items-center justify-center
                  rounded-full
                  bg-white/90
                  text-[#292524]
                  shadow-md
                  backdrop-blur
                  transition
                  hover:scale-105
                  hover:bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-black/20
                  sm:left-5
                "
              >
                <ChevronLeft size={20} strokeWidth={1.8} />
              </button>

              {/* NEXT */}
              <button
                type="button"
                onClick={goNext}
                aria-label="Next property image"
                className="
                  absolute right-3 top-1/2
                  flex h-10 w-10 -translate-y-1/2
                  items-center justify-center
                  rounded-full
                  bg-white/90
                  text-[#292524]
                  shadow-md
                  backdrop-blur
                  transition
                  hover:scale-105
                  hover:bg-white
                  focus:outline-none
                  focus:ring-2
                  focus:ring-white
                  focus:ring-offset-2
                  focus:ring-offset-black/20
                  sm:right-5
                "
              >
                <ChevronRight size={20} strokeWidth={1.8} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* THUMBNAILS */}
      {validImages.length > 1 && (
        <div
          className="
            mt-3
            flex gap-2.5
            overflow-x-auto
            pb-1
            scrollbar-none
            sm:gap-3
          "
          aria-label="Property thumbnails"
        >
          {validImages.map((image, index) => {
            const isActive = currentIndex === index;

            return (
              <button
                key={`${image}-${index}`}
                type="button"
                onClick={() => setActive(index)}
                aria-label={`View property photo ${index + 1}`}
                aria-current={isActive ? "true" : undefined}
                className={`
                  relative
                  h-16 w-20
                  shrink-0
                  overflow-hidden
                  rounded-xl
                  bg-[#F5F1E8]
                  transition-all duration-200
                  sm:h-[76px] sm:w-[96px]
                  ${
                    isActive
                      ? "ring-2 ring-[#8B6F3D] ring-offset-2"
                      : "opacity-70 hover:opacity-100"
                  }
                `}
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="96px"
                  className="object-cover"
                />

                {/* ACTIVE OVERLAY */}
                {isActive && (
                  <span className="absolute inset-0 bg-black/10" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}