import Link from "next/link";

import Navbar from "@/components/navbar";
import Footer from "@/app/footer/page";

const sections = [
  { id: "acceptance", label: "Acceptance of terms" },
  { id: "using-vistara", label: "Using Vistara" },
  { id: "accounts", label: "Accounts" },
  { id: "bookings", label: "Bookings" },
  { id: "payments", label: "Payments" },
  { id: "hosts", label: "Hosts & properties" },
  { id: "content", label: "Content & reviews" },
  { id: "cancellations", label: "Cancellations" },
  { id: "responsibilities", label: "Your responsibilities" },
  { id: "liability", label: "Liability" },
  { id: "changes", label: "Changes to these terms" },
  { id: "contact", label: "Contact us" },
];

function SectionNumber({ number }: { number: string }) {
  return (
    <span className="text-[9px] font-semibold tracking-[0.18em] text-neutral-400">
      {number}
    </span>
  );
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-neutral-200">
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
          <Link
            href="/"
            className="text-[10px] font-medium text-neutral-500 transition hover:text-black"
          >
            ← Back to Vistara
          </Link>

          <div className="mt-6 max-w-2xl">
            <p className="text-[9px] font-semibold uppercase tracking-[0.2em] text-neutral-400">
              Vistara Legal
            </p>

            <h1 className="mt-1.5 font-serif text-[28px] font-semibold tracking-tight sm:text-[32px]">
              Terms of Service
            </h1>

            <p className="mt-2 max-w-xl text-[11px] leading-5 text-neutral-500">
              These terms explain the rules that apply when you use Vistara,
              including browsing properties, making bookings, hosting stays,
              and using our services.
            </p>

            <p className="mt-3 text-[9px] text-neutral-400">
              Last updated: October 2026
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-5xl px-4 py-7 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-[170px_minmax(0,1fr)]">

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-neutral-200 bg-white p-3.5">
              <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.15em] text-neutral-400">
                On this page
              </p>

              <nav className="space-y-0.5">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="
                      block
                      rounded-md
                      px-2.5
                      py-1.5
                      text-[10px]
                      text-neutral-500
                      transition
                      hover:bg-neutral-100
                      hover:text-black
                    "
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* TERMS */}
          <article className="rounded-xl border border-neutral-200 bg-white px-5 py-6 shadow-[0_8px_30px_rgba(0,0,0,0.03)] sm:px-7">

            {/* NOTICE */}
            <div className="rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3">
              <p className="text-[10px] leading-5 text-neutral-600">
                <strong className="text-black">
                  Please read these terms carefully.
                </strong>{" "}
                By accessing or using Vistara, you acknowledge that you have
                read and understood these terms and agree to follow them.
              </p>
            </div>

            {/* 01 */}
            <section id="acceptance" className="scroll-mt-24 pt-8">
              <SectionNumber number="01" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Acceptance of terms
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                These Terms of Service govern your access to and use of the
                Vistara platform and its related services. By using Vistara,
                you agree to comply with these terms and any applicable
                policies referenced by them.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                If you do not agree with these terms, please do not use the
                platform or its services.
              </p>
            </section>

            {/* 02 */}
            <section id="using-vistara" className="scroll-mt-24 pt-8">
              <SectionNumber number="02" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Using Vistara
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Vistara provides a platform through which guests can discover
                stays and hosts can present properties to potential guests.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                You agree to use the platform only for lawful purposes and in
                a way that does not interfere with the experience or safety of
                other users.
              </p>
            </section>

            {/* 03 */}
            <section id="accounts" className="scroll-mt-24 pt-8">
              <SectionNumber number="03" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Accounts
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Some Vistara features may require an account. You are
                responsible for providing accurate information and keeping
                your account credentials secure.
              </p>

              <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] leading-5 text-neutral-600">
                <li>Keep your account information accurate and up to date.</li>
                <li>Do not share your account credentials with others.</li>
                <li>
                  Notify Vistara if you believe your account is being used
                  without authorization.
                </li>
              </ul>
            </section>

            {/* 04 */}
            <section id="bookings" className="scroll-mt-24 pt-8">
              <SectionNumber number="04" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Bookings
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                When you make a booking through Vistara, you are responsible
                for reviewing the property details, dates, guest information,
                pricing, and applicable booking conditions before confirming.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                A booking is subject to the availability and conditions
                presented at the time of reservation.
              </p>
            </section>

            {/* 05 */}
            <section id="payments" className="scroll-mt-24 pt-8">
              <SectionNumber number="05" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Payments
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Prices and applicable charges are shown during the booking
                process. You agree to provide valid payment information when
                payment is required.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Payment processing may be handled through third-party payment
                providers. Their applicable terms may also apply to the
                transaction.
              </p>
            </section>

            {/* 06 */}
            <section id="hosts" className="scroll-mt-24 pt-8">
              <SectionNumber number="06" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Hosts & properties
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Hosts are responsible for ensuring that property information,
                availability, pricing, photographs, descriptions, and other
                listing details are accurate and current.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Hosts must also have the necessary rights and permissions to
                list and offer their property through Vistara.
              </p>
            </section>

            {/* 07 */}
            <section id="content" className="scroll-mt-24 pt-8">
              <SectionNumber number="07" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Content & reviews
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Users may be able to submit reviews, photographs, comments,
                and other content. You are responsible for ensuring that
                content you submit is accurate and does not violate the rights
                of others.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Reviews should reflect genuine experiences and should not be
                misleading, abusive, fraudulent, or submitted in exchange for
                improper incentives.
              </p>
            </section>

            {/* 08 */}
            <section id="cancellations" className="scroll-mt-24 pt-8">
              <SectionNumber number="08" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Cancellations
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Cancellation and refund conditions may vary depending on the
                booking and property. The applicable cancellation conditions
                are shown during the booking process or in your reservation
                details.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Please review those conditions before cancelling a booking.
              </p>
            </section>

            {/* 09 */}
            <section id="responsibilities" className="scroll-mt-24 pt-8">
              <SectionNumber number="09" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Your responsibilities
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                When using Vistara, you agree to act responsibly and respect
                other users, hosts, guests, properties, and applicable laws.
              </p>

              <ul className="mt-2 list-disc space-y-1 pl-4 text-[11px] leading-5 text-neutral-600">
                <li>Provide truthful information.</li>
                <li>Respect property rules and booking conditions.</li>
                <li>Do not misuse the platform or its services.</li>
                <li>Do not attempt to create fraudulent bookings or accounts.</li>
                <li>Do not use Vistara to harm, threaten, or deceive others.</li>
              </ul>
            </section>

            {/* 10 */}
            <section id="liability" className="scroll-mt-24 pt-8">
              <SectionNumber number="10" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Liability
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Vistara provides a platform for guests and hosts to connect.
                Information supplied by users may change and may not always
                be completely accurate or current.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                To the extent permitted by applicable law, Vistara is not
                responsible for circumstances outside its reasonable control,
                including user-provided information, third-party services,
                property conditions, or events occurring during a stay.
              </p>
            </section>

            {/* 11 */}
            <section id="changes" className="scroll-mt-24 pt-8">
              <SectionNumber number="11" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Changes to these terms
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                Vistara may update these terms from time to time to reflect
                changes to the platform, services, or applicable requirements.
              </p>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                When material changes are made, the updated version will be
                made available through the platform.
              </p>
            </section>

            {/* 12 */}
            <section id="contact" className="scroll-mt-24 pt-8">
              <SectionNumber number="12" />

              <h2 className="mt-1.5 text-[17px] font-semibold">
                Contact us
              </h2>

              <p className="mt-2 text-[11px] leading-5 text-neutral-600">
                If you have questions about these terms or your use of
                Vistara, our support team can help.
              </p>

              <Link
                href="/contact"
                className="
                  mt-4
                  inline-flex
                  items-center
                  rounded-lg
                  bg-black
                  px-4
                  py-2
                  text-[10px]
                  font-semibold
                  text-white
                  transition
                  hover:bg-neutral-800
                "
              >
                Contact Vistara →
              </Link>
            </section>

            {/* DISCLAIMER */}
            <div className="mt-10 border-t border-neutral-200 pt-5">
              <p className="text-[9px] leading-4 text-neutral-400">
                This page is a general product terms template for the Vistara
                platform and should be reviewed and adapted by qualified legal
                counsel before being used as the final legal agreement for a
                live business.
              </p>
            </div>
          </article>
        </div>
      </section>

      <Footer />
    </main>
  );
}