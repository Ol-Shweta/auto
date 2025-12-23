import { redirect } from "next/navigation";
import { supabaseServer } from "@/lib/supabase/server";
import LoginForm from "./login-form";

export default async function LoginPage() {
  const supabase = await supabaseServer();
  const { data } = await supabase.auth.getSession();

  if (data.session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md border p-6 rounded">
        <h1 className="text-2xl font-semibold mb-4">Login</h1>
        <LoginForm />
      </div>
    </div>
  );
}
