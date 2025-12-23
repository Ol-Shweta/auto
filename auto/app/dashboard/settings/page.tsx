import { requireUser } from "@/lib/auth/requireUser";

export default async function SettingsPage() {
  await requireUser();

  return (
    <div className="max-w-4xl space-y-8">
      <h1 className="text-2xl font-semibold">Account Settings</h1>

      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700">
          Profile
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Update your personal information
        </p>
      </section>

      <section className="bg-white border rounded-lg p-6 shadow-sm">
        <h2 className="text-sm font-semibold text-gray-700">
          Security
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Password, sessions and MFA
        </p>
      </section>
    </div>
  );
}
