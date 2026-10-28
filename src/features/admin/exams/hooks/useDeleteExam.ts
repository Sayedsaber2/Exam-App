import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteExamApi } from "@/features/admin/exams/api/admin-exams.api";

export function useDeleteExam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteExamApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
            queryClient.invalidateQueries({ queryKey: ["exam-options"] });
            queryClient.invalidateQueries({ queryKey: ["exams"] });
            toast.success("Exam deleted");
        },
    });
}
