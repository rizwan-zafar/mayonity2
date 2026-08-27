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
import { CtaBand } from "@/components/ui/Section";
import { getHomeData } from "@/lib/data";
import { siteUrl } from "@/lib/utils";

export const metadata = {
  title: "Mayonity — We Build What Comes Next",
  description:
    "Mayonity is a software development company creating intelligent digital experiences, powerful web applications, mobile products and e-commerce ecosystems.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Mayonity — We Build What Comes Next",
    url: siteUrl("/"),
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
      <ProcessTimeline steps={data.process} />
      <TechStack technologies={data.technologies} />
      <CtaBand title="Your next big idea starts here." />
    </>
  );
}
