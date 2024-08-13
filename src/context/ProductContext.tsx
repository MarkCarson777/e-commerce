import { createContext, useContext } from "react";
import { firestore } from "@/firebase/config";
import { collection, addDoc } from "firebase/firestore";

type ProductContextProviderProps = {
  children: React.ReactNode;
};

type ProductContextType = {
  createProduct: (product) => void;
};

export const ProductContext = createContext<ProductContextType>({
  createProduct: () => {},
});

export const useProductContext = () => useContext(ProductContext);

export const ProductContextProvider = ({
  children,
}: ProductContextProviderProps) => {
  const createProduct = (product) => {
    const ref = collection(firestore, "products");
    try {
      addDoc(ref, product);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProductContext.Provider value={{ createProduct }}>
      {children}
    </ProductContext.Provider>
  );
};
