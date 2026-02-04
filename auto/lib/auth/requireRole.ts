import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export async function requireRole(allowedRoles: string[]) {
  const user = await getCurrentUser();

  if (!user) redirect("/auth/login");
  if (!allowedRoles.includes(user.role)) redirect("/dashboard");

  return user;
}
