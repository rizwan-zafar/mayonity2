export const DEFAULT_NOTIFY_EMAIL = "hello@mayonity.com";
const LEGACY_GMAIL = /mayonitynetwork@gmail\.com/i;

function useAddress(value) {
  const v = String(value || "").trim();
  if (!v || LEGACY_GMAIL.test(v)) return null;
  return v;
}

/** Public contact address (site copy, confirmation emails). */
export function resolvePublicContactEmail(settings) {
  return useAddress(settings?.email) || DEFAULT_NOTIFY_EMAIL;
}

/** Where contact-form admin notifications are delivered. */
export function resolveAdminNotifyEmail(settings) {
  const fromEnv = useAddress(process.env.ADMIN_NOTIFY_EMAIL);
  if (fromEnv) return fromEnv;
  return useAddress(settings?.email) || DEFAULT_NOTIFY_EMAIL;
}