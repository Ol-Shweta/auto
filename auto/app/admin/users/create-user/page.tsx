// app/admin/users/create-user/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateUserPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    await fetch("/api/admin/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    router.push("/admin/users");
  }

  return (
    <div>
      <h1 className="text-xl font-semibold mb-4">Create User</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          className="border p-2 w-full"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <button className="border px-4 py-2">Create</button>
      </form>
    </div>
  );
}
