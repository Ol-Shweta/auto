// lib/auth/getSession.ts
import "server-only";
import { supabaseServer } from "@/lib/supabase/server";
import type { User } from "@supabase/supabase-js";

export async function getSession(): Promise<{
  user: User | null;
}> {
  const supabase = await supabaseServer();

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("[Auth] getUser failed:", error.message);
    return { user: null };
  }

  return { user: data.user };
}
