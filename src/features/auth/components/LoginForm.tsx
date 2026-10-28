import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { LoginSchema, type LoginFormValues } from "../schemas/login.schema";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Loader2 } from "lucide-react";
import ErrorAlert from "@/components/ui/error-alert";
import PasswordInput from "./PasswordInput";
import { useLogin } from "../hooks/useLogin";
import { getErrorMessage } from "@/shared/lib/get-error-message";

export default function LoginForm() {
    const { handleSubmit, control } = useForm<LoginFormValues>({
        defaultValues: {
            username: "",
            password: "",
        },
        resolver: zodResolver(LoginSchema),
    });

    const {mutate , isPending , error}=useLogin()
     function onSubmit(values: LoginFormValues) {
        mutate(values)
    }

    return (
        <div className="w-full max-w-xl space-y-6">
            <h1 className="font-inter text-3xl font-bold text-foreground">Login</h1>

            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5 ">
                <Controller
                    name="username"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="username">Username</FieldLabel>
                            <Input
                                {...field}
                                id="username"
                                type="text"
                                placeholder="user123"
                                aria-invalid={fieldState.invalid}
                            />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />

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

                <Link to="/forgot-password" className="-mt-2 self-end text-sm text-primary hover:underline">
                    Forgot Password?
                </Link>
                <ErrorAlert message={getErrorMessage(error)} />
                <Button disabled={isPending}  type="submit" className="w-full">
                    {isPending ? (
                        <>
                            <Loader2 className="animate-spin" />
                            
                        </>
                    ) : (
                        "Login"
                    )}
                </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/register" className="text-primary hover:underline">
                    Create yours
                </Link>
            </p>
        </div>
    );
}
