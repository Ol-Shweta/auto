"use client";

import { useState, useTransition } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

type SignupErrorType =
  | "WEAK_PASSWORD"
  | "EMAIL_EXISTS"
  | "INVALID_EMAIL"
  | "NETWORK"
  | "UNKNOWN";

export default function SignupPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [errorType, setErrorType] = useState<SignupErrorType | null>(null);

  const [isPending, startTransition] = useTransition();

  /* ---------------------------------------------
   * Client-side password policy (baseline)
   * --------------------------------------------- */
  function validatePassword(password: string): string | null {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must include at least one uppercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must include at least one number.";
    }
    return null;
  }

  /* ---------------------------------------------
   * Signup Handler
   * --------------------------------------------- */
  async function handleSignup(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setErrorType(null);

    const passwordError = validatePassword(password);
    if (passwordError) {
      setError(passwordError);
      setErrorType("WEAK_PASSWORD");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/verify-email`,
          data: {
            // Future-proofing for RBAC / org provisioning
            role: "user",
            signup_source: "email_password",
          },
        },
      });

      if (error) {
        mapSignupError(error.message);
        return;
      }

      setMessage(
        "Your account has been created. Please check your email to verify your account."
      );
    });
  }

  /* ---------------------------------------------
   * Error Normalization
   * --------------------------------------------- */
  function mapSignupError(message: string) {
    if (message.includes("User already registered")) {
      setError("An account with this email already exists.");
      setErrorType("EMAIL_EXISTS");
      return;
    }

    if (message.includes("invalid email")) {
      setError("Please enter a valid email address.");
      setErrorType("INVALID_EMAIL");
      return;
    }

    setError("Unable to create account. Please try again.");
    setErrorType("UNKNOWN");
  }

  /* ---------------------------------------------
   * UI
   * --------------------------------------------- */
  return (
    /* 🔑 FULL VIEWPORT CENTERING */
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="text-sm text-muted-foreground">
            Sign up to get started
          </p>
        </div>

        <form onSubmit={handleSignup} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded border px-3 py-2 text-sm"
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />

          <input
            type="password"
            required
            placeholder="Password"
            className="w-full rounded border px-3 py-2 text-sm"
            onChange={(e) => setPassword(e.target.value)}
            disabled={isPending}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isPending ? "Creating account..." : "Create account"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {message && (
          <div className="mt-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {message}
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          Already have an account?{" "}
          <a href="/auth/login" className="font-medium underline">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}