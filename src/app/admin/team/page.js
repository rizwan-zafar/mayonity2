import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deleteTeam } from "@/app/actions/admin";
import { AdminHeader } from "@/components/admin/AdminShell";

export default async function AdminTeamPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const items = await prisma.teamMember.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <AdminHeader title="Team" href="/admin/team/new" />
      <ul className="mt-6 grid gap-3">
        {items.map((item) => (
          <li key={item.id} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
            <p>{item.name} · {item.position}</p>
            <div className="flex gap-3 text-sm">
              <Link href={`/admin/team/${item.id}`} className="text-accent">Edit</Link>
              <form action={deleteTeam}>
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
