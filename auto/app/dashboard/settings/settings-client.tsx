"use client";

import { useState } from "react";
import { createBrowserClient } from "@supabase/ssr";

type Props = {
  user: {
    id: string;
    email: string;
  };
  profile?: {
    full_name?: string | null;
    role?: string | null;
  } | null;
};

export default function SettingsClient({ user, profile }: Props) {
  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const [name, setName] = useState(profile?.full_name ?? "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function saveProfile() {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      email: user.email,
      full_name: name,
    });

    setLoading(false);
    setMessage(error ? error.message : "Profile updated successfully");
  }

  async function resetPassword() {
    setLoading(true);
    setMessage(null);

    const { error } = await supabase.auth.resetPasswordForEmail(user.email, {
      redirectTo: `${location.origin}/auth/reset-password`,
    });

    setLoading(false);
    setMessage(error ? error.message : "Password reset email sent");
  }

  return (
    <div className="space-y-10">
      {/* PROFILE */}
      <section className="bg-white p-6 rounded-lg border">
        <h2 className="font-medium mb-4">Profile</h2>

        <div className="space-y-3">
          <div>
            <label className="block text-sm text-gray-600">Email</label>
            <input
              value={user.email}
              disabled
              className="w-full border p-2 rounded bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600">Full Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border p-2 rounded"
            />
          </div>

          <button
            onClick={saveProfile}
            disabled={loading}
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Save Changes
          </button>
        </div>
      </section>

      {/* SECURITY */}
      <section className="bg-white p-6 rounded-lg border">
        <h2 className="font-medium mb-4">Security</h2>

        <button
          onClick={resetPassword}
          disabled={loading}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          Send Password Reset Email
        </button>
      </section>

      {message && (
        <p className="text-sm text-gray-600">{message}</p>
      )}
    </div>
  );
}
