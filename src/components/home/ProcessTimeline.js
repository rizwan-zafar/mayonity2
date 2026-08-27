import { Reveal, SectionHeading } from "@/components/ui/Section";

export function ProcessTimeline({ steps }) {
  if (!steps?.length) return null;
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="Method"
          title="A product that keeps evolving."
          copy="Seven stages, one continuous line — from the first conversation to the version that comes after launch."
        />
        <div className="relative mt-14">
          <div className="absolute left-5 top-0 hidden h-full w-px bg-gradient-to-b from-accent via-violet to-cyan md:left-1/2 md:block" />
          <div className="grid gap-6">
            {steps.map((step, index) => (
              <Reveal key={step.number} delay={index * 0.04}>
                <article className={`grid items-center gap-4 md:grid-cols-2 ${index % 2 ? "" : ""}`}>
                  <div className={index % 2 ? "md:order-2 md:pl-12" : "md:pr-12 md:text-right"}>
                    <p className="font-mono text-xs text-cyan">{step.number}</p>
                    <h3 className="display text-4xl">{step.title}</h3>
                    <p className="mt-2 text-sm text-muted">{step.description}</p>
                  </div>
                  <div className="hidden md:block" />
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
