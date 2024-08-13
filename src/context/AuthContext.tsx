import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  currentUser: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  currentUser: {} as User | null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
