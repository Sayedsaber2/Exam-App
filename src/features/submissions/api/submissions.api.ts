import { apiClient } from "@/shared/lib/api-client";
import type { ApiSuccess } from "@/shared/types/api";
import type { SubmitExamBody, SubmitExamResult } from "../types";

export async function submitExamApi(body: SubmitExamBody) {
    const { data } = await apiClient.post<ApiSuccess<SubmitExamResult>>("/submissions", body);
    return data.payload;
}
