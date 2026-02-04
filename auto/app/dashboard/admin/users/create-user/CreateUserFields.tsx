"use client";

export default function CreateUserFields({
  roles,
}: {
  roles: string[];
}) {
  return (
    <>
      <input
        name="email"
        className="border p-2 w-full"
        placeholder="Email"
        required
      />

      <select
        name="role"
        className="border p-2 w-full"
      >
        {roles.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </>
  );
}
