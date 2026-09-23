import Link from "next/link";
import Navbar from "@/components/navbar";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">

        <Link
          href="/settings"
          className="text-sm font-medium text-[#64748B] hover:text-[#03045E]"
        >
          ← Back to settings
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
            PRIVACY
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#03045E]">
            Privacy & preferences
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
            Choose how your information is used and how others can interact
            with your Vistara account.
          </p>
        </div>

        <div className="mt-10 space-y-5">

          {/* Profile visibility */}
          <SettingCard
            title="Profile visibility"
            description="Control what other people can see on your profile."
          >
            <Toggle
              title="Public profile"
              description="Allow other Vistara users to view your profile."
              defaultChecked
            />

            <Toggle
              title="Show travel interests"
              description="Show selected travel preferences on your profile."
              defaultChecked
            />
          </SettingCard>

          {/* Personalisation */}
          <SettingCard
            title="Personalised experience"
            description="Help Vistara provide recommendations that match your interests."
          >
            <Toggle
              title="Personalised recommendations"
              description="Use your searches, saved places and bookings to improve recommendations."
              defaultChecked
            />

            <Toggle
              title="Recently viewed places"
              description="Allow Vistara to remember places you have viewed."
              defaultChecked
            />
          </SettingCard>

          {/* Communications */}
          <SettingCard
            title="Communications"
            description="Choose what updates you would like to receive."
          >
            <Toggle
              title="Travel updates"
              description="Receive important information about your bookings and trips."
              defaultChecked
            />

            <Toggle
              title="Offers & experiences"
              description="Receive occasional recommendations and travel inspiration."
            />
          </SettingCard>

          {/* Data */}
          <SettingCard
            title="Your data"
            description="Manage the information connected to your Vistara account."
          >
            <Link
              href="/settings/account"
              className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] p-4 transition hover:border-[#03045E]/30 hover:bg-[#F8F9FF]"
            >
              <div>
                <p className="text-sm font-semibold text-[#03045E]">
                  Manage account data
                </p>

                <p className="mt-1 text-xs text-[#64748B]">
                  Review your account information and personal details.
                </p>
              </div>

              <span className="text-xl text-[#94A3B8]">→</span>
            </Link>
          </SettingCard>

          {/* Delete */}
          <div className="rounded-[28px] border border-red-100 bg-white p-7">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-red-400">
              DANGER ZONE
            </p>

            <h2 className="mt-2 text-lg font-semibold text-[#03045E]">
              Delete account
            </h2>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-[#64748B]">
              Permanently remove your Vistara account and associated personal
              information.
            </p>

            <button
              type="button"
              className="mt-5 rounded-xl border border-red-200 px-5 py-3 text-sm font-semibold text-red-600 transition hover:bg-red-50"
            >
              Delete my account
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}

/* ---------------- SETTING CARD ---------------- */

function SettingCard({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[28px] border border-[#03045E]/10 bg-white p-6 shadow-[0_15px_45px_rgba(3,4,94,0.04)] md:p-8">

      <h2 className="font-serif text-2xl font-semibold text-[#03045E]">
        {title}
      </h2>

      <p className="mt-2 text-sm text-[#64748B]">
        {description}
      </p>

      <div className="mt-6 divide-y divide-[#03045E]/10">
        {children}
      </div>
    </div>
  );
}

/* ---------------- TOGGLE ---------------- */

function Toggle({
  title,
  description,
  defaultChecked = false,
}: {
  title: string;
  description: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex cursor-pointer items-center justify-between gap-6 py-5">

      <div>
        <p className="text-sm font-semibold text-[#03045E]">
          {title}
        </p>

        <p className="mt-1 max-w-xl text-xs leading-5 text-[#64748B]">
          {description}
        </p>
      </div>

      <div className="relative shrink-0">
        <input
          type="checkbox"
          defaultChecked={defaultChecked}
          className="peer sr-only"
        />

        <div className="h-7 w-12 rounded-full bg-[#CBD5E1] transition peer-checked:bg-[#03045E]" />

        <div className="absolute left-1 top-1 h-5 w-5 rounded-full bg-white shadow-sm transition peer-checked:translate-x-5" />
      </div>

    </label>
  );
}