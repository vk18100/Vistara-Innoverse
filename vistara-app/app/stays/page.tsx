import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";
import PropCard from "@/components/cards/properCard";

/*
|--------------------------------------------------------------------------
| VISTARA LOCAL PROPERTY IMAGES
|--------------------------------------------------------------------------
| These are the actual images from:
| public/images/
|
| Do NOT use external / Unsplash images.
|--------------------------------------------------------------------------
*/

const localImages = [
  "/images/pag1 (7).jpg",
  "/images/pag1 (8).jpg",
  "/images/pag1 (9).jpg",
  "/images/pag1 (10).jpg",
  "/images/pag1 (11).jpg",
  "/images/pag1 (12).jpg",
  "/images/pag1 (13).jpg",
  "/images/pag1 (14).jpg",
  "/images/pag1 (15).jpg",
  "/images/pag1 (16).jpg",
  "/images/pag1 (17).jpg",
  "/images/pag1 (18).jpg",
  "/images/pag1 (19).jpg",
  "/images/pag1 (20).jpg",
  "/images/pag1 (21).jpg",
  "/images/pag1 (22).jpg",
  "/images/pag1 (23).jpg",
];
export const dynamic = "force-dynamic";

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
    },
  });

  /*
  |--------------------------------------------------------------------------
  | Use local images instead of database image URLs
  |--------------------------------------------------------------------------
  */

  const formattedProperties = properties.map(
    (property, index) => ({
      id: String(property.id),

      title: property.title,

      location: `${property.city}, ${property.country}`,

      city: property.city,

      country: property.country,

      /*
       * First property gets pag1 (7).jpg
       * Second gets pag1 (8).jpg
       * Third gets pag1 (9).jpg
       * etc.
       */
      image:
        localImages[index % localImages.length],

      /*
       * Keep the actual local gallery available
       * for the property detail page.
       */
      gallery: localImages,

      price: Number(property.pricePerNight),

      currency: "INR",

      rating: Number(property.rating ?? 0),
    })
  );

  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#03045E]">
      <Navbar />

      {/* =========================================================
          SEARCH
      ========================================================= */}

      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-8 lg:px-10">

          <div className="flex flex-col overflow-hidden rounded-[24px] border border-[#DCE3F0] bg-white shadow-[0_10px_35px_rgba(3,4,94,0.08)] lg:flex-row lg:items-center">

            {/* WHERE */}
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

            {/* CHECK-IN */}
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

            {/* CHECK-OUT */}
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

            {/* GUESTS */}
            <div className="flex-1 px-5 py-4">
              <label className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]">
                Guests
              </label>

              <input
                type="number"
                min={1}
                placeholder="Add guests"
                className="mt-1 w-full bg-transparent text-sm font-medium text-[#03045E] outline-none placeholder:text-[#94A3B8]"
              />
            </div>

            {/* SEARCH BUTTON */}
            <button
              type="button"
              className="m-2 rounded-2xl bg-[#03045E] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Search
            </button>
          </div>

          {/* FILTERS */}
          <div className="mt-6 flex gap-3 overflow-x-auto pb-1">

            {[
              "All",
              "Villas",
              "Hotels",
              "Vacation Homes",
              "Resorts",
              "Unique Stays",
            ].map((filter, index) => (
              <button
                key={filter}
                type="button"
                className={
                  index === 0
                    ? "whitespace-nowrap rounded-full bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white"
                    : "whitespace-nowrap rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]"
                }
              >
                {filter}
              </button>
            ))}

            <div className="ml-auto hidden shrink-0 sm:block">
              <button
                type="button"
                className="rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#334155] transition hover:border-[#03045E] hover:text-[#03045E]"
              >
                Filters
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================================
          PROPERTY SECTION
      ========================================================= */}

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

        {/* =======================================================
            NO PROPERTIES
        ======================================================= */}

        {formattedProperties.length === 0 ? (

          <div className="rounded-2xl border border-[#E2E8F0] bg-white px-6 py-16 text-center">

            <h2 className="text-xl font-semibold text-[#03045E]">
              No stays available
            </h2>

            <p className="mt-2 text-sm text-[#64748B]">
              Verified properties will appear here.
            </p>

          </div>

        ) : (

          /* =====================================================
             PROPERTY CARDS
          ===================================================== */

          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {formattedProperties.map((property) => (

              <PropCard
                key={property.id}
                property={property}
              />

            ))}

          </div>

        )}

      </section>

      <Footer />
    </main>
  );
}