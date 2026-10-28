import { apiClient } from "@/shared/lib/api-client";
import type { ApiSuccess, Paginated } from "@/shared/types/api";
import type { Diploma } from "../types";

export const DIPLOMAS_PAGE_SIZE = 12;

export async function getDiplomasApi(page: number) {
    const { data } = await apiClient.get<ApiSuccess<Paginated<Diploma>>>("/diplomas", {
        params: { page, limit: DIPLOMAS_PAGE_SIZE },
    });
    return data.payload;
}
export async function getDiplomaApi(id: string) {
    const { data } = await apiClient.get<ApiSuccess<{ diploma: Diploma }>>(`/diplomas/${id}`);
    return data.payload.diploma;
}
