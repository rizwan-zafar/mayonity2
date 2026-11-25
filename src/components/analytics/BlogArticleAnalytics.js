"use client";

import { useEffect } from "react";
import { isSiteContactHref, trackEvent } from "@/lib/trackEvent";

const BUDGET_CTA_TEXT = "Share your budget";

export function BlogArticleAnalytics() {
  useEffect(() => {
    const root = document.querySelector("[data-blog-article]");
    if (!root) return;

    const onClick = (event) => {
      const anchor = event.target.closest?.("a");
      if (!anchor) return;
      if (!isSiteContactHref(anchor.getAttribute("href"))) return;

      const linkText = anchor.textContent?.replace(/\s+/g, " ").trim();
      if (linkText !== BUDGET_CTA_TEXT) return;

      trackEvent("budget_cta_click", {
        page_path: window.location.pathname,
        link_text: linkText,
      });
    };

    root.addEventListener("click", onClick);
    return () => root.removeEventListener("click", onClick);
  }, []);

  return null;
}