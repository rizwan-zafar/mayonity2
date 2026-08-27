"use client";

import Link from "next/link";
import { useRef } from "react";

export function MagneticButton({ href, children, className = "", type = "button", onClick }) {
  const ref = useRef(null);

  const onMove = (event) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.18}px, ${y * 0.18}px)`;
  };

  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate(0,0)";
  };

  const classes = `inline-flex items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-accent hover:text-black ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} onClick={onClick}>
      {children}
    </button>
  );
}

export function GhostButton({ href, children, className = "" }) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center justify-center rounded-full border border-white/15 px-5 py-3 text-sm text-white transition hover:border-white/40 hover:bg-white/5 ${className}`}
    >
      {children}
    </Link>
  );
}
