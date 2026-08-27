import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/ui/Section";
import { getActiveServices, getServiceBySlug } from "@/lib/data";
import { parseJson, siteUrl } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.name,
    description: service.shortDesc,
    alternates: { canonical: `/services/${service.slug}` },
    openGraph: {
      title: `${service.name} · Mayonity`,
      description: service.shortDesc,
      url: siteUrl(`/services/${service.slug}`),
    },
  };
}

export default async function ServiceDetailPage({ params }) {
  const { slug } = await params;
  const service = await getServiceBySlug(slug);
  if (!service) notFound();

  const benefits = parseJson(service.benefits, []);
  const technologies = parseJson(service.technologies, []);
  const features = parseJson(service.features, []);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: service.name, path: `/services/${service.slug}` },
        ])}
      />
      <section className="px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">{service.number} / Service</p>
          <h1 className="display mt-4 max-w-4xl text-[clamp(2.8rem,7vw,6rem)]">{service.name}</h1>
          <p className="mt-6 max-w-2xl body-copy">{service.description}</p>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 md:grid-cols-2 md:px-8">
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl">What we build</h2>
          <p className="mt-4 text-muted">{service.whatWeBuild}</p>
        </article>
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl">Our approach</h2>
          <p className="mt-4 text-muted">{service.approach}</p>
        </article>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Benefits</h2>
        <ul className="mt-6 grid gap-3 md:grid-cols-2">
          {benefits.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Technologies</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm">
              {item}
            </span>
          ))}
        </div>
        {features.length ? (
          <>
            <h3 className="display mt-10 text-3xl">Inside the work</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {features.map((item) => (
                <span key={item} className="rounded-full bg-white/5 px-4 py-2 text-sm text-muted">
                  {item}
                </span>
              ))}
            </div>
          </>
        ) : null}
      </section>
      {service.portfolios?.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
          <h2 className="display text-4xl">Related projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {service.portfolios.map((project) => (
              <Link key={project.slug} href={`/portfolio/${project.slug}`} className="overflow-hidden rounded-[1.4rem] border border-white/10">
                <img src={project.image} alt={project.name} className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <h3 className="display text-2xl">{project.name}</h3>
                  <p className="mt-1 text-sm text-muted">{project.shortDesc}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <CtaBand title="Start your project" copy={`Tell us about the ${service.name.toLowerCase()} you want to exist.`} />
    </>
  );
}
