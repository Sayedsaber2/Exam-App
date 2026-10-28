import { useNavigate, useParams } from "react-router-dom";
import AdminPageHeader from "@/components/layout/AdminPageHeader";
import ErrorAlert from "@/components/ui/error-alert";
import { getErrorMessage } from "@/shared/lib/get-error-message";
import { useDiploma } from "@/features/diplomas/hooks/useDiploma";
import { useUpdateDiploma } from "@/features/admin/diplomas/hooks/useUpdateDiploma";
import type { DiplomaBody } from "@/features/admin/diplomas/types";
import DiplomaForm from "@/features/admin/diplomas/components/DiplomaForm";
import FormActions from "@/features/admin/shared/components/FormActions";

const FORM_ID = "diploma-form";

export default function EditDiplomaPage() {
    const { diplomaId = "" } = useParams();
    const navigate = useNavigate();
    const diploma = useDiploma(diplomaId);
    const update = useUpdateDiploma();

    function handleSubmit(body: DiplomaBody) {
        // بعد الحفظ، ارجع لصفحة عرض الدبلومة
        update.mutate({ id: diplomaId, body }, { onSuccess: () => navigate(`/admin/diplomas/${diplomaId}`) });
    }

    const viewPath = `/admin/diplomas/${diplomaId}`;

    return (
        <>
            <AdminPageHeader
                crumbs={[
                    { label: "Diplomas", to: "/admin/diplomas" },
                    { label: diploma.data?.title ?? "...", to: viewPath },
                    { label: "Edit" },
                ]}
            >
                <div />
                <FormActions formId={FORM_ID} cancelTo={viewPath} isPending={update.isPending} />
            </AdminPageHeader>

            <div className="p-6">
                {diploma.isError && <ErrorAlert message={getErrorMessage(diploma.error)} />}

                {/* البوابة: الفورم ميتولدش غير والداتا جاهزة، عشان يبدأ بالقيم القديمة */}
                {diploma.data ? (
                    <DiplomaForm
                        formId={FORM_ID}
                        defaultValues={{
                            title: diploma.data.title,
                            description: diploma.data.description ?? "",
                            image: diploma.data.image ?? "",
                        }}
                        onSubmit={handleSubmit}
                        error={update.error}
                    />
                ) : (
                    !diploma.isError && <div className="h-96 animate-pulse bg-background" />
                )}
            </div>
        </>
    );
}
