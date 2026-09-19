"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { parseJson } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/Section";

const PRIMARY_SLUGS = [
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

function displayName(service) {
  return PRIMARY_COPY[service.slug]?.name || service.name;
}

function displayShort(service) {
  return PRIMARY_COPY[service.slug]?.shortDesc || service.shortDesc;
}

function organizeServices(services) {
  const bySlug = new Map(services.map((item) => [item.slug, item]));
  const primary = PRIMARY_SLUGS.map((slug) => bySlug.get(slug)).filter(Boolean);
  const secondary = services.filter((item) => !PRIMARY_SLUGS.includes(item.slug));
  return { primary, secondary };
}

export function ServicesShowcase({ services }) {
  const { primary, secondary } = useMemo(() => organizeServices(services || []), [services]);
  const ordered = useMemo(() => [...primary, ...secondary], [primary, secondary]);
  const [active, setActive] = useState(primary[0]?.slug || services?.[0]?.slug || "");
  const current = useMemo(
    () => ordered.find((item) => item.slug === active) || ordered[0],
    [active, ordered]
  );

  if (!ordered.length) return null;
  const benefits = parseJson(current?.benefits, []);
  const isPrimary = PRIMARY_SLUGS.includes(current.slug);

  return (
    <section className="px-5 py-24 md:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="What Mayonity builds"
          copy="Start with the product you need. Each service page explains the approach in more detail."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {primary.length ? (
              <p className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-cyan">
                Primary services
              </p>
            ) : null}
            {primary.map((service) => (
              <ServiceRow
                key={service.slug}
                service={service}
                open={service.slug === current.slug}
                prominent
                onActivate={setActive}
              />
            ))}
            {secondary.length ? (
              <p className="mb-2 mt-10 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                Design & other services
              </p>
            ) : null}
            {secondary.map((service) => (
              <ServiceRow
                key={service.slug}
                service={service}
                open={service.slug === current.slug}
                prominent={false}
                onActivate={setActive}
              />
            ))}
          </div>
          <Reveal>
            <aside className="glass sticky top-28 rounded-[1.75rem] p-7">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{current.number}</p>
              <h3 className="display mt-3 text-4xl">{displayName(current)}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">
                {isPrimary ? displayShort(current) : current.description}
              </p>
              {!isPrimary && benefits.length ? (
                <ul className="mt-6 grid gap-2">
                  {benefits.slice(0, 4).map((item) => (
                    <li key={item} className="text-sm text-white/80">
                      → {item}
                    </li>
                  ))}
                </ul>
              ) : null}
              <Link href={`/services/${current.slug}`} className="mt-8 inline-flex text-sm text-accent">
                {isPrimary ? `Explore ${displayName(current)}` : `Explore ${current.name}`} →
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function ServiceRow({ service, open, prominent, onActivate }) {
  return (
    <button
      type="button"
      onClick={() => onActivate(service.slug)}
      onMouseEnter={() => onActivate(service.slug)}
      className={`group w-full border-b border-white/10 py-5 text-left transition ${
        open ? "pl-3" : "hover:pl-3"
      }`}
    >
      <div className="flex items-end justify-between gap-4">
        <span className="font-mono text-xs text-muted">{service.number}</span>
        <span
          className={`display ${prominent ? "text-2xl md:text-4xl" : "text-xl md:text-3xl"} ${
            open ? "text-white" : "text-white/55"
          }`}
        >
          {displayName(service)}
        </span>
      </div>
      <p className={`mt-2 max-w-xl text-sm transition ${open ? "text-muted" : "text-transparent"}`}>
        {displayShort(service)}
      </p>
    </button>
  );
}
