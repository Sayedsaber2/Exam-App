import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm, type Control } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import PasswordInput from "@/features/auth/components/PasswordInput";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useChangePassword } from "../hooks/useChangePassword";
import { changePasswordSchema, type ChangePasswordValues } from "../schemas/account.schema";

type PasswordFieldProps = {
    name: keyof ChangePasswordValues; // واحد من التلاتة بس — TypeScript بيرفض أي اسم تاني
    label: string;
    control: Control<ChangePasswordValues>;
};

// نفس الحقل 3 مرات → helper صغير بدل تكرار الـ Controller
function PasswordField({ name, label, control }: PasswordFieldProps) {
    return (
        <Controller
            name={name}
            control={control}
            render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={name}>{label}</FieldLabel>
                    <PasswordInput {...field} id={name} placeholder="********" aria-invalid={fieldState.invalid} />
                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
            )}
        />
    );
}

export default function ChangePasswordForm() {
    const { handleSubmit, control, reset } = useForm<ChangePasswordValues>({
        defaultValues: { currentPassword: "", newPassword: "", confirmPassword: "" },
        resolver: zodResolver(changePasswordSchema),
    });
    const { mutate, isPending, error } = useChangePassword();

    function onSubmit(values: ChangePasswordValues) {
        // الهوك بيعمل التوست — الفورم بس بيفضّي الحقول بعد النجاح
        mutate(values, { onSuccess: () => reset() });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <PasswordField name="currentPassword" label="Current Password" control={control} />

            {/* فيجما: الباسورد الحالي لوحده (44px تحته) · الجديد والتأكيد مجموعة (20px بينهم) */}
            <div className="mt-11 flex flex-col gap-5">
                <PasswordField name="newPassword" label="New Password" control={control} />
                <PasswordField name="confirmPassword" label="Confirm New Password" control={control} />
            </div>

            {/* فريم Error: الصندوق الأحمر بين الحقول والزرار */}
            {error && (
                <div className="mt-6">
                    <ErrorAlert message={getErrorMessage(error)} />
                </div>
            )}

            <Button type="submit" className="mt-8 h-11 w-full" disabled={isPending}>
                {isPending && <Loader2 className="animate-spin" />}
                Update Password
            </Button>
        </form>
    );
}
