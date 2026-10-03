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

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF8] text-[#03045E]">
      <Navbar />

      {/* HEADER */}
      <section className="border-b border-[#E5E7EB] bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
          <Link
            href="/"
            className="text-sm font-medium text-[#64748B] transition hover:text-[#03045E]"
          >
            ← Back to Vistara
          </Link>

          <div className="mt-10 max-w-4xl">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#B77945]">
              VISTARA LEGAL
            </p>

            <h1 className="mt-4 font-serif text-4xl font-semibold tracking-tight text-[#03045E] md:text-6xl">
              Terms of Service
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-[#64748B]">
              These terms explain the rules that apply when you use Vistara,
              including browsing properties, making bookings, hosting stays,
              and using our services.
            </p>

            <p className="mt-6 text-sm text-[#94A3B8]">
              Last updated: October 2026
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[240px_minmax(0,1fr)]">

          {/* SIDEBAR */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-2xl border border-[#E2E8F0] bg-white p-5">
              <p className="mb-4 text-xs font-bold uppercase tracking-[0.18em] text-[#B77945]">
                On this page
              </p>

              <nav className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-3 py-2 text-sm text-[#64748B] transition hover:bg-[#F7F3EA] hover:text-[#03045E]"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* TERMS */}
          <article className="max-w-4xl rounded-[28px] border border-[#E2E8F0] bg-white p-7 shadow-[0_12px_45px_rgba(3,4,94,0.035)] md:p-10 lg:p-12">

            <div className="rounded-2xl bg-[#F7F3EA] p-6">
              <p className="text-sm leading-6 text-[#475569]">
                <strong className="text-[#03045E]">
                  Please read these terms carefully.
                </strong>{" "}
                By accessing or using Vistara, you acknowledge that you have
                read and understood these terms and agree to follow them.
              </p>
            </div>

            {/* 1 */}
            <section id="acceptance" className="scroll-mt-28 pt-10">
              <SectionNumber number="01" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Acceptance of terms
              </h2>

              <p className="mt-4">
                These Terms of Service govern your access to and use of the
                Vistara platform and its related services. By using Vistara,
                you agree to comply with these terms and any applicable
                policies referenced by them.
              </p>

              <p className="mt-4">
                If you do not agree with these terms, please do not use the
                platform or its services.
              </p>
            </section>

            {/* 2 */}
            <section id="using-vistara" className="scroll-mt-28 pt-12">
              <SectionNumber number="02" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Using Vistara
              </h2>

              <p className="mt-4">
                Vistara provides a platform through which guests can discover
                stays and hosts can present properties to potential guests.
              </p>

              <p className="mt-4">
                You agree to use the platform only for lawful purposes and in
                a way that does not interfere with the experience or safety of
                other users.
              </p>
            </section>

            {/* 3 */}
            <section id="accounts" className="scroll-mt-28 pt-12">
              <SectionNumber number="03" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Accounts
              </h2>

              <p className="mt-4">
                Some Vistara features may require an account. You are
                responsible for providing accurate information and keeping
                your account credentials secure.
              </p>

              <ul>
                <li>Keep your account information accurate and up to date.</li>
                <li>Do not share your account credentials with others.</li>
                <li>Notify Vistara if you believe your account is being used without authorization.</li>
              </ul>
            </section>

            {/* 4 */}
            <section id="bookings" className="scroll-mt-28 pt-12">
              <SectionNumber number="04" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Bookings
              </h2>

              <p className="mt-4">
                When you make a booking through Vistara, you are responsible
                for reviewing the property details, dates, guest information,
                pricing, and applicable booking conditions before confirming.
              </p>

              <p className="mt-4">
                A booking is subject to the availability and conditions
                presented at the time of reservation.
              </p>
            </section>

            {/* 5 */}
            <section id="payments" className="scroll-mt-28 pt-12">
              <SectionNumber number="05" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Payments
              </h2>

              <p className="mt-4">
                Prices and applicable charges are shown during the booking
                process. You agree to provide valid payment information when
                payment is required.
              </p>

              <p className="mt-4">
                Payment processing may be handled through third-party payment
                providers. Their applicable terms may also apply to the
                transaction.
              </p>
            </section>

            {/* 6 */}
            <section id="hosts" className="scroll-mt-28 pt-12">
              <SectionNumber number="06" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Hosts & properties
              </h2>

              <p className="mt-4">
                Hosts are responsible for ensuring that property information,
                availability, pricing, photographs, descriptions, and other
                listing details are accurate and current.
              </p>

              <p className="mt-4">
                Hosts must also have the necessary rights and permissions to
                list and offer their property through Vistara.
              </p>
            </section>

            {/* 7 */}
            <section id="content" className="scroll-mt-28 pt-12">
              <SectionNumber number="07" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Content & reviews
              </h2>

              <p className="mt-4">
                Users may be able to submit reviews, photographs, comments,
                and other content. You are responsible for ensuring that
                content you submit is accurate and does not violate the rights
                of others.
              </p>

              <p className="mt-4">
                Reviews should reflect genuine experiences and should not be
                misleading, abusive, fraudulent, or submitted in exchange for
                improper incentives.
              </p>
            </section>

            {/* 8 */}
            <section id="cancellations" className="scroll-mt-28 pt-12">
              <SectionNumber number="08" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Cancellations
              </h2>

              <p className="mt-4">
                Cancellation and refund conditions may vary depending on the
                booking and property. The applicable cancellation conditions
                are shown during the booking process or in your reservation
                details.
              </p>

              <p className="mt-4">
                Please review those conditions before cancelling a booking.
              </p>
            </section>

            {/* 9 */}
            <section id="responsibilities" className="scroll-mt-28 pt-12">
              <SectionNumber number="09" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Your responsibilities
              </h2>

              <p className="mt-4">
                When using Vistara, you agree to act responsibly and respect
                other users, hosts, guests, properties, and applicable laws.
              </p>

              <ul>
                <li>Provide truthful information.</li>
                <li>Respect property rules and booking conditions.</li>
                <li>Do not misuse the platform or its services.</li>
                <li>Do not attempt to create fraudulent bookings or accounts.</li>
                <li>Do not use Vistara to harm, threaten, or deceive others.</li>
              </ul>
            </section>

            {/* 10 */}
            <section id="liability" className="scroll-mt-28 pt-12">
              <SectionNumber number="10" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Liability
              </h2>

              <p className="mt-4">
                Vistara provides a platform for guests and hosts to connect.
                Information supplied by users may change and may not always
                be completely accurate or current.
              </p>

              <p className="mt-4">
                To the extent permitted by applicable law, Vistara is not
                responsible for circumstances outside its reasonable control,
                including user-provided information, third-party services,
                property conditions, or events occurring during a stay.
              </p>
            </section>

            {/* 11 */}
            <section id="changes" className="scroll-mt-28 pt-12">
              <SectionNumber number="11" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Changes to these terms
              </h2>

              <p className="mt-4">
                Vistara may update these terms from time to time to reflect
                changes to the platform, services, or applicable requirements.
              </p>

              <p className="mt-4">
                When material changes are made, the updated version will be
                made available through the platform.
              </p>
            </section>

            {/* 12 */}
            <section id="contact" className="scroll-mt-28 pt-12">
              <SectionNumber number="12" />

              <h2 className="mt-3 text-2xl font-semibold text-[#03045E]">
                Contact us
              </h2>

              <p className="mt-4">
                If you have questions about these terms or your use of
                Vistara, our support team can help.
              </p>

              <Link
                href="/contact"
                className="mt-6 inline-flex rounded-xl bg-[#03045E] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
              >
                Contact Vistara →
              </Link>
            </section>

            {/* DISCLAIMER */}
            <div className="mt-14 border-t border-[#E2E8F0] pt-8">
              <p className="text-xs leading-5 text-[#94A3B8]">
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

function SectionNumber({ number }: { number: string }) {
  return (
    <span className="text-xs font-bold tracking-[0.2em] text-[#B77945]">
      {number}
    </span>
  );
}