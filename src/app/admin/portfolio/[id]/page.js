import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { savePortfolio } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { UploadField, GalleryUpload } from "@/components/admin/UploadField";
import { parseJson } from "@/lib/utils";

export default async function PortfolioFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.portfolio.findUnique({
    where: { id: Number(id) },
    include: { images: { orderBy: { sortOrder: "asc" } } },
  });
  const services = await prisma.service.findMany({ orderBy: { sortOrder: "asc" } });
  const lines = (value) => parseJson(value, []).join("\n");

  return (
    <form action={savePortfolio} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit project" : "New project"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="Slug" name="slug" defaultValue={item?.slug} />
      <Field label="Client" name="client" defaultValue={item?.client} />
      <Field label="Industry" name="industry" defaultValue={item?.industry} />
      <label className="grid gap-1 text-sm">
        Category
        <select name="category" defaultValue={item?.category || "Web"} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          {["Web", "Mobile", "E-Commerce", "UI/UX", "WordPress", "Other"].map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </label>
      <label className="grid gap-1 text-sm">
        Related service
        <select name="serviceId" defaultValue={item?.serviceId || ""} className="rounded-xl border border-white/10 bg-white/5 px-3 py-2">
          <option value="">None</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>{service.name}</option>
          ))}
        </select>
      </label>
      <UploadField label="Cover image" name="image" defaultValue={item?.image} required />
      <GalleryUpload name="gallery" defaultItems={(item?.images || []).map((image) => image.url)} />
      <Field label="Project URL" name="projectUrl" defaultValue={item?.projectUrl || ""} />
      <Field label="Status" name="status" defaultValue={item?.status} />
      <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      <label className="text-sm"><input type="checkbox" name="featured" defaultChecked={item?.featured} /> Featured</label>
      <Field label="Short description" name="shortDesc" defaultValue={item?.shortDesc} textarea />
      <Field label="Overview" name="overview" defaultValue={item?.overview} textarea />
      <Field label="Challenge" name="challenge" defaultValue={item?.challenge} textarea />
      <Field label="Solution" name="solution" defaultValue={item?.solution} textarea />
      <Field label="Design" name="design" defaultValue={item?.design} textarea />
      <Field label="Technology" name="technology" defaultValue={item?.technology} textarea />
      <Field label="Results" name="results" defaultValue={item?.results} textarea />
      <Field label="Features" name="features" defaultValue={lines(item?.features)} textarea />
      <Field label="Technologies" name="technologies" defaultValue={lines(item?.technologies)} textarea />
      <Field label="Services" name="services" defaultValue={lines(item?.services)} textarea />
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
