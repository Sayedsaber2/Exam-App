import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { DialogFooter } from "@/components/ui/dialog";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useCountdown } from "@/shared/hooks/useCountdown";
import { otpSchema, type OtpStepValues } from "@/features/auth/schemas/register.schema";
import { useConfirmEmailChange } from "../hooks/useConfirmEmailChange";
import { useRequestEmailChange } from "../hooks/useRequestEmailChange";

type Props = {
    email: string; // الإيميل الجديد اللي الكود اتبعتله
    onBack: () => void;
    onDone: () => void;
};

export default function VerifyEmailStep({ email, onBack, onDone }: Props) {
    const { handleSubmit, control } = useForm<OtpStepValues>({
        defaultValues: { code: "" },
        resolver: zodResolver(otpSchema),
    });
    const { mutate, isPending, error } = useConfirmEmailChange();
    const resend = useRequestEmailChange();
    const { secondsLeft, restart } = useCountdown(60);

    function onSubmit(values: OtpStepValues) {
        // الهوك بيحدّث الكاش والتوست — المودال بس بيتقفل (قرار سياق)
        mutate({ code: values.code }, { onSuccess: onDone });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="space-y-3">
                <h3 className="text-xl font-medium text-primary">Verify OTP</h3>
                {/* نص فيجما بالحرف */}
                <p className="text-sm leading-relaxed text-gray-700">
                    Please enter the 6-digits code we have sent to:
                    <br />
                    <span className="text-foreground">{email}</span>.{" "}
                    <button type="button" onClick={onBack} className="cursor-pointer text-primary underline underline-offset-2">
                        Edit
                    </button>
                </p>
            </div>

            <Controller
                name="code"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mt-8">
                        {/* فيجما: 6 خانات 40px · فراغ 16px بينهم */}
                        <InputOTP maxLength={6} value={field.value} onChange={field.onChange} containerClassName="justify-center">
                            <InputOTPGroup className="gap-4">
                                {[0, 1, 2, 3, 4, 5].map((i) => (
                                    <InputOTPSlot
                                        key={i}
                                        index={i}
                                        className="size-10 rounded-none! border border-input text-base data-[active=true]:border-primary data-[active=true]:ring-0"
                                    />
                                ))}
                            </InputOTPGroup>
                        </InputOTP>
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} className="text-center" />}
                    </Field>
                )}
            />

            <p className="mt-6 text-center text-sm text-gray-700">
                {secondsLeft > 0 ? (
                    <>You can request another code in: {secondsLeft}s</>
                ) : (
                    <>
                        Didn&apos;t receive the code?{" "}
                        <button
                            type="button"
                            disabled={resend.isPending}
                            onClick={() => resend.mutate({ newEmail: email }, { onSuccess: restart })}
                            className="cursor-pointer text-primary underline underline-offset-2 disabled:opacity-50"
                        >
                            {resend.isPending ? "Sending..." : "Resend code"}
                        </button>
                    </>
                )}
            </p>

            {error && (
                <div className="mt-6">
                    <ErrorAlert message={getErrorMessage(error)} />
                </div>
            )}

            <DialogFooter className="mt-9 bg-gray-50 ">
                <Button type="submit" className="h-11 flex-1 " disabled={isPending}>
                    {isPending && <Loader2 className="animate-spin" />}
                    Verify Code
                </Button>
            </DialogFooter>
        </form>
    );
}
