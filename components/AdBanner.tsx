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

  // Set min-height placeholder based on format to eliminate CLS (Cumulative Layout Shift)
  const minHeightClass =
    adFormat === "rectangle"
      ? "min-h-[250px]"
      : adFormat === "vertical"
      ? "min-h-[600px]"
      : adFormat === "horizontal"
      ? "min-h-[90px]"
      : "min-h-[90px] md:min-h-[250px]";

  return (
    <div
      className={`adsense-wrapper overflow-hidden text-center w-full flex items-center justify-center bg-gray-50/50 rounded-sm ${minHeightClass} ${className}`}
    >
      <ins
        ref={adRef}
        className="adsbygoogle w-full"
        style={{ display: "block", ...style }}
        data-ad-client="ca-pub-8439565499673815"
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive={String(fullWidthResponsive)}
      />
    </div>
  );
}
