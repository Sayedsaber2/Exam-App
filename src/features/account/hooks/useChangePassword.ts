import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { changePasswordApi } from "../api/users.api";

export function useChangePassword() {
    return useMutation({
        mutationFn: changePasswordApi,
        // الباسورد مش جزء من بيانات البروفايل → مفيش كاش يتحدث، توست بس (نص فيجما)
        onSuccess: () => toast.success("Your password has been updated."),
    });
}
