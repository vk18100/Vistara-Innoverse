import Link from "next/link";
import Navbar from "@/components/navbar";

const checks = [
  {
    title: "Property Identity",
    description:
      "Property information is checked against the details submitted by the host.",
    status: "Verified",
  },
  {
    title: "Host Verification",
    description:
      "Host identity and submitted information are reviewed before listing.",
    status: "Verified",
  },
  {
    title: "Location Verification",
    description:
      "The property's listed location is reviewed for consistency.",
    status: "Verified",
  },
  {
    title: "Property Documents",
    description:
      "Required property documentation can be reviewed as part of the verification process.",
    status: "Verified",
  },
];

export default function Verification() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-6xl px-6 py-12">

        {/* Back */}
        <Link
          href="/stays"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Stays
        </Link>

        {/* Header */}
        <div className="mt-10 max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Vistara Trust
          </span>

          <h1 className="mt-3 text-4xl font-bold tracking-tight text-[#03045e] md:text-5xl">
            Property Verification
          </h1>

          <p className="mt-5 text-base leading-7 text-gray-500">
            Vistara uses a verification process to make property
            information more transparent for guests.
          </p>
        </div>

        {/* Status */}
        <div className="mt-10 rounded-3xl border border-blue-100 bg-[#f7f9ff] p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-4">

              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#03045e] text-2xl text-white">
                ✓
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-[#023e8a]">
                  Verification Status
                </p>

                <h2 className="mt-1 text-2xl font-semibold text-[#03045e]">
                  Verified Property
                </h2>
              </div>

            </div>

            <span className="w-fit rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#03045e] shadow-sm">
              Verified
            </span>

          </div>

          <div className="mt-6 border-t border-blue-100 pt-5 text-sm text-gray-500">
            Last reviewed: September 2026
          </div>

        </div>

        {/* Verification checks */}
        <section className="mt-12">

          <h2 className="text-2xl font-semibold text-[#03045e]">
            What has been checked
          </h2>

          <p className="mt-2 text-gray-500">
            These checks help provide clearer information about the property.
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">

            {checks.map((check) => (
              <div
                key={check.title}
                className="rounded-2xl border border-gray-200 p-6 transition hover:border-[#023e8a]"
              >

                <div className="flex items-start justify-between gap-4">

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {check.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-gray-500">
                      {check.description}
                    </p>
                  </div>

                  <span className="shrink-0 rounded-full bg-[#eef2ff] px-3 py-1 text-xs font-semibold text-[#03045e]">
                    ✓ {check.status}
                  </span>

                </div>

              </div>
            ))}

          </div>

        </section>

        {/* How it works */}
        <section className="mt-14">

          <h2 className="text-2xl font-semibold text-[#03045e]">
            How verification works
          </h2>

          <div className="mt-6 grid gap-4 md:grid-cols-3">

            <div className="rounded-2xl border border-gray-200 p-6">
              <span className="text-sm font-bold text-[#023e8a]">
                01
              </span>

              <h3 className="mt-4 font-semibold text-gray-900">
                Information submitted
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                The host submits property and ownership information.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <span className="text-sm font-bold text-[#023e8a]">
                02
              </span>

              <h3 className="mt-4 font-semibold text-gray-900">
                Information reviewed
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Submitted information goes through the applicable checks.
              </p>
            </div>

            <div className="rounded-2xl border border-gray-200 p-6">
              <span className="text-sm font-bold text-[#023e8a]">
                03
              </span>

              <h3 className="mt-4 font-semibold text-gray-900">
                Verification shown
              </h3>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Verification information is displayed to help guests make
                informed decisions.
              </p>
            </div>

          </div>

        </section>

        {/* Note */}
        <div className="mt-12 rounded-2xl border border-gray-200 p-6">
          <h3 className="font-semibold text-[#03045e]">
            Important information
          </h3>

          <p className="mt-2 text-sm leading-6 text-gray-500">
            A verification badge indicates that the listed checks have
            been completed according to Vistara's verification process.
            It does not represent a guarantee of a guest's experience.
          </p>
        </div>

      </section>
    </main>
  );
}