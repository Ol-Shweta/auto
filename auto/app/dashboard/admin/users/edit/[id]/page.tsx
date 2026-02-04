import { redirect, notFound } from "next/navigation";
import { getUserById } from "@/lib/admin/getUserById";
import { getValidRoles } from "@/lib/auth/roles.server";
import { getCurrentUser } from "@/lib/auth/getCurrentUser";
import EditUserForm from "./EditUserForm";

export default async function EditUserPage({ params }) {
  if (!params.id) redirect("/dashboard/admin/users");

  const currentUser = await getCurrentUser();
  if (!currentUser) redirect("/dashboard");

  let user, roles;

  try {
    [user, roles] = await Promise.all([
      getUserById(params.id),
      getValidRoles(),
    ]);
  } catch {
    notFound();
  }

  return (
    <EditUserForm
      userId={user.id}
      currentRole={user.role ?? roles[0]}
      roles={roles}
      isSelf={currentUser.id === user.id}
    />
  );
}
