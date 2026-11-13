import { siteUrl } from "@/lib/utils";
import { shareImagesMeta } from "@/lib/seo-meta";

function filled(value) {
  return typeof value === "string" && value.trim().length > 0;
}

export function resolveLocationSeo(location) {
  const title = filled(location.seoTitle) ? location.seoTitle.trim() : location.h1;
  const description = filled(location.metaDescription) ? location.metaDescription.trim() : location.intro;
  return { title, description };
}

export function buildLocationMetadata(location) {
  const { title, description } = resolveLocationSeo(location);
  const canonical = `/${location.slug}`;
  const images = shareImagesMeta();
  const titleField = filled(location.seoTitle) ? { absolute: location.seoTitle.trim() } : title;
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
