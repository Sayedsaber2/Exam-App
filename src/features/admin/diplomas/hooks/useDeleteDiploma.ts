    import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteDiplomaApi } from "@/features/admin/diplomas/api/admin-diplomas.api";

export function useDeleteDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteDiplomaApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diploma-options"] });
            toast.success("Diploma deleted");
        },
    });
}
