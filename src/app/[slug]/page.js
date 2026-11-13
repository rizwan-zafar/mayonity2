import Link from "next/link";
import { unstable_noStore as noStore } from "next/cache";
import { notFound } from "next/navigation";
import {
  getActiveServices,
  getFeaturedPortfolio,
  getLocationBySlug,
  getSettings,
} from "@/lib/data";
import { buildLocationMetadata } from "@/lib/location-metadata";
import { isReservedLocationSlug } from "@/lib/locations";
import {
  JsonLd,
  breadcrumbJsonLd,
  faqPageJsonLd,
  locationServiceJsonLd,
} from "@/lib/seo";
import { CtaBand } from "@/components/ui/Section";
import { parseJson, splitParagraphs } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export async function generateMetadata({ params }) {
  noStore();
  const { slug } = await params;
  if (isReservedLocationSlug(slug)) return { title: "Not found" };
  const location = await getLocationBySlug(slug);
  if (!location) return { title: "Not found" };
  return buildLocationMetadata(location);
}

export default async function LocationPage({ params }) {
  noStore();
  const { slug } = await params;
  if (isReservedLocationSlug(slug)) notFound();

  const [location, settings, services, portfolio] = await Promise.all([
    getLocationBySlug(slug),
    getSettings(),
    getActiveServices(),
    getFeaturedPortfolio(),
  ]);

  if (!location) notFound();

  const industries = parseJson(location.industries, []);
  const cities = parseJson(location.cities, []);
  const faqs = parseJson(location.faqs, [])
    .filter((item) => item?.question && item?.answer)
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));

  const whyParagraphs = splitParagraphs(location.whyBody);
  const processParagraphs = splitParagraphs(location.processBody);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: location.name, path: `/${location.slug}` },
        ])}
      />
      <JsonLd data={locationServiceJsonLd(location, settings)} />
      {faqs.length ? <JsonLd data={faqPageJsonLd(faqs)} /> : null}

      <section className="relative overflow-hidden px-5 pb-16 pt-32 md:px-8 md:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-7xl">
          {location.eyebrow ? (
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">{location.eyebrow}</p>
          ) : null}
          <h1 className="display mt-4 max-w-5xl text-[clamp(2.8rem,7vw,6rem)] text-white">{location.h1}</h1>
          <p className="mt-6 max-w-2xl body-copy">{location.intro}</p>
          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
          >
            Start a Project
          </Link>
        </div>
      </section>

      {location.whyTitle || whyParagraphs.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          {location.whyTitle ? <h2 className="display text-4xl">{location.whyTitle}</h2> : null}
          <div className="mt-6 grid gap-4 text-muted">
            {whyParagraphs.map((paragraph, index) => (
              <p key={index} className="body-copy max-w-3xl">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Services for businesses in {location.name}</h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-2">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                href={`/services/${service.slug}`}
                className="glass block rounded-[1.4rem] p-6 transition hover:border-white/20"
              >
                <p className="font-medium text-white">{service.name}</p>
                <p className="mt-2 text-sm text-muted">{service.shortDesc}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {portfolio.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">Recent work</h2>
          <ul className="mt-8 grid gap-6 md:grid-cols-2">
            {portfolio.map((project) => (
              <li key={project.slug}>
                <Link
                  href={`/portfolio/${project.slug}`}
                  className="group block overflow-hidden rounded-[1.5rem] border border-white/10"
                >
                  <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
                    <img
                      src={project.image}
                      alt={project.name}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <p className="font-medium">{project.name}</p>
                    <p className="mt-1 text-sm text-muted">{project.shortDesc}</p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">Recent work</h2>
          <p className="mt-4 text-sm text-muted">Featured portfolio items will appear here when marked in admin.</p>
        </section>
      )}

      {location.processTitle || processParagraphs.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          {location.processTitle ? <h2 className="display text-4xl">{location.processTitle}</h2> : null}
          <div className="mt-6 grid gap-4 text-muted">
            {processParagraphs.map((paragraph, index) => (
              <p key={index} className="body-copy max-w-3xl">
                {paragraph}
              </p>
            ))}
          </div>
        </section>
      ) : null}

      {industries.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">Industries we work with</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {industries.map((item) => (
              <li key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {cities.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">Cities we serve in {location.name}</h2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {cities.map((item) => (
              <li key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
                {item}
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {faqs.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">Frequently asked questions</h2>
          <div className="mt-8 grid gap-4">
            {faqs.map((item) => (
              <article key={item.question} className="glass rounded-[1.4rem] p-6">
                <h3 className="text-lg font-medium text-white">{item.question}</h3>
                <p className="mt-3 text-muted">{item.answer}</p>
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <CtaBand
        title={`Ready to build in ${location.name}?`}
        copy="Tell us what you're building and we'll help you shape the right product and technical approach."
        ctaLabel="Start a Project"
      />
    </>
  );
}
