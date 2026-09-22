"use client";

type Card ={
    id:number,
    title:string,
    description:string,
    image:string,
    cta:string,
    href:string,
}
type Props = {
    cards: Card[]
}

export default function Cards(
    { title, description, image, cta, href}: Card
) {
    return (
      <div className="overflow-hidden rounded-2xl border border-gray-100 shadow-sm">

        {/* image  */}
        <div className="relative aspect-[16/9] w-full">
          <img
            src={image}
            alt={title}
            className="absolute inset-0
            h-full
            w-full
            object-cover"
          />
          </div>
          <div className="p-6">
            <h3 className="mt-0.5 text-lg font-medium text-gray-900">{title}</h3>
            <p className="mt-2 text-sm text-gray-700">{description}</p>
            <a
              href={href}
              className="mt-4 inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-medium text-white hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-1"
            >
              {cta}
            </a>
            
          </div>
        </div>

    )
}
   