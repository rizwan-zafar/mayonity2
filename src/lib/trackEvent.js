const ANALYTICS_CONSENT_STORAGE_KEY = "mayonity_analytics_consent";

/** @returns {boolean} */
export function hasAnalyticsConsent() {
  if (typeof window === "undefined") return false;

  const consentGate = document.querySelector("[data-requires-analytics-consent]");
  if (!consentGate) return true;

  try {
    return localStorage.getItem(ANALYTICS_CONSENT_STORAGE_KEY) === "granted";
  } catch {
    return false;
  }
}

/**
 * @param {string} name
 * @param {Record<string, string | number | boolean>} [params]
 */
export function trackEvent(name, params = {}) {
  if (typeof window === "undefined") return;
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag !== "function") return;

  try {
    window.gtag("event", name, params);
  } catch {
    // no-op
  }
}

/** @returns {string} */
export function getReferrerPath() {
  if (typeof document === "undefined") return "direct";
  const ref = document.referrer;
  if (!ref) return "direct";

  try {
    const refUrl = new URL(ref);
    if (refUrl.origin === window.location.origin) return refUrl.pathname;
  } catch {
    // no-op
  }

  return "direct";
}

export const SOURCE_PATH_STORAGE_KEY = "mayonity_source_path";

/** @param {string} pathname */
export function recordSourcePath(pathname) {
  if (!pathname?.startsWith("/blog/") && !pathname?.startsWith("/portfolio/")) return;

  try {
    sessionStorage.setItem(SOURCE_PATH_STORAGE_KEY, pathname);
  } catch {
    // no-op
  }
}

/** @returns {string} */
export function getSourcePath() {
  try {
    const value = sessionStorage.getItem(SOURCE_PATH_STORAGE_KEY);
    if (value?.startsWith("/")) return value;
  } catch {
    // no-op
  }

  return "direct";
}

/** @param {string | null | undefined} href */
export function isSiteContactHref(href) {
  if (!href) return false;
  if (href === "/contact") return true;

  try {
    const url = new URL(href, window.location.origin);
    return url.origin === window.location.origin && url.pathname === "/contact";
  } catch {
    return false;
  }
}