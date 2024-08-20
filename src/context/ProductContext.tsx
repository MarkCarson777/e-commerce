import { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "@/firebase/config";
import {
  doc,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
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
  deleteProduct: (id: string | null) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  getProducts: async () => {},
  createProduct: async () => ({ result: null, error: null }),
  deleteProduct: async () => {},
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

      if (typeof data.image !== "string") {
        throw new Error("image path is not a string");
      }

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

  const deleteProduct = async (id: string) => {
    const ref = doc(firestore, "products", id); // Get a reference to the specific document
    await deleteDoc(ref); // Delete the document using deleteDoc
    await getProducts(); // Refresh the product list
  };

  return (
    <ProductContext.Provider
      value={{ createProduct, deleteProduct, getProducts, products }}
    >
      {children}
    </ProductContext.Provider>
  );
};
