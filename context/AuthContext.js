"use client";

import { createContext, useContext, useEffect, useState } from "react";
import SubscribeModal from "../components/SubscribeModal";
import PushNotificationPrompt from "../components/PushNotificationPrompt";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login"); // "login" | "signup" | "subscribe"

  // Read from localStorage once on mount
  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch {
      localStorage.removeItem("user");
    }
  }, []);

  // login: save to localStorage AND update context state immediately
  const login = (userData, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData); // ← this triggers re-render everywhere
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  const openModal = (mode = "login") => {
    setModalMode(mode);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isModalOpen,
        modalMode,
        setModalMode,
        openModal,
        closeModal,
      }}
    >
      {children}
      <SubscribeModal />
      <PushNotificationPrompt />
    </AuthContext.Provider>
  );
};

