import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateProfileApi } from "../api/users.api";

export function useUpdateProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: updateProfileApi,
        // بيتنفذ بس لما السيرفر يرد بنجاح — مش في كل رندر
        onSuccess: () => {
            // الاسم اتغير → كاش ["profile"] بقى قديم → السايدبار والفورم يطلبوه تاني
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            toast.success("Profile updated");
        },
    });
}
