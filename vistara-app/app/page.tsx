import Category from "@/components/home/category";
import { categories } from "@/data/categories";
import Navbar from "@/components/navbar";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 pt-20">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.25em] text-[#023e8a]">
            Discover with Vistara
          </p>

          <h1 className="mt-4 text-5xl font-bold leading-tight text-[#03045e] md:text-6xl">
            Find places worth
            <span className="block text-[#0D21A1]">
              discovering.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-500">
            Explore unique stays, hidden destinations, and meaningful
            experiences — all in one place.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <a
              href="/explore"
              className="rounded-xl bg-[#03045e] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
            >
              Explore Vistara
            </a>

            <a
              href="/stays"
              className="rounded-xl border border-gray-200 px-7 py-3 text-sm font-semibold text-[#03045e] transition hover:border-[#03045e]"
            >
              Find a Stay
            </a>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 pb-20">
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Explore
          </p>

          <h2 className="mt-2 text-3xl font-bold text-[#03045e]">
            Explore by category
          </h2>

          <p className="mt-2 text-sm text-gray-500">
            Choose what you want to discover today.
          </p>
        </div>

        <Category cards={categories} />
      </section>
    </main>
  );
}