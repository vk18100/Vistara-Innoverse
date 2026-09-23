import Link from "next/link";
import Navbar from "@/components/navbar";

const helpItems = [
  {
    title: "Help Center",
    description: "Find answers to common questions about Vistara.",
    icon: "?",
  },
  {
    title: "Booking help",
    description: "Get help with reservations, cancellations and trips.",
    icon: "▣",
  },
  {
    title: "Payments",
    description: "Questions about payments, refunds or billing.",
    icon: "₹",
  },
  {
    title: "Report an issue",
    description: "Tell us if something isn't working as expected.",
    icon: "!",
  },
];

export default function HelpPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <Navbar />

      <section className="mx-auto max-w-5xl px-6 py-12 lg:px-10">

        <Link
          href="/settings"
          className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
        >
          ← Back to settings
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#C6A15B]">
            SUPPORT
          </p>

          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#03045E] md:text-5xl">
            How can we help?
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-[#64748B]">
            Find answers, manage your trips or get in touch with the Vistara
            support team.
          </p>
        </div>

        {/* Search */}
        <div className="mt-8 rounded-[24px] border border-[#03045E]/10 bg-white p-3 shadow-[0_15px_45px_rgba(3,4,94,0.06)]">
          <div className="flex items-center gap-3 px-3">
            <span className="text-lg text-[#64748B]">⌕</span>

            <input
              type="text"
              placeholder="Search for help..."
              className="w-full bg-transparent py-3 text-sm text-[#03045E] outline-none placeholder:text-[#94A3B8]"
            />
          </div>
        </div>

        {/* Help options */}
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {helpItems.map((item) => (
            <button
              key={item.title}
              className="group flex items-center gap-5 rounded-[26px] border border-[#03045E]/10 bg-white p-6 text-left shadow-[0_12px_35px_rgba(3,4,94,0.04)] transition hover:-translate-y-0.5 hover:border-[#03045E]/20 hover:bg-[#F7F3EA]"
            >
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#F1F3FF] text-lg font-semibold text-[#03045E] transition group-hover:bg-[#03045E] group-hover:text-white">
                {item.icon}
              </div>

              <div className="flex-1">
                <h2 className="text-base font-semibold text-[#03045E]">
                  {item.title}
                </h2>

                <p className="mt-1 text-sm leading-5 text-[#64748B]">
                  {item.description}
                </p>
              </div>

              <span className="text-xl text-[#94A3B8] transition group-hover:translate-x-1 group-hover:text-[#03045E]">
                →
              </span>
            </button>
          ))}
        </div>

        {/* Contact */}
        <div className="mt-8 overflow-hidden rounded-[30px] bg-gradient-to-br from-[#03045E] via-[#0D21A1] to-[#023E8A] p-8 text-white shadow-[0_20px_50px_rgba(3,4,94,0.18)] md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-white/60">
            VISTARA SUPPORT
          </p>

          <h2 className="mt-3 font-serif text-3xl font-semibold">
            Still need help?
          </h2>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/75">
            Our support team can help you with bookings, payments, account
            questions and other issues.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <button className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-[#03045E] transition hover:bg-[#F7F3EA]">
              Contact support
            </button>

            <button className="rounded-xl border border-white/25 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
              View FAQs
            </button>
          </div>
        </div>

        {/* Quick links */}
     
          

      </section>
    </main>
  );
}