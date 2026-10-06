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
    <main className="min-h-screen bg-white text-[#111]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-black/10 bg-white">
        <div className="mx-auto max-w-6xl px-5 py-8 sm:px-6 sm:py-10 lg:px-10">
          <Link
            href="/settings"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#666] transition hover:text-black"
          >
            <ArrowLeft size={14} />
            Settings
          </Link>

          <div className="mt-7 max-w-3xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#666]">
              ACCOUNT SECURITY
            </p>

            <h1 className="mt-2 text-3xl font-bold tracking-tight text-black sm:text-4xl">
              Security
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#666]">
              Manage how your Vistara account is protected, review your
              signed-in devices and control security notifications.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-6xl px-5 py-7 sm:px-6 lg:px-10 lg:py-9">

        {/* STATUS */}
        <div className="rounded-2xl border border-black/10 bg-white p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                <ShieldCheck size={18} strokeWidth={1.8} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#666]">
                  SECURITY STATUS
                </p>

                <h2 className="mt-1 text-lg font-bold text-black">
                  Your account security
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#666]">
                  Review the security options below to keep your account
                  protected.
                </p>
              </div>
            </div>

            <div className="flex w-fit items-center gap-2 rounded-full border border-black/10 px-3 py-1.5">
              <span className="flex h-4 w-4 items-center justify-center rounded-full bg-black text-white">
                <Check size={10} />
              </span>

              <span className="text-[10px] font-bold tracking-wide text-black">
                ACCOUNT PROTECTED
              </span>
            </div>
          </div>
        </div>

        <div className="mt-5 space-y-4">

          {/* PASSWORD */}
          <SecurityCard
            icon={<KeyRound size={18} />}
            eyebrow="LOGIN"
            title="Password"
            description="Use a strong password that is unique to your Vistara account."
          >
            <div className="flex flex-col gap-3 border-t border-black/10 pt-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-bold text-black">
                  Account password
                </p>

                <p className="mt-1 text-xs leading-5 text-[#666]">
                  Change the password you use when signing in to Vistara.
                </p>
              </div>

              <Link
                href="/settings/security/password"
                className="inline-flex w-fit items-center gap-1.5 text-xs font-bold text-black transition hover:underline"
              >
                Change password
                <ChevronRight size={14} />
              </Link>
            </div>
          </SecurityCard>

          {/* TWO FACTOR */}
          <SecurityCard
            icon={<Smartphone size={18} />}
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
              <div className="mt-4 border-t border-black/10 pt-4">
                <div className="flex gap-3">
                  <ShieldCheck
                    size={17}
                    className="mt-0.5 shrink-0 text-black"
                  />

                  <div>
                    <p className="text-sm font-bold text-black">
                      Two-factor authentication is enabled
                    </p>

                    <p className="mt-1 text-xs leading-5 text-[#666]">
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
            icon={<Bell size={18} />}
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
            icon={<ShieldCheck size={18} />}
            eyebrow="RECOVERY"
            title="Account recovery"
            description="Your recovery information can help you regain access to your account."
          >
            <div className="divide-y divide-black/10">
              <RecoveryRow
                icon={<Mail size={17} />}
                title="Recovery email"
                value="sristigupta@example.com"
                verified
              />

              <RecoveryRow
                icon={<Phone size={17} />}
                title="Recovery phone"
                value="Not added"
                verified={false}
              />
            </div>
          </SecurityCard>

          {/* DEVICES */}
          <SecurityCard
            icon={<Monitor size={18} />}
            eyebrow="DEVICES"
            title="Where you're signed in"
            description="Review the devices currently connected to your Vistara account."
          >
            <div className="border-t border-black/10 pt-4">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-black/10">
                    <Monitor size={16} />
                  </div>

                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-bold">
                        Current browser
                      </p>

                      <span className="rounded-full bg-black px-2 py-0.5 text-[9px] font-bold tracking-wide text-white">
                        THIS DEVICE
                      </span>
                    </div>

                    <p className="mt-1 text-xs text-[#666]">
                      Windows · Chrome · Current session
                    </p>
                  </div>
                </div>

                <span className="text-xs font-medium text-[#666]">
                  Active now
                </span>
              </div>
            </div>

            {signedOut && (
              <div className="mt-4 border-t border-black/10 pt-4 text-xs font-medium text-black">
                Other active sessions have been signed out.
              </div>
            )}

            <button
              type="button"
              onClick={handleSignOutOtherDevices}
              disabled={signingOut}
              className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-black transition hover:underline disabled:opacity-50"
            >
              <LogOut size={14} />

              {signingOut
                ? "Signing out..."
                : "Sign out other devices"}
            </button>
          </SecurityCard>

          {/* ACTIVITY */}
          <SecurityCard
            icon={<ShieldCheck size={18} />}
            eyebrow="RECENT ACTIVITY"
            title="Security activity"
            description="Keep track of important changes made to your account."
          >
            <div className="space-y-2">
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
          <div className="rounded-2xl border border-black/15 bg-white p-5">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
                <AlertTriangle size={16} />
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#666]">
                  ACCOUNT ACCESS
                </p>

                <h2 className="mt-1 text-lg font-bold text-black">
                  Sign out everywhere
                </h2>

                <p className="mt-1 max-w-2xl text-xs leading-5 text-[#666]">
                  If you think someone else may have access to your account,
                  sign out from other devices and then change your password.
                </p>

                <button
                  type="button"
                  onClick={handleSignOutOtherDevices}
                  disabled={signingOut}
                  className="mt-4 text-xs font-bold text-black underline underline-offset-4 transition hover:no-underline disabled:opacity-50"
                >
                  {signingOut
                    ? "Signing out..."
                    : "Sign out everywhere"}
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

