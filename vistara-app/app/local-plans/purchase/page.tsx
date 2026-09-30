"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/navbar";

type Purchase = {
  id: number;
  planId: number;
  amount: number | string;
  status: "PENDING" | "PAID" | "FAILED" | "CANCELLED" | "COMPLETED";
  purchasedAt: string | null;
  unlockedAt: string | null;
  expiresAt: string | null;
  createdAt: string;
  plan: {
    id: number;
    title: string;
    slug: string;
    description: string;
    city: string;
    area: string | null;
    price: number | string;
    durationHours: number;
    coverImage: string | null;
  } | null;
};

function formatPrice(value: number | string) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(value: string | null) {
  if (!value) return "—";

  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function getStatusStyle(status: Purchase["status"]) {
  switch (status) {
    case "PAID":
    case "COMPLETED":
      return "bg-[#ECFDF5] text-emerald-700";

    case "PENDING":
      return "bg-[#FFF7ED] text-orange-700";

    case "FAILED":
    case "CANCELLED":
      return "bg-[#FEF2F2] text-red-700";

    default:
      return "bg-[#F1F5F9] text-[#64748B]";
  }
}

export default function LocalPlanPurchasesPage() {
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPurchases() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/local-plans/purchases", {
          method: "GET",
          credentials: "include",
          cache: "no-store",
          signal: controller.signal,
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load your purchases."
          );
        }

        setPurchases(Array.isArray(result.data) ? result.data : []);
      } catch (err) {
        if (
          err instanceof DOMException &&
          err.name === "AbortError"
        ) {
          return;
        }

        console.error("LOCAL_PLAN_PURCHASES_ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your purchases."
        );
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    }

    loadPurchases();

    return () => controller.abort();
  }, []);

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <Navbar />

      <section className="border-b border-[#03045E]/10 bg-[#F7F9FF]">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
          <Link
            href="/local-plans"
            className="text-sm font-medium text-[#64748B] hover:text-[#03045E]"
          >
            ← Local plans
          </Link>

          <p className="mt-8 text-xs font-bold uppercase tracking-[0.28em] text-[#0D21A1]">
            MY PURCHASES
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Your local plans
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
            Access the local journeys and recommendations you have purchased.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-12 lg:px-10">
        {loading ? (
          <div className="flex min-h-[300px] items-center justify-center">
            <div className="text-center">
              <div className="mx-auto h-9 w-9 animate-spin rounded-full border-2 border-[#E2E8F0] border-t-[#03045E]" />
              <p className="mt-4 text-sm text-[#64748B]">
                Loading your plans...
              </p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[24px] border border-red-100 bg-red-50 p-8 text-center">
            <p className="text-sm font-semibold text-red-700">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#0D21A1]"
            >
              Try again
            </button>
          </div>
        ) : purchases.length === 0 ? (
          <div className="rounded-[28px] border border-[#03045E]/10 bg-[#F7F9FF] p-10 text-center">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
              NO PURCHASES YET
            </p>

            <h2 className="mt-3 font-serif text-3xl font-semibold">
              Start exploring locally
            </h2>

            <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-[#64748B]">
              Choose a local plan and unlock curated places, routes and
              recommendations.
            </p>

            <Link
              href="/local-plans"
              className="mt-6 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white hover:bg-[#0D21A1]"
            >
              Explore local plans
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            {purchases.map((purchase) => {
              const plan = purchase.plan;

              if (!plan) return null;

              return (
                <article
                  key={purchase.id}
                  className="group overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_12px_40px_rgba(3,4,94,0.05)] transition hover:shadow-[0_18px_50px_rgba(3,4,94,0.09)]"
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative h-64 shrink-0 overflow-hidden bg-[#EEF4FF] md:h-auto md:w-80">
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

                      <div className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-[#03045E]">
                        Purchased
                      </div>
                    </div>

                    <div className="flex flex-1 flex-col p-7">
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                        <div>
                          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#0D21A1]">
                            {plan.city}
                          </p>

                          <h2 className="mt-2 font-serif text-2xl font-semibold">
                            {plan.title}
                          </h2>

                          <p className="mt-1 text-sm text-[#64748B]">
                            {plan.area || "Local journey"}
                          </p>
                        </div>

                        <span
                          className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold ${getStatusStyle(
                            purchase.status
                          )}`}
                        >
                          {purchase.status}
                        </span>
                      </div>

                      <p className="mt-5 max-w-2xl text-sm leading-6 text-[#64748B]">
                        {plan.description}
                      </p>

                      <div className="mt-6 grid gap-5 border-y border-[#E8EBF5] py-5 sm:grid-cols-3">
                        <div>
                          <p className="text-xs text-[#94A3B8]">
                            AMOUNT
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {formatPrice(purchase.amount)}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8]">
                            PURCHASED
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {formatDate(
                              purchase.purchasedAt ||
                                purchase.createdAt
                            )}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#94A3B8]">
                            EXPIRES
                          </p>
                          <p className="mt-1 text-sm font-semibold">
                            {formatDate(purchase.expiresAt)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                          href={`/local-plans/${plan.slug}`}
                          className="rounded-xl bg-[#03045E] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
                        >
                          Open plan
                        </Link>

                        <Link
                          href="/local-plans"
                          className="rounded-xl border border-[#03045E] px-5 py-2.5 text-sm font-semibold text-[#03045E] transition hover:bg-[#03045E] hover:text-white"
                        >
                          Explore more
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </main>
  );
}