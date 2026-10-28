import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createExamApi } from "@/features/admin/exams/api/admin-exams.api";

export function useCreateExam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createExamApi,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
            queryClient.invalidateQueries({ queryKey: ["exam-options"] });
            // exams: قايمة امتحانات الدبلومة اللي اليوزر بيشوفها
            queryClient.invalidateQueries({ queryKey: ["exams"] });
            toast.success("Exam created");
        },
    });
}
