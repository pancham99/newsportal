"use client";

import { useEffect, useRef } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

type AdFormat = "auto" | "fluid" | "rectangle" | "vertical" | "horizontal";

interface AdBannerProps {
  adSlot: string;
  adFormat?: AdFormat;
  fullWidthResponsive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

/**
 * Google AdSense ad unit.
 *
 * Usage:
 *   <AdBanner adSlot="1234567890" />                          — responsive auto
 *   <AdBanner adSlot="1234567890" adFormat="rectangle" />     — 300×250 style
 *   <AdBanner adSlot="1234567890" adFormat="horizontal" />    — leaderboard style
 *   <AdBanner adSlot="1234567890" adFormat="vertical" />      — sidebar / skyscraper
 *
 * The AdSense script must be loaded globally (already in layout.js).
 */
export default function AdBanner({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  className = "",
  style,
}: AdBannerProps) {
  const adRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);

  useEffect(() => {
    // Guard: push only once per mount, and only when adsbygoogle is available
    if (pushed.current) return;
    try {
      if (typeof window !== "undefined") {
        window.adsbygoogle = window.adsbygoogle || [];
        window.adsbygoogle.push({});
        pushed.current = true;
      }
    } catch (e) {
      console.error("AdSense push error:", e);
    }
  }, []);

  // Don't render during SSR — AdSense is client-only
  if (typeof window === "undefined") return null;

  return (
    <div className={`adsense-wrapper overflow-hidden text-center ${className}`}>
      <ins
        ref={adRef}
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-8439565499673815"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={String(fullWidthResponsive)}
      />
    </div>
  );
}
