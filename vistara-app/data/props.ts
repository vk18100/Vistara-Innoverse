export type Property = {
  id: string;
  name: string;
  location: string;
  description: string;
  price: number;
  rating: number;
  reviews: number;
  images: string[];
  guests?: number;
  amenities: string[];

  host: {
    name: string;
    image: string;
  };
};

export const props: Property[] = [
  {
    id: "patna-heritage-stay",
    name: "Patna Heritage Stay",
    location: "Rajendra Nagar, Patna",
    description: "A beautiful stay in Patna.",
    price: 2200,
    rating: 4.7,
    reviews: 24,
    images: ["/images/pag1 (28).jpg"],
    guests: 3,
    amenities: [
      "WiFi",
      "Air conditioning",
      "Parking",
    ],
    host: {
      name: "Vistara Host",
      image: "/images/host.jpg",
    },
  },

  // baaki properties...
];