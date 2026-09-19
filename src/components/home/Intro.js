"use client";

import { Reveal } from "@/components/ui/Section";

const problems = [
  "Replace manual workflows with custom software",
  "Connect disconnected business systems",
  "Build customer portals and dashboards",
  "Create ecommerce experiences",
  "Extend business platforms with mobile apps",
  "Build flexible content platforms",
];

const approach = [
  { label: "Custom solutions", copy: "Software shaped around your workflows instead of a one-size-fits-all product." },
  { label: "Modern development", copy: "Web, ecommerce, mobile, and WordPress work using the stack the product actually needs." },
  { label: "System integration", copy: "Connect the experience to the APIs, data, and tools your business already uses." },
  { label: "Flexible delivery", copy: "Start from an idea, an existing product, or a process that is no longer working." },
  { label: "Maintainable software", copy: "Build so the product can be supported and improved after launch." },
  { label: "Idea to implementation", copy: "Move from the business problem through design and engineering to a working product." },
];

export function Intro() {
  return (
    <section className="px-5 py-28 md:px-8">
      <div className="mx-auto max-w-7xl">
        <Reveal>
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">What we solve</p>
          <h2 className="display section-title mt-4">Software Built Around Your Business</h2>
          <p className="mt-6 max-w-2xl body-copy">
            Businesses often reach a point where spreadsheets, disconnected tools, or off-the-shelf
            software no longer fit the way their teams work. Mayonity builds custom digital products
            around those workflows.
          </p>
        </Reveal>
        <div className="mt-10 grid gap-3 md:grid-cols-2">
          {problems.map((item, index) => (
            <Reveal key={item} delay={index * 0.04}>
              <p className="rounded-2xl border border-white/10 px-5 py-4 text-muted">{item}</p>
            </Reveal>
          ))}
        </div>
        <div className="mt-20">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">How we work</p>
            <h2 className="display mt-4 text-4xl md:text-5xl">Built around the problem, not a template</h2>
          </Reveal>
          <div className="mt-8 grid gap-3 md:grid-cols-2">
            {approach.map((item, index) => (
              <Reveal key={item.label} delay={index * 0.04}>
                <article className="glass rounded-2xl px-5 py-5">
                  <h3 className="display text-2xl">{item.label}</h3>
                  <p className="mt-2 text-sm text-muted">{item.copy}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
