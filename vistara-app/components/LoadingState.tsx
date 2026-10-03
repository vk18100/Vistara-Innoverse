export default function LoadingState() {
  return (
    <div
      className="
        flex
        min-h-[360px]
        items-center
        justify-center
        px-6
        py-12
      "
      role="status"
      aria-live="polite"
      aria-label="Loading stays"
    >
      <div className="w-full max-w-sm text-center">

        {/* ANIMATED MARK */}
        <div className="relative mx-auto h-20 w-20">

          {/* Outer glow */}
          <div
            className="
              absolute
              inset-0
              animate-pulse
              rounded-full
              bg-[#F4E7D7]
            "
            aria-hidden="true"
          />

          {/* Middle circle */}
          <div
            className="
              absolute
              inset-2
              flex
              items-center
              justify-center
              rounded-full
              border
              border-[#D9B98C]
              bg-[#FFFDF9]
            "
            aria-hidden="true"
          >
            {/* Spinner */}
            <div
              className="
                h-8
                w-8
                animate-spin
                rounded-full
                border-[3px]
                border-[#E7D8C5]
                border-t-[#B96342]
              "
            />
          </div>

          {/* Decorative dots */}
          <span
            className="
              absolute
              -right-1
              top-2
              h-2.5
              w-2.5
              animate-bounce
              rounded-full
              bg-[#D9A441]
            "
            aria-hidden="true"
          />

          <span
            className="
              absolute
              -bottom-1
              left-2
              h-2
              w-2
              animate-pulse
              rounded-full
              bg-[#B96342]
            "
            aria-hidden="true"
          />
        </div>

        {/* TEXT */}
        <div className="mt-7">

          <p
            className="
              text-[10px]
              font-bold
              uppercase
              tracking-[0.28em]
              text-[#B96342]
            "
          >
            VISTARA
          </p>

          <h2
            className="
              mt-2
              font-serif
              text-2xl
              font-semibold
              tracking-tight
              text-[#292524]
            "
          >
            Finding your stay
          </h2>

          <p
            className="
              mx-auto
              mt-2
              max-w-xs
              text-sm
              leading-6
              text-[#78716C]
            "
          >
            Exploring verified places and meaningful stays for your journey.
          </p>
        </div>

        {/* LOADING INDICATOR */}
        <div
          className="mx-auto mt-6 flex items-center justify-center gap-1.5"
          aria-hidden="true"
        >
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#B96342]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#D9A441] [animation-delay:150ms]" />
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#8B6F3D] [animation-delay:300ms]" />
        </div>
      </div>
    </div>
  );
}