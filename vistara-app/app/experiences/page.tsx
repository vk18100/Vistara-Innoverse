"use client";

import Link from "next/link";

const activities = [
  {
    id: 1,
    title: "Local Food Walk",
    location: "Kankarbagh, Patna",
    category: "Food",
    duration: "2–3 hours",
    price: 499,
    icon: "🍜",
    description:
      "Explore local flavours, hidden food spots and authentic regional dishes.",
  },
  {
    id: 2,
    title: "Heritage Walk",
    location: "Patna, Bihar",
    category: "Culture",
    duration: "2 hours",
    price: 399,
    icon: "🏛️",
    description:
      "Discover historical places and stories that shaped the local area.",
  },
  {
    id: 3,
    title: "Sunset Riverside Experience",
    location: "Ganga Ghat, Patna",
    category: "Nature",
    duration: "2 hours",
    price: 299,
    icon: "🌅",
    description:
      "Enjoy a peaceful evening experience along the riverside.",
  },
  {
    id: 4,
    title: "Local Market Explorer",
    location: "Patna",
    category: "Shopping",
    duration: "2–3 hours",
    price: 349,
    icon: "🛍️",
    description:
      "Explore local markets, handmade products and regional shopping spots.",
  },
  {
    id: 5,
    title: "Cafe Hopping",
    location: "Patna",
    category: "Cafe",
    duration: "3 hours",
    price: 599,
    icon: "☕",
    description:
      "Visit selected local cafes and discover the city's coffee culture.",
  },
  {
    id: 6,
    title: "Photography Trail",
    location: "Patna",
    category: "Experience",
    duration: "2 hours",
    price: 449,
    icon: "📸",
    description:
      "Capture interesting locations, local life and hidden visual gems.",
  },
];

const categories = [
  "All",
  "Food",
  "Culture",
  "Nature",
  "Shopping",
  "Cafe",
  "Experience",
];

export default function ExperiencesPage() {
  return (
    <main className="min-h-screen bg-white text-[#03045e]">
      {/* Hero */}
      <section className="bg-[#03045e] px-6 py-20 text-white">
        <div className="mx-auto max-w-7xl">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-blue-200">
            Vistara Experiences
          </p>

          <h1 className="max-w-3xl text-4xl font-bold leading-tight md:text-6xl">
            Discover experiences beyond your stay.
          </h1>

          <p className="mt-6 max-w-2xl text-base leading-7 text-blue-100 md:text-lg">
            Explore food, culture, nature, shopping and local experiences
            around the place you are staying.
          </p>

          <Link
            href="/explore"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 font-semibold text-[#03045e] transition hover:bg-blue-50"
          >
            Explore destinations
          </Link>
        </div>
      </section>

      {/* Categories */}
      <section className="border-b border-gray-200 bg-white px-6 py-5">
        <div className="mx-auto flex max-w-7xl gap-3 overflow-x-auto">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm font-medium transition ${
                index === 0
                  ? "bg-[#03045e] text-white"
                  : "border border-gray-200 text-gray-700 hover:border-[#0D21A1] hover:text-[#03045e]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </section>

      {/* Activities */}
      <section className="px-6 py-14">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <p className="text-sm font-semibold uppercase tracking-widest text-[#0D21A1]">
              Local activities
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Things to do around you
            </h2>

            <p className="mt-2 text-gray-600">
              Choose an activity and make your local journey more memorable.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {activities.map((activity) => (
              <article
                key={activity.id}
                className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
              >
                {/* Visual */}
                <div className="flex h-52 items-center justify-center bg-gradient-to-br from-[#03045e] to-[#0D21A1]">
                  <span className="text-7xl transition group-hover:scale-110">
                    {activity.icon}
                  </span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-[#0D21A1]">
                      {activity.category}
                    </span>

                    <span className="text-sm text-gray-500">
                      {activity.duration}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#03045e]">
                    {activity.title}
                  </h3>

                  <p className="mt-2 text-sm font-medium text-gray-500">
                    📍 {activity.location}
                  </p>

                  <p className="mt-4 text-sm leading-6 text-gray-600">
                    {activity.description}
                  </p>

                  <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-5">
                    <div>
                      <p className="text-xs text-gray-500">Starting from</p>
                      <p className="text-xl font-bold text-[#03045e]">
                        ₹{activity.price}
                      </p>
                    </div>

                    <Link
                      href={`/experiences/${activity.id}`}
                      className="rounded-full bg-[#03045e] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Local Plan CTA */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-[#03045e] p-8 text-white md:p-12">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-200">
              Vistara Local Plan
            </p>

            <h2 className="mt-3 text-3xl font-bold md:text-4xl">
              Unlock the complete local experience.
            </h2>

            <p className="mt-4 leading-7 text-blue-100">
              Discover selected places, exact locations, routes and local
              experiences around your stay.
            </p>

            <Link
              href="/explore"
              className="mt-7 inline-flex rounded-full bg-white px-6 py-3 font-semibold text-[#03045e] hover:bg-blue-50"
            >
              Explore Local Plan
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}