import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { savePost } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { TagPicker } from "@/components/admin/TagPicker";
import { UploadField } from "@/components/admin/UploadField";

export default async function PostFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.blogPost.findUnique({
    where: { id: Number(id) },
    include: { tags: true },
  });
  const [categories, tags] = await Promise.all([
    prisma.blogCategory.findMany({ orderBy: { name: "asc" } }),
    prisma.blogTag.findMany({ orderBy: { name: "asc" } }),
  ]);
  const selected = new Set((item?.tags || []).map((row) => row.tagId));

  return (
    <form action={savePost} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit post" : "New post"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Title" name="title" defaultValue={item?.title} required />
      <Field label="Slug" name="slug" defaultValue={item?.slug} />
      <Field label="SEO title" name="seoTitle" defaultValue={item?.seoTitle || ""} />
      <Field label="Meta description" name="metaDescription" defaultValue={item?.metaDescription} textarea />
      <Field label="Excerpt" name="excerpt" defaultValue={item?.excerpt} textarea />
      <Field label="Content (Markdown)" name="content" defaultValue={item?.content} textarea />
      <UploadField label="Featured image" name="featuredImage" defaultValue={item?.featuredImage} required />
      <label className="grid gap-1 text-sm">
        Category
        <select name="categoryId" defaultValue={item?.categoryId || categories[0]?.id} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </label>
      <TagPicker tags={tags} selected={[...selected]} />
      <Field label="Reading time" name="readingTime" type="number" defaultValue={item?.readingTime ?? 5} />
      <label className="text-sm"><input type="checkbox" name="published" defaultChecked={item?.published} /> Published</label>
      <label className="text-sm"><input type="checkbox" name="featured" defaultChecked={item?.featured} /> Featured</label>
      <label className="text-sm"><input type="checkbox" name="popular" defaultChecked={item?.popular} /> Popular</label>
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
