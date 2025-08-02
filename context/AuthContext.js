"use client";

// context/AuthContext.js
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

// Create Context
const AuthContext = createContext();

// Custom Hook for easy access
export const useAuth = () => useContext(AuthContext);

// Provider
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


   useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  //  useEffect(() => {
  //   if (user) {
  //     localStorage.setItem("user", JSON.stringify(user));
  //   } else {
  //     localStorage.removeItem("user");
  //   }
  // }, [user]);


  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
