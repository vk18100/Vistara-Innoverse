import Link from "next/link";

import {
  Search,
  MapPin,
  CalendarDays,
  Users,
  SlidersHorizontal,
  Star,
  ShieldCheck,
  X,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "../footer/page";

import { stays } from "@/data/stay";

/* =========================================================
   SEARCH PARAMS
========================================================= */

type SearchParams = {
  where?: string;
  checkIn?: string;
  checkOut?: string;
  guests?: string;
  maxPrice?: string;
  minRating?: string;
};

/* =========================================================
   PAGE
========================================================= */

export default async function StaysPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const where =
    params.where?.trim() || "";

  const checkIn =
    params.checkIn || "";

  const checkOut =
    params.checkOut || "";

  const guests =
    params.guests || "";

  const maxPrice = Number(
    params.maxPrice || 6000
  );

  const minRating = Number(
    params.minRating || 0
  );

  /* =======================================================
     FILTER STAYS
  ======================================================= */

  const query = where.toLowerCase();

  const filteredStays = stays.filter(
    (stay) => {
      const title =
        stay.title.toLowerCase();

      const location =
        stay.location.toLowerCase();

      const city =
        stay.city.toLowerCase();

      const country =
        stay.country.toLowerCase();

      /* LOCATION */

      const matchesLocation =
        !query ||
        title.includes(query) ||
        location.includes(query) ||
        city.includes(query) ||
        country.includes(query);

      /* GUESTS */

      const matchesGuests =
        !guests ||
        stay.guests >=
          Number(guests);

      /* PRICE */

      const matchesPrice =
        stay.price <= maxPrice;

      /* RATING */

      const matchesRating =
        stay.rating >= minRating;

      return (
        matchesLocation &&
        matchesGuests &&
        matchesPrice &&
        matchesRating
      );
    }
  );

  /* =======================================================
     CLEAR URL
  ======================================================= */

  function getClearUrl() {
    return "/stays";
  }

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="min-h-screen bg-white text-[#111827]">

      <Navbar />

      {/* ===================================================
          HEADER
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-5 pt-8 sm:px-6 lg:px-8">

        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
          Explore stays
        </p>

        <h1 className="mt-1 text-2xl font-semibold tracking-tight text-[#111827] sm:text-3xl">
          Find a stay worth discovering
        </h1>

        <p className="mt-2 max-w-2xl text-sm text-[#64748B]">
          Discover verified homes, villas and unique stays around India.
        </p>

      </section>

      {/* ===================================================
          SEARCH
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <form
          method="GET"
          action="/stays"
          className="rounded-2xl border border-[#E2E8F0] bg-white p-2 shadow-[0_8px_30px_rgba(3,4,94,0.06)]"
        >

          <div className="grid grid-cols-1 gap-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr_auto]">

            {/* WHERE */}

            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">

              <MapPin
                size={17}
                className="shrink-0 text-[#111827]"
              />

              <div className="min-w-0 flex-1">

                <label
                  htmlFor="where"
                  className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]"
                >
                  Where
                </label>

                <input
                  id="where"
                  name="where"
                  defaultValue={where}
                  placeholder="Search Patna or stay"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium text-[#111827] outline-none placeholder:text-[#94A3B8]"
                />

              </div>

            </div>

            {/* CHECK IN */}

            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">

              <CalendarDays
                size={17}
                className="shrink-0 text-[#111827]"
              />

              <div className="min-w-0 flex-1">

                <label
                  htmlFor="checkIn"
                  className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]"
                >
                  Check in
                </label>

                <input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  defaultValue={checkIn}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-[#111827] outline-none"
                />

              </div>

            </div>

            {/* CHECK OUT */}

            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">

              <CalendarDays
                size={17}
                className="shrink-0 text-[#111827]"
              />

              <div className="min-w-0 flex-1">

                <label
                  htmlFor="checkOut"
                  className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]"
                >
                  Check out
                </label>

                <input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  defaultValue={checkOut}
                  className="mt-1 w-full bg-transparent text-sm font-medium text-[#111827] outline-none"
                />

              </div>

            </div>

            {/* GUESTS */}

            <div className="flex items-center gap-3 rounded-xl bg-[#F8FAFC] px-4 py-3">

              <Users
                size={17}
                className="shrink-0 text-[#111827]"
              />

              <div className="flex-1">

                <label
                  htmlFor="guests"
                  className="block text-[10px] font-bold uppercase tracking-wide text-[#64748B]"
                >
                  Guests
                </label>

                <input
                  id="guests"
                  name="guests"
                  type="number"
                  min="1"
                  defaultValue={guests}
                  placeholder="Guests"
                  className="mt-0.5 w-full bg-transparent text-sm font-medium outline-none placeholder:text-[#94A3B8]"
                />

              </div>

            </div>

            {/* SEARCH BUTTON */}

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-black px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#222]"
            >
              <Search size={16} />
              Search
            </button>

          </div>

          {/* =================================================
              FILTERS
          ================================================= */}

          <details className="mt-2 border-t border-[#E2E8F0] pt-3">

            <summary className="flex cursor-pointer list-none items-center justify-center gap-2 rounded-xl border border-[#E2E8F0] px-5 py-3 text-sm font-semibold text-[#334155] transition hover:border-black">
              <SlidersHorizontal size={16} />
              Filters
            </summary>

            <div className="mt-4 grid gap-5 px-3 pb-3 sm:grid-cols-2 lg:grid-cols-3">

              {/* MAX PRICE */}

              <div>

                <label
                  htmlFor="maxPrice"
                  className="text-xs font-semibold text-[#334155]"
                >
                  Maximum price
                </label>

                <div className="mt-3 flex items-center gap-3">

                  <input
                    id="maxPrice"
                    name="maxPrice"
                    type="range"
                    min="1000"
                    max="10000"
                    step="100"
                    defaultValue={maxPrice}
                    className="w-full accent-black"
                  />

                  <span className="whitespace-nowrap text-sm font-semibold text-black">
                    ₹
                    {maxPrice.toLocaleString(
                      "en-IN"
                    )}
                  </span>

                </div>

              </div>

              {/* MIN RATING */}

              <div>

                <label
                  htmlFor="minRating"
                  className="text-xs font-semibold text-[#334155]"
                >
                  Minimum rating
                </label>

                <select
                  id="minRating"
                  name="minRating"
                  defaultValue={String(
                    minRating
                  )}
                  className="mt-2 w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2.5 text-sm outline-none focus:border-black"
                >
                  <option value="0">
                    Any rating
                  </option>

                  <option value="4">
                    4.0+
                  </option>

                  <option value="4.5">
                    4.5+
                  </option>

                  <option value="4.8">
                    4.8+
                  </option>
                </select>

              </div>

              {/* CLEAR */}

              <div className="flex items-end">

                <Link
                  href={getClearUrl()}
                  className="flex items-center gap-2 rounded-xl border border-[#E2E8F0] px-4 py-2.5 text-sm font-semibold text-[#475569] transition hover:border-black hover:text-black"
                >
                  <X size={15} />
                  Clear search
                </Link>

              </div>

            </div>

          </details>

        </form>

      </section>

      {/* ===================================================
          RESULTS
      =================================================== */}

      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6 lg:px-8">

        {/* RESULT HEADER */}

        <div className="mb-5 flex items-center justify-between">

          <div>

            <h2 className="text-lg font-semibold text-[#111827]">
              Stays in Patna
            </h2>

            <p className="mt-1 text-xs text-[#64748B]">
              {filteredStays.length}{" "}
              {filteredStays.length === 1
                ? "stay"
                : "stays"}{" "}
              available
            </p>

          </div>

          {(where ||
            checkIn ||
            checkOut ||
            guests ||
            params.maxPrice ||
            params.minRating) && (
            <Link
              href="/stays"
              className="text-xs font-semibold text-black hover:underline"
            >
              Clear
            </Link>
          )}

        </div>

        {/* =================================================
            GRID
        ================================================= */}

        {filteredStays.length > 0 ? (

          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {filteredStays.map(
              (stay) => {

                /*
                 * IMPORTANT:
                 *
                 * We are using the STRING ID
                 * from data/stay.ts.
                 *
                 * Example:
                 *
                 * heritage-villa
                 *
                 * URL:
                 *
                 * /stays/heritage-villa
                 */

                const stayUrl =
                  `/stays/${encodeURIComponent(
                    stay.id
                  )}`;

                return (
                  <Link
                    key={stay.id}
                    href={stayUrl}
                    className="group block"
                  >

                    {/* IMAGE */}

                    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#F1F5F9]">

                      <img
                        src={stay.image}
                        alt={stay.title}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                      />

                      {/* VERIFIED */}

                      {stay.verified && (
                        <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[10px] font-semibold text-[#111827] shadow-sm backdrop-blur">

                          <ShieldCheck
                            size={12}
                          />

                          Verified

                        </div>
                      )}

                      {/* RATING */}

                      <div className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-1 text-[11px] font-semibold text-[#111827] shadow-sm backdrop-blur">

                        <Star
                          size={12}
                          fill="currentColor"
                        />

                        {stay.rating.toFixed(
                          1
                        )}

                      </div>

                    </div>

                    {/* DETAILS */}

                    <div className="pt-3">

                      <div className="flex items-start justify-between gap-3">

                        <h3 className="line-clamp-1 text-sm font-semibold text-[#111827] transition group-hover:underline">
                          {stay.title}
                        </h3>

                        <span className="shrink-0 text-sm font-bold text-[#111827]">
                          ₹
                          {stay.price.toLocaleString(
                            "en-IN"
                          )}
                        </span>

                      </div>

                      <p className="mt-1 text-xs text-[#64748B]">
                        {stay.location}
                      </p>

                      <p className="mt-1 text-xs text-[#94A3B8]">
                        Up to{" "}
                        {stay.guests}{" "}
                        guests
                      </p>

                      <p className="mt-2 text-[11px] font-medium text-[#64748B]">
                        ₹
                        {stay.price.toLocaleString(
                          "en-IN"
                        )}{" "}
                        per night
                      </p>

                    </div>

                  </Link>
                );
              }
            )}

          </div>

        ) : (

          /* =================================================
             EMPTY STATE
          ================================================= */

          <div className="rounded-2xl border border-dashed border-[#CBD5E1] px-6 py-16 text-center">

            <MapPin
              size={28}
              className="mx-auto text-[#94A3B8]"
            />

            <h3 className="mt-4 text-base font-semibold text-[#111827]">
              No stays found
            </h3>

            <p className="mt-1 text-sm text-[#64748B]">
              Try changing your search or filters.
            </p>

            <Link
              href="/stays"
              className="mt-5 inline-flex rounded-xl bg-black px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#222]"
            >
              Clear filters
            </Link>

          </div>
        )}

      </section>

      <Footer />

    </main>
  );
}