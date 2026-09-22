type Props ={
    title: string;
    location: string;
    price: number;
    image: string;
}


export default function PropertyCard({title, location, price, image}: Props) {
    return(
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <div className="relative h-48 w-full">
        <img src={image} alt={title} className="h-full w-full object-cover"/>
        <button className="absolute right-2 top-2 rounded-full bg-white p-2 text-gray-500 transition hover:bg-gray-100">
        </button>
        </div>
        <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
            <p className="mt-1 text-sm text-gray-500">{location}</p>
            <p className="mt-2 text-lg font-semibold text-gray-900">${price}</p>
            <span className="mt-2 text-sm text-gray-500">per night</span>
        </div>
        
        </div>
    )
}