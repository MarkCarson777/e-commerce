import { createContext, useContext, useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { firebaseAuth } from "@/firebase/config";

type AuthContextProviderProps = {
  children: React.ReactNode;
};

type AuthContextType = {
  user: User | null;
};

export const AuthContext = createContext<AuthContextType>({
  user: {} as User | null,
});

export const useAuthContext = () => useContext(AuthContext);

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};
