import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

// الخروج من أي مكان (السايدبار / تابات الأكونت) — نفس الخطوات دايمًا
export function useLogout() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    function logout() {
        localStorage.removeItem("token");
        queryClient.clear(); // امسح الكاش كله — المستخدم الجاي ميشوفش بيانات اللي قبله
        navigate("/login", { replace: true });
        toast.success("Logged out successfully");
    }

    return { logout };
}
