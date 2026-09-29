"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { ArrowLeft, Eye, EyeOff, LockKeyhole } from "lucide-react";

export default function ChangePasswordPage() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("New password must be at least 8 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError("New password must be different from your current password.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/settings/security/password", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || "Unable to change password.");
      }

      setSuccess("Password changed successfully.");

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-[#03045E]">
      <section className="border-b border-[#03045E]/10">
        <div className="mx-auto max-w-5xl px-6 py-14 lg:px-10">
          <Link
            href="/settings/security"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#03045E]/70 transition hover:text-[#03045E]"
          >
            <ArrowLeft size={16} />
            Security
          </Link>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.3em] text-[#C99A3E]">
            LOGIN
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold md:text-5xl">
            Change password
          </h1>

          <p className="mt-4 max-w-2xl text-base text-[#4F6680]">
            Update the password you use to sign in to your Vistara account.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">
        <div className="max-w-2xl rounded-[28px] border border-[#03045E]/10 bg-white p-7 shadow-[0_20px_60px_rgba(3,4,94,0.06)] md:p-10">
          <div className="mb-8 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#F5F7FF]">
              <LockKeyhole className="h-5 w-5 text-[#0D21A1]" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-semibold">
                Password
              </h2>

              <p className="mt-1 text-sm text-[#4F6680]">
                Choose a strong password you have not used before.
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <PasswordField
              label="Current password"
              value={currentPassword}
              onChange={setCurrentPassword}
              show={showCurrent}
              setShow={setShowCurrent}
            />

            <PasswordField
              label="New password"
              value={newPassword}
              onChange={setNewPassword}
              show={showNew}
              setShow={setShowNew}
            />

            <PasswordField
              label="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              setShow={setShowConfirm}
            />

            {error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </div>
            )}

            {success && (
              <div className="rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                {success}
              </div>
            )}

            <div className="flex flex-col gap-3 border-t border-[#03045E]/10 pt-6 sm:flex-row sm:justify-end">
              <Link
                href="/settings/security"
                className="rounded-xl border border-[#03045E]/20 px-6 py-3 text-center text-sm font-semibold text-[#03045E] transition hover:bg-[#F5F7FF]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Changing..." : "Change password"}
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  setShow: (value: boolean) => void;
};

function PasswordField({
  label,
  value,
  onChange,
  show,
  setShow,
}: PasswordFieldProps) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-[#03045E]">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-xl border border-[#03045E]/15 bg-white px-4 py-3 pr-12 text-sm text-[#03045E] outline-none transition placeholder:text-gray-400 focus:border-[#0D21A1] focus:ring-2 focus:ring-[#0D21A1]/10"
          placeholder="Enter password"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#03045E]/50 hover:text-[#03045E]"
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}