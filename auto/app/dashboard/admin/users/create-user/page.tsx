import { getValidRoles } from "@/lib/auth/roles.server";
import CreateUserForm from "./CreateUserForm";

export default async function CreateUserPage() {
  const roles = await getValidRoles();
  return <CreateUserForm roles={roles} />;
}
