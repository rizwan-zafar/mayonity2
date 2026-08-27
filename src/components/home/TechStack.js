import { SectionHeading } from "@/components/ui/Section";

export function TechStack({ technologies }) {
  if (!technologies?.length) return null;
  const groups = technologies.reduce((acc, item) => {
    acc[item.category] = acc[item.category] || [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Stack"
          title="Technologies we actually ship with."
          copy="A focused toolkit. Not a logo wall of things we once read about."
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(groups).map(([category, items]) => (
            <article key={category} className="glass rounded-[1.5rem] p-6">
              <h3 className="display text-2xl">{category}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {items.map((item) => (
                  <span key={item.id} className="rounded-full border border-white/10 px-3 py-1 text-sm text-muted">
                    {item.name}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
