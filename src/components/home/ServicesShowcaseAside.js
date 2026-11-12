"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { parseJson } from "@/lib/utils";
import { Reveal } from "@/components/ui/Section";
import {
  PRIMARY_SLUGS,
  displayName,
  displayShort,
} from "@/components/home/services-showcase-copy";

export function ServicesShowcaseLayout({ services, children }) {
  const [active, setActive] = useState(services[0]?.slug || "");

  return (
    <div
      className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]"
      onMouseOver={(event) => {
        const target = event.target.closest("[data-service-slug]");
        if (!target) return;
        const slug = target.getAttribute("data-service-slug");
        if (slug) setActive(slug);
      }}
      onFocus={(event) => {
        const target = event.target.closest("[data-service-slug]");
        if (!target) return;
        const slug = target.getAttribute("data-service-slug");
        if (slug) setActive(slug);
      }}
    >
      <div>{children}</div>
      <ServicesShowcaseAsidePanel services={services} active={active} />
    </div>
  );
}

function ServicesShowcaseAsidePanel({ services, active }) {
  const current = useMemo(
    () => services.find((item) => item.slug === active) || services[0],
    [active, services]
  );

  if (!current) return null;

  const benefits = parseJson(current.benefits, []);
  const isPrimary = PRIMARY_SLUGS.includes(current.slug);

  return (
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
  );
}
