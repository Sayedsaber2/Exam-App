import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { clearAuditLogsApi } from "../api/audit-logs.api";

export function useClearAuditLogs() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: clearAuditLogsApi,
        onSuccess: (result) => {
            queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
            toast.success(`${result.deletedCount} logs cleared`);
        },
    });
}
