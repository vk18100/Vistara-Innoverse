export type Category = {
    id:number;
    title:string;
    description:string;
    image:string;
    cta:string;
    href:string;
}

export const categories: Category[] = [
    {
        id:1,
        title:"Flights",
        description:"Book flights to your favorite destinations with ease and convenience.",
        image:"/images/flight.jpg",
        cta:"Book Now",
        href:"/flights"
    },
    {
        id:2,
        title:"Hotels",
        description:"Find the perfect hotel for your stay, from budget-friendly to luxury options.",
        image:"/images/hotel.jpg",
        cta:"Book Now",
        href:"/hotels"
    },
    {
        id:3 ,
        title:"Car Rentals",
        description:"Rent a car for your trip and explore your destination at your own pace.",      
    image:"/images/car.jpg",
        cta:"Book Now",

        href:"/car-rentals"
    },
    {
        id:4,
        title:"Vacation Packages",
        description:"Get the best deals on vacation packages that include flights, hotels, and activities.",

        image:"/images/vacation.jpg",
        cta:"Book Now",
        href:"/vacation-packages"
    },
]