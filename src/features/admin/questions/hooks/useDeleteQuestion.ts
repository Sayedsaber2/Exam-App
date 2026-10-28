import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteQuestionApi } from "../api/admin-questions.api";
import { invalidateQuestions } from "./invalidateQuestions";

export function useDeleteQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteQuestionApi,
        onSuccess: () => {
            invalidateQuestions(queryClient);
            toast.success("Question deleted");
        },
    });
}
