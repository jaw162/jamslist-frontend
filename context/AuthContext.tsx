import { createContext, useState, useEffect, Context } from "react";
import { User } from "..";
import { handleLogin } from "@/helpersAndHooks/handleLogin";
import loggedInChecker from "@/helpersAndHooks/loggedInChecker";

type AuthContextType = {
  setUser: (arg: User | null) => void;
  handleLogin: typeof handleLogin;
  user: { id: string; username: string } | null;
};

const AuthContext: Context<AuthContextType> = createContext(
  {} as AuthContextType
);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    loggedInChecker(setUser);
  }, []);

  return (
    <AuthContext.Provider value={{ setUser, handleLogin, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
