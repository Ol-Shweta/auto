"use client";

export default function SessionSettings() {
  return (
    <section
      id="sessions"
      className="bg-white border rounded-lg p-6 shadow-sm space-y-6"
    >
      <header>
        <h2 className="text-sm font-semibold text-gray-800">
          Active Sessions
        </h2>
        <p className="text-sm text-gray-500 mt-1">
          Devices currently logged into your account
        </p>
      </header>

      <div className="space-y-3">
        <SessionItem device="Chrome · Windows" location="India" />
        <SessionItem device="Mobile App · Android" location="India" />
      </div>

      <button className="text-sm text-red-600 hover:underline">
        Log out of all sessions
      </button>
    </section>
  );
}

function SessionItem({
  device,
  location,
}: {
  device: string;
  location: string;
}) {
  return (
    <div className="flex justify-between items-center border rounded-md p-3">
      <div>
        <div className="text-sm font-medium">{device}</div>
        <div className="text-xs text-gray-500">{location}</div>
      </div>
      <button className="text-xs text-gray-500 hover:text-red-600">
        Revoke
      </button>
    </div>
  );
}
