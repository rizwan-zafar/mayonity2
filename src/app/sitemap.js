import { getActiveServices, getPublishedPortfolio, getPublishedPosts } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export const dynamic = "force-dynamic";

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
    lastModified: new Date(),
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

  // GitHub Actions has no MySQL. Skip CMS URLs at build; serve the full
  // sitemap at request time on cPanel.
  if (isProductionBuild()) {
    return entries;
  }

  try {
    const [services, projects, { posts }] = await Promise.all([
      getActiveServices(),
      getPublishedPortfolio(),
      getPublishedPosts({ take: 200 }),
    ]);

    return [
      ...entries,
      ...services.map((item) => ({
        url: siteUrl(`/services/${item.slug}`),
        lastModified: item.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      })),
      ...projects.map((item) => ({
        url: siteUrl(`/portfolio/${item.slug}`),
        lastModified: item.updatedAt,
        changeFrequency: "monthly",
        priority: 0.8,
      })),
      ...posts.map((item) => ({
        url: siteUrl(`/blog/${item.slug}`),
        lastModified: item.updatedAt,
        changeFrequency: "weekly",
        priority: 0.6,
      })),
    ];
  } catch {
    return entries;
  }
}
