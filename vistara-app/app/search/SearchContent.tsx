"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Navbar from "@/components/navbar";
import SearchBar from "@/components/Searchbar";
import Filters, { FilterValues } from "@/components/Filters";
import Dropdown from "@/components/Dropdown";
import EmptyState from "@/components/Empty";
import PropertyCard from "./Propertycard";

type Property = {
  id: number;
  title: string;
  description: string;
  location: string;
  price: number;
  rating: number;
  propertyType: string;
  verified: boolean;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Villa",
    description: "A beautiful villa with stunning views.",
    location: "Bali, Indonesia",
    price: 5000,
    rating: 4.8,
    propertyType: "Villa",
    verified: true,
    image: "/images/villa.jpg",
  },
  {
    id: 2,
    title: "Beachfront Apartment",
    description: "A modern apartment with direct beach access.",
    location: "Miami, USA",
    price: 3000,
    rating: 4.6,
    propertyType: "Apartment",
    verified: true,
    image: "/images/apartment.jpg",
  },
  {
    id: 3,
    title: "Mountain Cabin",
    description: "A cozy cabin in the mountains.",
    location: "Aspen, USA",
    price: 2000,
    rating: 4.7,
    propertyType: "House",
    verified: false,
    image: "/images/cabin.jpg",
  },
  {
    id: 4,
    title: "Patna Heritage Stay",
    description: "A comfortable stay close to Patna's historic places.",
    location: "Patna, India",
    price: 2500,
    rating: 4.9,
    propertyType: "Villa",
    verified: true,
    image: "/images/villa.jpg",
  },
  {
    id: 5,
    title: "Patna City Apartment",
    description: "Modern apartment in the heart of Patna.",
    location: "Patna, India",
    price: 1800,
    rating: 4.5,
    propertyType: "Apartment",
    verified: true,
    image: "/images/apartment.jpg",
  },
  {
    id: 6,
    title: "Patna Riverside Stay",
    description: "Relaxing stay with a peaceful riverside atmosphere.",
    location: "Patna, India",
    price: 2200,
    rating: 4.8,
    propertyType: "House",
    verified: false,
    image: "/images/cabin.jpg",
  },
];

const defaultFilters: FilterValues = {
  price: "Any",
  propertyType: "Any",
  rating: "Any",
  verified: false,
};

export default function SearchContent() {
  const searchParams = useSearchParams();

  const destination = searchParams.get("where") || "";
  const checkIn = searchParams.get("checkIn") || "";
  const checkOut = searchParams.get("checkOut") || "";
  const guests = searchParams.get("guests") || "1";

  const [filters, setFilters] = useState<FilterValues>(defaultFilters);
  const [sort, setSort] = useState("Recommended");

  const searchText = destination.trim().toLowerCase();

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      if (searchText) {
        const matchesDestination =
          property.title.toLowerCase().includes(searchText) ||
          property.location.toLowerCase().includes(searchText) ||
          property.description.toLowerCase().includes(searchText);

        if (!matchesDestination) {
          return false;
        }
      }

      if (filters.price === "₹1k–₹3k") {
        if (property.price < 1000 || property.price > 3000) {
          return false;
        }
      }

      if (filters.price === "₹3k+") {
        if (property.price < 3000) {
          return false;
        }
      }

      if (
        filters.propertyType !== "Any" &&
        property.propertyType !== filters.propertyType
      ) {
        return false;
      }

      if (filters.rating === "4+" && property.rating < 4) {
        return false;
      }

      if (filters.rating === "4.5+" && property.rating < 4.5) {
        return false;
      }

      if (filters.rating === "4.8+" && property.rating < 4.8) {
        return false;
      }

      if (filters.verified && !property.verified) {
        return false;
      }

      return true;
    });

    if (sort === "Price: Low to High") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "Price: High to Low") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "Highest Rated") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    return result;
  }, [searchText, filters, sort]);

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="border-b border-[#03045E]/10 bg-white px-6 py-8">
        <SearchBar />
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
        <div className="mb-8">
          <p className="text-sm text-[#64748B]">
            Showing results for{" "}
            <span className="font-semibold text-[#03045E]">
              {destination || "all destinations"}
            </span>
          </p>

          {(checkIn || checkOut) && (
            <p className="mt-2 text-xs text-[#64748B]">
              {checkIn && `Check-in: ${checkIn}`}
              {checkOut && ` • Check-out: ${checkOut}`}
              {` • ${guests} ${guests === "1" ? "guest" : "guests"}`}
            </p>
          )}
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          <aside>
            <Filters onApply={setFilters} />
          </aside>

          <section>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-2xl font-bold text-[#03045E]">
                  {destination ? `Stays in ${destination}` : "Explore stays"}
                </h1>

                <p className="mt-1 text-sm text-[#64748B]">
                  {filteredProperties.length}{" "}
                  {filteredProperties.length === 1 ? "property" : "properties"} found
                </p>
              </div>

              <div className="w-52">
                <Dropdown
                  label="Sort by"
                  options={[
                    "Recommended",
                    "Price: Low to High",
                    "Price: High to Low",
                    "Highest Rated",
                  ]}
                  value={sort}
                  onChange={setSort}
                />
              </div>
            </div>

            {filteredProperties.length > 0 ? (
              <div className="grid gap-6 sm:grid-cols-2">
                {filteredProperties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    id={property.id}
                    title={property.title}
                    location={property.location}
                    price={property.price}
                    image={property.image}
                    rating={property.rating}
                    verified={property.verified}
                  />
                ))}
              </div>
            ) : (
              <EmptyState
                title="No stays found"
                description={`We couldn't find any stays matching ${
                  destination ? `"${destination}"` : "your selected filters"
                }. Try changing your search or filters.`}
                buttonText="Explore Stays"
                href="/stays"
              />
            )}
          </section>
        </div>
      </section>
    </main>
  );
}