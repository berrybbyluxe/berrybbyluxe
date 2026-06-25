export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  isSoldOut?: boolean;
  category: string;
  dimensions?: string;
  material?: string;
  features?: string[];
  stock?: number;
  rating?: number;
  reviews?: number;
};
