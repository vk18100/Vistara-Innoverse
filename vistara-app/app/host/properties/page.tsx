import Link from "next/link";
import Navbar from "@/components/navbar";

const properties = [
  {
    id: 1,
    name: "The Heritage Courtyard",
    location: "Patna, Bihar",
    type: "Entire villa",
    guests: "6 guests",
    price: "₹4,500",
    rating: "4.8",
    reviews: "24 reviews",
    status: "Active",
    image: "/images/pag1 (1).jpg",
  },
  {
    id: 2,
    name: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    type: "Private stay",
    guests: "4 guests",
    price: "₹3,800",
    rating: "4.7",
    reviews: "89 reviews",
    status: "Active",
    image: "/images/pag1 (2).jpg",
  },
  {
    id: 3,
    name: "The Quiet House",
    location: "Bodh Gaya, Bihar",
    type: "Entire home",
    guests: "5 guests",
    price: "₹3,200",
    rating: "4.9",
    reviews: "31 reviews",
    status: "Draft",
    image: "/images/pag1 (3).jpg",
  },
];

export default function PropertiesPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <Link
                href="/host"
                className="text-sm font-medium text-[#64748B] hover:text-[#03045E]"
              >
                ← Host dashboard
              </Link>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
                YOUR LISTINGS
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Your properties
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Manage your stays, update your listings and keep your
                property information up to date.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              + Add property
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* FILTER BAR */}
        <div className="flex flex-col gap-4 rounded-2xl border border-[#03045E]/10 bg-white p-4 shadow-sm md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap gap-2">
            <button className="rounded-full bg-[#03045E] px-5 py-2 text-xs font-semibold text-white">
              All · 3
            </button>

            <button className="rounded-full border border-[#03045E]/10 px-5 py-2 text-xs font-medium text-[#64748B] hover:border-[#03045E] hover:text-[#03045E]">
              Active · 2
            </button>

            <button className="rounded-full border border-[#03045E]/10 px-5 py-2 text-xs font-medium text-[#64748B] hover:border-[#03045E] hover:text-[#03045E]">
              Draft · 1
            </button>
          </div>

          <select className="rounded-xl border border-[#03045E]/10 bg-white px-4 py-2.5 text-sm text-[#64748B] outline-none focus:border-[#03045E]">
            <option>Recently updated</option>
            <option>Highest rated</option>
            <option>Lowest price</option>
            <option>Highest price</option>
          </select>
        </div>

        {/* PROPERTY CARDS */}
        <div className="mt-7 space-y-5">
          {properties.map((property) => (
            <article
              key={property.id}
              className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.04)]"
            >
              <div className="grid md:grid-cols-[260px_1fr]">

                {/* IMAGE */}
                <div className="relative h-60 md:h-full">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="h-full w-full object-cover"
                  />

                  <span
                    className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${
                      property.status === "Active"
                        ? "bg-white text-emerald-700"
                        : "bg-[#FFF7E6] text-[#9A6700]"
                    }`}
                  >
                    {property.status}
                  </span>
                </div>

                {/* DETAILS */}
                <div className="p-6 md:p-7">
                  <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#C6A15B]">
                        {property.type}
                      </p>

                      <h2 className="mt-2 font-serif text-2xl font-semibold">
                        {property.name}
                      </h2>

                      <p className="mt-2 text-sm text-[#64748B]">
                        {property.location}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748B]">
                        <span>{property.guests}</span>

                        <span>
                          ★ {property.rating}
                        </span>

                        <span>
                          {property.reviews}
                        </span>
                      </div>
                    </div>

                    <div className="lg:text-right">
                      <p className="text-xs text-[#94A3B8]">
                        Starting from
                      </p>

                      <p className="mt-1 text-xl font-semibold">
                        {property.price}
                        <span className="ml-1 text-xs font-normal text-[#64748B]">
                          / night
                        </span>
                      </p>
                    </div>
                  </div>

                  {/* ACTIONS */}
                  <div className="mt-7 flex flex-col gap-3 border-t border-[#03045E]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/host/property/${property.id}`}
                        className="rounded-xl bg-[#03045E] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0D21A1]"
                      >
                        Manage listing
                      </Link>

                      <Link
                        href={`/host/property/${property.id}/edit`}
                        className="rounded-xl border border-[#03045E]/15 px-5 py-2.5 text-xs font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
                      >
                        Edit
                      </Link>
                    </div>

                    <button className="text-left text-xs font-medium text-[#64748B] hover:text-red-600 sm:text-right">
                      More options
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* ADD PROPERTY CTA */}
        <div className="mt-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-8 text-white md:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#C6A15B]">
                GROW WITH VISTARA
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                Have another place to share?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                Add another property and introduce travellers to
                a place worth remembering.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]"
            >
              Add a property
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}