import { apiClient } from "@/shared/lib/api-client";
import type { ApiMessage, ApiSuccess } from "@/shared/types/api";
import type { User } from "@/shared/types/user";
import type {
    ChangePasswordBody,
    ConfirmEmailChangeBody,
    RequestEmailChangeBody,
    UpdateProfileBody,
} from "../types";

export async function getProfileApi() {
    const { data } = await apiClient.get<ApiSuccess<{ user: User }>>("/users/profile");
    return data.payload.user;
}

// body بيتبعت زي ما هو — مش { body } (دي كانت غلطة الـ reset password)
export async function updateProfileApi(body: UpdateProfileBody) {
    const { data } = await apiClient.patch<ApiSuccess<{ user: User }>>("/users/profile", body);
    return data.payload.user;
}

export async function changePasswordApi(body: ChangePasswordBody) {
    const { data } = await apiClient.post<ApiMessage>("/users/change-password", body);
    return data;
}

export async function requestEmailChangeApi(body: RequestEmailChangeBody) {
    const { data } = await apiClient.post<ApiMessage>("/users/email/request", body);
    return data;
}

export async function confirmEmailChangeApi(body: ConfirmEmailChangeBody) {
    const { data } = await apiClient.post<ApiSuccess<{ user: User }>>("/users/email/confirm", body);
    return data.payload.user;
}

export async function deleteAccountApi() {
    const { data } = await apiClient.delete<ApiMessage>("/users/account");
    return data;
}
