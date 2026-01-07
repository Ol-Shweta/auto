import { requireUser } from "@/lib/auth/requireUser";
import ProfileSettings from "./components/ProfileSettings";
import SecuritySettings from "./components/SecuritySettings";
import PreferenceSettings from "./components/PreferenceSettings";
import SessionSettings from "./components/SessionSettings";

export default async function SettingsPage() {
  const user = await requireUser();

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* PAGE HEADER */}
      <div>
        <h1 className="text-2xl font-semibold text-gray-900">
          Account Settings
        </h1>
        <p className="text-sm text-gray-500 mt-1">
          Manage your profile, security, and application preferences
        </p>
      </div>

      {/* SETTINGS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* LEFT NAV / SECTION INDEX */}
        <aside className="lg:col-span-1 space-y-2 text-sm">
          <SettingsNav />
        </aside>

        {/* RIGHT CONTENT */}
        <div className="lg:col-span-2 space-y-10">
          <ProfileSettings user={user} />
          <SecuritySettings />
          <SessionSettings />
          <PreferenceSettings />
        </div>
      </div>
    </div>
  );
}

function SettingsNav() {
  const items = [
    { id: "profile", label: "Profile" },
    { id: "security", label: "Security" },
    { id: "sessions", label: "Sessions" },
    { id: "preferences", label: "Preferences" },
  ];

  return (
    <nav className="sticky top-24 bg-white border rounded-lg p-4 shadow-sm">
      <ul className="space-y-1">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              className="block px-3 py-2 rounded-md text-gray-700 hover:bg-gray-100"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
