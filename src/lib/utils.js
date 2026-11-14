export function parseJson(value, fallback = []) {
  if (value == null || value === "") return fallback;
  if (Array.isArray(value) || typeof value === "object") return value;
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function slugify(value) {
  return String(value)
    .toLowerCase()
    .trim()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function siteUrl(path = "") {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(
    /\/$/,
    ""
  );
  if (!path) return base;
  return `${base}${path.startsWith("/") ? path : `/${path}`}`;
}

export function formatDate(date) {
  if (!date) return "";
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export function readingTimeFrom(content) {
  const words = String(content || "")
    .replace(/[#*_>`~\-\[\]]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

/** Remove a trailing "| Mayonity" / "· Mayonity" style suffix so layout templates don't double the brand. */
export function stripTrailingBrand(title, brand = "Mayonity") {
  const t = String(title || "").trim();
  if (!t) return t;
  const escaped = brand.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(`\\s*[|·—–\\-]\\s*${escaped}\\s*$`, "i");
  return t.replace(re, "").trim() || t;
}

/** Next metadata title with exactly one brand suffix (bypasses root layout template). */
export function documentTitle(title, brand = "Mayonity") {
  const head = stripTrailingBrand(title, brand);
  return { absolute: `${head} · ${brand}` };
}

export function splitParagraphs(text) {
  if (!text) return [];
  return String(text)
    .split(/\n\s*\n/)
    .map((part) => part.trim())
    .filter(Boolean);
}
