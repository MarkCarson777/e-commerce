export type Product = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  sizes: string[];
  currency: string;
  image: any;
  imageUrl?: string;
};
