import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ChevronRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { DialogFooter } from "@/components/ui/dialog";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { emailSchema, type EmailStepValues } from "@/features/auth/schemas/register.schema";
import { useRequestEmailChange } from "../hooks/useRequestEmailChange";

export default function NewEmailStep({ onNext }: { onNext: (email: string) => void }) {
    const { handleSubmit, control } = useForm<EmailStepValues>({
        defaultValues: { email: "" },
        resolver: zodResolver(emailSchema),
    });
    const { mutate, isPending, error } = useRequestEmailChange();

    function onSubmit(values: EmailStepValues) {
        // السيرفر يبعت الكود للإيميل الجديد → بعدها بس ننقل للخطوة التانية
        mutate({ newEmail: values.email }, { onSuccess: () => onNext(values.email) });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <h3 className="text-xl font-medium text-primary">Enter your new email</h3>

            <Controller
                name="email"
                control={control}
                render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.invalid} className="mt-8">
                        <FieldLabel htmlFor="newEmail">Email</FieldLabel>
                        <Input {...field} id="newEmail" type="email" placeholder="user@example.com" aria-invalid={fieldState.invalid} />
                        {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                    </Field>
                )}
            />

            {error && (
                <div className="mt-6">
                    <ErrorAlert message={getErrorMessage(error)} />
                </div>
            )}

            {/* الزرار جوه الفوتر (خط فاصل بعرض المودال) — فيجما */}
            <DialogFooter className="mt-9 bg-gray-50 ">
                <Button type="submit" className="h-11 flex-1" disabled={isPending}>
                    {isPending ? (
                        <Loader2 className="animate-spin" />
                    ) : (
                        <>
                            Next
                            <ChevronRight />
                        </>
                    )}
                </Button>
            </DialogFooter>
        </form>
    );
}
