import { PageHero } from "@/components/ui/Section";
import { TestimonialsStage } from "@/components/home/TestimonialsStage";
import { getActiveTestimonials } from "@/lib/data";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Testimonials",
  description: "Client feedback on Mayonity — product, design and engineering partnerships.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const testimonials = await getActiveTestimonials();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Testimonials", path: "/testimonials" }])} />
      <PageHero eyebrow="Signal" title="What partners say after the launch lights fade." copy="A few notes from teams we have designed and engineered with." />
      <TestimonialsStage testimonials={testimonials} />
    </>
  );
}
