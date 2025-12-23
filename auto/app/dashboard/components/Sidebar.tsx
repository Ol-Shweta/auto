"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { ChevronLeft, ChevronDown } from "lucide-react";
import { MAIN_NAV, ADMIN_NAV, SidebarItem } from "@/config/sidebar-nav";

export default function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [openGroups, setOpenGroups] = useState<string[]>([]);

  /* Persist sidebar collapse */
  useEffect(() => {
    const saved = localStorage.getItem("sidebar:collapsed");
    if (saved) setCollapsed(saved === "true");
  }, []);

  useEffect(() => {
    localStorage.setItem("sidebar:collapsed", String(collapsed));
  }, [collapsed]);

  /* Auto-open active parent */
  useEffect(() => {
    [...MAIN_NAV, ...ADMIN_NAV].forEach((item) => {
      item.children?.forEach((child) => {
        if (pathname.startsWith(child.href || "")) {
          setOpenGroups((prev) =>
            prev.includes(item.label) ? prev : [...prev, item.label]
          );
        }
      });
    });
  }, [pathname]);

  const toggleGroup = (label: string) => {
    setOpenGroups((prev) =>
      prev.includes(label)
        ? prev.filter((l) => l !== label)
        : [...prev, label]
    );
  };

  const renderItem = (item: SidebarItem) => {
    const Icon = item.icon;
    const isActive = item.href && pathname.startsWith(item.href);
    const isOpen = openGroups.includes(item.label);

    /* ---------- Parent with children ---------- */
    if (item.children) {
      return (
        <div key={item.label}>
          <button
            onClick={() => toggleGroup(item.label)}
            className={clsx(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
              "text-gray-700 hover:bg-gray-100",
              collapsed && "justify-center px-2"
            )}
          >
            <Icon size={18} className="text-gray-400" />

            {!collapsed && (
              <>
                <span className="flex-1 text-left">{item.label}</span>
                <ChevronDown
                  size={16}
                  className={clsx(
                    "transition-transform",
                    isOpen && "rotate-180"
                  )}
                />
              </>
            )}
          </button>

          {/* ---------- Sub-menu ---------- */}
          {!collapsed && (
            <div
              className={clsx(
                "ml-6 overflow-hidden transition-all",
                isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
              )}
            >
              {item.children.map((child) => {
                const ChildIcon = child.icon;
                const active = pathname.startsWith(child.href || "");

                return (
                  <Link
                    key={child.href}
                    href={child.href!}
                    className={clsx(
                      "flex items-center gap-3 rounded-md px-3 py-2 text-sm transition",
                      active
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:bg-gray-100"
                    )}
                  >
                    <ChildIcon size={16} />
                    {child.label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      );
    }

    /* ---------- Single link ---------- */
    return (
      <Link
        key={item.href}
        href={item.href!}
        title={collapsed ? item.label : undefined}
        className={clsx(
          "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-blue-600 text-white"
            : "text-gray-700 hover:bg-gray-100",
          collapsed && "justify-center px-2"
        )}
      >
        <Icon size={18} />
        {!collapsed && item.label}
      </Link>
    );
  };

  return (
    <aside
      className={clsx(
        "flex h-screen flex-col border-r bg-white px-3 py-4 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Header */}
      <div
        className={clsx(
          "mb-6 flex items-center",
          collapsed ? "justify-center" : "justify-between px-2"
        )}
      >
        {!collapsed && (
          <span className="text-lg font-semibold">AutoAI</span>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="rounded p-1 text-gray-400 hover:bg-gray-100"
        >
          <ChevronLeft
            size={18}
            className={clsx(collapsed && "rotate-180")}
          />
        </button>
      </div>

      {/* Main */}
      <nav className="flex flex-col gap-1">
        {MAIN_NAV.map(renderItem)}
      </nav>

      {/* Admin */}
      <div className="mt-4 border-t pt-4">
        {!collapsed && (
          <div className="mb-2 px-2 text-xs uppercase text-gray-400">
            Administration
          </div>
        )}
        <nav className="flex flex-col gap-1">
          {ADMIN_NAV.map(renderItem)}
        </nav>
      </div>
    </aside>
  );
}
