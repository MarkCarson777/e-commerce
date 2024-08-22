export type User = {
  email: string;
  isAdmin: boolean;
};

export type Product = {
  id?: string;
  name: string;
  price: number;
  quantity: number;
  description: string;
  // sizes: string[];
  // currency: string;
  image: any;
  imageUrl?: string;
};

export type Slide = {
  title: string;
  btn: { label: string; path: string };
  images: { img: any; alt: string }[];
  lightMode?: boolean;
};
