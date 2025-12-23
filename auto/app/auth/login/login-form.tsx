"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";
import { redirectByRole } from "@/lib/auth/redirect";

type AuthErrorType =
  | "INVALID_CREDENTIALS"
  | "EMAIL_NOT_CONFIRMED"
  | "NETWORK"
  | "UNKNOWN";

export default function LoginForm() {
  const router = useRouter();
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<AuthErrorType | null>(null);
  const [isPending, startTransition] = useTransition();

  /* ---------------------------------------------
   * Email + Password Login
   * --------------------------------------------- */
  async function handleLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setErrorType(null);

    startTransition(async () => {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        mapAuthError(error.message);
        return;
      }

      if (!data.session) {
        setError("Authentication failed. Please try again.");
        setErrorType("UNKNOWN");
        return;
      }

      // Fetch user role from secure table
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("role")
        .single();

      if (profileError) {
        setError("Unable to determine user access.");
        setErrorType("UNKNOWN");
        return;
      }

      // Role-based redirect
      router.push(redirectByRole(profile.role));
      router.refresh();
    });
  }

  /* ---------------------------------------------
   * OAuth Login
   * --------------------------------------------- */
  async function oauthLogin(provider: "google" | "github") {
    setError(null);
    setErrorType(null);

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });

    if (error) {
      setError("OAuth sign-in failed. Please try again.");
      setErrorType("NETWORK");
    }
  }

  /* ---------------------------------------------
   * Error Normalization
   * --------------------------------------------- */
  function mapAuthError(message: string) {
    if (message.includes("Invalid login credentials")) {
      setError("Invalid email or password.");
      setErrorType("INVALID_CREDENTIALS");
      return;
    }

    if (message.includes("Email not confirmed")) {
      setError("Please verify your email before logging in.");
      setErrorType("EMAIL_NOT_CONFIRMED");
      return;
    }

    setError("Something went wrong. Please try again.");
    setErrorType("UNKNOWN");
  }

  /* ---------------------------------------------
   * UI
   * --------------------------------------------- */
  return (
    <form
      onSubmit={handleLogin}
      className="space-y-6 rounded-lg border bg-white p-6 shadow-sm"
      aria-busy={isPending}
    >
      <div>
        <h1 className="text-xl font-semibold">Sign in</h1>
        <p className="text-sm text-muted-foreground">
          Access your account securely
        </p>
      </div>

      <div className="space-y-4">
        <input
          type="email"
          required
          autoComplete="email"
          placeholder="Email address"
          className="w-full rounded border px-3 py-2 text-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isPending}
        />

        <input
          type="password"
          required
          autoComplete="current-password"
          placeholder="Password"
          className="w-full rounded border px-3 py-2 text-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isPending}
        />
      </div>

      {error && (
        <div
          className="rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700"
          role="alert"
        >
          {error}
          {errorType === "EMAIL_NOT_CONFIRMED" && (
            <div className="mt-1">
              <a
                href="/auth/verify-email"
                className="font-medium underline"
              >
                Resend verification email
              </a>
            </div>
          )}
        </div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
      >
        {isPending ? "Signing in..." : "Sign in"}
      </button>

      <div className="flex justify-between text-sm">
        <a href="/auth/forgot-password" className="underline">
          Forgot password?
        </a>
        <a href="/auth/signup" className="underline">
          Create account
        </a>
      </div>

      <div className="relative py-2 text-center text-xs text-muted-foreground">
        <span className="bg-white px-2">OR</span>
      </div>

      <div className="space-y-2">
        <button
          type="button"
          onClick={() => oauthLogin("google")}
          className="w-full rounded border px-4 py-2 text-sm"
          disabled={isPending}
        >
          Continue with Google
        </button>

        <button
          type="button"
          onClick={() => oauthLogin("github")}
          className="w-full rounded border px-4 py-2 text-sm"
          disabled={isPending}
        >
          Continue with GitHub
        </button>
      </div>
    </form>
  );
}
