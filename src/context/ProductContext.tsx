import { createContext, useContext, useState, useEffect } from "react";
import {
  doc,
  collection,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  CollectionReference,
  QueryDocumentSnapshot,
  WithFieldValue,
  serverTimestamp,
} from "firebase/firestore";
import { firestore, firebaseAuth, firebaseStorage } from "@/firebase/config";
import { ref, getDownloadURL } from "firebase/storage";
import { Product } from "@/types";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type ProductContextType = {
  products: Product[];
  getProduct: (id: string) => Promise<Product>;
  getProducts: () => Promise<void>;
  createProduct: (product: Product) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  getProduct: async () => ({} as Product),
  getProducts: async () => {},
  createProduct: async () => {},
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

  const getProduct = async (id: string) => {
    const docRef = doc(firestore, "products", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data() as Product;

      if (typeof data.image !== "string") {
        throw new Error("Invalid type for image");
      }

      const imageUrl = await getDownloadURL(ref(firebaseStorage, data.image));

      return { ...data, imageUrl };
    } else {
      throw new Error("No such document");
    }
  };

  const getProducts = async () => {
    const querySnapshot = await getDocs(collection(firestore, "products"));

    const products = querySnapshot.docs
      .filter((doc) => {
        const data = doc.data();
        return !data.deleted;
      })
      .map(async (doc) => {
        const id = doc.id;
        const data = doc.data() as Product;

        if (typeof data.image !== "string") {
          throw new Error("Invalid type for image");
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
    const ref: CollectionReference<Product> = collection(
      firestore,
      "products"
    ).withConverter(dataConverter);

    const user = firebaseAuth.currentUser;

    if (user) {
      const _product = {
        ...product,
        createdBy: user.uid,
        createdAt: serverTimestamp(),
        modifiedBy: user.uid,
        deleted: false,
      };

      try {
        await addDoc(ref, _product);
        console.log("Product created");
        await getProducts();
      } catch (error) {
        throw new Error((error as Error).message);
      }
    } else {
      throw new Error("User is not authenticated");
    }
  };

  const deleteProduct = async (id: string) => {
    const ref = doc(firestore, "products", id);

    try {
      await updateDoc(ref, {
        deleted: true,
      });
      console.log("Product deleted");
    } catch (error) {
      throw new Error((error as Error).message);
    }

    await getProducts();
  };

  return (
    <ProductContext.Provider
      value={{
        createProduct,
        deleteProduct,
        getProduct,
        getProducts,
        products,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};
