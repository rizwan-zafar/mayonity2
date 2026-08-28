import { HeroCanvas } from "@/components/home/HeroCanvas";
import { GhostButton, MagneticButton } from "@/components/ui/MagneticButton";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden pt-[var(--header-h)]">
      <div className="absolute inset-0">
        <HeroCanvas />
        <div className="absolute inset-0 bg-gradient-to-b from-[#05060a]/20 via-[#05060a]/55 to-[#05060a]" />
      </div>
      <div className="relative mx-auto flex min-h-[calc(100svh-var(--header-h))] max-w-7xl flex-col justify-end px-5 pb-16 md:px-8 md:pb-20">
        <p className="font-mono text-xs uppercase tracking-[0.32em] text-cyan">Future-ready digital products</p>
        <h1 className="display hero-title mt-6 max-w-5xl text-white">
          we Build
          <br />
          What Comes Next.
        </h1>
        <p className="mt-7 max-w-xl body-copy">
          Mayonity is a software development company creating intelligent digital experiences, powerful web applications, mobile products and e-commerce ecosystems for businesses ready for the future.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <MagneticButton href="/contact">Start a Project</MagneticButton>
          <GhostButton href="/portfolio">Explore Our Work</GhostButton>
        </div>
      </div>
    </section>
  );
}
