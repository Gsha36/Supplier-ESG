import React, { createContext, useContext, useState, useEffect } from "react";
import Cookies from "js-cookie";

interface User {
  _id: string;
  username: string;
  password: string;
  phoneNumber: string;
  email: string;
  role: string;
  ownPassword: boolean;
  allData: boolean;
  permissions: string[];
  supplier?: string;
  accessToken: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (userData: User, token: string) => void;
  logout: () => void;
  getDashboardPath: (role: string) => string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state

  // Fetch user from cookies on mount
  useEffect(() => {
    const storedUser = Cookies.get("user");
    const accessToken = Cookies.get("accessToken");

    if (storedUser && accessToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser(() => {
        const updatedUser = { ...parsedUser, accessToken };
        return updatedUser;
      });
    }

    setLoading(false); // After checking for user, stop loading
  }, []);

  const login = (userData: User, token: string) => {
    const fullUserData = { ...userData, accessToken: token };
    setUser(fullUserData);

    Cookies.set("accessToken", token);
    Cookies.set("user", JSON.stringify(fullUserData));
  };

  const logout = () => {
    setUser(null);
    Cookies.remove("accessToken");
    Cookies.remove("user");
    window.location.href = "/login"; // Use window.location.href to redirect to login
  };

  const getDashboardPath = (role: string): string => {
    switch (role) {
      case "Admin":
        return "/company-dashboard";
      case "Supplier":
        return "/supplier-dashboard";
      case "SuperUser":
        return "/admin-dashboard";
      default:
        return "/"; // Default to home or login if role is unrecognized
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, login, logout, getDashboardPath }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
