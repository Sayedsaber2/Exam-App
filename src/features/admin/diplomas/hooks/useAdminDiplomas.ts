import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { DiplomasQuery } from "@/features/admin/diplomas/types";
import { getAdminDiplomasApi } from "@/features/admin/diplomas/api/admin-diplomas.api";

export function useAdminDiplomas(query: DiplomasQuery) {
    // return = الصفحة تستلم data و isLoading و error ... (من غيرها الهوك بيرجّع undefined)
    return useQuery({
        queryKey: ["admin-diplomas", query], // أي تغيير في الصفحة/البحث/الترتيب = مفتاح جديد = طلب جديد
        queryFn: () => getAdminDiplomasApi(query),
        placeholderData: keepPreviousData, // الصفحة القديمة تفضل ظاهرة لحد ما الجديدة توصل
    });
}
