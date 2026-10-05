"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";

import {
  ArrowRight,
  Heart,
  Loader2,
  MapPin,
  Search,
  Star,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type WishlistPlace = {
  wishlistId: number;
  propertyId: number;
  type: string;
  title: string;
  location: string;
  price: string;
  rating: string;
  image: string;
  savedAt: string;
};

type WishlistResponse = {
  success?: boolean;
  data?: WishlistPlace[];
  message?: string;
};

/* =========================================================
   AUTH TOKEN
   ---------------------------------------------------------
   If your auth is cookie based, credentials: "include"
   will handle it.

   If your login stores a token in localStorage, this also
   tries common token names.
========================================================= */

function getAuthHeaders(): HeadersInit {
  if (typeof window === "undefined") {
    return {};
  }

  const token =
    localStorage.getItem("token") ||
    localStorage.getItem("accessToken") ||
    localStorage.getItem("authToken");

  if (!token) {
    return {};
  }

  return {
    Authorization: `Bearer ${token}`,
  };
}

export default function WishlistPage() {
  const [places, setPlaces] = useState<WishlistPlace[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  const [removingId, setRemovingId] = useState<
    number | null
  >(null);

  /* =========================================================
     LOAD WISHLIST
  ========================================================= */

  const loadWishlist = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch("/api/wishlist", {
        method: "GET",

        credentials: "include",

        cache: "no-store",

        headers: {
          ...getAuthHeaders(),
        },
      });

      /*
       * Authentication failed.
       *
       * Don't throw "Authentication required"
       * into console as an application error.
       */
      if (response.status === 401) {
        if (typeof window !== "undefined") {
          window.location.href =
            "/login?redirect=/wishlist";
        }

        return;
      }

      const result: WishlistResponse =
        await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to load your wishlist."
        );
      }

      setPlaces(
        Array.isArray(result.data)
          ? result.data
          : []
      );
    } catch (error) {
      console.error(
        "WISHLIST_LOAD_ERROR:",
        error
      );

      setError(
        error instanceof Error
          ? error.message
          : "Unable to load your wishlist."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadWishlist();
  }, [loadWishlist]);

  /* =========================================================
     REMOVE FROM WISHLIST
  ========================================================= */

  const removeFromWishlist = async (
    propertyId: number
  ) => {
    if (removingId !== null) return;

    const previousPlaces = places;

    try {
      setRemovingId(propertyId);

      /*
       * Optimistic UI
       */
      setPlaces((current) =>
        current.filter(
          (place) =>
            place.propertyId !== propertyId
        )
      );

      const response = await fetch(
        "/api/wishlist",
        {
          method: "DELETE",

          credentials: "include",

          headers: {
            "Content-Type": "application/json",
            ...getAuthHeaders(),
          },

          body: JSON.stringify({
            propertyId,
          }),
        }
      );

      if (response.status === 401) {
        /*
         * Restore before redirect
         */
        setPlaces(previousPlaces);

        window.location.href =
          "/login?redirect=/wishlist";

        return;
      }

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message ||
            "Unable to remove this stay."
        );
      }
    } catch (error) {
      console.error(
        "WISHLIST_DELETE_ERROR:",
        error
      );

      /*
       * Restore card if delete failed
       */
      setPlaces(previousPlaces);

      setError(
        error instanceof Error
          ? error.message
          : "Unable to remove this stay."
      );
    } finally {
      setRemovingId(null);
    }
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-7 lg:px-10">
            <div className="h-2 w-20 animate-pulse rounded bg-black/10" />

            <div className="mt-3 h-8 w-40 animate-pulse rounded bg-black/10" />

            <div className="mt-2 h-3 w-72 max-w-full animate-pulse rounded bg-black/5" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10">
          <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="animate-pulse"
                >
                  <div className="aspect-[4/3] rounded-2xl bg-black/5" />

                  <div className="mt-3 h-3.5 w-3/4 rounded bg-black/10" />

                  <div className="mt-2 h-3 w-1/2 rounded bg-black/5" />

                  <div className="mt-2 h-3 w-1/3 rounded bg-black/10" />
                </div>
              )
            )}
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[48vh] items-center justify-center px-5 py-10">
          <div className="w-full max-w-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <Heart size={18} />
            </div>

            <h1 className="mt-4 font-serif text-xl font-semibold">
              Wishlist unavailable
            </h1>

            <p className="mt-2 text-[11px] leading-5 text-black/50">
              We couldn't load your saved places.
              Please try again.
            </p>

            <button
              type="button"
              onClick={loadWishlist}
              className="mt-5 rounded-lg bg-black px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-black/80"
            >
              Try again
            </button>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================================================
     EMPTY WISHLIST
  ========================================================= */

  if (places.length === 0) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        {/* HEADER */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-7xl px-5 py-7 sm:px-7 lg:px-10">
            <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/45">
              Your collection
            </p>

            <h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight">
              Wishlist
            </h1>

            <p className="mt-1.5 max-w-xl text-[11px] leading-5 text-black/50">
              Save the stays that catch your eye
              and return whenever you're ready.
            </p>
          </div>
        </section>

        {/* EMPTY */}

        <section className="flex min-h-[42vh] items-center justify-center px-5 py-10">
          <div className="max-w-sm text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-black text-white">
              <Heart
                size={19}
                strokeWidth={1.6}
              />
            </div>

            <h2 className="mt-4 font-serif text-xl font-semibold">
              Nothing saved yet
            </h2>

            <p className="mx-auto mt-2 max-w-xs text-[11px] leading-5 text-black/50">
              Your favourite stays will appear
              here. Start exploring and save the
              places you love.
            </p>

            <Link
              href="/stays"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-[11px] font-semibold text-white transition hover:bg-black/80"
            >
              <Search size={13} />
              Explore stays
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================================================
     MAIN WISHLIST
  ========================================================= */

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}

      <section className="border-b border-black/10">
        <div className="mx-auto max-w-7xl px-5 py-7 sm:px-7 lg:px-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[8px] font-semibold uppercase tracking-[0.2em] text-black/45">
                Your collection
              </p>

              <h1 className="mt-1 font-serif text-2xl font-semibold tracking-tight">
                Wishlist
              </h1>

              <p className="mt-1.5 text-[11px] leading-5 text-black/50">
                Places worth remembering for your
                next journey.
              </p>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-black/10 px-3 py-1.5">
              <Heart
                size={12}
                fill="currentColor"
              />

              <span className="text-[10px] font-semibold">
                {places.length}{" "}
                {places.length === 1
                  ? "place"
                  : "places"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* CONTENT */}

      <section className="mx-auto max-w-7xl px-5 py-8 sm:px-7 lg:px-10">
        <div className="grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {places.map((place) => {
            const isRemoving =
              removingId === place.propertyId;

            return (
              <article
                key={place.wishlistId}
                className={`group transition duration-300 ${
                  isRemoving
                    ? "scale-[0.98] opacity-40"
                    : ""
                }`}
              >
                {/* IMAGE */}

                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-black/5">
                  <Link
                    href={`/stays/${place.propertyId}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={
                        place.image ||
                        "/images/property-placeholder.jpg"
                      }
                      alt={place.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                      onError={(event) => {
                        event.currentTarget.src =
                          "/images/property-placeholder.jpg";
                      }}
                    />
                  </Link>

                  {/* DARK HOVER */}

                  <div className="pointer-events-none absolute inset-0 bg-black/10 opacity-0 transition duration-300 group-hover:opacity-100" />

                  {/* REMOVE */}

                  <button
                    type="button"
                    disabled={isRemoving}
                    onClick={() =>
                      removeFromWishlist(
                        place.propertyId
                      )
                    }
                    aria-label={`Remove ${place.title} from wishlist`}
                    className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-white text-black shadow-sm transition hover:bg-black hover:text-white disabled:cursor-not-allowed"
                  >
                    {isRemoving ? (
                      <Loader2
                        size={13}
                        className="animate-spin"
                      />
                    ) : (
                      <Heart
                        size={14}
                        fill="currentColor"
                        strokeWidth={1.8}
                      />
                    )}
                  </button>

                  {/* TYPE */}

                  {place.type && (
                    <div className="absolute bottom-3 left-3 rounded-full bg-white px-2.5 py-1 text-[7px] font-semibold uppercase tracking-[0.12em] text-black opacity-0 shadow-sm transition group-hover:opacity-100">
                      {place.type}
                    </div>
                  )}
                </div>

                {/* DETAILS */}

                <div className="mt-2.5">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/stays/${place.propertyId}`}
                      className="min-w-0"
                    >
                      <h2 className="truncate text-[12px] font-semibold tracking-[-0.01em] hover:opacity-60">
                        {place.title}
                      </h2>
                    </Link>

                    {place.rating && (
                      <div className="flex shrink-0 items-center gap-1 text-[9px] font-medium">
                        <Star
                          size={9}
                          fill="currentColor"
                        />
                        {place.rating}
                      </div>
                    )}
                  </div>

                  {/* LOCATION */}

                  <div className="mt-1 flex items-center gap-1 text-[9px] text-black/50">
                    <MapPin
                      size={10}
                      strokeWidth={1.8}
                    />

                    <span className="truncate">
                      {place.location}
                    </span>
                  </div>

                  {/* BOTTOM */}

                  <div className="mt-2 flex items-center justify-between">
                    <span className="text-[10px] font-semibold">
                      {place.price}
                    </span>

                    <Link
                      href={`/stays/${place.propertyId}`}
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 transition hover:bg-black hover:text-white"
                      aria-label={`View ${place.title}`}
                    >
                      <ArrowRight size={11} />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <Footer />
    </main>
  );
}