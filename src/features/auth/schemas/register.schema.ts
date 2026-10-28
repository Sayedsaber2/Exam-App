import * as zod from "zod";
export const emailSchema = zod.object({
    email: zod.email("Please enter a valid email"),
});
export type EmailStepValues = zod.infer<typeof emailSchema>;

export const otpSchema = zod.object({
    code: zod.string().nonempty("OTP is required").regex(/^\d{6}$/, "Invalid OTP"),
});
export type OtpStepValues = zod.infer<typeof otpSchema>;

export const userInfoSchema = zod.object({
    firstName: zod.string().nonempty("First name is required"),
    lastName: zod.string().nonempty("Last name is required"),
    username: zod.string().nonempty("Username is required").regex(/^[a-zA-Z0-9_]+$/, "Invalid username"),
    // 1 + [0125] + 8 أرقام = 10 أرقام (أو 11 لو المستخدم كتب الصفر في الأول) — البادئة +20 ظاهرة في الـ UI
    phone: zod.string().regex(/^0?1[0125]\d{8}$/, "Enter a valid Egyptian number").optional().or(zod.literal("")),
});
export type UserInfoStepValues = zod.infer<typeof userInfoSchema>;

export const passwordSchema = zod.object({
    password: zod.string().nonempty("Password is required").regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "8+ characters with upper, lower and a number"),
    confirmPassword: zod.string().nonempty("Confirm password is required"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
});
export type PasswordStepValues = zod.infer<typeof passwordSchema>;

export type RegisterDataValues =
    zod.infer<typeof emailSchema> &
    zod.infer<typeof userInfoSchema> &
    zod.infer<typeof passwordSchema>;
