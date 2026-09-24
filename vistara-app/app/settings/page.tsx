import Link from "next/link";
import Navbar from "@/components/navbar";

const settingsItems = [
  {
    title: "Account",
    description: "Manage your account information and personal details.",
    href: "/settings/account",
    icon: "◎",
  },
  {
    title: "Profile",
    description: "View and edit your Vistara profile.",
    href: "/settings/profile",
    icon: "♙",
  },
  {
    title: "Travel preferences",
    description: "Choose your travel style, interests, language and currency.",
    href: "/settings/preferences",
    icon: "✦",
  },
  {
    title: "Privacy",
    description: "Control your profile visibility, data and personalization.",
    href: "/settings/privacy",
    icon: "◉",
  },
  {
    title: "Security",
    description: "Manage your password, login and account security.",
    href: "/settings/security",
    icon: "⌁",
  },
  {
    title: "Help & support",
    description: "Find answers or contact the Vistara support team.",
    href: "/settings/help",
    icon: "?",
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      {/* HERO */}
      <section className="border-b border-[#03045E]/10 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6 sm:py-14 lg:px-10 lg:py-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
            VISTARA
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold tracking-tight text-[#03045E] sm:text-5xl">
            Settings
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B] sm:text-base">
            Manage your account, profile, preferences, privacy and security
            settings.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-5 py-8 sm:px-6 sm:py-12 lg:px-10">
        <div className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_60px_rgba(3,4,94,0.06)]">
          {settingsItems.map((item, index) => (
            <Link
              key={item.href}
              href={item.href}
              className={`group flex items-center gap-4 px-5 py-5 transition duration-200 hover:bg-[#F7F3EA] sm:gap-5 sm:px-7 sm:py-6 ${
                index !== settingsItems.length - 1
                  ? "border-b border-[#03045E]/10"
                  : ""
              }`}
            >
              {/* ICON */}
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#EEF0FF] text-lg font-semibold text-[#03045E] transition duration-200 group-hover:bg-[#03045E] group-hover:text-white sm:h-12 sm:w-12">
                {item.icon}
              </div>

              {/* TEXT */}
              <div className="min-w-0 flex-1">
                <h2 className="text-sm font-semibold text-[#03045E] sm:text-base">
                  {item.title}
                </h2>

                <p className="mt-1 text-xs leading-5 text-[#64748B] sm:text-sm">
                  {item.description}
                </p>
              </div>

              {/* ARROW */}
              <span className="shrink-0 text-xl text-[#94A3B8] transition duration-200 group-hover:translate-x-1 group-hover:text-[#03045E] sm:text-2xl">
                →
              </span>
            </Link>
          ))}
        </div>

        {/* SUPPORT */}
        <div className="mt-6 flex flex-col gap-4 rounded-[24px] border border-[#03045E]/10 bg-[#F7F3EA] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <p className="text-sm font-semibold text-[#03045E]">
              Need something else?
            </p>

            <p className="mt-1 text-xs leading-5 text-[#64748B] sm:text-sm">
              Our support team is here to help with your Vistara experience.
            </p>
          </div>

          <Link
            href="/settings/help"
            className="inline-flex w-fit rounded-xl bg-[#03045E] px-5 py-3 text-center text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
          >
            Get help
          </Link>
        </div>
      </section>
    </main>
  );
}