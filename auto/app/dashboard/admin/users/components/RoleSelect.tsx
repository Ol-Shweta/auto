"use client";

type Props = {
  value: string;
  roles: string[];
  onChange: (role: string) => void;
};

export default function RoleSelect({ value, roles, onChange }: Props) {
  return (
    <select
      className="w-full rounded border p-2"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      {roles.map((role) => (
        <option key={role} value={role}>
          {role.charAt(0).toUpperCase() + role.slice(1)}
        </option>
      ))}
    </select>
  );
}
