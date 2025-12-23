// app/admin/roles/page.tsx
export default async function RolesPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/admin/roles`, {
    cache: "no-store",
  });

  const roles = await res.json();

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Roles</h1>

      <ul className="space-y-2">
        {roles.map((role: any) => (
          <li
            key={role.id}
            className="border p-3 rounded flex justify-between"
          >
            <div>
              <strong>{role.name}</strong>
              <p className="text-sm text-gray-500">
                {role.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
