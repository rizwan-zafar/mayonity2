import {
  getActiveLocations,
  getActiveServices,
  getPublishedPortfolio,
  getPublishedPosts,
} from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

const SITEMAP_CACHE_MS = 60 * 60 * 1000;

/** @type {{ data: unknown[], builtAt: number } | null} */
let sitemapMemoryCache = null;

function staticEntries() {
  return [
    "",
    "/about",
    "/services",
    "/portfolio",
    "/team",
    "/testimonials",
    "/blog",
    "/contact",
    "/careers",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((path) => ({
    url: siteUrl(path || "/"),
    changeFrequency: path === "/blog" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}

/** Only during `next build` (e.g. CI without MySQL). `SKIP_DB_BUILD` alone does not skip at runtime. */
function isBuildPhase() {
  return process.env.NEXT_PHASE === "phase-production-build";
}

function getCachedSitemap({ allowStale = false } = {}) {
  if (!sitemapMemoryCache?.data?.length) return null;
  const age = Date.now() - sitemapMemoryCache.builtAt;
  if (age <= SITEMAP_CACHE_MS || allowStale) {
    return sitemapMemoryCache.data;
  }
  return null;
}

function setCachedSitemap(data) {
  sitemapMemoryCache = { data, builtAt: Date.now() };
}

async function buildSitemapFromDatabase() {
  const entries = staticEntries();
  const [services, projects, { posts }, locations] = await Promise.all([
    getActiveServices(),
    getPublishedPortfolio(),
    getPublishedPosts({ take: 200 }),
    getActiveLocations(),
  ]);

  return [
    ...entries,
    ...locations.map((item) => ({
      url: siteUrl(`/${item.slug}`),
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...services.map((item) => ({
      url: siteUrl(`/services/${item.slug}`),
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...projects.map((item) => ({
      url: siteUrl(`/portfolio/${item.slug}`),
      lastModified: new Date(item.updatedAt),
      changeFrequency: "monthly",
      priority: 0.8,
    })),
    ...posts.map((item) => ({
      url: siteUrl(`/blog/${item.slug}`),
      lastModified: new Date(item.updatedAt),
      changeFrequency: "weekly",
      priority: 0.6,
    })),
  ];
}

export default async function sitemap() {
  const staticOnly = staticEntries();

  if (isBuildPhase()) {
    return staticOnly;
  }

  const fresh = getCachedSitemap();
  if (fresh) return fresh;

  try {
    const full = await buildSitemapFromDatabase();
    setCachedSitemap(full);
    return full;
  } catch {
    return getCachedSitemap({ allowStale: true }) ?? staticOnly;
  }
}