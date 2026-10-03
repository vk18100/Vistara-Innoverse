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
  LockKeyhole,
  ShieldCheck,
  X,
} from "lucide-react";

const COLORS = {
  cream: "#FAF8F3",
  softCream: "#F4EEE5",
  card: "#FFFFFF",
  terracotta: "#B76545",
  terracottaDark: "#965039",
  olive: "#68705A",
  brown: "#2C2420",
  muted: "#756D67",
  border: "#E5DED6",
  gold: "#C6A15B",
};

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
        score: 0,
        width: "0%",
      };
    }

    const score = Object.values(passwordChecks).filter(Boolean).length;

    if (score <= 2) {
      return {
        label: "Weak",
        score,
        width: "35%",
      };
    }

    if (score === 3 || score === 4) {
      return {
        label: "Good",
        score,
        width: "70%",
      };
    }

    return {
      label: "Strong",
      score,
      width: "100%",
    };
  }, [newPassword, passwordChecks]);

  const passwordsMatch =
    confirmPassword.length > 0 && newPassword === confirmPassword;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setError("");
    setSuccess("");

    if (!currentPassword || !newPassword || !confirmPassword) {
      setError("Please complete all password fields.");
      return;
    }

    if (newPassword.length < 8) {
      setError("Your new password must contain at least 8 characters.");
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

      setSuccess("Your password has been changed successfully.");

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
    <main
      className="min-h-screen"
      style={{
        backgroundColor: COLORS.cream,
        color: COLORS.brown,
      }}
    >
      {/* HEADER */}
      <header
        className="border-b"
        style={{
          backgroundColor: COLORS.softCream,
          borderColor: COLORS.border,
        }}
      >
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10">
          <Link
            href="/settings/security"
            className="inline-flex items-center gap-2 text-sm font-medium transition"
            style={{ color: COLORS.muted }}
          >
            <ArrowLeft size={16} />
            Back to security
          </Link>

          <div className="mt-8 max-w-3xl">
            <div className="flex items-center gap-3">
              <span
                className="h-px w-8"
                style={{ backgroundColor: COLORS.gold }}
              />

              <p
                className="text-xs font-bold uppercase tracking-[0.28em]"
                style={{ color: COLORS.olive }}
              >
                ACCOUNT SECURITY
              </p>
            </div>

            <h1
              className="mt-4 font-serif text-4xl font-semibold tracking-tight sm:text-5xl"
              style={{ color: COLORS.brown }}
            >
              Change your password
            </h1>

            <p
              className="mt-4 max-w-2xl text-sm leading-7 sm:text-base"
              style={{ color: COLORS.muted }}
            >
              Keep your Vistara account protected with a strong password that
              only you know.
            </p>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
          {/* PASSWORD FORM */}
          <div
            className="rounded-[28px] border p-6 shadow-[0_18px_55px_rgba(44,36,32,0.06)] sm:p-8 lg:p-10"
            style={{
              backgroundColor: COLORS.card,
              borderColor: COLORS.border,
            }}
          >
            {/* FORM HEADER */}
            <div className="flex items-start gap-4">
              <div
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: "#F3E7DC",
                  color: COLORS.terracotta,
                }}
              >
                <KeyRound size={21} />
              </div>

              <div>
                <h2
                  className="font-serif text-2xl font-semibold"
                  style={{ color: COLORS.brown }}
                >
                  Update password
                </h2>

                <p
                  className="mt-1 text-sm leading-6"
                  style={{ color: COLORS.muted }}
                >
                  Enter your current password, then choose a new one.
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
              {/* CURRENT PASSWORD */}
              <PasswordField
                label="Current password"
                value={currentPassword}
                onChange={setCurrentPassword}
                show={showCurrent}
                setShow={setShowCurrent}
                accent={COLORS.terracotta}
              />

              <div
                className="border-t pt-2"
                style={{ borderColor: COLORS.border }}
              />

              {/* NEW PASSWORD */}
              <PasswordField
                label="New password"
                value={newPassword}
                onChange={setNewPassword}
                show={showNew}
                setShow={setShowNew}
                accent={COLORS.terracotta}
              />

              {/* STRENGTH */}
              {newPassword && (
                <div
                  className="rounded-2xl border p-4"
                  style={{
                    backgroundColor: COLORS.cream,
                    borderColor: COLORS.border,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <p
                      className="text-xs font-bold uppercase tracking-[0.16em]"
                      style={{ color: COLORS.olive }}
                    >
                      Password strength
                    </p>

                    <span
                      className="text-xs font-semibold"
                      style={{
                        color:
                          strength.label === "Weak"
                            ? "#A84D3B"
                            : strength.label === "Good"
                              ? COLORS.gold
                              : COLORS.olive,
                      }}
                    >
                      {strength.label}
                    </span>
                  </div>

                  <div
                    className="mt-3 h-1.5 overflow-hidden rounded-full"
                    style={{ backgroundColor: "#E7DED5" }}
                  >
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: strength.width,
                        backgroundColor:
                          strength.label === "Weak"
                            ? "#A84D3B"
                            : strength.label === "Good"
                              ? COLORS.gold
                              : COLORS.olive,
                      }}
                    />
                  </div>

                  <div className="mt-4 grid gap-2 sm:grid-cols-2">
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

              {/* CONFIRM */}
              <PasswordField
                label="Confirm new password"
                value={confirmPassword}
                onChange={setConfirmPassword}
                show={showConfirm}
                setShow={setShowConfirm}
                accent={COLORS.terracotta}
              />

              {confirmPassword && (
                <div
                  className="flex items-center gap-2 text-xs font-medium"
                  style={{
                    color: passwordsMatch ? COLORS.olive : "#A84D3B",
                  }}
                >
                  {passwordsMatch ? (
                    <>
                      <CheckCircle2 size={15} />
                      Passwords match
                    </>
                  ) : (
                    <>
                      <X size={15} />
                      Passwords do not match
                    </>
                  )}
                </div>
              )}

              {/* ERROR */}
              {error && (
                <div
                  className="rounded-2xl border px-4 py-4 text-sm"
                  style={{
                    borderColor: "#E9C8C0",
                    backgroundColor: "#FCF1EE",
                    color: "#914535",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <X size={17} className="mt-0.5 shrink-0" />
                    <p>{error}</p>
                  </div>
                </div>
              )}

              {/* SUCCESS */}
              {success && (
                <div
                  className="rounded-2xl border px-4 py-4 text-sm"
                  style={{
                    borderColor: "#CBD7C5",
                    backgroundColor: "#F1F5EE",
                    color: "#53634A",
                  }}
                >
                  <div className="flex items-start gap-3">
                    <CheckCircle2 size={17} className="mt-0.5 shrink-0" />
                    <p>{success}</p>
                  </div>
                </div>
              )}

              {/* ACTIONS */}
              <div
                className="flex flex-col gap-3 border-t pt-6 sm:flex-row sm:justify-end"
                style={{ borderColor: COLORS.border }}
              >
                <Link
                  href="/settings/security"
                  className="rounded-xl border px-6 py-3 text-center text-sm font-semibold transition hover:bg-[#FAF8F3]"
                  style={{
                    borderColor: COLORS.border,
                    color: COLORS.brown,
                  }}
                >
                  Cancel
                </Link>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl px-7 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                  style={{
                    backgroundColor: COLORS.terracotta,
                  }}
                >
                  {loading ? "Updating password..." : "Update password"}
                </button>
              </div>
            </form>
          </div>

          {/* SECURITY SIDE CARD */}
          <aside className="space-y-5">
            <div
              className="rounded-[26px] border p-6"
              style={{
                backgroundColor: COLORS.softCream,
                borderColor: COLORS.border,
              }}
            >
              <div
                className="flex h-11 w-11 items-center justify-center rounded-2xl"
                style={{
                  backgroundColor: "#E7EBD9",
                  color: COLORS.olive,
                }}
              >
                <ShieldCheck size={21} />
              </div>

              <h3
                className="mt-5 font-serif text-xl font-semibold"
                style={{ color: COLORS.brown }}
              >
                Keep your account safe
              </h3>

              <p
                className="mt-2 text-sm leading-6"
                style={{ color: COLORS.muted }}
              >
                A strong, unique password helps protect your personal
                information, bookings and travel activity.
              </p>

              <div
                className="mt-5 space-y-3 border-t pt-5"
                style={{ borderColor: COLORS.border }}
              >
                <SecurityTip text="Never share your password with anyone." />
                <SecurityTip text="Avoid using the same password elsewhere." />
                <SecurityTip text="Use a combination of letters, numbers and symbols." />
              </div>
            </div>

            <div
              className="rounded-[26px] border bg-white p-6"
              style={{ borderColor: COLORS.border }}
            >
              <div
                className="flex h-10 w-10 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: "#F3E7DC",
                  color: COLORS.terracotta,
                }}
              >
                <LockKeyhole size={18} />
              </div>

              <h3
                className="mt-4 text-sm font-semibold"
                style={{ color: COLORS.brown }}
              >
                Your password stays private
              </h3>

              <p
                className="mt-2 text-xs leading-5"
                style={{ color: COLORS.muted }}
              >
                Vistara will never display your password after it has been
                updated.
              </p>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}

/* ---------------- PASSWORD FIELD ---------------- */

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  show: boolean;
  setShow: (value: boolean) => void;
  accent: string;
};

