import Link from "next/link";
import Navbar from "@/components/navbar";

const sections = [
  {
    title: "Using Vistara",
    text: "Vistara provides a platform for travelers, hosts and other users to discover, list and book travel-related stays and experiences.",
  },
  {
    title: "User Accounts",
    text: "You are responsible for maintaining accurate account information and keeping your account credentials secure.",
  },
  {
    title: "Bookings",
    text: "When you make a reservation through Vistara, you agree to provide accurate booking information and follow the applicable booking conditions.",
  },
  {
    title: "Hosts & Properties",
    text: "Hosts are responsible for providing accurate property information, maintaining their listings and complying with applicable verification requirements.",
  },
  {
    title: "Verification",
    text: "Vistara may request information or documents to support identity, host or property verification.",
  },
  {
    title: "Payments",
    text: "Payments, refunds and applicable charges are handled according to the conditions presented during the relevant transaction.",
  },
  {
    title: "User Conduct",
    text: "Users must use the platform lawfully and must not provide misleading information, misuse the platform or interfere with the experience of other users.",
  },
  {
    title: "Changes to These Terms",
    text: "Vistara may update these terms from time to time. Updated terms will be made available through the platform.",
  },
];

export default function Terms() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

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
            Terms & Conditions
          </h1>

          <p className="mt-3 text-sm text-gray-500">
            Terms that apply when using the Vistara platform.
          </p>

          <p className="mt-4 text-xs text-gray-400">
            Last updated: September 2026
          </p>

        </div>

        {/* Introduction */}
        <div className="py-10">
          <p className="text-base leading-8 text-gray-600">
            By accessing or using Vistara, you agree to follow the
            applicable terms and conditions described on this page.
            Please review them carefully before using the platform.
          </p>

          {/* Sections */}
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
            Questions about these terms?
          </h2>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            If you need clarification about these terms, contact
            Vistara support.
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