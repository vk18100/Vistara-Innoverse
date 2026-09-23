import Image from "next/image";
// import { Heart } from "lucide-react";
type Property = {
  id: number;
  name: string;
  location: string;
  type: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  verified?: boolean;
};

type PropertyCardProps = {
  property: Property;
};

export default function PropertyCard({ property }: PropertyCardProps) {
  return (
    <article className="group w-full">

      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-[#EEF2FF]">

        <Image
          src={`/images/${property.image}`}
          alt={property.name}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Wishlist */}
        <button
          className="absolute right-3 top-3 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-105"
          aria-label="Add to wishlist"
        >
          {/* <Heart
            size={21}
            strokeWidth={1.8}
            className="text-[#03045E]"
          /> */}
        </button>

        {/* Verified */}
        {property.verified && (
          <div className="absolute bottom-3 left-3 rounded-full bg-white px-4 py-2 text-xs font-semibold text-[#03045E] shadow-md">
            ✓ Verified
          </div>
        )}
      </div>

      {/* Details */}
      <div className="mt-4">

        <div className="flex items-center justify-between gap-3">
          <p className="text-[15px] font-medium text-[#03045E]">
            {property.location}
          </p>

          <span className="text-sm font-medium text-[#03045E]">
            ★ {property.rating}
          </span>
        </div>

        <h3 className="mt-2 text-[16px] font-semibold text-[#03045E]">
          {property.name}
        </h3>

        <p className="mt-1 text-sm text-[#64748B]">
          {property.type}
        </p>

        <p className="mt-4 text-sm text-[#64748B]">
          <span className="text-base font-bold text-[#03045E]">
            ₹{property.price.toLocaleString("en-IN")}
          </span>{" "}
          night
        </p>

        <p className="mt-1 text-sm text-[#94A3B8]">
          {property.reviews} reviews
        </p>

      </div>
    </article>
  );
}