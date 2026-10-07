"use client";

/**
 * AnalyticsPageView — tracks client-side route changes as GA4 page_view events.
 *
 * Next.js App Router does not fire page_view automatically for client
 * navigation. This component subscribes to pathname changes and sends
 * a deduplicated page_view for each new path.
 *
 * Must be rendered inside the root layout as a Client Component.
 */

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { trackPageView, isGaConfigured, hasAnalyticsConsent } from "@/lib/analytics";

export function AnalyticsPageView() {
  const pathname = usePathname();
  const previousPath = useRef<string>("");

  useEffect(() => {
    if (!isGaConfigured()) return;
    if (!hasAnalyticsConsent()) return;
    if (!pathname) return;
    // Deduplicate: only track when the path actually changes
    if (pathname === previousPath.current) return;

    previousPath.current = pathname;
    trackPageView(pathname);
  }, [pathname]);

  return null;
}
