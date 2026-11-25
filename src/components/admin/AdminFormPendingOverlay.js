"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

export function AdminFormPendingOverlay() {
  const { pending } = useFormStatus();
  if (!pending) return null;

  return (
    <div
      className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center rounded-[inherit] bg-[#07080d]/50 backdrop-blur-[2px]"
      aria-hidden
    >
      <Loader2 className="h-8 w-8 animate-spin text-white" />
    </div>
  );
}