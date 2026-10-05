"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Clock3,
  MapPin,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

type Place = {
  id?: number | string;
  name: string;
  description?: string | null;
  image?: string | null;
  category?: string | null;
  area?: string | null;
};

type Plan = {
  id: number;
  title: string;
  slug: string;
  description: string;
  city: string;
  area?: string | null;
  price: number | string;
  durationHours: number;
  coverImage?: string | null;
  places?: Place[];
  placesCount?: number;
  isFeatured?: boolean;
};

function formatPrice(price: number | string) {
  return `₹${Number(price).toLocaleString("en-IN")}`;
}

function formatDuration(hours: number) {
  if (hours >= 336) return "14 days";
  if (hours >= 168) return "7 days";
  if (hours >= 72) return "3 days";
  return "2 days";
}

export default function LocalPlanPurchasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [plan, setPlan] = useState<Plan | null>(null);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadPlan() {
      try {
        const { id } = await params;

        if (!id) {
          throw new Error("Invalid plan.");
        }

        const response = await fetch(`/api/local-plans/${id}`, {
          method: "GET",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load this plan."
          );
        }

        if (active) {
          setPlan(result.data);
        }
      } catch (err) {
        console.error("LOCAL_PLAN_PURCHASE_LOAD_ERROR:", err);

        if (active) {
          setError(
            err instanceof Error
              ? err.message
              : "Unable to load this plan."
          );
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    }

    loadPlan();

    return () => {
      active = false;
    };
  }, [params]);

  async function handlePurchase() {
    if (!plan || purchasing) return;

    try {
      setPurchasing(true);
      setError("");

      /*
       * Connect this button to your actual purchase/payment API.
       *
       * Example:
       * POST /api/local-plans/[id]/purchase
       */

      const response = await fetch(
        `/api/local-plans/${plan.id}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            planId: plan.id,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to purchase this plan."
        );
      }

      /*
       * If your API returns a payment/checkout URL,
       * redirect the user there.
       */

      if (result.data?.checkoutUrl) {
        window.location.href = result.data.checkoutUrl;
        return;
      }

      /*
       * Otherwise send the user to trips/purchases.
       */
      window.location.href = "/trips";
    } catch (err) {
      console.error("LOCAL_PLAN_PURCHASE_ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to complete purchase."
      );

      setPurchasing(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="mx-auto max-w-5xl px-5 py-10 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-3 w-20 rounded bg-neutral-200" />

            <div className="mt-4 h-7 w-64 rounded bg-neutral-200" />

            <div className="mt-3 h-4 w-96 max-w-full rounded bg-neutral-100" />

            <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_320px]">
              <div className="h-[300px] rounded-2xl bg-neutral-100" />
              <div className="h-[360px] rounded-2xl bg-neutral-100" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (error || !plan) {
    return (
      <main className="min-h-screen bg-white text-black">
        <Navbar />

        <section className="flex min-h-[65vh] items-center justify-center px-5">
          <div className="max-w-md text-center">
            <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
              LOCAL PLAN
            </p>

            <h1 className="mt-3 font-serif text-2xl font-semibold">
              Plan not found
            </h1>

            <p className="mt-2 text-xs leading-5 text-neutral-500">
              This local plan may no longer be available.
            </p>

            <Link
              href="/local-plans"
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-black px-4 py-2.5 text-[10px] font-semibold text-white transition hover:bg-neutral-800"
            >
              <ArrowLeft size={13} />
              Back to local plans
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const places = plan.places ?? [];

  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* BACK */}
      <div className="mx-auto max-w-5xl px-5 pt-5 sm:px-6 lg:px-8">
        <Link
          href={`/local-plans/${plan.slug}`}
          className="inline-flex items-center gap-1.5 text-[10px] font-medium text-neutral-500 transition hover:text-black"
        >
          <ArrowLeft size={13} />
          Back to plan
        </Link>
      </div>

      {/* HEADER */}
      <section className="mx-auto max-w-5xl px-5 pb-7 pt-6 sm:px-6 lg:px-8">
        <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-neutral-400">
          COMPLETE YOUR PURCHASE
        </p>

        <h1 className="mt-2 max-w-2xl font-serif text-[28px] font-semibold leading-tight tracking-tight sm:text-[32px]">
          Get your local plan.
        </h1>

        <p className="mt-2 max-w-xl text-[11px] leading-5 text-neutral-500">
          One purchase gives you access to this curated Vistara
          local plan and all included places.
        </p>
      </section>

      {/* MAIN */}
      <section className="mx-auto max-w-5xl px-5 pb-12 sm:px-6 lg:px-8">
        <div className="grid gap-7 lg:grid-cols-[1fr_320px]">
          
          {/* LEFT */}
          <div className="space-y-6">
            {/* PLAN CARD */}
            <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
              <div className="relative h-[230px] bg-neutral-100">
                {plan.coverImage ? (
                  <img
                    src={plan.coverImage}
                    alt={plan.title}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-neutral-400">
                    No cover image
                  </div>
                )}

                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-5">
                  <p className="text-[8px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    VISTARA LOCAL PLAN
                  </p>

                  <h2 className="mt-1 text-base font-semibold text-white">
                    {plan.title}
                  </h2>
                </div>
              </div>

              <div className="p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-[9px] font-medium">
                    <MapPin size={11} />
                    {plan.city}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-[9px] font-medium">
                    <Clock3 size={11} />
                    {formatDuration(plan.durationHours)}
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-full border border-neutral-200 px-2.5 py-1 text-[9px] font-medium">
                    <Sparkles size={11} />
                    {places.length || plan.placesCount || 0} places
                  </span>
                </div>

                <p className="mt-4 text-[11px] leading-5 text-neutral-500">
                  {plan.description}
                </p>
              </div>
            </div>

            {/* INCLUDED */}
            <div className="rounded-2xl border border-neutral-200 p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                INCLUDED
              </p>

              <div className="mt-4 space-y-3">
                <div className="flex gap-2.5">
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-[10px] font-semibold">
                      Curated local places
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-neutral-500">
                      Discover selected places included in this plan.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-[10px] font-semibold">
                      Complete plan access
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-neutral-500">
                      Access the full local itinerary after purchase.
                    </p>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <Check
                    size={14}
                    className="mt-0.5 shrink-0"
                  />

                  <div>
                    <p className="text-[10px] font-semibold">
                      One-time purchase
                    </p>

                    <p className="mt-0.5 text-[9px] leading-4 text-neutral-500">
                      No subscription or recurring payment.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT CHECKOUT */}
          <aside>
            <div className="sticky top-24 rounded-2xl border border-neutral-200 bg-white p-5">
              <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-neutral-400">
                ORDER SUMMARY
              </p>

              <div className="mt-4">
                <p className="text-xs font-semibold">
                  {plan.title}
                </p>

                <p className="mt-1 text-[9px] text-neutral-500">
                  {plan.city}
                  {plan.area ? ` · ${plan.area}` : ""}
                </p>
              </div>

              <div className="my-5 border-t border-neutral-200" />

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">
                    Plan price
                  </span>

                  <span className="text-[10px] font-semibold">
                    {formatPrice(plan.price)}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-neutral-500">
                    Access
                  </span>

                  <span className="text-[10px] font-semibold">
                    Full plan
                  </span>
                </div>
              </div>

              <div className="my-5 border-t border-neutral-200" />

              <div className="flex items-end justify-between">
                <span className="text-[10px] text-neutral-500">
                  Total
                </span>

                <span className="font-serif text-xl font-semibold">
                  {formatPrice(plan.price)}
                </span>
              </div>

              {error && (
                <div className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 px-3 py-2.5 text-[9px] leading-4 text-neutral-600">
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handlePurchase}
                disabled={purchasing}
                className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-black px-4 py-3 text-[10px] font-semibold text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {purchasing ? (
                  "Processing..."
                ) : (
                  <>
                    Continue to payment
                    <ArrowRight size={13} />
                  </>
                )}
              </button>

              <div className="mt-4 flex gap-2 border-t border-neutral-200 pt-4">
                <ShieldCheck
                  size={13}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-[9px] leading-4 text-neutral-500">
                  Secure checkout. Your local plan access will be
                  available after successful purchase.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <Footer />
    </main>
  );
}