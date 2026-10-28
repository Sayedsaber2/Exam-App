import { useQuery } from "@tanstack/react-query";
import { getQuestionApi } from "../api/admin-questions.api";

export function useQuestion(id: string) {
    return useQuery({ queryKey: ["question", id], queryFn: () => getQuestionApi(id) });
}
