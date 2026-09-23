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
    <div className="flex min-h-[400px] items-center justify-center px-6">

      <div className="max-w-md text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2ff]">
          <span className="text-2xl font-semibold text-[#03045e]">
            V
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#03045e]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {description}
        </p>

        <Link
          href={href}
          className="mt-7 inline-flex rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
        >
          {buttonText}
        </Link>

      </div>
    </div>
  );
}