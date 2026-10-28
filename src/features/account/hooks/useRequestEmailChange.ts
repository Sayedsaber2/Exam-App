import { useMutation } from "@tanstack/react-query";
import { requestEmailChangeApi } from "../api/users.api";

// من غير onSuccess: اللي بيحصل بعدها (الانتقال لخطوة الـ OTP) قرار المودال مش الهوك
export function useRequestEmailChange() {
    return useMutation({ mutationFn: requestEmailChangeApi });
}
