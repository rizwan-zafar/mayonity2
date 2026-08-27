"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

const filters = ["All", "Web", "Mobile", "E-Commerce", "UI/UX", "WordPress", "Other"];

export function PortfolioFilter({ projects }) {
  const [filter, setFilter] = useState("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((item) => item.category === filter)),
    [filter, projects]
  );

  return (
    <div>
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Portfolio filters">
        {filters.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-2 text-sm ${
              filter === item ? "bg-white text-black" : "border border-white/15 text-muted"
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="mt-10 grid gap-5 md:grid-cols-2">
        {visible.map((project) => (
          <Link
            key={project.slug}
            href={`/portfolio/${project.slug}`}
            className="group overflow-hidden rounded-[1.6rem] border border-white/10"
          >
            <div className="aspect-[16/10] overflow-hidden">
              <img src={project.image} alt={project.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
            </div>
            <div className="p-5">
              <p className="font-mono text-xs text-cyan">{project.category} · {project.industry}</p>
              <h2 className="display mt-2 text-3xl">{project.name}</h2>
              <p className="mt-2 text-sm text-muted">{project.shortDesc}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
