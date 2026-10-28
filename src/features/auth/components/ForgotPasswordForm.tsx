import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { ForgotPasswordSchema, type ForgotPasswordValues } from "../schemas/forgot-password.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import useForgotPassword from "../hooks/useForgotPassword";
import { ArrowLeft, ChevronRight, Loader2 } from "lucide-react";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useState } from "react";
export default function ForgotPasswordForm() {
    const [sentTo, setSentTo] = useState("");
    const { handleSubmit, control } = useForm<ForgotPasswordValues>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(ForgotPasswordSchema),
    });

    const { mutate, isPending, error } = useForgotPassword();

    function onSubmit(values: ForgotPasswordValues) {
        mutate(values, { onSuccess: () => setSentTo(values.email) });
    }

    if (sentTo) {
        return (
            <div className="w-full max-w-xl space-y-6">
                
                <button
                    type="button"
                    onClick={() => setSentTo("")}
                    aria-label="Back to email"
                    className="flex size-9 cursor-pointer items-center justify-center text-foreground border-2 transition-colors hover:text-primary"
                >
                    <ArrowLeft size={20} />
                </button>

                <h1 className="font-inter text-3xl font-bold text-foreground">Password Reset Sent</h1>
                <div className="space-y-3  leading-relaxed">
                    <p className="text-gray-800">
                        We have sent a password reset link to:
                        <br />
                        <span className="text-primary">{sentTo}</span>
                    </p>
                    <p className="text-gray-800">
                        Please check your inbox and follow the instructions to reset your password.
                    </p>
                    <p className="text-gray-400">
                        If you don&apos;t see the email within a few minutes, check your spam or junk folder.
                    </p>
                </div>

                <p className="font-medium text-sm text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link to="/register" className="text-primary hover:underline">
                        Create yours
                    </Link>
                </p>
            </div>
        );
    }

    return (
        <div className="w-full max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="font-inter text-3xl font-bold text-foreground">Forgot Password</h1>
                <p className="text-muted-foreground">
                    Don&apos;t worry, we will help you recover your account.
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                <Controller
                    name="email"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="email">Email</FieldLabel>
                            <Input
                                {...field}
                                id="email"
                                type="email"
                                placeholder="user@example.com"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <ErrorAlert message={getErrorMessage(error)} />
                <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />
                            Sending...
                        </>
                    ) : (
                        <>
                            Next
                            <ChevronRight className="ml-2" />
                        </>
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
    );
}
