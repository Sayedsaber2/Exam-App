import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";
import type { User } from "@/shared/types/user";
import { Button } from "@/components/ui/button/button";
import { EgyptFlag } from "@/components/ui/egypt-flag";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useUpdateProfile } from "../hooks/useUpdateProfile";
import { profileSchema, type ProfileValues } from "../schemas/account.schema";
import ChangeEmailDialog from "./ChangeEmailDialog";
import DeleteAccountDialog from "./DeleteAccountDialog";

// السيرفر بيخزن الموبايل بصفر في الأول (01012345678) — في الفورم بنعرضه من غير الصفر بعد +20
const toLocalPhone = (phone: string | null) => phone?.replace(/^0/, "") ?? "";
const toServerPhone = (phone?: string) => (!phone ? undefined : phone.startsWith("0") ? phone : `0${phone}`);

export default function ProfileForm({ user }: { user: User }) {
    const {
        handleSubmit,
        control,
        reset,
        formState: { isDirty },
    } = useForm<ProfileValues>({
        // القيم المبدئية من السيرفر — الكومبوننت بيتولد والداتا جاهزة (البوابة في ProfilePage)
        defaultValues: {
            firstName: user.firstName,
            lastName: user.lastName,
            phone: toLocalPhone(user.phone),
        },
        resolver: zodResolver(profileSchema),
    });

    const { mutate, isPending, error } = useUpdateProfile();

    function onSubmit(values: ProfileValues) {
        mutate(
            { firstName: values.firstName, lastName: values.lastName, phone: toServerPhone(values.phone) },
            // reset(values) = القيم دي بقت "الأصل" الجديد → isDirty ترجع false وزرار Save يتقفل تاني
            { onSuccess: () => reset(values) },
        );
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
            {/* فيجما: 10px بين الاسمين */}
            <div className="grid grid-cols-2 gap-2.5">
                <Controller
                    name="firstName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="firstName">First name</FieldLabel>
                            <Input {...field} id="firstName" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
                <Controller
                    name="lastName"
                    control={control}
                    render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="lastName">Last name</FieldLabel>
                            <Input {...field} id="lastName" aria-invalid={fieldState.invalid} />
                            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                        </Field>
                    )}
                />
            </div>

            {/* Username و Email مش بيتعدلوا من هنا — عرض بس (readOnly) */}
            <Field>
                <FieldLabel htmlFor="username">Username</FieldLabel>
                <Input id="username" value={user.username} disabled readOnly />
            </Field>

            <Field>
                <div className="flex items-center justify-between">
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <ChangeEmailDialog />
                </div>
                <Input id="email" value={user.email ?? ""}  readOnly />
            </Field>

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

            <ErrorAlert message={getErrorMessage(error)} />

            <div className="mt-5 flex gap-4">
                <DeleteAccountDialog />
                {/* Save مقفول لحد ما المستخدم يغيّر حاجة فعلًا (isDirty) */}
                <Button type="submit" className="h-11 flex-1" disabled={!isDirty || isPending}>
                    {isPending && <Loader2 className="animate-spin" />}
                    Save Changes
                </Button>
            </div>
        </form>
    );
}
