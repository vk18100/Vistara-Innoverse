type InfoProps = {
  description: string;
};

export default function Info({ description }: InfoProps) {
  return (
    <section className="border-b border-gray-200 py-7">
      <h2 className="text-xl font-semibold text-[#03045E]">
        About this place
      </h2>

      <p className="mt-3 max-w-3xl text-[15px] leading-7 text-gray-600">
        {description}
      </p>
    </section>
  );
}