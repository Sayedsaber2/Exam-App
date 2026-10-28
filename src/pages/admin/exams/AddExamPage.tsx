import { useNavigate } from "react-router-dom";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import { useCreateExam } from "@/features/admin/exams/hooks/useCreateExam";
import type { ExamBody } from "@/features/admin/exams/types";
import ExamForm from "@/features/admin/exams/components/ExamForm";
import FormActions from "@/features/admin/shared/components/FormActions";

const FORM_ID = "exam-form";

export default function AddExamPage() {
    const navigate = useNavigate();
    const { mutate, isPending, error } = useCreateExam();

    function handleSubmit(body: ExamBody) {
        // بعد ما يتضاف، روح لصفحة عرضه عشان تضيف أسئلته
        mutate(body, { onSuccess: (exam) => navigate(`/admin/exams/${exam.id}`) });
    }

    return (
        <>
            <AdminPageHeader crumbs={[{ label: "Exams", to: "/admin/exams" }, { label: "Create New Exam" }]}>
                <div />
                <FormActions formId={FORM_ID} cancelTo="/admin/exams" isPending={isPending} />
            </AdminPageHeader>

            <div className="p-6">
                <ExamForm
                    formId={FORM_ID}
                    defaultValues={{ title: "", diplomaId: "", duration: "", description: "", image: "" }}
                    onSubmit={handleSubmit}
                    error={error}
                />
            </div>
        </>
    );
}
