import { PageHero } from "@/components/ui/Section";
import { PartnersCtaLinks } from "@/components/partners/PartnersCtaLinks";
import { ScopingSprintCta } from "@/components/partners/ScopingSprintCta";
import { JsonLd, breadcrumbJsonLd, faqPageJsonLd } from "@/lib/seo";
import { buildStaticPageMetadata } from "@/lib/seo-meta";

export const metadata = buildStaticPageMetadata({
  title: "Development partner for agencies in Singapore, Malaysia and Australia",
  description:
    "A remote development team in Lahore for small agencies and consultants. Websites and web apps built to your brief, from USD 1,000. Start with one small project.",
  canonical: "/partners",
});

const FAQS = [
  {
    question: "Can you work under our brand?",
    answer:
      "Yes. We can build to your brief and you present the work to your client.",
  },
  {
    question: "What do you cost?",
    answer: "USD 25 to 49 per hour, minimum project USD 1,000.",
  },
  {
    question: "Do you have an office in my country?",
    answer: "No. We are a remote team in Lahore.",
  },
];

const HOW_IT_WORKS = [
  "You send the brief or the design.",
  "We reply with a fixed scope and price.",
  "We build and you review in stages.",
  "You deliver to your client.",
];

export default function PartnersPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "For agencies", path: "/partners" },
        ])}
      />
      <JsonLd data={faqPageJsonLd(FAQS)} />
      <PageHero
        eyebrow="Partners"
        title="A development team for agencies and consultants"
        copy="Your client wants a site or a web app and your team has no spare developers. We build it to your design or your brief, and you stay the main contact for your client."
      />
      <section className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <p className="body-copy text-muted">
          Mayonity is a remote team based in Lahore, Pakistan. We started in 2022. There are six of us on
          the team. We have no local office in Singapore, Malaysia or Australia.
        </p>
      </section>
      <section className="mx-auto max-w-3xl space-y-10 px-5 pb-16 md:px-8">
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl text-white">How it works</h2>
          <ol className="mt-5 grid gap-3 text-muted">
            {HOW_IT_WORKS.map((step, index) => (
              <li key={step} className="flex gap-3 text-sm">
                <span className="font-mono text-cyan">{index + 1}.</span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </article>
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl text-white">Where we are</h2>
          <p className="mt-4 text-muted">
            We work from Lahore, Pakistan (UTC+5). That is 3 hours behind Singapore and Kuala Lumpur, and 5 to
            6 hours behind Sydney and Melbourne. We have no local office. Meetings fit the start of your day.
          </p>
        </article>
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl text-white">Start small</h2>
          <p className="mt-4 text-muted">
            Begin with one small project from USD 1,000. If it goes well, we can take more. If it does not, you
            have lost very little.
          </p>
        </article>
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl text-white">Typical work</h2>
          <p className="mt-4 text-muted">
            Websites, web apps, e-commerce builds, changes to existing sites.
          </p>
        </article>
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-3xl text-white">Start with a scoping sprint</h2>
          <p className="mt-4 text-muted">
            Not ready to commit to a build? Start with a scoping sprint. You send us the brief or the design. In about
            one week we send back a written scope, a fixed price and a timeline. The sprint is USD 400. If you go ahead
            with the build, we take the USD 400 off the project price. If you don&apos;t, you keep the scope document and
            can use it with anyone.
          </p>
          <ScopingSprintCta />
        </article>
      </section>
      <section className="mx-auto max-w-3xl px-5 pb-16 md:px-8">
        <PartnersCtaLinks />
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