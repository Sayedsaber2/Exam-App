import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { confirmEmailChangeApi } from "../api/users.api";

export function useConfirmEmailChange() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: confirmEmailChangeApi,
        onSuccess: () => {
            // الإيميل اتغير → البروفايل المحفوظ بقى قديم
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success("Email updated");
        },
    });
}
