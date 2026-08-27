import { siteUrl } from "@/lib/utils";

export function organizationJsonLd(settings, socials = []) {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: settings.siteName || "Mayonity",
    url: siteUrl(),
    logo: siteUrl("/logo.svg"),
    email: settings.email,
    telephone: settings.phone,
    address: settings.address
      ? {
          "@type": "PostalAddress",
          streetAddress: settings.address,
        }
      : undefined,
    sameAs: socials.map((item) => item.url).filter(Boolean),
    description:
      settings.description ||
      "Mayonity is a software development company creating intelligent digital experiences for businesses ready for the future.",
  };
}

export function websiteJsonLd(settings) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: settings.siteName || "Mayonity",
    url: siteUrl(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${siteUrl("/blog")}?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function breadcrumbJsonLd(items) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: siteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post, settings) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.metaDescription,
    image: post.featuredImage?.startsWith("http")
      ? post.featuredImage
      : siteUrl(post.featuredImage),
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Person",
      name: post.author?.name || settings.siteName || "Mayonity",
    },
    publisher: {
      "@type": "Organization",
      name: settings.siteName || "Mayonity",
      logo: {
        "@type": "ImageObject",
        url: siteUrl("/logo.svg"),
      },
    },
    mainEntityOfPage: siteUrl(`/blog/${post.slug}`),
  };
}

export function localBusinessJsonLd(settings) {
  if (!settings.address) return null;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: settings.siteName || "Mayonity",
    url: siteUrl(),
    telephone: settings.phone,
    email: settings.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: settings.address,
    },
    openingHours: settings.businessHours,
  };
}

export function JsonLd({ data }) {
  if (!data) return null;
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
