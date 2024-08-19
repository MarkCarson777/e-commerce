import { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "@/firebase/config";
import {
  collection,
  addDoc,
  getDocs,
  CollectionReference,
  DocumentReference,
  QueryDocumentSnapshot,
  WithFieldValue,
} from "firebase/firestore";
import { firebaseStorage } from "@/firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { Product } from "@/types";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type ProductContextType = {
  products: Product[];
  getProducts: () => Promise<void>;
  createProduct: (
    product: Product
  ) => Promise<{ result: Product | null; error: string | null }>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  getProducts: async () => {},
  createProduct: async () => ({ result: null, error: null }),
});

export const useProductContext = () => useContext(ProductContext);

const dataConverter = {
  toFirestore(value: WithFieldValue<Product>) {
    return value;
  },
  fromFirestore(snapshot: QueryDocumentSnapshot) {
    return snapshot.data() as Product;
  },
};

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(firestore, "products"));

    const products = querySnapshot.docs.map(async (doc) => {
      const id = doc.id;
      const data = doc.data() as Product;
      const imageUrl = await getDownloadURL(ref(firebaseStorage, data.image));

      return { ...data, id, imageUrl };
    });

    const productsWithImages = await Promise.all(products);

    setProducts(productsWithImages);
  };

  useEffect(() => {
    getProducts();
  }, []);

  const createProduct = async (product: Product) => {
    let result: Product | null = null;
    let error: string | null = null;
    const ref: CollectionReference<Product> = collection(
      firestore,
      "products"
    ).withConverter(dataConverter);

    try {
      const docRef: DocumentReference = await addDoc(ref, product);
      result = { ...product, id: docRef.id };
    } catch (err) {
      error = (err as Error).message;
    }

    return { result, error };
  };

  return (
    <ProductContext.Provider value={{ createProduct, getProducts, products }}>
      {children}
    </ProductContext.Provider>
  );
};
