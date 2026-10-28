import { apiClient } from "@/shared/lib/api-client";
import type { ApiMessage, ApiSuccess } from "@/shared/types/api";
import type { Question } from "@/features/questions/types";
import type { QuestionBody, QuestionsSort } from "../types";

// أسئلة امتحان واحد كلها مرة واحدة، مرتبة زي ما الأدمن اختار
export async function getAdminQuestionsApi(examId: string, sort: QuestionsSort) {
    const { data } = await apiClient.get<ApiSuccess<{ questions: Question[] }>>(`/questions/exam/${examId}`, { params: sort });
    return data.payload.questions;
}

export async function getQuestionApi(id: string) {
    const { data } = await apiClient.get<ApiSuccess<{ question: Question }>>(`/questions/${id}`);
    return data.payload.question;
}

export async function createQuestionApi(examId: string, body: QuestionBody) {
    const { data } = await apiClient.post<ApiSuccess<{ question: Question }>>(`/questions/exam/${examId}`, body);
    return data.payload.question;
}

// إضافة أسئلة كتير مرة واحدة
export async function createQuestionsBulkApi(examId: string, questions: QuestionBody[]) {
    const { data } = await apiClient.post<ApiSuccess<{ questions: Question[]; count: number }>>(`/questions/exam/${examId}/bulk`, { questions });
    return data.payload;
}

export async function updateQuestionApi(id: string, body: QuestionBody) {
    const { data } = await apiClient.put<ApiSuccess<{ question: Question }>>(`/questions/${id}`, body);
    return data.payload.question;
}

export async function deleteQuestionApi(id: string) {
    const { data } = await apiClient.delete<ApiMessage>(`/questions/${id}`);
    return data;
}

// السوبر أدمن بس اللي يقدر يقفل السؤال أو يفتحه
export async function setQuestionImmutableApi(id: string, immutable: boolean) {
    const { data } = await apiClient.patch<ApiMessage>(`/admin/questions/${id}/immutable`, { immutable });
    return data;
}
