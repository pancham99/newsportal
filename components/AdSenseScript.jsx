"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

export default function AdSenseScript() {
  const [loadAdSense, setLoadAdSense] = useState(false);

  useEffect(() => {
    const triggerLoad = () => {
      setLoadAdSense(true);
      cleanup();
    };

    const cleanup = () => {
      window.removeEventListener("scroll", triggerLoad);
      window.removeEventListener("mousemove", triggerLoad);
      window.removeEventListener("touchstart", triggerLoad);
      window.removeEventListener("keydown", triggerLoad);
    };

    // Load AdSense after first user interaction or after a 3.5s timeout
    window.addEventListener("scroll", triggerLoad, { passive: true });
    window.addEventListener("mousemove", triggerLoad, { passive: true });
    window.addEventListener("touchstart", triggerLoad, { passive: true });
    window.addEventListener("keydown", triggerLoad, { passive: true });

    const timer = setTimeout(triggerLoad, 3500);

    return () => {
      cleanup();
      clearTimeout(timer);
    };
  }, []);

  if (!loadAdSense) return null;

  return (
    <Script
      async
      src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8439565499673815"
      crossOrigin="anonymous"
      strategy="afterInteractive"
    />
  );
}
