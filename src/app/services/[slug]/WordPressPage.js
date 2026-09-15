import Link from "next/link";
import { GhostButton, MagneticButton } from "@/components/ui/MagneticButton";
import { parseJson } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

const useCases = [
  {
    title: "Custom WordPress Websites",
    copy: "Business and marketing websites built around your brand, content structure, and requirements.",
  },
  {
    title: "Custom WordPress Themes",
    copy: "Purpose-built themes that give your team control over the website experience without relying on generic templates.",
  },
  {
    title: "Headless WordPress",
    copy: "Use WordPress as a content management system while delivering content through a modern custom frontend.",
  },
  {
    title: "WordPress CMS & Content Workflows",
    copy: "Flexible content structures and publishing workflows designed around how your team manages content.",
  },
  {
    title: "WooCommerce Development",
    copy: "Custom WooCommerce experiences for businesses that need ecommerce functionality within the WordPress ecosystem.",
  },
  {
    title: "WordPress Migration",
    copy: "Move an existing WordPress website to a better structure, hosting environment, theme, or technical setup.",
  },
];

const problems = [
  "Your current theme limits the design or user experience",
  "Your website relies too heavily on plugins",
  "Content management has become difficult for your team",
  "Your website needs custom functionality",
  "Your existing WordPress site needs better performance",
  "You need WordPress connected to other systems",
  "You want a modern frontend while keeping WordPress as your CMS",
];

const capabilities = [
  "Custom themes",
  "Custom blocks/components",
  "CMS configuration",
  "Content models",
  "Editorial workflows",
  "WooCommerce",
  "API integrations",
  "Headless WordPress",
  "Website migrations",
  "Performance optimization",
  "Responsive implementation",
  "Security-conscious development",
];

const themePoints = [
  "Custom page structures",
  "Reusable content components",
  "Flexible publishing",
  "Brand-specific experiences",
  "Easier content management",
];

const headlessPoints = [
  "Flexible frontend",
  "Reusable content",
  "API-driven architecture",
  "Modern frontend frameworks",
  "WordPress content management",
];

const wooItems = [
  "Product catalogs",
  "Product variations",
  "Checkout",
  "Payments",
  "Order workflows",
  "Custom storefront experiences",
  "Third-party integrations",
];

const performanceItems = [
  "Performance optimization",
  "Image optimization",
  "Efficient frontend implementation",
  "Plugin discipline",
  "Secure configuration",
  "Maintainable code",
];

const integrations = [
  "REST APIs",
  "CRM systems",
  "Ecommerce systems",
  "Payment services",
  "Business systems",
  "Third-party APIs",
];

const steps = [
  {
    title: "Understand",
    copy: "We understand your business, content, users, and technical requirements.",
  },
  {
    title: "Plan",
    copy: "We define the site structure, content model, integrations, and development approach.",
  },
  {
    title: "Build",
    copy: "We develop the WordPress experience, test it across devices, and refine it with your feedback.",
  },
  {
    title: "Launch & Improve",
    copy: "We prepare the website for launch and continue improving it as your business evolves.",
  },
];

const audiences = [
  "Growing businesses",
  "Product and service companies",
  "Content-driven businesses",
  "Marketing teams",
  "Ecommerce businesses using WooCommerce",
  "Businesses with existing WordPress websites",
  "Businesses needing custom WordPress functionality",
];

const faqs = [
  {
    question: "How much does custom WordPress development cost?",
    answer:
      "It depends on the number of templates, content types, integrations, and whether we start fresh or rebuild an existing site. After a short conversation we can outline a realistic range and what would change it.",
  },
  {
    question: "How long does it take to build a custom WordPress website?",
    answer:
      "A focused custom site often takes a few weeks to a few months. Migrations, custom workflows, or a headless frontend take longer. We plan in stages so you can start publishing before every extra feature exists.",
  },
  {
    question: "Can you build a custom WordPress theme?",
    answer:
      "Yes. We build themes and block systems around your brand and content model so your team can publish without fighting a generic template.",
  },
  {
    question: "Can you migrate an existing WordPress website?",
    answer:
      "Yes. We can move a site to a better theme, structure, or hosting setup and keep the content your team already relies on.",
  },
  {
    question: "Can you improve the performance of an existing WordPress website?",
    answer:
      "Yes. We look at the theme, plugins, images, and frontend implementation, then reduce what is slowing the site down. We do not promise a specific score.",
  },
  {
    question: "What is headless WordPress?",
    answer:
      "It means WordPress stays the place you manage content, while a separate frontend displays that content. It is useful when you need a more flexible frontend — it is not the right choice for every site.",
  },
  {
    question: "Can you customize WooCommerce?",
    answer:
      "Yes, when WordPress is the right place to sell. For broader ecommerce platforms and storefronts, we also offer custom ecommerce development.",
  },
];

