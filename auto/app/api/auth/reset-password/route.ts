import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase/server";

export async function POST(req: Request) {
  const { password } = await req.json();

  if (!password) {
    return NextResponse.json(
      { error: "Password is required" },
      { status: 400 }
    );
  }

  const supabase = await supabaseServer();

  const { error } = await supabase.auth.updateUser({ password });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({
    success: true,
    message: "Password updated successfully",
  });
}
