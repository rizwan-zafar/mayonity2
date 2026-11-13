import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveLocation } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { ServiceFaqEditor } from "@/components/admin/ServiceFaqEditor";
import { parseJson } from "@/lib/utils";

function parseLocationFaqs(value) {
  const items = parseJson(value, []);
  if (!Array.isArray(items)) return [];
  return [...items]
    .filter((item) => item && typeof item === "object")
    .sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0));
}

export default async function LocationFormPage({ params }) {
  if (!(await requireAdmin())) redirect("/admin/login");
  const { id } = await params;
  const item = id === "new" ? null : await prisma.location.findUnique({ where: { id: Number(id) } });
  const lines = (value) => parseJson(value, []).join("\n");

  return (
    <form action={saveLocation} className="grid max-w-3xl gap-4">
      <h1 className="display text-4xl">{item ? "Edit location" : "New location"}</h1>
      {item ? <input type="hidden" name="id" value={item.id} /> : null}
      <Field label="Name" name="name" defaultValue={item?.name} required />
      <Field label="SEO title" name="seoTitle" defaultValue={item?.seoTitle || ""} />
      <Field label="Meta description" name="metaDescription" defaultValue={item?.metaDescription || ""} textarea />
      <Field label="Slug" name="slug" defaultValue={item?.slug} />
      <Field label="Status" name="status" defaultValue={item?.status ?? "draft"} />
      <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      <Field label="Eyebrow" name="eyebrow" defaultValue={item?.eyebrow || ""} />
      <Field label="H1" name="h1" defaultValue={item?.h1} required />
      <Field label="Intro" name="intro" defaultValue={item?.intro} textarea required />
      <Field label="Why title" name="whyTitle" defaultValue={item?.whyTitle || ""} />
      <Field label="Why body" name="whyBody" defaultValue={item?.whyBody || ""} textarea />
      <Field label="Process title" name="processTitle" defaultValue={item?.processTitle || ""} />
      <Field label="Process body" name="processBody" defaultValue={item?.processBody || ""} textarea />
      <Field
        label="Industries (one per line)"
        name="industries"
        defaultValue={lines(item?.industries)}
        textarea
      />
      <Field label="Cities (one per line)" name="cities" defaultValue={lines(item?.cities)} textarea />
      <ServiceFaqEditor defaultItems={parseLocationFaqs(item?.faqs)} />
      <button className="rounded-full bg-white px-5 py-3 text-sm text-black">Save</button>
    </form>
  );
}
