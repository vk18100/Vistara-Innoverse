"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import Navbar from "@/components/navbar";

type PropertyStatus = "Active" | "Draft" | "Pending";

type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  guests: number;
  price: number;
  rating: number;
  reviews: number;
  status: PropertyStatus;
  verified: boolean;
  image: string;
  views: number;
  bookings: number;
  revenue: number;
  availability: string;
  updated: string;
};

const properties: Property[] = [
  {
    id: "heritage-courtyard",
    name: "The Heritage Courtyard",
    location: "Patna, Bihar",
    type: "Entire villa",
    guests: 6,
    price: 4500,
    rating: 4.8,
    reviews: 24,
    status: "Active",
    verified: true,
    image: "/images/pag1 (1).jpg",
    views: 1284,
    bookings: 12,
    revenue: 84500,
    availability: "Available",
    updated: "Updated 2 days ago",
  },
  {
    id: "ganga-riverside",
    name: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    type: "Private stay",
    guests: 4,
    price: 3800,
    rating: 4.7,
    reviews: 89,
    status: "Active",
    verified: true,
    image: "/images/pag1 (2).jpg",
    views: 976,
    bookings: 9,
    revenue: 61200,
    availability: "Available",
    updated: "Updated 5 days ago",
  },
  {
    id: "quiet-house",
    name: "The Quiet House",
    location: "Bodh Gaya, Bihar",
    type: "Entire home",
    guests: 5,
    price: 3200,
    rating: 4.9,
    reviews: 31,
    status: "Draft",
    verified: false,
    image: "/images/pag1 (3).jpg",
    views: 0,
    bookings: 0,
    revenue: 0,
    availability: "Not published",
    updated: "Updated 1 week ago",
  },
  {
    id: "river-view-villa",
    name: "River View Villa",
    location: "Rajgir, Bihar",
    type: "Entire villa",
    guests: 8,
    price: 5600,
    rating: 4.6,
    reviews: 18,
    status: "Pending",
    verified: false,
    image: "/images/pag1 (4).jpg",
    views: 342,
    bookings: 0,
    revenue: 0,
    availability: "Verification pending",
    updated: "Updated yesterday",
  },
];

