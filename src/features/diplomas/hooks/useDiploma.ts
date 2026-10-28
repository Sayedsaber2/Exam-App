import { useQuery, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { Paginated } from "@/shared/types/api";
import { getDiplomaApi } from "../api/diplomas.api";
import type { Diploma } from "../types";

export function useDiploma(id: string) {
    const queryClient = useQueryClient();

    return useQuery({
        queryKey: ["diploma", id],
        queryFn: () => getDiplomaApi(id),
        // لو المستخدم جاي من صفحة الدبلومات، الدبلومة دي موجودة في كاش ["diplomas"] خلاص —
        // نعرضها فورًا (من غير "...") لحد ما الطلب الحقيقي يرجع ويحدّثها
        placeholderData: () => {
            const cached = queryClient.getQueryData<InfiniteData<Paginated<Diploma>>>(["diplomas"]);
            return cached?.pages.flatMap((page) => page.data).find((diploma) => diploma.id === id);
        },
    });
}
 