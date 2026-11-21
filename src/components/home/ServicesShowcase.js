import Link from "next/link";
import { SectionHeading } from "@/components/ui/Section";
import { ServicesShowcaseLayout } from "@/components/home/ServicesShowcaseAside";
import { displayName, displayShort, organizeServices } from "@/components/home/services-showcase-copy";

export function ServicesShowcase({ services }) {
  const { primary, secondary, ordered } = organizeServices(services || []);
  if (!ordered.length) return null;

  return (
    <section className="px-5 py-14 md:px-8 md:py-16" id="services">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Capabilities"
          title="What Mayonity builds"
          copy="Start with the product you need. Each service page explains the approach in more detail."
        />
        <ServicesShowcaseLayout services={ordered}>
          <div className="divide-y divide-white/10 border-y border-white/10">
            {primary.length ? (
              <p className="py-3 font-mono text-xs uppercase tracking-[0.22em] text-cyan">
                Primary services
              </p>
            ) : null}
            {primary.map((service) => (
              <ServiceRowLink key={service.slug} service={service} prominent />
            ))}
            {secondary.length ? (
              <p className="py-3 pt-6 font-mono text-xs uppercase tracking-[0.22em] text-muted">
                Design & other services
              </p>
            ) : null}
            {secondary.map((service) => (
              <ServiceRowLink key={service.slug} service={service} prominent={false} />
            ))}
          </div>
        </ServicesShowcaseLayout>
      </div>
    </section>
  );
}

function ServiceRowLink({ service, prominent }) {
  return (
    <Link
      href={`/services/${service.slug}`}
      data-service-slug={service.slug}
      className="group grid grid-cols-[2.75rem_1fr] gap-x-4 gap-y-2 py-5 text-left transition hover:bg-white/[0.03] hover:pl-2"
    >
      <span className="pt-1 font-mono text-xs text-muted">{service.number}</span>
      <span
        className={`display ${prominent ? "text-2xl md:text-3xl" : "text-xl md:text-2xl"} text-white/80 group-hover:text-white`}
      >
        {displayName(service)}
      </span>
      <p className="col-span-2 max-w-xl text-sm text-muted">{displayShort(service)}</p>
    </Link>
  );
}
