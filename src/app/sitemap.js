import {
  getActiveLocations,
  getActiveServices,
  getPublishedPortfolio,
  getPublishedPosts,
} from "@/lib/data";
import { siteUrl } from "@/lib/utils";

// Regenerate at most once per hour; cached responses avoid MySQL on every crawl.
export const revalidate = 3600;

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

function isProductionBuild() {
  return (
    process.env.NEXT_PHASE === "phase-production-build" ||
    process.env.SKIP_DB_BUILD === "1"
  );
}

export default async function sitemap() {
  const entries = staticEntries();

  // GitHub Actions has no MySQL. Skip CMS URLs at build; on server, use DB when
  // available (cached via revalidate) or static entries on failure.
  if (isProductionBuild()) {
    return entries;
  }

  try {
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
  } catch {
    return entries;
  }
}
