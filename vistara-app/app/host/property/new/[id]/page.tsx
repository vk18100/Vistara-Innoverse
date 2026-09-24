import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";

const property = {
  id: "1",
  name: "The Heritage Courtyard",
  location: "Patna, Bihar",
  type: "Entire villa",
  status: "Active",
  guests: "6 guests",
  bedrooms: "3 bedrooms",
  beds: "4 beds",
  bathrooms: "2 bathrooms",
  price: "₹4,500",
  rating: "4.8",
  reviews: "24 reviews",
  image: "/images/pag1 (1).jpg",
  description:
    "A peaceful heritage-inspired stay in Patna, designed for travellers looking for comfort, privacy and a memorable local experience.",
};

const features = [
  "Entire place",
  "6 guests",
  "3 bedrooms",
  "4 beds",
  "2 bathrooms",
];

const bookings = [
  {
    guest: "Aarav Sharma",
    dates: "18 Oct – 21 Oct",
    amount: "₹13,500",
    status: "Confirmed",
  },
  {
    guest: "Riya Mehta",
    dates: "24 Oct – 27 Oct",
    amount: "₹11,400",
    status: "Confirmed",
  },
];

export default function HostPropertyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">
          <Link
            href="/host/properties"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to properties
          </Link>

          <div className="mt-7 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                PROPERTY MANAGEMENT
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                {property.name}
              </h1>

              <p className="mt-3 text-sm text-[#64748B]">
                {property.location} · {property.type}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                href={`/host/property/${property.id}/edit`}
                className="rounded-xl border border-[#03045E]/15 px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                Edit listing
              </Link>

              <Link
                href="/host/properties"
                className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                All properties
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="grid gap-7 lg:grid-cols-[1.45fr_0.75fr]">

          {/* LEFT */}
          <div className="space-y-7">

            {/* IMAGE */}
            <div className="relative h-[380px] overflow-hidden rounded-[30px] bg-white shadow-[0_12px_40px_rgba(3,4,94,0.06)] md:h-[500px]">
              <Image
                src={property.image}
                alt={property.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 65vw"
                className="object-cover"
              />

              <div className="absolute left-5 top-5">
                <span className="rounded-full bg-white px-4 py-2 text-xs font-bold text-emerald-700 shadow-sm">
                  {property.status}
                </span>
              </div>
            </div>

            {/* PROPERTY INFO */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                    LISTING DETAILS
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    {property.name}
                  </h2>

                  <p className="mt-2 text-sm text-[#64748B]">
                    {property.location}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-xs text-[#94A3B8]">
                    Guest rating
                  </p>

                  <p className="mt-1 text-lg font-semibold">
                    ★ {property.rating}
                  </p>

                  <p className="text-xs text-[#64748B]">
                    {property.reviews}
                  </p>
                </div>
              </div>

              <p className="mt-6 text-sm leading-7 text-[#64748B]">
                {property.description}
              </p>

              {/* FEATURES */}
              <div className="mt-7 grid gap-3 border-t border-[#03045E]/10 pt-6 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature) => (
                  <div
                    key={feature}
                    className="rounded-xl bg-[#FAFAF8] px-4 py-3 text-sm font-medium"
                  >
                    {feature}
                  </div>
                ))}
              </div>
            </div>

            {/* UPCOMING BOOKINGS */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                    BOOKINGS
                  </p>

                  <h2 className="mt-2 font-serif text-2xl font-semibold">
                    Upcoming stays
                  </h2>
                </div>

                <Link
                  href="/host/bookings"
                  className="text-sm font-semibold text-[#0D21A1] hover:underline"
                >
                  View all
                </Link>
              </div>

              <div className="mt-6 space-y-3">
                {bookings.map((booking) => (
                  <div
                    key={booking.guest}
                    className="flex flex-col gap-4 rounded-2xl border border-[#03045E]/10 p-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="text-sm font-semibold">
                        {booking.guest}
                      </p>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {booking.dates}
                      </p>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-sm font-semibold">
                        {booking.amount}
                      </span>

                      <span className="rounded-full bg-[#ECFDF5] px-3 py-1 text-xs font-semibold text-emerald-700">
                        {booking.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <aside className="space-y-6">

            {/* PRICE */}
            <div className="rounded-[30px] bg-[#03045E] p-7 text-white shadow-[0_18px_55px_rgba(3,4,94,0.14)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                NIGHTLY PRICE
              </p>

              <p className="mt-3 font-serif text-3xl font-semibold">
                {property.price}
              </p>

              <p className="mt-1 text-sm text-white/60">
                per night
              </p>

              <Link
                href={`/host/property/${property.id}/edit`}
                className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
              >
                Update pricing
              </Link>
            </div>

            {/* PERFORMANCE */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                PERFORMANCE
              </p>

              <div className="mt-5 space-y-5">
                <Performance
                  label="Rating"
                  value="4.8 / 5"
                />

                <Performance
                  label="Reviews"
                  value="24"
                />

                <Performance
                  label="Upcoming bookings"
                  value="2"
                />

                <Performance
                  label="Listing status"
                  value="Active"
                />
              </div>
            </div>

            {/* MANAGEMENT */}
            <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
                MANAGEMENT
              </p>

              <div className="mt-5 space-y-2">
                <ManageLink
                  href={`/host/property/${property.id}/edit`}
                  title="Edit listing"
                />

                <ManageLink
                  href="/host/bookings"
                  title="Manage bookings"
                />

                <ManageLink
                  href="/host/verification"
                  title="View verification"
                />

                <ManageLink
                  href="/host/properties"
                  title="Back to all properties"
                />
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

function Performance({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#03045E]/10 pb-4 last:border-0 last:pb-0">
      <span className="text-sm text-[#64748B]">
        {label}
      </span>

      <span className="text-sm font-semibold">
        {value}
      </span>
    </div>
  );
}

function ManageLink({
  href,
  title,
}: {
  href: string;
  title: string;
}) {
  return (
    <Link
      href={href}
      className="group flex items-center justify-between rounded-xl p-3 text-sm font-medium transition hover:bg-[#F7F3EA]"
    >
      <span>{title}</span>

      <span className="text-[#94A3B8] transition group-hover:translate-x-1">
        →
      </span>
    </Link>
  );
}