/* ================= SECURITY CARD ================= */

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
    <section className="rounded-2xl border border-black/10 bg-white p-5 sm:p-6">
      <div className="flex items-start gap-3">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-white">
          {icon}
        </div>

        <div>
          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#666]">
            {eyebrow}
          </p>

          <h2 className="mt-1 text-lg font-bold text-black">
            {title}
          </h2>

          <p className="mt-1 text-xs leading-5 text-[#666]">
            {description}
          </p>
        </div>
      </div>

      <div className="mt-5">
        {children}
      </div>
    </section>
  );
}

/* ================= TOGGLE ================= */

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
    <div className="flex items-center justify-between gap-5 border-t border-black/10 pt-4">
      <div>
        <p className="text-sm font-bold text-black">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-[#666]">
          {description}
        </p>
      </div>

      <button
        type="button"
        onClick={onChange}
        aria-pressed={checked}
        className={`relative h-6 w-10 shrink-0 rounded-full transition ${
          checked ? "bg-black" : "bg-[#D0D0D0]"
        }`}
      >
        <span
          className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
            checked ? "right-1" : "left-1"
          }`}
        />
      </button>
    </div>
  );
}

/* ================= RECOVERY ================= */

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
    <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-center gap-3">
        <div className="text-[#666]">
          {icon}
        </div>

        <div>
          <p className="text-sm font-bold text-black">
            {title}
          </p>

          <p className="mt-1 text-xs text-[#666]">
            {value}
          </p>
        </div>
      </div>

      {verified ? (
        <span className="flex w-fit items-center gap-1.5 rounded-full bg-black px-3 py-1 text-[10px] font-bold text-white">
          <Check size={11} />
          Verified
        </span>
      ) : (
        <span className="w-fit rounded-full border border-black/10 px-3 py-1 text-[10px] font-bold text-[#666]">
          Not added
        </span>
      )}
    </div>
  );
}

/* ================= ACTIVITY ================= */

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
    <div className="flex items-center justify-between gap-4 rounded-xl border border-black/10 px-4 py-3">
      <div className="flex items-center gap-3">
        <div className="h-1.5 w-1.5 rounded-full bg-black" />

        <div>
          <p className="text-sm font-bold text-black">
            {title}
          </p>

          <p className="mt-0.5 text-xs text-[#666]">
            {description}
          </p>
        </div>
      </div>

      <span className="shrink-0 text-[10px] font-medium text-[#888]">
        {time}
      </span>
    </div>
  );
}