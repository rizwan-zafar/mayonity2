import { WebsiteCostCalculator } from "@/components/calculator/WebsiteCostCalculator";
import { PageHero } from "@/components/ui/Section";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { buildStaticPageMetadata } from "@/lib/seo-meta";

export const metadata = buildStaticPageMetadata({
  title: "Website Cost Calculator for Singapore, Malaysia and Australia (2026)",
  description:
    "Estimate website costs for Singapore, Malaysia and Australia. Typical ranges by site type, pages and features. Not a formal quote.",
  canonical: "/website-cost-calculator",
});

const FAQS = [
  {
    question: "How accurate is this website cost calculator?",
    answer:
      "It shows typical ranges we see on marketing sites, business websites, stores and custom applications in Singapore, Malaysia and Australia. It is a planning guide, not a fixed quote.",
  },
  {
    question: "What makes a website project cost more?",
    answer:
      "Custom design, payments, logins, many pages, integrations and short timelines usually increase cost. The calculator adjusts the range when you select those options.",
  },
  {
    question: "Do you work with clients outside Singapore, Malaysia and Australia?",
    answer:
      "Yes. Choose Other to see USD ranges. We work with teams globally and can discuss delivery, time zones and support on the contact form.",
  },
  {
    question: "What is the minimum project budget?",
    answer:
      "Our smallest engagements generally start around USD 1,000 for very focused scopes. Larger sites, stores and apps sit in higher bands shown in the calculator.",
  },
];

export default function WebsiteCostCalculatorPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Website cost calculator", path: "/website-cost-calculator" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <PageHero
        eyebrow="Calculator"
        title="Website cost calculator"
        copy="Typical budgets for sites and apps in Singapore, Malaysia and Australia — in about a minute."
      />
      <section className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <p className="body-copy text-muted">
          Planning a new website or web application starts with a realistic budget. This calculator uses
          published industry guides and Mayonity&apos;s experience across Singapore, Malaysia and Australia to
          suggest a typical range in local currency. Choose your country, the kind of site you need, how many
          pages you expect, any extra features such as payments or logins, and how soon you want to launch.
          You will see a low-to-high range — never a single fixed price — plus a short note on what is most
          likely to push the cost up. Use it to compare options before you request a formal quote.
        </p>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
        <WebsiteCostCalculator />
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-24 md:px-8">
        <h2 className="display text-2xl text-white">Frequently asked questions</h2>
        <div className="mt-8 grid gap-6">
          {FAQS.map((item) => (
            <article key={item.question} className="rounded-[1.4rem] border border-white/10 p-5">
              <h3 className="text-lg text-white">{item.question}</h3>
              <p className="mt-2 text-sm text-muted">{item.answer}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}