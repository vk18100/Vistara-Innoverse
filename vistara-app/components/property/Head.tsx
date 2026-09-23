type HeadProps = {
  name: string;
  location: string;
  rating: number;
  reviews: number;
};

export default function Head({
  name,
  location,
  rating,
  reviews,
}: HeadProps) {
  return (
    <div className="flex items-start justify-between gap-6 py-6">
      <div>
        <h1 className="text-3xl font-semibold text-[#03045E]">
          {name}
        </h1>

        <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-gray-600">
          <span>{location}</span>

          <span>•</span>

          <span className="font-medium text-[#03045E]">
            ★ {rating}
          </span>

          <span>({reviews} reviews)</span>
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="button"
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-[#0D21A1] hover:text-[#0D21A1]"
        >
          ↗ Share
        </button>

        <button
          type="button"
          className="rounded-full border border-gray-200 px-4 py-2 text-sm font-medium transition hover:border-[#0D21A1] hover:text-[#0D21A1]"
        >
          ♡ Save
        </button>
      </div>
    </div>
  );
}