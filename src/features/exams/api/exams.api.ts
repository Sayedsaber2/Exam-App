import { apiClient } from "@/shared/lib/api-client";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Exam } from "../types";

export async function getExamsApi(diplomaId: string, page: number) {
    const { data } = await apiClient.get<ApiSuccess<Paginated<Exam>>>("/exams", {
        params: { diplomaId, page, limit: 12 },
    });
    return data.payload;
}
export async function getExamApi(id: string) {
    const { data } = await apiClient.get<ApiSuccess<{ exam: Exam }>>(`/exams/${id}`);
    return data.payload.exam;
}
