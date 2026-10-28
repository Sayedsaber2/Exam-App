import { useNavigate, useParams } from "react-router-dom";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useExam } from "@/features/exams/hooks/useExam";
import { useUpdateExam } from "@/features/admin/exams/hooks/useUpdateExam";
import type { ExamBody } from "@/features/admin/exams/types";
import ExamForm from "@/features/admin/exams/components/ExamForm";
import ExamHeading from "@/features/admin/exams/components/ExamHeading";
import FormActions from "@/features/admin/shared/components/FormActions";

const FORM_ID = "exam-form";

export default function EditExamPage() {
    const { examId = "" } = useParams();
    const navigate = useNavigate();
    const exam = useExam(examId);
    const update = useUpdateExam();
    const viewPath = `/admin/exams/${examId}`;

    function handleSubmit(body: ExamBody) {
        update.mutate({ id: examId, body }, { onSuccess: () => navigate(viewPath) });
    }

    return (
        <>
            <AdminPageHeader
                crumbs={[
                    { label: "Exams", to: "/admin/exams" },
                    { label: exam.data?.title ?? "...", to: viewPath },
                    { label: "Edit" },
                ]}
            >
                <ExamHeading exam={exam.data} />
                <FormActions formId={FORM_ID} cancelTo={viewPath} isPending={update.isPending} />
            </AdminPageHeader>

            <div className="p-6">
                {exam.isError && <ErrorAlert message={getErrorMessage(exam.error)} />}

                {/* البوابة: الفورم ميتولدش غير والداتا جاهزة، عشان يبدأ بالقيم القديمة */}
                {exam.data ? (
                    <ExamForm
                        formId={FORM_ID}
                        defaultValues={{
                            title: exam.data.title,
                            diplomaId: exam.data.diplomaId,
                            // String: الخانة بتشتغل بالنصوص، فبنحوّل الرقم لنص
                            duration: String(exam.data.duration),
                            description: exam.data.description ?? "",
                            image: exam.data.image ?? "",
                        }}
                        onSubmit={handleSubmit}
                        error={update.error}
                    />
                ) : (
                    !exam.isError && <div className="h-96 animate-pulse bg-background" />
                )}
            </div>
        </>
    );
}
