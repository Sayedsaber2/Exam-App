import { useQuery } from "@tanstack/react-query";
import { getAdminUserOptionsApi } from "../api/audit-logs.api";

// قايمة الأدمنز جاهزة للـ select، زي useDiplomaOptions
// label: اليوزرنيم، عشان هو نفس الاسم اللي بيظهر في الجدول
export function useAdminUserOptions() {
    return useQuery({
        queryKey: ["admin-user-options"],
        queryFn: getAdminUserOptionsApi,
        select: (users) => users.map((user) => ({ value: user.id, label: user.username })),
    });
}
