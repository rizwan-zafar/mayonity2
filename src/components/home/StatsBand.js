"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const [shown, setShown] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        if (reduce) {
          setShown(value);
          io.disconnect();
          return;
        }
        const start = performance.now();
        const step = (now) => {
          const t = Math.min(1, (now - start) / 1400);
          const eased = 1 - Math.pow(1 - t, 3);
          setShown(Math.round(value * eased));
          if (t < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
        io.disconnect();
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [value]);

  return (
    <p ref={ref} className="display text-[clamp(2.4rem,5vw,4.6rem)]">
      {shown.toLocaleString()}
      {suffix}
    </p>
  );
}

export function StatsBand({ stats }) {
  if (!stats?.length) return null;
  return (
    <section className="px-5 py-20 md:px-8">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-6 py-12 md:px-10">
        <div className="mb-8 h-px w-full overflow-hidden bg-white/10">
          <div className="scan-line h-px w-full bg-gradient-to-r from-accent via-violet to-cyan" />
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {stats.map((item) => (
            <div key={item.key}>
              <Counter value={item.value} suffix={item.suffix} />
              <p className="mt-2 text-sm text-muted">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
