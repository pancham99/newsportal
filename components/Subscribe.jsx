'use client';
import React, { useState } from 'react';
import { FaBell, FaCheckCircle } from 'react-icons/fa';
import { useFcmToken } from '../hooks/useFcmToken';

const Subscribe = () => {
  const { subscribeToPush, loading, permissionStatus, refreshPermission } = useFcmToken();
  const [subscribed, setSubscribed] = useState(false);
  const [msg, setMsg] = useState('');

  const handleSubscribe = async () => {
    setMsg('');
    const current = refreshPermission();
    const res = await subscribeToPush();
    if (res.success) {
      setSubscribed(true);
      setMsg('✅ Subscribed to instant news notifications!');
    } else if (res.reason === 'denied' || current === 'denied') {
      setMsg('⚠️ Notification permission is blocked in your browser settings.');
    } else {
      setMsg(res.error || 'Failed to subscribe to notifications.');
    }
  };

  const isGranted = permissionStatus === 'granted' || subscribed;

  return (
    <div className="w-full mt-3">
      {isGranted ? (
        <div className="flex items-center justify-center gap-2 text-green-400 bg-green-950/50 border border-green-700/60 px-4 py-2.5 rounded-full text-xs font-bold tracking-wide shadow-sm">
          <FaCheckCircle className="text-sm shrink-0" />
          <span>News Notifications Enabled!</span>
        </div>
      ) : (
        <button
          onClick={handleSubscribe}
          disabled={loading}
          type="button"
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 via-red-500 to-red-600 hover:from-red-700 hover:to-red-800 text-white font-extrabold py-2.5 px-5 rounded-full shadow-lg hover:shadow-red-600/40 transition-all duration-200 cursor-pointer disabled:opacity-70 text-xs sm:text-sm tracking-wide border border-red-400/30"
        >
          <FaBell className={`text-sm ${loading ? 'animate-bounce' : ''}`} />
          <span>{loading ? 'Subscribing...' : 'Subscribe to Push Notifications'}</span>
        </button>
      )}

      {permissionStatus === 'denied' && (
        <div className="mt-2 p-3 bg-amber-950/70 border border-amber-500/50 rounded-xl text-[11px] text-amber-200 text-left space-y-1.5">
          <p className="font-bold text-amber-300 flex items-center gap-1">
            🔒 Notifications Blocked in Browser Settings
          </p>
          <ol className="list-decimal pl-4 space-y-0.5 text-[10px] text-amber-100">
            <li>Click the <b>Lock / Settings icon (🔒)</b> next to the website URL in your address bar.</li>
            <li>Change <b>Notifications</b> from "Block" to <b>"Allow"</b>.</li>
          </ol>
          <button
            type="button"
            onClick={handleSubscribe}
            className="w-full mt-1 bg-amber-500 hover:bg-amber-600 text-black font-bold py-1 px-3 rounded-lg text-xs transition cursor-pointer"
          >
            I&apos;ve Unblocked — Check & Subscribe
          </button>
        </div>
      )}

      {msg && permissionStatus !== 'denied' && (
        <p className={`text-xs mt-2 text-center font-medium ${isGranted ? 'text-green-400' : 'text-amber-300'}`}>
          {msg}
        </p>
      )}
    </div>
  );
};

export default Subscribe;
