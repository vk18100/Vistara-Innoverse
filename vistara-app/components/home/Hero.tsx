export default function Hero() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-7xl px-6 pb-20 pt-24 lg:px-10 lg:pb-28 lg:pt-32">

        <p className="mb-6 text-xs font-bold uppercase tracking-[0.3em] text-[#0D21A1]">
          DISCOVER • STAY • EXPERIENCE
        </p>

        <h1 className="max-w-4xl font-serif text-5xl font-semibold leading-[1.05] tracking-tight text-[#03045E] sm:text-6xl lg:text-7xl">
          Find a place
          <br />
          worth{" "}
          <span className="text-[#0D21A1]">
            remembering.
          </span>
        </h1>

        <p className="mt-7 max-w-2xl text-base leading-8 text-gray-500 sm:text-lg">
          Discover stays, hidden destinations and experiences shaped around
          the way you want to travel.
        </p>

        {/* SEARCH */}
        <div className="mt-12 max-w-5xl rounded-3xl border border-gray-200 bg-white p-2 shadow-[0_15px_45px_rgba(3,4,94,0.10)]">
          <div className="grid grid-cols-1 md:grid-cols-[1.6fr_1fr_1fr_auto]">

            <div className="px-5 py-4">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#03045E]">
                Where
              </p>

              <input
                type="text"
                placeholder="Search destinations"
                className="mt-1 w-full bg-transparent text-sm text-[#03045E] outline-none placeholder:text-gray-400"
              />
            </div>

            <div className="border-t border-gray-100 px-5 py-4 md:border-l md:border-t-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#03045E]">
                Check In
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Add date
              </p>
            </div>

            <div className="border-t border-gray-100 px-5 py-4 md:border-l md:border-t-0">
              <p className="text-[11px] font-bold uppercase tracking-wider text-[#03045E]">
                Guests
              </p>

              <p className="mt-1 text-sm text-gray-400">
                Add guests
              </p>
            </div>

            <button
              type="button"
              className="m-1 rounded-2xl bg-[#03045E] px-8 py-4 text-sm font-semibold text-white transition hover:bg-[#0D21A1]"
            >
              Search
            </button>

          </div>
        </div>
      </div>
    </section>
  );
}