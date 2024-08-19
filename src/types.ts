export type Product = {
  id: string | null;
  name: string;
  price: number;
  quantity: number;
  description: string;
  sizes: string[];
  currency: string;
  image: File | null;
};
