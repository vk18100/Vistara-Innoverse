import Link from "next/link";
import { notFound } from "next/navigation";

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
    highlights: [
      "Local food recommendations",
      "Selected food spots",
      "Regional dishes",
      "Local experience",
    ],
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
    highlights: [
      "Historical locations",
      "Local stories",
      "Cultural discovery",
      "Walking experience",
    ],
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
    highlights: [
      "Riverside experience",
      "Sunset views",
      "Relaxed exploration",
      "Local surroundings",
    ],
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
    highlights: [
      "Local markets",
      "Regional products",
      "Shopping spots",
      "Local discoveries",
    ],
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
    highlights: [
      "Selected cafes",
      "Coffee experiences",
      "Local recommendations",
      "Cafe hopping",
    ],
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
    highlights: [
      "Photography locations",
      "Local life",
      "Hidden spots",
      "Visual exploration",
    ],
  },
];

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ExperienceDetailsPage({
  params,
}: PageProps) {
  const { id } = await params;

  const activity = activities.find(
    (item) => item.id === Number(id)
  );

  if (!activity) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-[#03045e]">
      {/* Back */}
      <div className="mx-auto max-w-7xl px-6 pt-8">
        <Link
          href="/experiences"
          className="text-sm font-semibold text-gray-500 transition hover:text-[#03045e]"
        >
          ← Back to experiences
        </Link>
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 py-8">
        <div className="overflow-hidden rounded-3xl bg-[#03045e]">
          <div className="grid min-h-[420px] md:grid-cols-2">
            {/* Visual */}
            <div className="flex items-center justify-center bg-gradient-to-br from-[#03045e] to-[#0D21A1]">
              <span className="text-[120px]">
                {activity.icon}
              </span>
            </div>

            {/* Information */}
            <div className="flex flex-col justify-center p-8 text-white md:p-12">
              <span className="mb-5 w-fit rounded-full bg-white/10 px-4 py-2 text-sm font-semibold">
                {activity.category}
              </span>

              <h1 className="text-4xl font-bold leading-tight md:text-5xl">
                {activity.title}
              </h1>

              <p className="mt-5 text-blue-100">
                📍 {activity.location}
              </p>

              <div className="mt-6 flex gap-6 text-sm text-blue-100">
                <span>⏱ {activity.duration}</span>
                <span>✓ Local experience</span>
              </div>

              <p className="mt-7 max-w-xl leading-7 text-blue-100">
                {activity.description}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details */}
      <section className="mx-auto grid max-w-7xl gap-8 px-6 py-10 lg:grid-cols-[1fr_380px]">
        {/* Main content */}
        <div>
          <h2 className="text-2xl font-bold">
            About this experience
          </h2>

          <p className="mt-4 max-w-3xl leading-8 text-gray-600">
            Discover selected local places and experiences around your
            destination. Vistara helps travelers explore beyond their
            accommodation through curated local discovery.
          </p>

          {/* Highlights */}
          <div className="mt-10">
            <h2 className="text-2xl font-bold">
              What you can discover
            </h2>

            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {activity.highlights.map((highlight) => (
                <div
                  key={highlight}
                  className="rounded-2xl border border-gray-200 p-5"
                >
                  <div className="mb-2 text-xl">✓</div>

                  <p className="font-semibold">
                    {highlight}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Location */}
          <div className="mt-10 rounded-3xl bg-gray-50 p-6">
            <h2 className="text-xl font-bold">
              Location
            </h2>

            <p className="mt-3 text-gray-600">
              {activity.location}
            </p>

            <div className="mt-5 flex h-48 items-center justify-center rounded-2xl bg-[#03045e] text-white">
              <div className="text-center">
                <div className="text-4xl">📍</div>
                <p className="mt-2 font-semibold">
                  Location preview
                </p>
                <p className="text-sm text-blue-200">
                  Exact location available through Local Plan
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Card */}
        <aside>
          <div className="sticky top-8 rounded-3xl border border-gray-200 bg-white p-6 shadow-lg">
            <p className="text-sm text-gray-500">
              Starting from
            </p>

            <div className="mt-1 flex items-end gap-2">
              <span className="text-3xl font-bold">
                ₹{activity.price}
              </span>

              <span className="pb-1 text-sm text-gray-500">
                / person
              </span>
            </div>

            <div className="my-6 border-t border-gray-200" />

            <div className="space-y-4 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Experience</span>
                <span className="font-semibold">
                  {activity.category}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Duration</span>
                <span className="font-semibold">
                  {activity.duration}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-500">Location</span>
                <span className="max-w-[170px] text-right font-semibold">
                  {activity.location}
                </span>
              </div>
            </div>

            <Link
              href="/explore"
              className="mt-7 block rounded-full bg-[#03045e] px-6 py-3.5 text-center font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Explore Local Plan
            </Link>

            <p className="mt-4 text-center text-xs leading-5 text-gray-500">
              Unlock exact locations, maps, directions and routes
              through the Local Plan.
            </p>
          </div>
        </aside>
      </section>

      {/* Bottom CTA */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-3xl bg-[#03045e] p-8 text-center text-white md:p-12">
          <h2 className="text-3xl font-bold">
            Want to explore more?
          </h2>

          <p className="mx-auto mt-3 max-w-xl text-blue-100">
            Discover more local activities, places, food, culture
            and experiences around your stay.
          </p>

          <Link
            href="/experiences"
            className="mt-7 inline-block rounded-full bg-white px-7 py-3 font-semibold text-[#03045e] transition hover:bg-blue-50"
          >
            Browse all experiences
          </Link>
        </div>
      </section>
    </main>
  );
}