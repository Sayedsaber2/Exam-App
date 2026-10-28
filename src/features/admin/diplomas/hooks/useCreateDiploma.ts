import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createDiplomaApi } from "@/features/admin/diplomas/api/admin-diplomas.api";

export function useCreateDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createDiplomaApi,
        onSuccess: () => {
            // دبلومة جديدة: جدول الأدمن وكروت اليوزر الاتنين بقوا قدام
            queryClient.invalidateQueries({ queryKey: ["admin-diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diploma-options"] });
            toast.success("Diploma created");
        },
    });
}
