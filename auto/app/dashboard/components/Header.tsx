"use client";

import { useState, useRef, useEffect } from "react";
import { LogOut, Settings, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

export default function Header() {
  const router = useRouter();
  const supabase = supabaseBrowser();
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (!menuRef.current?.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  async function logout() {
    await supabase.auth.signOut();
    router.replace("/auth/login");
    router.refresh();
  }

  return (
    <header className="h-16 bg-white border-b shadow-sm flex items-center justify-between px-6">
      <div className="text-sm text-gray-600">
        Dashboard
      </div>

      {/* User Menu */}
      <div className="relative" ref={menuRef}>
        <button
          onClick={() => setOpen(!open)}
          className="flex items-center gap-3 rounded-full hover:bg-gray-100 p-2"
          aria-haspopup="menu"
          aria-expanded={open}
        >
          <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-medium">
            A
          </div>
        </button>

        {open && (
          <div
            role="menu"
            className="absolute right-0 mt-2 w-56 rounded-lg border bg-white shadow-lg z-50"
          >
            <div className="px-4 py-3 border-b">
              <p className="text-sm font-medium text-gray-900">
                Account
              </p>
              <p className="text-xs text-gray-500 truncate">
                user@company.com
              </p>
            </div>

            <div className="py-1">
              

              <MenuItem
                icon={<Settings size={16} />}
                label="Account Settings"
                onClick={() => router.push("/dashboard/settings")}
              />

              <div className="border-t my-1" />

              <MenuItem
                icon={<LogOut size={16} />}
                label="Logout"
                danger
                onClick={logout}
              />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

function MenuItem({
  icon,
  label,
  onClick,
  danger,
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      className={`flex w-full items-center gap-3 px-4 py-2 text-sm transition
        ${danger
          ? "text-red-600 hover:bg-red-50"
          : "text-gray-700 hover:bg-gray-100"}`}
    >
      {icon}
      {label}
    </button>
  );
}
