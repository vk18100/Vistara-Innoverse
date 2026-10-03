"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Edit3,
  Eye,
  Home,
  MapPin,
  MoreHorizontal,
  Plus,
  Search,
  ShieldCheck,
  Star,
  Trash2,
  XCircle,
} from "lucide-react";

import Navbar from "@/components/navbar";

type PropertyStatus =
  | "PUBLISHED"
  | "PENDING"
  | "DRAFT"
  | "REJECTED";

type Property = {
  id: string | number;
  name: string;
  location: string;
  type?: string;
  image?: string;
  price?: number;
  rating?: number;
  reviews?: number;
  status?: PropertyStatus | string;
  verified?: boolean;
  bookings?: number;
};

type PropertiesResponse = {
  success?: boolean;
  data?: Property[];
  message?: string;
};

/* =========================================================
   STATUS
========================================================= */

function normalizeStatus(status?: string): PropertyStatus {
  const value = String(status || "").toUpperCase();

  if (value === "PUBLISHED") return "PUBLISHED";
  if (value === "PENDING") return "PENDING";
  if (value === "REJECTED") return "REJECTED";

  return "DRAFT";
}

/* =========================================================
   ROUTES
========================================================= */

function getAddRoute() {
  return "/host/property/new";
}

function getEditRoute(id: string | number) {
  return `/host/property/new/${encodeURIComponent(String(id))}/edit`;
}

function getViewRoute(id: string | number) {
  return `/properties/${encodeURIComponent(String(id))}`;
}

function getVerificationRoute(id: string | number) {
  return `/host/verification?propertyId=${encodeURIComponent(
    String(id),
  )}`;
}

/* =========================================================
   MONEY
========================================================= */

function formatMoney(value?: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Number(value || 0));
}

/* =========================================================
   PAGE
========================================================= */

