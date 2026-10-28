import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth.api";
import { toast } from "sonner";
import { useMutation } from "@tanstack/react-query";

export function useRegister() {
    const navigate = useNavigate();
    return useMutation({
        mutationFn:registerApi,
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            toast.success(`Account created, welcome, ${data.user.firstName}!`);  
            navigate("/");
        }
    })
}