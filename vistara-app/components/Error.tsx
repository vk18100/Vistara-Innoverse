"use client";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this page. Please try again.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div className="flex min-h-[400px] items-center justify-center px-6">

      <div className="max-w-md text-center">

        {/* Icon */}
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#eef2ff]">
          <span className="text-2xl font-bold text-[#03045e]">
            !
          </span>
        </div>

        <h2 className="mt-6 text-2xl font-bold text-[#03045e]">
          {title}
        </h2>

        <p className="mt-3 text-sm leading-6 text-gray-500">
          {description}
        </p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="mt-7 rounded-xl bg-[#03045e] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#023e8a]"
          >
            Try Again
          </button>
        )}

      </div>
    </div>
  );
}