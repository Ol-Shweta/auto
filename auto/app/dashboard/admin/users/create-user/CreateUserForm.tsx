"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserForm({ roles }: { roles: string[] }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [role, setRole] = useState(roles[0]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const res = await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, role }),
    });

    if (!res.ok) {
      const data = await res.json();
      setError(data.error || "Failed to create user");
      setLoading(false);
      return;
    }

    router.push("/dashboard/admin/users");
  }

  return (
    <form onSubmit={submit} className="space-y-4 max-w-md">
      <input
        className="border p-2 w-full"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <select
        className="border p-2 w-full"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      >
        {roles.map((r) => (
          <option key={r}>{r}</option>
        ))}
      </select>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      <button
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        {loading ? "Creating..." : "Create User"}
      </button>
    </form>
  );
}
