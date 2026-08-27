"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/layout/Logo";
import { MagneticButton } from "@/components/ui/MagneticButton";

const links = [
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/team", label: "Team" },
  { href: "/blog", label: "Journal" },
  { href: "/contact", label: "Contact" },
];

export function Header({ services = [] }) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isAdmin = pathname?.startsWith("/admin");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (isAdmin) return null;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition ${
        scrolled || open ? "glass" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-[var(--header-h)] max-w-7xl items-center justify-between px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 lg:flex" aria-label="Primary">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm tracking-wide text-muted transition hover:text-white ${
                pathname === link.href || pathname?.startsWith(`${link.href}/`)
                  ? "text-white"
                  : ""
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <MagneticButton href="/contact">Start a Project</MagneticButton>
        </div>
        <button
          type="button"
          className="grid h-10 w-10 place-items-center rounded-full border border-white/10 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex w-4 flex-col gap-1.5">
            <span className={`h-px bg-white transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px bg-white transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>
      {open ? (
        <div id="mobile-nav" className="border-t border-white/10 px-5 py-6 lg:hidden">
          <nav className="grid gap-4" aria-label="Mobile">
            {links.map((link) => (
              <Link key={link.href} href={link.href} className="text-2xl display">
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 text-sm text-muted">
              {services.slice(0, 6).map((service) => (
                <Link key={service.slug} href={`/services/${service.slug}`}>
                  {service.name}
                </Link>
              ))}
            </div>
            <MagneticButton href="/contact">Start a Project</MagneticButton>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
