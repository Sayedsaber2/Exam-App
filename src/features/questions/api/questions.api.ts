import { apiClient } from "@/shared/lib/api-client";
import type { ApiSuccess } from "@/shared/types/api";
import type { Question } from "../types";

export async function getQuestionsApi(examId: string) {
    const { data } = await apiClient.get<ApiSuccess<{ questions: Question[] }>>(`/questions/exam/${examId}`);
    return data.payload.questions;
}
