import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAuditLogsApi } from "../api/audit-logs.api";
import type { AuditLogsQuery } from "../types";

export function useAuditLogs(query: AuditLogsQuery) {
    return useQuery({
        queryKey: ["audit-logs", query],
        queryFn: () => getAuditLogsApi(query),
        placeholderData: keepPreviousData,
    });
}
