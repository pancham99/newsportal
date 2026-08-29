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
        <div className="mt-3 p-4 bg-amber-950/90 border border-amber-500/60 rounded-2xl text-[11px] text-amber-100 text-left space-y-2.5 shadow-lg">
          <div className="flex items-center gap-2 text-amber-300 font-bold text-xs sm:text-sm">
            <span className="text-base">🔒</span>
            <span>Notifications Blocked in Browser Settings</span>
          </div>

          <p className="text-[11px] text-amber-200/90 leading-relaxed">
            Notifications were blocked previously. Browser security prevents websites from re-opening the prompt popup automatically.
          </p>

          <div className="bg-black/40 p-3 rounded-xl border border-amber-500/30 space-y-1.5 text-[11px]">
            <p className="font-bold text-amber-300">📱 Steps to Unblock on Mobile & Desktop:</p>
            <ol className="list-decimal pl-4 space-y-1 text-amber-100 leading-snug">
              <li>Tap the <b>Tune / Lock icon (🔒 or 🎛️)</b> in your browser address bar at the top.</li>
              <li>Tap <b>Permissions</b> &rarr; <b>Notifications</b>.</li>
              <li>Select <b>&quot;Allow&quot;</b>.</li>
            </ol>
          </div>

          <button
            type="button"
            onClick={handleSubscribe}
            className="w-full mt-1 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-extrabold py-2.5 px-4 rounded-xl text-xs sm:text-sm transition cursor-pointer shadow flex items-center justify-center gap-2"
          >
            <FaBell className="text-xs" />
            <span>I&apos;ve Allowed Notifications — Enable Now</span>
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
