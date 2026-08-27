import { getActiveServices, getPublishedPortfolio, getPublishedPosts } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export default async function sitemap() {
  const [services, projects, { posts }] = await Promise.all([
    getActiveServices(),
    getPublishedPortfolio(),
    getPublishedPosts({ take: 200 }),
  ]);

  const staticRoutes = [
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

  return [
    ...staticRoutes,
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
}
