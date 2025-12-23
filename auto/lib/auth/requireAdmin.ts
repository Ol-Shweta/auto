// lib/auth/requireAdmin.ts
import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./getSession";

export async function requireAdmin() {
  const { user } = await getSession();

  if (!user) {
    redirect("/login");
  }

  const role = user.user_metadata?.role;

  if (role !== "admin") {
    redirect("/dashboard"); // Non-admins redirected
  }

  return user;
}
