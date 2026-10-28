import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateQuestionApi } from "../api/admin-questions.api";
import type { QuestionBody } from "../types";
import { invalidateQuestions } from "./invalidateQuestions";

type Variables = { id: string; body: QuestionBody };

export function useUpdateQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: Variables) => updateQuestionApi(id, body),
        onSuccess: () => {
            invalidateQuestions(queryClient);
            toast.success("Question updated");
        },
    });
}
