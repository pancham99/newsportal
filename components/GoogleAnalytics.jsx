"use client";

import Script from "next/script";

export default function GoogleAnalytics() {
  const GA_ID = "G-CKL5FVPQ2L"; // Replace with your actual Google Analytics ID
  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />

      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];

          function gtag() {
            window.dataLayer.push(arguments);
          }

          window.gtag = gtag;

          gtag('js', new Date());

          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}