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
import { Product } from "@/types";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type ProductContextType = {
  products: Product[];
  createProduct: (
    product: Product
  ) => Promise<{ result: Product | null; error: string | null }>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
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

  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        const id = doc.id;
        fetchedProducts.push({ ...doc.data(), id } as Product);
      });
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const createProduct = async (product: Product) => {
    const ref: CollectionReference<Product> = collection(
      firestore,
      "products"
    ).withConverter(dataConverter);
    let result: Product | null = null;
    let error: string | null = null;

    try {
      const docRef: DocumentReference = await addDoc(ref, product);
      result = { ...product, id: docRef.id };
    } catch (err) {
      error = (err as Error).message;
    }

    return { result, error };
  };

  return (
    <ProductContext.Provider value={{ createProduct, products }}>
      {children}
    </ProductContext.Provider>
  );
};
