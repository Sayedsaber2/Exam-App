import { apiClient } from "@/shared/lib/api-client";
import type { AuthResponse } from "../types";
import type { LoginFormValues } from "../schemas/login.schema";
import type { ApiMessage, ApiSuccess } from "@/shared/types/api";
import type { RegisterDataValues } from "../schemas/register.schema";

export async function loginApi(body: LoginFormValues) {
    const { data } = await apiClient.post<ApiSuccess<AuthResponse>>("/auth/login", body);
    return data.payload;
}
export async function sendEmailVerificationApi({ email }: { email: string }) {
    const { data } = await apiClient.post<ApiMessage>("/auth/send-email-verification", { email });
    return data.message;
}
export async function confirmEmailVerificationApi(body: { email: string; code: string }) {
    const { data } = await apiClient.post<ApiMessage>("/auth/confirm-email-verification", body);
    return data.message;
}
export async function registerApi(body: RegisterDataValues) {
    const { data } = await apiClient.post<ApiSuccess<AuthResponse>>("/auth/register", body);
    return data.payload;
}
export async function forgotPasswordApi({ email }: { email: string }) {
    const { data } = await apiClient.post<ApiMessage>("/auth/forgot-password", {
        email,
        redirectUrl: `${window.location.origin}/reset-password`,
    });
    return data.message;
}
export async function resetPasswordApi(body: { token: string; newPassword: string; confirmPassword: string }) {
    const { data } = await apiClient.post<ApiMessage>("/auth/reset-password",body);
    return data.message;
}