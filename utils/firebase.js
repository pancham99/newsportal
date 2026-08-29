import { initializeApp, getApps, getApp } from "firebase/app";
import { getMessaging, isSupported } from "firebase/messaging";

// Firebase client configuration
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyBYKe1j7Z7i-YNcTTnffEOGWZJh-YtMEms",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "topbrefing.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "topbrefing",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "topbrefing.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "524936329006",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:524936329006:web:8924a16a5f8a505789acbf"
};

// Initialize Firebase App
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Helper to safely get messaging instance
const getFcmMessaging = async () => {
  try {
    const supported = await isSupported();
    if (supported && typeof window !== "undefined") {
      return getMessaging(app);
    }
  } catch (error) {
    console.error("Firebase Messaging not supported in this environment:", error);
  }
  return null;
};

export { app, firebaseConfig, getFcmMessaging };
