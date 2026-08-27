import { PageHero } from "@/components/ui/Section";
import { PortfolioFilter } from "@/components/portfolio/PortfolioFilter";
import { getPublishedPortfolio } from "@/lib/data";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Portfolio",
  description: "Selected Mayonity work across web, mobile, e-commerce, WordPress and UI/UX.",
  alternates: { canonical: "/portfolio" },
};

export default async function PortfolioPage() {
  const projects = await getPublishedPortfolio();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Portfolio", path: "/portfolio" }])} />
      <PageHero eyebrow="Work" title="Products with gravity." copy="A sample of systems we have designed and engineered — commerce, operations, health, publishing and the field." />
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <PortfolioFilter projects={projects} />
      </section>
    </>
  );
}
