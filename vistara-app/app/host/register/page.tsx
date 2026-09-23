import Link from "next/link";
import Navbar from "@/components/navbar";

export default function HostRegister() {
  return (
    <main className="min-h-screen bg-[#F4F7FF]">
      <Navbar />

      {/* PAGE BACKGROUND */}
      <div className="relative overflow-hidden">

        {/* Decorative gradients */}
        <div className="pointer-events-none absolute -left-40 -top-40 h-96 w-96 rounded-full bg-[#0D21A1]/10 blur-3xl" />
        <div className="pointer-events-none absolute -right-40 top-20 h-96 w-96 rounded-full bg-[#023E8A]/10 blur-3xl" />

        <section className="relative mx-auto max-w-5xl px-6 py-12 lg:px-8 lg:py-16">

          {/* BACK */}
          <Link
            href="/host"
            className="inline-flex items-center gap-2 text-sm font-medium text-[#03045E] transition hover:text-[#0D21A1]"
          >
            <span className="text-lg">←</span>
            Back to Hosting
          </Link>

          {/* HEADER */}
          <div className="mt-8 max-w-2xl">

            <div className="inline-flex rounded-full bg-[#E8EDFF] px-4 py-2">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0D21A1]">
                Become a Host
              </span>
            </div>

            <h1 className="mt-5 font-serif text-4xl font-semibold tracking-tight text-[#03045E] sm:text-5xl">
              Start hosting with Vistara.
            </h1>

            <p className="mt-4 max-w-xl text-base leading-7 text-[#64748B]">
              Tell us a little about yourself. We’ll guide you through the
              process of creating and verifying your property.
            </p>
          </div>

          {/* PROGRESS */}
          <div className="mt-10 rounded-2xl border border-white bg-white/80 p-5 shadow-sm backdrop-blur">

            <div className="flex items-center gap-3">

              <div className="flex flex-1 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#03045E] text-xs font-bold text-white">
                  1
                </div>

                <div className="h-1 flex-1 rounded-full bg-[#03045E]" />
              </div>

              <div className="flex flex-1 items-center gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] text-xs font-bold text-[#64748B]">
                  2
                </div>

                <div className="h-1 flex-1 rounded-full bg-[#E2E8F0]" />
              </div>

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#E2E8F0] text-xs font-bold text-[#64748B]">
                3
              </div>

            </div>

            <div className="mt-3 flex justify-between text-xs font-medium">
              <span className="text-[#03045E]">
                About you
              </span>

              <span className="text-[#94A3B8]">
                Property
              </span>

              <span className="text-[#94A3B8]">
                Verification
              </span>
            </div>

          </div>

          {/* FORM */}
          <form className="mt-8 rounded-[28px] border border-white bg-white p-6 shadow-[0_20px_70px_rgba(3,4,94,0.10)] sm:p-8 lg:p-10">

            {/* SECTION TITLE */}
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#0D21A1]">
                Step 1
              </p>

              <h2 className="mt-2 text-2xl font-semibold text-[#03045E]">
                Personal information
              </h2>

              <p className="mt-2 text-sm leading-6 text-[#64748B]">
                This information helps us create your host profile.
              </p>
            </div>

            {/* NAME */}
            <div className="mt-8 grid gap-5 sm:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-[#334155]">
                  First name
                </label>

                <input
                  type="text"
                  placeholder="Enter your first name"
                  className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#334155]">
                  Last name
                </label>

                <input
                  type="text"
                  placeholder="Enter your last name"
                  className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

            </div>

            {/* EMAIL */}
            <div className="mt-5">
              <label className="text-sm font-semibold text-[#334155]">
                Email address
              </label>

              <input
                type="email"
                placeholder="you@example.com"
                className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
              />
            </div>

            {/* PHONE + CITY */}
            <div className="mt-5 grid gap-5 sm:grid-cols-2">

              <div>
                <label className="text-sm font-semibold text-[#334155]">
                  Phone number
                </label>

                <input
                  type="tel"
                  placeholder="+91 00000 00000"
                  className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-[#334155]">
                  City
                </label>

                <input
                  type="text"
                  placeholder="Where are you based?"
                  className="mt-2 w-full rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] px-4 py-3.5 text-sm text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
                />
              </div>

            </div>

            {/* ABOUT */}
            <div className="mt-5">

              <label className="text-sm font-semibold text-[#334155]">
                About you
              </label>

              <textarea
                rows={5}
                placeholder="Tell guests a little about yourself, your connection to the place, or what makes you a great host..."
                className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8F0] bg-[#FAFBFF] px-4 py-3.5 text-sm leading-6 text-[#03045E] outline-none transition placeholder:text-[#94A3B8] focus:border-[#0D21A1] focus:bg-white focus:ring-4 focus:ring-[#0D21A1]/10"
              />

              <p className="mt-2 text-xs text-[#94A3B8]">
                Keep it authentic and welcoming.
              </p>

            </div>

            {/* VERIFICATION CARD */}
            <div className="mt-8 rounded-3xl border border-[#D8E1FF] bg-gradient-to-br from-[#F0F4FF] to-[#F8FAFF] p-6">

              <div className="flex gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#03045E] text-lg text-white">
                  ✓
                </div>

                <div>
                  <h3 className="font-semibold text-[#03045E]">
                    Vistara verification
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-[#64748B]">
                    Before your property goes live, Vistara will verify
                    your identity and property information to help create
                    a trusted experience for guests.
                  </p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#475569]">
                      Identity verification
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#475569]">
                      Property verification
                    </span>

                    <span className="rounded-full bg-white px-3 py-1.5 text-xs font-medium text-[#475569]">
                      Secure process
                    </span>
                  </div>
                </div>

              </div>

            </div>

            {/* ACTIONS */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#E2E8F0] pt-7 sm:flex-row sm:items-center sm:justify-between">

              <Link
                href="/host"
                className="rounded-2xl px-5 py-3 text-center text-sm font-semibold text-[#64748B] transition hover:bg-[#F8FAFF] hover:text-[#03045E]"
              >
                Cancel
              </Link>

              <button
                type="submit"
                className="rounded-2xl bg-[#03045E] px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-[#03045E]/15 transition hover:bg-[#0D21A1] hover:shadow-xl"
              >
                Continue
                <span className="ml-2">→</span>
              </button>

            </div>

          </form>

          {/* FOOTNOTE */}
          <p className="mx-auto mt-6 max-w-xl text-center text-xs leading-5 text-[#94A3B8]">
            By continuing, you agree to provide accurate information and
            complete Vistara&apos;s host verification process.
          </p>

        </section>
      </div>
    </main>
  );
}