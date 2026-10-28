import { useQuery } from "@tanstack/react-query";
import { getAuditLogApi } from "../api/audit-logs.api";

export function useAuditLog(id: string) {
    return useQuery({ queryKey: ["audit-log", id], queryFn: () => getAuditLogApi(id) });
}
