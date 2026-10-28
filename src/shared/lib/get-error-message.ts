import { isAxiosError } from "axios";
import type { ApiError } from "@/shared/types/api";

export function getErrorMessage(error: unknown): string {
    if (!error) return "";
    if (isAxiosError<ApiError>(error) && error.response?.data?.message) {
        return error.response.data.message;   // "Invalid username or password" من السيرفر
    }
    return "Something went wrong";           // نت فصل / سيرفر واقع
}