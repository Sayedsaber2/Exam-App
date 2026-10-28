import { useQuery } from "@tanstack/react-query";
import { getAdminQuestionsApi } from "../api/admin-questions.api";
import type { QuestionsSort } from "../types";

export function useAdminQuestions(examId: string, sort: QuestionsSort) {
    return useQuery({
        queryKey: ["admin-questions", examId, sort],
        queryFn: () => getAdminQuestionsApi(examId, sort),
    });
}
