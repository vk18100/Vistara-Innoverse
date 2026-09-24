export interface Property {
  id: string;

  title: string;
  location: string;
  city: string;
  country: string;

  image: string;
  images?: string[];

  type: string;

  price: number;
  currency: string;

  rating: number;
  reviewCount: number;

  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;

  amenities: string[];

  description: string;

  host: {
    name: string;
    verified: boolean;
  };

  ml?: {
    recommendationScore?: number;
    rankingScore?: number;
    trustScore?: number;
    riskScore?: number;
    reviewScore?: number;
    explanation?: string;
  };

  featured?: boolean;
}