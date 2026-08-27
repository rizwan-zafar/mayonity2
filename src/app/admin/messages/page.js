import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { updateMessageStatus } from "@/app/actions/admin";

export default async function AdminMessagesPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const items = await prisma.contactMessage.findMany({ orderBy: { createdAt: "desc" } });
  return (
    <div>
      <h1 className="display text-4xl">Contact messages</h1>
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <article key={item.id} className="glass rounded-2xl p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <p className="text-lg">{item.name}</p>
                <p className="text-sm text-muted">{item.email} · {item.phone || "No phone"} · {item.company || "No company"}</p>
                <p className="text-xs text-cyan">{item.service || "General"} · {item.budget || "Budget n/a"} · {item.status}</p>
              </div>
              <form action={updateMessageStatus} className="flex gap-2">
                <input type="hidden" name="id" value={item.id} />
                <select name="status" defaultValue={item.status} className="rounded-xl border border-white/10 bg-white/5 px-2 py-1 text-sm">
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="contacted">Contacted</option>
                  <option value="archived">Archived</option>
                </select>
                <button className="rounded-full bg-white px-3 py-1 text-sm text-black">Update</button>
              </form>
            </div>
            <p className="mt-4 text-sm text-muted">{item.message}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
