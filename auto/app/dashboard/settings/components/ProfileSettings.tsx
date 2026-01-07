"use client";

import { useState } from "react";

export default function ProfileSettings({ user }: { user: any }) {
  const [loading, setLoading] = useState(false);

  return (
    <section
      id="profile"
      className="bg-white border rounded-lg p-6 shadow-sm space-y-6"
    >
      <header>
        <h2 className="text-sm font-semibold text-gray-800">
          Profile Information
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your personal details
        </p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Field label="Full Name" defaultValue={user.user_metadata?.name} />
        <Field label="Email" defaultValue={user.email} disabled />
      </div>

      <div className="flex justify-end">
        <button
          disabled={loading}
          className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
        >
          Save Changes
        </button>
      </div>
    </section>
  );
}

function Field({
  label,
  defaultValue,
  disabled,
}: {
  label: string;
  defaultValue?: string;
  disabled?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        defaultValue={defaultValue}
        disabled={disabled}
        className="w-full rounded-md border px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
      />
    </div>
  );
}