export default function PropertyPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "All" | "Active" | "Draft" | "Pending"
  >("All");

  const [sort, setSort] = useState("recent");

  const filteredProperties = useMemo(() => {
    let result = properties.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(search.toLowerCase()) ||
        property.location.toLowerCase().includes(search.toLowerCase());

      const matchesFilter =
        filter === "All" || property.status === filter;

      return matchesSearch && matchesFilter;
    });

    if (sort === "price-low") {
      result = [...result].sort((a, b) => a.price - b.price);
    }

    if (sort === "price-high") {
      result = [...result].sort((a, b) => b.price - a.price);
    }

    if (sort === "rating") {
      result = [...result].sort((a, b) => b.rating - a.rating);
    }

    if (sort === "bookings") {
      result = [...result].sort((a, b) => b.bookings - a.bookings);
    }

    return result;
  }, [search, filter, sort]);

  const activeCount = properties.filter(
    (property) => property.status === "Active"
  ).length;

  const draftCount = properties.filter(
    (property) => property.status === "Draft"
  ).length;

  const pendingCount = properties.filter(
    (property) => property.status === "Pending"
  ).length;

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">
          <Link
            href="/host"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Host dashboard
          </Link>

          <div className="mt-7 flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                HOST PROPERTY
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight md:text-5xl">
                Your properties
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
                Manage your listings, monitor their performance and keep
                everything ready for your guests.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="inline-flex w-fit items-center rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              + Add property
            </Link>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        {/* OVERVIEW */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <OverviewCard
            label="Total properties"
            value={properties.length.toString().padStart(2, "0")}
            detail="Across your listings"
          />

          <OverviewCard
            label="Active"
            value={activeCount.toString().padStart(2, "0")}
            detail="Currently published"
          />

          <OverviewCard
            label="Draft"
            value={draftCount.toString().padStart(2, "0")}
            detail="Need your attention"
          />

          <OverviewCard
            label="Pending"
            value={pendingCount.toString().padStart(2, "0")}
            detail="Under verification"
          />
        </div>

        {/* SEARCH + FILTER */}
        <div className="mt-8 rounded-[26px] border border-[#03045E]/10 bg-white p-4 shadow-[0_12px_40px_rgba(3,4,94,0.04)]">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            {/* SEARCH */}
            <div className="relative w-full lg:max-w-md">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#64748B]">
                ⌕
              </span>

              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search your properties..."
                className="w-full rounded-xl border border-[#03045E]/10 bg-white py-3 pl-11 pr-4 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1]"
              />
            </div>

            {/* SORT */}
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-xl border border-[#03045E]/10 bg-white px-4 py-3 text-sm text-[#03045E] outline-none focus:border-[#0D21A1]"
            >
              <option value="recent">Recently updated</option>
              <option value="rating">Highest rated</option>
              <option value="bookings">Most bookings</option>
              <option value="price-low">Lowest price</option>
              <option value="price-high">Highest price</option>
            </select>
          </div>

          {/* FILTERS */}
          <div className="mt-4 flex flex-wrap gap-2 border-t border-[#03045E]/10 pt-4">
            <FilterButton
              active={filter === "All"}
              onClick={() => setFilter("All")}
            >
              All · {properties.length}
            </FilterButton>

            <FilterButton
              active={filter === "Active"}
              onClick={() => setFilter("Active")}
            >
              Active · {activeCount}
            </FilterButton>

            <FilterButton
              active={filter === "Draft"}
              onClick={() => setFilter("Draft")}
            >
              Draft · {draftCount}
            </FilterButton>

            <FilterButton
              active={filter === "Pending"}
              onClick={() => setFilter("Pending")}
            >
              Pending · {pendingCount}
            </FilterButton>
          </div>
        </div>

        {/* RESULTS HEADER */}
        <div className="mt-8 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              YOUR LISTINGS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Property portfolio
            </h2>
          </div>

          <p className="text-sm text-[#64748B]">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1
              ? "property"
              : "properties"}
          </p>
        </div>

        {/* PROPERTY LIST */}
        <div className="mt-6 space-y-5">
          {filteredProperties.map((property, index) => (
            <PropertyCard
              key={property.id}
              property={property}
              priority={index === 0}
            />
          ))}
        </div>

        {/* EMPTY STATE */}
        {filteredProperties.length === 0 && (
          <div className="mt-6 rounded-[28px] border border-dashed border-[#03045E]/20 bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#EEF2FF] text-2xl">
              ⌕
            </div>

            <h3 className="mt-5 font-serif text-2xl font-semibold">
              No properties found
            </h3>

            <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
              Try changing your search or filter to find another
              property.
            </p>
          </div>
        )}

        {/* BOTTOM CTA */}
        <div className="mt-10 overflow-hidden rounded-[30px] bg-[#03045E] p-8 text-white md:p-10">
          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                GROW WITH VISTARA
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                Have another place to share?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/65">
                Add another property and give travellers a place
                worth remembering.
              </p>
            </div>

            <Link
              href="/host/property/new"
              className="w-fit rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F1F5FF]"
            >
              Add a property
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* -------------------------------- */
/* OVERVIEW CARD */
/* -------------------------------- */

function OverviewCard({
  label,
  value,
  detail,
}: {
  label: string;
  value: string;
  detail: string;
}) {
  return (
    <div className="rounded-[24px] border border-[#03045E]/10 bg-white p-6 shadow-[0_10px_35px_rgba(3,4,94,0.04)]">
      <p className="text-sm font-medium text-[#64748B]">
        {label}
      </p>

      <p className="mt-3 font-serif text-3xl font-semibold">
        {value}
      </p>

      <p className="mt-2 text-xs text-[#94A3B8]">
        {detail}
      </p>
    </div>
  );
}

/* -------------------------------- */
/* FILTER BUTTON */
/* -------------------------------- */

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2.5 text-xs font-semibold transition ${
        active
          ? "bg-[#03045E] text-white"
          : "border border-[#03045E]/10 bg-white text-[#64748B] hover:border-[#03045E]/30 hover:text-[#03045E]"
      }`}
    >
      {children}
    </button>
  );
}

/* -------------------------------- */
/* PROPERTY CARD */
/* -------------------------------- */

function PropertyCard({
  property,
  priority,
}: {
  property: Property;
  priority: boolean;
}) {
  return (
    <article className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.04)] transition hover:shadow-[0_18px_50px_rgba(3,4,94,0.08)]">

      <div className="grid md:grid-cols-[270px_1fr]">

        {/* IMAGE */}
        <div className="relative h-60 md:h-full md:min-h-[300px]">
          <Image
            src={property.image}
            alt={property.name}
            fill
            priority={priority}
            sizes="(max-width: 767px) 100vw, 270px"
            className="object-cover"
          />

          <StatusBadge status={property.status} />

          {property.verified && (
            <span className="absolute bottom-4 left-4 rounded-full bg-white px-3 py-1.5 text-[11px] font-bold text-[#03045E] shadow-sm">
              ✓ Verified
            </span>
          )}
        </div>

        {/* DETAILS */}
        <div className="p-6 md:p-7">

          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0D21A1]">
                {property.type}
              </p>

              <h2 className="mt-2 font-serif text-2xl font-semibold">
                {property.name}
              </h2>

              <p className="mt-2 text-sm text-[#64748B]">
                {property.location}
              </p>

              <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748B]">
                <span>{property.guests} guests</span>

                <span>
                  ★ {property.rating}
                </span>

                <span>
                  {property.reviews} reviews
                </span>
              </div>
            </div>

            {/* PRICE */}
            <div className="lg:text-right">
              <p className="text-xs text-[#94A3B8]">
                Starting from
              </p>

              <p className="mt-1 text-xl font-semibold">
                ₹{property.price.toLocaleString("en-IN")}

                <span className="ml-1 text-xs font-normal text-[#64748B]">
                  / night
                </span>
              </p>
            </div>
          </div>

          {/* PERFORMANCE */}
          <div className="mt-6 grid grid-cols-2 gap-3 border-y border-[#03045E]/10 py-5 sm:grid-cols-4">
            <MiniStat
              label="Views"
              value={property.views.toLocaleString("en-IN")}
            />

            <MiniStat
              label="Bookings"
              value={property.bookings.toString()}
            />

            <MiniStat
              label="Revenue"
              value={
                property.revenue > 0
                  ? `₹${property.revenue.toLocaleString("en-IN")}`
                  : "—"
              }
            />

            <MiniStat
              label="Availability"
              value={property.availability}
            />
          </div>

          {/* FOOTER */}
          <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-[#94A3B8]">
              {property.updated}
            </p>

            <div className="flex flex-wrap gap-2">

              <Link
                href={`/host/property/${property.id}`}
                className="rounded-xl bg-[#03045E] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Manage
              </Link>

              <Link
                href={`/host/property/${property.id}/edit`}
                className="rounded-xl border border-[#03045E]/15 px-5 py-2.5 text-xs font-semibold text-[#03045E] transition hover:bg-[#F4F6FF]"
              >
                Edit
              </Link>

              <Link
                href={`/property/${property.id}`}
                className="rounded-xl border border-[#03045E]/15 px-5 py-2.5 text-xs font-semibold text-[#64748B] transition hover:border-[#03045E]/30 hover:text-[#03045E]"
              >
                Preview
              </Link>

            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

/* -------------------------------- */
/* STATUS BADGE */
/* -------------------------------- */

function StatusBadge({
  status,
}: {
  status: PropertyStatus;
}) {
  const styles = {
    Active: "bg-white text-[#166534]",
    Draft: "bg-white text-[#92400E]",
    Pending: "bg-white text-[#1D4ED8]",
  };

  return (
    <span
      className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-[11px] font-bold shadow-sm ${styles[status]}`}
    >
      {status}
    </span>
  );
}

/* -------------------------------- */
/* MINI STAT */
/* -------------------------------- */

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div>
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#94A3B8]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-[#03045E]">
        {value}
      </p>
    </div>
  );
}