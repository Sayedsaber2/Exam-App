import { useQuery } from "@tanstack/react-query";
import { getQuestionsApi } from "../api/questions.api";

export function useQuestions(examId: string) {
    return useQuery({ queryKey: ["questions", examId], queryFn: () => getQuestionsApi(examId) });
}
