"use client";

import { useFormStatus } from "react-dom";
import { Loader2 } from "lucide-react";

/**
 * @param {{
 *   children?: import("react").ReactNode;
 *   pendingLabel?: string;
 *   className?: string;
 * }} props
 */
export function AdminDeleteButton({
  children = "Delete",
  pendingLabel = "Deleting…",
  className = "inline-flex items-center gap-1.5 text-red-300 transition disabled:cursor-not-allowed disabled:opacity-50",
}) {
  const { pending } = useFormStatus();

  return (
    <button type="submit" disabled={pending} className={className} aria-busy={pending}>
      {pending ? (
        <>
          <Loader2 className="h-3.5 w-3.5 shrink-0 animate-spin" aria-hidden />
          {pendingLabel}
        </>
      ) : (
        children
      )}
    </button>
  );
}