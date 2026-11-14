"use client";

import { useActionState, useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { submitContact } from "@/app/actions/public";

const initial = { ok: false, error: "", fieldErrors: {}, values: null };

const BUDGET_SUGGESTIONS = ["Under $10k", "$10k–$40k", "$40k–$100k", "$100k+"];

const fieldClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-muted focus:border-cyan/40 focus:bg-white/[0.05]";

const emptyDraft = {
  name: "",
  email: "",
  phone: "",
  company: "",
  service: "",
  budget: "",
  message: "",
};

export function ContactForm({ services, contactEmail = "hello@mayonity.com" }) {
  const [state, action, pending] = useActionState(submitContact, initial);
  const [draft, setDraft] = useState(emptyDraft);
  const serviceOptions = (services || []).map((s) => s.name);

  useEffect(() => {
    if (state.values) setDraft({ ...emptyDraft, ...state.values });
  }, [state]);

  const set =
    (key) =>
    (e) => {
      const next = e?.target?.value ?? e;
      setDraft((prev) => ({ ...prev, [key]: next }));
    };

  if (state.ok) {
    return (
      <div className="glass rounded-[1.8rem] p-8 md:p-12">
        <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Received</p>
        <h2 className="display mt-4 text-4xl">The idea is in. We’ll be in touch.</h2>
        <p className="mt-4 max-w-md text-muted">
          A producer at Mayonity will read this personally. If it is urgent, write to{" "}
          <a href={`mailto:${contactEmail}`} className="text-cyan hover:underline">
            {contactEmail}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="glass grid gap-5 rounded-[1.8rem] p-6 md:p-8">
      <input type="text" name="website_url" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Name" name="name" required error={state.fieldErrors?.name} value={draft.name} onChange={set("name")} />
        <Field label="Email" name="email" type="email" required error={state.fieldErrors?.email} value={draft.email} onChange={set("email")} />
        <Field label="Phone" name="phone" value={draft.phone} onChange={set("phone")} />
        <Field label="Company" name="company" value={draft.company} onChange={set("company")} />
        <ComboField
          label="Service"
          name="service"
          options={serviceOptions}
          placeholder="Select or describe a service"
          error={state.fieldErrors?.service}
          value={draft.service}
          onValueChange={set("service")}
        />
        <ComboField
          label="Budget"
          name="budget"
          options={BUDGET_SUGGESTIONS}
          placeholder="Select or describe a budget"
          error={state.fieldErrors?.budget}
          value={draft.budget}
          onValueChange={set("budget")}
        />
      </div>
      <label className="grid gap-2 text-sm">
        Message
        <textarea
          name="message"
          required
          rows={6}
          className={fieldClass}
          placeholder="What should exist that does not exist yet?"
          value={draft.message}
          onChange={set("message")}
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

function Field({ label, name, type = "text", required, error, value, onChange }) {
  return (
    <label className="grid gap-2 text-sm">
      {label}
      <input name={name} type={type} required={required} className={fieldClass} value={value} onChange={onChange} />
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </label>
  );
}

function ComboField({ label, name, options, placeholder, error, value, onValueChange }) {
  const listId = useId();
  const wrapRef = useRef(null);
  const [open, setOpen] = useState(false);

  const needle = value.trim().toLowerCase();
  const filtered = options.filter((opt) => opt.toLowerCase().includes(needle));

  const closeSoon = () => {
    window.setTimeout(() => {
      if (wrapRef.current && !wrapRef.current.contains(document.activeElement)) {
        setOpen(false);
      }
    }, 120);
  };

  return (
    <div ref={wrapRef} className="grid gap-2 text-sm">
      <span id={`${listId}-label`}>{label}</span>
      <div className="relative">
        <input
          name={name}
          type="text"
          value={value}
          maxLength={120}
          placeholder={placeholder}
          className={`${fieldClass} pr-11`}
          autoComplete="off"
          aria-labelledby={`${listId}-label`}
          aria-expanded={open}
          aria-controls={open ? listId : undefined}
          aria-autocomplete="list"
          role="combobox"
          onChange={(e) => {
            onValueChange(e);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onBlur={closeSoon}
          onKeyDown={(e) => {
            if (e.key === "Escape") setOpen(false);
          }}
        />
        <button
          type="button"
          tabIndex={-1}
          aria-label={`Show ${label} options`}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted hover:text-cyan"
          onMouseDown={(e) => {
            e.preventDefault();
            setOpen((v) => !v);
          }}
        >
          <ChevronDown className={`h-4 w-4 transition ${open ? "rotate-180 text-cyan" : ""}`} />
        </button>

        {open && filtered.length > 0 ? (
          <ul
            id={listId}
            role="listbox"
            className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-30 max-h-52 overflow-y-auto rounded-2xl border border-white/10 bg-[#0b0d14] py-1.5 shadow-[0_16px_48px_rgba(0,0,0,0.55)]"
          >
            {filtered.map((opt) => (
              <li key={opt} role="option" aria-selected={value === opt}>
                <button
                  type="button"
                  className="block w-full px-4 py-2.5 text-left text-sm text-white/85 transition hover:bg-white/10 hover:text-white"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    onValueChange(opt);
                    setOpen(false);
                  }}
                >
                  {opt}
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
      {error ? <span className="text-xs text-red-300">{error}</span> : null}
    </div>
  );
}