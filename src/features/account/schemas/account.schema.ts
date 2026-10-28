import * as zod from "zod";
import { userInfoSchema } from "@/features/auth/schemas/register.schema";

// .pick = خد الحقول دي بس من سكيمة موجودة — نفس قواعد الريجستر (regex الموبايل) من غير تكرار
export const profileSchema = userInfoSchema.pick({ firstName: true, lastName: true, phone: true });
export type ProfileValues = zod.infer<typeof profileSchema>;

export const changePasswordSchema = zod
    .object({
        currentPassword: zod.string().nonempty("Current password is required"),
        newPassword: zod
            .string()
            .nonempty("New password is required")
            .regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "8+ characters with upper, lower and a number"),
        confirmPassword: zod.string().nonempty("Confirm password is required"),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
        message: "Passwords do not match",
        path: ["confirmPassword"],
    });
export type ChangePasswordValues = zod.infer<typeof changePasswordSchema>;

// الإيميل الجديد والـ OTP: نستخدم emailSchema و otpSchema بتوع الريجستر زي ما هما
