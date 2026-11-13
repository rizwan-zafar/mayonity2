import { AdminHeader } from "@/components/admin/AdminShell";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deleteLocation } from "@/app/actions/admin";
import Link from "next/link";

export default async function AdminLocationsPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const items = await prisma.location.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <AdminHeader title="Locations" href="/admin/locations/new" />
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="glass flex items-center justify-between gap-4 rounded-2xl px-4 py-3">
            <div>
              <p className="font-medium">{item.name}</p>
              <p className="text-xs text-muted">
                {item.status} · {item.slug}
              </p>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Link href={`/admin/locations/${item.id}`} className="text-accent">
                Edit
              </Link>
              <form action={deleteLocation}>
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
