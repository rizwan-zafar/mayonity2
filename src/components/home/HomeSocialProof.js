import { StatsBand } from "@/components/home/StatsBand";

/** Headline stats directly under the hero. */
export function HomeSocialProof({ stats }) {
  return (
    <div className="border-b border-white/10">
      <StatsBand stats={stats} compact />
    </div>
  );
}