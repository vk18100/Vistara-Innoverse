import Link from "next/link";
import Navbar from "@/components/navbar";

const verificationItems = [
  {
    title: "Identity Verification",
    description:
      "Verify your identity using a government-issued identity document.",
    status: "Required",
  },
  {
    title: "Property Ownership",
    description:
      "Upload documents that establish your right to list this property.",
    status: "Required",
  },
  {
    title: "Property Certificate",
    description:
      "Provide the relevant property or registration certificate.",
    status: "Required",
  },
];

export default function Verification() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />

      <section className="mx-auto max-w-4xl px-6 py-12">

        <Link
          href="/host/property/new"
          className="text-sm font-medium text-[#03045e] hover:text-[#023e8a]"
        >
          ← Back to Property
        </Link>

        {/* Header */}
        <div className="mt-8">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#023e8a]">
            Verification
          </p>

          <h1 className="mt-3 text-4xl font-bold text-[#03045e]">
            Verify your property
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-gray-500">
            Verification helps Vistara build trust between hosts and
            travelers. Complete the required checks before your property
            goes live.
          </p>
        </div>

        {/* Progress */}
        <div className="mt-8 flex items-center gap-3">
          <div className="h-1.5 flex-1 rounded-full bg-[#03045e]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#03045e]" />
          <div className="h-1.5 flex-1 rounded-full bg-[#03045e]" />
        </div>

        <p className="mt-2 text-xs text-gray-400">
          Step 3 of 3
        </p>

        {/* Verification cards */}
        <div className="mt-10 space-y-4">

          {verificationItems.map((item, index) => (
            <div
              key={item.title}
              className="rounded-2xl border border-gray-200 p-6 transition hover:border-[#023e8a]"
            >
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                {/* Number */}
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#eef2ff] font-semibold text-[#03045e]">
                  0{index + 1}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3">
                    <h2 className="font-semibold text-gray-900">
                      {item.title}
                    </h2>

                    <span className="rounded-full bg-[#f0f3ff] px-3 py-1 text-xs font-medium text-[#03045e]">
                      {item.status}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-6 text-gray-500">
                    {item.description}
                  </p>
                </div>

                {/* Upload */}
                <button
                  type="button"
                  className="shrink-0 rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-[#03045e] transition hover:border-[#03045e]"
                >
                  Upload
                </button>

              </div>
            </div>
          ))}

        </div>

        {/* Verification information */}
        <div className="mt-8 rounded-2xl bg-[#f5f7ff] p-6">

          <div className="flex gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#03045e] text-sm font-bold text-white">
              i
            </div>

            <div>
              <h2 className="font-semibold text-[#03045e]">
                Why verification matters
              </h2>

              <p className="mt-2 text-sm leading-6 text-gray-500">
                Verified information helps travelers understand which
                properties and hosts have completed Vistara's verification
                process.
              </p>
            </div>
          </div>

        </div>

        {/* Submit */}
        <div className="mt-8 flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:justify-end">

          <Link
            href="/host/property/new"
            className="rounded-xl border border-gray-200 px-6 py-3 text-center text-sm font-medium text-gray-700 hover:border-[#03045e]"
          >
            Back
          </Link>

          <button
            type="button"
            className="rounded-xl bg-[#03045e] px-7 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
          >
            Submit for Verification
          </button>

        </div>

      </section>
    </main>
  );
}