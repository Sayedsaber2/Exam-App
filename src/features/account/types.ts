// اللي بنبعته لكل طلب — الأسماء زي Swagger بالظبط

export interface UpdateProfileBody {
    firstName?: string;
    lastName?: string;
    phone?: string;
}

export interface ChangePasswordBody {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}

export interface RequestEmailChangeBody {
    newEmail: string;
}

export interface ConfirmEmailChangeBody {
    code: string;
}
