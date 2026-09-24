"use client";

import { useSearchParams } from "next/navigation";
import Navbar from "@/components/navbar";
import SearchBar from "@/components/Searchbar";
import Filters from "@/components/Filters";
import Dropdown from "@/components/Dropdown";

const properties = [
  {
    id: 1,
    title: "Luxury Villa",
    description: "A beautiful villa with stunning views.",
    location: "Bali, Indonesia",
    price: 500,
    image: "/images/villa.jpg",
  },
  {
    id: 2,
    title: "Beachfront Apartment",
    description: "A modern apartment with direct beach access.",
    location: "Miami, USA",
    price: 300,
    image: "/images/apartment.jpg",
  },
  {
    id: 3,
    title: "Mountain Cabin",
    description: "A cozy cabin in the mountains.",
    location: "Aspen, USA",
    price: 200,
    image: "/images/cabin.jpg",
  },
  {
    id: 4,
    title: "Patna Heritage Stay",
    description: "A comfortable stay close to Patna's historic places.",
    location: "Patna, India",
    price: 2500,
    image: "/images/villa.jpg",
  },
  {
    id: 5,
    title: "Patna City Apartment",
    description: "Modern apartment in the heart of Patna.",
    location: "Patna, India",
    price: 1800,
    image: "/images/apartment.jpg",
  },
  {
    id: 6,
    title: "Patna Riverside Stay",
    description: "Relaxing stay with a peaceful riverside atmosphere.",
    location: "Patna, India",
    price: 2200,
    image: "/images/cabin.jpg",
  },
];

export default function SearchPage() {
  const searchParams = useSearchParams();

  const destination =
    searchParams.get("destination") || "";

  const searchText = destination.trim().toLowerCase();

  const filteredProperties = searchText
    ? properties.filter((property) => {
        return (
          property.title.toLowerCase().includes(searchText) ||
          property.location.toLowerCase().includes(searchText) ||
          property.description.toLowerCase().includes(searchText)
        );
      })
    : properties;

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* SEARCH */}
      <section className="border-b border-[#03045E]/10 bg-white px-6 py-8">
        <SearchBar />
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* RESULT HEADER */}
        <div className="mb-8">
          <p className="text-sm text-[#64748B]">
            Showing results for{" "}
            <span className="font-semibold text-[#03045E]">
              {destination || "all destinations"}
            </span>
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">

          {/* FILTERS */}
          <aside>
            <Filters />
          </aside>

          {/* RESULTS */}
          <section>

            {/* TOP BAR */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>
                <h1 className="text-2xl font-bold text-[#03045E]">
                  {destination
                    ? `Stays in ${destination}`
                    : "Explore stays"}
                </h1>

                <p className="mt-1 text-sm text-[#64748B]">
                  {filteredProperties.length}{" "}
                  {filteredProperties.length === 1
                    ? "property"
                    : "properties"}{" "}
                  found
                </p>
              </div>

              <div className="w-44">
                <Dropdown
                  label="Sort by"
                  options={[
                    "Recommended",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Highest Rated",
                  ]}
                />
              </div>
            </div>

            {/* PROPERTY CARDS */}
            {filteredProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">

                {filteredProperties.map((property) => (
                  <div
                    key={property.id}
                    className="overflow-hidden rounded-2xl border border-[#03045E]/10 bg-white shadow-[0_10px_30px_rgba(3,4,94,0.05)] transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(3,4,94,0.10)]"
                  >
                    {/* IMAGE */}
                    <img
                      src={property.image}
                      alt={property.title}
                      className="h-52 w-full object-cover"
                    />

                    {/* CONTENT */}
                    <div className="p-5">

                      <h2 className="text-lg font-semibold text-[#03045E]">
                        {property.title}
                      </h2>

                      <p className="mt-1 text-sm text-[#64748B]">
                        {property.description}
                      </p>

                      <p className="mt-3 text-sm font-medium text-[#475569]">
                        {property.location}
                      </p>

                      <div className="mt-4 flex items-center justify-between">
                        <p className="font-semibold text-[#03045E]">
                          ₹{property.price}
                          <span className="font-normal text-[#64748B]">
                            {" "}
                            / night
                          </span>
                        </p>

                        <span className="text-sm font-medium text-[#0D21A1]">
                          View stay →
                        </span>
                      </div>

                    </div>
                  </div>
                ))}

              </div>
            ) : (
              /* NO RESULTS */
              <div className="rounded-3xl border border-[#03045E]/10 bg-white px-6 py-16 text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#03045E]">
                  ?
                </div>

                <h2 className="mt-5 text-xl font-semibold text-[#03045E]">
                  No stays found
                </h2>

                <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
                  We couldn't find any stays matching{" "}
                  <span className="font-semibold">
                    "{destination}"
                  </span>
                  . Try searching for another destination.
                </p>
              </div>
            )}

          </section>
        </div>
      </section>
    </main>
  );
}