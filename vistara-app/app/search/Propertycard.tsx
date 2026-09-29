import Link from "next/link";
import { Heart } from "lucide-react";

type PropertyCardProps = {
  id: number | string;
  title: string;
  location: string;
  price: number;
  image: string;
  rating?: number;
  verified?: boolean;
};

export default function PropertyCard({
  id,
  title,
  location,
  price,
  image,
  rating,
  verified,
}: PropertyCardProps) {
  return (
    <Link
      href={`/stays/${id}`}
      className="group block overflow-hidden rounded-2xl border border-[#03045E]/10 bg-white shadow-[0_10px_30px_rgba(3,4,94,0.05)] transition hover:-translate-y-1 hover:shadow-[0_15px_40px_rgba(3,4,94,0.10)]"
    >
      {/* IMAGE */}
      <div className="relative h-52 w-full overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />

        {/* VERIFIED */}
        {verified && (
          <span className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#03045E] shadow">
            Verified
          </span>
        )}

        {/* WISHLIST */}
        <button
          type="button"
          aria-label={`Save ${title} to wishlist`}
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#03045E] shadow transition hover:bg-white"
        >
          <Heart size={18} strokeWidth={1.8} />
        </button>
      </div>

      {/* CONTENT */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold text-[#03045E]">
            {title}
          </h2>

          {rating !== undefined && (
            <span className="shrink-0 text-sm font-semibold text-[#03045E]">
              ★ {rating}
            </span>
          )}
        </div>

        <p className="mt-2 text-sm text-[#64748B]">
          {location}
        </p>

        <div className="mt-4">
          <span className="text-lg font-bold text-[#03045E]">
            ₹{price.toLocaleString("en-IN")}
          </span>

          <span className="ml-1 text-sm text-[#64748B]">
            / night
          </span>
        </div>
      </div>
    </Link>
  );
}