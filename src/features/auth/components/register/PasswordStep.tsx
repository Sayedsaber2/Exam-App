import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, useForm } from "react-hook-form";
import PasswordInput from "../PasswordInput";
import { passwordSchema, type PasswordStepValues, type RegisterDataValues } from "../../schemas/register.schema";
import { useRegister } from "../../hooks/useRegister";
import ErrorAlert from "@/components/ui/error-alert";
import { Loader2 } from "lucide-react";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { zodResolver } from "@hookform/resolvers/zod";

export default function PasswordStep({ data }: { data: Partial<RegisterDataValues> ;}) {
    const { handleSubmit, control } = useForm<PasswordStepValues>({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
        resolver: zodResolver(passwordSchema),
    });

    const { mutate, isPending, error } = useRegister()
    function onSubmit(values: PasswordStepValues) {
        const { phone, ...rest } = { ...data, ...values } as RegisterDataValues;
        const normalizedPhone = phone && !phone.startsWith("0") ? `0${phone}` : phone;
        mutate(normalizedPhone ? { ...rest, phone: normalizedPhone } : rest);
    }
    return <>
        <div className="w-full max-w-xl space-y-8">
            <div className="space-y-2">
                <h1 className="font-inter text-3xl font-bold text-foreground">Create Account</h1>
                <h2 className="font-inter text-2xl font-bold text-primary">Create strong password</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                <Controller
                    name="password"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="password">Password</FieldLabel>
                            <PasswordInput
                                {...field}
                                id="password"
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
                            <FieldLabel htmlFor="confirmPassword">Confirm Password</FieldLabel>
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
                <Button disabled={isPending} type="submit" className="w-full">
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />

                        </>
                    ) : (
                        "Create Account"
                    )}
                </Button>
                
            </form>
        </div>
    </>;
}
