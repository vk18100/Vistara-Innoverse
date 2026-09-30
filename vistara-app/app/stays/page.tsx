import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";
import { prisma } from "@/lib/prisma";
import PropCard from "@/components/cards/properCard";

/*
|--------------------------------------------------------------------------
| VISTARA LOCAL PROPERTY IMAGES
|--------------------------------------------------------------------------
| Local images only.
| Keep these optimized/compressed in /public/images.
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

/*
|--------------------------------------------------------------------------
| ISR / CACHING
|--------------------------------------------------------------------------
| Don't force a full dynamic render on every request.
| Revalidate the page periodically instead.
|
| If you later add real-time search/filtering, move those parts
| into a dynamic route/API instead of making the whole page dynamic.
|--------------------------------------------------------------------------
*/

export const revalidate = 60;

export default async function StaysPage() {
  /*
  |--------------------------------------------------------------------------
  | DATABASE QUERY
  |--------------------------------------------------------------------------
  | Only request fields actually needed by the listing page.
  |
  | IMPORTANT:
  | We removed `include: { images: ... }` because this page uses
  | localImages instead of database image records.
  |--------------------------------------------------------------------------
  */

  const properties = await prisma.property.findMany({
    where: {
      status: "VERIFIED",
    },

    orderBy: {
      createdAt: "desc",
    },

    select: {
      id: true,
      title: true,
      city: true,
      country: true,
      pricePerNight: true,
      rating: true,
    },
  });

  /*
  |--------------------------------------------------------------------------
  | FORMAT DATA
  |--------------------------------------------------------------------------
  */

  const formattedProperties = properties.map((property, index) => ({
    id: String(property.id),

    title: property.title,

    location: `${property.city}, ${property.country}`,

    city: property.city,

    country: property.country,

    image: localImages[index % localImages.length],

    price: Number(property.pricePerNight),

    currency: "INR",

    rating: Number(property.rating ?? 0),
  }));

  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#03045E]">
      <Navbar />

      {/* =========================================================
          SEARCH
      ========================================================= */}

      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-10">

          <div
            className="
              overflow-hidden
              rounded-2xl
              border border-[#DCE3F0]
              bg-white
              shadow-[0_10px_35px_rgba(3,4,94,0.08)]
              lg:rounded-[24px]
            "
          >
            {/* SEARCH FIELDS */}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:items-center">

              {/* WHERE */}
              <div className="min-w-0 flex-1 px-5 py-4">
                <label
                  htmlFor="destination"
                  className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]"
                >
                  Where
                </label>

                <input
                  id="destination"
                  type="text"
                  placeholder="Search destinations"
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-medium
                    text-[#03045E]
                    outline-none
                    placeholder:text-[#94A3B8]
                  "
                />
              </div>

              <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

              {/* CHECK-IN */}
              <div className="min-w-0 flex-1 px-5 py-4">
                <label
                  htmlFor="check-in"
                  className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]"
                >
                  Check-in
                </label>

                <input
                  id="check-in"
                  type="date"
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-medium
                    text-[#03045E]
                    outline-none
                  "
                />
              </div>

              <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

              {/* CHECK-OUT */}
              <div className="min-w-0 flex-1 px-5 py-4">
                <label
                  htmlFor="check-out"
                  className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]"
                >
                  Check-out
                </label>

                <input
                  id="check-out"
                  type="date"
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-medium
                    text-[#03045E]
                    outline-none
                  "
                />
              </div>

              <div className="hidden h-10 w-px bg-[#E2E8F0] lg:block" />

              {/* GUESTS */}
              <div className="min-w-0 flex-1 px-5 py-4">
                <label
                  htmlFor="guests"
                  className="block text-[11px] font-bold uppercase tracking-[0.16em] text-[#64748B]"
                >
                  Guests
                </label>

                <input
                  id="guests"
                  type="number"
                  min={1}
                  placeholder="Add guests"
                  className="
                    mt-1
                    w-full
                    bg-transparent
                    text-sm
                    font-medium
                    text-[#03045E]
                    outline-none
                    placeholder:text-[#94A3B8]
                  "
                />
              </div>

              {/* SEARCH */}
              <div className="p-3 lg:p-2">
                <button
                  type="button"
                  className="
                    min-h-11
                    w-full
                    rounded-xl
                    bg-[#03045E]
                    px-7
                    py-3
                    text-sm
                    font-semibold
                    text-white
                    transition
                    hover:bg-[#0D21A1]
                    focus:outline-none
                    focus:ring-2
                    focus:ring-[#2563EB]
                    focus:ring-offset-2
                    lg:w-auto
                    lg:rounded-2xl
                    lg:px-8
                    lg:py-4
                  "
                >
                  Search
                </button>
              </div>
            </div>
          </div>

          {/* FILTERS */}

          <div className="mt-5 flex gap-2 overflow-x-auto pb-1 scrollbar-hide sm:mt-6 sm:gap-3">
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
                    ? `
                      min-h-10
                      shrink-0
                      whitespace-nowrap
                      rounded-full
                      bg-[#03045E]
                      px-4
                      py-2.5
                      text-sm
                      font-semibold
                      text-white
                    `
                    : `
                      min-h-10
                      shrink-0
                      whitespace-nowrap
                      rounded-full
                      border
                      border-[#DCE3F0]
                      bg-white
                      px-4
                      py-2.5
                      text-sm
                      font-medium
                      text-[#334155]
                      transition
                      hover:border-[#03045E]
                      hover:text-[#03045E]
                      focus:outline-none
                      focus:ring-2
                      focus:ring-[#2563EB]
                    `
                }
              >
                {filter}
              </button>
            ))}

            <button
              type="button"
              className="
                ml-auto
                hidden
                min-h-10
                shrink-0
                rounded-full
                border
                border-[#DCE3F0]
                bg-white
                px-5
                py-2.5
                text-sm
                font-medium
                text-[#334155]
                transition
                hover:border-[#03045E]
                hover:text-[#03045E]
                sm:block
              "
            >
              Filters
            </button>
          </div>
        </div>
      </section>

      {/* =========================================================
          PROPERTY SECTION
      ========================================================= */}

      <section className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-10 lg:py-12">

        {/* HEADER */}

        <div className="mb-6 flex items-end justify-between gap-4 sm:mb-8">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#0D21A1] sm:text-xs">
              Vistara Stays
            </p>

            <h1
              className="
                mt-2
                text-2xl
                font-semibold
                tracking-tight
                text-[#03045E]
                sm:text-3xl
              "
            >
              Places worth staying in
            </h1>
          </div>

          <p className="shrink-0 text-xs text-[#64748B] sm:text-sm">
            {formattedProperties.length} stays
          </p>
        </div>

        {/* =======================================================
            NO PROPERTIES
        ======================================================= */}

        {formattedProperties.length === 0 ? (
          <div className="rounded-2xl border border-[#E2E8F0] bg-white px-5 py-14 text-center sm:px-6 sm:py-16">
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

          <div
            className="
              grid
              grid-cols-1
              gap-x-5
              gap-y-8
              sm:grid-cols-2
              sm:gap-x-6
              sm:gap-y-10
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
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