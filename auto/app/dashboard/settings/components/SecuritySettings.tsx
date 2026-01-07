"use client";

export default function SecuritySettings() {
  return (
    <section
      id="security"
      className="bg-white border rounded-lg p-6 shadow-sm space-y-6"
    >
      <header>
        <h2 className="text-sm font-semibold text-gray-800">
          Security
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Manage authentication and access
        </p>
      </header>

      <SettingRow
        title="Change Password"
        description="Update your account password"
        action="Change"
      />

      <SettingRow
        title="Multi-Factor Authentication"
        description="Add an extra layer of security"
        action="Configure"
      />
    </section>
  );
}

function SettingRow({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action: string;
}) {
  return (
    <div className="flex items-center justify-between border rounded-md p-4">
      <div>
        <div className="text-sm font-medium text-gray-800">{title}</div>
        <div className="text-sm text-gray-500">{description}</div>
      </div>
      <button className="text-sm text-blue-600 hover:underline">
        {action}
      </button>
    </div>
  );
}
