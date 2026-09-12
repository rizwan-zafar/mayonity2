import Link from "next/link";
import { GhostButton, MagneticButton } from "@/components/ui/MagneticButton";
import { parseJson } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

const useCases = [
  {
    title: "Customer Mobile Apps",
    copy: "Mobile experiences that let customers access services, manage accounts, submit requests, and interact with your business.",
  },
  {
    title: "Business & Operations Apps",
    copy: "Applications that help employees manage workflows, information, field operations, and day-to-day business tasks.",
  },
  {
    title: "SaaS Companion Apps",
    copy: "Mobile applications that extend an existing SaaS or web platform to customers and teams.",
  },
  {
    title: "E-Commerce Mobile Apps",
    copy: "Mobile shopping experiences connected to products, customers, orders, payments, and ecommerce systems.",
  },
  {
    title: "Cross-Platform Applications",
    copy: "Applications built for iOS and Android from a shared codebase when cross-platform development is the right fit.",
  },
  {
    title: "Native iOS & Android Apps",
    copy: "Platform-specific applications when native capabilities, performance, or platform-specific experiences are important.",
  },
];

const problems = [
  "Customers need frequent access to your services or account",
  "Employees need mobile access to business workflows",
  "Field teams need to work away from a desktop",
  "Your existing web platform needs a mobile experience",
  "Your product requires device-specific capabilities",
  "Your ecommerce experience needs a dedicated mobile channel",
];

const capabilities = [
  "User authentication",
  "Customer accounts",
  "Push notifications",
  "API integration",
  "Payments",
  "Product catalogs",
  "Order management",
  "Forms and data collection",
  "Offline/limited-connectivity workflows",
  "Backend integration",
];

const technologies = ["React Native", "Native iOS", "Native Android", "APIs", "Push"];

const integrations = [
  "REST APIs",
  "Authentication systems",
  "Databases",
  "Payment services",
  "Ecommerce platforms",
  "CRM/business systems",
  "Third-party APIs",
];

const steps = [
  {
    title: "Understand",
    copy: "We understand your users, business goals, workflows, and product requirements.",
  },
  {
    title: "Plan",
    copy: "We define the application structure, user experience, technical approach, and development scope.",
  },
  {
    title: "Build",
    copy: "We develop, test, and refine the mobile application with regular feedback.",
  },
  {
    title: "Launch & Improve",
    copy: "We prepare the application for release and continue improving it as your product evolves.",
  },
];

const audiences = [
  "Customer-facing businesses",
  "Operations-heavy businesses",
  "Ecommerce businesses",
  "SaaS companies",
  "Startups building mobile products",
  "Businesses extending an existing web platform to mobile",
];

const faqs = [
  {
    question: "How much does custom mobile app development cost?",
    answer:
      "It depends on the number of platforms, features, integrations, and whether we start fresh or extend an existing app. After a short conversation we can outline a realistic range and what would change it.",
  },
  {
    question: "How long does it take to build a mobile app?",
    answer:
      "A focused first version often takes a few months. Larger products, store releases, or several backend integrations take longer. We plan in stages so you can start using the app before every possible feature exists.",
  },
  {
    question: "Should I build a native or cross-platform app?",
    answer:
      "It depends on the product. Cross-platform can be a good fit when iOS and Android should share most of the experience. Native can make more sense when platform-specific capabilities or performance are central to the product. We recommend based on your requirements, not a default stack.",
  },
  {
    question: "Can you build both iOS and Android applications?",
    answer:
      "Yes. We can build for both platforms, either from a shared React Native codebase or as native iOS and Android apps when that is the better fit.",
  },
  {
    question: "Can a mobile app connect to our existing website or APIs?",
    answer:
      "Yes. We regularly connect mobile apps to existing APIs, databases, authentication, payments, and other business systems so the app is part of the same product, not a separate island.",
  },
  {
    question: "Can you work with an existing mobile application?",
    answer:
      "Yes. We can review what you already have, improve it, or rebuild only the parts that are holding the product back.",
  },
  {
    question: "Do you provide ongoing mobile app support?",
    answer:
      "Yes. After release we can stay involved for fixes, store updates, and the next set of improvements as your product changes.",
  },
];