export default function HostPropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState<
    "ALL" | PropertyStatus
  >("ALL");

  const [openMenu, setOpenMenu] = useState<
    string | number | null
  >(null);

  /* =========================================================
     LOAD EXISTING PROPERTIES
  ========================================================= */

  useEffect(() => {
    let cancelled = false;

    async function loadProperties() {
      try {
        const response = await fetch("/api/host/properties", {
          method: "GET",
          cache: "no-store",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        });

        const raw = await response.text();

        let result: PropertiesResponse = {};

        try {
          result = raw ? JSON.parse(raw) : {};
        } catch {
          throw new Error(
            "Properties API returned invalid data.",
          );
        }

        if (!response.ok || result.success === false) {
          throw new Error(
            result.message ||
              "Unable to load properties.",
          );
        }

        if (cancelled) return;

        setProperties(
          Array.isArray(result.data)
            ? result.data
            : [],
        );
      } catch (error) {
        console.error(
          "HOST_PROPERTIES_ERROR:",
          error,
        );

        if (!cancelled) {
          setProperties([]);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    loadProperties();

    return () => {
      cancelled = true;
    };
  }, []);

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const filteredProperties = useMemo(() => {
    const query = search.trim().toLowerCase();

    return properties.filter((property) => {
      const searchableValues = [
        property.name,
        property.location,
        property.type,
      ]
        .filter(Boolean)
        .map((value) =>
          String(value).toLowerCase(),
        );

      const matchesSearch =
        !query ||
        searchableValues.some((value) =>
          value.includes(query),
        );

      const matchesFilter =
        filter === "ALL" ||
        normalizeStatus(property.status) === filter;

      return matchesSearch && matchesFilter;
    });
  }, [properties, search, filter]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const counts = useMemo(() => {
    return {
      all: properties.length,

      published: properties.filter(
        (property) =>
          normalizeStatus(property.status) ===
          "PUBLISHED",
      ).length,

      pending: properties.filter(
        (property) =>
          normalizeStatus(property.status) ===
          "PENDING",
      ).length,

      drafts: properties.filter(
        (property) =>
          normalizeStatus(property.status) ===
          "DRAFT",
      ).length,
    };
  }, [properties]);

  /* =========================================================
     DELETE
  ========================================================= */

  async function deleteProperty(
    id: string | number,
  ) {
    const confirmed = window.confirm(
      "Delete this property?\n\nThis action cannot be undone.",
    );

    if (!confirmed) return;

    try {
      const response = await fetch(
        `/api/host/properties/${encodeURIComponent(
          String(id),
        )}`,
        {
          method: "DELETE",
          credentials: "include",
          headers: {
            Accept: "application/json",
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          "Unable to delete property.",
        );
      }

      setProperties((current) =>
        current.filter(
          (property) => property.id !== id,
        ),
      );
    } catch (error) {
      console.error(
        "DELETE_PROPERTY_ERROR:",
        error,
      );

      window.alert(
        "Unable to delete this property right now.",
      );
    } finally {
      setOpenMenu(null);
    }
  }

  /* =========================================================
     PAGE
  ========================================================= */

  return (
    <main
      className="min-h-screen bg-[#FAF8F3] text-[#18181B]"
      onClick={() => setOpenMenu(null)}
    >
      <Navbar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-black/[0.07] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10 lg:py-11">
          <div className="flex flex-col gap-7 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D9A441]/25 bg-[#FFF8E8] px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#8A651B]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                Host workspace
              </div>

              <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Your properties
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-[#71717A] sm:text-base">
                Manage your stays, verification,
                visibility and listing details from
                one place.
              </p>
            </div>

            <Link
              href={getAddRoute()}
              onClick={(event) =>
                event.stopPropagation()
              }
              className="inline-flex w-fit items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] shadow-[0_10px_28px_rgba(217,164,65,0.20)] transition hover:bg-[#E7C46D] active:scale-[0.98]"
            >
              <Plus size={18} />
              Add property
              <span>→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-7 sm:px-8 lg:px-10 lg:py-10">

        {/* =================================================
            STATS
        ================================================= */}

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

          <PropertyStat
            label="All properties"
            value={counts.all}
            icon={<Home size={19} />}
            active={filter === "ALL"}
            onClick={() => setFilter("ALL")}
          />

          <PropertyStat
            label="Published"
            value={counts.published}
            icon={<CheckCircle2 size={19} />}
            active={filter === "PUBLISHED"}
            onClick={() =>
              setFilter("PUBLISHED")
            }
          />

          <PropertyStat
            label="Verification pending"
            value={counts.pending}
            icon={<ShieldCheck size={19} />}
            active={filter === "PENDING"}
            onClick={() =>
              setFilter("PENDING")
            }
          />

          <PropertyStat
            label="Drafts"
            value={counts.drafts}
            icon={<Edit3 size={19} />}
            active={filter === "DRAFT"}
            onClick={() =>
              setFilter("DRAFT")
            }
          />

        </div>

        {/* =================================================
            SEARCH + FILTER
        ================================================= */}

        <div className="mt-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">

          <label className="relative block w-full lg:max-w-md">

            <Search
              size={17}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#A8A29E]"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search properties, locations or types"
              className="h-12 w-full rounded-xl border border-black/[0.08] bg-white pl-10 pr-4 text-sm outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
            />

            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-bold text-[#A8A29E] hover:text-[#18181B]"
              >
                Clear
              </button>
            )}

          </label>

          <div className="flex flex-wrap gap-2">
            {(
              [
                ["ALL", "All"],
                ["PUBLISHED", "Published"],
                ["PENDING", "Pending"],
                ["DRAFT", "Drafts"],
              ] as const
            ).map(([value, label]) => (
              <button
                key={value}
                type="button"
                onClick={() =>
                  setFilter(value)
                }
                className={`rounded-xl px-4 py-2.5 text-xs font-bold transition ${
                  filter === value
                    ? "bg-[#18181B] text-white shadow-sm"
                    : "border border-black/[0.08] bg-white text-[#57534E] hover:border-[#D9A441]/40 hover:bg-[#FFF8E8]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

        </div>

        {/* =================================================
            PROPERTY LIST
        ================================================= */}

        <div className="mt-7">

          {loading ? (
            <PropertiesSkeleton />
          ) : filteredProperties.length === 0 ? (
            <EmptyProperties
              search={search}
              onClear={() => setSearch("")}
            />
          ) : (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

              {filteredProperties.map(
                (property) => (
                  <PropertyCard
                    key={property.id}
                    property={property}
                    menuOpen={
                      openMenu === property.id
                    }
                    onMenu={() =>
                      setOpenMenu(
                        openMenu === property.id
                          ? null
                          : property.id,
                      )
                    }
                    onDelete={() =>
                      deleteProperty(
                        property.id,
                      )
                    }
                  />
                ),
              )}

            </div>
          )}

        </div>
      </section>
    </main>
  );
}

/* =========================================================
   STAT CARD
========================================================= */

function PropertyStat({
  label,
  value,
  icon,
  active,
  onClick,
}: {
  label: string;
  value: number;
  icon: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`rounded-[24px] border p-5 text-left transition hover:-translate-y-0.5 ${
        active
          ? "border-[#D9A441]/35 bg-[#FFFDF8] shadow-[0_12px_38px_rgba(217,164,65,0.10)]"
          : "border-black/[0.08] bg-white hover:border-[#D9A441]/25"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FFF8E8] text-[#9A711E]">
          {icon}
        </div>

        {active && (
          <span className="h-2 w-2 rounded-full bg-[#D9A441]" />
        )}
      </div>

      <p className="mt-5 text-xs font-semibold text-[#71717A]">
        {label}
      </p>

      <p className="mt-1 font-serif text-3xl font-semibold">
        {value}
      </p>
    </button>
  );
}

/* =========================================================
   PROPERTY CARD
========================================================= */

function PropertyCard({
  property,
  menuOpen,
  onMenu,
  onDelete,
}: {
  property: Property;
  menuOpen: boolean;
  onMenu: () => void;
  onDelete: () => void;
}) {
  const status = normalizeStatus(
    property.status,
  );

  const editRoute = getEditRoute(
    property.id,
  );

  const viewRoute = getViewRoute(
    property.id,
  );

  const verificationRoute =
    getVerificationRoute(property.id);

  return (
    <article className="group overflow-visible rounded-[26px] border border-black/[0.08] bg-white shadow-[0_12px_42px_rgba(24,24,27,0.045)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(24,24,27,0.09)]">

      {/* IMAGE */}

      <div className="relative aspect-[16/10] overflow-hidden rounded-t-[26px] bg-[#F1F0EB]">

        <PropertyImage
          src={property.image}
          alt={property.name}
        />

        <div className="absolute inset-x-0 top-0 z-10 flex items-start justify-between p-4">

          <StatusBadge status={status} />

          <div
            className="relative"
            onClick={(event) =>
              event.stopPropagation()
            }
          >
            <button
              type="button"
              onClick={onMenu}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/70 bg-white/90 text-[#292524] shadow-sm backdrop-blur transition hover:bg-white"
              aria-label="Property actions"
            >
              <MoreHorizontal size={18} />
            </button>

            {menuOpen && (
              <div className="absolute right-0 top-11 z-50 w-52 overflow-hidden rounded-2xl border border-black/[0.08] bg-white p-1.5 shadow-[0_18px_50px_rgba(24,24,27,0.15)]">

                <Link
                  href={editRoute}
                  onClick={onMenu}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#44403C] hover:bg-[#FAF8F3]"
                >
                  <Edit3 size={14} />
                  Edit property
                </Link>

                <Link
                  href={viewRoute}
                  onClick={onMenu}
                  className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#44403C] hover:bg-[#FAF8F3]"
                >
                  <Eye size={14} />
                  View listing
                </Link>

                {status !== "PUBLISHED" && (
                  <Link
                    href={verificationRoute}
                    onClick={onMenu}
                    className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-xs font-semibold text-[#8A651B] hover:bg-[#FFF8E8]"
                  >
                    <ShieldCheck size={14} />
                    Verification
                  </Link>
                )}

                <div className="my-1 border-t border-black/[0.06]" />

                <button
                  type="button"
                  onClick={onDelete}
                  className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-semibold text-[#9B4439] hover:bg-[#FFF1EF]"
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>
            )}
          </div>
        </div>

        {property.verified && (
          <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#4E693E] shadow-sm">
            <ShieldCheck size={13} />
            Verified
          </div>
        )}

      </div>

      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-[#9A711E]">
              {property.type || "Stay"}
            </p>

            <h2
              title={property.name}
              className="mt-1 truncate font-serif text-xl font-semibold"
            >
              {property.name}
            </h2>

            <p
              title={property.location}
              className="mt-2 flex items-center gap-1.5 truncate text-xs text-[#78716C]"
            >
              <MapPin
                size={13}
                className="shrink-0 text-[#9A711E]"
              />

              {property.location}
            </p>

          </div>

          {typeof property.rating ===
            "number" && (
            <div className="flex shrink-0 items-center gap-1 rounded-lg bg-[#FAF8F3] px-2 py-1.5 text-xs font-bold">
              <Star
                size={13}
                fill="#D9A441"
                className="text-[#D9A441]"
              />
              {property.rating.toFixed(1)}
            </div>
          )}

        </div>

        <div className="mt-5 flex items-end justify-between border-t border-black/[0.06] pt-4">

          <div>
            <span className="font-serif text-lg font-semibold">
              {formatMoney(property.price)}
            </span>

            <span className="ml-1 text-[11px] text-[#A8A29E]">
              / night
            </span>
          </div>

          <span className="text-[11px] text-[#A8A29E]">
            {property.reviews ?? 0} reviews
          </span>

        </div>

        {/* ACTIONS */}

        <div className="mt-4 grid grid-cols-2 gap-2">

          <Link
            href={editRoute}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl border border-black/[0.08] px-3 py-2.5 text-xs font-bold text-[#44403C] hover:bg-[#FFF8E8]"
          >
            <Edit3 size={14} />
            Edit
          </Link>

          <Link
            href={viewRoute}
            className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-[#18181B] px-3 py-2.5 text-xs font-bold text-white hover:bg-[#292524]"
          >
            <Eye size={14} />
            View
          </Link>

        </div>

      </div>
    </article>
  );
}

/* =========================================================
   IMAGE
========================================================= */

function PropertyImage({
  src,
  alt,
}: {
  src?: string;
  alt: string;
}) {
  const [failed, setFailed] =
    useState(false);

  if (!src || failed) {
    return <ImageFallback />;
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
      onError={() => setFailed(true)}
    />
  );
}

/* =========================================================
   STATUS
========================================================= */

function StatusBadge({
  status,
}: {
  status: PropertyStatus;
}) {
  if (status === "PUBLISHED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#F3F8EE] px-3 py-1.5 text-[10px] font-bold text-[#4E693E] shadow-sm">
        <CheckCircle2 size={13} />
        Published
      </span>
    );
  }

  if (status === "PENDING") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF8E8] px-3 py-1.5 text-[10px] font-bold text-[#8A651B] shadow-sm">
        <ShieldCheck size={13} />
        Verification pending
      </span>
    );
  }

  if (status === "REJECTED") {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full bg-[#FFF1EF] px-3 py-1.5 text-[10px] font-bold text-[#9B4439] shadow-sm">
        <XCircle size={13} />
        Needs changes
      </span>
    );
  }

  return (
    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold text-[#57534E] shadow-sm">
      <Edit3 size={13} />
      Draft
    </span>
  );
}

/* =========================================================
   IMAGE FALLBACK
========================================================= */

function ImageFallback() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[#F1F0EB] text-[#A8A29E]">
      <Home
        size={36}
        strokeWidth={1.5}
      />

      <span className="mt-2 text-xs">
        Property image unavailable
      </span>
    </div>
  );
}

/* =========================================================
   LOADING
========================================================= */

function PropertiesSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {[1, 2, 3, 4, 5, 6].map(
        (item) => (
          <div
            key={item}
            className="overflow-hidden rounded-[26px] border border-black/[0.08] bg-white"
          >
            <div className="aspect-[16/10] animate-pulse bg-[#F1F0EB]" />

            <div className="p-5">
              <div className="h-3 w-20 animate-pulse rounded bg-[#F1F0EB]" />

              <div className="mt-3 h-6 w-40 animate-pulse rounded bg-[#F1F0EB]" />

              <div className="mt-3 h-3 w-32 animate-pulse rounded bg-[#F5F4EF]" />

              <div className="mt-6 h-8 animate-pulse rounded bg-[#F5F4EF]" />

              <div className="mt-4 grid grid-cols-2 gap-2">
                <div className="h-10 animate-pulse rounded-xl bg-[#F1F0EB]" />
                <div className="h-10 animate-pulse rounded-xl bg-[#F1F0EB]" />
              </div>
            </div>
          </div>
        ),
      )}
    </div>
  );
}

/* =========================================================
   EMPTY
========================================================= */

function EmptyProperties({
  search,
  onClear,
}: {
  search: string;
  onClear: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-black/15 bg-white px-6 py-16 text-center">

      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF8E8] text-[#9A711E]">
        <Home size={28} />
      </div>

      <h2 className="mt-5 font-serif text-2xl font-semibold">
        {search
          ? "No matching properties"
          : "No properties yet"}
      </h2>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#78716C]">
        {search
          ? "Try a different property name, location or property type."
          : "Add your first property and start building your Vistara hosting profile."}
      </p>

      {search ? (
        <button
          type="button"
          onClick={onClear}
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-black/[0.08] bg-white px-5 py-3 text-sm font-bold hover:bg-[#FAF8F3]"
        >
          Clear search
        </button>
      ) : (
        <Link
          href={getAddRoute()}
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3 text-sm font-bold text-[#18181B] hover:bg-[#E7C46D]"
        >
          <Plus size={17} />
          Add your first property
        </Link>
      )}

    </div>
  );
}