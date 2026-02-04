// lib/auth/requireUser.ts
import { redirect } from "next/navigation";
import { getCurrentUser } from "./getCurrentUser";

export async function requireUser() {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/auth/login");
  }

  return user;
}
