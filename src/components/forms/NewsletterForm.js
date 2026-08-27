"use client";

import { useActionState } from "react";
import { subscribeNewsletter } from "@/app/actions/public";

const initial = { ok: false, error: "", message: "" };

export function NewsletterForm() {
  const [state, action, pending] = useActionState(subscribeNewsletter, initial);

  return (
    <form action={action} className="mt-8 max-w-sm">
      <label htmlFor="newsletter-email" className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
        Newsletter
      </label>
      <div className="mt-3 flex overflow-hidden rounded-full border border-white/15">
        <input
          id="newsletter-email"
          name="email"
          type="email"
          required
          placeholder="you@company.com"
          className="w-full bg-transparent px-4 py-3 text-sm outline-none"
        />
        <button type="submit" disabled={pending} className="bg-white px-4 text-sm text-black">
          {pending ? "..." : "Join"}
        </button>
      </div>
      {state.error ? <p className="mt-2 text-xs text-red-300">{state.error}</p> : null}
      {state.ok ? <p className="mt-2 text-xs text-cyan">{state.message}</p> : null}
    </form>
  );
}
