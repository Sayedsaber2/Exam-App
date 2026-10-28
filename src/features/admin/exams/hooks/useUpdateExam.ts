import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateExamApi } from "@/features/admin/exams/api/admin-exams.api";
import type { ExamBody } from "@/features/admin/exams/types";

type Variables = { id: string; body: ExamBody };

export function useUpdateExam() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: Variables) => updateExamApi(id, body),
        onSuccess: (_exam, { id }) => {
            queryClient.invalidateQueries({ queryKey: ["admin-exams"] });
            queryClient.invalidateQueries({ queryKey: ["exam-options"] });
            queryClient.invalidateQueries({ queryKey: ["exams"] });
            queryClient.invalidateQueries({ queryKey: ["exam", id] });
            toast.success("Exam updated");
        },
    });
}
