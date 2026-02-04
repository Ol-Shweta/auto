"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { updateUserRole } from "../../actions";

export default function EditUserForm({
  userId,
  currentRole,
  roles,
  isSelf,
}: {
  userId: string;
  currentRole: string;
  roles: string[];
  isSelf: boolean;
}) {
  const [role, setRole] = useState(currentRole);
  const [pending, startTransition] = useTransition();
  const router = useRouter();

  function save() {
    startTransition(async () => {
      await updateUserRole(userId, role);
      router.push("/dashboard/admin/users");
    });
  }

  return (
    <div className="space-y-4 max-w-md">
      <h1>Edit User</h1>

      <select
        disabled={isSelf}
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 w-full"
      >
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      {isSelf && (
        <p className="text-sm text-gray-500">
          You cannot change your own role.
        </p>
      )}

      <button disabled={pending || isSelf}>
        {pending ? "Saving..." : "Save"}
      </button>
    </div>
  );
}
