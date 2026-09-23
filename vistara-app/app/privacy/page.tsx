import Link from "next/link";
import Navbar from "@/components/navbar";

const sections = [
  {
    title: "Information We Collect",
    text: "We may collect information you provide when creating an account, making a booking, listing a property, or contacting support.",
  },
  {
    title: "How We Use Information",
    text: "Information may be used to provide and improve Vistara services, process bookings, maintain account security, and communicate important updates.",
  },
  {
    title: "Bookings & Payments",
    text: "Information required for reservations and payments may be processed to complete transactions and provide booking-related services.",
  },
  {
    title: "Property & Host Verification",
    text: "Information and documents submitted during verification may be used to review host and property information and support trust and safety.",
  },
  {
    title: "Your Choices",
    text: "You can review and update certain account information through your profile and account settings.",
  },
  {
    title: "Data Security",
    text: "Vistara uses appropriate security measures designed to protect account and transaction information.",
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

        {/* Back */}
        <Link
          href="/settings"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Settings
        </Link>

        {/* Header */}
        <div className="mt-10 border-b border-gray-200 pb-8">

          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Legal
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#03045e]">
            Privacy Policy
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            How Vistara handles information across its platform.
          </p>

          <p className="mt-4 text-xs text-gray-400">
            Last updated: September 2026
          </p>

        </div>

        {/* Content */}
        <div className="py-10">

          <p className="text-base leading-8 text-gray-600">
            Your privacy matters to us. This page explains the types of
            information that may be collected through Vistara and how
            that information may be used to provide our services.
          </p>

          <div className="mt-10 space-y-10">

            {sections.map((section, index) => (
              <section key={section.title}>

                <div className="flex gap-4">

                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] text-xs font-semibold text-[#03045e]">
                    {index + 1}
                  </span>

                  <div>
                    <h2 className="text-xl font-semibold text-[#03045e]">
                      {section.title}
                    </h2>

                    <p className="mt-3 text-sm leading-7 text-gray-600">
                      {section.text}
                    </p>
                  </div>

                </div>

              </section>
            ))}

          </div>

        </div>

        {/* Contact */}
        <div className="rounded-2xl bg-[#f5f7ff] p-6">

          <h2 className="font-semibold text-[#03045e]">
            Questions about privacy?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            If you have questions about this policy or your account
            information, contact Vistara support.
          </p>

          <Link
            href="/help"
            className="mt-5 inline-block rounded-xl bg-[#03045e] px-5 py-3 text-sm font-semibold text-white hover:bg-[#023e8a]"
          >
            Contact Support
          </Link>

        </div>

      </section>
    </main>
  );
}