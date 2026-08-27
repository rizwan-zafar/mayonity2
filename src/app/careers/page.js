import { PageHero, CtaBand } from "@/components/ui/Section";
import { getSettings } from "@/lib/data";

export const metadata = {
  title: "Careers",
  description: "Join Mayonity — designers, engineers and strategists building what comes next.",
  alternates: { canonical: "/careers" },
};

export default async function CareersPage() {
  const settings = await getSettings();
  return (
    <>
      <PageHero
        eyebrow="Careers"
        title="Build with us."
        copy={settings.careersNote || "We hire people who care about craft, systems and the long life of a product."}
      />
      <section className="mx-auto max-w-3xl px-5 pb-8 md:px-8">
        <p className="body-copy">
          There is no noisy jobs board here. If you design, engineer or produce digital products at a high level, write to us with work you are proud of.
        </p>
      </section>
      <CtaBand title="Send a note." copy="Use the contact form and tell us what you want to build next." />
    </>
  );
}
