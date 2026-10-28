import * as zod from "zod";

export const ForgotPasswordSchema = zod.object({
    email: zod.email("Please enter a valid email"),
});

export type ForgotPasswordValues = zod.infer<typeof ForgotPasswordSchema>;

export const resetPasswordSchema = zod.object({
    newPassword: zod.string().regex(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, "8+ characters with upper, lower and a number"),
    confirmPassword: zod.string().nonempty("Confirm password is required"),
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})
export type ResetPasswordValues =zod.infer<typeof resetPasswordSchema>