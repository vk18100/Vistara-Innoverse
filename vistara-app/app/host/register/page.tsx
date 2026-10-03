"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Home,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export default function HostRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState(false);

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  function updateField(
    field: keyof typeof form,
    value: string,
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess("");

    if (
      !form.firstName ||
      !form.lastName ||
      !form.email ||
      !form.phone ||
      !form.password ||
      !form.confirmPassword
    ) {
      setError("Please complete all required fields.");
      return;
    }

    if (form.password.length < 8) {
      setError(
        "Password must contain at least 8 characters.",
      );
      return;
    }

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role: "HOST",
        }),
      });

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data?.message || "Registration failed.",
        );
      }

      setSuccess(
        "Your host account has been created successfully.",
      );

      setForm({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#18181B]">
      <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">
        {/* LEFT SIDE */}
        <section className="relative hidden overflow-hidden bg-[#18181B] lg:block">
          <img
            src="https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=90"
            alt="Beautiful Vistara property"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-[#18181B] via-[#18181B]/45 to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-10 xl:p-14">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-white"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441] text-[#18181B]">
                <Home size={20} />
              </div>

              <span className="font-serif text-2xl font-semibold">
                Vistara
              </span>
            </Link>

            {/* Content */}
            <div className="max-w-lg pb-8 text-white">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] backdrop-blur">
                <span className="h-1.5 w-1.5 rounded-full bg-[#D9A441]" />
                Become a host
              </span>

              <h1 className="mt-6 font-serif text-5xl font-semibold leading-[1.05] xl:text-6xl">
                Turn your space
                <br />
                into an experience.
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/70">
                Share your property with travelers looking for
                meaningful stays, hidden gems and memorable
                experiences.
              </p>

              <div className="mt-8 space-y-4">
                <Feature
                  title="Verified hosting"
                  description="Build trust with a verified host profile."
                />

                <Feature
                  title="Complete control"
                  description="Manage availability, pricing and bookings."
                />

                <Feature
                  title="Grow with Vistara"
                  description="Reach travelers discovering unique stays."
                />
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8 lg:px-12">
          <div className="w-full max-w-xl">
            {/* Mobile logo */}
            <div className="mb-8 lg:hidden">
              <Link
                href="/"
                className="inline-flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#D9A441] text-[#18181B]">
                  <Home size={20} />
                </div>

                <span className="font-serif text-2xl font-semibold">
                  Vistara
                </span>
              </Link>
            </div>

            {/* Heading */}
            <div className="mb-8">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#9A711E]">
                Host registration
              </p>

              <h2 className="mt-2 font-serif text-4xl font-semibold tracking-tight sm:text-5xl">
                Create your host account
              </h2>

              <p className="mt-3 text-sm leading-6 text-[#71717A]">
                Start your hosting journey with Vistara.
              </p>
            </div>

            {/* Alerts */}
            {error && (
              <div className="mb-5 rounded-xl border border-[#E7B4AD] bg-[#FFF1EF] px-4 py-3 text-sm text-[#8E3D34]">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-5 rounded-xl border border-[#C9D8BC] bg-[#F3F8EE] px-4 py-3 text-sm text-[#4E693E]">
                {success}
              </div>
            )}

            {/* Form */}
            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >
              {/* Name */}
              <div className="grid gap-5 sm:grid-cols-2">
                <Field
                  label="First name"
                  value={form.firstName}
                  onChange={(value) =>
                    updateField("firstName", value)
                  }
                  placeholder="Sristi"
                  required
                />

                <Field
                  label="Last name"
                  value={form.lastName}
                  onChange={(value) =>
                    updateField("lastName", value)
                  }
                  placeholder="Gupta"
                  required
                />
              </div>

              {/* Email */}
              <Field
                label="Email address"
                type="email"
                value={form.email}
                onChange={(value) =>
                  updateField("email", value)
                }
                placeholder="you@example.com"
                required
              />

              {/* Phone */}
              <Field
                label="Phone number"
                type="tel"
                value={form.phone}
                onChange={(value) =>
                  updateField("phone", value)
                }
                placeholder="+91 98765 43210"
                required
              />

              {/* Password */}
              <PasswordField
                label="Password"
                value={form.password}
                show={showPassword}
                onToggle={() =>
                  setShowPassword((current) => !current)
                }
                onChange={(value) =>
                  updateField("password", value)
                }
                placeholder="Minimum 8 characters"
              />

              {/* Confirm Password */}
              <PasswordField
                label="Confirm password"
                value={form.confirmPassword}
                show={showConfirmPassword}
                onToggle={() =>
                  setShowConfirmPassword(
                    (current) => !current,
                  )
                }
                onChange={(value) =>
                  updateField(
                    "confirmPassword",
                    value,
                  )
                }
                placeholder="Re-enter your password"
              />

              {/* Password requirements */}
              <div className="rounded-2xl border border-black/7 bg-white p-4">
                <p className="text-xs font-bold text-[#44403C]">
                  Password requirements
                </p>

                <div className="mt-3 grid gap-2 sm:grid-cols-2">
                  <Requirement
                    checked={form.password.length >= 8}
                    text="At least 8 characters"
                  />

                  <Requirement
                    checked={/[A-Z]/.test(form.password)}
                    text="One uppercase letter"
                  />

                  <Requirement
                    checked={/[0-9]/.test(form.password)}
                    text="One number"
                  />

                  <Requirement
                    checked={/[^A-Za-z0-9]/.test(form.password)}
                    text="One special character"
                  />
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 text-xs leading-5 text-[#71717A]">
                <input
                  type="checkbox"
                  required
                  className="mt-0.5 h-4 w-4 accent-[#D9A441]"
                />

                <span>
                  I agree to Vistara&apos;s{" "}
                  <Link
                    href="/terms"
                    className="font-semibold text-[#8A651B] hover:underline"
                  >
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link
                    href="/privacy"
                    className="font-semibold text-[#8A651B] hover:underline"
                  >
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-2 rounded-xl bg-[#D9A441] px-5 py-3.5 text-sm font-bold text-[#18181B] shadow-[0_12px_30px_rgba(217,164,65,0.20)] transition hover:bg-[#E7C46D] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Creating account..."
                  : "Create host account"}

                {!loading && (
                  <ArrowRight
                    size={17}
                    className="transition-transform group-hover:translate-x-1"
                  />
                )}
              </button>
            </form>

            {/* Login */}
            <div className="mt-7 text-center text-sm text-[#71717A]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-bold text-[#8A651B] hover:underline"
              >
                Sign in
              </Link>
            </div>

            {/* Security */}
            <div className="mt-8 flex items-center justify-center gap-2 text-[11px] text-[#A8A29E]">
              <ShieldCheck size={14} />
              Your information is securely protected.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

/* -------------------------------------------------------------------------- */
/* Field                                                                       */
/* -------------------------------------------------------------------------- */

function Field({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-[#44403C]">
        {label}
        {required && (
          <span className="ml-1 text-[#9A711E]">*</span>
        )}
      </label>

      <input
        type={type}
        value={value}
        onChange={(event) =>
          onChange(event.target.value)
        }
        placeholder={placeholder}
        required={required}
        className="h-12 w-full rounded-xl border border-black/9 bg-white px-4 text-sm text-[#18181B] outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
      />
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Password Field                                                              */
/* -------------------------------------------------------------------------- */

function PasswordField({
  label,
  value,
  show,
  onToggle,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  show: boolean;
  onToggle: () => void;
  onChange: (value: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label className="mb-2 block text-xs font-bold text-[#44403C]">
        {label}
        <span className="ml-1 text-[#9A711E]">*</span>
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(event) =>
            onChange(event.target.value)
          }
          placeholder={placeholder}
          required
          className="h-12 w-full rounded-xl border border-black/9 bg-white px-4 pr-12 text-sm text-[#18181B] outline-none transition placeholder:text-[#A8A29E] focus:border-[#D9A441]/60 focus:ring-4 focus:ring-[#D9A441]/10"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716C] transition hover:text-[#18181B]"
          aria-label={
            show ? "Hide password" : "Show password"
          }
        >
          {show ? (
            <EyeOff size={18} />
          ) : (
            <Eye size={18} />
          )}
        </button>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Requirement                                                                */
/* -------------------------------------------------------------------------- */

function Requirement({
  checked,
  text,
}: {
  checked: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-xs text-[#71717A]">
      <span
        className={`flex h-4 w-4 items-center justify-center rounded-full ${
          checked
            ? "bg-[#D9A441] text-[#18181B]"
            : "bg-[#F1F0EB] text-transparent"
        }`}
      >
        <Check size={10} strokeWidth={3} />
      </span>

      {text}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Feature                                                                     */
/* -------------------------------------------------------------------------- */

function Feature({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#D9A441] text-[#18181B]">
        <Check size={14} strokeWidth={3} />
      </div>

      <div>
        <p className="text-sm font-bold">
          {title}
        </p>

        <p className="mt-0.5 text-xs text-white/55">
          {description}
        </p>
      </div>
    </div>
  );
}