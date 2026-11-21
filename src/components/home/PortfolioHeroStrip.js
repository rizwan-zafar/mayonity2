import Link from "next/link";

export function PortfolioHeroStrip({ projects }) {
  const items = (projects || []).slice(0, 3);
  if (!items.length) return null;

  return (
    <section className="border-b border-white/10 bg-[#05060a]/80 px-5 py-8 md:px-8 md:py-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-cyan">Recent work</p>
          <Link href="/portfolio" className="text-sm text-accent hover:underline">
            View full portfolio →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-3">
          {items.map((project) => (
            <Link
              key={project.slug}
              href={`/portfolio/${project.slug}`}
              className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 p-4">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-cyan">{project.category}</p>
                  <p className="display mt-1 text-lg text-white">{project.name}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}