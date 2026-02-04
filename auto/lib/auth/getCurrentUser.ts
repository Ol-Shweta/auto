import { cookies } from "next/headers";
import { createServerClient } from "@supabase/ssr";

export async function getCurrentUser() {
  const cookieStore = await cookies(); // 🔥 THIS IS THE FIX

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

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role, email")
    .eq("id", user.id)
    .single();

  return {
    id: user.id,
    email: user.email!,
    role: profile?.role ?? "user",
  };
}
