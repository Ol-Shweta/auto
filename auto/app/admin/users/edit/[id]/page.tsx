// app/admin/users/edit/page.tsx
"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function EditUserPage() {
  const params = useSearchParams();
  const router = useRouter();
  const userId = params.get("userId");
  const [role, setRole] = useState("");

  async function save() {
    await fetch("/api/admin/users", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId, role }),
    });

    router.push("/admin/users");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Edit User</h1>

      <input
        className="border p-2 w-full"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />

      <button onClick={save} className="mt-3 border px-4 py-2">
        Save
      </button>
    </div>
  );
}
