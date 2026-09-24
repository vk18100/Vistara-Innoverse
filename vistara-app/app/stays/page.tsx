import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";
import PropCard from "@/components/cards/properCard";

export default async function StaysPage() {
  const properties = await prisma.property.findMany({
    where: {
      status: "VERIFIED",
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      images: {
        orderBy: {
          isPrimary: "desc",
        },
      },
      amenities: {
        include: {
          amenity: true,
        },
      },
    },
  });

  const formattedProperties = properties.map((property) => ({
    id: String(property.id),
    name: property.title,
    location: `${property.city}, ${property.country}`,
    image:
      property.images[0]?.url ||
      "/images/pag1(90).jpg",
    price: Number(property.pricePerNight),
    rating: property.rating,
  }));

  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#03045E]">
      <Navbar />

      {/* SEARCH + FILTERS */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

          {/* SEARCH BAR */}
          <div className="flex flex-col overflow-hidden rounded-[24px] border border-[#DCE3F0] bg-white shadow-[0_10px_35px_rgba(3,4,94,0.08)] lg:flex-row lg:items-center">

            <div className="flex-1 px-5 py-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                Where
              </label>

              <input
                type="text"
                placeholder="Search destinations"
                className="mt-1 w-full bg-transparent text-sm font-medium text-[#03045E] outline-none placeholder:text-[#94A3B8]"
              />
            </div>

            <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

            <div className="flex-1 px-5 py-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                Check-in
              </label>

              <input
                type="date"
                className="mt-1 w-full bg-transparent text-sm font-medium text-[#03045E] outline-none"
              />
            </div>

            <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

            <div className="flex-1 px-5 py-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                Check-out
              </label>

              <input
                type="date"
                className="mt-1 w-full bg-transparent text-sm font-medium text-[#03045E] outline-none"
              />
            </div>

            <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

            <div className="flex-1 px-5 py-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                Guests
              </label>

              <input
                type="number"
                min="1"
                placeholder="Add guests"
                className="mt-1 w-full bg-transparent text-sm font-medium text-[#03045E] outline-none placeholder:text-[#94A3B8]"
              />
            </div>

            <button
              type="button"
              className="m-2 rounded-2xl bg-[#03045E] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Search
            </button>
          </div>

          {/* FILTER BAR */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-1">
            <button className="whitespace-nowrap rounded-full bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white">
              All
            </button>

            <button className="whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]">
              Villas
            </button>

            <button className="whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]">
              Hotels
            </button>

            <button className="whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]">
              Vacation Homes
            </button>

            <button className="whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]">
              Resorts
            </button>

            <button className="whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]">
              Unique Stays
            </button>

            <div className="ml-auto hidden shrink-0 sm:block">
              <button className="rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]">
                Filters
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* PROPERTY DATA */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8 flex items-end justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              Vistara Stays
            </p>

            <h1 className="mt-2 font-serif text-3xl font-semibold tracking-tight text-[#03045E]">
              Places worth staying in
            </h1>
          </div>

          <p className="hidden text-sm text-[#64748B] sm:block">
            {formattedProperties.length} stays
          </p>
        </div>

        {/* CARDS */}
      {/* CARDS */}
<div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {formattedProperties.map((property) => (
    <PropCard
  key={property.id}
  id={property.id}
  name={property.name}
  location={property.location}
  image={property.image}
  price={property.price}
  rating={property.rating}
/>
  ))}
</div>
      </section>

      <Footer />
    </main>
  );
}