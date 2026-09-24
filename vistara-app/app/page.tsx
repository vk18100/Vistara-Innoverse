import Hero from "@/components/home/Hero";
import Navbar from "@/components/navbar";
import PropertyCard from "@/components/cards/properCard";
import Footer from "./footer/page";

import { properties } from "@/data/properties";

export default function Home() {
  const featuredProperties = properties.slice(0, 8);

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* =========================================================
          HERO
      ========================================================= */}
      <section>
        <Hero />
      </section>

      {/* =========================================================
          STAYS
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              VISTARA STAYS
            </p>

            <h2 className="font-serif text-4xl font-semibold md:text-5xl">
              Stay somewhere{" "}
              <span className="text-[#0D21A1]">
                worth remembering.
              </span>
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500 md:text-base">
              Discover thoughtfully selected homes, villas, hotels and unique
              stays for your journey.
            </p>
          </div>

          <a
            href="/stays"
            className="hidden rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold transition hover:bg-[#03045E] hover:text-white md:block"
          >
            Explore all →
          </a>
        </div>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </section>

      {/* =========================================================
          PLAN JOURNEY
      ========================================================= */}
      <section className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
        <div className="rounded-[2rem] bg-[#EEF4FF] px-7 py-12 md:px-12 lg:px-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
            PLAN YOUR JOURNEY
          </p>

          <div className="mt-4 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div>
              <h2 className="font-serif text-3xl font-semibold text-[#03045E] md:text-4xl">
                Your stay is only the beginning.
              </h2>

              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-500">
                Discover places, create multi-stop journeys and explore a
                destination your way.
              </p>
            </div>

            <a
              href="/explore"
              className="w-fit rounded-full bg-[#03045E] px-7 py-4 text-sm font-bold text-white transition hover:bg-[#0D21A1]"
            >
              Build your journey →
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          WHY VISTARA
      ========================================================= */}
      <section className="border-t border-slate-200 bg-[#FAFBFF]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-10">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
              WHY VISTARA
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold md:text-4xl">
              Travel with more context.
            </h2>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            <Feature
              number="01"
              title="Verified stays"
              description="Discover properties with a clearer verification and trust journey."
            />

            <Feature
              number="02"
              title="Local discovery"
              description="Find food, culture, places and experiences beyond typical tourist lists."
            />

            <Feature
              number="03"
              title="Connected journeys"
              description="Turn discoveries into a planned multi-stop journey."
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

type FeatureProps = {
  number: string;
  title: string;
  description: string;
};

function Feature({
  number,
  title,
  description,
}: FeatureProps) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-7">
      <span className="text-xs font-bold tracking-[0.2em] text-[#0D21A1]">
        {number}
      </span>

      <h3 className="mt-8 text-lg font-bold text-[#03045E]">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-6 text-slate-500">
        {description}
      </p>
    </div>
  );
}