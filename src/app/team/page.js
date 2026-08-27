import { PageHero } from "@/components/ui/Section";
import { TeamGrid } from "@/components/home/TeamPreview";
import { getActiveTeam } from "@/lib/data";
import { JsonLd, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = {
  title: "Team",
  description: "Meet the Mayonity team — designers, engineers and strategists building what comes next.",
  alternates: { canonical: "/team" },
};

export default async function TeamPage() {
  const team = await getActiveTeam();
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Team", path: "/team" }])} />
      <PageHero
        eyebrow="Team"
        title="Our world-class experienced team members"
        copy="Crafted with the latest design trends and engineered using modern approaches."
      />
      <section className="mx-auto max-w-7xl px-5 pb-24 md:px-8">
        <TeamGrid team={team} />
      </section>
    </>
  );
}
