type InfoProps = {
  description: string;
};

export default function Info({ description }: InfoProps) {
  return (
    <section className="border-b border-stone-200 py-8">
      <div className="max-w-3xl">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#9A7653]">
          The stay
        </p>

        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-stone-900 sm:text-3xl">
          About this place
        </h2>

        <p className="mt-5 text-[15px] leading-7 text-stone-600 sm:text-base sm:leading-8">
          {description}
        </p>
      </div>
    </section>
  );
}