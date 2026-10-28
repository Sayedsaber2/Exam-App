import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createQuestionApi } from "../api/admin-questions.api";
import type { QuestionBody } from "../types";
import { invalidateQuestions } from "./invalidateQuestions";

type Variables = { examId: string; body: QuestionBody };

export function useCreateQuestion() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ examId, body }: Variables) => createQuestionApi(examId, body),
        onSuccess: () => {
            invalidateQuestions(queryClient);
            toast.success("Question created");
        },
    });
}
