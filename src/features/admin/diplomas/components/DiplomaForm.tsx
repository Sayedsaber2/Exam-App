import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import type { DiplomaBody } from "@/features/admin/diplomas/types";
import { diplomaSchema, type DiplomaFormValues } from "@/features/admin/diplomas/schemas/diploma.schema";
import ImageDropzone from "@/features/admin/shared/components/ImageDropzone";

type Props = {
    formId: string;
    defaultValues: DiplomaFormValues;
    onSubmit: (body: DiplomaBody) => void;
    error: unknown;
};

// نفس الفورم للإضافة والتعديل، الفرق بس في القيم اللي بيبدأ بيها
export default function DiplomaForm({ formId, defaultValues, onSubmit, error }: Props) {
    const { handleSubmit, control } = useForm<DiplomaFormValues>({
        defaultValues,
        resolver: zodResolver(diplomaSchema),
    });
    const [isUploading, setIsUploading] = useState(false);

    function submit(values: DiplomaFormValues) {
        // لو الصورة لسه بتترفع، استنى
        if (isUploading) return;
        // الصورة: بنبعتها بس لو اتغيرت، والخانات الفاضية مش بنبعتها خالص
        const imageChanged = values.image !== defaultValues.image;
        onSubmit({
            title: values.title,
            description: values.description || undefined,
            image: imageChanged && values.image ? values.image : undefined,
        });
    }

    return (
        <form id={formId} onSubmit={handleSubmit(submit)} className="bg-background font-mono">
            <div className="flex h-10 items-center bg-primary px-4 font-medium text-white">Diploma Information</div>

            <div className="flex flex-col gap-6 p-4">
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
                    name="description"
                    control={control}
                    render={({ field }) => (
                        <Field>
                            <FieldLabel htmlFor="description">Description</FieldLabel>
                            <textarea
                                {...field}
                                id="description"
                                className="h-32 resize-none border border-input px-3 py-2 text-sm outline-none focus:border-ring"
                            />
                        </Field>
                    )}
                />

                <ErrorAlert message={getErrorMessage(error)} />
            </div>
        </form>
    );
}
