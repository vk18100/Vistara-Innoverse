import Category from "@/components/home/category";
import { categories } from "@/data/categories";
import Navbar from "@/components/navbar";
import Hero from "@/components/home/Hero";
import Footer from "./footer/page";
import PropertyCard from "@/components/cards/properCard";
import { properties } from "@/data/properties";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* STAYS */}
      <section className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
        <div className="mb-10">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#0D21A1]">
            VISTARA STAYS
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-5xl">
            Places worth staying in
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
            Discover thoughtfully selected stays, unique homes and
            memorable places across India.
          </p>
        </div>

        {/* PROPERTY CARDS */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {properties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
            />
          ))}
        </div>
      </section>

      {/* PREMIUM EXPERIENCES */}
      <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-10">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#C6A15B]">
            EXPERIENCES
          </p>

          <h2 className="mt-2 font-serif text-3xl font-semibold text-[#03045E] md:text-4xl">
            Find something memorable
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
            From beautiful villas and heritage stays to local food,
            culture and unforgettable activities.
          </p>
        </div>

        <Category cards={categories} />
      </section>

      {/* FOOTER */}
      <Footer />
    </main>
  );
}