export type Guide = {
  id: string;
  name: string;
  location: string;
  bio: string;
  languages: string[];
  specialties: string[];
  rating: number;
  reviews: number;
  experience: string;
  pricePerHour: number;
  coverageKm: number;
  verified: boolean;
  image: string;
};

export const guides: Guide[] = [
  {
    id: "rajiv",
    name: "Rajiv Kumar",
    location: "Patna, Bihar",
    bio: "Discover Patna through its heritage, local food, riverside stories and hidden neighbourhoods.",
    languages: ["Hindi", "English"],
    specialties: ["Heritage", "Food", "Local Life"],
    rating: 4.9,
    reviews: 124,
    experience: "8 years",
    pricePerHour: 699,
    coverageKm: 30,
    verified: true,
    image: "/images/profile.jpg",
  },

  {
    id: "amit",
    name: "Amit Singh",
    location: "Patna, Bihar",
    bio: "Explore historical places, riverside locations and authentic local experiences with Amit.",
    languages: ["Hindi", "English"],
    specialties: ["History", "Culture", "Photography"],
    rating: 4.8,
    reviews: 96,
    experience: "6 years",
    pricePerHour: 599,
    coverageKm: 30,
    verified: true,
    image: "/images/profile.jpg",
  },

  {
    id: "neha",
    name: "Neha Sharma",
    location: "Patna, Bihar",
    bio: "Discover Patna through local food, markets, culture and stories known mostly by locals.",
    languages: ["Hindi", "English"],
    specialties: ["Food", "Shopping", "Culture"],
    rating: 4.9,
    reviews: 87,
    experience: "5 years",
    pricePerHour: 649,
    coverageKm: 30,
    verified: true,
    image: "/images/profile.jpg",
  },

  {
    id: "priya",
    name: "Priya Verma",
    location: "Gaya, Bihar",
    bio: "Experience peaceful spiritual places, local traditions and hidden corners around Gaya.",
    languages: ["Hindi", "English"],
    specialties: ["Spiritual", "Culture", "Local Life"],
    rating: 4.8,
    reviews: 71,
    experience: "7 years",
    pricePerHour: 599,
    coverageKm: 30,
    verified: true,
    image: "/images/profile.jpg",
  },

  {
    id: "sanjay",
    name: "Sanjay Verma",
    location: "Nalanda, Bihar",
    bio: "Local history enthusiast helping travellers understand the stories behind Nalanda.",
    languages: ["Hindi", "English"],
    specialties: ["History", "Heritage", "Education"],
    rating: 4.8,
    reviews: 58,
    experience: "9 years",
    pricePerHour: 699,
    coverageKm: 30,
    verified: true,
    image: "/images/profile.jpg",
  },

  {
    id: "rahul",
    name: "Rahul Singh",
    location: "Rajgir, Bihar",
    bio: "Explore Rajgir's nature, viewpoints, history and local food with someone who knows the area.",
    languages: ["Hindi", "English"],
    specialties: ["Nature", "Adventure", "Food"],
    rating: 4.7,
    reviews: 63,
    experience: "4 years",
    pricePerHour: 549,
    coverageKm: 30,
    verified: true,
    image: "/images/profile.jpg",
  },
];