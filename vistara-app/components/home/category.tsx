import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

type CategoryItem = {
  id: number | string;
  title: string;
  description: string;
  image: string;
  cta?: string;
  href: string;
};

type CategoryProps = {
  cards: CategoryItem[];
};

export default function Category({ cards }: CategoryProps) {
  if (!cards?.length) return null;

  return (
    <section aria-label="Explore stays">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((category) => (
          <Link
            key={category.id}
            href={category.href}
            className="
              group relative overflow-hidden rounded-[26px]
              border border-[#E2E8F0] bg-white
              shadow-[0_6px_24px_rgba(3,4,94,0.06)]
              transition duration-300
              hover:-translate-y-1
              hover:shadow-[0_14px_40px_rgba(3,4,94,0.12)]
              focus:outline-none
              focus:ring-2 focus:ring-[#2563EB]
              focus:ring-offset-2
            "
          >
            {/* IMAGE */}
            <div className="relative aspect-[4/4.2] overflow-hidden bg-[#EEF4FF]">
              <Image
                src={category.image}
                alt={category.title}
                fill
                sizes="
                  (max-width: 640px) 100vw,
                  (max-width: 1024px) 50vw,
                  25vw
                "
                className="
                  object-cover
                  transition-transform duration-700
                  ease-out
                  group-hover:scale-105
                "
              />

              {/* Soft overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#03045E]/75 via-[#03045E]/10 to-transparent" />

              {/* Category badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider text-[#03045E] shadow-sm backdrop-blur">
                  Explore
                </span>
              </div>

              {/* Bottom content */}
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {category.title}
                </h3>

                <p className="mt-1 line-clamp-2 text-sm leading-5 text-white/80">
                  {category.description}
                </p>
              </div>
            </div>

            {/* FOOTER */}
            <div className="flex items-center justify-between px-5 py-4">
              <span className="text-sm font-semibold text-[#03045E]">
                {category.cta || "Explore stays"}
              </span>

              <span
                className="
                  flex h-9 w-9 items-center justify-center
                  rounded-full bg-[#EEF4FF]
                  text-[#03045E]
                  transition-all duration-300
                  group-hover:bg-[#03045E]
                  group-hover:text-white
                  group-hover:rotate-45
                "
                aria-hidden="true"
              >
                <ArrowUpRight size={17} strokeWidth={2} />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}