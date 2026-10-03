"use client";

import { useState } from "react";
import { Star, Send, X } from "lucide-react";

type Review = {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
};

type ReviewsProps = {
  reviews: Review[];
};

export default function Reviews({ reviews: initialReviews }: ReviewsProps) {
  const [reviews, setReviews] = useState(initialReviews);
  const [showForm, setShowForm] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const averageRating =
    reviews.length > 0
      ? (
          reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        ).toFixed(1)
      : "0.0";

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!rating || !comment.trim()) return;

    const newReview: Review = {
      id: Date.now(),
      user: "You",
      rating,
      comment: comment.trim(),
      date: "Just now",
    };

    setReviews((current) => [newReview, ...current]);
    setRating(0);
    setComment("");
    setShowForm(false);
  }

  return (
    <section className="border-b border-stone-200 py-8">
      {/* Header */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7653]">
            Guest thoughts
          </p>

          <div className="mt-2 flex flex-wrap items-center gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-stone-900">
              Reviews
            </h2>

            <span className="h-1 w-1 rounded-full bg-stone-300" />

            <div className="flex items-center gap-1.5 text-sm font-medium text-stone-700">
              <Star
                size={15}
                fill="currentColor"
                className="text-[#B48A5A]"
              />
              {averageRating}
            </div>

            <span className="text-sm text-stone-400">
              {reviews.length}{" "}
              {reviews.length === 1 ? "review" : "reviews"}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setShowForm((current) => !current)}
          className="
            inline-flex
            w-fit
            items-center
            gap-2
            rounded-full
            border
            border-stone-200
            bg-white
            px-5
            py-2.5
            text-sm
            font-semibold
            text-stone-700
            transition
            hover:border-[#D8C1A3]
            hover:bg-[#FAF5EE]
            hover:text-[#8A6847]
          "
        >
          {showForm ? (
            <>
              <X size={16} />
              Close
            </>
          ) : (
            "Write a review"
          )}
        </button>
      </div>

      {/* Review Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mt-6 rounded-[24px] border border-[#E8DED0] bg-[#FAF7F2] p-5 sm:p-6"
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="font-semibold text-stone-900">
                Share your experience
              </h3>

              <p className="mt-1 text-sm text-stone-500">
                Tell future guests what you loved about the stay.
              </p>
            </div>
          </div>

          {/* Rating */}
          <div className="mt-5">
            <p className="text-sm font-medium text-stone-700">
              Your rating
            </p>

            <div className="mt-2 flex gap-1">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  aria-label={`Rate ${value} out of 5`}
                  className="rounded-full p-1 transition hover:bg-white"
                >
                  <Star
                    size={24}
                    fill={value <= rating ? "currentColor" : "none"}
                    className={
                      value <= rating
                        ? "text-[#B48A5A]"
                        : "text-stone-300"
                    }
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mt-5">
            <label
              htmlFor="review-comment"
              className="text-sm font-medium text-stone-700"
            >
              Your experience
            </label>

            <textarea
              id="review-comment"
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              placeholder="What made your stay memorable?"
              rows={4}
              required
              className="
                mt-2
                w-full
                resize-none
                rounded-2xl
                border
                border-stone-200
                bg-white
                px-4
                py-3
                text-sm
                text-stone-800
                outline-none
                placeholder:text-stone-400
                focus:border-[#C9A77A]
                focus:ring-4
                focus:ring-[#C9A77A]/10
              "
            />
          </div>

          <button
            type="submit"
            disabled={!rating || !comment.trim()}
            className="
              mt-4
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-[#8A6847]
              px-5
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#735438]
              disabled:cursor-not-allowed
              disabled:opacity-40
            "
          >
            <Send size={15} />
            Post review
          </button>
        </form>
      )}

      {/* Reviews */}
      {reviews.length === 0 ? (
        <div className="mt-8 rounded-[24px] bg-[#FAF9F6] px-6 py-10 text-center">
          <p className="font-medium text-stone-800">
            No reviews yet
          </p>

          <p className="mt-1 text-sm text-stone-500">
            Be the first guest to share your experience.
          </p>
        </div>
      ) : (
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="
                rounded-[24px]
                border
                border-stone-200
                bg-white
                p-5
                transition
                hover:-translate-y-0.5
                hover:shadow-[0_12px_35px_rgba(41,37,36,0.07)]
              "
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-center gap-3">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      shrink-0
                      items-center
                      justify-center
                      rounded-full
                      bg-[#F1E5D6]
                      text-sm
                      font-semibold
                      text-[#8A6847]
                    "
                  >
                    {review.user.charAt(0).toUpperCase()}
                  </div>

                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-stone-900">
                      {review.user}
                    </h3>

                    <p className="mt-0.5 text-xs text-stone-400">
                      {review.date}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#FAF5EE] px-2.5 py-1 text-xs font-semibold text-[#8A6847]">
                  <Star
                    size={12}
                    fill="currentColor"
                  />
                  {review.rating}
                </div>
              </div>

              <p className="mt-4 text-sm leading-6 text-stone-600">
                {review.comment}
              </p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}