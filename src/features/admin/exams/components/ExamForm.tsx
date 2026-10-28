import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useDiplomaOptions } from "@/features/admin/diplomas/hooks/useDiplomaOptions";
import type { ExamBody } from "@/features/admin/exams/types";
import { examSchema, type ExamFormValues } from "@/features/admin/exams/schemas/exam.schema";
import ImageDropzone from "@/features/admin/shared/components/ImageDropzone";
import NativeSelect from "@/features/admin/shared/components/NativeSelect";

type Props = {
    formId: string;
    defaultValues: ExamFormValues;
    onSubmit: (body: ExamBody) => void;
    error: unknown;
};

// فورم الامتحان: عمودين (فيجما)
// الشمال: العنوان والصورة والمدة، واليمين: الدبلومة والوصف
export default function ExamForm({ formId, defaultValues, onSubmit, error }: Props) {
    const { handleSubmit, control } = useForm<ExamFormValues>({
        defaultValues,
        resolver: zodResolver(examSchema),
    });
    const [isUploading, setIsUploading] = useState(false);
    const { data: diplomaOptions = [] } = useDiplomaOptions();

    function submit(values: ExamFormValues) {
        if (isUploading) return;
        const imageChanged = values.image !== defaultValues.image;
        onSubmit({
            title: values.title,
            diplomaId: values.diplomaId,
            // Number: الخانة بترجّع نص زي "20"، والسيرفر عايز رقم
            duration: Number(values.duration),
            description: values.description || undefined,
            image: imageChanged && values.image ? values.image : undefined,
        });
    }

    return (
        <form id={formId} onSubmit={handleSubmit(submit)} className="bg-background font-mono">
            <div className="flex h-10 items-center bg-primary px-4 font-medium text-white">Exam Information</div>

            <div className="grid grid-cols-2 gap-4 p-4">
                {/* العمود الشمال */}
                <div className="flex flex-col gap-6">
                    <Controller
                        name="title"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="title">Title</FieldLabel>
                                <Input {...field} id="title" aria-invalid={fieldState.invalid} className="h-11" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="image"
                        control={control}
                        render={({ field }) => (
                            <Field>
                                <FieldLabel htmlFor="image">Image</FieldLabel>
                                <ImageDropzone id="image" value={field.value} onChange={field.onChange} onUploadingChange={setIsUploading} />
                            </Field>
                        )}
                    />

                    <Controller
                        name="duration"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="duration">Duration (min)</FieldLabel>
                                <Input {...field} id="duration" type="number" min={1} aria-invalid={fieldState.invalid} className="h-11" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>

                {/* العمود اليمين */}
                <div className="flex flex-col gap-6">
                    <Controller
                        name="diplomaId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="diplomaId">Diploma</FieldLabel>
                                <NativeSelect
                                    {...field}
                                    id="diplomaId"
                                    placeholder="Select a diploma"
                                    options={diplomaOptions}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    {/* flex-1: الوصف ياخد باقي طول العمود، زي فيجما */}
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <Field className="flex-1">
                                <FieldLabel htmlFor="description">Description</FieldLabel>
                                <textarea
                                    {...field}
                                    id="description"
                                    className="min-h-32 flex-1 resize-none border border-input px-3 py-2 text-sm outline-none focus:border-ring"
                                />
                            </Field>
                        )}
                    />
                </div>

                <div className="col-span-2">
                    <ErrorAlert message={getErrorMessage(error)} />
                </div>
            </div>
        </form>
    );
}
