export default function Hero() {
  return (
    <section className="min-h-[620px] bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-10">

        <p className="mb-6 text-xs font-semibold uppercase tracking-[0.3em] text-[#0D21A1]">
          DISCOVER • STAY • EXPERIENCE
        </p>

        <h1 className="max-w-4xl font-serif text-6xl font-semibold leading-[1.05] tracking-[-0.04em] text-[#03045E]">
          Find a place
          <br />
          worth{" "}
          <span className="text-[#0D21A1]">
            remembering.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-500">
          Discover stays, hidden destinations and experiences shaped around
          the way you want to travel.
        </p>

        {/* SEARCH */}
        <div className="mt-12 max-w-5xl rounded-[24px] border border-slate-200 bg-white p-2 shadow-[0_12px_40px_rgba(3,4,94,0.10)]">

          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto]">

            {/* WHERE */}
            <div className="px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#03045E]">
                Where
              </p>
              <input
                placeholder="Search destinations"
                className="mt-1 w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              />
            </div>

            {/* CHECK IN */}
            <div className="border-t border-slate-100 px-5 py-4 md:border-l md:border-t-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#03045E]">
                Check In
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Add date
              </p>
            </div>

            {/* GUESTS */}
            <div className="border-t border-slate-100 px-5 py-4 md:border-l md:border-t-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#03045E]">
                Guests
              </p>
              <p className="mt-1 text-sm text-slate-400">
                Add guests
              </p>
            </div>

            {/* SEARCH */}
            <button className="m-1 rounded-[18px] bg-[#03045E] px-8 py-4 font-semibold text-white transition hover:bg-[#0D21A1]">
              Search
            </button>

          </div>
        </div>

      </div>
    </section>
  );
}