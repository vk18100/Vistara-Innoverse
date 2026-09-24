"use client";

import Image from "next/image";
import Link from "next/link";

type CategoryItem = {
  id: number;
  title: string;
  description: string;
  image: string;
  cta: string;
  href: string;
};

type CategoryProps = {
  cards: CategoryItem[];
};

export default function Category({ cards }: CategoryProps) {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((category) => (
        <Link
          key={category.id}
          href={category.href}
          className="group overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
        >
          {/* IMAGE */}
          <div className="relative h-64 w-full overflow-hidden bg-[#EEF2FF]">
            <Image
              src={category.image}
              alt={category.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/70 via-transparent to-transparent opacity-80" />

            <div className="absolute bottom-5 left-5 right-5">
              <h3 className="text-xl font-semibold text-white">
                {category.title}
              </h3>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-5">
            <p className="line-clamp-2 text-sm leading-6 text-[#64748B]">
              {category.description}
            </p>

            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm font-semibold text-[#0D21A1]">
                {category.cta}
              </span>

              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#EEF2FF] text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
                →
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}