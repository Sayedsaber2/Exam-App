import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteAuditLogApi } from "../api/audit-logs.api";

export function useDeleteAuditLog() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteAuditLogApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["audit-logs"] });
            toast.success("Log entry deleted");
        },
    });
}
