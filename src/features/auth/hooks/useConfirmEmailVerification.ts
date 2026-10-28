import { useMutation } from "@tanstack/react-query";
import { confirmEmailVerificationApi } from "../api/auth.api";
import { toast } from "sonner";

export default function useConfirmEmailVerification() {
    return useMutation({
        mutationFn: confirmEmailVerificationApi,
        onSuccess: (message) => {
            toast.success(message);
        }
    })
}
