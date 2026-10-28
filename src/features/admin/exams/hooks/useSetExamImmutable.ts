import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setExamImmutableApi } from "@/features/admin/exams/api/admin-exams.api";

type Variables = { id: string; immutable: boolean };

export function useSetExamImmutable() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, immutable }: Variables) => setExamImmutableApi(id, immutable),
        onSuccess: (_message, { id, immutable }) => {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
            queryClient.invalidateQueries({ queryKey: ["exam", id] });
            toast.success(immutable ? "Exam locked" : "Exam unlocked");
        },
    });
}
