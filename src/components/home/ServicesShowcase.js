"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { parseJson } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/Section";

export function ServicesShowcase({ services }) {
  const [active, setActive] = useState(services?.[0]?.slug || "");
  const current = useMemo(
    () => services.find((item) => item.slug === active) || services[0],
    [active, services]
  );

  if (!services?.length) return null;
  const benefits = parseJson(current?.benefits, []);

  return (
    <section className="px-5 py-24 md:px-8" id="services">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="Nine practices. One future-facing studio."
          copy="Select a service to see how we work — what we build, how we approach it, and where it leads."
        />
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            {services.map((service) => {
              const open = service.slug === current.slug;
              return (
                <button
                  key={service.slug}
                  type="button"
                  onClick={() => setActive(service.slug)}
                  onMouseEnter={() => setActive(service.slug)}
                  className={`group w-full border-b border-white/10 py-5 text-left transition ${
                    open ? "pl-3" : "hover:pl-3"
                  }`}
                >
                  <div className="flex items-end justify-between gap-4">
                    <span className="font-mono text-xs text-muted">{service.number}</span>
                    <span className={`display text-2xl md:text-4xl ${open ? "text-white" : "text-white/55"}`}>
                      {service.name}
                    </span>
                  </div>
                  <p className={`mt-2 max-w-xl text-sm transition ${open ? "text-muted" : "text-transparent"}`}>
                    {service.shortDesc}
                  </p>
                </button>
              );
            })}
          </div>
          <Reveal>
            <aside className="glass sticky top-28 rounded-[1.75rem] p-7">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">{current.number}</p>
              <h3 className="display mt-3 text-4xl">{current.name}</h3>
              <p className="mt-4 text-sm leading-7 text-muted">{current.description}</p>
              <ul className="mt-6 grid gap-2">
                {benefits.slice(0, 4).map((item) => (
                  <li key={item} className="text-sm text-white/80">
                    → {item}
                  </li>
                ))}
              </ul>
              <Link href={`/services/${current.slug}`} className="mt-8 inline-flex text-sm text-accent">
                Explore {current.name} →
              </Link>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
