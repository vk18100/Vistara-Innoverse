"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";

type ErrorStateProps = {
  title?: string;
  description?: string;
  onRetry?: () => void;
};

export default function ErrorState({
  title = "Something went wrong",
  description = "We couldn't load this page right now. Please try again in a moment.",
  onRetry,
}: ErrorStateProps) {
  return (
    <div
      className="
        flex
        min-h-[400px]
        items-center
        justify-center
        px-5
        py-12
        sm:px-6
      "
      role="alert"
      aria-live="assertive"
    >
      <div className="w-full max-w-md text-center">

        {/* ERROR MARK */}
        <div className="relative mx-auto h-20 w-20">

          {/* Soft background */}
          <div
            className="
              absolute
              inset-0
              rounded-full
              bg-[#F7EDE7]
            "
            aria-hidden="true"
          />

          {/* Icon container */}
          <div
            className="
              absolute
              inset-2
              flex
              items-center
              justify-center
              rounded-full
              border
              border-[#E8C9BA]
              bg-[#FFFDF9]
              text-[#B96342]
            "
            aria-hidden="true"
          >
            <AlertTriangle
              size={25}
              strokeWidth={1.8}
            />
          </div>
        </div>

        {/* LABEL */}
        <p
          className="
            mt-7
            text-[10px]
            font-bold
            uppercase
            tracking-[0.28em]
            text-[#B96342]
          "
        >
          VISTARA
        </p>

        {/* TITLE */}
        <h2
          className="
            mt-2
            font-serif
            text-2xl
            font-semibold
            tracking-tight
            text-[#292524]
            sm:text-3xl
          "
        >
          {title}
        </h2>

        {/* DESCRIPTION */}
        <p
          className="
            mx-auto
            mt-3
            max-w-sm
            text-sm
            leading-6
            text-[#78716C]
          "
        >
          {description}
        </p>

        {/* RETRY */}
        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="
              group
              mt-7
              inline-flex
              items-center
              justify-center
              gap-2.5
              rounded-2xl
              bg-[#292524]
              px-6
              py-3.5
              text-sm
              font-semibold
              text-white
              transition-all
              duration-200
              hover:bg-[#B96342]
              active:scale-[0.98]
              focus:outline-none
              focus:ring-2
              focus:ring-[#B96342]
              focus:ring-offset-2
              focus:ring-offset-white
            "
          >
            <RefreshCw
              size={16}
              strokeWidth={2}
              className="
                transition-transform
                duration-300
                group-hover:rotate-180
              "
            />

            Try again
          </button>
        )}

        {/* SMALL SUPPORT TEXT */}
        <p className="mt-5 text-[11px] text-[#A8A29E]">
          If the problem continues, please try again later.
        </p>
      </div>
    </div>
  );
}