"use client";

import { useState, useTransition } from "react";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = supabaseBrowser();

  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [isPending, startTransition] = useTransition();

  function isValidEmail(value: string) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
  }

  async function handleReset(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    startTransition(async () => {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });

      if (error) {
        setError(error.message);
        return;
      }

      // Security-safe message (no account enumeration)
      setSuccess(
        "If an account exists for this email, a password reset link has been sent."
      );
    });
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg border bg-white p-6 shadow-sm">
        <div className="mb-6 space-y-1 text-center">
          <h1 className="text-xl font-semibold">Forgot your password?</h1>
          <p className="text-sm text-gray-500">
            Enter your email and we’ll send you a reset link.
          </p>
        </div>

        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email address"
            className="w-full rounded border px-3 py-2 text-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isPending}
          />

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded bg-black px-4 py-2 text-sm font-medium text-white disabled:opacity-50"
          >
            {isPending ? "Sending link..." : "Send reset link"}
          </button>
        </form>

        {error && (
          <div className="mt-4 rounded border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-4 rounded border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </div>
        )}

        <div className="mt-6 text-center text-sm">
          <a href="/auth/login" className="font-medium underline">
            Back to login
          </a>
        </div>
      </div>
    </div>
  );
}
