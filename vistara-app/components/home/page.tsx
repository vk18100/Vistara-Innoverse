"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Heart } from "lucide-react";
import { useEffect, useState } from "react";

type Stay = {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
};

type WishlistItem = {
  propertyId: number;
};

const stays: Stay[] = [
  {
    id: 1,
    title: "The Forest House",
    location: "Shimla, Himachal Pradesh",
    price: "₹8,500",
    image: "/images/blackhouse.jpg",
  },
  {
    id: 2,
    title: "Heritage Villa",
    location: "Jaipur, Rajasthan",
    price: "₹6,800",
    image: "/images/beachhouse.jpg.jpg",
  },
  {
    id: 3,
    title: "The Lake Retreat",
    location: "Udaipur, Rajasthan",
    price: "₹7,200",
    image: "/images/pag1 (22).jpg",
  },
  {
    id: 4,
    title: "Modern Escape",
    location: "Goa, India",
    price: "₹5,900",
    image: "/images/pag1 (30).jpg",
  },
  {
    id: 5,
    title: "Valley View Home",
    location: "Manali, Himachal Pradesh",
    price: "₹9,400",
    image: "/images/pag1 (35).jpg",
  },
];

const journeyCards = [
  {
    title: "Explore",
    description: "Discover places worth going to.",
    image: "/images/download (6).jpg",
    href: "/explore",
  },
  {
    title: "Experiences",
    description: "Find things worth experiencing.",
    image: "/images/download (7).jpg",
    href: "/experiences",
  },
  {
    title: "Trips",
    description: "Build a journey around your destination.",
    image: "/images/download (8).jpg",
    href: "/trips",
  },
];

