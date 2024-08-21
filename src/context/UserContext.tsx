import { createContext, useContext } from "react";

import { doc, setDoc, getDoc } from "firebase/firestore";
import { firestore } from "@/firebase/config";

import { User as FirebaseUser } from "firebase/auth";

type UserContextProviderProps = {
  children: React.ReactNode;
};

type UserContextType = {
  getUser: (id: string) => Promise<any>;
  createUser: (user: FirebaseUser) => Promise<void>;
};

export const UserContext = createContext<UserContextType>({
  getUser: async () => {},
  createUser: async () => {},
});

export const useUserContext = () => useContext(UserContext);

export const UserContextProvider = ({ children }: UserContextProviderProps) => {
  const getUser = async (id: string) => {
    const docRef = doc(firestore, "users", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      throw new Error("No such document");
    }
  };

  const createUser = async (user: FirebaseUser) => {
    try {
      const userRef = doc(firestore, "users", user.uid);

      await setDoc(userRef, {
        email: user.email,
        role: "user",
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  };

  return (
    <UserContext.Provider value={{ getUser, createUser }}>
      {children}
    </UserContext.Provider>
  );
};
