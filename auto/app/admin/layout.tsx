// app/admin/layout.tsx
import Link from "next/link";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex">
      <aside className="w-64 border-r p-4">
        <h2 className="font-semibold text-lg mb-4">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin">Dashboard</Link>
          <br />
          <Link href="/admin/users">Users</Link>
          <br />
          <Link href="/admin/roles">Roles</Link>
        </nav>
      </aside>

      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
