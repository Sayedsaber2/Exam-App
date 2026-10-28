import { apiClient } from "@/shared/lib/api-client";
import type { ApiSuccess } from "@/shared/types/api";

// رفع صورة للسيرفر: بيرجّع رابط مؤقت نبعته بعد كده مع الدبلومة أو الامتحان
export async function uploadImageApi(file: File) {
    // FormData: الشكل اللي بيتبعت بيه أي ملف (مش JSON)
    const formData = new FormData();
    formData.append("image", file);

    const { data } = await apiClient.post<ApiSuccess<{ url: string }>>("/upload", formData);
    return data.payload.url;
}
