"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Navbar from "@/components/navbar";

type ProfileData = {
  name: string;
  phone: string;
  firstName: string;
  lastName: string;
  bio: string;
  city: string;
  country: string;
};

export default function EditProfile() {
  const router = useRouter();

  const [form, setForm] = useState<ProfileData>({
    name: "",
    phone: "",
    firstName: "",
    lastName: "",
    bio: "",
    city: "",
    country: "",
  });

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadProfile() {
      try {
        const response = await fetch("/api/profile", {
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error("Unable to load your profile.");
        }

        setEmail(result.user.email);
        setForm({
          name: result.user.name ?? "",
          phone: result.user.phone ?? "",
          firstName: result.profile?.firstName ?? "",
          lastName: result.profile?.lastName ?? "",
          bio: result.profile?.bio ?? "",
          city: result.profile?.city ?? "",
          country: result.profile?.country ?? "",
        });
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your profile."
        );
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, []);

  function updateField<K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setSaving(true);
    setError("");

    try {
      const response = await fetch("/api/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          firstName: form.firstName,
          lastName: form.lastName,
          bio: form.bio,
          city: form.city,
          country: form.country,
        }),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(
          result.message || "Unable to update profile."
        );
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update profile."
      );
    } finally {
      setSaving(false);
    }
  }

  const initials =
    `${form.firstName?.charAt(0) ?? ""}${form.lastName?.charAt(0) ?? ""}`.toUpperCase() ||
    form.name?.charAt(0)?.toUpperCase() ||
    "V";

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-2 border-[#E5E7EB] border-t-[#03045E]" />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#03045E]/10 bg-[#F7F3EA]">
        <div className="mx-auto max-w-6xl px-6 py-12 lg:px-10">
          <Link
            href="/profile"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to profile
          </Link>

          <div className="mt-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#C6A15B]">
              PROFILE
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
              Edit your profile
            </h1>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B]">
              Update your personal details.
            </p>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-4xl px-6 py-10 lg:px-10">
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* PHOTO */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_45px_rgba(3,4,94,0.05)] md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PROFILE PHOTO
            </p>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#03045E] to-[#0D21A1] font-serif text-3xl font-semibold text-white shadow-lg">
                {initials}
              </div>

              <div>
                <h2 className="text-lg font-semibold">
                  Profile picture
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  Photo upload isn't available yet — coming soon.
                </p>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="rounded-[30px] border border-[#03045E]/10 bg-white p-7 shadow-[0_15px_45px_rgba(3,4,94,0.05)] md:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#C6A15B]">
              PERSONAL DETAILS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Tell us about yourself
            </h2>

            <div className="mt-7 grid gap-5 md:grid-cols-2">

              <Input
                label="First name"
                value={form.firstName}
                onChange={(v) => updateField("firstName", v)}
              />

              <Input
                label="Last name"
                value={form.lastName}
                onChange={(v) => updateField("lastName", v)}
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={() => {}}
                disabled
              />

              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
              />

              <Input
                label="City"
                value={form.city}
                onChange={(v) => updateField("city", v)}
              />

              <Input
                label="Country"
                value={form.country}
                onChange={(v) => updateField("country", v)}
              />

            </div>

            <div className="mt-5">
              <label className="text-sm font-semibold">
                About you
              </label>

              <textarea
                rows={5}
                value={form.bio}
                onChange={(e) => updateField("bio", e.target.value)}
                className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8F0] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#03045E] focus:bg-white focus:ring-4 focus:ring-[#03045E]/5"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {/* ACTIONS */}
          <div className="flex flex-col gap-3 rounded-2xl border border-[#03045E]/10 bg-white p-4 shadow-[0_10px_35px_rgba(3,4,94,0.08)] sm:flex-row sm:items-center sm:justify-between">
            <div>
              {saved ? (
                <p className="text-sm font-semibold text-emerald-700">
                  ✓ Profile updated successfully
                </p>
              ) : (
                <p className="text-xs text-[#94A3B8]">
                  Changes will be saved to your account.
                </p>
              )}
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => router.push("/profile")}
                className="rounded-xl border border-[#E2E8F0] px-6 py-3 text-sm font-semibold text-[#64748B] transition hover:border-[#03045E] hover:text-[#03045E]"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Saving..." : "Save changes"}
              </button>
            </div>
          </div>

        </form>
      </section>
    </main>
  );
}

/* INPUT */

function Input({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold">
        {label}
      </label>

      <input
        type={type}
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFAF8] px-4 py-3.5 text-sm outline-none transition focus:border-[#03045E] focus:bg-white focus:ring-4 focus:ring-[#03045E]/5 disabled:cursor-not-allowed disabled:opacity-60"
      />
    </div>
  );
}