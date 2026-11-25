"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

const DEFAULT_CLASS =
  "inline-flex items-center justify-center gap-2 rounded-full bg-white px-5 py-3 text-sm text-black transition disabled:cursor-not-allowed disabled:opacity-60";

/**
 * @param {{
 *   children: import("react").ReactNode;
 *   pendingLabel?: string;
 *   className?: string;
 *   type?: "submit" | "button";
 * }} props
 */
export function AdminSubmitButton({
  children,
  pendingLabel = "Saving…",
  className = DEFAULT_CLASS,
  type = "submit",
}) {
  const { pending } = useFormStatus();

  return (
    <button type={type} disabled={pending} className={className} aria-busy={pending}>
      {pending ? (
        <>
          <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}