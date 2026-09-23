type AmenProps = {
  amenities: string[];
};

export default function Amen({ amenities }: AmenProps) {
  return (
    <section className="border-b border-gray-200 py-7">
      <h2 className="text-xl font-semibold text-[#03045E]">
        What this place offers
      </h2>

      <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
        {amenities.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 text-sm text-gray-700"
          >
            <span className="h-2 w-2 rounded-full bg-[#0D21A1]" />
            {item}
          </div>
        ))}
      </div>
    </section>
  );
}