function isWordPressProject(project) {
  const hay = [project.category, project.services, project.technologies, project.technology]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();
  return hay.includes("wordpress");
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
            <span className="text-white">Key features. </span>
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

export function WordPressPage({ service }) {
  const linked = service.portfolios || [];
  const wordpressProjects = linked.filter(isWordPressProject);
  const projects = wordpressProjects.length ? wordpressProjects : linked;

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Custom WordPress Development", path: "/services/wordpress-solutions" },
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
            Custom WordPress Development
          </h1>
          <p className="mt-6 max-w-2xl body-copy">
            We build flexible WordPress websites and content platforms around your brand, content, and
            business requirements — from custom themes and WooCommerce solutions to headless WordPress
            experiences.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/contact">Discuss Your Project</MagneticButton>
            <GhostButton href="/portfolio">View Our Work</GhostButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">WordPress Built Around Your Business</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Instead of forcing your business into a pre-built template, we build WordPress experiences
          around your content, workflows, brand, and technical requirements.
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
        <h2 className="display text-4xl md:text-5xl">When a Standard WordPress Setup Isn&apos;t Enough</h2>
        <p className="mt-5 max-w-2xl body-copy">
          WordPress is flexible, but a growing business can outgrow an off-the-shelf theme or
          plugin-heavy setup.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-white">
          We build the WordPress layer around your business instead of making your business adapt to a
          generic setup.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">WordPress Development Capabilities</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {capabilities.map((item) => (
            <span key={item} className="rounded-full bg-white/5 px-4 py-2 text-sm text-muted">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">More Control Than a Template</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Your website should reflect how your business communicates and operates. Custom WordPress
          development gives you more control over the frontend experience and the way your team manages
          content.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {themePoints.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="glass rounded-[1.8rem] p-8 md:p-12">
          <h2 className="display text-4xl md:text-5xl">WordPress as Your Content Platform</h2>
          <p className="mt-5 max-w-2xl body-copy">
            Headless WordPress separates the content management experience from the customer-facing
            frontend, allowing businesses to manage content in WordPress while delivering it through a
            modern application.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {headlessPoints.map((item) => (
              <li key={item} className="text-muted">
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-8 max-w-2xl text-white">
            We use this approach when the project benefits from the separation — not as a default for
            every WordPress website.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">WooCommerce When WordPress Is the Right Commerce Platform</h2>
        <p className="mt-5 max-w-2xl body-copy">
          For businesses already using WordPress, WooCommerce can provide a practical foundation for
          selling products online. We can customize the experience around your products, customers, and
          business requirements.
        </p>
        <ul className="mt-8 flex flex-wrap gap-2">
          {wooItems.map((item) => (
            <li key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm text-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8">
          <Link href="/services/ecommerce" className="text-accent hover:text-white">
            Explore our custom ecommerce development services
          </Link>
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Built for Performance and Maintainability</h2>
        <p className="mt-5 max-w-2xl body-copy">
          A WordPress website should remain manageable as content, traffic, and functionality grow.
        </p>
        <div className="mt-6 flex flex-wrap gap-2">
          {performanceItems.map((item) => (
            <span key={item} className="rounded-full bg-white/5 px-4 py-2 text-sm text-muted">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">Connect WordPress to the Rest of Your Business</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Your website often needs to communicate with systems beyond WordPress. We can connect the
          website or content platform with the services your business already uses.
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
        <h2 className="display text-4xl md:text-5xl">From WordPress Project to Working Website</h2>
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
        <h2 className="display text-4xl">Built for Businesses That Need More From WordPress</h2>
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
            <h2 className="display section-title max-w-3xl">Need More From WordPress?</h2>
            <p className="mt-5 max-w-xl body-copy">
              Tell us what you&apos;re building, what isn&apos;t working with your current WordPress
              setup, or what you want to improve. We&apos;ll discuss the right approach for your
              website.
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
