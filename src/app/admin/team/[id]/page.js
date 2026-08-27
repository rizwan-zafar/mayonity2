import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveTeam } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { UploadField } from "@/components/admin/UploadField";
import { parseJson } from "@/lib/utils";

export default async function TeamFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.teamMember.findUnique({ where: { id: Number(id) } });
  return (
    <form action={saveTeam} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit member" : "New member"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="Position" name="position" defaultValue={item?.position} />
      <UploadField label="Photo" name="photo" defaultValue={item?.photo} required />
      <Field label="Bio" name="bio" defaultValue={item?.bio} textarea />
      <Field label="Skills" name="skills" defaultValue={parseJson(item?.skills, []).join("\n")} textarea />
      <Field label="LinkedIn" name="linkedin" defaultValue={item?.linkedin || ""} />
      <Field label="X" name="twitter" defaultValue={item?.twitter || ""} />
      <Field label="GitHub" name="github" defaultValue={item?.github || ""} />
      <Field label="Dribbble" name="dribbble" defaultValue={item?.dribbble || ""} />
      <Field label="Status" name="status" defaultValue={item?.status} />
      <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
