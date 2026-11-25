import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { deleteSocial, deleteTechnology, saveSettings, saveSocial, saveTechnology } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";
import { AdminSubmitButton } from "@/components/admin/AdminSubmitButton";
import { AdminDeleteButton } from "@/components/admin/AdminDeleteButton";
import { AdminFormPendingOverlay } from "@/components/admin/AdminFormPendingOverlay";
import { getSettings } from "@/lib/data";

export default async function AdminSettingsPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const [settings, socials, technologies] = await Promise.all([
    getSettings(),
    prisma.socialLink.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.technology.findMany({ orderBy: { sortOrder: "asc" } }),
  ]);

  return (
    <div className="grid gap-12">
      <form action={saveSettings} className="relative grid max-w-3xl gap-4">
        <h1 className="display text-4xl">Website settings</h1>
        <Field label="Site name" name="siteName" defaultValue={settings.siteName} />
        <Field label="Tagline" name="tagline" defaultValue={settings.tagline} />
        <Field label="Description" name="description" defaultValue={settings.description} textarea />
        <Field label="Email" name="email" defaultValue={settings.email} />
        <Field label="Phone" name="phone" defaultValue={settings.phone} />
        <Field label="Address" name="address" defaultValue={settings.address} />
        <Field label="Business hours" name="businessHours" defaultValue={settings.businessHours} />
        <Field label="Default SEO title" name="seoDefaultTitle" defaultValue={settings.seoDefaultTitle} />
        <Field label="Default SEO description" name="seoDefaultDescription" defaultValue={settings.seoDefaultDescription} textarea />
        <Field label="Careers note" name="careersNote" defaultValue={settings.careersNote} textarea />
        <AdminSubmitButton pendingLabel="Saving…">Save settings</AdminSubmitButton>
        <AdminFormPendingOverlay />
      </form>

      <section>
        <h2 className="display text-3xl">Social links</h2>
        <ul className="mt-4 grid gap-3">
          {socials.map((item) => (
            <li key={item.id} className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm">
              <span>{item.platform} · {item.url}</span>
              <form action={deleteSocial}>
                <input type="hidden" name="id" value={item.id} />
                <AdminDeleteButton />
              </form>
            </li>
          ))}
        </ul>
        <form action={saveSocial} className="mt-4 grid gap-3 md:grid-cols-3">
          <Field label="Platform" name="platform" />
          <Field label="URL" name="url" />
          <Field label="Order" name="sortOrder" type="number" defaultValue={0} />
          <AdminSubmitButton
            pendingLabel="Adding…"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            Add social
          </AdminSubmitButton>
        </form>
      </section>

      <section>
        <h2 className="display text-3xl">Technologies</h2>
        <ul className="mt-4 grid gap-3">
          {technologies.map((item) => (
            <li key={item.id} className="glass flex items-center justify-between rounded-2xl px-4 py-3 text-sm">
              <span>{item.category} · {item.name}</span>
              <form action={deleteTechnology}>
                <input type="hidden" name="id" value={item.id} />
                <AdminDeleteButton />
              </form>
            </li>
          ))}
        </ul>
        <form action={saveTechnology} className="mt-4 grid gap-3 md:grid-cols-3">
          <Field label="Name" name="name" />
          <Field label="Category" name="category" defaultValue="Frontend" />
          <Field label="Order" name="sortOrder" type="number" defaultValue={0} />
          <AdminSubmitButton
            pendingLabel="Adding…"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-4 py-2 text-sm text-black transition disabled:cursor-not-allowed disabled:opacity-60"
          >
            Add technology
          </AdminSubmitButton>
        </form>
      </section>
    </div>
  );
}
