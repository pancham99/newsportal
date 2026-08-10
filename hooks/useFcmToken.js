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
    if (typeof window === "undefined") {
      return { success: false, reason: "unsupported" };
    }

    // 1. Check HTTPS / Secure Context Requirement
    const isLocalhost = Boolean(
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1" ||
      window.location.hostname === "[::1]"
    );
    if (!window.isSecureContext && !isLocalhost && window.location.protocol !== "https:") {
      const msg = "Web Push Notifications require a secure HTTPS connection. Please visit via https://";
      setError(msg);
      return { success: false, reason: "insecure_context", error: msg };
    }

    // 2. Check Browser Feature Support
    if (!("Notification" in window) || !("serviceWorker" in navigator) || !("PushManager" in window)) {
      const msg = "Web Push Notifications are not supported in this browser. (On iOS/iPhone, please add website to Home Screen first)";
      setError(msg);
      return { success: false, reason: "unsupported", error: msg };
    }

    try {
      setLoading(true);
      setError(null);

      // 3. Request Notification Permission
      let permission = Notification.permission;
      if (permission !== "granted") {
        permission = await Notification.requestPermission();
      }
      setPermissionStatus(permission);

      if (permission !== "granted") {
        const msg = "Notification permission is blocked in browser settings. Tap the Lock/Tune icon in address bar to allow.";
        setError(msg);
        setLoading(false);
        return { success: false, reason: "denied", error: msg };
      }

      // 4. Register & Wait for Service Worker with root scope
      const serviceWorkerRegistration = await navigator.serviceWorker.register("/firebase-messaging-sw.js", { scope: "/" });
      const readyRegistration = await navigator.serviceWorker.ready;

      // 5. Get Firebase Messaging Instance
      const messaging = await getFcmMessaging();
      if (!messaging) {
        throw new Error("Firebase Messaging instance could not be initialized.");
      }

      // 6. Request FCM Registration Token
      const tokenOptions = {
        serviceWorkerRegistration: readyRegistration || serviceWorkerRegistration,
      };

      const rawVapid = process.env.NEXT_PUBLIC_FIREBASE_VAPID_KEY;
      if (rawVapid && rawVapid.trim().length > 0) {
        tokenOptions.vapidKey = rawVapid.trim();
      }

      const currentToken = await getToken(messaging, tokenOptions);

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
      const userMsg = err.message || "Failed to subscribe to push notifications.";
      setError(userMsg);
      setLoading(false);
      return { success: false, error: userMsg };
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

