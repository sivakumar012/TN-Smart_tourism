"use client";

/**
 * GoogleAnalytics — injects the GA4 gtag.js script into the page.
 *
 * - Only loads when NEXT_PUBLIC_GA_MEASUREMENT_ID is configured.
 * - Sets GA4 Consent Mode defaults (denied) before the tag loads,
 *   so no analytics data flows until the user grants consent.
 * - Does not fire any events; page-view tracking is handled by AnalyticsPageView.
 */

import Script from "next/script";
import { GA_MEASUREMENT_ID, isGaConfigured } from "@/lib/analytics";

export function GoogleAnalytics() {
  if (!isGaConfigured()) return null;

  return (
    <>
      {/* Set Consent Mode defaults BEFORE loading gtag to block data collection */}
      <Script
        id="ga4-consent-defaults"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'denied',
              ad_storage: 'denied',
              wait_for_update: 500
            });
          `,
        }}
      />

      {/* Load the gtag.js library — afterInteractive so it does not block render */}
      <Script
        id="ga4-gtag-lib"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />

      {/* Initialise GA4 */}
      <Script
        id="ga4-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              send_page_view: false,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}
