import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveService } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { UploadField } from "@/components/admin/UploadField";
import { parseJson } from "@/lib/utils";

export default async function ServiceFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.service.findUnique({ where: { id: Number(id) } });
  const lines = (value) => parseJson(value, []).join("\n");

  return (
    <form action={saveService} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit service" : "New service"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="Slug" name="slug" defaultValue={item?.slug} />
      <Field label="Number" name="number" defaultValue={item?.number} />
      <Field label="Category" name="category" defaultValue={item?.category} />
      <Field label="Icon" name="icon" defaultValue={item?.icon} />
      <UploadField label="Image" name="image" defaultValue={item?.image || ""} />
      <Field label="Status" name="status" defaultValue={item?.status} />
      <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      <Field label="Short description" name="shortDesc" defaultValue={item?.shortDesc} textarea />
      <Field label="Description" name="description" defaultValue={item?.description} textarea />
      <Field label="What we build" name="whatWeBuild" defaultValue={item?.whatWeBuild} textarea />
      <Field label="Approach" name="approach" defaultValue={item?.approach} textarea />
      <Field label="Technologies (one per line)" name="technologies" defaultValue={lines(item?.technologies)} textarea />
      <Field label="Benefits" name="benefits" defaultValue={lines(item?.benefits)} textarea />
      <Field label="Features" name="features" defaultValue={lines(item?.features)} textarea />
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
