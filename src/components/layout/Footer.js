import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { NewsletterForm } from "@/components/forms/NewsletterForm";

export function Footer({ settings, socials, services }) {
  const year = new Date().getFullYear();
  const featured = (services || []).slice(0, 5);

  return (
    <footer className="relative mt-24 border-t border-white/10">
      <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-[1.3fr_1fr_1fr_1fr] md:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm body-copy">
            Mayonity turns ideas into digital experiences, products and technology built for what comes next.
          </p>
          <NewsletterForm />
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">Company</p>
          <ul className="grid gap-2 text-sm text-muted">
            <li><Link href="/about" className="hover:text-white">About</Link></li>
            <li><Link href="/team" className="hover:text-white">Team</Link></li>
            <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">Services</p>
          <ul className="grid gap-2 text-sm text-muted">
            {featured.map((service) => (
              <li key={service.slug}>
                <Link href={`/services/${service.slug}`} className="hover:text-white">
                  {service.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="mb-4 font-mono text-xs uppercase tracking-[0.22em] text-muted">Resources</p>
          <ul className="grid gap-2 text-sm text-muted">
            <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            <li><Link href="/portfolio" className="hover:text-white">Portfolio</Link></li>
            <li><Link href="/testimonials" className="hover:text-white">Testimonials</Link></li>
            <li><Link href="/privacy-policy" className="hover:text-white">Privacy Policy</Link></li>
            <li><Link href="/terms-and-conditions" className="hover:text-white">Terms & Conditions</Link></li>
          </ul>
        </div>
      </div>
      <div className="mx-auto flex max-w-7xl flex-col gap-4 border-t border-white/10 px-5 py-6 text-sm text-muted md:flex-row md:items-center md:justify-between md:px-8">
        <p>© {year} {settings?.siteName || "Mayonity"}. Built for what comes next.</p>
        <div className="flex flex-wrap gap-4">
          {(socials || []).map((item) => (
            <a key={item.platform} href={item.url} target="_blank" rel="noreferrer" className="hover:text-white">
              {item.platform}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
