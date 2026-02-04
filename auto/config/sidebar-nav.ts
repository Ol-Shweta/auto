import {
  LayoutDashboard,
  Activity,
  Settings,
  Users,
  ShieldCheck,
  ChevronDown,
} from "lucide-react";

export type SidebarItem = {
  label: string;
  href?: string;
  icon: any;
  children?: SidebarItem[];
  roles?: string[];
  disabled?: boolean;
};

export const MAIN_NAV: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Activity",
    icon: Activity,
    children: [
      {
        label: "Recent Activity",
        href: "/dashboard/activity",
        icon: Activity,
      },
      {
        label: "Audit Logs",
        href: "/dashboard/activity/audit",
        icon: Activity,
      },
    ],
  },
  {
    label: "Settings",
    icon: Settings,
    children: [
      {
        label: "Profile",
        href: "/dashboard/settings",
        icon: Settings,
      },
      {
        label: "Preferences",
        href: "/dashboard/settings#preferences",
        icon: Settings,
      },
    ],
  },
];

export const ADMIN_NAV: SidebarItem[] = [
  {
    label: "User Management",
    icon: Users,
    roles: ["admin", "manager"],
    children: [
      {
        label: "Users",
        href: "/dashboard/admin/users",
        icon: Users,
        roles: ["admin", "manager"],
      },
      {
        label: "Roles & Access",
        href: "/dashboard/admin/roles",
        icon: ShieldCheck,
        roles: ["admin"], // 🔐 admin-only
      },
      {
        label: "Teams",
        href: "/dashboard/admin/teams",
        icon: Users,
        roles: ["admin"],
        disabled: true, // 🚧 not implemented yet
      },
      {
        label: "Access Logs",
        href: "/dashboard/admin/access-logs",
        icon: Activity,
        roles: ["admin"],
        disabled: true, // 🚧 future feature
      },
    ],
  },
];


