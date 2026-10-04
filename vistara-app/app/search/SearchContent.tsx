"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import {
  CalendarDays,
  MapPin,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";

import PropCard from "@/components/cards/properCard";

type Property = {
  id: string;
  title: string;
  location: string;
  city: string;
  country: string;
  image: string;
  price: number;
  currency: string;
  rating: number;
};

/*
|--------------------------------------------------------------------------
| Temporary search data
|--------------------------------------------------------------------------
| Later this will come from your Prisma/API property endpoint.
*/

const PROPERTIES: Property[] = [
  {
    id: "patna-blue-courtyard",
    title: "The Blue Courtyard",
    location: "Kankarbagh, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (85).jpg",
    price: 2800,
    currency: "INR",
    rating: 4.8,
  },
  {
    id: "patna-heritage-stay",
    title: "Patna Heritage Stay",
    location: "Rajendra Nagar, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (86).jpg",
    price: 2200,
    currency: "INR",
    rating: 4.7,
  },
  {
    id: "ganga-view-retreat",
    title: "Ganga View Retreat",
    location: "Gandhi Ghat, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (84).jpg",
    price: 3500,
    currency: "INR",
    rating: 4.9,
  },
  {
    id: "garden-house-patna",
    title: "The Garden House",
    location: "Boring Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (81).jpg",
    price: 1900,
    currency: "INR",
    rating: 4.6,
  },
  {
    id: "modern-patna-residence",
    title: "Modern Patna Residence",
    location: "Bailey Road, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (82).jpg",
    price: 2500,
    currency: "INR",
    rating: 4.7,
  },
  {
    id: "riverside-home-patna",
    title: "Quiet Riverside Home",
    location: "Gandhi Ghat, Patna",
    city: "Patna",
    country: "India",
    image: "/images/pag1 (83).jpg",
    price: 3100,
    currency: "INR",
    rating: 4.8,
  },
];

/*
|--------------------------------------------------------------------------
| Helpers
|--------------------------------------------------------------------------
*/

function formatDate(date: string) {
  if (!date) {
    return "Any date";
  }

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) {
    return "Any date";
  }

  return parsedDate.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function normalizeSearchValue(value: string) {
  return value.trim().toLowerCase();
}

/*
|--------------------------------------------------------------------------
| Search Content
|--------------------------------------------------------------------------
*/

export default function SearchContent() {
  const searchParams = useSearchParams();

  const query = searchParams.get("query")?.trim() ?? "";
  const checkIn = searchParams.get("checkIn") ?? "";

  const guestsParam = Number(searchParams.get("guests") ?? "2");

  const guests =
    Number.isFinite(guestsParam) && guestsParam > 0
      ? guestsParam
      : 2;

  /*
  |--------------------------------------------------------------------------
  | Filter results
  |--------------------------------------------------------------------------
  */

  const filteredProperties = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query);

    if (!normalizedQuery) {
      return PROPERTIES;
    }

    return PROPERTIES.filter((property) => {
      const searchableText = [
        property.title,
        property.location,
        property.city,
        property.country,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedQuery);
    });
  }, [query]);

  /*
  |--------------------------------------------------------------------------
  | Page heading
  |--------------------------------------------------------------------------
  */

  const heading = query
    ? `Stays in ${query}`
    : "Find your stay";

  return (
    <main className="min-h-screen bg-[#FAF9F6]">

      {/* ============================================================
          HEADER
      ============================================================ */}

      <section className="border-b border-[#E7E4DE] bg-white">

        <div className="mx-auto max-w-[1500px] px-5 py-7 sm:px-8 lg:px-10">

          {/* HEADING */}

          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#64748B]">
              STAYS
            </p>

            <h1 className="mt-2 font-serif text-4xl font-semibold tracking-[-0.02em] text-[#171614] sm:text-5xl">
              {heading}
            </h1>

            <p className="mt-3 text-sm text-[#77726A]">
              {filteredProperties.length}{" "}
              {filteredProperties.length === 1
                ? "stay"
                : "stays"}{" "}
              available
            </p>
          </div>

          {/* ========================================================
              SEARCH SUMMARY
          ======================================================== */}

          <div className="mt-7 overflow-hidden rounded-[22px] border border-[#E2E8F0] bg-white shadow-[0_8px_30px_rgba(0,0,0,0.05)]">

            <div className="grid grid-cols-1 md:grid-cols-3">

              {/* LOCATION */}

              <div className="flex items-center gap-3 px-5 py-5 md:border-r md:border-[#E7E4DE]">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <MapPin
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#292724]"
                  />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#77726A]">
                    Where
                  </p>

                  <p className="mt-1 truncate text-sm font-semibold text-[#171614]">
                    {query || "Anywhere"}
                  </p>
                </div>

              </div>

              {/* DATE */}

              <div className="flex items-center gap-3 border-t border-[#E7E4DE] px-5 py-5 md:border-t-0 md:border-r">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <CalendarDays
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#292724]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#77726A]">
                    Check in
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#171614]">
                    {formatDate(checkIn)}
                  </p>
                </div>

              </div>

              {/* GUESTS */}

              <div className="flex items-center gap-3 border-t border-[#E7E4DE] px-5 py-5 md:border-t-0">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#F3F1EC]">
                  <Users
                    size={18}
                    strokeWidth={1.8}
                    className="text-[#292724]"
                  />
                </div>

                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#77726A]">
                    Guests
                  </p>

                  <p className="mt-1 text-sm font-semibold text-[#171614]">
                    {guests}{" "}
                    {guests === 1 ? "Guest" : "Guests"}
                  </p>
                </div>

              </div>

            </div>
          </div>

        </div>
      </section>

      {/* ============================================================
          RESULTS
      ============================================================ */}

      <section className="mx-auto max-w-[1500px] px-5 py-10 sm:px-8 lg:px-10">

        {/* RESULT TOOLBAR */}

        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

          <div>
            <p className="text-sm text-[#77726A]">
              Showing{" "}
              <span className="font-semibold text-[#171614]">
                {filteredProperties.length}
              </span>{" "}
              {filteredProperties.length === 1
                ? "property"
                : "properties"}
            </p>
          </div>

          <button
            type="button"
            className="
  flex
  items-center
  justify-center
  gap-2
  rounded-full
  bg-[#222222]
  px-5
  py-3
  text-sm
  font-semibold
  text-white
  transition
  hover:bg-[#000000]
  active:scale-[0.98]
"
          >
            <SlidersHorizontal size={16} />
            Filters
          </button>

        </div>

        {/* ==========================================================
            RESULTS GRID
        ========================================================== */}

        {filteredProperties.length > 0 ? (

          <div
            className="
              grid
              grid-cols-1
              gap-x-6
              gap-y-12
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
            "
          >
            {filteredProperties.map((property) => (
              <PropCard
                key={property.id}
                property={property}
              />
            ))}
          </div>

        ) : (

          /* ========================================================
             EMPTY STATE
          ======================================================== */

          <div className="flex min-h-[420px] flex-col items-center justify-center rounded-[28px] border border-[#E7E4DE] bg-white px-6 text-center">

            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F1EC]">
              <Search
                size={24}
                strokeWidth={1.8}
                className="text-[#77726A]"
              />
            </div>

            <h2 className="mt-6 font-serif text-3xl font-semibold text-[#171614]">
              No stays found
            </h2>

            <p className="mt-3 max-w-md text-sm leading-6 text-[#77726A]">
              We couldn't find any stays matching{" "}
              {query ? `"${query}"` : "your search"}.
              Try searching for another destination.
            </p>

          </div>
        )}

      </section>
    </main>
  );
}