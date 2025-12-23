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
        href: "/dashboard/settings/preferences",
        icon: Settings,
      },
    ],
  },
];

export const ADMIN_NAV: SidebarItem[] = [
  {
    label: "User Management",
    icon: Users,
    children: [
      {
        label: "Users",
        href: "/admin/users",
        icon: Users,
      },
      {
        label: "Roles & Access",
        href: "/admin/roles",
        icon: ShieldCheck,
      },
    ],
  },
];
