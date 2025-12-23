// lib/auth/cookies.ts
import { cookies } from "next/headers";

export function getCookie(name: string): string | undefined {
  try {
    return cookies().get(name)?.value;
  } catch {
    return undefined;
  }
}

export function setCookie(
  name: string,
  value: string,
  options: {
    maxAge?: number;
    path?: string;
    secure?: boolean;
    httpOnly?: boolean;
    sameSite?: "strict" | "lax" | "none";
  } = {}
) {
  cookies().set(name, value, {
    path: "/",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    ...options,
  });
}

export function deleteCookie(name: string) {
  cookies().set(name, "", {
    path: "/",
    maxAge: 0,
  });
}
