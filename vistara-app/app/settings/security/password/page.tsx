"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";
import {
  ArrowLeft,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  KeyRound,
  X,
} from "lucide-react";

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

  const passwordChecks = useMemo(
    () => ({
      length: newPassword.length >= 8,
      uppercase: /[A-Z]/.test(newPassword),
      lowercase: /[a-z]/.test(newPassword),
      number: /\d/.test(newPassword),
      special: /[^A-Za-z0-9]/.test(newPassword),
    }),
    [newPassword]
  );

  const strength = useMemo(() => {
    if (!newPassword) {
      return {
        label: "Not set",
        width: "0%",
      };
    }

    const score =
      Object.values(passwordChecks).filter(Boolean).length;

    if (score <= 2) {
      return {
        label: "Weak",
        width: "35%",
      };
    }

    if (score === 3 || score === 4) {
      return {
        label: "Good",
        width: "70%",
      };
    }

    return {
      label: "Strong",
      width: "100%",
    };
  }, [newPassword, passwordChecks]);

  const passwordsMatch =
    confirmPassword.length > 0 &&
    newPassword === confirmPassword;

  async function handleSubmit(
    e: FormEvent<HTMLFormElement>
  ) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (
      !currentPassword ||
      !newPassword ||
      !confirmPassword
    ) {
      setError("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError(
        "Your new password must contain at least 8 characters."
      );
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Your new passwords do not match.");
      return;
    }

    if (currentPassword === newPassword) {
      setError(
        "Your new password must be different from your current password."
      );
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        "/api/settings/security/password",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            currentPassword,
            newPassword,
          }),
        }
      );

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Unable to change password."
        );
      }

      setSuccess(
        "Your password has been changed successfully."
      );

      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to change your password."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-white text-black">
      {/* HEADER */}
      <header className="border-b border-black/10">
        <div className="mx-auto max-w-4xl px-5 py-7 sm:px-6 sm:py-8">
          <Link
            href="/settings/security"
            className="inline-flex items-center gap-2 text-xs font-semibold text-black/55 transition hover:text-black"
          >
            <ArrowLeft size={15} />
            Back to security
          </Link>

          <div className="mt-7">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
              ACCOUNT SECURITY
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
              Change password
            </h1>

            <p className="mt-2 max-w-xl text-sm font-medium leading-6 text-black/55">
              Update your password to keep your Vistara account
              secure.
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-4xl px-5 py-7 sm:px-6 sm:py-9">
        <div className="rounded-2xl border border-black/10 bg-white">
          {/* FORM HEADER */}
          <div className="flex items-center gap-3 border-b border-black/10 px-5 py-5 sm:px-7">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-white">
              <KeyRound size={18} />
            </div>

            <div>
              <h2 className="text-base font-bold">
                Update password
              </h2>

              <p className="mt-0.5 text-xs font-medium text-black/50">
                Enter your current password and choose a new one.
              </p>
            </div>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-5 px-5 py-6 sm:px-7 sm:py-7"
          >
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

            {/* STRENGTH */}
            {newPassword && (
              <div className="rounded-xl border border-black/10 bg-black/[0.02] p-4">
                <div className="flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em]">
                    Password strength
                  </p>

                  <span className="text-xs font-bold">
                    {strength.label}
                  </span>
                </div>

                <div className="mt-2 h-1 overflow-hidden rounded-full bg-black/10">
                  <div
                    className="h-full rounded-full bg-black transition-all duration-300"
                    style={{
                      width: strength.width,
                    }}
                  />
                </div>

                <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  <PasswordRequirement
                    valid={passwordChecks.length}
                    text="At least 8 characters"
                  />

                  <PasswordRequirement
                    valid={passwordChecks.uppercase}
                    text="One uppercase letter"
                  />

                  <PasswordRequirement
                    valid={passwordChecks.lowercase}
                    text="One lowercase letter"
                  />

                  <PasswordRequirement
                    valid={passwordChecks.number}
                    text="One number"
                  />

                  <PasswordRequirement
                    valid={passwordChecks.special}
                    text="One special character"
                  />
                </div>
              </div>
            )}

            <PasswordField
              label="Confirm new password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              show={showConfirm}
              setShow={setShowConfirm}
            />

            {/* MATCH */}
            {confirmPassword && (
              <div
                className={`flex items-center gap-2 text-xs font-bold ${
                  passwordsMatch
                    ? "text-black"
                    : "text-black/50"
                }`}
              >
                {passwordsMatch ? (
                  <>
                    <CheckCircle2 size={14} />
                    Passwords match
                  </>
                ) : (
                  <>
                    <X size={14} />
                    Passwords do not match
                  </>
                )}
              </div>
            )}

            {/* ERROR */}
            {error && (
              <div className="rounded-xl border border-black/15 bg-black/[0.03] px-4 py-3 text-xs font-semibold text-black">
                <div className="flex items-start gap-2">
                  <X size={15} className="mt-0.5 shrink-0" />
                  <p>{error}</p>
                </div>
              </div>
            )}

            {/* SUCCESS */}
            {success && (
              <div className="rounded-xl border border-black/15 bg-black/[0.03] px-4 py-3 text-xs font-semibold text-black">
                <div className="flex items-start gap-2">
                  <CheckCircle2
                    size={15}
                    className="mt-0.5 shrink-0"
                  />
                  <p>{success}</p>
                </div>
              </div>
            )}

            {/* ACTIONS */}
            <div className="flex flex-col gap-3 border-t border-black/10 pt-5 sm:flex-row sm:justify-end">
              <Link
                href="/settings/security"
                className="rounded-xl border border-black/15 px-5 py-2.5 text-center text-xs font-bold text-black transition hover:bg-black hover:text-white"
              >
                Cancel
              </Link>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-black px-6 py-2.5 text-xs font-bold text-white transition hover:bg-black/80 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading
                  ? "Updating..."
                  : "Update password"}
              </button>
            </div>
          </form>
        </div>

        <p className="mt-5 text-center text-[11px] font-medium text-black/40">
          Never share your password with anyone.
        </p>
      </section>
    </main>
  );
}

/* ================= PASSWORD FIELD ================= */

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
      <label className="mb-1.5 block text-xs font-bold text-black">
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Enter password"
          autoComplete={
            label === "Current password"
              ? "current-password"
              : "new-password"
          }
          className="w-full rounded-xl border border-black/15 bg-white px-4 py-3 pr-11 text-sm font-medium text-black outline-none transition placeholder:text-black/30 focus:border-black focus:ring-2 focus:ring-black/5"
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded-lg p-2 text-black/45 transition hover:bg-black/5 hover:text-black"
          aria-label={
            show ? "Hide password" : "Show password"
          }
        >
          {show ? (
            <EyeOff size={17} />
          ) : (
            <Eye size={17} />
          )}
        </button>
      </div>
    </div>
  );
}

/* ================= REQUIREMENT ================= */

function PasswordRequirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          valid
            ? "bg-black text-white"
            : "border border-black/15 bg-white text-black/30"
        }`}
      >
        {valid && (
          <Check size={10} strokeWidth={3} />
        )}
      </span>

      <span
        className={`text-[11px] font-semibold ${
          valid ? "text-black" : "text-black/45"
        }`}
      >
        {text}
      </span>
    </div>
  );
}