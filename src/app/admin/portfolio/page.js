import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deletePortfolio } from "@/app/actions/admin";
import { AdminHeader } from "@/components/admin/AdminShell";

export default async function AdminPortfolioPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const items = await prisma.portfolio.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <AdminHeader title="Portfolio" href="/admin/portfolio/new" />
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
            <div>
              <p>{item.name}</p>
              <p className="text-xs text-muted">{item.category} · {item.status}</p>
            </div>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/portfolio/${item.id}`} className="text-accent">Edit</Link>
              <form action={deletePortfolio}>
                <input type="hidden" name="id" value={item.id} />
                <button className="text-red-300">Delete</button>
              </form>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
