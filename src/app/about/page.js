import { PageHero, CtaBand } from "@/components/ui/Section";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "About Mayonity",
  description:
    "Mayonity is a software development and digital solutions company. Design, engineering, AI and business — building products for what comes next.",
  alternates: { canonical: "/about" },
};

const timeline = [
  {
    year: "2022",
    title: "Founded",
    copy: "A small design and development team starts in Lahore, building websites and web apps for startups and small businesses.",
  },
  {
    year: "Today",
    title: "Web, mobile and online stores",
    copy: "Websites, web apps, mobile apps and online stores built by one remote team, for clients in Singapore, Malaysia and Australia.",
  },
  {
    year: "",
    title: "Practical AI",
    copy: "We add useful AI features, such as chat assistants and workflow automation, to products where they fit.",
  },
];

const reasons = [
  "Experienced team",
  "Modern technology",
  "User-first design",
  "Scalable engineering",
  "Business-focused solutions",
  "Long-term partnership",
];

export default function AboutPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "About", path: "/about" }])} />
      <PageHero
        eyebrow="About"
        title="Who we are"
        copy="Mayonity is a software development and digital solutions company. We help businesses transform ideas into modern digital products — websites, applications, commerce and the strategy that decides what should exist."
      />
      <section className="mx-auto grid max-w-7xl gap-10 px-5 pb-20 md:grid-cols-2 md:px-8">
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-4xl">What we believe</h2>
          <p className="mt-4 text-muted">Technology should simplify complexity and create meaningful experiences. If a product needs a manual to feel intelligent, it is not finished.</p>
        </article>
        <article className="glass rounded-[1.6rem] p-8">
          <h2 className="display text-4xl">Our mission</h2>
          <p className="mt-4 text-muted">Build powerful digital products that help businesses grow — with design, engineering and commercial sense in the same room.</p>
        </article>
        <article className="glass rounded-[1.6rem] p-8 md:col-span-2">
          <h2 className="display text-4xl">Our vision</h2>
          <p className="mt-4 max-w-3xl text-muted">Become a technology partner for companies building the future. Not a vendor. A studio that stays after launch.</p>
        </article>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <h2 className="display section-title">Why Mayonity</h2>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {reasons.map((item, i) => (
            <div key={item} className="rounded-2xl border border-white/10 px-5 py-6">
              <p className="font-mono text-xs text-cyan">0{i + 1}</p>
              <p className="display mt-2 text-2xl">{item}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-10 md:px-8">
        <h2 className="display section-title">A short history of looking forward</h2>
        <div className="mt-12 grid gap-6">
          {timeline.map((item) => (
            <article key={item.year} className="grid gap-3 border-b border-white/10 pb-6 md:grid-cols-[140px_1fr]">
              <p className="font-mono text-cyan">{item.year}</p>
              <div>
                <h3 className="display text-3xl">{item.title}</h3>
                <p className="mt-2 text-muted">{item.copy}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <CtaBand title="Let's build something extraordinary." />
    </>
  );
}
