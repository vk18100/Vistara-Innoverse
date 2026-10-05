"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

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
    "S";

  const displayName =
    `${form.firstName} ${form.lastName}`.trim() ||
    form.name ||
    "Sristi Gupta";

  return (
    <main className="min-h-screen bg-white text-black">

      <Navbar />

      {/* ================= HEADER ================= */}

      <section className="border-b border-slate-200 bg-white">

        <div className="mx-auto max-w-5xl px-5 py-7 sm:px-6 lg:px-8">

          <Link
            href="/profile"
            className="inline-flex items-center text-xs font-medium text-slate-500 transition hover:text-black"
          >
            ← Back to profile
          </Link>

          <div className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

            <div>

              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                PROFILE SETTINGS
              </p>

              <h1 className="mt-1.5 text-2xl font-semibold tracking-tight text-black sm:text-3xl">
                Edit your profile
              </h1>

              <p className="mt-1.5 max-w-lg text-xs leading-5 text-slate-500">
                Keep your personal details up to date for a smoother
                Vistara journey.
              </p>

            </div>

            {/* LIVE USER */}

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-xs font-semibold text-white">
                {initials}
              </div>

              <div className="min-w-0">

                <p className="max-w-[180px] truncate text-xs font-semibold text-black">
                  {loading ? "Loading..." : displayName}
                </p>

                <p className="max-w-[200px] truncate text-[10px] text-slate-500">
                  {email || "Your email"}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* ================= FORM ================= */}

      <section className="mx-auto max-w-4xl px-5 py-7 sm:px-6 lg:px-8">

        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* ================= PROFILE ================= */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">

            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              PROFILE
            </p>

            <div className="mt-5 flex items-center gap-4">

              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-black text-lg font-semibold text-white">
                {initials}
              </div>

              <div>

                <h2 className="text-base font-semibold text-black">
                  {loading ? "Your profile" : displayName}
                </h2>

                <p className="mt-1 max-w-md text-xs leading-5 text-slate-500">
                  Your profile information appears throughout your
                  Vistara account.
                </p>

              </div>

            </div>

          </div>

          {/* ================= PERSONAL DETAILS ================= */}

          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">

            <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-slate-500">
              PERSONAL DETAILS
            </p>

            <h2 className="mt-1.5 text-base font-semibold text-black">
              Tell us about yourself
            </h2>

            <p className="mt-1 text-xs text-slate-500">
              Changes you make here will be reflected in your profile.
            </p>

            <div className="mt-5 grid gap-4 md:grid-cols-2">

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

            {/* DISPLAY NAME */}

            <div className="mt-4">

              <label className="text-xs font-semibold text-black">
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
                className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-black outline-none transition placeholder:text-slate-400 focus:border-black focus:bg-white disabled:cursor-wait disabled:opacity-60"
              />

            </div>

            {/* BIO */}

            <div className="mt-4">

              <label className="text-xs font-semibold text-black">
                About you
              </label>

              <textarea
                rows={4}
                value={form.bio}
                disabled={loading}
                onChange={(e) =>
                  updateField("bio", e.target.value)
                }
                placeholder="Tell us a little about yourself and how you like to travel..."
                className="mt-1.5 w-full resize-none rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs leading-5 text-black outline-none transition placeholder:text-slate-400 focus:border-black focus:bg-white disabled:cursor-wait disabled:opacity-60"
              />

              <div className="mt-1 flex justify-end">
                <span className="text-[10px] text-slate-400">
                  {form.bio.length}/500
                </span>
              </div>

            </div>

          </div>

          {/* ================= ERROR ================= */}

          {error && (
            <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          {/* ================= ACTIONS ================= */}

          <div className="sticky bottom-3 z-20 rounded-xl border border-slate-200 bg-white/95 p-3 shadow-lg backdrop-blur">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="min-h-[30px]">

                {saved ? (
                  <div>
                    <p className="text-xs font-semibold text-black">
                      ✓ Profile updated successfully
                    </p>

                    <p className="mt-0.5 text-[10px] text-slate-500">
                      Your latest information is now visible.
                    </p>
                  </div>
                ) : loading ? (
                  <p className="text-[10px] text-slate-500">
                    Loading your profile...
                  </p>
                ) : (
                  <p className="text-[10px] text-slate-500">
                    Your changes will be saved to your account.
                  </p>
                )}

              </div>

              <div className="flex gap-2">

                <button
                  type="button"
                  onClick={() => router.push("/profile")}
                  className="rounded-lg border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-black hover:text-black"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || loading}
                  className="rounded-lg bg-black px-5 py-2 text-xs font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving ? "Saving..." : "Save changes"}
                </button>

              </div>

            </div>

          </div>

        </form>

      </section>

      <Footer />

    </main>
  );
}


/* ============================================================
   INPUT
============================================================ */

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

      <label className="text-xs font-semibold text-black">
        {label}
      </label>

      <input
        type={type}
        value={value}
        disabled={disabled || loading}
        onChange={(e) => onChange(e.target.value)}
        placeholder={
          loading
            ? "Loading..."
            : `Enter ${label.toLowerCase()}`
        }
        className="mt-1.5 w-full rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2.5 text-xs text-black outline-none transition placeholder:text-slate-400 focus:border-black focus:bg-white disabled:cursor-not-allowed disabled:opacity-60"
      />

    </div>
  );
}