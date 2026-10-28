import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { emailSchema, type EmailStepValues, } from "../../schemas/register.schema";
import { ChevronRight, Loader2 } from "lucide-react";
import useSendEmailVerification from "../../hooks/useSendEmailVerification";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";



export default function EmailStep({ onNext }: { onNext: (values: EmailStepValues) => void }) {
    const { handleSubmit, control } = useForm<EmailStepValues>({
        defaultValues: {
            email: "",
        },
        resolver: zodResolver(emailSchema),
    });
    const { mutate, isPending, error } = useSendEmailVerification()
    function onSubmit(values: EmailStepValues) {
        mutate(values, {
            onSuccess: () => {
                
                onNext(values)
            }
        })

    }
    return <>
        <div className="w-full max-w-xl space-y-6">
            <div className="space-y-1">
                <h1 className="font-inter text-3xl font-bold text-foreground">Create Account</h1>

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
                <Button disabled={isPending} type="submit" className="w-full bg-accent text-foreground border-primary hover:bg-accent/90 hover:text-foreground/90">
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />
                            
                        </>
                    ) : (
                        <>
                        {"Next"}
                        <ChevronRight className="ml-2" />
                        </>
                    )}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline">
                    Login
                </Link>
            </p>
        </div>
    </>;
}
