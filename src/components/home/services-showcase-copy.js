export const PRIMARY_SLUGS = [
  "web-development",
  "ecommerce",
  "app-development",
  "wordpress-solutions",
];

const PRIMARY_COPY = {
  "web-development": {
    name: "Web Development",
    shortDesc:
      "Custom web applications, internal business tools, customer portals, SaaS platforms, dashboards, and API integrations.",
  },
  ecommerce: {
    name: "Ecommerce",
    shortDesc:
      "Custom ecommerce stores, Shopify solutions, headless commerce, and connected shopping experiences.",
  },
  "app-development": {
    name: "App Development",
    shortDesc: "Mobile applications for customers, employees, ecommerce businesses, and SaaS products.",
  },
  "wordpress-solutions": {
    name: "WordPress",
    shortDesc: "Custom WordPress websites, themes, headless WordPress, WooCommerce, and migrations.",
  },
};

export function displayName(service) {
  return PRIMARY_COPY[service.slug]?.name || service.name;
}

export function displayShort(service) {
  return PRIMARY_COPY[service.slug]?.shortDesc || service.shortDesc;
}

export function organizeServices(services) {
  const bySlug = new Map(services.map((item) => [item.slug, item]));
  const primary = PRIMARY_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const secondary = services.filter((item) => !PRIMARY_SLUGS.includes(item.slug));
  return { primary, secondary, ordered: [...primary, ...secondary] };
}
