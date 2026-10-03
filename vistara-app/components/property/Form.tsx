"use client";

import { useState } from "react";
import { CheckCircle2, Star } from "lucide-react";

export default function Form() {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rating || !comment.trim()) return;

    console.log({
      rating,
      comment: comment.trim(),
    });

    setSubmitted(true);
    setRating(0);
    setComment("");
  };

  if (submitted) {
    return (
      <section className="mt-8 rounded-[28px] border border-[#E7E5E4] bg-[#FCFBF8] p-6 sm:p-8">
        <div className="flex flex-col items-center text-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#F1EBDD] text-[#8B6F3D]">
            <CheckCircle2 size={27} strokeWidth={1.8} />
          </div>

          <h3 className="mt-5 text-xl font-semibold text-[#292524]">
            Thanks for sharing
          </h3>

          <p className="mt-2 max-w-sm text-sm leading-6 text-[#78716C]">
            Your experience has been received and will help other travellers
            discover this stay.
          </p>

          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="
              mt-6 rounded-full
              border border-[#D6D3D1]
              bg-white px-5 py-2.5
              text-sm font-medium text-[#44403C]
              transition hover:bg-[#F5F1E8]
            "
          >
            Write another review
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <form
        onSubmit={handleSubmit}
        className="
          overflow-hidden
          rounded-[28px]
          border border-[#E7E5E4]
          bg-white
          shadow-[0_10px_35px_rgba(41,37,36,0.05)]
        "
      >
        {/* HEADER */}
        <div className="border-b border-[#E7E5E4] bg-[#FCFBF8] px-5 py-6 sm:px-7">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#8B6F3D]">
            Your experience
          </p>

          <h3 className="mt-2 text-xl font-semibold tracking-tight text-[#292524] sm:text-2xl">
            Share your stay
          </h3>

          <p className="mt-2 text-sm leading-6 text-[#78716C]">
            Tell future travellers what made your experience memorable.
          </p>
        </div>

        {/* BODY */}
        <div className="space-y-7 p-5 sm:p-7">
          {/* RATING */}
          <div>
            <label className="text-sm font-semibold text-[#44403C]">
              How was your stay?
            </label>

            <div
              className="mt-3 flex items-center gap-1.5"
              role="radiogroup"
              aria-label="Rating"
            >
              {[1, 2, 3, 4, 5].map((star) => {
                const active = star <= (hoverRating || rating);

                return (
                  <button
                    key={star}
                    type="button"
                    role="radio"
                    aria-label={`${star} out of 5 stars`}
                    aria-checked={rating === star}
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoverRating(star)}
                    onMouseLeave={() => setHoverRating(0)}
                    className="
                      flex h-11 w-11
                      items-center justify-center
                      rounded-xl
                      border border-[#E7E5E4]
                      bg-white
                      transition-all duration-150
                      hover:-translate-y-0.5
                      hover:border-[#D6D3D1]
                    "
                  >
                    <Star
                      size={20}
                      strokeWidth={1.8}
                      className={
                        active
                          ? "fill-[#D9A441] text-[#D9A441]"
                          : "text-[#C4C0BC]"
                      }
                    />
                  </button>
                );
              })}
            </div>

            <p className="mt-2 text-xs text-[#A8A29E]">
              {rating === 0
                ? "Select a rating"
                : `${rating} out of 5`}
            </p>
          </div>

          {/* COMMENT */}
          <div>
            <label
              htmlFor="comment"
              className="text-sm font-semibold text-[#44403C]"
            >
              Tell us about your experience
            </label>

            <div className="mt-3 rounded-2xl border border-[#E7E5E4] bg-[#FAFAF9] transition focus-within:border-[#CFC7B7] focus-within:bg-white focus-within:shadow-[0_0_0_4px_rgba(217,164,65,0.08)]">
              <textarea
                id="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="What did you enjoy about this place?"
                rows={5}
                maxLength={1000}
                className="
                  w-full resize-none
                  bg-transparent
                  px-4 py-4
                  text-sm leading-6 text-[#44403C]
                  outline-none
                  placeholder:text-[#A8A29E]
                "
                required
              />

              <div className="px-4 pb-3 text-right text-[11px] text-[#A8A29E]">
                {comment.length}/1000
              </div>
            </div>
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={!rating || !comment.trim()}
            className="
              w-full rounded-2xl
              bg-[#292524]
              px-5 py-3.5
              text-sm font-semibold text-white
              transition-all duration-200
              hover:bg-[#44403C]
              active:scale-[0.99]
              disabled:cursor-not-allowed
              disabled:bg-[#D6D3D1]
            "
          >
            Publish review
          </button>

          <p className="text-center text-xs leading-5 text-[#A8A29E]">
            Your review helps other travellers make better choices.
          </p>
        </div>
      </form>
    </section>
  );
}