export function ClientsMarquee({ clients }) {
  if (!clients?.length) return null;
  const row = [...clients, ...clients];
  return (
    <section className="py-16">
      <p className="mb-8 text-center font-mono text-xs uppercase tracking-[0.28em] text-muted">
        Trusted by businesses building the future.
      </p>
      <div className="overflow-hidden border-y border-white/10 py-8">
        <div className="marquee px-8">
          {row.map((client, index) => (
            <img
              key={`${client.name}-${index}`}
              src={client.logo}
              alt={client.name}
              className="h-8 w-auto opacity-60"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