function PasswordField({
  label,
  value,
  onChange,
  show,
  setShow,
  accent,
}: PasswordFieldProps) {
  return (
    <div>
      <label
        className="mb-2 block text-sm font-semibold"
        style={{ color: COLORS.brown }}
      >
        {label}
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter password"
          autoComplete={
            label === "Current password"
              ? "current-password"
              : label === "New password"
                ? "new-password"
                : "new-password"
          }
          className="w-full rounded-xl border bg-white px-4 py-3.5 pr-12 text-sm outline-none transition placeholder:text-[#A39A92]"
          style={{
            borderColor: COLORS.border,
            color: COLORS.brown,
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = accent;
            e.currentTarget.style.boxShadow = `0 0 0 3px ${accent}18`;
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = COLORS.border;
            e.currentTarget.style.boxShadow = "none";
          }}
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 transition"
          style={{ color: COLORS.muted }}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}

/* ---------------- REQUIREMENT ---------------- */

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
        className="flex h-4 w-4 items-center justify-center rounded-full"
        style={{
          backgroundColor: valid ? COLORS.olive : "#E5DED6",
          color: valid ? "#FFFFFF" : COLORS.muted,
        }}
      >
        {valid && <Check size={10} strokeWidth={3} />}
      </span>

      <span
        className="text-xs"
        style={{
          color: valid ? COLORS.olive : COLORS.muted,
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* ---------------- SECURITY TIP ---------------- */

function SecurityTip({ text }: { text: string }) {
  return (
    <div className="flex items-start gap-3">
      <span
        className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
        style={{ backgroundColor: COLORS.terracotta }}
      />

      <p
        className="text-xs leading-5"
        style={{ color: COLORS.muted }}
      >
        {text}
      </p>
    </div>
  );
}