"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function PasswordField({
  name = "password",
  required = true,
  className = "rounded-xl border border-white/10 bg-white/5 px-3 py-2 pr-10",
  autoComplete = "current-password",
}) {
  const [show, setShow] = useState(false);

  return (
    <div className="relative">
      <input
        name={name}
        type={show ? "text" : "password"}
        required={required}
        autoComplete={autoComplete}
        className={`w-full ${className}`}
      />
      <button
        type="button"
        tabIndex={-1}
        aria-label={show ? "Hide password" : "Show password"}
        aria-pressed={show}
        className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted transition hover:text-white"
        onClick={() => setShow((v) => !v)}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
}