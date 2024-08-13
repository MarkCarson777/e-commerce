import { createContext, useContext, useState, useEffect } from "react";
import { firestore } from "@/firebase/config";
import { collection, addDoc, getDocs } from "firebase/firestore";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type ProductContextType = {
  products: Product[];
  createProduct: (product: Product) => void;
};

type Product = {
  name: string;
};

export const ProductContext = createContext<ProductContextType>({
  products: [],
  createProduct: () => {},
});

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const querySnapshot = await getDocs(collection(firestore, "products"));
      const fetchedProducts: Product[] = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push(doc.data() as Product);
      });
      setProducts(fetchedProducts);
    };

    getProducts();
  }, []);

  const createProduct = (product: Product) => {
    const ref = collection(firestore, "products");

    try {
      addDoc(ref, product);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider value={{ createProduct, products }}>
      {children}
    </ProductContext.Provider>
  );
};
