import Link from "next/link";
import { parseJson } from "@/lib/utils";
import { Reveal, SectionHeading } from "@/components/ui/Section";

export function TeamPreview({ team }) {
  if (!team?.length) return null;
  return (
    <section className="px-5 py-24 md:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading
          eyebrow="People"
          title="Our world-class experienced team members"
          copy="Crafted with the latest design trends and engineered using modern approaches."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, index) => (
            <Reveal key={member.name} delay={index * 0.04}>
              <article className="group overflow-hidden rounded-[1.6rem] border border-white/10">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 transition group-hover:opacity-100" />
                  <div className="absolute inset-x-0 bottom-0 p-5">
                    <h3 className="display text-2xl">{member.name}</h3>
                    <p className="text-sm text-cyan">{member.position}</p>
                    <p className="mt-3 max-h-0 overflow-hidden text-sm text-white/80 transition-all duration-500 group-hover:max-h-24">
                      {member.bio}
                    </p>
                    <div className="mt-3 flex gap-3 text-xs text-muted opacity-0 transition group-hover:opacity-100">
                      {member.linkedin ? <a href={member.linkedin}>LinkedIn</a> : null}
                      {member.github ? <a href={member.github}>GitHub</a> : null}
                      {member.dribbble ? <a href={member.dribbble}>Dribbble</a> : null}
                    </div>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
        <div className="mt-8">
          <Link href="/team" className="text-sm text-accent">Meet the full team →</Link>
        </div>
      </div>
    </section>
  );
}

export function TeamGrid({ team }) {
  if (!team?.length) return null;
  return (
    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {team.map((member) => {
        const skills = parseJson(member.skills, []);
        return (
          <article key={member.id} className="glass rounded-[1.6rem] p-5">
            <img src={member.photo} alt={member.name} className="aspect-[4/5] w-full rounded-[1.2rem] object-cover" />
            <h2 className="display mt-5 text-3xl">{member.name}</h2>
            <p className="text-sm text-cyan">{member.position}</p>
            <p className="mt-3 text-sm text-muted">{member.bio}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted">
                  {skill}
                </span>
              ))}
            </div>
          </article>
        );
      })}
    </div>
  );
}
