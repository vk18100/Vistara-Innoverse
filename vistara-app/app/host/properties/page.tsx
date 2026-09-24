"use client";

import Image from "next/image";
import Link from "next/link";
import Navbar from "@/components/navbar";
import { useEffect, useMemo, useState } from "react";

type PropertyStatus =
  | "ACTIVE"
  | "DRAFT"
  | "PENDING"
  | "REJECTED"
  | "INACTIVE";

type Property = {
  id: string;
  name: string;
  location: string;
  type: string;
  guests: number;
  price: number;
  rating?: number | null;
  reviews?: number | null;
  status: PropertyStatus;
  image?: string | null;
  updatedAt?: string;
};

type Filter = "ALL" | PropertyStatus;

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function getStatusStyle(status: PropertyStatus) {
  switch (status) {
    case "ACTIVE":
      return "bg-emerald-50 text-emerald-700";

    case "DRAFT":
      return "bg-amber-50 text-amber-700";

    case "PENDING":
      return "bg-blue-50 text-blue-700";

    case "REJECTED":
      return "bg-red-50 text-red-700";

    default:
      return "bg-slate-100 text-slate-600";
  }
}

function getStatusLabel(status: PropertyStatus) {
  switch (status) {
    case "ACTIVE":
      return "Active";

    case "DRAFT":
      return "Draft";

    case "PENDING":
      return "Pending";

    case "REJECTED":
      return "Rejected";

    default:
      return "Inactive";
  }
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  const [filter, setFilter] = useState<Filter>("ALL");

  const [search, setSearch] = useState("");

  const [sort, setSort] = useState("updated");

  const [actionId, setActionId] = useState<string | null>(null);

  const [menuId, setMenuId] = useState<string | null>(null);

  async function loadProperties() {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/host/properties", {
        method: "GET",
        credentials: "include",
        cache: "no-store",
      });

      if (!response.ok) {
        throw new Error("Unable to load your properties.");
      }

      const result = await response.json();

      const items = Array.isArray(result)
        ? result
        : result.properties ?? result.data ?? [];

      setProperties(items);
    } catch (err) {
      console.error("Properties loading error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load properties."
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProperties();
  }, []);

  const filteredProperties = useMemo(() => {
    let result = [...properties];

    if (filter !== "ALL") {
      result = result.filter(
        (property) => property.status === filter
      );
    }

    const query = search.trim().toLowerCase();

    if (query) {
      result = result.filter((property) =>
        [
          property.name,
          property.location,
          property.type,
          property.status,
        ]
          .filter(Boolean)
          .some((value) =>
            String(value).toLowerCase().includes(query)
          )
      );
    }

    if (sort === "rating") {
      result.sort(
        (a, b) => (b.rating ?? 0) - (a.rating ?? 0)
      );
    }

    if (sort === "low-price") {
      result.sort((a, b) => a.price - b.price);
    }

    if (sort === "high-price") {
      result.sort((a, b) => b.price - a.price);
    }

    if (sort === "updated") {
      result.sort(
        (a, b) =>
          new Date(b.updatedAt ?? 0).getTime() -
          new Date(a.updatedAt ?? 0).getTime()
      );
    }

    return result;
  }, [properties, filter, search, sort]);

  const counts = useMemo(() => {
    return {
      ALL: properties.length,

      ACTIVE: properties.filter(
        (property) => property.status === "ACTIVE"
      ).length,

      DRAFT: properties.filter(
        (property) => property.status === "DRAFT"
      ).length,

      PENDING: properties.filter(
        (property) => property.status === "PENDING"
      ).length,

      REJECTED: properties.filter(
        (property) => property.status === "REJECTED"
      ).length,
    };
  }, [properties]);

  async function toggleProperty(property: Property) {
    try {
      setActionId(property.id);
      setMenuId(null);

      const nextStatus =
        property.status === "ACTIVE"
          ? "INACTIVE"
          : "ACTIVE";

      const response = await fetch(
        `/api/host/properties/${property.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Unable to update property status.");
      }

      const result = await response.json();

      const updated = result.property ?? result.data ?? result;

      setProperties((current) =>
        current.map((item) =>
          item.id === property.id
            ? {
                ...item,
                ...updated,
                status: updated.status ?? nextStatus,
              }
            : item
        )
      );
    } catch (err) {
      console.error(err);

      alert(
        err instanceof Error
          ? err.message
          : "Unable to update property."
      );
    } finally {
      setActionId(null);
    }
  }

  async function deleteProperty(property: Property) {
    const confirmed = window.confirm(
      `Delete "${property.name}"? This action cannot be undone.`
    );

    if (!confirmed) {
      return;
    }

    try {
      setActionId(property.id);
      setMenuId(null);

      const response = await fetch(
        `/api/host/properties/${property.id}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Unable to delete property.");
      }

      setProperties((current) =>
        current.filter(
          (item) => item.id !== property.id
        )
      );
    } catch (err) {
      console.error(err);

      alert(
        err instanceof Error
          ? err.message
          : "Unable to delete property."
      );
    } finally {
      setActionId(null);
    }
  }

  if (loading) {
    return <PropertiesSkeleton />;
  }

  return (
    <main
      className="min-h-screen bg-[#FAFAF8] text-[#03045E]"
      onClick={() => setMenuId(null)}
    >
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <Link
                href="/host"
                className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
              >
                ← Host dashboard
              </Link>

              <p className="mt-7 text-xs font-bold uppercase tracking-[0.25em] text-[#0D21A1]">
                YOUR LISTINGS
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
                Your properties
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
                Manage your stays, update your listings and keep
                your property information up to date.
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

        {/* ERROR */}
        {error && (
          <div className="mb-6 flex flex-col gap-4 rounded-2xl border border-red-100 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <p className="text-sm font-semibold text-red-800">
                Could not load properties
              </p>

              <p className="mt-1 text-xs text-red-700">
                {error}
              </p>
            </div>

            <button
              onClick={loadProperties}
              className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-red-700 shadow-sm"
            >
              Try again
            </button>

          </div>
        )}

        {/* SEARCH + FILTER */}
        <div className="rounded-2xl border border-[#03045E]/10 bg-white p-4 shadow-sm">

          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

            <div className="flex flex-wrap gap-2">

              <FilterButton
                active={filter === "ALL"}
                label={`All · ${counts.ALL}`}
                onClick={() => setFilter("ALL")}
              />

              <FilterButton
                active={filter === "ACTIVE"}
                label={`Active · ${counts.ACTIVE}`}
                onClick={() => setFilter("ACTIVE")}
              />

              <FilterButton
                active={filter === "DRAFT"}
                label={`Draft · ${counts.DRAFT}`}
                onClick={() => setFilter("DRAFT")}
              />

              {counts.PENDING > 0 && (
                <FilterButton
                  active={filter === "PENDING"}
                  label={`Pending · ${counts.PENDING}`}
                  onClick={() => setFilter("PENDING")}
                />
              )}

              {counts.REJECTED > 0 && (
                <FilterButton
                  active={filter === "REJECTED"}
                  label={`Rejected · ${counts.REJECTED}`}
                  onClick={() => setFilter("REJECTED")}
                />
              )}

            </div>

            <div className="flex flex-col gap-3 sm:flex-row">

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search properties..."
                className="w-full rounded-xl border border-[#03045E]/10 bg-white px-4 py-2.5 text-sm outline-none placeholder:text-[#94A3B8] focus:border-[#0D21A1] sm:w-64"
              />

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="rounded-xl border border-[#03045E]/10 bg-white px-4 py-2.5 text-sm text-[#64748B] outline-none focus:border-[#03045E]"
              >
                <option value="updated">
                  Recently updated
                </option>

                <option value="rating">
                  Highest rated
                </option>

                <option value="low-price">
                  Lowest price
                </option>

                <option value="high-price">
                  Highest price
                </option>
              </select>

            </div>

          </div>

        </div>

        {/* RESULT COUNT */}
        <div className="mt-7 flex items-center justify-between">

          <p className="text-sm text-[#64748B]">
            {filteredProperties.length}{" "}
            {filteredProperties.length === 1
              ? "property"
              : "properties"}
          </p>

          {(search || filter !== "ALL") && (
            <button
              onClick={() => {
                setSearch("");
                setFilter("ALL");
              }}
              className="text-xs font-semibold text-[#0D21A1] hover:underline"
            >
              Clear filters
            </button>
          )}

        </div>

        {/* EMPTY */}
        {filteredProperties.length === 0 ? (
          <EmptyProperties
            hasProperties={properties.length > 0}
            search={search}
            onClear={() => {
              setSearch("");
              setFilter("ALL");
            }}
          />
        ) : (
          /* PROPERTY CARDS */
          <div className="mt-4 space-y-5">

            {filteredProperties.map((property, index) => {

              const status = getStatusLabel(
                property.status
              );

              const isWorking =
                actionId === property.id;

              return (
                <article
                  key={property.id}
                  className="overflow-visible rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.04)]"
                >

                  <div className="grid md:grid-cols-[260px_1fr]">

                    {/* IMAGE */}
                    <div className="relative h-60 overflow-hidden rounded-t-[28px] bg-[#EEF2FF] md:h-full md:rounded-l-[28px] md:rounded-tr-none">

                      {property.image ? (
                        <Image
                          src={property.image}
                          alt={property.name}
                          fill
                          priority={index === 0}
                          sizes="(max-width: 767px) 100vw, 260px"
                          className="object-cover transition duration-500 hover:scale-105"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center text-sm text-[#64748B]">
                          No image
                        </div>
                      )}

                      <span
                        className={`absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                          property.status
                        )}`}
                      >
                        {status}
                      </span>

                    </div>

                    {/* DETAILS */}
                    <div className="p-6 md:p-7">

                      <div className="flex flex-col gap-5 lg:flex-row lg:justify-between">

                        <div>

                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#0D21A1]">
                            {property.type}
                          </p>

                          <h2 className="mt-2 font-serif text-2xl font-semibold">
                            {property.name}
                          </h2>

                          <p className="mt-2 text-sm text-[#64748B]">
                            {property.location}
                          </p>

                          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[#64748B]">

                            <span>
                              {property.guests}{" "}
                              {property.guests === 1
                                ? "guest"
                                : "guests"}
                            </span>

                            {property.rating != null && (
                              <span>
                                ★{" "}
                                {property.rating.toFixed(1)}
                              </span>
                            )}

                            {property.reviews != null && (
                              <span>
                                {property.reviews}{" "}
                                {property.reviews === 1
                                  ? "review"
                                  : "reviews"}
                              </span>
                            )}

                          </div>

                        </div>

                        <div className="lg:text-right">

                          <p className="text-xs text-[#94A3B8]">
                            Starting from
                          </p>

                          <p className="mt-1 text-xl font-semibold">
                            {formatCurrency(property.price)}

                            <span className="ml-1 text-xs font-normal text-[#64748B]">
                              / night
                            </span>
                          </p>

                        </div>

                      </div>

                      {/* ACTIONS */}
                      <div className="relative mt-7 flex flex-col gap-3 border-t border-[#03045E]/10 pt-5 sm:flex-row sm:items-center sm:justify-between">

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

                        {/* MORE MENU */}
                        <div
                          className="relative"
                          onClick={(event) =>
                            event.stopPropagation()
                          }
                        >

                          <button
                            onClick={() =>
                              setMenuId(
                                menuId === property.id
                                  ? null
                                  : property.id
                              )
                            }
                            className="rounded-xl px-3 py-2 text-xs font-medium text-[#64748B] transition hover:bg-[#F7F3EA] hover:text-[#03045E]"
                          >
                            More options
                          </button>

                          {menuId === property.id && (
                            <div className="absolute right-0 z-20 mt-2 w-48 overflow-hidden rounded-2xl border border-[#03045E]/10 bg-white p-1.5 shadow-[0_18px_50px_rgba(3,4,94,0.14)]">

                              {property.status === "ACTIVE" && (
                                <button
                                  disabled={isWorking}
                                  onClick={() =>
                                    toggleProperty(property)
                                  }
                                  className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-medium hover:bg-[#F7F3EA] disabled:opacity-50"
                                >
                                  {isWorking
                                    ? "Updating..."
                                    : "Unpublish listing"}
                                </button>
                              )}

                              {property.status !== "ACTIVE" &&
                                property.status !== "REJECTED" && (
                                  <button
                                    disabled={isWorking}
                                    onClick={() =>
                                      toggleProperty(property)
                                    }
                                    className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-medium hover:bg-[#F7F3EA] disabled:opacity-50"
                                  >
                                    {isWorking
                                      ? "Updating..."
                                      : "Publish listing"}
                                  </button>
                                )}

                              <Link
                                href={`/host/property/${property.id}/edit`}
                                className="block rounded-xl px-3 py-2.5 text-xs font-medium hover:bg-[#F7F3EA]"
                              >
                                Edit property
                              </Link>

                              <button
                                disabled={isWorking}
                                onClick={() =>
                                  deleteProperty(property)
                                }
                                className="w-full rounded-xl px-3 py-2.5 text-left text-xs font-medium text-red-600 hover:bg-red-50 disabled:opacity-50"
                              >
                                Delete property
                              </button>

                            </div>
                          )}

                        </div>

                      </div>

                    </div>
                  </div>
                </article>
              );
            })}

          </div>
        )}

        {/* ADD PROPERTY CTA */}
        <div className="mt-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#071A75] to-[#0D21A1] p-8 text-white md:p-10">

          <div className="flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/60">
                GROW WITH VISTARA
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold">
                Have another place to share?
              </h2>

              <p className="mt-3 max-w-xl text-sm leading-6 text-white/70">
                Add another property and introduce travellers
                to a place worth remembering.
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

/* ------------------------------------------------ */
/* FILTER BUTTON */
/* ------------------------------------------------ */

function FilterButton({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full px-5 py-2 text-xs font-semibold transition ${
        active
          ? "bg-[#03045E] text-white"
          : "border border-[#03045E]/10 text-[#64748B] hover:border-[#03045E] hover:text-[#03045E]"
      }`}
    >
      {label}
    </button>
  );
}

/* ------------------------------------------------ */
/* EMPTY STATE */
/* ------------------------------------------------ */

function EmptyProperties({
  hasProperties,
  search,
  onClear,
}: {
  hasProperties: boolean;
  search: string;
  onClear: () => void;
}) {
  return (
    <div className="mt-6 rounded-[28px] border border-[#03045E]/10 bg-white p-10 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#EEF2FF] text-xl text-[#03045E]">
        {hasProperties ? "⌕" : "+"}
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold">
        {hasProperties
          ? "No properties found"
          : "Add your first property"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#64748B]">
        {hasProperties
          ? `Nothing matches ${
              search
                ? `"${search}"`
                : "the selected filter"
            }.`
          : "Create your first Vistara listing and start receiving bookings."}
      </p>

      {hasProperties ? (
        <button
          onClick={onClear}
          className="mt-5 rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]"
        >
          Clear filters
        </button>
      ) : (
        <Link
          href="/host/property/new"
          className="mt-5 inline-flex rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]"
        >
          Add property
        </Link>
      )}

    </div>
  );
}

/* ------------------------------------------------ */
/* LOADING */
/* ------------------------------------------------ */

function PropertiesSkeleton() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">

      <Navbar />

      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

          <div className="h-4 w-28 animate-pulse rounded bg-slate-200" />

          <div className="mt-7 h-12 w-80 animate-pulse rounded bg-slate-200" />

          <div className="mt-4 h-4 w-[500px] max-w-full animate-pulse rounded bg-slate-100" />

        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10">

        <div className="h-20 animate-pulse rounded-2xl bg-white" />

        <div className="mt-7 space-y-5">

          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-64 animate-pulse rounded-[28px] bg-white"
            />
          ))}

        </div>

      </section>
    </main>
  );
}