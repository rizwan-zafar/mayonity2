export const NOTRACK_STORAGE_KEY = "mayonity_notrack";
export const NOTRACK_COOKIE_NAME = "mayonity_notrack";

/** @param {string | null | undefined} pathname */
export function isAdminAnalyticsPath(pathname) {
  return pathname?.startsWith("/admin") ?? false;
}

/** @param {string | null | undefined} pathname */
export function isNotrackBootstrapPath(pathname) {
  return !isAdminAnalyticsPath(pathname);
}

/** @returns {boolean} */
export function readNotrackFlag() {
  if (typeof window === "undefined") return false;

  try {
    if (localStorage.getItem(NOTRACK_STORAGE_KEY) === "1") return true;
  } catch {
    // no-op
  }

  const cookies = document.cookie ? document.cookie.split(";") : [];
  for (const part of cookies) {
    const [name, ...valueParts] = part.trim().split("=");
    if (name === NOTRACK_COOKIE_NAME && valueParts.join("=") === "1") return true;
  }

  return false;
}

/** @param {string | null | undefined} pathname */
export function shouldLoadAnalytics(pathname) {
  if (isAdminAnalyticsPath(pathname)) return false;
  if (readNotrackFlag()) return false;
  return true;
}