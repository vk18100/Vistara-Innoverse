import PropCard from "@/components/cards/properCard";
import { properties } from "@/data/properties";

export default function Cards() {
  if (!properties?.length) {
    return null;
  }

  return (
    <section className="bg-white px-4 py-14 sm:px-6 sm:py-16 lg:px-10 lg:py-20">
      <div className="mx-auto max-w-7xl">

        {/* ================= HEADER ================= */}
        <div className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />

              <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#64748B]">
                Vistara Stays
              </p>
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[#111827] sm:text-4xl">
              Stay somewhere
              <span className="text-[#0D21A1]"> worth remembering.</span>
            </h2>

            <p className="mt-3 max-w-xl text-sm leading-6 text-[#64748B] sm:text-base">
              Discover handpicked places to stay, from peaceful homes to
              memorable escapes.
            </p>
          </div>

          {/* View all */}
          <a
            href="/stays"
            className="
              inline-flex w-fit items-center gap-2
              rounded-full
              border border-[#E2E8F0]
              px-4 py-2.5
              text-sm font-semibold
              text-[#03045E]
              transition
              hover:border-[#03045E]
              hover:bg-[#EEF4FF]
            "
          >
            View all
            <span aria-hidden="true">→</span>
          </a>
        </div>

        {/* ================= CARDS ================= */}
        <div
          className="
            grid
            grid-cols-1
            gap-x-5 gap-y-8
            sm:grid-cols-2
            lg:grid-cols-3
            xl:grid-cols-4
          "
        >
          {properties.map((property) => (
            <PropCard
              key={property.id}
              property={property}
            />
          ))}
        </div>

        {/* ================= MOBILE VIEW ALL ================= */}
        <div className="mt-10 flex justify-center sm:hidden">
          <a
            href="/stays"
            className="
              inline-flex items-center gap-2
              rounded-full
              bg-[#03045E]
              px-6 py-3
              text-sm font-semibold
              text-white
              transition
              hover:bg-[#023E8A]
            "
          >
            Explore all stays
            <span aria-hidden="true">→</span>
          </a>
        </div>

      </div>
    </section>
  );
}