import Link from "next/link";
import Navbar from "@/components/navbar";

const settingsItems = [
  {
    title: "Account settings",
    description: "Manage your account information and preferences",
    href: "/settings/account",
    icon: "⚙",
  },
  {
    title: "View profile",
    description: "See and edit your Vistara profile",
    href: "/profile",
    icon: "♙",
  },
  {
    title: "Privacy",
    description: "Control your privacy and data preferences",
    href: "/settings/privacy",
    icon: "◉",
  },
  {
    title: "Get help",
    description: "Find answers or contact Vistara support",
    href: "/settings/help",
    icon: "?",
  },
];

export default function SettingsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">

        {/* Header */}
        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
            VISTARA
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#03045E]">
            Settings
          </h1>

          <p className="mt-2 text-sm text-[#64748B]">
            Manage your account, privacy and preferences.
          </p>
        </div>

        {/* Settings Card */}
        <div className="overflow-hidden rounded-[28px] border border-[#03045E]/10 bg-white shadow-[0_20px_60px_rgba(3,4,94,0.06)]">

          {settingsItems.map((item, index) => (
            <Link
              key={item.title}
              href={item.href}
              className={`group flex items-center gap-5 px-6 py-6 transition hover:bg-[#F7F3EA] md:px-8 ${
                index !== settingsItems.length - 1
                  ? "border-b border-[#03045E]/10"
                  : ""
              }`}
            >
              {/* Icon */}
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1F3FF] text-xl text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
                {item.icon}
              </div>

              {/* Text */}
              <div className="min-w-0 flex-1">
                <h2 className="text-base font-semibold text-[#03045E]">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm text-[#64748B]">
                  {item.description}
                </p>
              </div>

              {/* Arrow */}
              <span className="text-2xl text-[#94A3B8] transition group-hover:translate-x-1 group-hover:text-[#03045E]">
                →
              </span>
            </Link>
          ))}

        </div>

        {/* Bottom */}
        <div className="mt-8 rounded-2xl border border-[#03045E]/10 bg-[#F7F3EA] p-5">
          <p className="text-sm font-semibold text-[#03045E]">
            Need something else?
          </p>

          <p className="mt-1 text-sm text-[#64748B]">
            Our support team is here to help with your Vistara experience.
          </p>
        </div>

      </section>
    </main>
  );
}