export interface Destination {
  id: string;
  slug: string;
  name: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
  location: {
    ko: string;
    en: string;
  };
  image: string;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  petTypes: PetType[];
  amenities: string[];
  featured: boolean;
  category: DestinationCategory;
}

export type PetType = 'dog' | 'cat' | 'bird' | 'small-animal';

export type DestinationCategory =
  | 'beach'
  | 'mountain'
  | 'city'
  | 'countryside'
  | 'camping'
  | 'resort';

export interface Feature {
  id: string;
  icon: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
}

export interface ProcessStep {
  id: string;
  number: string;
  title: {
    ko: string;
    en: string;
  };
  description: {
    ko: string;
    en: string;
  };
}

export interface FAQ {
  id: string;
  question: {
    ko: string;
    en: string;
  };
  answer: {
    ko: string;
    en: string;
  };
}

export interface Testimonial {
  id: string;
  name: string;
  petName: string;
  petType: PetType;
  avatar: string;
  content: {
    ko: string;
    en: string;
  };
  rating: number;
  destination: string;
}
