import { siteUrl } from "@/lib/utils";
import { shareImagesMeta } from "@/lib/seo-meta";

const CUSTOM_META = {
  "web-development": {
    title: "Custom Web Applications & Business Software | Mayonity",
    description:
      "Mayonity builds custom web applications, internal business tools, customer portals, SaaS platforms, dashboards, integrations, and workflow automation.",
  },
  ecommerce: {
    title: "Custom E-Commerce Development | Mayonity",
    description:
      "Mayonity builds custom ecommerce stores, Shopify experiences, headless commerce platforms, mobile commerce solutions, and ecommerce integrations.",
  },
  "app-development": {
    title: "Custom Mobile App Development | Mayonity",
    description:
      "Mayonity builds custom mobile apps for iOS and Android, including cross-platform applications, customer apps, business apps, ecommerce apps, and API-connected products.",
  },
  "wordpress-solutions": {
    title: "Custom WordPress Development | Mayonity",
    description:
      "Mayonity builds custom WordPress websites, themes, headless WordPress platforms, WooCommerce solutions, and integrations around your business.",
  },
};

function filled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function resolveServiceSeo(service) {
  const custom = CUSTOM_META[service.slug];
  const title = filled(service.seoTitle)
    ? service.seoTitle.trim()
    : custom?.title ?? service.name;
  const description = filled(service.metaDescription)
    ? service.metaDescription.trim()
    : custom?.description ?? service.shortDesc;
  return { title, description, custom };
}

export function buildServiceMetadata(service) {
  const { title, description, custom } = resolveServiceSeo(service);
  const canonical = `/services/${service.slug}`;
  const images = shareImagesMeta(service.image);
  const titleField = filled(service.seoTitle)
    ? { absolute: service.seoTitle.trim() }
    : custom?.title
      ? { absolute: custom.title }
      : title;
  return {
    title: titleField,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: siteUrl(canonical),
      ...images.openGraph,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...images.twitter,
    },
  };
}
