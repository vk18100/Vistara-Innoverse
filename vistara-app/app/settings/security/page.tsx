"use client";

import Link from "next/link";
import Navbar from "@/components/navbar";
import { useState } from "react";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  KeyRound,
  ShieldCheck,
  Smartphone,
  Bell,
  Monitor,
  LogOut,
  Mail,
  Phone,
  AlertTriangle,
} from "lucide-react";

export default function SecurityPage() {
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [signedOut, setSignedOut] = useState(false);

  function handleSignOutOtherDevices() {
    setSigningOut(true);

    setTimeout(() => {
      setSigningOut(false);
      setSignedOut(true);
    }, 900);
  }

  return (
    <main className="min-h-screen bg-[#FAFAF7] text-[#292924]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#292924]/10 bg-[#F5F0E7]">
        <div className="mx-auto max-w-6xl px-5 py-11 sm:px-6 sm:py-14 lg:px-10">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#74746C] transition hover:text-[#292924]"
          >
            <ArrowLeft size={16} />
            Settings
          </Link>

          <div className="mt-9 max-w-3xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B18A45]">
              ACCOUNT SECURITY
            </p>

            <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#292924] sm:text-5xl">
              Security
            </h1>

            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#6F6F67] sm:text-base">
              Manage how your Vistara account is protected, review your
              signed-in devices and control security notifications.
            </p>
          </div>
        </div>
      </section>

      {/* SECURITY STATUS */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-6 lg:px-10 lg:py-12">
        <div className="rounded-[28px] border border-[#B18A45]/20 bg-white p-6 shadow-[0_16px_45px_rgba(50,45,35,0.05)] sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F5F0E7]">
                <ShieldCheck
                  size={22}
                  className="text-[#B18A45]"
                  strokeWidth={1.8}
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B18A45]">
                  SECURITY STATUS
                </p>

                <h2 className="mt-1 font-serif text-2xl font-semibold">
                  Your account security
                </h2>

                <p className="mt-2 max-w-xl text-sm leading-6 text-[#74746C]">
                  Review the security options below to keep your account
                  protected.
                </p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-[#D9E8D9] bg-[#F3F8F2] px-4 py-2">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#4F7D50] text-white">
                <Check size={12} />
              </span>

              <span className="text-xs font-bold tracking-wide text-[#4F7D50]">
                ACCOUNT PROTECTED
              </span>
            </div>
          </div>
        </div>

        <div className="mt-6 space-y-6">

          {/* PASSWORD */}
          <SecurityCard
            icon={<KeyRound size={20} />}
            eyebrow="LOGIN"
            title="Password"
            description="Use a strong password that is unique to your Vistara account."
          >
            <div className="flex flex-col gap-4 rounded-2xl border border-[#E6E2D9] bg-[#FAF9F5] p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-semibold text-[#292924]">
                  Account password
                </p>

                <p className="mt-1 text-xs leading-5 text-[#77776F]">
                  Change the password you use when signing in to Vistara.
                </p>
              </div>

              <Link
                href="/settings/security/password"
                className="inline-flex w-fit items-center justify-center gap-2 rounded-xl border border-[#292924]/20 bg-white px-5 py-2.5 text-sm font-semibold text-[#292924] transition hover:border-[#B18A45] hover:bg-[#F5F0E7]"
              >
                Change password
                <ChevronRight size={15} />
              </Link>
            </div>
          </SecurityCard>

          {/* TWO FACTOR */}
          <SecurityCard
            icon={<Smartphone size={20} />}
            eyebrow="EXTRA PROTECTION"
            title="Two-factor authentication"
            description="Require an additional verification step when signing in."
          >
            <SecurityToggle
              title="Two-factor authentication"
              description={
                twoFactor
                  ? "Extra verification is currently enabled for your account."
                  : "Add another verification step to protect your account."
              }
              checked={twoFactor}
              onChange={() => setTwoFactor(!twoFactor)}
            />

            {twoFactor && (
              <div className="mt-4 rounded-2xl border border-[#B18A45]/20 bg-[#FBF8F1] p-5">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={18}
                    className="mt-0.5 shrink-0 text-[#B18A45]"
                  />

                  <div>
                    <p className="text-sm font-semibold">
                      Two-factor authentication is enabled
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#77776F]">
                      A second verification step will be required when
                      signing in from a new device.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </SecurityCard>

          {/* LOGIN ALERTS */}
          <SecurityCard
            icon={<Bell size={20} />}
            eyebrow="NOTIFICATIONS"
            title="Security notifications"
            description="Stay informed about important activity on your account."
          >
            <SecurityToggle
              title="New login alerts"
              description="Get notified when your account is accessed from a new device."
              checked={loginAlerts}
              onChange={() => setLoginAlerts(!loginAlerts)}
            />
          </SecurityCard>

          {/* RECOVERY */}
          <SecurityCard
            icon={<ShieldCheck size={20} />}
            eyebrow="RECOVERY"
            title="Account recovery"
            description="Your recovery information can help you regain access to your account."
          >
            <div className="divide-y divide-[#292924]/10">

              <RecoveryRow
                icon={<Mail size={18} />}
                title="Recovery email"
                value="sristigupta@example.com"
                verified
              />

              <RecoveryRow
                icon={<Phone size={18} />}
                title="Recovery phone"
                value="Not added"
                verified={false}
              />

            </div>
          </SecurityCard>

          {/* ACTIVE SESSIONS */}
          <SecurityCard
            icon={<Monitor size={20} />}
            eyebrow="DEVICES"
            title="Where you're signed in"
            description="Review the devices currently connected to your Vistara account."
          >
            <div className="rounded-2xl border border-[#E6E2D9] bg-[#FAF9F5] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white border border-[#E6E2D9]">
                    <Monitor
                      size={19}
                      className="text-[#77776F]"
                    />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold">
                        Current browser
                      </p>

                      <span className="rounded-full bg-[#F3F8F2] px-2.5 py-1 text-[10px] font-bold tracking-wide text-[#4F7D50]">
                        THIS DEVICE
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[#77776F]">
                      Windows · Chrome · Current session
                    </p>
                  </div>
                </div>

                <span className="text-xs font-medium text-[#77776F]">
                  Active now
                </span>
              </div>
            </div>

            {signedOut && (
              <div className="mt-4 rounded-2xl border border-[#D9E8D9] bg-[#F3F8F2] px-4 py-3 text-sm text-[#4F7D50]">
                Other active sessions have been signed out.
              </div>
            )}

            <button
              type="button"
              onClick={handleSignOutOtherDevices}
              disabled={signingOut}
              className="mt-5 inline-flex items-center gap-2 rounded-xl border border-[#292924]/20 bg-white px-5 py-3 text-sm font-semibold text-[#292924] transition hover:border-[#B18A45] hover:bg-[#F5F0E7] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogOut size={16} />
              {signingOut
                ? "Signing out..."
                : "Sign out other devices"}
            </button>
          </SecurityCard>

          {/* SECURITY ACTIVITY */}
          <SecurityCard
            icon={<ShieldCheck size={20} />}
            eyebrow="RECENT ACTIVITY"
            title="Security activity"
            description="Keep track of important changes made to your account."
          >
            <div className="space-y-3">

              <ActivityRow
                title="Current session"
                description="Signed in from your current browser"
                time="Active now"
              />

              <ActivityRow
                title="Security settings viewed"
                description="You opened your account security settings"
                time="Recently"
              />

              <ActivityRow
                title="Password"
                description="Password activity will appear here after changes"
                time="No recent change"
              />

            </div>
          </SecurityCard>

          {/* DANGER */}
          <div className="rounded-[28px] border border-[#D8B4A8] bg-[#FFF9F6] p-6 sm:p-8">
            <div className="flex items-start gap-4">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#FCEDE8]">
                <AlertTriangle
                  size={19}
                  className="text-[#A65D49]"
                />
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#A65D49]">
                  ACCOUNT ACCESS
                </p>

                <h2 className="mt-2 font-serif text-2xl font-semibold text-[#292924]">
                  Sign out everywhere
                </h2>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-[#77776F]">
                  If you think someone else may have access to your account,
                  sign out from other devices and then change your password.
                </p>

                <button
                  type="button"
                  className="mt-5 rounded-xl border border-[#A65D49]/30 bg-white px-5 py-3 text-sm font-semibold text-[#8E4E3D] transition hover:bg-[#FCEDE8]"
                >
                  Sign out everywhere
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

/* ------------------------------------------------ */
/* SECURITY CARD */
/* ------------------------------------------------ */

function SecurityCard({
  icon,
  eyebrow,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  eyebrow: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[28px] border border-[#292924]/10 bg-white p-6 shadow-[0_16px_45px_rgba(50,45,35,0.045)] sm:p-8">

      <div className="flex items-start gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#F5F0E7] text-[#B18A45]">
          {icon}
        </div>

        <div>
          <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#B18A45]">
            {eyebrow}
          </p>

          <h2 className="mt-1 font-serif text-2xl font-semibold text-[#292924]">
            {title}
          </h2>

          <p className="mt-2 text-sm leading-6 text-[#77776F]">
            {description}
          </p>
        </div>

      </div>

      <div className="mt-7">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------ */
/* TOGGLE */
/* ------------------------------------------------ */

function SecurityToggle({
  title,
  description,
  checked,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-t border-[#292924]/10 pt-6">

      <div>
        <p className="text-sm font-semibold text-[#292924]">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-[#77776F]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          checked ? "bg-[#B18A45]" : "bg-[#C9C7BF]"
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition ${
            checked ? "right-1" : "left-1"
          }`}
        />
      </button>

    </div>
  );
}

/* ------------------------------------------------ */
/* RECOVERY ROW */
/* ------------------------------------------------ */

function RecoveryRow({
  icon,
  title,
  value,
  verified,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  verified: boolean;
}) {
  return (
    <div className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between">

      <div className="flex items-center gap-3">
        <div className="text-[#77776F]">
          {icon}
        </div>

        <div>
          <p className="text-sm font-semibold">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#77776F]">
            {value}
          </p>
        </div>
      </div>

      {verified ? (
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-[#F3F8F2] px-3 py-1.5 text-xs font-semibold text-[#4F7D50]">
          <Check size={13} />
          Verified
        </span>
      ) : (
        <span className="w-fit rounded-full bg-[#F5F0E7] px-3 py-1.5 text-xs font-semibold text-[#8A7650]">
          Not added
        </span>
      )}

    </div>
  );
}

/* ------------------------------------------------ */
/* ACTIVITY ROW */
/* ------------------------------------------------ */

function ActivityRow({
  title,
  description,
  time,
}: {
  title: string;
  description: string;
  time: string;
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl border border-[#E6E2D9] bg-[#FAF9F5] p-4">

      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-[#B18A45]" />

        <div>
          <p className="text-sm font-semibold text-[#292924]">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#77776F]">
            {description}
          </p>
        </div>
      </div>

      <span className="shrink-0 text-[11px] font-medium text-[#92928A]">
        {time}
      </span>

    </div>
  );
}