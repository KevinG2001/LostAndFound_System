import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

interface User {
  id: string;
  username: string;
  role: string;
  permissions: string[];
}

interface AuthContextType {
  user: User | null;
  hasPermission: (permission: string) => boolean;
  login: (token: string) => void; // new
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode<User>(token);
        setUser(decoded);
      } catch {
        setUser(null);
      }
    }
  }, []);

  const hasPermission = (permission: string) =>
    user?.permissions.includes(permission) ?? false;

  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = jwtDecode<User>(token);
    setUser(decoded);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, hasPermission, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
