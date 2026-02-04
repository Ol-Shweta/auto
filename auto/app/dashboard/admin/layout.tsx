import { requireRole } from "@/lib/auth/requireRole";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await requireRole(["admin", "manager"]);
  return <>{children}</>;
}
