// app/admin/users/page.tsx
import Link from "next/link";

export default async function UsersPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/users`, {
    cache: "no-store",
  });

  const users = await res.json();

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-xl font-semibold">Users</h1>
        <Link href="/admin/users/create-user">Create User</Link>
      </div>

      <table className="w-full border">
        <thead>
          <tr className="border-b">
            <th>Email</th>
            <th>Role</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {users.map((u: any) => (
            <tr key={u.id} className="border-b">
              <td>{u.email}</td>
              <td>{u.role || "—"}</td>
              <td>
                <Link href={`/admin/users/edit?userId=${u.id}`}>
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
