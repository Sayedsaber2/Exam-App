import { useNavigate, useParams } from "react-router-dom";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import FormActions from "@/features/admin/shared/components/FormActions";
import QuestionForm from "@/features/admin/questions/components/QuestionForm";
import QuestionHeading from "@/features/admin/questions/components/QuestionHeading";
import { useQuestion } from "@/features/admin/questions/hooks/useQuestion";
import { useUpdateQuestion } from "@/features/admin/questions/hooks/useUpdateQuestion";
import type { QuestionFormValues } from "@/features/admin/questions/schemas/question.schema";

const FORM_ID = "question-form";

export default function EditQuestionPage() {
    const { questionId = "" } = useParams();
    const navigate = useNavigate();
    const question = useQuestion(questionId);
    const update = useUpdateQuestion();
    const viewPath = `/admin/questions/${questionId}`;

    function handleSubmit(values: QuestionFormValues) {
        // الامتحان مش بيتبعت، لأن السؤال مينفعش يتنقل لامتحان تاني
        update.mutate({ id: questionId, body: { text: values.text, answers: values.answers } }, { onSuccess: () => navigate(viewPath) });
    }

    return (
        <>
            <AdminPageHeader
                crumbs={[
                    { label: "Exams", to: "/admin/exams" },
                    { label: question.data?.exam?.title ?? "...", to: `/admin/exams/${question.data?.examId ?? ""}` },
                    { label: "Edit Question" },
                ]}
            >
                <QuestionHeading question={question.data} />
                <FormActions formId={FORM_ID} cancelTo={viewPath} isPending={update.isPending} />
            </AdminPageHeader>

            <div className="p-6">
                {question.isError && <ErrorAlert message={getErrorMessage(question.error)} />}

                {/* البوابة: الفورم ميتولدش غير والسؤال وصل، عشان يبدأ بإجاباته القديمة */}
                {question.data ? (
                    <QuestionForm
                        formId={FORM_ID}
                        lockExam
                        defaultValues={{
                            examId: question.data.examId,
                            text: question.data.text,
                            // map: بناخد النص وصح ولا غلط بس، من غير الـ id
                            answers: question.data.answers.map((answer) => ({ text: answer.text, isCorrect: answer.isCorrect })),
                        }}
                        onSubmit={handleSubmit}
                        error={update.error}
                    />
                ) : (
                    !question.isError && <div className="h-96 animate-pulse bg-background" />
                )}
            </div>
        </>
    );
}
