"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Heart, MapPin } from "lucide-react";

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

export default function WishlistPage() {
  const [places, setPlaces] = useState<WishlistPlace[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist", {
          method: "GET",
          credentials: "include",
        });

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.message || "Unable to load wishlist."
          );
        }

        setPlaces(result.data ?? []);
      } catch (error) {
        console.error("WISHLIST_PAGE_ERROR:", error);

        setError(
          error instanceof Error
            ? error.message
            : "Unable to load wishlist."
        );
      } finally {
        setLoading(false);
      }
    };

    loadWishlist();
  }, []);

  const removeFromWishlist = async (propertyId: number) => {
    try {
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
          result?.message || "Unable to remove item."
        );
      }

      setPlaces((current) =>
        current.filter(
          (place) => place.propertyId !== propertyId
        )
      );
    } catch (error) {
      console.error("WISHLIST_DELETE_ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to remove item."
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#F8FAFF] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#E2E8F0] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                Your collection
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-5xl">
                Wishlist
              </h1>

              <p className="mt-4 max-w-2xl text-sm leading-6 text-[#64748B]">
                Keep the stays you love in one place and come
                back whenever you are ready to plan your journey.
              </p>
            </div>

            {!loading && !error && (
              <div className="hidden rounded-full border border-[#DCE3F0] bg-white px-5 py-2.5 text-sm font-medium text-[#475569] sm:block">
                {places.length}{" "}
                {places.length === 1 ? "stay" : "stays"}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {/* LOADING */}
        {loading && (
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="animate-pulse">
                <div className="aspect-[4/3] rounded-[24px] bg-[#E9EEF7]" />

                <div className="mt-4 h-5 w-3/4 rounded bg-[#E9EEF7]" />

                <div className="mt-3 h-4 w-1/2 rounded bg-[#E9EEF7]" />

                <div className="mt-4 h-5 w-1/3 rounded bg-[#E9EEF7]" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR / AUTH */}
        {!loading && error && (
          <div className="mx-auto max-w-xl rounded-[28px] border border-[#E2E8F0] bg-white px-6 py-14 text-center shadow-[0_15px_50px_rgba(3,4,94,0.06)]">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]">
              <Heart
                size={28}
                className="text-[#03045E]"
              />
            </div>

            <h2 className="mt-6 font-serif text-2xl font-semibold text-[#03045E]">
              Sign in to view your wishlist
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              Save your favourite stays and access them anytime
              from your wishlist.
            </p>

            <Link
              href="/login"
              className="mt-7 inline-flex rounded-2xl bg-[#03045E] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Sign in
            </Link>
          </div>
        )}

        {/* EMPTY */}
        {!loading && !error && places.length === 0 && (
          <div className="mx-auto max-w-xl rounded-[28px] border border-[#E2E8F0] bg-white px-6 py-16 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]">
              <Heart
                size={28}
                className="text-[#03045E]"
              />
            </div>

            <h2 className="mt-6 font-serif text-2xl font-semibold text-[#03045E]">
              Your wishlist is empty
            </h2>

            <p className="mt-3 text-sm leading-6 text-[#64748B]">
              Explore beautiful stays and save the ones you
              want to remember.
            </p>

            <Link
              href="/stays"
              className="mt-7 inline-flex rounded-2xl bg-[#03045E] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Explore stays
            </Link>
          </div>
        )}

        {/* WISHLIST CARDS */}
        {!loading && !error && places.length > 0 && (
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {places.map((place) => (
              <article
                key={place.wishlistId}
                className="group"
              >
                {/* IMAGE */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-[24px] bg-[#EEF2F7]">
                  <Link
                    href={`/stays/${place.propertyId}`}
                    className="block h-full w-full"
                  >
                    <img
                      src={place.image}
                      alt={place.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                    />
                  </Link>

                  {/* REMOVE WISHLIST */}
                  <button
                    type="button"
                    onClick={() =>
                      removeFromWishlist(place.propertyId)
                    }
                    aria-label={`Remove ${place.title} from wishlist`}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
                  >
                    <Heart
                      size={20}
                      fill="currentColor"
                      strokeWidth={2}
                      className="text-[#03045E]"
                    />
                  </button>
                </div>

                {/* DETAILS */}
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <Link
                      href={`/stays/${place.propertyId}`}
                      className="min-w-0"
                    >
                      <h2 className="truncate text-[17px] font-semibold text-[#03045E] transition hover:text-[#0D21A1]">
                        {place.title}
                      </h2>
                    </Link>

                    <span className="shrink-0 text-sm font-medium text-[#03045E]">
                      ★ {place.rating}
                    </span>
                  </div>

                  {/* LOCATION */}
                  <div className="mt-2 flex items-center gap-1.5 text-sm text-[#64748B]">
                    <MapPin size={15} />
                    <span>{place.location}</span>
                  </div>

                  {/* PRICE */}
                  <div className="mt-4">
                    <span className="font-semibold text-[#03045E]">
                      {place.price}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}