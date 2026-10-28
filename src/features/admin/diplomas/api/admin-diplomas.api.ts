import { apiClient } from "@/shared/lib/api-client";
import type { ApiMessage, ApiSuccess, Paginated } from "@/shared/types/api";
import type { Diploma } from "@/features/diplomas/types";
import type { DiplomaBody, DiplomasQuery } from "../types";

export async function getAdminDiplomasApi(query: DiplomasQuery) {
    const { data } = await apiClient.get<ApiSuccess<Paginated<Diploma>>>("/diplomas", { params: { ...query, limit: 12 } });
    return data.payload;
}

// ---------- الأدمن: إضافة وتعديل وحذف وقفل ----------

export async function createDiplomaApi(body: DiplomaBody) {
    const { data } = await apiClient.post<ApiSuccess<{ diploma: Diploma }>>("/diplomas", body);
    return data.payload.diploma;
}

export async function updateDiplomaApi(id: string, body: DiplomaBody) {
    const { data } = await apiClient.put<ApiSuccess<{ diploma: Diploma }>>(`/diplomas/${id}`, body);
    return data.payload.diploma;
}

export async function deleteDiplomaApi(id: string) {
    const { data } = await apiClient.delete<ApiMessage>(`/diplomas/${id}`);
    return data;
}

// السوبر أدمن بس اللي يقدر يقفل الدبلومة أو يفتحها
export async function setDiplomaImmutableApi(id: string, immutable: boolean) {
    const { data } = await apiClient.patch<ApiMessage>(`/admin/diplomas/${id}/immutable`, { immutable });
    return data;
}

// كل الدبلومات عشان قوايم الاختيار، بنفس طريقة getExamOptionsApi بالظبط
export async function getDiplomaOptionsApi() {
    const params = { limit: 100, sortBy: "title", sortOrder: "asc" };
    const first = await apiClient.get<ApiSuccess<Paginated<Diploma>>>("/diplomas", { params: { ...params, page: 1 } });
    const { data, metadata } = first.data.payload;

    const pages = Array.from({ length: Math.max(metadata.totalPages - 1, 0) }, (_, i) => i + 2);
    const rest = await Promise.all(
        pages.map((page) => apiClient.get<ApiSuccess<Paginated<Diploma>>>("/diplomas", { params: { ...params, page } })),
    );

    return [...data, ...rest.flatMap((response) => response.data.payload.data)];
}
