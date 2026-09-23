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

export default function Reviews({ reviews }: ReviewsProps) {
  return (
    <section className="border-b border-gray-200 py-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-semibold text-[#03045E]">
            Reviews
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            What guests say about this property
          </p>
        </div>

        <button className="rounded-full border border-[#03045E] px-5 py-2 text-sm font-medium text-[#03045E] hover:bg-[#03045E] hover:text-white">
          Write a review
        </button>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="rounded-2xl border border-gray-100 p-5"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">
                  {review.user}
                </h3>

                <p className="text-xs text-gray-500">
                  {review.date}
                </p>
              </div>

              <span className="text-sm font-medium text-[#03045E]">
                ★ {review.rating}
              </span>
            </div>

            <p className="mt-4 text-sm leading-6 text-gray-600">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}