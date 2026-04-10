"use client";

export const ADMIN_TOKEN =
  process.env.NEXT_PUBLIC_ADMIN_TOKEN || "vihara-admin-2024";
export const ADMIN_PASSWORD = "vihara@admin2024";
export const ADMIN_SESSION_KEY = "admin_authed";

export const ADMIN_NAV_ITEMS = [
  {
    href: "/admin",
    label: "Bookings",
    description: "Manage direct bookings and guest updates",
  },
  {
    href: "/admin/calendar",
    label: "Calendar",
    description: "Monthly occupancy and scheduling view",
  },
  {
    href: "/admin/finance",
    label: "Finance",
    description: "Revenue snapshot and payment status",
  },
  {
    href: "/admin/operations",
    label: "Operations",
    description: "Housekeeping and admin notes",
  },
] as const;
