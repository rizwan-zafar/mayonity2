export function ClientsMarquee({ clients, compact = false }) {
  if (!clients?.length) return null;
  const row = [...clients, ...clients];
  return (
    <section className={compact ? "pb-8 pt-2" : "py-16"}>
      <p className={`${compact ? "mb-4" : "mb-8"} text-center font-mono text-xs uppercase tracking-[0.28em] text-muted`}>
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
