"use client";

import { createContext, useContext, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { getBaseApiUrl } from "../config/config";

const SubscribeModal = dynamic(() => import("../components/SubscribeModal"), {
  ssr: false,
});
const PushNotificationPrompt = dynamic(() => import("../components/PushNotificationPrompt"), {
  ssr: false,
});

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("login"); // "login" | "signup" | "subscribe"

  const [location, setLocation] = useState(null);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [city, setCity] = useState('city loading...');
  console.log("location", location);

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


  useEffect(() => {
    if (!navigator.geolocation) 
      return alert("please allow location to continue..");
    setLoadingLocation(true);

    navigator.geolocation.getCurrentPosition(async (position)=>{
       const { latitude, longitude } = position.coords;

       try {
        const res = await fetch (`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);

        const data = await res.json();
        const formatAddress = data.display_name || 'current location';
        const locObj = {
          latitude,
          longitude,
          formatAddress,
        };
        setLocation(locObj);
        setCity(data.address?.city || data.address?.town || data.address?.village || 'Unknown');
        setLoadingLocation(false);

        // Send visitor analytics with formatAddress to backend database
        try {
          const apiBase = getBaseApiUrl();
          const payload = JSON.stringify({
            latitude,
            longitude,
            formatAddress,
            timezone: typeof Intl !== "undefined" ? Intl.DateTimeFormat().resolvedOptions().timeZone : "",
            language: typeof navigator !== "undefined" ? navigator.language : "",
            screenWidth: typeof window !== "undefined" ? window.screen?.width : 0,
            screenHeight: typeof window !== "undefined" ? window.screen?.height : 0
          });

          const sendAnalytics = (baseUrl) =>
            fetch(`${baseUrl}/api/news/click`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: payload
            });

          sendAnalytics(apiBase).catch(() => {
            if (apiBase !== 'https://bakendtopbrefing.vercel.app') {
              sendAnalytics('https://bakendtopbrefing.vercel.app').catch(() => {});
            }
          });
        } catch (e) {
          // silent fallback
        }

       } catch (error) {
        console.error("Error fetching location data:", error);
        setLoadingLocation(false);
       }
    })
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
        city,
        location,
        loadingLocation
      }}
    >
      {children}
      <SubscribeModal />
      <PushNotificationPrompt />
    </AuthContext.Provider>
  );
};

