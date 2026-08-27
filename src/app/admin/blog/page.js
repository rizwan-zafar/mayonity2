import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deletePost, saveCategory, saveTag } from "@/app/actions/admin";
import { AdminHeader } from "@/components/admin/AdminShell";

export default async function AdminBlogPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const [posts, categories, tags] = await Promise.all([
    prisma.blogPost.findMany({ orderBy: { createdAt: "desc" }, include: { category: true } }),
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ]);

  return (
    <div className="grid gap-10">
      <div>
        <AdminHeader title="Blog" href="/admin/blog/new" />
        <ul className="mt-6 grid gap-3">
          {posts.map((item) => (
            <li key={item.id} className="glass flex items-center justify-between rounded-2xl px-4 py-3">
              <div>
                <p>{item.title}</p>
                <p className="text-xs text-muted">{item.published ? "Published" : "Draft"} · {item.category?.name}</p>
              </div>
              <div className="flex gap-3 text-sm">
                <Link href={`/admin/blog/${item.id}`} className="text-accent">Edit</Link>
                <form action={deletePost}>
                  <input type="hidden" name="id" value={item.id} />
                  <button className="text-red-300">Delete</button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <form action={saveCategory} className="glass grid gap-3 rounded-2xl p-5">
          <h2 className="display text-2xl">New category</h2>
          <input name="name" required placeholder="Name" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" />
          <button className="rounded-full bg-white px-4 py-2 text-sm text-black">Add</button>
          <p className="text-xs text-muted">{categories.map((c) => c.name).join(" · ")}</p>
        </form>
        <form action={saveTag} className="glass grid gap-3 rounded-2xl p-5">
          <h2 className="display text-2xl">New tag</h2>
          <input name="name" required placeholder="Name" className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm" />
          <button className="rounded-full bg-white px-4 py-2 text-sm text-black">Add</button>
          <p className="text-xs text-muted">{tags.map((t) => t.name).join(" · ")}</p>
        </form>
      </div>
    </div>
  );
}
