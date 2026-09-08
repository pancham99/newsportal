"use client";
import { useState, useEffect, useCallback } from "react";
import { getToken, onMessage } from "firebase/messaging";
import { getFcmMessaging } from "../utils/firebase";
import { base_api_url, getBaseApiUrl } from "../config/config";
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
    const hostname = window.location.hostname;
    const isLocalNetwork = Boolean(
      hostname === "localhost" ||
      hostname === "127.0.0.1" ||
      hostname === "[::1]" ||
      /^192\.168\.\d+\.\d+$/.test(hostname) ||
      /^10\.\d+\.\d+\.\d+$/.test(hostname) ||
      /^172\.(1[6-9]|2[0-9]|3[0-1])\.\d+\.\d+$/.test(hostname)
    );
    if (!window.isSecureContext && !isLocalNetwork && window.location.protocol !== "https:") {
      const msg = "Web Push Notifications require a secure HTTPS connection (e.g. https://topbriefing.in) or an allowed origin in browser flags.";
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
      try {
        await serviceWorkerRegistration.update();
      } catch (swErr) {
        console.warn("SW update check warning:", swErr);
      }
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

        const isMobileDevice = typeof navigator !== "undefined" ? /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) : false;
        const deviceInfo = {
          userAgent: typeof navigator !== "undefined" ? navigator.userAgent : "",
          platform: typeof navigator !== "undefined" ? navigator.platform : "",
          isMobile: isMobileDevice
        };

        // Send token to backend API (resolves live Vercel URL or local LAN IP as appropriate)
        const targetApiUrl = getBaseApiUrl();
        const payload = {
          fcmToken: currentToken,
          email: userEmail || undefined,
          deviceInfo,
        };

        try {
          await axios.post(`${targetApiUrl}/api/fcm/save-token`, payload);
        } catch (postErr) {
          if (targetApiUrl !== 'https://bakendtopbrefing.vercel.app') {
            console.warn("Local backend unreachable, registering FCM token with live backend fallback...");
            await axios.post('https://bakendtopbrefing.vercel.app/api/fcm/save-token', payload);
          } else {
            throw postErr;
          }
        }

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

  // Foreground message listener
  useEffect(() => {
    let unsub = null;
    if (typeof window !== "undefined" && "Notification" in window && permissionStatus === "granted") {
      getFcmMessaging().then((messaging) => {
        if (messaging) {
          unsub = onMessage(messaging, (payload) => {
            console.log("Foreground FCM Message received:", payload);
            const title = payload.notification?.title || payload.data?.title || "Top Briefing News Update";
            const body = payload.notification?.body || payload.data?.body || "Read the latest story on Top Briefing.";
            const icon = payload.notification?.icon || payload.data?.image || "https://topbriefing.in/logo.png";
            const url = payload.data?.url || payload.fcmOptions?.link || "https://topbriefing.in";

            if (Notification.permission === "granted") {
              const notification = new Notification(title, {
                body,
                icon,
                data: { url }
              });
              notification.onclick = (e) => {
                e.preventDefault();
                window.open(url, "_blank");
              };
            }
          });
        }
      });
    }
    return () => {
      if (unsub) unsub();
    };
  }, [permissionStatus]);

  return {
    token,
    permissionStatus,
    loading,
    error,
    subscribeToPush,
    refreshPermission,
  };
}


