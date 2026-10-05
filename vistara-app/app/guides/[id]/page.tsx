"use client";
import Navbar from "@/components/navbar";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  MapPin,
  Star,
  Globe2,
  Clock3,
  ShieldCheck,
  Users,
} from "lucide-react";

type Guide = {
  id: string;
  name: string;
  location: string;
  image: string;
  rating: number;
  bio: string;
  description?: string;
  languages: string[];
  specialties: string[];
  price: number;
  experience: number;
  reviews: number;
  verified?: boolean;
};

export default function GuideDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const [guide, setGuide] = useState<Guide | null>(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    const loadGuide = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`/api/guides/${id}`, {
          method: "GET",
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result?.success) {
          throw new Error(
            result?.message || "Unable to load guide."
          );
        }

        setGuide(result.data || result.guide);
      } catch (err) {
        console.error("GUIDE_DETAILS_ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load guide."
        );
      } finally {
        setLoading(false);
      }
    };

    loadGuide();
  }, [id]);

  const handleBookGuide = async () => {
    if (!guide) return;

    try {
      setBooking(true);

      /*
        Connect this with your booking API when the
        guide booking backend is ready.

        Example:
        POST /api/guides/bookings
      */

      router.push(`/guides/${guide.id}/book`);
    } catch (error) {
      console.error(error);
    } finally {
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <div className="h-4 w-28 animate-pulse rounded bg-neutral-200" />

          <div className="mt-8 grid gap-8 lg:grid-cols-[1.15fr_.85fr]">
            <div className="h-[430px] animate-pulse rounded-3xl bg-neutral-100" />

            <div className="space-y-5">
              <div className="h-10 w-3/4 animate-pulse rounded bg-neutral-100" />
              <div className="h-5 w-1/2 animate-pulse rounded bg-neutral-100" />
              <div className="h-32 animate-pulse rounded-2xl bg-neutral-100" />
              <div className="h-20 animate-pulse rounded-2xl bg-neutral-100" />
            </div>
          </div>
        </div>
      </main>
    );
  }

  if (error || !guide) {
    return (
      <main className="min-h-screen bg-white text-black">
        <div className="mx-auto flex min-h-[70vh] max-w-4xl flex-col items-center justify-center px-5 text-center">
          <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-black">
            <MapPin size={22} />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight">
            Guide not found
          </h1>

          <p className="mt-2 max-w-md text-sm text-neutral-500">
            This guide may no longer be available.
          </p>

          <Link
            href="/guides"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-sm font-medium text-white transition hover:bg-neutral-800"
          >
            <ArrowLeft size={16} />
            Back to guides
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* NAVBAR */}

    <Navbar />

      {/* PAGE */}

      <div className="mx-auto max-w-6xl px-5 py-8 lg:px-8 lg:py-10">
        {/* BACK */}

        <Link
          href="/guides"
          className="mb-7 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={16} />
          All guides
        </Link>

        {/* MAIN GRID */}

        <section className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          {/* GUIDE IMAGE */}

          <div className="relative overflow-hidden rounded-3xl bg-neutral-100">
            <img
              src={guide.image || "/images/profile.jpg"}
              alt={guide.name}
              className="h-[380px] w-full object-cover sm:h-[450px]"
              onError={(e) => {
                e.currentTarget.src = "/images/profile.jpg";
              }}
            />

            {guide.verified && (
              <div className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-medium shadow-sm">
                <ShieldCheck size={14} />
                Verified guide
              </div>
            )}
          </div>

          {/* GUIDE INFO */}

          <div className="flex flex-col">
            <div>
              <div className="mb-3 flex items-center gap-2 text-xs uppercase tracking-[0.18em] text-neutral-500">
                <span>Local guide</span>
                <span>•</span>
                <span>{guide.location}</span>
              </div>

              <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
                {guide.name}
              </h1>

              <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-neutral-600">
                <span className="flex items-center gap-1.5">
                  <MapPin size={16} />
                  {guide.location}
                </span>

                <span className="flex items-center gap-1.5">
                  <Star size={15} fill="currentColor" />
                  {guide.rating.toFixed(1)}
                </span>

                <span>{guide.reviews} reviews</span>
              </div>
            </div>

            {/* DESCRIPTION */}

            <div className="mt-7 border-y border-neutral-200 py-6">
              <p className="text-sm leading-7 text-neutral-600">
                {guide.description || guide.bio}
              </p>
            </div>

            {/* QUICK INFO */}

            <div className="grid grid-cols-2 gap-3 py-6">
              <div className="rounded-2xl border border-neutral-200 p-4">
                <Clock3
                  size={17}
                  className="mb-3"
                />

                <p className="text-xs text-neutral-500">
                  Experience
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {guide.experience} years
                </p>
              </div>

              <div className="rounded-2xl border border-neutral-200 p-4">
                <Users
                  size={17}
                  className="mb-3"
                />

                <p className="text-xs text-neutral-500">
                  Traveller reviews
                </p>

                <p className="mt-1 text-sm font-semibold">
                  {guide.reviews}
                </p>
              </div>
            </div>

            {/* LANGUAGES */}

            <div>
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Globe2 size={16} />
                Languages
              </div>

              <div className="flex flex-wrap gap-2">
                {guide.languages?.map((language) => (
                  <span
                    key={language}
                    className="rounded-full border border-neutral-200 px-3 py-1.5 text-xs text-neutral-700"
                  >
                    {language}
                  </span>
                ))}
              </div>
            </div>

            {/* SPECIALITIES */}

            <div className="mt-5">
              <p className="mb-3 text-sm font-semibold">
                Knows the place for
              </p>

              <div className="flex flex-wrap gap-2">
                {guide.specialties?.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-neutral-100 px-3 py-1.5 text-xs text-neutral-800"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* BOOKING BAR */}

        <section className="mt-10 rounded-3xl border border-neutral-200 bg-neutral-50 p-5 sm:p-6">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.16em] text-neutral-500">
                Private local experience
              </p>

              <div className="mt-1 flex items-baseline gap-1">
                <span className="text-2xl font-semibold">
                  ₹{guide.price.toLocaleString("en-IN")}
                </span>

                <span className="text-sm text-neutral-500">
                  / hour
                </span>
              </div>

              <p className="mt-1 text-xs text-neutral-500">
                Plan your local experience with {guide.name}.
              </p>
            </div>

            <button
              onClick={handleBookGuide}
              disabled={booking}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {booking ? "Opening..." : "Book this guide"}
              <ArrowRight size={16} />
            </button>
          </div>
        </section>

        {/* LOCAL EXPERIENCE */}

        <section className="mt-12 border-t border-neutral-200 pt-10">
          <p className="text-xs uppercase tracking-[0.18em] text-neutral-500">
            Travel with local knowledge
          </p>

          <div className="mt-3 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-2xl text-2xl font-semibold tracking-tight sm:text-3xl">
              See the destination through someone who knows it.
            </h2>

            <Link
              href="/explore"
              className="inline-flex items-center gap-2 text-sm font-medium hover:underline"
            >
              Explore places
              <ArrowRight size={16} />
            </Link>
          </div>

          <p className="mt-4 max-w-2xl text-sm leading-6 text-neutral-500">
            Your guide can help you discover local food, neighbourhoods,
            heritage, hidden spots and experiences that are easy to miss
            when travelling alone.
          </p>
        </section>
      </div>

      {/* FOOTER */}

      <footer className="mt-16 border-t border-neutral-200">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-5 py-8 text-xs text-neutral-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© {new Date().getFullYear()} Vistara</span>

          <div className="flex gap-5">
            <Link href="/guides" className="hover:text-black">
              Guides
            </Link>

            <Link href="/explore" className="hover:text-black">
              Explore
            </Link>

            <Link href="/trips" className="hover:text-black">
              Trips
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}