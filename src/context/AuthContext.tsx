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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return loading ? null : (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};
