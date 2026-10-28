import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateDiplomaApi } from "@/features/admin/diplomas/api/admin-diplomas.api";
import type { DiplomaBody } from "@/features/admin/diplomas/types";

// mutate بتاخد حاجة واحدة بس، فبنجمع الاتنين في أوبجكت واحد
type Variables = { id: string; body: DiplomaBody };

export function useUpdateDiploma() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: Variables) => updateDiplomaApi(id, body),
        onSuccess: (_diploma, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["admin-diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diplomas"] });
            queryClient.invalidateQueries({ queryKey: ["diploma-options"] });
            // صفحة العرض بتاعة الدبلومة دي نفسها
            queryClient.invalidateQueries({ queryKey: ["diploma", id] });
            toast.success("Diploma updated");
        },
    });
}
