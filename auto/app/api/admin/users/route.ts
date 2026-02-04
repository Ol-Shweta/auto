import { NextResponse } from "next/server";
import { requireRole } from "@/lib/auth/requireRole";

export async function GET() {
  await requireRole(["admin", "manager"]);

  // fetch users
  return NextResponse.json([]);
}
