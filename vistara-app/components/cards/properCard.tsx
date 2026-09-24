import Link from "next/link";
import Image from "next/image";
import {Property}  from "@/types/property";

type PropertyCardProps = {
  property: Property;
};

export default function PropCard({ property }: PropertyCardProps) {
  return (
    <Link
      href={`/properties/${property.id}`}
      className="group block overflow-hidden rounded-2xl bg-white"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />

        {/* Featured */}
        {property.featured && (
          <div className="absolute left-3 top-3 rounded-full bg-white px-3 py-1 text-xs font-semibold text-[#03045E] shadow-sm">
            Featured
          </div>
        )}
      </div>

      {/* Content */}
      <div className="pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-base font-semibold text-[#03045E]">
              {property.title}
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              {property.location}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-1 text-sm font-medium text-[#03045E]">
            <span>★</span>
            <span>{property.rating}</span>
          </div>
        </div>

        {/* Property info */}
        <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">
          <span>{property.type}</span>
          <span>·</span>
          <span>{property.guests} guests</span>
          <span>·</span>
          <span>{property.bedrooms} beds</span>
        </div>

        {/* Price */}
        <div className="mt-3">
          <span className="text-base font-semibold text-[#03045E]">
            ₹{property.price.toLocaleString("en-IN")}
          </span>

          <span className="ml-1 text-sm text-gray-500">
            / night
          </span>
        </div>
      </div>
    </Link>
  );
}