"use client";

import { useState } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function ResetPasswordPage() {
  const supabase = supabaseBrowser();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  async function handleUpdate() {
    const { error } = await supabase.auth.updateUser({ password });
    setMsg(error ? error.message : "Password updated");
  }

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-xl mb-4">Reset Password</h1>
      <input
        type="password"
        placeholder="New password"
        className="w-full border p-2"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="w-full border p-2 mt-4" onClick={handleUpdate}>
        Update password
      </button>
      {msg && <p className="text-sm mt-3">{msg}</p>}
    </div>
  );
}
