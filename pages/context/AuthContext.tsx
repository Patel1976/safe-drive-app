import React, { createContext, useState, ReactNode } from "react";

type UserRole = "police" | "emt" | "fire" | "wrecker" | "insurance" | "driver" | null;

interface AuthContextProps {
  isLoggedIn: boolean;
  setIsLoggedIn: (val: boolean) => void;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  setIsLoggedIn: () => {},
  userRole: null,
  setUserRole: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState<UserRole>(null);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, userRole, setUserRole }}>
      {children}
    </AuthContext.Provider>
  );
};