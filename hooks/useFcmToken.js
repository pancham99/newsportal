"use client";
import { useState, useEffect, useCallback } from "react";
import { getToken } from "firebase/messaging";
import { getFcmMessaging } from "../utils/firebase";
import { base_api_url } from "../config/config";
import axios from "axios";

export function useFcmToken() {
  const [token, setToken] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState("default");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const refreshPermission = useCallback(() => {
    if (typeof window !== "undefined" && "Notification" in window) {
      setPermissionStatus(Notification.permission);
      return Notification.permission;
    }
    return "unsupported";
  }, []);

  useEffect(() => {
    refreshPermission();
    if (typeof window !== "undefined") {
      window.addEventListener("focus", refreshPermission);
      return () => window.removeEventListener("focus", refreshPermission);
    }
  }, [refreshPermission]);

  const subscribeToPush = useCallback(async (userEmail = null) => {
    if (typeof window === "undefined" || !("Notification" in window)) {
      setError("Web Push Notifications are not supported in this browser.");
      return { success: false, reason: "unsupported" };
    }

    try {
      setLoading(true);
      setError(null);

      const permission = await Notification.requestPermission();
      setPermissionStatus(permission);

      if (permission !== "granted") {
        setError("Notification permission was denied.");
        setLoading(false);
        return { success: false, reason: "denied" };
      }

      // Register Service Worker
      let serviceWorkerRegistration;
      if ("serviceWorker" in navigator) {
        serviceWorkerRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js");
      }

      const messaging = await getFcmMessaging();
      if (!messaging) {
        throw new Error("Firebase Messaging instance could not be initialized.");
      }

      const vapidKey = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY || undefined;
      const currentToken = await getToken(messaging, {
        vapidKey,
        serviceWorkerRegistration,
      });

      if (currentToken) {
        setToken(currentToken);

        // Send token to backend API
        const deviceInfo = {
          userAgent: navigator.userAgent,
          platform: navigator.platform,
        };

        await axios.post(`${base_api_url}/api/fcm/save-token`, {
          fcmToken: currentToken,
          email: userEmail || undefined,
          deviceInfo,
        });

        console.log("✅ FCM Token successfully registered with backend");
        setLoading(false);
        return { success: true, token: currentToken };
      } else {
        throw new Error("Failed to generate FCM Registration Token.");
      }
    } catch (err) {
      console.error("Error subscribing to FCM push notifications:", err);
      setError(err.message || "Failed to subscribe to push notifications.");
      setLoading(false);
      return { success: false, error: err.message };
    }
  }, []);

  return {
    token,
    permissionStatus,
    loading,
    error,
    subscribeToPush,
    refreshPermission,
  };
}
