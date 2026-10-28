import type { UserRole } from "@/shared/types/user";

// category: الحتة اللي اتغيرت
export type AuditCategory = "DIPLOMA" | "EXAM" | "QUESTION" | "USER" | "SYSTEM";

// action: نوع التغيير
export type AuditAction = "CREATE" | "UPDATE" | "DELETE" | "SET_IMMUTABLE" | "SEED_DATA";

// سطر واحد في السجل: مين عمل إيه، في إيه، وإمتى
export interface AuditLog {
    id: string;
    createdAt: string;
    actorUserId: string | null;
    actorUsername: string;
    actorEmail: string;
    actorRole: UserRole;
    category: AuditCategory;
    action: AuditAction;
    entityType: string;
    entityId: string | null;
    // metadata: تفاصيل زيادة، زي الحاجات اللي اتغيرت
    metadata: Record<string, unknown> | null;
    ipAddress: string | null;
    httpMethod: string | null;
}

// اللي جدول السجل عايزه من السيرفر
export interface AuditLogsQuery {
    page: number;
    category?: AuditCategory;
    action?: AuditAction;
    actorUserId?: string;
    sortBy?: "action" | "user" | "entity" | "createdAt";
    sortOrder?: "asc" | "desc";
}

// قيم كارت الفلاتر، والفاضي "" معناه مفيش فلتر
export interface AuditFiltersValue {
    category: string;
    action: string;
    actorUserId: string;
}
