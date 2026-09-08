"use client";

import { useEffect } from "react";

export default function AdSenseScript() {
  useEffect(() => {
    const triggerLoad = () => {
      // Prevent duplicate script tag injection
      if (document.querySelector('script[src*="adsbygoogle.js"]')) return;

      const script = document.createElement("script");
      script.src =
        "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8439565499673815";
      script.async = true;
      script.crossOrigin = "anonymous";
      document.head.appendChild(script);

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

  return null;
}

