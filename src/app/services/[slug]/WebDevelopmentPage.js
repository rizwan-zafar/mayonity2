import Link from "next/link";
import { GhostButton, MagneticButton } from "@/components/ui/MagneticButton";
import { parseJson } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

const useCases = [
  {
    title: "Internal Business Tools",
    copy: "Custom systems for managing operations, workflows, data, and teams.",
  },
  {
    title: "Customer Portals",
    copy: "Secure portals where customers can access information, submit requests, track activity, and manage their accounts.",
  },
  {
    title: "SaaS Applications",
    copy: "Scalable web applications built around your business model and customer needs.",
  },
  {
    title: "Business Dashboards",
    copy: "Centralized dashboards that bring operational data together and make it easier to monitor and manage your business.",
  },
  {
    title: "API & System Integrations",
    copy: "Connect existing platforms, databases, CRMs, payment systems, and third-party services.",
  },
  {
    title: "Workflow Automation",
    copy: "Replace repetitive manual processes with software-driven workflows.",
  },
];

const problems = [
  "Too much work handled manually",
  "Information spread across different systems",
  "Existing software does not fit the way the business operates",
  "Teams rely on spreadsheets, emails, and disconnected tools",
];

const steps = [
  {
    title: "Understand",
    copy: "We understand your business, users, workflow, and requirements.",
  },
  {
    title: "Plan",
    copy: "We define the solution, architecture, and development scope.",
  },
  {
    title: "Build",
    copy: "We develop, test, and refine the application with regular feedback.",
  },
  {
    title: "Launch & Improve",
    copy: "We deploy the product and continue improving it as your business evolves.",
  },
];

const offShelf = [
  "Unique business workflows",
  "Multiple systems that need integration",
  "Growing operational complexity",
  "Specific customer or employee requirements",
  "Processes that cannot be handled effectively by generic SaaS products",
];

const technologies = [
  "Next.js",
  "React",
  "Node.js",
  "MySQL",
  "Prisma",
  "APIs",
  "Third-party integrations",
];

const capabilities = [
  "App Router",
  "CMS integrations",
  "Authentication",
  "Customer portals",
  "Dashboards",
  "API platforms",
  "Database-driven applications",
  "Third-party integrations",
];

const audiences = [
  "Operations-heavy businesses",
  "Professional services",
  "Ecommerce businesses",
  "Contractors and construction businesses",
  "Startups building SaaS products",
  "Businesses replacing spreadsheets and manual workflows",
];

const faqs = [
  {
    question: "How much does custom web application development cost?",
    answer:
      "It depends on the scope: number of users, workflows, integrations, and whether we are starting fresh or extending an existing system. After a short conversation we can outline a realistic range and what would move the cost up or down.",
  },
  {
    question: "How long does it take to build a custom web application?",
    answer:
      "A focused first version often takes a few months. Larger platforms, migrations, or multi-system integrations take longer. We plan in stages so you can start using the software before every possible feature exists.",
  },
  {
    question: "Can you integrate our existing systems and APIs?",
    answer:
      "Yes. We regularly connect web applications to existing databases, CRMs, payment providers, and third-party APIs so your team is not re-entering the same information in two places.",
  },
  {
    question: "Can you work with an existing application?",
    answer:
      "Yes. We can review what you already have, improve it, or replace only the parts that are holding the business back. We do not assume a full rebuild is the right first step.",
  },
  {
    question: "Do you provide ongoing maintenance and support?",
    answer:
      "Yes. After launch we can stay involved for fixes, small improvements, and the next set of workflows as the business changes.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We typically build with Next.js, React, Node.js, MySQL, Prisma, and APIs, plus the third-party services your operations already rely on. We choose the simplest stack that can still grow with you.",
  },
];

