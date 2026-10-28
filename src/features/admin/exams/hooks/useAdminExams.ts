import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { getAdminExamsApi } from "@/features/admin/exams/api/admin-exams.api";
import type { ExamsQuery } from "@/features/admin/exams/types";

export function useAdminExams(query: ExamsQuery) {
    return useQuery({
        queryKey: ["admin-exams", query],
        queryFn: () => getAdminExamsApi(query),
        placeholderData: keepPreviousData,
    });
}
