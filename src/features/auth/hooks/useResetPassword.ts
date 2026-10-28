import { useMutation } from "@tanstack/react-query";
import { resetPasswordApi } from "../api/auth.api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";


export default function useResetPassword() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn: resetPasswordApi,
        onSuccess: (message) => {
            toast.success(message)
                navigate("/login", { replace: true });
        }
    })
}