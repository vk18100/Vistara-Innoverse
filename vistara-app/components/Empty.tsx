import Link from "next/link";

type EmptyStateProps = {
  title?: string;
  description?: string;
  buttonText?: string;
  href?: string;
};

export default function EmptyState({
  title = "Nothing here yet",
  description = "We couldn't find anything to show you right now.",
  buttonText = "Explore Stays",
  href = "/stays",
}: EmptyStateProps) {
  return (
    <div
      className="flex min-h-[400px] items-center justify-center px-6"
      role="status"
    >
      <div className="max-w-md text-center">
        {/* Icon */}
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EEF2FF]"
          aria-hidden="true"
        >
          <span className="text-2xl font-semibold text-[#03045E]">
            V
          </span>
        </div>

        {/* Title */}
        <h2 className="mt-6 text-2xl font-bold text-[#03045E]">
          {title}
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm leading-6 text-gray-500">
          {description}
        </p>

        {/* Action */}
        <Link
          href={href}
          className="mt-7 inline-flex rounded-xl bg-[#03045E] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023E8A] focus:outline-none focus:ring-2 focus:ring-[#03045E] focus:ring-offset-2"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
}