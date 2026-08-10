"use client";
import React, { useState, useEffect } from "react";
import { FaBell, FaTimes, FaCheckCircle, FaLock } from "react-icons/fa";
import { useFcmToken } from "../hooks/useFcmToken";

export default function PushNotificationPrompt() {
  const { subscribeToPush, permissionStatus, refreshPermission } = useFcmToken();
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  useEffect(() => {
    if (typeof window === "undefined" || !("Notification" in window)) return;

    // Do not show if granted or if dismissed in this session
    const current = refreshPermission();
    if (current === "granted") return;

    const dismissed = sessionStorage.getItem("fcm_prompt_dismissed");
    if (dismissed && current === "default") return;

    // Auto-prompt after 3.5s for default permission visitors
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 3500);

    return () => clearTimeout(timer);
  }, [refreshPermission]);

  if (!isVisible) return null;

  const handleAllow = async () => {
    setLoading(true);
    setStatusMsg("");
    try {
      const res = await subscribeToPush();
      if (res.success) {
        setSuccess(true);
        setStatusMsg("✅ Push notifications enabled successfully!");
        setTimeout(() => {
          setIsVisible(false);
        }, 2200);
      } else if (res.reason === "denied" || Notification.permission === "denied") {
        setStatusMsg("🔒 Notifications are blocked in your browser settings.");
      } else if (res.reason === "unsupported") {
        setStatusMsg("⚠️ Notifications not supported in this browser.");
      } else {
        setStatusMsg(res.error || "Failed to enable notifications.");
      }
    } catch (err) {
      console.error(err);
      setStatusMsg("Failed to request notification permission.");
    } finally {
      setLoading(false);
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      sessionStorage.setItem("fcm_prompt_dismissed", "true");
    }
  };

  const isDenied = permissionStatus === "denied" || (typeof window !== "undefined" && window.Notification?.permission === "denied");

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:w-96 z-[9999] bg-white rounded-2xl shadow-2xl border border-red-100 p-4 sm:p-5 transition-all duration-300 transform translate-y-0 opacity-100">
      {/* Top Header Row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#c92726] to-red-500 text-white flex items-center justify-center font-extrabold text-base shadow-md shrink-0">
            <FaBell className={loading ? "animate-bounce" : ""} />
          </div>
          <div>
            <h4 className="font-extrabold text-gray-900 text-sm sm:text-base leading-tight">
              Instant News Alerts
            </h4>
            <p className="text-[11px] text-red-600 font-semibold">
              Top Briefing News Updates
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={handleDismiss}
          className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition"
          aria-label="Close notification prompt"
        >
          <FaTimes className="text-sm" />
        </button>
      </div>

      {/* Description */}
      <p className="text-xs text-gray-600 leading-relaxed mb-4">
        {success
          ? "You will now receive instant breaking news updates and live stories directly on your device."
          : "Get breaking news, live updates, and top stories sent directly to your screen."}
      </p>

      {/* Status Message */}
      {statusMsg && (
        <div className={`mb-3 p-2.5 rounded-xl text-xs font-semibold ${
          success
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-amber-50 text-amber-900 border border-amber-200"
        }`}>
          {statusMsg}
        </div>
      )}

      {/* Blocked Instruction Box */}
      {isDenied && !success && (
        <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-[11px] text-amber-900 space-y-1">
          <p className="font-bold flex items-center gap-1.5 text-amber-950">
            <FaLock className="text-xs text-amber-700" />
            <span>How to unblock in your browser:</span>
          </p>
          <ol className="list-decimal pl-4 space-y-0.5 text-amber-900">
            <li>Tap the <b>Tune/Lock (🔒)</b> icon in your top address bar.</li>
            <li>Select <b>Permissions</b> &rarr; <b>Notifications</b>.</li>
            <li>Change setting to <b>&quot;Allow&quot;</b>.</li>
          </ol>
        </div>
      )}

      {/* Action Buttons */}
      {!success && (
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleAllow}
            disabled={loading}
            className="flex-1 bg-[#c92726] hover:bg-[#a80808] active:scale-[0.98] text-white font-extrabold py-2.5 px-4 rounded-xl text-xs sm:text-sm shadow-md hover:shadow-lg transition-all cursor-pointer disabled:opacity-70 flex items-center justify-center gap-2"
          >
            <FaBell className="text-xs" />
            <span>
              {loading
                ? "Requesting..."
                : isDenied
                  ? "I've Allowed — Check Now"
                  : "Allow Notifications"}
            </span>
          </button>

          <button
            type="button"
            onClick={handleDismiss}
            disabled={loading}
            className="px-3 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl text-xs transition cursor-pointer"
          >
            Later
          </button>
        </div>
      )}

      {/* Success State Button */}
      {success && (
        <div className="w-full bg-green-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 shadow">
          <FaCheckCircle className="text-sm" />
          <span>Notifications Active!</span>
        </div>
      )}
    </div>
  );
}
