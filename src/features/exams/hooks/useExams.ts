import { useInfiniteQuery } from "@tanstack/react-query";
import { getExamsApi } from "../api/exams.api";

export function useExams(diplomaId: string ) {
    return useInfiniteQuery({
        queryKey: ["exams", diplomaId],
        queryFn: ({ pageParam }) => getExamsApi(diplomaId, pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.metadata.page < lastPage.metadata.totalPages
                ? lastPage.metadata.page + 1
                : undefined,
    });
}
