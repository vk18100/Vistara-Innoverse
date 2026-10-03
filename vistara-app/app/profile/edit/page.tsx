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

const emptyForm: ProfileData = {
  name: "",
  phone: "",
  firstName: "",
  lastName: "",
  bio: "",
  city: "",
  country: "",
};

export default function EditProfile() {
  const router = useRouter();

  const [form, setForm] = useState<ProfileData>(emptyForm);
  const [email, setEmail] = useState("");

  // Page no longer gets replaced by a full-screen spinner.
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("/api/profile", {
          credentials: "include",
          cache: "no-store",
        });

        const result = await response.json();

        if (!response.ok || !result.success) {
          throw new Error(
            result.message || "Unable to load your profile."
          );
        }

        if (!mounted) return;

        setEmail(result.user?.email ?? "");

        setForm({
          name: result.user?.name ?? "",
          phone: result.user?.phone ?? "",
          firstName: result.profile?.firstName ?? "",
          lastName: result.profile?.lastName ?? "",
          bio: result.profile?.bio ?? "",
          city: result.profile?.city ?? "",
          country: result.profile?.country ?? "",
        });
      } catch (err) {
        if (!mounted) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your profile."
        );
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      mounted = false;
    };
  }, []);

  function updateField<K extends keyof ProfileData>(
    key: K,
    value: ProfileData[K]
  ) {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));

    setSaved(false);
    setError("");
  }

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    if (saving) return;

    setSaving(true);
    setSaved(false);
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

      // Keep the screen updated immediately.
      if (result.user) {
        setEmail(result.user.email ?? email);

        setForm((prev) => ({
          ...prev,
          name: result.user.name ?? prev.name,
          phone: result.user.phone ?? prev.phone,
        }));
      }

      if (result.profile) {
        setForm((prev) => ({
          ...prev,
          firstName:
            result.profile.firstName ?? prev.firstName,
          lastName:
            result.profile.lastName ?? prev.lastName,
          bio: result.profile.bio ?? prev.bio,
          city: result.profile.city ?? prev.city,
          country: result.profile.country ?? prev.country,
        }));
      }

      setSaved(true);

      window.setTimeout(() => {
        setSaved(false);
      }, 3000);
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
    `${form.firstName?.charAt(0) ?? ""}${form.lastName?.charAt(0) ?? ""}`
      .toUpperCase() ||
    form.name?.charAt(0)?.toUpperCase() ||
    "V";

  const displayName =
    `${form.firstName} ${form.lastName}`.trim() ||
    form.name ||
    "Your profile";

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-10 lg:py-12">
          <Link
            href="/profile"
            className="inline-flex items-center text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            ← Back to profile
          </Link>

          <div className="mt-7 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B76545]">
                PROFILE SETTINGS
              </p>

              <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Edit your profile
              </h1>

              <p className="mt-3 max-w-xl text-sm leading-6 text-[#756D67] sm:text-base">
                Keep your personal details up to date for a smoother
                Vistara journey.
              </p>
            </div>

            {/* LIVE NAME */}
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2C2420] font-serif font-semibold text-white">
                {initials}
              </div>

              <div className="min-w-0">
                <p className="max-w-[180px] truncate text-sm font-semibold">
                  {loading ? "Loading..." : displayName}
                </p>

                <p className="max-w-[200px] truncate text-xs text-[#756D67]">
                  {email || "Your email"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FORM */}
      <section className="mx-auto max-w-4xl px-5 py-8 sm:px-6 lg:px-10 lg:py-12">
        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >
          {/* PROFILE PHOTO */}
          <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.05)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              PROFILE
            </p>

            <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-full bg-[#2C2420] font-serif text-3xl font-semibold text-white shadow-md">
                {initials}
              </div>

              <div>
                <h2 className="font-serif text-2xl font-semibold">
                  {loading ? "Your profile" : displayName}
                </h2>

                <p className="mt-2 text-sm leading-6 text-[#756D67]">
                  Your profile information appears throughout your
                  Vistara account.
                </p>
              </div>
            </div>
          </div>

          {/* PERSONAL DETAILS */}
          <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.05)] sm:p-8">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
              PERSONAL DETAILS
            </p>

            <h2 className="mt-2 font-serif text-2xl font-semibold">
              Tell us about yourself
            </h2>

            <p className="mt-2 text-sm text-[#756D67]">
              Changes you make here will be reflected in your profile.
            </p>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              <Input
                label="First name"
                value={form.firstName}
                onChange={(value) =>
                  updateField("firstName", value)
                }
                loading={loading}
              />

              <Input
                label="Last name"
                value={form.lastName}
                onChange={(value) =>
                  updateField("lastName", value)
                }
                loading={loading}
              />

              <Input
                label="Email"
                type="email"
                value={email}
                onChange={() => {}}
                disabled
                loading={loading}
              />

              <Input
                label="Phone"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
                loading={loading}
              />

              <Input
                label="City"
                value={form.city}
                onChange={(value) =>
                  updateField("city", value)
                }
                loading={loading}
              />

              <Input
                label="Country"
                value={form.country}
                onChange={(value) =>
                  updateField("country", value)
                }
                loading={loading}
              />
            </div>

            {/* NAME */}
            <div className="mt-5">
              <label className="text-sm font-semibold">
                Display name
              </label>

              <input
                type="text"
                value={form.name}
                onChange={(e) =>
                  updateField("name", e.target.value)
                }
                disabled={loading}
                placeholder="How should we display your name?"
                className="mt-2 w-full rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] px-4 py-3.5 text-sm outline-none transition placeholder:text-[#756D67]/60 focus:border-[#B76545] focus:bg-white focus:ring-4 focus:ring-[#B76545]/10 disabled:cursor-wait disabled:opacity-60"
              />
            </div>

            {/* BIO */}
            <div className="mt-5">
              <label className="text-sm font-semibold">
                About you
              </label>

              <textarea
                rows={5}
                value={form.bio}
                disabled={loading}
                onChange={(e) =>
                  updateField("bio", e.target.value)
                }
                placeholder="Tell us a little about yourself and how you like to travel..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] px-4 py-3.5 text-sm leading-6 outline-none transition placeholder:text-[#756D67]/60 focus:border-[#B76545] focus:bg-white focus:ring-4 focus:ring-[#B76545]/10 disabled:cursor-wait disabled:opacity-60"
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-[#756D67]">
                  {form.bio.length}/500
                </span>
              </div>
            </div>
          </div>

          {/* ERROR */}
          {error && (
            <div className="rounded-2xl border border-red-100 bg-red-50 px-4 py-3.5 text-sm text-red-600">
              {error}
            </div>
          )}

          {/* ACTIONS */}
          <div className="sticky bottom-3 z-20 rounded-2xl border border-[#E5DED6] bg-white/95 p-3 shadow-[0_12px_40px_rgba(44,36,32,0.12)] backdrop-blur sm:p-4">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-h-[38px]">
                {saved ? (
                  <div>
                    <p className="text-sm font-semibold text-[#68705A]">
                      ✓ Profile updated successfully
                    </p>

                    <p className="mt-0.5 text-xs text-[#756D67]">
                      Your latest information is now visible.
                    </p>
                  </div>
                ) : loading ? (
                  <p className="text-xs text-[#756D67]">
                    Loading your profile...
                  </p>
                ) : (
                  <p className="text-xs text-[#756D67]">
                    Your changes will be saved to your account.
                  </p>
                )}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="flex-1 rounded-xl border border-[#E5DED6] px-5 py-3 text-sm font-semibold text-[#756D67] transition hover:border-[#2C2420] hover:text-[#2C2420] sm:flex-none"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || loading}
                  className="flex-1 rounded-xl bg-[#B76545] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#965039] disabled:cursor-not-allowed disabled:opacity-50 sm:flex-none"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>
              </div>
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}

/* ================= INPUT ================= */

function Input({
  label,
  value,
  onChange,
  type = "text",
  disabled = false,
  loading = false,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  disabled?: boolean;
  loading?: boolean;
}) {
  return (
    <div>
      <label className="text-sm font-semibold text-[#2C2420]">
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          value={value}
          disabled={disabled || loading}
          onChange={(e) => onChange(e.target.value)}
          placeholder={loading ? "Loading..." : `Enter ${label.toLowerCase()}`}
          className="mt-2 w-full rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] px-4 py-3.5 text-sm text-[#2C2420] outline-none transition placeholder:text-[#756D67]/50 focus:border-[#B76545] focus:bg-white focus:ring-4 focus:ring-[#B76545]/10 disabled:cursor-not-allowed disabled:opacity-60"
        />
      </div>
    </div>
  );
}