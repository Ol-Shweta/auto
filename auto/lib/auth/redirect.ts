export function redirectByRole(role?: string) {
  switch (role) {
    case "admin":
      return "/admin";
    case "auditor":
      return "/dashboard/audit";
    default:
      return "/dashboard";
  }
}
