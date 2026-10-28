import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { Plus, X } from "lucide-react";
import ErrorAlert from "@/components/ui/error-alert";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import NativeSelect from "@/features/admin/shared/components/NativeSelect";
import { useExamOptions } from "@/features/admin/exams/hooks/useExamOptions";
import { bulkQuestionsSchema, type BulkQuestionsFormValues } from "../schemas/question.schema";
import AnswersEditor from "./AnswersEditor";

// emptyQuestion: بترجّع سؤال فاضي جديد كل مرة، عشان كل تاب يبقى ليه نسخته لوحده
const emptyQuestion = () => ({ text: "", answers: [] });

type Props = {
    formId: string;
    defaultExamId: string;
    onSubmit: (values: BulkQuestionsFormValues) => void;
    error: unknown;
};

// فورم أسئلة كتير مرة واحدة: امتحان واحد فوق، وتحته تابات Q1 و Q2 و Q3 (فيجما)
export default function BulkQuestionsForm({ formId, defaultExamId, onSubmit, error }: Props) {
    const {
        handleSubmit,
        control,
        formState: { errors },
    } = useForm<BulkQuestionsFormValues>({
        defaultValues: { examId: defaultExamId, questions: [emptyQuestion()] },
        resolver: zodResolver(bulkQuestionsSchema),
    });

    // useFieldArray: بيدير قايمة جوه الفورم، وبيدينا فانكشنز نضيف بيها ونشيل منها
    const { fields, append, remove } = useFieldArray({ control, name: "questions" });

    // active: رقم التاب المفتوح دلوقتي
    const [active, setActive] = useState(0);
    const { data: examOptions = [] } = useExamOptions();

    function addQuestion() {
        append(emptyQuestion());
        // التاب الجديد هو آخر واحد، فنفتحه على طول
        setActive(fields.length);
    }

    function removeQuestion(index: number) {
        remove(index);
        // لو شلنا التاب المفتوح أو اللي قبله، نرجع خطوة عشان منفتحش تاب مش موجود
        if (active >= index && active > 0) setActive(active - 1);
    }

    return (
        <form id={formId} onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 font-mono">
            <div className="bg-background">
                <div className="flex h-10 items-center bg-primary px-4 font-medium text-white">Exam Info</div>
                <div className="p-4">
                    <Controller
                        name="examId"
                        control={control}
                        render={({ field, fieldState }) => (
                            <Field data-invalid={fieldState.invalid}>
                                <FieldLabel htmlFor="examId">Exam</FieldLabel>
                                <NativeSelect {...field} id="examId" placeholder="Select exam" options={examOptions} aria-invalid={fieldState.invalid} />
                                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                            </Field>
                        )}
                    />
                </div>
            </div>

            <div className="bg-background">
                <div className="flex h-10 items-center bg-primary px-4 font-medium text-white">Questions</div>

                {/* التابات */}
                <div className="flex border-b border-gray-200">
                    {fields.map((field, index) => {
                        const isActive = index === active;
                        // hasError: التاب ده فيه غلط، فبنلوّن اسمه أحمر عشان تعرف تروحله
                        const hasError = Boolean(errors.questions?.[index]);
                        // textColor: الغلط الأول، وبعدين التاب المفتوح، وبعدين العادي
                        const textColor = hasError ? "text-destructive" : isActive ? "text-primary" : "text-gray-800";

                        return (
                            // key: لازم نستخدم field.id اللي useFieldArray بيعمله، مش رقم التاب
                            <div key={field.id} className="group relative flex-1">
                                <button
                                    type="button"
                                    onClick={() => setActive(index)}
                                    className={`h-10 w-full cursor-pointer border-r border-gray-200 text-sm ${textColor} ${
                                        isActive ? "bg-blue-50" : "hover:bg-gray-50"
                                    }`}
                                >
                                    Q{index + 1}
                                </button>

                                {/* علامة الحذف بتظهر لما تقف على التاب، ومش بتظهر لو فاضل سؤال واحد */}
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        aria-label={`Remove question ${index + 1}`}
                                        onClick={() => removeQuestion(index)}
                                        className="absolute top-1 right-2 hidden cursor-pointer text-destructive group-hover:block"
                                    >
                                        <X size={14} />
                                    </button>
                                )}
                            </div>
                        );
                    })}

                    <button
                        type="button"
                        aria-label="Add question"
                        onClick={addQuestion}
                        className="flex h-10 w-10 shrink-0 cursor-pointer items-center justify-center bg-gray-100 text-gray-800 hover:bg-gray-200"
                    >
                        <Plus size={18} />
                    </button>
                </div>

                {/* محتوى التاب المفتوح بس: العنوان والإجابات */}
                {fields[active] && (
                    <div key={fields[active].id} className="flex flex-col gap-4 border border-t-0 border-primary p-4">
                        <Controller
                            name={`questions.${active}.text`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FieldLabel htmlFor={`question-${active}`}>Question Headline</FieldLabel>
                                    <Input {...field} id={`question-${active}`} aria-invalid={fieldState.invalid} className="h-11" />
                                    {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                                </Field>
                            )}
                        />

                        <Controller
                            name={`questions.${active}.answers`}
                            control={control}
                            render={({ field, fieldState }) => (
                                <AnswersEditor value={field.value} onChange={field.onChange} error={fieldState.error?.message} />
                            )}
                        />
                    </div>
                )}
            </div>

            <ErrorAlert message={getErrorMessage(error)} />
        </form>
    );
}
