"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import {
  Heart,
  MapPin,
  ArrowRight,
  Loader2,
  Search,
  Sparkles,
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
  data?: WishlistPlace[];
  message?: string;
};

export default function WishlistPage() {
  const [places, setPlaces] = useState<WishlistPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [removingId, setRemovingId] = useState<number | null>(null);

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
      });

      const result: WishlistResponse = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to load your wishlist."
        );
      }

      setPlaces(Array.isArray(result.data) ? result.data : []);
    } catch (error) {
      console.error("WISHLIST_LOAD_ERROR:", error);

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

  const removeFromWishlist = async (propertyId: number) => {
    if (removingId !== null) return;

    const previousPlaces = places;

    try {
      setRemovingId(propertyId);

      // Optimistic UI:
      // card disappears immediately
      setPlaces((current) =>
        current.filter(
          (place) => place.propertyId !== propertyId
        )
      );

      const response = await fetch("/api/wishlist", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result?.message || "Unable to remove this stay."
        );
      }
    } catch (error) {
      console.error("WISHLIST_DELETE_ERROR:", error);

      // Restore card if API failed
      setPlaces(previousPlaces);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to remove this stay."
      );
    } finally {
      setRemovingId(null);
    }
  };

  /* =========================================================
     LOADING SKELETON
  ========================================================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
        <Navbar />

        <section className="border-b border-[#E7DFD7] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10">
            <div className="h-3 w-28 animate-pulse rounded bg-[#E9E2DA]" />

            <div className="mt-4 h-12 w-64 animate-pulse rounded bg-[#E9E2DA]" />

            <div className="mt-4 h-4 max-w-xl animate-pulse rounded bg-[#EEE8E1]" />
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse"
              >
                <div className="aspect-[4/3] rounded-[24px] bg-[#E9E2DA]" />

                <div className="mt-4 h-5 w-3/4 rounded bg-[#E9E2DA]" />

                <div className="mt-3 h-4 w-1/2 rounded bg-[#EEE8E1]" />

                <div className="mt-4 h-5 w-1/3 rounded bg-[#E9E2DA]" />
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================================================
     AUTH / ERROR
  ========================================================= */

  if (error) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
        <Navbar />

        <section className="mx-auto flex min-h-[65vh] max-w-7xl items-center justify-center px-5 py-16">
          <div className="w-full max-w-lg rounded-[30px] border border-[#E5DED6] bg-white px-7 py-12 text-center shadow-[0_18px_60px_rgba(44,36,32,0.06)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#F2EAE4]">
              <Heart
                size={28}
                className="text-[#B76545]"
              />
            </div>

            <h1 className="mt-6 font-serif text-3xl font-semibold">
              Your wishlist
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#756D67]">
              Sign in to save stays you love and access your
              collection whenever you return.
            </p>

            <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-[#B76545] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#965039]"
              >
                Sign in
              </Link>

              <Link
                href="/stays"
                className="inline-flex items-center justify-center rounded-xl border border-[#DED5CD] bg-white px-7 py-3.5 text-sm font-semibold text-[#4A403A] transition hover:border-[#B76545]"
              >
                Explore stays
              </Link>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================================================
     EMPTY
  ========================================================= */

  if (places.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
        <Navbar />

        <section className="border-b border-[#E7DFD7] bg-white">
          <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10">
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76545]">
              Your collection
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Wishlist
            </h1>

            <p className="mt-4 max-w-xl text-sm leading-6 text-[#756D67]">
              Save the stays that catch your eye and come back to
              them whenever you are ready.
            </p>
          </div>
        </section>

        <section className="mx-auto flex min-h-[55vh] max-w-7xl items-center justify-center px-5 py-16">
          <div className="max-w-md text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#F2EAE4]">
              <Heart
                size={32}
                strokeWidth={1.6}
                className="text-[#B76545]"
              />
            </div>

            <h2 className="mt-7 font-serif text-3xl font-semibold">
              Nothing saved yet
            </h2>

            <p className="mt-3 text-sm leading-7 text-[#756D67]">
              Your favourite stays will appear here. Start exploring
              and tap the heart whenever you find somewhere you
              would love to remember.
            </p>

            <Link
              href="/stays"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#B76545] px-7 py-3.5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#965039]"
            >
              <Search size={16} />
              Explore stays
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  /* =========================================================
     MAIN PAGE
  ========================================================= */

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <section className="border-b border-[#E7DFD7] bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10">
          <div className="flex flex-col justify-between gap-7 sm:flex-row sm:items-end">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#D8C29B]/50 bg-[#B8945A]/[0.07] px-3.5 py-2">
                <Sparkles
                  size={13}
                  className="text-[#B8945A]"
                />

                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#8D6E38]">
                  Your collection
                </span>
              </div>

              <h1 className="mt-4 font-serif text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
                Wishlist
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#756D67]">
                Keep the stays you love in one place and return
                whenever you are ready to plan your next journey.
              </p>
            </div>

            {/* COUNT */}
            <div className="flex w-fit items-center gap-2 rounded-full border border-[#E1D9D1] bg-[#FAF8F3] px-4 py-2.5">
              <Heart
                size={15}
                className="text-[#B76545]"
                fill="currentColor"
              />

              <span className="text-sm font-semibold text-[#4A403A]">
                {places.length}{" "}
                {places.length === 1 ? "stay" : "stays"}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ===================================================== */}

      <section className="mx-auto max-w-7xl px-5 py-12 sm:px-7 lg:px-10">
        <div className="grid grid-cols-1 gap-x-6 gap-y-11 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {places.map((place) => {
            const isRemoving =
              removingId === place.propertyId;

            return (
              <article
                key={place.wishlistId}
                className={`group transition duration-300 ${
                  isRemoving
                    ? "scale-[0.98] opacity-50"
                    : ""
                }`}
              >
                {/* =================================================
                    IMAGE
                ================================================= */}

                <div className="relative aspect-[4/3] overflow-hidden rounded-[25px] bg-[#EEE8E1]">
                  <Link
                    href={`/stays/${place.propertyId}`}
                    className="block h-full w-full"
                  >
                    {place.image ? (
                      <img
                        src={place.image}
                        alt={place.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.045]"
                        onError={(event) => {
                          event.currentTarget.style.display =
                            "none";
                        }}
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-sm text-[#9A918B]">
                        No image available
                      </div>
                    )}
                  </Link>

                  {/* IMAGE OVERLAY */}

                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/25 to-transparent opacity-0 transition duration-300 group-hover:opacity-100" />

                  {/* =================================================
                      HEART
                  ================================================= */}

                  <button
                    type="button"
                    disabled={isRemoving}
                    onClick={() =>
                      removeFromWishlist(place.propertyId)
                    }
                    aria-label={`Remove ${place.title} from wishlist`}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/60 bg-white/95 text-[#B76545] shadow-[0_5px_20px_rgba(0,0,0,0.12)] backdrop-blur-sm transition hover:scale-105 hover:bg-white disabled:cursor-not-allowed"
                  >
                    {isRemoving ? (
                      <Loader2
                        size={18}
                        className="animate-spin"
                      />
                    ) : (
                      <Heart
                        size={20}
                        fill="currentColor"
                        strokeWidth={1.8}
                      />
                    )}
                  </button>

                  {/* SAVED LABEL */}

                  <div className="absolute bottom-4 left-4 rounded-full bg-white/95 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide text-[#4A403A] opacity-0 shadow-sm backdrop-blur-sm transition duration-300 group-hover:opacity-100">
                    Saved
                  </div>
                </div>

                {/* =================================================
                    DETAILS
                ================================================= */}

                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/stays/${place.propertyId}`}
                      className="min-w-0"
                    >
                      <h2 className="truncate text-[17px] font-semibold text-[#2C2420] transition hover:text-[#B76545]">
                        {place.title}
                      </h2>
                    </Link>

                    {place.rating && (
                      <span className="shrink-0 text-sm font-medium text-[#4A403A]">
                        ★ {place.rating}
                      </span>
                    )}
                  </div>

                  {/* LOCATION */}

                  <div className="mt-2 flex items-center gap-1.5 text-sm text-[#756D67]">
                    <MapPin
                      size={14}
                      strokeWidth={1.8}
                      className="shrink-0"
                    />

                    <span className="truncate">
                      {place.location}
                    </span>
                  </div>

                  {/* PRICE */}

                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-[#2C2420]">
                        {place.price}
                      </span>

                      <span className="ml-1 text-xs text-[#8F8781]">
                        / night
                      </span>
                    </div>

                    <Link
                      href={`/stays/${place.propertyId}`}
                      aria-label={`View ${place.title}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#DED5CD] bg-white text-[#756D67] transition hover:border-[#B76545] hover:bg-[#B76545] hover:text-white"
                    >
                      <ArrowRight size={15} />
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