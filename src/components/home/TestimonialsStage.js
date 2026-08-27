"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/ui/Section";

export function TestimonialsStage({ testimonials }) {
  const [index, setIndex] = useState(0);
  if (!testimonials?.length) return null;
  const item = testimonials[index];

  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Client signal" title="People we have built with." />
        <div className="mt-12 grid gap-8 overflow-hidden rounded-[2rem] border border-white/10 p-6 md:grid-cols-[0.8fr_1.2fr] md:p-10">
          <div className="overflow-hidden rounded-[1.5rem] bg-white/5">
            <img src={item.photo} alt={item.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex flex-col justify-between">
            <blockquote className="display text-[clamp(1.6rem,3vw,2.8rem)] leading-[1.15] text-white">
              “{item.quote}”
            </blockquote>
            <div className="mt-8 flex items-end justify-between gap-4">
              <div>
                <p className="text-white">{item.name}</p>
                <p className="text-sm text-muted">
                  {item.position}, {item.company}
                </p>
                <p className="mt-2 text-cyan" aria-label={`${item.rating} out of 5`}>
                  {"★".repeat(item.rating)}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  className="h-11 w-11 rounded-full border border-white/15"
                  onClick={() => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)}
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  type="button"
                  className="h-11 w-11 rounded-full border border-white/15"
                  onClick={() => setIndex((i) => (i + 1) % testimonials.length)}
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
