import Link from "next/link";
import Navbar from "@/components/navbar";

const topics = [
  {
    title: "Bookings & Trips",
    description: "Manage reservations, cancellations and trip details.",
  },
  {
    title: "Stays",
    description: "Get help with properties, amenities and availability.",
  },
  {
    title: "Payments",
    description: "Questions about payments, refunds and transactions.",
  },
  {
    title: "Hosting",
    description: "Manage your property, bookings and verification.",
  },
];

const faqs = [
  "How do I book a stay?",
  "How can I cancel my booking?",
  "How does property verification work?",
  "How do I become a Vistara host?",
];

export default function Help() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">

        <Link
          href="/"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Home
        </Link>

        {/* Header */}
        <div className="mt-10 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Vistara Support
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#03045e]">
            How can we help?
          </h1>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-gray-500">
            Find answers to common questions or get help with your
            Vistara experience.
          </p>
        </div>

        {/* Search */}
        <div className="mx-auto mt-8 max-w-2xl">
          <input
            type="search"
            placeholder="Search for help..."
            className="w-full rounded-2xl border border-gray-200 px-5 py-4 text-sm outline-none transition focus:border-[#03045e] focus:ring-2 focus:ring-[#03045e]/10"
          />
        </div>

        {/* Topics */}
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-[#03045e]">
            Browse help topics
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {topics.map((topic) => (
              <button
                key={topic.title}
                type="button"
                className="rounded-2xl border border-gray-200 p-6 text-left transition hover:-translate-y-1 hover:border-[#023e8a] hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2ff] text-sm font-bold text-[#03045e]">
                  →
                </div>

                <h3 className="mt-5 font-semibold text-gray-900">
                  {topic.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-500">
                  {topic.description}
                </p>
              </button>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-semibold text-[#03045e]">
            Frequently asked questions
          </h2>

          <div className="mt-6 divide-y divide-gray-200 rounded-2xl border border-gray-200">
            {faqs.map((faq) => (
              <button
                key={faq}
                type="button"
                className="flex w-full items-center justify-between gap-5 p-5 text-left hover:bg-gray-50"
              >
                <span className="text-sm font-medium text-gray-800">
                  {faq}
                </span>

                <span className="text-lg text-gray-400">
                  +
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="mt-14 rounded-3xl bg-[#03045e] px-6 py-10 text-center">

          <h2 className="text-2xl font-bold text-white">
            Still need help?
          </h2>

          <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-white/70">
            Our support team can help you with bookings, stays,
            payments and hosting.
          </p>

          <button
            type="button"
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#03045e] hover:bg-gray-100"
          >
            Contact Support
          </button>

        </section>

      </section>
    </main>
  );
}