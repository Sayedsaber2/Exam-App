import { useQuery } from "@tanstack/react-query";
import { getDiplomaOptionsApi } from "@/features/admin/diplomas/api/admin-diplomas.api";

// قايمة الدبلومات جاهزة لأي select: كل عنصر فيه value و label
export function useDiplomaOptions() {
    return useQuery({
        queryKey: ["diploma-options"],
        queryFn: getDiplomaOptionsApi,
        // select: بتغيّر شكل الداتا قبل ما توصل للكومبوننت
        select: (diplomas) => diplomas.map((diploma) => ({ value: diploma.id, label: diploma.title })),
    });
}
