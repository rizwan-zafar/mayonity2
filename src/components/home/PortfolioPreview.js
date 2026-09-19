import Link from "next/link";
import { Reveal, SectionHeading } from "@/components/ui/Section";

const SERVICE_PROOF = [
  {
    test: /web/i,
    href: "/services/web-development",
    label: "See how we approach custom web applications.",
  },
  {
    test: /e-?commerce/i,
    href: "/services/ecommerce",
    label: "Explore our ecommerce work.",
  },
  {
    test: /mobile/i,
    href: "/services/app-development",
    label: "See our mobile product experience.",
  },
  {
    test: /wordpress/i,
    href: "/services/wordpress-solutions",
    label: "Explore our WordPress work.",
  },
];

export function PortfolioPreview({ projects }) {
  if (!projects?.length) return null;
  const categories = projects.map((project) => project.category || "").join(" ");
  const proofLinks = SERVICE_PROOF.filter((item) => item.test.test(categories));

  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading
            eyebrow="Selected work"
            title="A Look at What We've Built"
            copy="Published projects from the Mayonity portfolio. Categories and descriptions come from the project records."
          />
          <Link href="/portfolio" className="text-sm text-accent">
            View Our Work
          </Link>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {projects.map((project, index) => (
            <Reveal key={project.slug} delay={index * 0.04} className={index === 0 ? "md:col-span-2" : ""}>
              <Link href={`/portfolio/${project.slug}`} className="group block overflow-hidden rounded-[1.75rem] border border-white/10">
                <div className="relative aspect-[16/9] overflow-hidden bg-white/5">
                  <img
                    src={project.image}
                    alt={`${project.name} project preview`}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/25" />
                  <div className="absolute bottom-0 p-6 md:p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan drop-shadow">{project.category}</p>
                    <h3 className="display mt-2 text-3xl text-white drop-shadow-md md:text-5xl">{project.name}</h3>
                    <p className="mt-2 max-w-xl text-sm text-white/85 drop-shadow">{project.shortDesc}</p>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
        {proofLinks.length ? (
          <div className="mt-10 flex flex-col gap-3 text-sm text-muted md:flex-row md:flex-wrap md:gap-x-8">
            {proofLinks.map((item) => (
              <Link key={item.href} href={item.href} className="text-white hover:text-accent">
                {item.label}
              </Link>
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
