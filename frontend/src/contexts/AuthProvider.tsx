import { useState, useEffect, ReactNode } from "react";
import { AuthContext } from "./AuthContext";

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("token")
  );

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth);
  }, []);

  const login = () => {
    localStorage.setItem("token", "dummy_token");
    setIsAuthenticated(true);
    window.dispatchEvent(new Event("storage"));
  };

  const logout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
