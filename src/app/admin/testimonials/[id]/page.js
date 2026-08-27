import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveTestimonial } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { UploadField } from "@/components/admin/UploadField";

export default async function TestimonialFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.testimonial.findUnique({ where: { id: Number(id) } });
  return (
    <form action={saveTestimonial} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit testimonial" : "New testimonial"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="Position" name="position" defaultValue={item?.position} />
      <Field label="Company" name="company" defaultValue={item?.company} />
      <UploadField label="Photo" name="photo" defaultValue={item?.photo} required />
      <Field label="Quote" name="quote" defaultValue={item?.quote} textarea />
      <Field label="Rating" name="rating" type="number" defaultValue={item?.rating ?? 5} />
      <Field label="Status" name="status" defaultValue={item?.status} />
      <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
