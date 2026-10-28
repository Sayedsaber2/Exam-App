import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import NativeSelect from "@/features/admin/shared/components/NativeSelect";
import { useExamOptions } from "@/features/admin/exams/hooks/useExamOptions";
import { questionSchema, type QuestionFormValues } from "../schemas/question.schema";
import AnswersEditor from "./AnswersEditor";

type Props = {
    formId: string;
    defaultValues: QuestionFormValues;
    onSubmit: (values: QuestionFormValues) => void;
    error: unknown;
    // lockExam: في التعديل مينفعش نغيّر الامتحان، السيرفر مش بيقبله
    lockExam?: boolean;
};

// فورم سؤال واحد: كارت المعلومات، وتحته كارت الإجابات (فيجما)
export default function QuestionForm({ formId, defaultValues, onSubmit, error, lockExam = false }: Props) {
    const { handleSubmit, control } = useForm<QuestionFormValues>({
        defaultValues,
        resolver: zodResolver(questionSchema),
    });
    const { data: examOptions = [] } = useExamOptions();

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-mono">
            <div className="bg-background">
                <div className="flex h-10 items-center bg-primary px-4 font-medium text-white">Question Information</div>

                <div className="flex flex-col gap-6 p-4">
                    <Controller
                        name="examId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="examId">Exam</FieldLabel>
                                <NativeSelect
                                    {...field}
                                    id="examId"
                                    placeholder="Select exam"
                                    options={examOptions}
                                    disabled={lockExam}
                                    aria-invalid={fieldState.invalid}
                                />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />

                    <Controller
                        name="text"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="text">Question Headline</FieldLabel>
                                <Input {...field} id="text" aria-invalid={fieldState.invalid} className="h-11" />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </div>

            <div className="bg-background">
                <div className="flex h-10 items-center bg-primary px-4 font-medium text-white">Question Answers</div>

                {/* Controller: الإجابات كلها قيمة واحدة في الفورم، والجدول بيغيّرها بـ onChange */}
                <Controller
                    name="answers"
                    control={control}
                    render={({ field, fieldState }) => (
                        <AnswersEditor value={field.value} onChange={field.onChange} error={fieldState.error?.message} />
                    )}
                />
            </div>

            <ErrorAlert message={getErrorMessage(error)} />
        </form>
    );
}
