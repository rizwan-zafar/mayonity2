import Link from "next/link";
import { PageHero } from "@/components/ui/Section";
import { getActiveServices } from "@/lib/data";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Services",
  description: "Website design and development, WordPress, mobile apps, e-commerce, UI/UX, data and technology consulting from Mayonity.",
  alternates: { canonical: "/services" },
};

export default async function ServicesPage() {
  const services = await getActiveServices();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Services", path: "/services" }])} />
      <PageHero
        eyebrow="Services"
        title="The work we take seriously."
        copy="Nine practices, one studio. Design, engineering, commerce, mobile and counsel — composed as a single way of working."
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <div className="grid gap-4">
          {services.map((service) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group grid gap-3 rounded-[1.5rem] border border-white/10 px-6 py-7 transition hover:border-accent/40 md:grid-cols-[80px_1fr_auto]"
            >
              <span className="font-mono text-sm text-cyan">{service.number}</span>
              <div>
                <h2 className="display text-3xl md:text-5xl">{service.name}</h2>
                <p className="mt-2 max-w-2xl text-sm text-muted">{service.shortDesc}</p>
              </div>
              <span className="self-center text-sm text-accent">Open →</span>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
