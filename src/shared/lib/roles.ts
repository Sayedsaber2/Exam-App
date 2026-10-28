import type { UserRole } from "@/shared/types/user";

// الأدمن العادي والسوبر أدمن الاتنين بيدخلوا لوحة الأدمن
export const isAdminRole = (role?: UserRole) => role === "ADMIN" || role === "SUPER_ADMIN";

// صلاحيات زيادة: القفل (immutable) ومسح الـ Audit Logs
export const isSuperAdminRole = (role?: UserRole) => role === "SUPER_ADMIN";