export default function HomePage() {
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [wishlistLoading, setWishlistLoading] = useState<number | null>(null);

  /*
   * =========================================================
   * LOAD EXISTING WISHLIST
   * =========================================================
   */
  useEffect(() => {
    const loadWishlist = async () => {
      try {
        const response = await fetch("/api/wishlist", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          return;
        }

        const result = await response.json();

        if (result.success && Array.isArray(result.data)) {
          const savedIds = result.data.map(
            (item: WishlistItem) => item.propertyId
          );

          setWishlist(savedIds);
        }
      } catch (error) {
        console.error("WISHLIST_LOAD_ERROR:", error);
      }
    };

    loadWishlist();
  }, []);

  /*
   * =========================================================
   * ADD / REMOVE WISHLIST
   * =========================================================
   */
  const toggleWishlist = async (propertyId: number) => {
    if (wishlistLoading === propertyId) {
      return;
    }

    const alreadySaved = wishlist.includes(propertyId);

    try {
      setWishlistLoading(propertyId);

      const response = await fetch("/api/wishlist", {
        method: alreadySaved ? "DELETE" : "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          propertyId,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        console.error(
          "WISHLIST_ERROR:",
          result.message || "Wishlist request failed"
        );

        return;
      }

      setWishlist((current) => {
        if (alreadySaved) {
          return current.filter((id) => id !== propertyId);
        }

        return [...current, propertyId];
      });
    } catch (error) {
      console.error("WISHLIST_ERROR:", error);
    } finally {
      setWishlistLoading(null);
    }
  };

  return (
    <main className="w-full bg-white text-[#222]">
      {/* =====================================================
          STAYS
      ===================================================== */}
      <section className="px-4 py-7 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1450px]">

          {/* HEADING */}
          <div className="mb-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#777]">
              Vistara Stays
            </p>

            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#202020] sm:text-[25px]">
              Stay somewhere worth remembering.
            </h2>
          </div>

          {/* STAY CARDS */}
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-5">
            {stays.map((stay) => {
              const isSaved = wishlist.includes(stay.id);
              const isLoading = wishlistLoading === stay.id;

              return (
                <Link
                  key={stay.id}
                  href={`/stays/${stay.id}`}
                  className="group min-w-[235px] sm:min-w-0"
                >
                  {/* IMAGE */}
                  <div className="relative aspect-square overflow-hidden rounded-[16px] bg-[#f2f1ef]">

                    <Image
                      src={stay.image}
                      alt={stay.title}
                      fill
                      priority={stay.id === 1}
                    sizes="(max-width: 639px) 235px, (max-width: 1023px) 45vw, (max-width: 1279px) 23vw, 19vw"
                      className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                    />

                    {/* HEART */}
                    <button
                      type="button"
                      aria-label={
                        isSaved
                          ? `Remove ${stay.title} from wishlist`
                          : `Save ${stay.title} to wishlist`
                      }
                      disabled={isLoading}
                      onClick={(event) => {
                        event.preventDefault();
                        event.stopPropagation();

                        toggleWishlist(stay.id);
                      }}
                      className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white shadow-sm transition-transform duration-200 hover:scale-105 disabled:cursor-not-allowed disabled:opacity-60"
                    >
                      <Heart
                        size={17}
                        strokeWidth={1.8}
                        className={
                          isSaved
                            ? "fill-[#222] text-[#222]"
                            : "text-[#222]"
                        }
                      />
                    </button>

                    {/* LEFT ARROW */}
                    <span className="absolute left-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      ←
                    </span>

                    {/* RIGHT ARROW */}
                    <span className="absolute right-2 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/55 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                      →
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="pt-2.5">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="truncate text-[12px] font-semibold text-[#222]">
                        {stay.title}
                      </h3>

                      <span className="shrink-0 text-[10px] text-[#444]">
                        ★ 4.8
                      </span>
                    </div>

                    <p className="mt-0.5 truncate text-[10px] text-[#777]">
                      {stay.location}
                    </p>

                    <p className="mt-1 text-[10.5px] text-[#444]">
                      <span className="font-semibold">
                        {stay.price}
                      </span>{" "}
                      / night
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          EXPLORE / EXPERIENCES / TRIPS
      ===================================================== */}
      <section className="px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1450px]">

          {/* HEADING */}
          <div className="mb-5">
            <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-[#777]">
              Discover Vistara
            </p>

            <h2 className="mt-1 text-[22px] font-semibold tracking-[-0.03em] text-[#202020] sm:text-[25px]">
              Go beyond the stay.
            </h2>
          </div>

          {/* THREE CARDS */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {journeyCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group relative overflow-hidden rounded-[16px]"
              >
                <div className="relative aspect-[1.25/1]">

                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    sizes="
                      (max-width: 639px) 100vw,
                      (max-width: 1023px) 50vw,
                      33vw
                    "
                    className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                  />

                  {/* OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

                  {/* CONTENT */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
                    <div className="flex items-end justify-between gap-3">

                      <div>
                        <h3 className="text-[22px] font-semibold tracking-[-0.02em]">
                          {card.title}
                        </h3>

                        <p className="mt-1 text-[10.5px] leading-4 text-white/80">
                          {card.description}
                        </p>
                      </div>

                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform duration-300 group-hover:rotate-45">
                        <ArrowUpRight size={14} />
                      </span>

                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          BUILD YOUR JOURNEY
      ===================================================== */}
      <section className="px-4 pb-10 pt-3 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[1450px]">

          <Link
            href="/local-plans"
            className="group relative block overflow-hidden rounded-[18px] bg-[#191918] px-6 py-10 text-white transition-transform duration-300 hover:scale-[0.995] sm:px-10 sm:py-12"
          >
            <div className="max-w-[600px]">

              <p className="text-[9px] font-semibold uppercase tracking-[0.22em] text-white/50">
                Vistara Local Plans
              </p>

              <h2 className="mt-2 text-[30px] font-semibold leading-[1.05] tracking-[-0.04em] sm:text-[38px]">
                Build your journey.
              </h2>

              <p className="mt-3 max-w-[480px] text-[11px] leading-5 text-white/65">
                Discover local places, hidden spots and experiences around
                your destination.
              </p>

              <span className="mt-5 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-[10px] font-semibold text-[#191918]">
                Build your journey
                <ArrowUpRight size={13} />
              </span>

            </div>
          </Link>

        </div>
      </section>
    </main>
  );
}