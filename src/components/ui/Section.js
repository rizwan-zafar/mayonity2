"use client";

import { motion, useReducedMotion } from "motion/react";

export function Reveal({ children, className = "", delay = 0 }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 24 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHeading({ eyebrow, title, copy, align = "left" }) {
  return (
    <div className={align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl"}>
      {eyebrow ? (
        <p className="mb-4 font-mono text-xs uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>
      ) : null}
      <h2 className="display section-title text-white">{title}</h2>
      {copy ? <p className="mt-5 body-copy">{copy}</p> : null}
    </div>
  );
}

export function PageHero({ eyebrow, title, copy }) {
  return (
    <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pt-40">
      <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
      <div className="relative mx-auto max-w-7xl">
        <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">{eyebrow}</p>
        <h1 className="display mt-4 max-w-5xl text-[clamp(2.8rem,7vw,6rem)] text-white">{title}</h1>
        {copy ? <p className="mt-6 max-w-2xl body-copy">{copy}</p> : null}
      </div>
    </section>
  );
}

export function CtaBand({ title = "Ready to create what's next?", copy = "Tell us the idea. We will help you turn it into a product people can use." }) {
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-8 py-16 md:px-16">
        <div className="aurora pointer-events-none absolute -right-20 -top-20 h-72 w-72 blur-2xl opacity-70" />
        <div className="relative">
          <h2 className="display section-title max-w-3xl">{title}</h2>
          <p className="mt-5 max-w-xl body-copy">{copy}</p>
          <a href="/contact" className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black">
            Start a Project →
          </a>
        </div>
      </div>
    </section>
  );
}

export function EmptyState({ title, copy }) {
  return (
    <div className="rounded-3xl border border-white/10 px-6 py-16 text-center">
      <h2 className="display text-2xl">{title}</h2>
      <p className="mt-3 text-muted">{copy}</p>
    </div>
  );
}
