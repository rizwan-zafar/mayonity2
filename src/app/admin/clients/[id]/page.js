import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveClient } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { UploadField } from "@/components/admin/UploadField";

export default async function ClientFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.client.findUnique({ where: { id: Number(id) } });
  return (
    <form action={saveClient} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit client" : "New client"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <UploadField label="Logo" name="logo" defaultValue={item?.logo} required />
      <Field label="Website" name="url" defaultValue={item?.url || ""} />
      <Field label="Status" name="status" defaultValue={item?.status} />
      <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
