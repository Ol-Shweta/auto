import "server-only";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function getValidRoles(): Promise<string[]> {
  const { data, error } = await supabaseAdmin
    .from("roles")
    .select("name");

  if (error) {
    throw new Error(error.message);
  }

  return data.map((r) => r.name);
}
