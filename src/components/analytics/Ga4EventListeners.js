"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { shouldLoadAnalytics } from "@/lib/analyticsExclusion";
import { trackEvent } from "@/lib/trackEvent";

export function Ga4EventListeners() {
  const pathname = usePathname();

  useEffect(() => {
    if (!shouldLoadAnalytics(pathname)) return;

    const onClick = (event) => {
      const anchor = event.target.closest?.('a[href^="mailto:"]');
      if (!anchor) return;

      trackEvent("email_click", {
        page_path: window.location.pathname,
      });
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [pathname]);

  return null;
}