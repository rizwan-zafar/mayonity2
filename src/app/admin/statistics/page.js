import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/auth";
import { redirect } from "next/navigation";
import { saveStatistic } from "@/app/actions/admin";
import { Field } from "@/components/admin/AdminShell";

export default async function AdminStatisticsPage() {
  if (!(await requireAdmin())) redirect("/admin/login");
  const items = await prisma.statistic.findMany({ orderBy: { sortOrder: "asc" } });
  return (
    <div>
      <h1 className="display text-4xl">Statistics</h1>
      <p className="mt-2 text-sm text-muted">These numbers appear on the public site. They are not hard-coded.</p>
      <div className="mt-8 grid gap-4">
        {items.map((item) => (
          <form key={item.id} action={saveStatistic} className="glass grid gap-3 rounded-2xl p-5 md:grid-cols-4">
            <input type="hidden" name="id" value={item.id} />
            <Field label="Label" name="label" defaultValue={item.label} />
            <Field label="Value" name="value" type="number" defaultValue={item.value} />
            <Field label="Suffix" name="suffix" defaultValue={item.suffix} />
            <button className="self-end rounded-full bg-white px-4 py-2 text-sm text-black">Save</button>
          </form>
        ))}
      </div>
    </div>
  );
}
