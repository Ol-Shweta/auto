import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export type AdminUser = {
  id: string;
  email: string;
  role: string | null;
};

export async function getUserById(userId: string): Promise<AdminUser> {
  const cookieStore = await cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, role")
    .eq("id", userId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
