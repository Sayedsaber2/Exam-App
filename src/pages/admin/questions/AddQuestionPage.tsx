import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CopyPlus } from "lucide-react";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import FormActions from "@/features/admin/shared/components/FormActions";
import BulkQuestionsForm from "@/features/admin/questions/components/BulkQuestionsForm";
import QuestionForm from "@/features/admin/questions/components/QuestionForm";
import { useCreateQuestion } from "@/features/admin/questions/hooks/useCreateQuestion";
import { useCreateQuestionsBulk } from "@/features/admin/questions/hooks/useCreateQuestionsBulk";
import type { BulkQuestionsFormValues, QuestionFormValues } from "@/features/admin/questions/schemas/question.schema";

export default function AddQuestionPage() {
    const navigate = useNavigate();
    // examId: لو جاي من صفحة امتحان، الامتحان بيبقى مختار لوحده
    const [searchParams] = useSearchParams();
    const examId = searchParams.get("examId") ?? "";

    // bulk: زرار Bulk Add Mode بيقلب بين فورم سؤال واحد وفورم أسئلة كتير
    const [bulk, setBulk] = useState(false);
    const createOne = useCreateQuestion();
    const createMany = useCreateQuestionsBulk();

    const formId = bulk ? "bulk-questions-form" : "question-form";
    const cancelTo = examId ? `/admin/exams/${examId}` : "/admin/exams";

    function handleSingle(values: QuestionFormValues) {
        createOne.mutate(
            { examId: values.examId, body: { text: values.text, answers: values.answers } },
            // بعد الحفظ، ارجع لصفحة الامتحان عشان تشوف السؤال في القايمة
            { onSuccess: () => navigate(`/admin/exams/${values.examId}`) },
        );
    }

    function handleBulk(values: BulkQuestionsFormValues) {
        createMany.mutate(
            { examId: values.examId, questions: values.questions },
            { onSuccess: () => navigate(`/admin/exams/${values.examId}`) },
        );
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Exams", to: "/admin/exams" }, { label: "Create New Question" }]}>
                <button
                    type="button"
                    onClick={() => setBulk(!bulk)}
                    className={`flex h-10 cursor-pointer items-center gap-2 px-4 text-sm transition-colors ${
                        bulk ? "bg-primary text-white" : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    }`}
                >
                    <CopyPlus size={18} />
                    Bulk Add Mode
                </button>
                <FormActions formId={formId} cancelTo={cancelTo} isPending={createOne.isPending || createMany.isPending} />
            </AdminPageHeader>

            <div className="p-6">
                {bulk ? (
                    <BulkQuestionsForm formId={formId} defaultExamId={examId} onSubmit={handleBulk} error={createMany.error} />
                ) : (
                    <QuestionForm
                        formId={formId}
                        defaultValues={{ examId, text: "", answers: [] }}
                        onSubmit={handleSingle}
                        error={createOne.error}
                    />
                )}
            </div>
        </>
    );
}
