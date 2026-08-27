import Link from "next/link";
import { notFound } from "next/navigation";
import { CtaBand } from "@/components/ui/Section";
import { getPortfolioBySlug, getPublishedPortfolio, getRelatedPortfolio } from "@/lib/data";
import { parseJson, siteUrl } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) return { title: "Project" };
  return {
    title: project.name,
    description: project.shortDesc,
    alternates: { canonical: `/portfolio/${project.slug}` },
    openGraph: {
      title: `${project.name} · Mayonity`,
      description: project.shortDesc,
      url: siteUrl(`/portfolio/${project.slug}`),
    },
  };
}

export default async function PortfolioDetailPage({ params }) {
  const { slug } = await params;
  const project = await getPortfolioBySlug(slug);
  if (!project) notFound();
  const related = await getRelatedPortfolio(project.slug, project.category);
  const features = parseJson(project.features, []);
  const technologies = parseJson(project.technologies, []);
  const services = parseJson(project.services, []);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Portfolio", path: "/portfolio" },
          { name: project.name, path: `/portfolio/${project.slug}` },
        ])}
      />
      <section className="px-5 pb-10 pt-32 md:px-8 md:pt-40">
        <div className="mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">
            {project.client} · {project.industry}
          </p>
          <h1 className="display mt-4 text-[clamp(2.8rem,7vw,6rem)]">{project.name}</h1>
          <p className="mt-5 max-w-2xl body-copy">{project.shortDesc}</p>
          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/10">
            <img src={project.image} alt={project.name} className="w-full object-cover" />
          </div>
        </div>
      </section>
      <section className="mx-auto grid max-w-7xl gap-6 px-5 pb-16 md:grid-cols-2 md:px-8">
        <Block title="Project overview" copy={project.overview} />
        <Block title="Challenge" copy={project.challenge} />
        <Block title="Solution" copy={project.solution} />
        <Block title="Design" copy={project.design} />
        <Block title="Technology" copy={project.technology} />
        <Block title="Results" copy={project.results} />
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Features</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {features.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4">{item}</li>
          ))}
        </ul>
        <div className="mt-8 flex flex-wrap gap-2">
          {technologies.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted">{item}</span>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted">Services: {services.join(" · ")}</p>
        {project.projectUrl ? (
          <a href={project.projectUrl} className="mt-4 inline-flex text-accent" target="_blank" rel="noreferrer">
            Visit project →
          </a>
        ) : null}
      </section>
      {project.images?.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">Gallery</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {project.images.map((image) => (
              <img key={image.id} src={image.url} alt={image.alt} className="rounded-[1.4rem] border border-white/10" />
            ))}
          </div>
        </section>
      ) : null}
      {related.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-8 md:px-8">
          <h2 className="display text-4xl">Related projects</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {related.map((item) => (
              <Link key={item.slug} href={`/portfolio/${item.slug}`} className="overflow-hidden rounded-[1.4rem] border border-white/10">
                <img src={item.image} alt={item.name} className="aspect-video w-full object-cover" />
                <div className="p-4">
                  <h3 className="display text-2xl">{item.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
      <CtaBand title="Start your project" />
    </>
  );
}

function Block({ title, copy }) {
  return (
    <article className="glass rounded-[1.5rem] p-7">
      <h2 className="display text-3xl">{title}</h2>
      <p className="mt-4 text-muted">{copy}</p>
    </article>
  );
}
