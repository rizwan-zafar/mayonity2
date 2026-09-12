import Link from "next/link";
import { GhostButton, MagneticButton } from "@/components/ui/MagneticButton";
import { parseJson } from "@/lib/utils";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";

const useCases = [
  {
    title: "Custom E-Commerce Stores",
    copy: "Flexible ecommerce websites designed around your products, customers, brand, and business requirements.",
  },
  {
    title: "Shopify Development",
    copy: "Custom Shopify storefronts and ecommerce experiences tailored to your products and operations.",
  },
  {
    title: "Headless Commerce",
    copy: "Flexible storefront experiences that separate the customer-facing experience from the commerce backend.",
  },
  {
    title: "Custom Storefronts",
    copy: "Fast, responsive storefronts designed to give your brand more control over the shopping experience.",
  },
  {
    title: "Mobile Commerce",
    copy: "Mobile-first ecommerce experiences that make browsing, purchasing, and account management easier for customers.",
  },
  {
    title: "E-Commerce Web Applications",
    copy: "Custom ecommerce applications for businesses with requirements beyond standard online stores.",
  },
];

const problems = [
  "Your storefront does not fully match your brand or customer experience",
  "Manual product, inventory, or order processes slow your team down",
  "Your ecommerce platform needs to connect with other business systems",
  "Standard platform functionality does not support your workflow",
  "You need more control over the frontend shopping experience",
];

const capabilities = [
  "Product catalogs",
  "Product variants",
  "Shopping carts",
  "Checkout experiences",
  "Customer accounts",
  "Subscriptions",
  "Inventory integration",
  "Payment integration",
  "Order management",
  "Content management",
  "API integrations",
];

const technologies = [
  "Shopify",
  "Next.js",
  "Custom E-Commerce",
  "Payments",
  "Headless Commerce",
];

const integrations = [
  "Payment gateways",
  "Inventory systems",
  "Shipping and logistics",
  "CRM systems",
  "ERP/business systems",
  "Third-party APIs",
];

const steps = [
  {
    title: "Understand",
    copy: "We understand your products, customers, sales process, and operational requirements.",
  },
  {
    title: "Plan",
    copy: "We define the ecommerce experience, platform approach, integrations, and development scope.",
  },
  {
    title: "Build",
    copy: "We develop, test, and refine the storefront and supporting ecommerce functionality.",
  },
  {
    title: "Launch & Improve",
    copy: "We launch the experience and continue improving it as your products and business evolve.",
  },
];

const audiences = [
  "Direct-to-consumer brands",
  "Product-based businesses",
  "Growing ecommerce businesses",
  "Businesses with custom ecommerce workflows",
  "Businesses connecting ecommerce with existing systems",
];

const faqs = [
  {
    question: "How much does custom ecommerce development cost?",
    answer:
      "It depends on the catalog, checkout, integrations, and whether we start on Shopify, a custom store, or an existing site. After a short conversation we can outline a realistic range and what would change it.",
  },
  {
    question: "How long does it take to build an ecommerce website?",
    answer:
      "A focused storefront can take a few months. Larger catalogs, custom workflows, or several system integrations take longer. We plan in stages so you can start selling before every extra feature exists.",
  },
  {
    question: "Can you develop a custom Shopify storefront?",
    answer:
      "Yes. We can design and build a Shopify experience around your products, brand, and operations, including a more tailored storefront when a standard theme is not enough.",
  },
  {
    question: "Can you build a headless ecommerce website?",
    answer:
      "Yes. When you need more control over the shopping experience, we can build a custom storefront and connect it to a commerce backend.",
  },
  {
    question: "Can you integrate ecommerce with our existing systems?",
    answer:
      "Yes. We can connect the store to payments, inventory, shipping, CRM, and other business systems so orders and product data do not live in isolation.",
  },
  {
    question: "Can you work with an existing ecommerce website?",
    answer:
      "Yes. We can improve what you already have, rebuild the storefront, or replace only the parts that are holding the business back.",
  },
  {
    question: "Do you provide ongoing ecommerce support?",
    answer:
      "Yes. After launch we can stay involved for fixes, catalog changes, and the next set of improvements as your products and operations change.",
  },
];

export function EcommercePage({ service }) {
  const projects = service.portfolios || [];

  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Services", path: "/services" },
          { name: "Custom E-Commerce Development", path: "/services/ecommerce" },
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
            Custom E-Commerce Development
          </h1>
          <p className="mt-6 max-w-2xl body-copy">
            We build ecommerce experiences around your products, customers, and business operations —
            from custom storefronts and Shopify solutions to headless commerce and integrated shopping
            platforms.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <MagneticButton href="/contact">Discuss Your Project</MagneticButton>
            <GhostButton href="/portfolio">View Our Work</GhostButton>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">E-Commerce Solutions Built Around Your Business</h2>
        <p className="mt-5 max-w-2xl body-copy">
          From straightforward online stores to complex commerce experiences, we build ecommerce
          systems around how your business actually sells and operates.
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
        <h2 className="display text-4xl md:text-5xl">When Your E-Commerce Platform Needs More</h2>
        <p className="mt-5 max-w-2xl body-copy">
          Standard ecommerce platforms can be a strong starting point, but growing businesses
          sometimes need more flexibility, better integrations, or workflows built around the way they
          actually operate.
        </p>
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {problems.map((item) => (
            <li key={item} className="rounded-2xl border border-white/10 px-5 py-4 text-muted">
              {item}
            </li>
          ))}
        </ul>
        <p className="mt-8 max-w-2xl text-white">
          We build the ecommerce experience around your business instead of forcing your business into
          a fixed template.
        </p>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">E-Commerce Capabilities</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {capabilities.map((item) => (
            <span key={item} className="rounded-full bg-white/5 px-4 py-2 text-sm text-muted">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl">Platforms & Technology</h2>
        <div className="mt-6 flex flex-wrap gap-2">
          {technologies.map((item) => (
            <span key={item} className="rounded-full border border-white/10 px-4 py-2 text-sm">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <div className="glass rounded-[1.8rem] p-8 md:p-12">
          <h2 className="display text-4xl md:text-5xl">Connect Your Store With the Systems You Already Use</h2>
          <p className="mt-5 max-w-2xl body-copy">
            Your ecommerce platform does not operate in isolation. We can connect the customer
            experience with the systems that support your day-to-day operations.
          </p>
          <ul className="mt-8 grid gap-3 md:grid-cols-2">
            {integrations.map((item) => (
              <li key={item} className="text-muted">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <h2 className="display text-4xl md:text-5xl">From Storefront to Working Commerce Platform</h2>
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
        <h2 className="display text-4xl">Built for Businesses Selling Online</h2>
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
          <Link href="/services/app-development" className="text-white hover:text-accent">
            App Development
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
            <h2 className="display section-title max-w-3xl">Ready to Build a Better E-Commerce Experience?</h2>
            <p className="mt-5 max-w-xl body-copy">
              Tell us what you&apos;re selling, what you need to improve, and how your current ecommerce
              setup works. We&apos;ll explore the right technical approach for your business.
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
