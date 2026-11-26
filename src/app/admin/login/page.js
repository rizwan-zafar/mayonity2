"use client";

import { useActionState, useEffect, useState } from "react";
import { loginAction } from "@/app/actions/admin";
import { PasswordField } from "@/components/admin/PasswordField";
import { Logo } from "@/components/layout/Logo";

export default function AdminLoginPage() {
  const [state, action, pending] = useActionState(loginAction, { error: "" });
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (state?.email) setEmail(state.email);
  }, [state]);

  return (
    <section className="flex min-h-screen flex-col items-center justify-center px-5 py-10">
      <Logo variant="full" className="mb-6 justify-center" priority />
      <form action={action} className="glass w-full max-w-md rounded-[1.6rem] p-8">
        <h1 className="display text-4xl">Admin access</h1>
        <p className="mt-2 text-sm text-muted">Authorized operators only.</p>
        <label className="mt-8 grid gap-2 text-sm">
          Email
          <input
            name="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-xl border border-white/10 bg-white/5 px-3 py-2"
          />
        </label>
        <label className="mt-4 grid gap-2 text-sm">
          Password
          <PasswordField />
        </label>
        <label className="mt-4 flex cursor-pointer items-center gap-2.5 text-sm text-muted">
          <input
            type="checkbox"
            name="remember"
            className="size-4 rounded border border-white/20 bg-white/5 accent-white"
          />
          Remember me
        </label>
        {state?.error ? <p className="mt-3 text-sm text-red-300">{state.error}</p> : null}
        <button disabled={pending} className="mt-6 w-full rounded-full bg-white py-3 text-sm text-black">
          {pending ? "Checking..." : "Enter"}
        </button>
      </form>
    </section>
  );
}
