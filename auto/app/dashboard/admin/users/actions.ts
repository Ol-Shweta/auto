import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";
import { requireRole } from "@/lib/auth/requireRole";
import { getValidRoles } from "@/lib/auth/roles.server";

export async function POST(req: Request) {
  await requireRole(["admin"]);

  const body = await req.json();
  const { email, role } = body;

  if (!email || !role) {
    return NextResponse.json(
      { error: "Missing email or role" },
      { status: 400 }
    );
  }

  const validRoles = await getValidRoles();
  if (!validRoles.includes(role)) {
    return NextResponse.json(
      { error: "Invalid role" },
      { status: 400 }
    );
  }

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    email_confirm: true,
  });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  const { error: profileError } = await supabaseAdmin
    .from("profiles")
    .insert({
      id: data.user.id,
      email,
      role,
    });

  if (profileError) {
    return NextResponse.json(
      { error: profileError.message },
      { status: 500 }
    );
  }

  return NextResponse.json({ success: true });
}
