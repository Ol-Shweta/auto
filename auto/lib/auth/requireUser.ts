// lib/auth/requireUser.ts
import "server-only";
import { redirect } from "next/navigation";
import { getSession } from "./getSession";

export async function requireUser() {
  const { user } = await getSession();

  if (!user) {
    redirect("/login"); // Auth required
  }

  return user;
}
