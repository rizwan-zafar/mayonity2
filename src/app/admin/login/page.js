"use client";

import { useActionState } from "react";
import { loginAction } from "@/app/actions/admin";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });

  return (
    <section className="grid min-h-screen place-items-center px-5">
      <form action={action} className="glass w-full max-w-md rounded-[1.6rem] p-8">
        <p className="font-mono text-xs uppercase tracking-[0.24em] text-cyan">Mayonity</p>
        <h1 className="display mt-3 text-4xl">Admin access</h1>
        <p className="mt-2 text-sm text-muted">Authorized operators only.</p>
        <label className="mt-8 grid gap-2 text-sm">
          Email
          <input name="email" type="email" required className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        </label>
        <label className="mt-4 grid gap-2 text-sm">
          Password
          <input name="password" type="password" required className="rounded-xl border border-white/10 bg-white/5 px-3 py-2" />
        </label>
        {state?.error ? <p className="mt-3 text-sm text-red-300">{state.error}</p> : null}
        <button disabled={pending} className="mt-6 w-full rounded-full bg-white py-3 text-sm text-black">
          {pending ? "Checking..." : "Enter"}
        </button>
      </form>
    </section>
  );
}
