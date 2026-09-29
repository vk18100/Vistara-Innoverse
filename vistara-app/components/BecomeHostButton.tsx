"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function BecomeHostButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function becomeHost() {
    try {
      setLoading(true);

      const response = await fetch("/api/host/become", {
        method: "POST",
        credentials: "include",
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to become a host."
        );
      }

      router.push("/host");
      router.refresh();
    } catch (error) {
      console.error("BECOME HOST ERROR:", error);

      alert(
        error instanceof Error
          ? error.message
          : "Unable to become a host."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      type="button"
      onClick={becomeHost}
      disabled={loading}
      className="rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:opacity-60"
    >
      {loading ? "Setting up..." : "Become a Host"}
    </button>
  );
}