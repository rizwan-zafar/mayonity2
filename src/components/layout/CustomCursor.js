"use client";

import { useEffect, useState } from "react";

export function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    const motion = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || !motion) return;
    setEnabled(true);

    const move = (event) => setPos({ x: event.clientX, y: event.clientY });
    const over = (event) => {
      const target = event.target.closest("a, button, input, textarea, select");
      setHover(Boolean(target));
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, []);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[70] hidden md:block mix-blend-difference"
      style={{
        transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
      }}
    >
      <span
        className={`block rounded-full border border-white transition-transform duration-200 ${
          hover ? "h-10 w-10 -translate-x-5 -translate-y-5" : "h-3 w-3 -translate-x-1.5 -translate-y-1.5 bg-white"
        }`}
      />
    </div>
  );
}
