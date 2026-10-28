import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createQuestionsBulkApi } from "../api/admin-questions.api";
import type { QuestionBody } from "../types";
import { invalidateQuestions } from "./invalidateQuestions";

type Variables = { examId: string; questions: QuestionBody[] };

export function useCreateQuestionsBulk() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ examId, questions }: Variables) => createQuestionsBulkApi(examId, questions),
        onSuccess: (result) => {
            invalidateQuestions(queryClient);
            toast.success(`${result.count} questions added`);
        },
    });
}
