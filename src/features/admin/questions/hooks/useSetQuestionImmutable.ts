import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { setQuestionImmutableApi } from "../api/admin-questions.api";
import { invalidateQuestions } from "./invalidateQuestions";

type Variables = { id: string; immutable: boolean };

export function useSetQuestionImmutable() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, immutable }: Variables) => setQuestionImmutableApi(id, immutable),
        onSuccess: (_message, { immutable }) => {
            invalidateQuestions(queryClient);
            toast.success(immutable ? "Question locked" : "Question unlocked");
        },
    });
}
