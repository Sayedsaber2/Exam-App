import type { UserRole } from "@/shared/types/user";
import type { AuditAction, AuditCategory, AuditLog } from "./types";

// ACTION_LABELS: الكلام اللي بيظهر لكل أكشن
export const ACTION_LABELS: Record<AuditAction, string> = {
    CREATE: "Create",
    UPDATE: "Update",
    DELETE: "Delete",
    SET_IMMUTABLE: "Set Immutable",
    SEED_DATA: "Seed Data",
};

// ACTION_COLORS: لون كل أكشن (فيجما)
export const ACTION_COLORS: Record<AuditAction, string> = {
    CREATE: "text-emerald-500",
    UPDATE: "text-amber-500",
    DELETE: "text-red-600",
    SET_IMMUTABLE: "text-primary",
    SEED_DATA: "text-gray-500",
};

export const CATEGORY_LABELS: Record<AuditCategory, string> = {
    DIPLOMA: "Diploma",
    EXAM: "Exam",
    QUESTION: "Question",
    USER: "User",
    SYSTEM: "System",
};

// ROLE_LABELS: السوبر أدمن أحمر والأدمن أزرق (فيجما)
export const ROLE_LABELS: Record<UserRole, string> = {
    SUPER_ADMIN: "Super Admin",
    ADMIN: "Admin",
    USER: "User",
};

export const ROLE_COLORS: Record<UserRole, string> = {
    SUPER_ADMIN: "text-red-600",
    ADMIN: "text-primary",
    USER: "text-gray-400",
};

// capitalize: أول حرف كبير، يعني diploma تبقى Diploma
export function capitalize(text: string) {
    return text.charAt(0).toUpperCase() + text.slice(1);
}

// formatTime: الساعة بالشكل ده 8:29:00 PM
export function formatTime(date: string) {
    return new Date(date).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit", second: "2-digit" });
}

// formatDate: اليوم بالشكل ده Sat, April 11, 2025
export function formatDate(date: string) {
    return new Date(date).toLocaleDateString("en-US", { weekday: "short", month: "long", day: "numeric", year: "numeric" });
}

// ENTITY_PAGES: كل نوع وصفحته في الأدمن
const ENTITY_PAGES: Record<string, string> = {
    diploma: "diplomas",
    exam: "exams",
    question: "questions",
};

// getEntityPath: رابط صفحة الحاجة اللي اتغيرت، ولو ملهاش صفحة بيرجع null
export function getEntityPath(log: AuditLog) {
    // DELETE: الحاجة اتمسحت خلاص، فصفحتها مش موجودة
    if (!log.entityId || log.action === "DELETE") return null;

    const page = ENTITY_PAGES[log.entityType.toLowerCase()];
    if (!page) return null;

    return `/admin/${page}/${log.entityId}`;
}
