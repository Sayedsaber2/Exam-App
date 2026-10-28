import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { ChevronRight } from "lucide-react";
import { userInfoSchema, type UserInfoStepValues } from "../../schemas/register.schema";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { EgyptFlag } from "@/components/ui/egypt-flag"; // مشترك مع فورم البروفايل

function Required() {
    return <span className="text-destructive">*</span>;
}

export default function UserInfoStep({ onNext }: { onNext: (values: UserInfoStepValues) => void }) {
    const { handleSubmit, control } = useForm<UserInfoStepValues>({
        defaultValues: {
            firstName: "",
            lastName: "",
            username: "",
            phone: "",
        },
        resolver: zodResolver(userInfoSchema),
    });
    
    function onSubmit(values: UserInfoStepValues) {
        onNext(values);
    }

    return (
        <div className="w-full max-w-xl space-y-8">
            <div className="space-y-2">
                <h1 className="font-inter text-3xl font-bold text-foreground">Create Account</h1>
                <h2 className="font-inter text-2xl font-medium text-primary">Tell us more about you</h2>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
                
                <div className="grid grid-cols-2 gap-4">
                    <Controller
                        name="firstName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="firstName">
                                    First name <Required />
                                </FieldLabel>
                                <Input {...field} id="firstName" placeholder="Ahmed" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                    <Controller
                        name="lastName"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="lastName">
                                    Last name <Required />
                                </FieldLabel>
                                <Input {...field} id="lastName" placeholder="Abdullah" aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                <Controller
                    name="username"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="username">
                                Username <Required />
                            </FieldLabel>
                            <Input {...field} id="username" placeholder="user123" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Controller
                    name="phone"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone">Phone</FieldLabel>
                            <div className="flex h-10 items-center border border-input transition-colors focus-within:border-ring has-aria-invalid:border-destructive">
                                <span className="flex shrink-0 items-center gap-2 pl-3 text-sm text-foreground">
                                    <EgyptFlag />
                                    EG (+20)
                                </span>
                                <Input
                                    {...field}
                                    id="phone"
                                    type="tel"
                                    inputMode="numeric"
                                    placeholder="1012345678"
                                    aria-invalid={fieldState.invalid}
                                    className="h-full flex-1 border-0 px-2"
                                />  
                            </div>
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

                <Button
                    type="submit"
                    className="w-full text-sm bg-accent text-foreground border-primary hover:bg-accent/90 hover:text-foreground/90"
                >
                    Next
                    <ChevronRight className="ml-2" />
                </Button>
            </form>
        </div>
    );
}
