import type { Property } from "@/types/property";

type LegacyProperty = {
  id: number;
  name: string;
  location: string;
  city: string;
  state: string;
  type: "Villa" | "Hotel" | "Vacation" | "Activity";
  price: number;
  rating: number;
  reviews: number;
  image: string;
  verified: boolean;
  category: "stay" | "experience";
  tags: string[];
  popularity: number;
};

const rawProperties: LegacyProperty[] = [
  {
    id: 1,
    name: "The Heritage Courtyard",
    location: "Patna, Bihar",
    city: "Patna",
    state: "Bihar",
    type: "Villa",
    price: 4500,
    rating: 4.8,
    reviews: 124,
    image: "/images/pag(1).jpg",
    verified: true,
    category: "stay",
    tags: ["heritage", "luxury", "family"],
    popularity: 92,
  },

  {
    id: 2,
    name: "Ganga Riverside Retreat",
    location: "Patna, Bihar",
    city: "Patna",
    state: "Bihar",
    type: "Villa",
    price: 3800,
    rating: 4.7,
    reviews: 89,
    image: "/images/pag(2).jpg",
    verified: true,
    category: "stay",
    tags: ["riverside", "peaceful", "couples"],
    popularity: 87,
  },

  // Baaki properties bhi isi pattern mein:
  // image: "/images/pag(3).jpg"
  // image: "/images/pag(4).jpg"
  // ...
  // image: "/images/pag(20).jpg"
];

export const properties: Property[] = rawProperties.map(
  (property) => ({
    id: String(property.id),

    title: property.name,

    location: property.location,

    city: property.city,

    country: "India",

    image: property.image,

    type: property.type,

    price: property.price,

    currency: "INR",

    rating: property.rating,

    reviewCount: property.reviews,

    guests: 4,

    bedrooms: 2,

    beds: 2,

    bathrooms: 1,

    amenities: property.tags,

    description: `${property.name} is a ${property.type.toLowerCase()} in ${property.location}.`,

    host: {
      name: "Vistara Host",
      verified: property.verified,
    },

    ml: {
      rankingScore: property.popularity,
      recommendationScore: property.popularity,
      reviewScore: property.rating * 20,
    },

    featured: property.popularity >= 90,
  })
);