import { useInfiniteQuery } from "@tanstack/react-query";
import { getDiplomasApi } from "../api/diplomas.api";

export function useDiplomas() {
    return useInfiniteQuery({
        queryKey: ["diplomas"],
        queryFn: ({ pageParam }) => getDiplomasApi(pageParam),
        initialPageParam: 1,
        getNextPageParam: (lastPage) =>
            lastPage.metadata.page < lastPage.metadata.totalPages
                ? lastPage.metadata.page + 1
                : undefined,
    });
}