export function WebDevelopmentPage({ service }) {
  const projects = service.portfolios || [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Custom Web Applications", path: "/services/web-development" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(faqs)} />

      <section className="relative overflow-hidden px-5 pb-12 pt-32 md:px-8 md:pt-40">
        <div className="pointer-events-none absolute inset-0 grid-bg opacity-60" />
        <div className="relative mx-auto max-w-7xl">
          <p className="font-mono text-xs uppercase tracking-[0.28em] text-cyan">
            {service.number} / Service
          </p>
          <h1 className="display mt-4 max-w-5xl text-[clamp(2.8rem,7vw,6rem)]">
            Custom Web Applications & Business Software
          </h1>
          <p className="mt-6 max-w-2xl body-copy">
            We build custom web applications, internal business tools, customer portals, and SaaS
            platforms that help businesses replace manual processes, connect their systems, and operate
            more efficiently.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/contact">Discuss Your Project</MagneticButton>
            <GhostButton href="/portfolio">View Our Work</GhostButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">Software Built Around Your Business</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Custom software for businesses that need more than an off-the-shelf website or SaaS product.
        </p>
        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {useCases.map((item) => (
            <article key={item.title} className="glass rounded-[1.6rem] p-7">
              <h3 className="display text-2xl">{item.title}</h3>
              <p className="mt-3 text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">When Your Business Outgrows Manual Processes</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Your business may have grown, but the way you manage it may not have. Spreadsheets,
          disconnected systems, repetitive tasks, and software that does not fit your workflow can
          slow your team down.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-white">
          We turn these processes into software built around how your business actually works.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">From Business Problem to Working Software</h2>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((item, index) => (
            <article key={item.title} className="rounded-[1.5rem] border border-white/10 p-6">
              <p className="font-mono text-xs text-cyan">0{index + 1}</p>
              <h3 className="display mt-3 text-2xl">{item.title}</h3>
              <p className="mt-3 text-sm text-muted">{item.copy}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="glass rounded-[1.8rem] p-8 md:p-12">
          <h2 className="display text-4xl md:text-5xl">When Off-the-Shelf Software Isn&apos;t Enough</h2>
          <p className="mt-5 max-w-2xl body-copy">
            Generic software works well until your business has requirements that do not fit the
            standard workflow.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {offShelf.map((item) => (
              <li key={item} className="text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-white">
            Custom software gives your business the flexibility to build around its actual processes
            instead of forcing those processes into someone else&apos;s system.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Built With Modern Web Technology</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Capabilities We Can Build Into Your Application</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {capabilities.map((item) => (
            <span key={item} className="rounded-full bg-white/5 px-4 py-2 text-sm text-muted">
              {item}
            </span>
          ))}
        </div>
      </section>

      {projects.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">A Look at What We&apos;ve Built</h2>
          <div className="mt-8 grid gap-6">
            {projects.map((project) => {
              const features = parseJson(project.features, []);
              const techs = parseJson(project.technologies, []);
              return (
                <article key={project.slug} className="overflow-hidden rounded-[1.6rem] border border-white/10 md:grid md:grid-cols-[0.9fr_1.1fr]">
                  <Link href={`/portfolio/${project.slug}`} className="block overflow-hidden bg-white/5">
                    <img
                      src={project.image}
                      alt={`${project.name} project preview`}
                      className="aspect-video h-full w-full object-cover md:aspect-auto"
                    />
                  </Link>
                  <div className="p-6 md:p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-cyan">{project.category}</p>
                    <h3 className="display mt-2 text-3xl">{project.name}</h3>
                    <p className="mt-3 text-muted">{project.shortDesc}</p>
                    {project.challenge ? (
                      <p className="mt-5 text-sm text-muted">
                        <span className="text-white">Challenge. </span>
                        {project.challenge}
                      </p>
                    ) : null}
                    {project.solution ? (
                      <p className="mt-3 text-sm text-muted">
                        <span className="text-white">Solution. </span>
                        {project.solution}
                      </p>
                    ) : null}
                    {features.length ? (
                      <p className="mt-3 text-sm text-muted">
                        <span className="text-white">Key capabilities. </span>
                        {features.join(", ")}
                      </p>
                    ) : null}
                    {techs.length ? (
                      <p className="mt-3 text-sm text-muted">
                        <span className="text-white">Technology. </span>
                        {techs.join(", ")}
                      </p>
                    ) : null}
                    <Link href={`/portfolio/${project.slug}`} className="mt-6 inline-flex text-sm text-accent">
                      View case study →
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Built for Businesses With Complex Workflows</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {audiences.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Frequently asked questions</h2>
        <div className="mt-8 grid gap-4">
          {faqs.map((item) => (
            <article key={item.question} className="rounded-[1.4rem] border border-white/10 px-6 py-5">
              <h3 className="display text-2xl">{item.question}</h3>
              <p className="mt-3 text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <p className="text-sm text-muted">
          Related work:{" "}
          <Link href="/services/app-development" className="text-white hover:text-accent">
            App Development
          </Link>
          {", "}
          <Link href="/services/ecommerce" className="text-white hover:text-accent">
            Ecommerce
          </Link>
          {", "}
          <Link href="/services/ui-ux" className="text-white hover:text-accent">
            UI/UX
          </Link>
          {", and "}
          <Link href="/services/wordpress-solutions" className="text-white hover:text-accent">
            WordPress Solutions
          </Link>
          .
        </p>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-8 py-16 md:px-16">
          <div className="aurora pointer-events-none absolute -right-20 -top-20 h-72 w-72 opacity-70 blur-2xl" />
          <div className="relative">
            <h2 className="display section-title max-w-3xl">Have a Business Process That Could Work Better?</h2>
            <p className="mt-5 max-w-xl body-copy">
              Tell us what you&apos;re trying to improve. We&apos;ll discuss the problem, understand your
              requirements, and explore whether custom software is the right solution.
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