function sortProjects(projects) {
  return [...projects].sort((a, b) => {
    const aScan = /scanquest/i.test(`${a.name} ${a.slug}`);
    const bScan = /scanquest/i.test(`${b.name} ${b.slug}`);
    if (aScan === bScan) return 0;
    return aScan ? -1 : 1;
  });
}

function ProjectCard({ project }) {
  const features = parseJson(project.features, []);
  const techs = parseJson(project.technologies, []);

  return (
    <article className="overflow-hidden rounded-[1.6rem] border border-white/10 md:grid md:grid-cols-[0.9fr_1.1fr]">
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
}

export function AppDevelopmentPage({ service }) {
  const projects = sortProjects(service.portfolios || []);

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Custom Mobile App Development", path: "/services/app-development" },
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
            Custom Mobile App Development
          </h1>
          <p className="mt-6 max-w-2xl body-copy">
            We build mobile applications for customers, employees, and businesses — from cross-platform
            products to native iOS and Android apps connected to the systems your business already uses.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/contact">Discuss Your Project</MagneticButton>
            <GhostButton href="/portfolio">View Our Work</GhostButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">Mobile Apps Built Around Your Business</h2>
        <p className="mt-5 max-w-2xl body-copy">
          From customer-facing products to internal business applications, we build mobile experiences
          around your users, workflows, and business requirements.
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
        <h2 className="display text-4xl md:text-5xl">When Your Business Needs More Than a Mobile Website</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Mobile apps make sense when customers or employees need a faster, more focused experience
          than a traditional website can provide.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-white">
          We turn these requirements into mobile applications designed around the way your customers
          and teams actually use your product.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Mobile App Capabilities</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {capabilities.map((item) => (
            <span key={item} className="rounded-full bg-white/5 px-4 py-2 text-sm text-muted">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="glass rounded-[1.8rem] p-8 md:p-12">
          <h2 className="display text-4xl md:text-5xl">Choose the Right Approach for Your Product</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="display text-2xl">Cross-platform</h3>
              <p className="mt-3 text-muted">
                Cross-platform development can reduce duplicated development work and allow teams to
                build iOS and Android experiences from a shared codebase.
              </p>
            </div>
            <div>
              <h3 className="display text-2xl">Native</h3>
              <p className="mt-3 text-muted">
                Native development can make sense when platform-specific performance, device
                capabilities, or platform-specific user experiences are important.
              </p>
            </div>
          </div>
          <p className="mt-8 max-w-2xl text-white">
            We choose the approach based on your product requirements rather than forcing every project
            into the same technology.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">Connected to the Systems Behind Your Business</h2>
        <p className="mt-5 max-w-2xl body-copy">
          A mobile app often needs to communicate with the systems your business already relies on. We
          connect the mobile experience with the APIs, databases, services, and platforms that power
          your application.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {integrations.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">From Product Idea to Mobile App</h2>
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

      {projects.length ? (
        <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
          <h2 className="display text-4xl">A Look at What We&apos;ve Built</h2>
          <div className="mt-8 grid gap-6">
            {projects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>
      ) : null}

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Built for Businesses That Need a Mobile Experience</h2>
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
          <Link href="/services/web-development" className="text-white hover:text-accent">
            Website Development
          </Link>
          {", "}
          <Link href="/services/ecommerce" className="text-white hover:text-accent">
            Ecommerce
          </Link>
          {", and "}
          <Link href="/services/ui-ux" className="text-white hover:text-accent">
            UI/UX
          </Link>
          .
        </p>
      </section>

      <section className="px-5 py-24 md:px-8">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 px-8 py-16 md:px-16">
          <div className="aurora pointer-events-none absolute -right-20 -top-20 h-72 w-72 opacity-70 blur-2xl" />
          <div className="relative">
            <h2 className="display section-title max-w-3xl">Have an App Idea or Business Process to Improve?</h2>
            <p className="mt-5 max-w-xl body-copy">
              Tell us what you want your mobile application to achieve. We&apos;ll discuss your users,
              requirements, and the right technical approach for the product.
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
