import Link from "next/link";
import Navbar from "@/components/navbar";

const sections = [
  {
    number: "01",
    title: "Information We Collect",
    text: "Vistara may collect information you provide when creating an account, searching for accommodation, making a booking, using Explore, purchasing a Local Plan, requesting transport, listing a property, or contacting support.",
    points: [
      "Account and profile information",
      "Booking and reservation information",
      "Property, host, guide and provider information",
      "Information submitted through support or service requests",
    ],
  },
  {
    number: "02",
    title: "Account & Authentication",
    text: "Account information is used to provide access to Vistara services and maintain the security of your account. Authentication is part of the Vistara application architecture and supports account, booking and provider workflows.",
    points: [
      "Account access and authentication",
      "Profile and account settings",
      "Security-related account activity",
      "Role-based provider workflows where applicable",
    ],
  },
  {
    number: "03",
    title: "Bookings & Payments",
    text: "Information required for reservations and payments may be processed to complete transactions and provide booking-related services. Vistara's booking flow includes accommodation selection, availability, booking and payment.",
    points: [
      "Reservation details",
      "Guest and booking information",
      "Payment-related transaction information",
      "Booking status and history",
    ],
  },
  {
    number: "04",
    title: "Property & Provider Verification",
    text: "Vistara includes verification workflows for properties and providers to support trust and safety. Information or documents submitted during verification may be reviewed as part of these workflows.",
    points: [
      "Host and provider information",
      "Property information",
      "Verification status",
      "Verification-related records and reasons where applicable",
    ],
  },
  {
    number: "05",
    title: "Location, Maps & Explore",
    text: "Vistara uses location and map functionality as part of destination discovery, directions and travel workflows. Explore allows users to select an area, date, guests and interests before discovering relevant local options.",
    points: [
      "Selected destination or area",
      "Map and location information",
      "Directions and route information",
      "Explore preferences such as food, culture, nature and local experiences",
    ],
  },
  {
    number: "06",
    title: "Local Plan & Protected Details",
    text: "The Vistara Explore journey can provide discovery information before a Local Plan is purchased. The planned Local Plan unlocks more detailed information such as exact locations, full place details, maps, directions and route sequences.",
    points: [
      "Discovery previews",
      "Local Plan purchase information",
      "Unlocked location details",
      "Routes and planned journey information",
    ],
  },
  {
    number: "07",
    title: "Transport & Trip Information",
    text: "Vistara Services includes local and intercity transport workflows. Where transport is used, relevant information may be processed to support vehicle selection, pickup, destination, driver assignment, trip progress and completion.",
    points: [
      "Pickup and destination information",
      "Selected vehicle type",
      "Driver and trip information",
      "Multi-stop journey information",
    ],
  },
  {
    number: "08",
    title: "How We Use Information",
    text: "Information may be used to operate and improve Vistara services, process bookings and payments, maintain account security, support verification, provide location-based functionality and communicate important service information.",
    points: [
      "Provide requested services",
      "Process bookings and transactions",
      "Support trust and safety workflows",
      "Improve discovery and platform functionality",
    ],
  },
  {
    number: "09",
    title: "Data Security",
    text: "Vistara is designed with separate application, backend, database and service layers. Security-related account and transaction information should be handled using appropriate safeguards within the platform's technical architecture.",
    points: [
      "Authenticated account access",
      "Protected application and backend workflows",
      "Controlled access to platform data",
      "Security-conscious handling of account and transaction information",
    ],
  },
  {
    number: "10",
    title: "Your Choices",
    text: "You can review and update certain account information through your profile and account settings. Information associated with bookings, payments, verification or completed services may be retained as necessary for the relevant platform workflow.",
    points: [
      "Review profile information",
      "Update available account details",
      "Manage relevant account settings",
      "Contact support regarding privacy questions",
    ],
  },
];

