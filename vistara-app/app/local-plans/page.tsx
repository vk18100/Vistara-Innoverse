"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

type Plan = {
  id: number;
  title: string;
  slug: string;
  description: string;
  city: string;
  area: string | null;
  price: number | string;
  durationHours: number;
  coverImage: string | null;
  isFeatured?: boolean;
  placesCount?: number;
};

const fallbackPlans: Plan[] = [
  {
    id: 1,
    title: "Weekend Explorer",
    slug: "weekend-explorer",
    description:
      "A compact local plan for discovering the essential experiences of a city.",
    city: "Varanasi",
    area: "Old City",
    price: 499,
    durationHours: 48,
    coverImage:
      "https://images.unsplash.com/photo-1561361058-c24cecae35ca?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 2,
    title: "3-Day City Escape",
    slug: "3-day-city-escape",
    description:
      "Three days of carefully selected places, food, culture and local experiences.",
    city: "Jaipur",
    area: "Pink City",
    price: 899,
    durationHours: 72,
    coverImage:
      "https://images.unsplash.com/photo-1477587458883-47145ed94245?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 3,
    title: "7-Day Deep Explore",
    slug: "7-day-deep-explore",
    description:
      "Spend a full week exploring beyond the usual tourist route.",
    city: "Rajasthan",
    area: "Multiple Areas",
    price: 1499,
    durationHours: 168,
    coverImage:
      "https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=1200&q=80",
  },
  {
    id: 4,
    title: "14-Day Complete Journey",
    slug: "14-day-complete-journey",
    description:
      "A deeper two-week local journey designed for travellers who want more.",
    city: "India",
    area: "Multiple Destinations",
    price: 2499,
    durationHours: 336,
    coverImage:
      "https://images.unsplash.com/photo-1526772662000-3f88f10405ff?auto=format&fit=crop&w=1200&q=80",
  },
];

function formatDuration(hours: number) {
  if (hours >= 336) return "2 Weeks";
  if (hours >= 168) return "1 Week";
  if (hours >= 72) return "3 Days";
  return "2 Days";
}

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

export default function LocalPlansPage() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    async function loadPlans() {
      try {
        setLoading(true);

        const response = await fetch("/api/local-plans", {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load local plans."
          );
        }

        if (
          active &&
          Array.isArray(result.data) &&
          result.data.length > 0
        ) {
          setPlans(result.data);
        }
      } catch (error) {
        console.error("LOCAL_PLANS_ERROR:", error);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadPlans();

    return () => {
      active = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      <section className="border-b border-[#03045E]/10 bg-[#F7F9FF]">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
            VISTARA LOCAL PLANS
          </p>

          <h1 className="mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight md:text-6xl">
            Explore a place like a local.
          </h1>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#64748B]">
            Unlock curated local routes, hidden places, experiences and
            practical recommendations designed around your journey.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="mb-9 flex items-end justify-between gap-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#64748B]">
              CHOOSE YOUR PLAN
            </p>

            <h2 className="mt-2 font-serif text-3xl font-semibold">
              Local journeys
            </h2>
          </div>

          {loading && (
            <span className="text-xs text-[#94A3B8]">
              Updating plans...
            </span>
          )}
        </div>

        <div className="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className="group overflow-hidden rounded-[26px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.05)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_20px_55px_rgba(3,4,94,0.10)]"
            >
              <div className="relative h-56 overflow-hidden bg-[#EEF4FF]">
                {plan.coverImage ? (
                  <img
                    src={plan.coverImage}
                    alt={plan.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-sm text-[#64748B]">
                    Vistara
                  </div>
                )}

                <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E] shadow-sm">
                  {formatDuration(plan.durationHours)}
                </div>
              </div>

              <div className="flex min-h-[310px] flex-col p-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#0D21A1]">
                    {plan.city}
                  </p>

                  <h3 className="mt-2 font-serif text-2xl font-semibold">
                    {plan.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#64748B]">
                    {plan.description}
                  </p>

                  {plan.area && (
                    <p className="mt-4 text-xs font-medium text-[#94A3B8]">
                      {plan.area}
                    </p>
                  )}
                </div>

                <div className="mt-auto border-t border-[#E8EBF5] pt-5">
                  <div className="flex items-end justify-between gap-4">
                    <div>
                      <p className="text-xs text-[#94A3B8]">
                        PLAN PRICE
                      </p>

                      <p className="mt-1 text-2xl font-bold">
                        {formatPrice(plan.price)}
                      </p>
                    </div>

                    <Link
                      href={`/local-plans/${plan.slug}`}
                      className="rounded-xl bg-[#03045E] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                    >
                      View plan
                    </Link>
                  </div>

                  <Link
                    href={`/local-plans/${plan.slug}?buy=true`}
                    className="mt-3 flex w-full items-center justify-center rounded-xl border border-[#03045E] px-4 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
                  >
                    Buy Plan
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16 lg:px-10">
        <div className="rounded-[28px] border border-[#03045E]/10 bg-[#F7F9FF] p-7 md:p-9">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <p className="text-sm font-bold">Curated locally</p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Discover places beyond the standard tourist checklist.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold">One-time unlock</p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Buy a plan and unlock its local recommendations and routes.
              </p>
            </div>

            <div>
              <p className="text-sm font-bold">Built for your journey</p>
              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                Use your unlocked plan while planning and exploring your trip.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}