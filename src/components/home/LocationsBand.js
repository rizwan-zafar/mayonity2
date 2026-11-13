import Link from "next/link";

export function LocationsBand({ locations }) {
  if (!locations?.length) return null;

  return (
    <section className="px-5 py-16 md:px-8">
      <div className="mx-auto max-w-7xl">
        <h2 className="display text-3xl md:text-4xl">Where we work</h2>
        <ul className="mt-6 flex flex-wrap gap-3">
          {locations.map((location) => (
            <li key={location.slug}>
              <Link
                href={`/${location.slug}`}
                className="inline-flex rounded-full border border-white/10 px-5 py-2 text-sm text-muted transition hover:border-white/25 hover:text-white"
              >
                {location.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
