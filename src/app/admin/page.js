import Link from "next/link";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { getAdminCounts, getStatistics } from "@/lib/data";
import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const session = await requireAdmin();
  if (!session) redirect("/admin/login");
  const [counts, stats, latest] = await Promise.all([
    getAdminCounts(),
    getStatistics(),
    prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const cards = [
    ["Projects", counts.projects, "/admin/portfolio"],
    ["Clients", counts.clients, "/admin/clients"],
    ["Team", counts.team, "/admin/team"],
    ["Testimonials", counts.testimonials, "/admin/testimonials"],
    ["Posts", counts.posts, "/admin/blog"],
    ["Inquiries", counts.messages, "/admin/messages"],
  ];

  return (
    <div>
      <h1 className="display text-4xl">Dashboard</h1>
      <p className="mt-2 text-sm text-muted">{counts.unread} unread inquiries</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(([label, value, href]) => (
          <Link key={label} href={href} className="glass rounded-2xl p-5">
            <p className="text-sm text-muted">{label}</p>
            <p className="display mt-2 text-4xl">{value}</p>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="display text-2xl">Live statistics</h2>
          <ul className="mt-4 grid gap-2 text-sm">
            {stats.map((item) => (
              <li key={item.key} className="flex justify-between">
                <span className="text-muted">{item.label}</span>
                <span>
                  {item.value}
                  {item.suffix}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="glass rounded-2xl p-5">
          <h2 className="display text-2xl">Latest messages</h2>
          <ul className="mt-4 grid gap-3 text-sm">
            {latest.map((item) => (
              <li key={item.id} className="border-b border-white/10 pb-2">
                <p>{item.name} · {item.email}</p>
                <p className="text-muted">{item.service || "General"} · {item.status}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
