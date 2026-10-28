import { useMutation } from "@tanstack/react-query";
import { uploadImageApi } from "@/features/admin/shared/api/upload.api";

// من غير onSuccess: الكومبوننت هو اللي هيحط الرابط في الفورم
export function useUploadImage() {
    return useMutation({ mutationFn: uploadImageApi });
}
