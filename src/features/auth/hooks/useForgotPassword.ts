import { useMutation } from "@tanstack/react-query";
import { forgotPasswordApi } from "../api/auth.api";
import { toast } from "sonner";


export default function useForgotPassword() {
    return useMutation({
        mutationFn:forgotPasswordApi,
        onSuccess:(message) =>  toast.success(message)
    })
}
