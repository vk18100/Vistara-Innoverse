import Image from "next/image";
import { ShieldCheck, ChevronRight } from "lucide-react";

type HostProps = {
  name: string;
  image: string;
};

export default function Host({ name, image }: HostProps) {
  return (
    <section className="border-b border-stone-200 py-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        {/* Host */}
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-stone-900">
            Meet your host
          </h2>

          <div className="mt-5 flex items-center gap-4">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full bg-stone-100 ring-2 ring-white shadow-sm">
              <Image
                src={image}
                alt={`${name}, Vistara host`}
                fill
                sizes="64px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <h3 className="truncate text-base font-semibold text-stone-900">
                {name}
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Your Vistara host
              </p>

              <div className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#8A6847]">
                <ShieldCheck size={14} aria-hidden="true" />
                Verified host
              </div>
            </div>
          </div>
        </div>

        {/* View profile */}
        <button
          type="button"
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-stone-200
            bg-white
            px-4
            py-2.5
            text-sm
            font-medium
            text-stone-700
            transition
            hover:border-stone-300
            hover:bg-stone-50
            focus:outline-none
            focus:ring-2
            focus:ring-stone-300
            focus:ring-offset-2
          "
        >
          View profile
          <ChevronRight size={15} aria-hidden="true" />
        </button>
      </div>
    </section>
  );
}