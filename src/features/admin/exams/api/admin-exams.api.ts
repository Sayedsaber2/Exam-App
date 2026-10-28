import { apiClient } from "@/shared/lib/api-client";
import type { ApiMessage, ApiSuccess, Paginated } from "@/shared/types/api";
import type { Exam } from "@/features/exams/types";
import type { ExamBody, ExamsQuery } from "../types";

// ---------- الأدمن ----------

export async function getAdminExamsApi(query: ExamsQuery) {
    const { data } = await apiClient.get<ApiSuccess<Paginated<Exam>>>("/exams", { params: { ...query, limit: 12 } });
    return data.payload;
}

export async function createExamApi(body: ExamBody) {
    const { data } = await apiClient.post<ApiSuccess<{ exam: Exam }>>("/exams", body);
    return data.payload.exam;
}

export async function updateExamApi(id: string, body: ExamBody) {
    const { data } = await apiClient.put<ApiSuccess<{ exam: Exam }>>(`/exams/${id}`, body);
    return data.payload.exam;
}

export async function deleteExamApi(id: string) {
    const { data } = await apiClient.delete<ApiMessage>(`/exams/${id}`);
    return data;
}

// السوبر أدمن بس اللي يقدر يقفل الامتحان أو يفتحه
export async function setExamImmutableApi(id: string, immutable: boolean) {
    const { data } = await apiClient.patch<ApiMessage>(`/admin/exams/${id}/immutable`, { immutable });
    return data;
}

// كل الامتحانات عشان قايمة الاختيار
// السيرفر بيدي 100 بالكتير في الطلب الواحد، والامتحانات أكتر من كده
// فبنجيب الصفحة الأولى، ونعرف منها عدد الصفحات، وبعدين نجيب الباقي مرة واحدة
export async function getExamOptionsApi() {
    const params = { limit: 100, sortBy: "title", sortOrder: "asc" };
    const first = await apiClient.get<ApiSuccess<Paginated<Exam>>>("/exams", { params: { ...params, page: 1 } });
    const { data, metadata } = first.data.payload;

    // pages: أرقام الصفحات الفاضلة، يعني من 2 لحد آخر صفحة
    const pages = Array.from({ length: Math.max(metadata.totalPages - 1, 0) }, (_, i) => i + 2);

    // Promise.all: بتبعت الطلبات كلها في نفس الوقت، وبتستنى لحد ما كلهم يخلصوا
    const rest = await Promise.all(
        pages.map((page) => apiClient.get<ApiSuccess<Paginated<Exam>>>("/exams", { params: { ...params, page } })),
    );

    // flatMap: بنحط امتحانات كل الصفحات في قايمة واحدة
    return [...data, ...rest.flatMap((response) => response.data.payload.data)];
}
