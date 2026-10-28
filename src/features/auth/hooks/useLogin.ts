import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { loginApi } from "../api/auth.api";

export function useLogin() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn:loginApi,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            toast.success(`Welcome back, ${data.user.firstName}!`);  
            navigate("/");
        }
    })
}