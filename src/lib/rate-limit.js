const buckets = new Map();

export function rateLimit(key, limit = 5, windowMs = 60 * 60 * 1000) {
  const now = Date.now();
  const hits = (buckets.get(key) || []).filter((time) => now - time < windowMs);
  if (hits.length >= limit) {
    return { ok: false, remaining: 0 };
  }
  hits.push(now);
  buckets.set(key, hits);
  return { ok: true, remaining: limit - hits.length };
}

export function getClientIp(headersList) {
  const forwarded = headersList.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return headersList.get("x-real-ip") || "unknown";
}
