"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

type Status =
  | "checking"
  | "verified"
  | "unverified"
  | "expired"
  | "error";

export default function VerifyEmailPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = supabaseBrowser();

  const [status, setStatus] = useState<Status>("checking");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  


  /**
   * Step 1: Check verification status
   */
  useEffect(() => {
    const checkVerification = async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          setStatus("error");
          setMessage(error.message);
          return;
        }

        if (!data.user) {
          setStatus("unverified");
          return;
        }

     //   setEmail(data.user.email);
        setEmail(data.user.email ?? null);

        

        if (data.user.email_confirmed_at) {
          setStatus("verified");

          // Small delay for UX
          setTimeout(() => {
            router.replace("/dashboard");
          }, 1500);
        } else {
          setStatus("unverified");
        }
      } catch {
        setStatus("error");
        setMessage("Unexpected error occurred.");
      }
    };

    checkVerification();
  }, [router, supabase]);

  /**
   * Step 2: Resend verification email
   */
  async function resendVerification() {
    if (!email) return;

    setLoading(true);
    setMessage("");

    const { error } = await supabase.auth.resend({
      type: "signup",
      email,
      options: {
        emailRedirectTo: `${location.origin}/auth/verify-email`,
      },
    });

    setLoading(false);

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setMessage("Verification email sent. Please check your inbox.");
    }
  }

  /**
   * UI states
   */
  if (status === "checking") {
    return <Centered>Checking verification status…</Centered>;
  }

  if (status === "verified") {
    return (
      <Centered>
        <h1 className="text-2xl font-semibold">Email verified</h1>
        <p className="text-sm text-muted-foreground mt-2">
          Redirecting to dashboard…
        </p>
      </Centered>
    );
  }

  if (status === "error") {
    return (
      <Centered>
        <h1 className="text-xl font-semibold">Verification error</h1>
        <p className="text-sm text-red-600 mt-2">{message}</p>
      </Centered>
    );
  }

  return (
    <Centered>
      <h1 className="text-2xl font-semibold">Verify your email</h1>

      <p className="text-sm text-muted-foreground mt-3 text-center">
        We’ve sent a verification link to your email.
        <br />
        Please click the link to activate your account.
      </p>

      {message && (
        <p className="text-sm text-green-600 mt-3 text-center">{message}</p>
      )}

      <button
        disabled={loading}
        onClick={resendVerification}
        className="mt-6 w-full border rounded px-4 py-2 text-sm disabled:opacity-50"
      >
        {loading ? "Sending…" : "Resend verification email"}
      </button>

      <button
        onClick={() => router.push("/auth/login")}
        className="mt-3 text-sm text-muted-foreground hover:underline"
      >
        Back to login
      </button>
    </Centered>
  );
}

/**
 * Layout helper
 */
function Centered({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md border rounded-lg p-6 text-center space-y-2">
        {children}
      </div>
    </div>
  );
}
