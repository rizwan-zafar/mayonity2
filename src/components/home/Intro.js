"use client";

import { Reveal } from "@/components/ui/Section";

const pillars = [
  { label: "Design", copy: "Interfaces that feel inevitable — spatial, quiet and precise." },
  { label: "Engineering", copy: "Software that stays fast as it grows, with architecture you can trust." },
  { label: "AI", copy: "Intelligence used as a collaborator, not a costume." },
  { label: "Strategy", copy: "Clarity before spend. The smallest set of moves with the largest effect." },
  { label: "User Experience", copy: "Products that respect attention, accessibility and real human context." },
  { label: "Business Understanding", copy: "We build for outcomes: growth, operations, conversion, trust." },
];

export function Intro() {
  return (
    <section className="px-5 py-28 md:px-8">
      <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[1.1fr_1fr]">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">Mayonity</p>
          <h2 className="display section-title mt-4">
            Technology moves fast.
            <br />
            We move faster.
          </h2>
          <p className="mt-6 max-w-xl body-copy">
            Mayonity is not an outsourcing bench. We are a product studio: design, engineering, intelligence and business sense in one team — building digital systems for companies that intend to last.
          </p>
        </Reveal>
        <div className="grid gap-3">
          {pillars.map((item, index) => (
            <Reveal key={item.label} delay={index * 0.05}>
              <article className="group glass rounded-2xl px-5 py-5 transition hover:border-accent/40">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="display text-2xl">{item.label}</h3>
                  <span className="font-mono text-xs text-muted">0{index + 1}</span>
                </div>
                <p className="mt-2 max-w-md text-sm text-muted">{item.copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
