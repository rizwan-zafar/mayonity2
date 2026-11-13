import { Hero } from "@/components/home/Hero";
import { Intro } from "@/components/home/Intro";
import { ServicesShowcase } from "@/components/home/ServicesShowcase";
import { StatsBand } from "@/components/home/StatsBand";
import { PortfolioPreview } from "@/components/home/PortfolioPreview";
import { TestimonialsStage } from "@/components/home/TestimonialsStage";
import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { TeamPreview } from "@/components/home/TeamPreview";
import { ProcessTimeline } from "@/components/home/ProcessTimeline";
import { TechStack } from "@/components/home/TechStack";
import { LocationsBand } from "@/components/home/LocationsBand";
import { CtaBand } from "@/components/ui/Section";
import { getHomeData } from "@/lib/data";
import { siteUrl } from "@/lib/utils";
import { buildOpenGraphImages } from "@/lib/seo-meta";

const HOME_META = {
  title: "Custom Software & Digital Product Development | Mayonity",
  description:
    "Mayonity builds custom web applications, ecommerce platforms, mobile apps, and WordPress solutions for businesses that need software built around their workflows.",
};

const HOME_PROCESS = [
  {
    number: "01",
    title: "Understand",
    description: "Understand the business problem, users and requirements.",
  },
  {
    number: "02",
    title: "Plan",
    description: "Define the product structure, technical approach and priorities.",
  },
  {
    number: "03",
    title: "Build",
    description: "Design and develop the solution with iterative feedback.",
  },
  {
    number: "04",
    title: "Launch & Improve",
    description: "Launch the product and continue improving it as requirements evolve.",
  },
];

const homeImages = buildOpenGraphImages();

export const metadata = {
  title: { absolute: HOME_META.title },
  description: HOME_META.description,
  alternates: { canonical: "/" },
  openGraph: {
    title: HOME_META.title,
    description: HOME_META.description,
    url: siteUrl("/"),
    images: homeImages,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_META.title,
    description: HOME_META.description,
    images: [homeImages[0].url],
  },
};

export default async function HomePage() {
  const data = await getHomeData();

  return (
    <>
      <Hero />
      <Intro />
      <ServicesShowcase services={data.services} />
      <StatsBand stats={data.stats} />
      <PortfolioPreview projects={data.portfolio} />
      <TestimonialsStage testimonials={data.testimonials} />
      <ClientsMarquee clients={data.clients} />
      <TeamPreview team={data.team} />
      <ProcessTimeline steps={HOME_PROCESS} />
      <TechStack technologies={data.technologies} />
      <LocationsBand locations={data.locations} />
      <CtaBand
        title="Have a Business Problem We Can Help Solve?"
        copy="Tell us what you're building, what isn't working today, or what you want to improve. We'll discuss the right approach for your project."
        ctaLabel="Discuss Your Project"
      />
    </>
  );
}
