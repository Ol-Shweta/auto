"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createBrowserClient } from "@supabase/ssr";

type ProtectedProps = {
  children: ReactNode;
  redirectTo?: string;
};

export default function Protected({
  children,
  redirectTo = "/auth/login",
}: ProtectedProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.replace(redirectTo);
      } else {
        setLoading(false);
      }
    });
  }, [router, redirectTo]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <span className="text-sm text-gray-500">Checking authentication…</span>
      </div>
    );
  }

  return <>{children}</>;
}
