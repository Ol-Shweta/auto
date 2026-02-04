import { requireRole } from "@/lib/auth/requireRole";
import { supabaseAdmin } from "@/lib/supabase/admin";

type RoleRow = {
  id: number;
  name: string;
  description: string | null;
};

export default async function RolesPage() {
  await requireRole(["admin"]);

  const { data, error } = await supabaseAdmin
    .from("roles")
    .select("*")
    .order("id");

  if (error) {
    console.error("Failed to load roles:", error);
    throw new Error(error.message);
  }

  const roles: RoleRow[] = data ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">Roles & Access</h1>
        <p className="text-sm text-gray-500">
          Manage system roles and access levels
        </p>
      </div>

      <div className="overflow-hidden rounded-lg border bg-white">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="px-4 py-2">Role</th>
              <th className="px-4 py-2">Description</th>
            </tr>
          </thead>

          <tbody>
            {roles.map((role) => (
              <tr key={role.id} className="border-t">
                <td className="px-4 py-2 font-medium capitalize">
                  {role.name}
                </td>
                <td className="px-4 py-2 text-gray-600">
                  {role.description ?? "—"}
                </td>
              </tr>
            ))}

            {roles.length === 0 && (
              <tr>
                <td
                  colSpan={2}
                  className="px-4 py-6 text-center text-gray-500"
                >
                  No roles found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
