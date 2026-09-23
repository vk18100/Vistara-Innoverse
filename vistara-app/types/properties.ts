import { Property } from "@/types/property";

export const properties: Property[] = [
  {
    id: "property-001",
    title: "Luxury Mountain Retreat",
    location: "Manali, Himachal Pradesh",
    city: "Manali",
    country: "India",

    image: "/images/properties/property-001.jpg",

    type: "Villa",

    price: 8500,
    currency: "INR",

    rating: 4.8,
    reviewCount: 126,

    guests: 6,
    bedrooms: 3,
    beds: 4,
    bathrooms: 2,

    amenities: [
      "WiFi",
      "Parking",
      "Mountain View",
      "Kitchen",
      "Heating",
    ],

    description:
      "A peaceful luxury stay surrounded by mountains and nature.",

    host: {
      name: "Aarav",
      verified: true,
    },

    ml: {
      recommendationScore: 94,
      rankingScore: 91,
      trustScore: 96,
      riskScore: 4,
      reviewScore: 93,
      explanation:
        "Highly relevant for travelers looking for peaceful mountain stays.",
    },

    featured: true,
  },

  {
    id: "property-002",
    title: "Beachside Private Villa",
    location: "Goa, India",
    city: "Goa",
    country: "India",

    image: "/images/properties/property-002.jpg",

    type: "Villa",

    price: 12000,
    currency: "INR",

    rating: 4.9,
    reviewCount: 218,

    guests: 8,
    bedrooms: 4,
    beds: 5,
    bathrooms: 3,

    amenities: [
      "WiFi",
      "Pool",
      "Beach Access",
      "Parking",
      "Kitchen",
    ],

    description:
      "A premium private villa close to the beach.",

    host: {
      name: "Riya",
      verified: true,
    },

    ml: {
      recommendationScore: 97,
      rankingScore: 95,
      trustScore: 98,
      riskScore: 2,
      reviewScore: 96,
      explanation:
        "Strong match based on property quality, trust and review signals.",
    },

    featured: true,
  },

  // ...
];