export default function Privacy() {
  return (
    <main className="min-h-screen bg-[#FAF8F3] text-[#2C2420]">
      <Navbar />

      {/* =====================================================
          HERO
      ====================================================== */}
      <section className="border-b border-[#E5DED6] bg-[#FAF8F3]">
        <div className="mx-auto max-w-6xl px-5 py-12 sm:px-6 lg:px-10 lg:py-16">
          <Link
            href="/settings"
            className="inline-flex items-center text-sm font-medium text-[#756D67] transition hover:text-[#B76545]"
          >
            ← Back to Settings
          </Link>

          <div className="mt-10 max-w-4xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-10 bg-[#B76545]" />

              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#B76545]">
                Legal & Privacy
              </p>
            </div>

            <h1 className="mt-5 font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#2C2420] sm:text-6xl">
              Privacy, explained
              <br />
              <span className="text-[#B76545]">with clarity.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-[#756D67] sm:text-lg">
              This policy explains how information may be handled across
              Vistara's accommodation, discovery, Local Plan, transport,
              account and provider workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <span className="rounded-full border border-[#E5DED6] bg-white px-4 py-2 text-xs font-semibold text-[#2C2420]">
                Privacy
              </span>

              <span className="rounded-full border border-[#E5DED6] bg-white px-4 py-2 text-xs font-semibold text-[#2C2420]">
                Account security
              </span>

              <span className="rounded-full border border-[#E5DED6] bg-white px-4 py-2 text-xs font-semibold text-[#2C2420]">
                Trust & verification
              </span>
            </div>

            <div className="mt-8 flex flex-col gap-2 border-l-2 border-[#B76545] pl-4">
              <p className="text-xs font-bold uppercase tracking-wider text-[#756D67]">
                Last updated
              </p>

              <p className="text-sm font-semibold text-[#2C2420]">
                September 2026
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          CONTENT
      ====================================================== */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-6 lg:px-10 lg:py-16">
        <div className="grid gap-10 lg:grid-cols-[220px_1fr]">
          {/* SIDE INDEX */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-3xl border border-[#E5DED6] bg-white p-5">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                On this page
              </p>

              <nav className="mt-5 space-y-3">
                {sections.map((section) => (
                  <a
                    key={section.number}
                    href={`#section-${section.number}`}
                    className="flex items-center gap-3 text-xs font-medium text-[#756D67] transition hover:text-[#B76545]"
                  >
                    <span className="font-semibold text-[#B76545]">
                      {section.number}
                    </span>

                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* MAIN DOCUMENT */}
          <div className="min-w-0">
            {/* INTRO */}
            <div className="rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_12px_40px_rgba(44,36,32,0.04)] sm:p-8">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                OUR APPROACH
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#2C2420]">
                Your information is part of your journey.
              </h2>

              <p className="mt-5 text-sm leading-8 text-[#756D67] sm:text-base">
                Vistara connects accommodation, destination discovery,
                Local Plans and travel services into one platform. This
                means different parts of your journey can involve account,
                booking, location, payment and provider information.
              </p>

              <div className="mt-7 grid gap-3 sm:grid-cols-3">
                <TrustItem
                  number="01"
                  title="Account"
                  text="Profile and authentication"
                />

                <TrustItem
                  number="02"
                  title="Journey"
                  text="Bookings and discovery"
                />

                <TrustItem
                  number="03"
                  title="Trust"
                  text="Verification and security"
                />
              </div>
            </div>

            {/* SECTIONS */}
            <div className="mt-8 space-y-5">
              {sections.map((section) => (
                <article
                  id={`section-${section.number}`}
                  key={section.number}
                  className="scroll-mt-24 rounded-[28px] border border-[#E5DED6] bg-white p-6 shadow-[0_10px_35px_rgba(44,36,32,0.035)] transition hover:shadow-[0_15px_45px_rgba(44,36,32,0.06)] sm:p-8"
                >
                  <div className="flex gap-5">
                    {/* NUMBER */}
                    <div className="hidden shrink-0 sm:block">
                      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E8DED0] font-serif text-sm font-semibold text-[#B76545]">
                        {section.number}
                      </div>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 sm:hidden">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8DED0] font-serif text-xs font-semibold text-[#B76545]">
                          {section.number}
                        </span>

                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#B76545]">
                          Vistara Privacy
                        </span>
                      </div>

                      <h2 className="mt-4 font-serif text-2xl font-semibold text-[#2C2420] sm:mt-0 sm:text-3xl">
                        {section.title}
                      </h2>

                      <p className="mt-4 text-sm leading-7 text-[#756D67] sm:text-base sm:leading-8">
                        {section.text}
                      </p>

                      <div className="mt-6 grid gap-3 sm:grid-cols-2">
                        {section.points.map((point) => (
                          <div
                            key={point}
                            className="flex gap-3 rounded-2xl bg-[#FAF8F3] p-4"
                          >
                            <span className="mt-0.5 text-sm font-bold text-[#B76545]">
                              ✓
                            </span>

                            <span className="text-sm leading-6 text-[#2C2420]">
                              {point}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* SECURITY NOTE */}
            <div className="mt-8 overflow-hidden rounded-[30px] bg-[#2C2420] p-7 text-white sm:p-9">
              <div className="flex flex-col gap-7 sm:flex-row sm:items-start sm:justify-between">
                <div className="max-w-2xl">
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#B8945A]">
                    TRUST & SAFETY
                  </p>

                  <h2 className="mt-3 font-serif text-3xl font-semibold">
                    Built around a connected travel workflow.
                  </h2>

                  <p className="mt-4 text-sm leading-7 text-white/65">
                    Vistara's architecture separates the web application,
                    backend, data services, maps, payment services and
                    intelligence layer. Verification and security-related
                    workflows are handled through the relevant application
                    and backend services.
                  </p>
                </div>

                <div className="shrink-0 rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-2xl">✓</div>

                  <p className="mt-3 text-sm font-semibold">
                    Trust-focused platform
                  </p>

                  <p className="mt-1 text-xs leading-5 text-white/50">
                    Account · Booking · Verification
                  </p>
                </div>
              </div>
            </div>

            {/* USER RIGHTS / SUPPORT */}
            <div className="mt-8 rounded-[30px] border border-[#E5DED6] bg-[#E8DED0]/45 p-7 sm:p-9">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#B76545]">
                QUESTIONS?
              </p>

              <h2 className="mt-3 font-serif text-3xl font-semibold text-[#2C2420]">
                Need help with your information?
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-[#756D67]">
                If you have questions about this policy, your account
                information, bookings or privacy-related requests,
                contact Vistara support.
              </p>

              <Link
                href="/help"
                className="mt-6 inline-flex rounded-xl bg-[#B76545] px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-[#965039]"
              >
                Contact Support
              </Link>
            </div>

            {/* LEGAL FOOTNOTE */}
            <div className="mt-8 border-t border-[#E5DED6] pt-6">
              <p className="text-xs leading-6 text-[#756D67]">
                This page describes the privacy and information-handling
                approach represented in the current Vistara prototype and
                architecture. Specific legal, regulatory, retention and
                jurisdictional requirements should be finalized before
                production launch.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

/* =========================================================
   TRUST ITEM
========================================================= */

function TrustItem({
  number,
  title,
  text,
}: {
  number: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E5DED6] bg-[#FAF8F3] p-4">
      <div className="flex items-center gap-3">
        <span className="text-xs font-bold text-[#B76545]">
          {number}
        </span>

        <span className="text-sm font-semibold text-[#2C2420]">
          {title}
        </span>
      </div>

      <p className="mt-2 text-xs leading-5 text-[#756D67]">
        {text}
      </p>
    </div>
  );
}