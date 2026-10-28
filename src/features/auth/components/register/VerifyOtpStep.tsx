import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpStepValues, type RegisterDataValues } from "../../schemas/register.schema";
import { Controller, useForm } from "react-hook-form";
import useConfirmEmailVerification from "../../hooks/useConfirmEmailVerification";
import useSendEmailVerification from "../../hooks/useSendEmailVerification";
import { useCountdown } from "@/shared/hooks/useCountdown";
import { Field, FieldError } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
type Props = {
    email: string;
    onNext: (values: Partial<RegisterDataValues>) => void;
    onBack: () => void;
};
export default function VerifyOtpStep({ email, onNext,onBack }: Props) {
    const { handleSubmit, control } = useForm<OtpStepValues>({
        defaultValues: {
            code: "",
        },
        resolver: zodResolver(otpSchema)
    });
    const { mutate, isPending, error } = useConfirmEmailVerification()
    const { secondsLeft, restart } = useCountdown(60);
    const resend = useSendEmailVerification();
    function onSubmit(values: OtpStepValues) {
        mutate({ email, code: values.code },
            {
                onSuccess: () => {
                    onNext({})
                }
            }
        )
    }
    return (
        <div className="w-full max-w-xl space-y-8">
            <div className="space-y-2">
                <h1 className="text-3xl font-bold text-foreground font-inter">Create Account</h1>
                <h2 className="text-2xl font-medium text-primary font-inter">Verify OTP</h2>
                <p className="leading-relaxed text-muted-foreground">
                    Please enter the 6-digit code we have sent to
                    <br />
                    <span className="text-foreground font-medium">{email}</span>{" "}
                    <button type="button" onClick={onBack} className="text-primary hover:underline cursor-pointer">
                        Edit
                    </button>
                </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
                <Controller
                    name="code"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <InputOTP
                                maxLength={6}
                                value={field.value}
                                onChange={field.onChange}
                                containerClassName="justify-center"
                            >
                                <InputOTPGroup className="gap-3">
                                    {[0, 1, 2, 3, 4, 5].map((i) => (
                                        <InputOTPSlot
                                            key={i}
                                            index={i}
                                            className="size-12 rounded-none! border border-input text-base data-[active=true]:border-primary data-[active=true]:ring-0"
                                        />
                                    ))}
                                </InputOTPGroup>
                            </InputOTP>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-center" />}
                        </Field>
                    )}
                />

                <p className="text-center font-medium text-sm text-muted-foreground">
                    {secondsLeft > 0 ? (
                        <>
                            You can request another code in: <span className="text-foreground">{secondsLeft}s</span>
                        </>
                    ) : (
                        <>
                            Didn&apos;t receive the code?{" "}
                            <button
                                type="button"
                                disabled={resend.isPending}
                                onClick={() => resend.mutate({ email }, { onSuccess: restart })}
                                className="cursor-pointer text-primary hover:underline disabled:opacity-50"
                            >
                                {resend.isPending ? "Sending..." : "Resend code"}
                            </button>
                        </>
                    )}
                </p>

                <ErrorAlert message={getErrorMessage(error)} />

                <Button type="submit" disabled={isPending} className="w-full text-sm bg-accent text-foreground border-primary hover:bg-accent/90 hover:text-foreground/90">
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" /> Verifying...
                        </>
                    ) : (
                        "Verify Code"
                    )}
                </Button>
            </form>
        </div>
    );
}
