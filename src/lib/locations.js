export const RESERVED_LOCATION_SLUGS = new Set([
  "about",
  "services",
  "portfolio",
  "team",
  "blog",
  "contact",
  "careers",
  "testimonials",
  "privacy-policy",
  "terms-and-conditions",
  "admin",
  "api",
]);

export function isReservedLocationSlug(slug) {
  return RESERVED_LOCATION_SLUGS.has(String(slug || "").toLowerCase());
}
