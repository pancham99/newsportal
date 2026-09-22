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

        // Send visitor analytics with formatAddress and deviceId to backend database
        try {
          let deviceId = "";
          try {
            deviceId = localStorage.getItem("tb_device_id");
            if (!deviceId) {
              deviceId = `dev_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
              localStorage.setItem("tb_device_id", deviceId);
            }
          } catch {
            deviceId = `dev_${Date.now()}`;
          }

          let deviceName = "Browser Device";
          const ua = typeof navigator !== "undefined" ? (navigator.userAgent || "") : "";
          if (/iPhone/i.test(ua)) deviceName = "Apple iPhone";
          else if (/iPad/i.test(ua)) deviceName = "Apple iPad";
          else if (/Samsung/i.test(ua)) deviceName = "Samsung Mobile";
          else if (/Pixel/i.test(ua)) deviceName = "Google Pixel";
          else if (/Xiaomi|Redmi|POCO/i.test(ua)) deviceName = "Xiaomi / Redmi";
          else if (/OnePlus/i.test(ua)) deviceName = "OnePlus";
          else if (/Android/i.test(ua)) deviceName = "Android Mobile";
          else if (/Macintosh|Mac OS/i.test(ua)) deviceName = "MacBook / Mac PC";
          else if (/Windows/i.test(ua)) deviceName = "Windows PC";
          else if (/Linux/i.test(ua)) deviceName = "Linux PC";

          const apiBase = getBaseApiUrl();
          const payload = JSON.stringify({
            latitude,
            longitude,
            formatAddress,
            deviceId,
            deviceName,
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

