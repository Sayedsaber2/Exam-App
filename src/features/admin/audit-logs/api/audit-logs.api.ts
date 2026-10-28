import { apiClient } from "@/shared/lib/api-client";
import type { ApiMessage, ApiSuccess, Paginated } from "@/shared/types/api";
import type { User } from "@/shared/types/user";
import type { AuditLog, AuditLogsQuery } from "../types";

export async function getAuditLogsApi(query: AuditLogsQuery) {
    const { data } = await apiClient.get<ApiSuccess<Paginated<AuditLog>>>("/admin/audit-logs", { params: { ...query, limit: 20 } });
    return data.payload;
}

export async function getAuditLogApi(id: string) {
    const { data } = await apiClient.get<ApiSuccess<{ auditLog: AuditLog }>>(`/admin/audit-logs/${id}`);
    return data.payload.auditLog;
}

// السوبر أدمن بس اللي يقدر يمسح سطر
export async function deleteAuditLogApi(id: string) {
    const { data } = await apiClient.delete<ApiMessage>(`/admin/audit-logs/${id}`);
    return data;
}

// السوبر أدمن بس اللي يقدر يمسح السجل كله
export async function clearAuditLogsApi() {
    const { data } = await apiClient.delete<ApiSuccess<{ deletedCount: number }>>("/admin/audit-logs");
    return data.payload;
}

// الأدمنز بس هما اللي بيعملوا تغييرات، فقايمة فلتر اليوزر فيها الأدمن والسوبر أدمن
export async function getAdminUserOptionsApi() {
    const params = { page: 1, limit: 100, sortBy: "username", sortOrder: "asc" };
    // Promise.all: الطلبين بيتبعتوا مع بعض
    const [admins, superAdmins] = await Promise.all([
        apiClient.get<ApiSuccess<Paginated<User>>>("/admin/users", { params: { ...params, role: "ADMIN" } }),
        apiClient.get<ApiSuccess<Paginated<User>>>("/admin/users", { params: { ...params, role: "SUPER_ADMIN" } }),
    ]);
    return [...superAdmins.data.payload.data, ...admins.data.payload.data];
}
