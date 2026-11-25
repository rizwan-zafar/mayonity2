"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAction } from "@/app/actions/admin";
import { Logo } from "@/components/layout/Logo";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";

const links = [
  { href: "/admin", label: "Dashboards" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/team", label: "Team" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/blog", label: "Blog" },
  { href: "/admin/statistics", label: "Statistics" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({ user, children }) {
  const pathname = usePathname();
  return (
    <div className="min-h-screen bg-[#07080d] text-white">
      <div className="grid lg:grid-cols-[240px_1fr]">
        <aside className="border-b border-white/10 p-5 lg:min-h-screen lg:border-b-0 lg:border-r">
          <Logo variant="compact" />
          <p className="mt-1 text-xs text-muted">{user?.email}</p>
          <nav className="mt-6 grid gap-1 text-sm">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-xl px-3 py-2 ${
                  pathname === link.href ? "bg-white/10 text-white" : "text-muted hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <form action={logoutAction} className="mt-6">
            <AdminSubmitButton
              pendingLabel="Signing out…"
              className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
            >
              Sign out
            </AdminSubmitButton>
          </form>
        </aside>
        <div className="p-5 md:p-8">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, name, defaultValue = "", type = "text", textarea, required }) {
  const classes = "w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm";
  const value = defaultValue ?? "";
  return (
    <label className="grid gap-1 text-sm">
      {label}
      {textarea ? (
        <textarea name={name} defaultValue={value} rows={5} className={classes} required={required} />
      ) : (
        <input name={name} type={type} defaultValue={value} className={classes} required={required} />
      )}
    </label>
  );
}

export function AdminHeader({ title, href }) {
  return (
    <div className="flex items-center justify-between">
      <h1 className="display text-4xl">{title}</h1>
      {href ? (
        <a href={href} className="rounded-full bg-white px-4 py-2 text-sm text-black">
          New
        </a>
      ) : null}
    </div>
  );
}
