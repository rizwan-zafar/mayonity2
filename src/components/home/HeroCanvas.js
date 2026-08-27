"use client";

import { useEffect, useRef } from "react";

export function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let frame;
    let width = 0;
    let height = 0;
    const mouse = { x: 0.5, y: 0.4 };
    const nodes = Array.from({ length: reduce ? 18 : 48 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.00035,
      vy: (Math.random() - 0.5) * 0.00035,
      r: 1.2 + Math.random() * 1.8,
    }));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const ox = (mouse.x - 0.5) * 40;
      const oy = (mouse.y - 0.5) * 24;

      nodes.forEach((node) => {
        if (!reduce) {
          node.x += node.vx;
          node.y += node.vy;
          if (node.x < 0 || node.x > 1) node.vx *= -1;
          if (node.y < 0 || node.y > 1) node.vy *= -1;
        }
      });

      for (let i = 0; i < nodes.length; i += 1) {
        for (let j = i + 1; j < nodes.length; j += 1) {
          const a = nodes[i];
          const b = nodes[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 0.18) {
            ctx.strokeStyle = `rgba(110, 168, 255, ${0.18 - dist})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x * width + ox, a.y * height + oy);
            ctx.lineTo(b.x * width + ox, b.y * height + oy);
            ctx.stroke();
          }
        }
      }

      nodes.forEach((node, index) => {
        ctx.beginPath();
        ctx.fillStyle = index % 7 === 0 ? "rgba(62, 224, 200, 0.9)" : "rgba(243, 244, 248, 0.8)";
        ctx.arc(node.x * width + ox, node.y * height + oy, node.r, 0, Math.PI * 2);
        ctx.fill();
      });

      frame = requestAnimationFrame(draw);
    };

    const onMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = (event.clientX - rect.left) / rect.width;
      mouse.y = (event.clientY - rect.top) / rect.height;
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
