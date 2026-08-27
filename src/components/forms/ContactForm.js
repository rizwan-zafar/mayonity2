"use client";

import { useActionState } from "react";
import { submitContact } from "@/app/actions/public";

const initial = { ok: false, error: "", fieldErrors: {} };

export function ContactForm({ services }) {
  const [state, action, pending] = useActionState(submitContact, initial);

  if (state.ok) {
    return (
      <div className="glass rounded-[1.8rem] p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Received</p>
        <h2 className="display mt-4 text-4xl">The idea is in. We’ll be in touch.</h2>
        <p className="mt-4 max-w-md text-muted">
          A producer at Mayonity will read this personally. If it is urgent, write to hello@mayonity.com.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="glass grid gap-5 rounded-[1.8rem] p-6 md:p-8">
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required error={state.fieldErrors?.name} />
        <Field label="Email" name="email" type="email" required error={state.fieldErrors?.email} />
        <Field label="Phone" name="phone" />
        <Field label="Company" name="company" />
        <label className="grid gap-2 text-sm">
          Service
          <select name="service" className="rounded-2xl border border-white/10 bg-transparent px-4 py-3">
            <option value="">Select a service</option>
            {(services || []).map((service) => (
              <option key={service.slug} value={service.name} className="bg-[#0b0d14]">
                {service.name}
              </option>
            ))}
          </select>
        </label>
        <label className="grid gap-2 text-sm">
          Budget
          <select name="budget" className="rounded-2xl border border-white/10 bg-transparent px-4 py-3">
            <option value="">Select a range</option>
            <option className="bg-[#0b0d14]" value="Under $10k">Under $10k</option>
            <option className="bg-[#0b0d14]" value="$10k–$40k">$10k–$40k</option>
            <option className="bg-[#0b0d14]" value="$40k–$100k">$40k–$100k</option>
            <option className="bg-[#0b0d14]" value="$100k+">$100k+</option>
          </select>
        </label>
      </div>
      <label className="grid gap-2 text-sm">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className="rounded-2xl border border-white/10 bg-transparent px-4 py-3"
          placeholder="What should exist that does not exist yet?"
        />
        {state.fieldErrors?.message ? <span className="text-xs text-red-300">{state.fieldErrors.message}</span> : null}
      </label>
      {state.error ? <p className="text-sm text-red-300">{state.error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black disabled:opacity-60"
      >
        {pending ? "Sending..." : "Start a Project"}
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", required, error }) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input
        name={name}
        type={type}
        required={required}
        className="rounded-2xl border border-white/10 bg-transparent px-4 py-3"
      />
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}
