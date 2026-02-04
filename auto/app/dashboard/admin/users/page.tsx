import Link from "next/link";
import { getUsers } from "@/lib/admin/getUsers";
import { requireRole } from "@/lib/auth/requireRole";

function roleBadge(role: string | null) {
  switch (role) {
    case "admin":
      return "bg-red-100 text-red-700";
    case "manager":
      return "bg-blue-100 text-blue-700";
    case "user":
      return "bg-gray-100 text-gray-700";
    default:
      return "bg-gray-100 text-gray-600";
  }
}

export default async function UsersPage() {
  await requireRole(["admin"]);

  const users = await getUsers();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">
            User Management
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            Manage users and their access roles
          </p>
        </div>

        <Link
          href="/dashboard/admin/users/create-user"
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          + Create User
        </Link>
      </div>

      {/* Table Card */}
      <div className="overflow-hidden rounded-lg border bg-white shadow-sm">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-50 text-left text-xs font-semibold uppercase text-gray-500">
            <tr>
              <th className="px-6 py-3">Email</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y">
            {users.map((u) => (
              <tr
                key={u.id}
                className="hover:bg-gray-50 transition"
              >
                <td className="px-6 py-4 text-gray-900">
                  {u.email}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge(
                      u.role
                    )}`}
                  >
                    {u.role ?? "unknown"}
                  </span>
                </td>

                <td className="px-6 py-4 text-right">
                  <Link
                    href={`/dashboard/admin/users/edit/${u.id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium"
                  >
                    Edit
                  </Link>
                </td>
              </tr>
            ))}

            {users.length === 0 && (
              <tr>
                <td
                  colSpan={3}
                  className="px-6 py-8 text-center text-gray-500"
                >
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
