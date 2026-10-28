import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { deleteAccountApi } from "../api/users.api";

export function useDeleteAccount() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: deleteAccountApi, // الطلب الحقيقي للسيرفر — من غيره مفيش حذف
        onSuccess: () => {
            localStorage.removeItem("token");
            queryClient.clear(); // امسح كل الكاش عشان المستخدم الجاي ميشوفش بيانات ده
            navigate("/login", { replace: true });
            toast.success("Your account has been deleted");
        },
    });
}
