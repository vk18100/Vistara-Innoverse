type HostProps = {
  name: string;
  image: string;
};

export default function Host({ name, image }: HostProps) {
  return (
    <section className="border-b border-gray-200 py-7">
      <h2 className="text-xl font-semibold text-[#03045E]">
        Meet your host
      </h2>

      <div className="mt-5 flex items-center gap-4">
        <img
          src={image}
          alt={name}
          className="h-14 w-14 rounded-full object-cover"
        />

        <div>
          <h3 className="font-semibold text-gray-900">{name}</h3>
          <p className="mt-1 text-sm text-gray-500">
            Your Vistara host
          </p>
        </div>
      </div>
    </section>
  );
}