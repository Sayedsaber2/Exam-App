import { Controller, useForm } from "react-hook-form";
import { resetPasswordSchema, type ResetPasswordValues } from "../schemas/forgot-password.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import useResetPassword from "../hooks/useResetPassword";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import PasswordInput from "./PasswordInput";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Button } from "@/components/ui/button/button";
import { Loader2 } from "lucide-react";
import { Link } from "react-router-dom";


export default function ResetPasswordForm({ token }: { token: string }) {
    const { handleSubmit, control } = useForm<ResetPasswordValues>({
        defaultValues: {
            newPassword: "",
            confirmPassword: "",
        },
        resolver: zodResolver(resetPasswordSchema),
    });

    const { mutate, isPending, error } = useResetPassword()
    function onSubmit(values: ResetPasswordValues) {
        
        mutate({token,...values});
    }
    return <>
        <div className="w-full max-w-xl space-y-8">
            <div className="space-y-2">
                <h1 className="font-inter text-3xl font-bold text-foreground">Create a New Password</h1>
                <h2 className=" text-muted-foreground">Create a new strong password for your account.</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="newPassword">New Password</FieldLabel>
                            <PasswordInput
                                {...field}
                                id="newPassword"
                                placeholder="********"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="confirmPassword">Confirm New Password</FieldLabel>
                            <PasswordInput
                                {...field}
                                id="confirmPassword"
                                placeholder="********"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />


                <ErrorAlert message={getErrorMessage(error)} />
                <Button disabled={isPending} type="submit" className="w-full ">
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />
                        </>
                    ) : (
                        "Reset password"
                    )}
                </Button>
            </form>
            <p className="text-center font-medium text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                    Create yours
                </Link>
            </p>
        </div>
    </>;
}
