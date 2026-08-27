import { getSession } from "@/lib/auth";
import { AdminShell } from "@/components/admin/AdminShell";

export const dynamic = "force-dynamic";

export const metadata = {
  robots: { index: false, follow: false },
  title: "Admin",
};

export default async function AdminLayout({ children }) {
  const session = await getSession();
  if (!session) return children;
  return <AdminShell user={session}>{children}</AdminShell>;
}
