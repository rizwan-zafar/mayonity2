import { ClientsMarquee } from "@/components/home/ClientsMarquee";
import { StatsBand } from "@/components/home/StatsBand";

/** Client logos and headline stats directly under the hero. */
export function HomeSocialProof({ stats, clients }) {
  return (
    <div className="border-b border-white/10">
      <StatsBand stats={stats} compact />
      <ClientsMarquee clients={clients} compact />
    </div>
  );
}