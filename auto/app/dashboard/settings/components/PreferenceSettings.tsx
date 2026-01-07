"use client";

export default function PreferenceSettings() {
  return (
    <section
      id="preferences"
      className="bg-white border rounded-lg p-6 shadow-sm space-y-6"
    >
      <header>
        <h2 className="text-sm font-semibold text-gray-800">
          Preferences
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Application-level settings
        </p>
      </header>

      <Toggle label="Dark Mode (system based)" />
      <Toggle label="Email Notifications" />
    </section>
  );
}

function Toggle({ label }: { label: string }) {
  return (
    <div className="flex items-center justify-between border rounded-md p-4">
      <span className="text-sm text-gray-700">{label}</span>
      <input type="checkbox" className="h-4 w-4" />
    </div>
  );
}
