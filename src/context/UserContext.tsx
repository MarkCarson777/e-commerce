import { createContext, useContext } from "react";

import { addDoc, collection, CollectionReference } from "firebase/firestore";
import { firestore } from "@/firebase/config";

import { User as FirebaseUser } from "firebase/auth";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  createUser: (user: FirebaseUser) => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  createUser: async () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const createUser = async (user: FirebaseUser) => {
    const ref: CollectionReference = collection(firestore, "users");

    try {
      await addDoc(ref, {
        id: user.uid,
        email: user.email,
        role: "user",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return (
    <UserContext.Provider value={{ createUser }}>
      {children}
    </UserContext.Provider>
  );
};
