"use client";

import { useState } from "react";

export default function Form() {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({
      rating,
      comment,
    });

    setRating(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 rounded-2xl border border-gray-200 p-6"
    >
      <h3 className="text-lg font-semibold text-[#03045E]">
        Write a review
      </h3>

      {/* Rating */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-medium text-gray-700">
          Your rating
        </p>

        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl transition ${
                star <= rating
                  ? "text-[#0D21A1]"
                  : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mt-5">
        <label
          htmlFor="comment"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Your experience
        </label>

        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Share your experience..."
          rows={5}
          className="w-full resize-none rounded-xl border border-gray-200 p-4 text-sm outline-none transition focus:border-[#0D21A1]"
          required
        />
      </div>

      <button
        type="submit"
        className="mt-5 rounded-full bg-[#03045E] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#0D21A1]"
      >
        Submit review
      </button>
    </form>
  );
}